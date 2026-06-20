import { motion } from 'motion/react'
import { ACTS, RESOURCES } from '@/content/acts'
import { ActShell } from '@/components/scroll/ActShell'
import { Icon } from '@/components/ui/Icon'

const meta = ACTS.find((a) => a.id === 'resources')!

export function ResourcesAct() {
  return (
    <ActShell meta={meta} layout="stacked">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {RESOURCES.map((r, i) => (
          <motion.a
            key={r.url} href={r.url} target="_blank" rel="noopener noreferrer"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.4, delay: i * 0.05 }}
            whileHover={{ y: -3 }}
            className="group relative flex items-center gap-3 overflow-hidden rounded-[var(--radius-lg)] glass p-4"
            style={{ border: `1px solid color-mix(in oklab, var(${r.hue}) 28%, transparent)` }}
          >
            <span className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full blur-2xl opacity-0 transition-opacity group-hover:opacity-25" style={{ background: `var(${r.hue})` }} />
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[var(--radius-md)]" style={{ color: `var(${r.hue})`, background: `color-mix(in oklab, var(${r.hue}) 14%, transparent)`, border: `1px solid color-mix(in oklab, var(${r.hue}) 35%, transparent)` }}>
              <Icon name={r.icon} size={20} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold text-hi">{r.label}</div>
              <div className="micro text-faint">{r.kind}</div>
            </div>
            <span className="text-lo transition-transform group-hover:translate-x-0.5" style={{ color: `var(${r.hue})` }}>↗</span>
          </motion.a>
        ))}
      </div>
    </ActShell>
  )
}
