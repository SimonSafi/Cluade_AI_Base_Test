import { motion } from 'motion/react'

function hueFor(v: number) {
  if (v < 45) return '--gauge-low'
  if (v < 75) return '--gauge-mid'
  return '--gauge-high'
}

/** Vertical context "fuel tank" — fills with capacity, segmented cells, rising signal particles. */
export function ContextTank({ value }: { value: number }) {
  const v = Math.max(0, Math.min(100, value))
  const hue = hueFor(v)
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-[190px] w-14 overflow-hidden rounded-[var(--radius-md)] border border-[var(--glass-border-strong)] bg-[var(--bg-sunken)]">
        {/* fill */}
        <motion.div
          className="absolute inset-x-0 bottom-0"
          animate={{ height: `${v}%` }}
          transition={{ type: 'spring', stiffness: 90, damping: 18 }}
          style={{ background: `linear-gradient(to top, color-mix(in oklab, var(${hue}) 70%, transparent), color-mix(in oklab, var(${hue}) 30%, transparent))` }}
        >
          {/* surface line */}
          <div className="absolute inset-x-0 top-0 h-px" style={{ background: `var(${hue})`, boxShadow: `0 0 10px var(${hue})` }} />
          {/* rising particles */}
          {[0, 1, 2, 3].map((i) => (
            <motion.span
              key={i}
              className="absolute h-1 w-1 rounded-full"
              style={{ left: `${18 + i * 20}%`, background: `var(${hue})` }}
              animate={{ y: [10, -160], opacity: [0, 1, 0] }}
              transition={{ duration: 3 + i * 0.6, repeat: Infinity, ease: 'easeIn', delay: i * 0.5 }}
            />
          ))}
        </motion.div>
        {/* segmented fuel cells */}
        <div className="absolute inset-0 flex flex-col">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex-1 border-b border-[var(--glass-border)]" />
          ))}
        </div>
      </div>
      <div className="text-center">
        <div className="font-mono text-sm font-semibold" style={{ color: `var(${hue})` }}>{Math.round(v)}%</div>
        <div className="micro text-faint">context tank</div>
      </div>
    </div>
  )
}
