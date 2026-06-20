import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { chat, useLlm, PROVIDERS, type ChatMsg } from '@/lib/llm'
import { ConnectPanel } from './ConnectPanel'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'

const SYSTEM =
  'You are the in-app guide for "Claude Code AI Visual Lab". Help the user understand and USE Claude Code / agentic coding features well: agents & subagents (when to use / avoid), skills (when to create, when too many hurt), MCP connectors, tokens & context discipline, and a good build workflow. Answer concisely — a few sentences, practical, beginner-friendly, with concrete "when to use" guidance. Prefer short bullet points. Do not write essays.'

export function AssistantDock() {
  const { provider, apiKey, model, ready } = useLlm()
  const [open, setOpen] = useState(false)
  const [connect, setConnect] = useState(false)
  const [busy, setBusy] = useState(false)
  const [msgs, setMsgs] = useState<ChatMsg[]>([{ role: 'assistant', content: 'Hi — ask me anything about Claude Code: agents, skills, MCP, tokens, workflow. When should you use a subagent? Why do skills save context?' }])
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => { scrollRef.current?.scrollTo({ top: 1e9, behavior: 'smooth' }) }, [msgs, busy])

  const send = async () => {
    const text = input.trim()
    if (!text || busy) return
    if (!ready) { setConnect(true); return }
    const next = [...msgs, { role: 'user' as const, content: text }]
    setMsgs(next); setInput(''); setBusy(true)
    try {
      const reply = await chat(next, { provider, apiKey: apiKey!, model, system: SYSTEM, maxTokens: 700 })
      setMsgs((m) => [...m, { role: 'assistant', content: reply }])
    } catch (e) {
      setMsgs((m) => [...m, { role: 'assistant', content: `⚠️ ${(e as Error).message}` }])
    } finally { setBusy(false) }
  }

  return (
    <>
      {/* launcher */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-[90] grid h-14 w-14 place-items-center rounded-full text-hi"
        whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}
        style={{ background: 'radial-gradient(40% 40% at 36% 30%, color-mix(in oklab, var(--cyan) 60%, #fff 12%), color-mix(in oklab, var(--accent-2) 40%, transparent) 70%)', border: '1px solid color-mix(in oklab, var(--cyan) 55%, transparent)', boxShadow: '0 0 30px -4px var(--accent-glow)' }}
        aria-label="Open assistant"
      >
        <Icon name={open ? 'spark' : 'core'} size={24} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong fixed bottom-24 right-5 z-[90] flex h-[min(540px,72vh)] w-[min(380px,92vw)] flex-col rounded-[var(--radius-lg)] overflow-hidden"
            style={{ boxShadow: 'var(--shadow-float)' }}
          >
            <div className="flex items-center justify-between border-b border-[var(--glass-border)] px-4 py-3">
              <div className="flex items-center gap-2 text-hi">
                <span className="text-cyan"><Icon name="core" size={18} /></span>
                <span className="text-sm font-semibold">Lab assistant</span>
              </div>
              <button onClick={() => setConnect(true)} className="micro text-lo hover:text-hi" title="Connect a model">
                {ready ? `${PROVIDERS[provider].label.split(' ')[0]} · ${model.split('-').slice(0, 2).join('-')}` : 'connect'}
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {msgs.map((m, i) => (
                <div key={i} className={cn('max-w-[88%] rounded-[var(--radius-md)] px-3 py-2 text-sm leading-relaxed', m.role === 'user' ? 'ml-auto text-hi' : 'text-mid')}
                  style={m.role === 'user'
                    ? { background: 'color-mix(in oklab, var(--accent) 18%, transparent)', border: '1px solid color-mix(in oklab, var(--accent) 35%, transparent)' }
                    : { background: 'var(--glass)', border: '1px solid var(--glass-border)' }}>
                  <span className="whitespace-pre-wrap">{m.content}</span>
                </div>
              ))}
              {busy && <div className="flex gap-1 px-1 text-lo"><Dot /><Dot d={0.15} /><Dot d={0.3} /></div>}
            </div>

            {!ready && (
              <button onClick={() => setConnect(true)} className="mx-4 mb-2 rounded-[var(--radius-md)] px-3 py-2 text-xs text-hi" style={{ background: 'color-mix(in oklab, var(--teal) 16%, transparent)', border: '1px solid color-mix(in oklab, var(--teal) 40%, transparent)' }}>
                Connect your own model key (free Gemini, or Claude/OpenAI) to chat →
              </button>
            )}

            <div className="flex items-center gap-2 border-t border-[var(--glass-border)] p-3">
              <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()} placeholder="Ask about agents, skills, MCP…"
                className="flex-1 rounded-[var(--radius-md)] bg-[var(--bg-sunken)] px-3 py-2 text-sm text-hi outline-none placeholder:text-faint" style={{ border: '1px solid var(--glass-border-strong)' }} />
              <button onClick={send} disabled={busy} className="grid h-9 w-9 place-items-center rounded-[var(--radius-md)] text-hi disabled:opacity-40" style={{ background: 'color-mix(in oklab, var(--accent) 20%, transparent)', border: '1px solid color-mix(in oklab, var(--accent) 45%, transparent)' }} aria-label="Send">↑</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>{connect && <ConnectPanel onClose={() => setConnect(false)} />}</AnimatePresence>
    </>
  )
}

function Dot({ d = 0 }: { d?: number }) {
  return <motion.span className="h-1.5 w-1.5 rounded-full bg-lo" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: d }} />
}
