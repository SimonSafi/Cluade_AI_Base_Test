import { useState } from 'react'
import { motion } from 'motion/react'
import { ACTS, TOKENS_TOPIC } from '@/content/acts'
import { SCENARIOS } from '@/content/tokens'
import { ActShell } from '@/components/scroll/ActShell'
import { TokenGauge } from '@/components/viz/TokenGauge'
import { ContextTank } from '@/components/viz/ContextTank'
import { ContextWorkbench } from '@/components/viz/ContextWorkbench'
import { MicroLabel } from '@/components/ui/MicroLabel'
import { Chip } from '@/components/ui/Chip'
import { cn } from '@/lib/cn'

const meta = ACTS.find((a) => a.id === 'tokens')!

export function TokensAct() {
  const [i, setI] = useState(0)
  const s = SCENARIOS[i]

  return (
    <ActShell meta={meta} layout="stacked">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_1fr]">
        {/* interactive sim */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap gap-2">
            {SCENARIOS.map((sc, idx) => {
              const on = idx === i
              return (
                <button key={sc.id} onClick={() => setI(idx)} className={cn('flex items-center gap-2 rounded-[var(--radius-pill)] px-4 py-1.5 text-sm transition-all', on ? 'text-hi' : 'text-mid hover:text-hi')} style={{ background: on ? 'color-mix(in oklab, var(--c-tokens) 18%, transparent)' : 'var(--glass)', border: `1px solid ${on ? 'color-mix(in oklab, var(--c-tokens) 50%, transparent)' : 'var(--glass-border)'}` }}>
                  <span className="grid h-5 w-5 place-items-center rounded-full text-[11px] font-bold" style={{ background: on ? 'var(--c-tokens)' : 'var(--glass-border-strong)', color: on ? 'var(--bg-void)' : 'var(--text-mid)' }}>{sc.id}</span>
                  {sc.label}
                </button>
              )
            })}
          </div>

          <div className="flex flex-col gap-6 rounded-[var(--radius-lg)] glass p-6">
            <div className="flex flex-wrap items-center justify-center gap-8 sm:justify-start">
              <div className="flex flex-col items-center gap-1">
                <TokenGauge value={s.contextFill} size={150} />
                <div className="text-center">
                  <div className="font-mono text-base font-semibold text-hi">{s.fuelBurn}%</div>
                  <div className="micro text-faint">fuel burned</div>
                </div>
              </div>
              <ContextTank value={s.contextFill} />
              <div className="min-w-[180px] flex-1">
                <ContextWorkbench items={s.benchItems} />
              </div>
            </div>
          </div>

          <motion.div key={s.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }}>
            <MicroLabel hue={meta.hue}>{s.takeaway}</MicroLabel>
          </motion.div>
          <p className="text-[11px] text-faint">Conceptual context pressure — not exact token billing.</p>
        </div>

        {/* practical waste vs reduce */}
        <div className="flex flex-col gap-4 rounded-[var(--radius-lg)] glass p-5">
          <p className="text-sm leading-snug text-mid">{TOKENS_TOPIC.what}</p>
          <div>
            <div className="mb-2 micro" style={{ color: 'var(--gauge-high)' }}>wastes context</div>
            <div className="flex flex-col gap-2">{TOKENS_TOPIC.waste.map((t) => <Chip key={t} variant="avoid">{t}</Chip>)}</div>
          </div>
          <div>
            <div className="mb-2 micro" style={{ color: 'var(--teal)' }}>reduces waste</div>
            <div className="flex flex-col gap-2">{TOKENS_TOPIC.reduce.map((t) => <Chip key={t} variant="use">{t}</Chip>)}</div>
          </div>
        </div>
      </div>
    </ActShell>
  )
}
