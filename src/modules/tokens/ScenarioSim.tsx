import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { SCENARIOS } from '@/content/tokens'
import { TokenGauge } from '@/components/viz/TokenGauge'
import { ContextWorkbench } from '@/components/viz/ContextWorkbench'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { cn } from '@/lib/cn'

/** Try-it-yourself: pick a routing strategy, watch fuel + bench react live. */
export function ScenarioSim() {
  const [idx, setIdx] = useState(0)
  const s = SCENARIOS[idx]

  return (
    <div className="flex flex-col gap-5">
      {/* scenario selector */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {SCENARIOS.map((sc, i) => {
          const selected = i === idx
          return (
            <button
              key={sc.id}
              onClick={() => setIdx(i)}
              className={cn(
                'rounded-[var(--radius-md)] border p-3 text-left transition-all',
                selected ? 'glass-strong' : 'glass hover:border-[var(--glass-border-strong)]',
              )}
              style={selected ? { borderColor: 'color-mix(in oklab, var(--c-tokens) 55%, transparent)' } : undefined}
              aria-pressed={selected}
            >
              <div className="flex items-center gap-2">
                <span
                  className="grid h-5 w-5 place-items-center rounded-full text-[11px] font-bold"
                  style={{
                    background: selected ? 'var(--c-tokens)' : 'var(--glass-border-strong)',
                    color: selected ? 'var(--bg-void)' : 'var(--text-mid)',
                  }}
                >
                  {sc.id}
                </span>
                <span className="text-sm font-medium text-hi">{sc.label}</span>
              </div>
              <p className="mt-1.5 text-xs leading-snug text-lo">{sc.desc}</p>
            </button>
          )
        })}
      </div>

      {/* live visualization */}
      <GlassPanel className="grid grid-cols-1 items-center gap-6 p-6 md:grid-cols-[auto_1fr]">
        <div className="flex flex-col items-center gap-2">
          <TokenGauge value={s.contextFill} />
          <div className="flex items-center gap-4 text-center">
            <div>
              <div className="font-mono text-lg font-semibold text-hi">{s.fuelBurn}%</div>
              <div className="text-[10px] uppercase tracking-wider text-lo">fuel burned</div>
            </div>
          </div>
        </div>
        <ContextWorkbench items={s.benchItems} />
      </GlassPanel>

      {/* takeaway */}
      <AnimatePresence mode="wait">
        <motion.div
          key={s.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className="flex items-start gap-3 rounded-[var(--radius-md)] border border-[var(--glass-border)] bg-[var(--glass)] p-4"
        >
          <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-tokens" style={{ boxShadow: '0 0 10px var(--c-tokens)' }} />
          <p className="text-sm leading-relaxed text-mid">
            <span className="font-semibold text-hi">Takeaway — </span>
            {s.takeaway}
          </p>
        </motion.div>
      </AnimatePresence>

      <p className="text-[11px] leading-relaxed text-faint">
        Values are conceptual illustrations of context pressure, not exact token billing.
      </p>
    </div>
  )
}
