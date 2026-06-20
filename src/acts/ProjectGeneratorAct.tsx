import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ACTS, GEN_CARDS } from '@/content/acts'
import { ActShell } from '@/components/scroll/ActShell'
import { Icon } from '@/components/ui/Icon'
import { Badge } from '@/components/ui/Badge'
import { ConnectPanel } from '@/components/chat/ConnectPanel'
import { chat, extractJson, useLlm, PROVIDERS } from '@/lib/llm'

const meta = ACTS.find((a) => a.id === 'generate')!

const SYSTEM = 'You are a senior Claude Code architect. Reply with ONLY a JSON object — no prose, no markdown fences.'
const prompt = (idea: string) =>
  `The user wants to build: "${idea}".\nReturn a JSON object with EXACTLY these string keys, each a concise, practical answer (≤60 words; use "- " bullets where helpful):\n` +
  `prd (goals, target user, MVP scope), arch (recommended stack + structure, frontend-first), prompt (a strong first Claude Code prompt shaped like a project with constraints + verification steps), agents (which subagents to use and when), skills (reusable skills worth creating), mcp (MCP connectors worth wiring), tokens (token/context strategy), phases (build phases in order).`

type Kit = Record<string, string>

export function ProjectGeneratorAct() {
  const { provider, apiKey, model, ready } = useLlm()
  const [idea, setIdea] = useState('')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const [kit, setKit] = useState<Kit | null>(null)
  const [connect, setConnect] = useState(false)

  const generate = async () => {
    if (!idea.trim() || busy) return
    if (!ready) { setConnect(true); return }
    setBusy(true); setErr(''); setKit(null)
    try {
      const text = await chat([{ role: 'user', content: prompt(idea) }], { provider, apiKey: apiKey!, model, system: SYSTEM, maxTokens: 1800 })
      const json = extractJson<Kit>(text)
      setKit(json)
    } catch (e) {
      setErr((e as Error).message)
    } finally { setBusy(false) }
  }

  return (
    <ActShell meta={meta} layout="stacked">
      <div className="flex flex-col gap-7">
        <div className="flex items-center gap-2">
          <Badge hue="--c-hero">live</Badge>
          <button onClick={() => setConnect(true)} className="micro text-lo hover:text-hi">
            {ready ? `${PROVIDERS[provider].label.split(' ')[0]} · ${model}` : 'connect your own key →'}
          </button>
        </div>

        {/* idea input */}
        <div className="rounded-[var(--radius-lg)] glass p-5">
          <label className="micro text-mid" htmlFor="idea">your project idea</label>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <input
              id="idea" value={idea} onChange={(e) => setIdea(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && generate()}
              placeholder="e.g. a habit tracker with streaks and reminders"
              className="flex-1 rounded-[var(--radius-md)] bg-[var(--bg-sunken)] px-4 py-3 text-sm text-hi outline-none placeholder:text-faint"
              style={{ border: '1px solid var(--glass-border-strong)' }}
            />
            <button onClick={generate} disabled={!idea.trim() || busy}
              className="rounded-[var(--radius-md)] px-5 py-3 text-sm font-medium text-hi transition-opacity disabled:opacity-40"
              style={{ background: 'color-mix(in oklab, var(--accent) 18%, transparent)', border: '1px solid color-mix(in oklab, var(--accent) 45%, transparent)' }}>
              {busy ? 'Generating…' : 'Generate kit'}
            </button>
          </div>
          <p className="mt-2 text-[11px] text-faint">Runs on your own model key — billed to your provider account, never to this lab.</p>
          <AnimatePresence>
            {err && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-xs" style={{ color: 'var(--gauge-high)' }}>⚠️ {err}</motion.p>}
          </AnimatePresence>
        </div>

        {/* output cards */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {GEN_CARDS.map((c, i) => {
            const content = kit?.[c.id]
            const filled = !!content
            return (
              <motion.div key={c.id}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.4, delay: i * 0.04 }}
                className="relative flex flex-col overflow-hidden rounded-[var(--radius-lg)] glass p-4"
                style={{ border: `1px solid color-mix(in oklab, var(${c.hue}) ${filled ? 50 : 26}%, transparent)`, boxShadow: filled ? `0 0 22px -8px color-mix(in oklab, var(${c.hue}) 60%, transparent)` : 'none' }}>
                <div className="mb-3 flex items-center justify-between">
                  <div className="grid h-9 w-9 place-items-center rounded-[var(--radius-sm)]" style={{ color: `var(${c.hue})`, background: `color-mix(in oklab, var(${c.hue}) 14%, transparent)` }}>
                    <Icon name={c.icon} size={18} />
                  </div>
                  <span className="micro" style={{ color: filled ? `var(${c.hue})` : 'var(--text-faint)' }}>{busy ? 'working' : filled ? 'ready' : 'idle'}</span>
                </div>
                <div className="text-sm font-semibold text-hi">{c.label}</div>
                {filled ? (
                  <div className="mt-2 max-h-48 overflow-y-auto whitespace-pre-wrap text-xs leading-relaxed text-mid">{content}</div>
                ) : (
                  <div className="mt-1 text-xs text-lo">{c.hint}</div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>

      <AnimatePresence>{connect && <ConnectPanel onClose={() => setConnect(false)} />}</AnimatePresence>
    </ActShell>
  )
}
