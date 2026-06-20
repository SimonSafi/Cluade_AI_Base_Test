import { AnimatePresence, motion } from 'motion/react'

export interface BenchItem {
  label: string
  kind: 'noise' | 'signal' | 'skill'
  weight: number
}

const KIND_HUE: Record<BenchItem['kind'], string> = {
  noise: '--gauge-high',
  signal: '--c-tokens',
  skill: '--c-skills',
}
const KIND_LABEL: Record<BenchItem['kind'], string> = {
  noise: 'noise',
  signal: 'signal',
  skill: 'on-demand',
}

/** A bench with limited space; items fill it proportionally to their weight. */
export function ContextWorkbench({ items }: { items: BenchItem[] }) {
  const total = items.reduce((s, i) => s + i.weight, 0)
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-lo">
        <span>context workbench</span>
        <span>limited space</span>
      </div>
      <div className="relative h-44 overflow-hidden rounded-[var(--radius-md)] border border-[var(--glass-border-strong)] bg-[var(--bg-sunken)] p-2">
        <div className="flex h-full w-full flex-col gap-1.5">
          <AnimatePresence mode="popLayout">
            {items.map((item) => {
              const pct = (item.weight / total) * 100
              const hue = KIND_HUE[item.kind]
              return (
                <motion.div
                  key={item.label}
                  layout
                  initial={{ opacity: 0, scaleY: 0.5 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  exit={{ opacity: 0, scaleY: 0.5 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex min-h-0 items-center gap-2 overflow-hidden rounded-[var(--radius-sm)] px-3"
                  style={{
                    flexGrow: pct,
                    flexBasis: 0,
                    background: `color-mix(in oklab, var(${hue}) 16%, transparent)`,
                    border: `1px solid color-mix(in oklab, var(${hue}) 38%, transparent)`,
                  }}
                >
                  <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: `var(${hue})` }} />
                  <span className="truncate text-sm font-medium text-hi">{item.label}</span>
                  <span className="ml-auto shrink-0 text-[10px] uppercase tracking-wider" style={{ color: `var(${hue})` }}>
                    {KIND_LABEL[item.kind]}
                  </span>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
