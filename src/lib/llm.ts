import { useEffect, useState } from 'react'

/* ============================================================================
   Browser-direct LLM client. Calls the provider's API straight from the page
   using the USER'S OWN key (stored only in localStorage). This is fully
   separate from anything else — billed to the user's own provider account.
   ============================================================================ */

export type Provider = 'gemini' | 'anthropic' | 'openai'

export interface ProviderInfo {
  id: Provider
  label: string
  free: boolean
  keyUrl: string
  keyHint: string
  models: string[]
  defaultModel: string
}

export const PROVIDERS: Record<Provider, ProviderInfo> = {
  gemini: {
    id: 'gemini',
    label: 'Google Gemini',
    free: true,
    keyUrl: 'https://aistudio.google.com/apikey',
    keyHint: 'Free key from Google AI Studio',
    models: ['gemini-2.0-flash', 'gemini-2.0-flash-lite', 'gemini-1.5-flash'],
    defaultModel: 'gemini-2.0-flash',
  },
  anthropic: {
    id: 'anthropic',
    label: 'Claude (Anthropic)',
    free: false,
    keyUrl: 'https://console.anthropic.com/settings/keys',
    keyHint: 'Your Anthropic API key (sk-ant-…)',
    models: ['claude-opus-4-8', 'claude-sonnet-4-6', 'claude-haiku-4-5'],
    defaultModel: 'claude-sonnet-4-6',
  },
  openai: {
    id: 'openai',
    label: 'OpenAI',
    free: false,
    keyUrl: 'https://platform.openai.com/api-keys',
    keyHint: 'Your OpenAI API key (sk-…)',
    models: ['gpt-4o-mini', 'gpt-4o'],
    defaultModel: 'gpt-4o-mini',
  },
}

export interface LlmSettings {
  provider: Provider
  keys: Partial<Record<Provider, string>>
  models: Partial<Record<Provider, string>>
}

const STORAGE_KEY = 'ccvl.llm'
const EVT = 'ccvl-llm-changed'

export function loadSettings(): LlmSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { provider: 'gemini', keys: {}, models: {}, ...JSON.parse(raw) }
  } catch { /* ignore */ }
  return { provider: 'gemini', keys: {}, models: {} }
}

export function saveSettings(s: LlmSettings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s))
  window.dispatchEvent(new Event(EVT))
}

/** Reactive settings hook synced across components. */
export function useLlm() {
  const [settings, setSettings] = useState<LlmSettings>(() => (typeof window !== 'undefined' ? loadSettings() : { provider: 'gemini', keys: {}, models: {} }))
  useEffect(() => {
    const sync = () => setSettings(loadSettings())
    window.addEventListener(EVT, sync)
    window.addEventListener('storage', sync)
    return () => { window.removeEventListener(EVT, sync); window.removeEventListener('storage', sync) }
  }, [])
  const provider = settings.provider
  const apiKey = settings.keys[provider]
  const model = settings.models[provider] || PROVIDERS[provider].defaultModel
  return { settings, save: saveSettings, provider, apiKey, model, ready: !!apiKey }
}

export interface ChatMsg { role: 'user' | 'assistant'; content: string }

/** Send a chat to the active provider and return the assistant text. Throws on error. */
export async function chat(messages: ChatMsg[], opts: { provider: Provider; apiKey: string; model: string; system?: string; maxTokens?: number }): Promise<string> {
  const { provider, apiKey, model, system, maxTokens = 1400 } = opts
  if (provider === 'gemini') {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`
    const body = {
      ...(system ? { systemInstruction: { parts: [{ text: system }] } } : {}),
      contents: messages.map((m) => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] })),
      generationConfig: { maxOutputTokens: maxTokens },
    }
    const r = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) })
    const j = await r.json()
    if (!r.ok) throw new Error(j?.error?.message || `Gemini error ${r.status}`)
    const text = j?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text).join('') || ''
    if (!text) throw new Error('Gemini returned no text (check model/quota).')
    return text
  }
  if (provider === 'anthropic') {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({ model, max_tokens: maxTokens, ...(system ? { system } : {}), messages }),
    })
    const j = await r.json()
    if (!r.ok) throw new Error(j?.error?.message || `Claude error ${r.status}`)
    const text = (j?.content || []).filter((b: { type: string }) => b.type === 'text').map((b: { text: string }) => b.text).join('')
    if (!text) throw new Error('Claude returned no text.')
    return text
  }
  // openai
  const r = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ model, max_tokens: maxTokens, messages: [...(system ? [{ role: 'system', content: system }] : []), ...messages] }),
  })
  const j = await r.json()
  if (!r.ok) throw new Error(j?.error?.message || `OpenAI error ${r.status}`)
  const text = j?.choices?.[0]?.message?.content || ''
  if (!text) throw new Error('OpenAI returned no text.')
  return text
}

/** Pull the first JSON object out of a model response (handles ```json fences + prose). */
export function extractJson<T = unknown>(text: string): T {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i)
  const candidate = fenced ? fenced[1] : text
  const start = candidate.indexOf('{')
  const end = candidate.lastIndexOf('}')
  if (start === -1 || end === -1) throw new Error('No JSON found in response.')
  return JSON.parse(candidate.slice(start, end + 1)) as T
}
