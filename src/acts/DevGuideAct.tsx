import { useState } from 'react'
import { motion } from 'motion/react'
import { ACTS, FILE_TYPES, DEPLOY_STAGES, CC_TIPS, CC_TERMS } from '@/content/acts'
import { ActShell } from '@/components/scroll/ActShell'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'

const meta = ACTS.find((a) => a.id === 'devguide')!

type Tab = 'files' | 'deploy' | 'tips'
const TABS: { id: Tab; label: string }[] = [
  { id: 'files', label: 'File types' },
  { id: 'deploy', label: 'Local vs standalone' },
  { id: 'tips', label: 'Claude Code tips' },
]

export function DevGuideAct() {
  const [tab, setTab] = useState<Tab>('files')

  return (
    <ActShell meta={meta} layout="stacked">
      <div className="flex flex-col gap-6">
        {/* segmented control */}
        <div className="flex flex-wrap gap-2">
          {TABS.map((t) => {
            const on = t.id === tab
            return (
              <button key={t.id} onClick={() => setTab(t.id)} className={cn('rounded-[var(--radius-pill)] px-4 py-1.5 text-sm transition-all', on ? 'text-hi' : 'text-mid hover:text-hi')}
                style={{ background: on ? 'color-mix(in oklab, var(--c-think) 18%, transparent)' : 'var(--glass)', border: `1px solid ${on ? 'color-mix(in oklab, var(--c-think) 50%, transparent)' : 'var(--glass-border)'}` }}>
                {t.label}
              </button>
            )
          })}
        </div>

        <div>
          <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }}>
            {tab === 'files' && (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {FILE_TYPES.map((f) => (
                  <div key={f.ext} className="rounded-[var(--radius-lg)] glass p-4" style={{ border: `1px solid color-mix(in oklab, var(${f.hue}) 26%, transparent)` }}>
                    <div className="mb-2 flex items-center gap-2.5">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[var(--radius-sm)]" style={{ color: `var(${f.hue})`, background: `color-mix(in oklab, var(${f.hue}) 14%, transparent)` }}><Icon name={f.icon} size={16} /></span>
                      <code className="font-mono text-sm text-hi">{f.ext}</code>
                    </div>
                    <div className="text-xs leading-snug text-mid">{f.what}</div>
                    <div className="mt-2 micro" style={{ color: `var(${f.hue})` }}>when</div>
                    <div className="text-[11px] leading-snug text-lo">{f.when}</div>
                  </div>
                ))}
              </div>
            )}

            {tab === 'deploy' && (
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {DEPLOY_STAGES.map((s, i) => (
                    <div key={s.label} className="relative rounded-[var(--radius-lg)] glass p-4" style={{ border: `1px solid color-mix(in oklab, var(${s.hue}) 30%, transparent)` }}>
                      <div className="mb-2 flex items-center gap-2.5">
                        <span className="grid h-8 w-8 place-items-center rounded-[var(--radius-sm)]" style={{ color: `var(${s.hue})`, background: `color-mix(in oklab, var(${s.hue}) 14%, transparent)` }}><Icon name={s.icon} size={16} /></span>
                        <span className="text-sm font-semibold text-hi">{s.label}</span>
                      </div>
                      <code className="block w-fit rounded-[var(--radius-sm)] bg-[var(--bg-sunken)] px-2 py-1 font-mono text-[11px] text-accent-soft">{s.cmd}</code>
                      <div className="mt-2 text-xs leading-snug text-mid">{s.desc}</div>
                      <div className="mt-2 micro" style={{ color: `var(${s.hue})` }}>reach · {s.reach}</div>
                      {i < DEPLOY_STAGES.length - 1 && <span className="absolute -right-2.5 top-1/2 hidden -translate-y-1/2 text-lo sm:block">→</span>}
                    </div>
                  ))}
                </div>
                <div className="flex items-start gap-2 rounded-[var(--radius-md)] px-3 py-2.5 glass">
                  <span className="mt-0.5 text-cyan"><Icon name="spark" size={15} /></span>
                  <span className="text-xs leading-snug text-mid"><strong className="text-hi">Localhost</strong> is your private workshop while building; <strong className="text-hi">standalone</strong> is the same app built once and hosted so anyone can open a URL. Same code — different audience.</span>
                </div>
              </div>
            )}

            {tab === 'tips' && (
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {CC_TIPS.map((t) => (
                    <div key={t.label} className="rounded-[var(--radius-lg)] glass p-4" style={{ border: `1px solid color-mix(in oklab, var(${t.hue}) 26%, transparent)` }}>
                      <div className="mb-2 grid h-8 w-8 place-items-center rounded-[var(--radius-sm)]" style={{ color: `var(${t.hue})`, background: `color-mix(in oklab, var(${t.hue}) 14%, transparent)` }}><Icon name={t.icon} size={16} /></div>
                      <div className="text-sm font-semibold text-hi">{t.label}</div>
                      <div className="mt-1 text-xs leading-snug text-mid">{t.note}</div>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="mb-2 micro text-faint">terminology</div>
                  <div className="flex flex-wrap gap-1.5">
                    {CC_TERMS.map((t) => (
                      <span key={t} className="rounded-[var(--radius-pill)] px-2.5 py-1 font-mono text-[11px] text-mid" style={{ background: 'var(--glass)', border: '1px solid var(--glass-border-strong)' }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </ActShell>
  )
}
