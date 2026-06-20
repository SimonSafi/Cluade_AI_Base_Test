import { useState } from 'react'
import { motion } from 'motion/react'
import { ACTS, CLUSTERS } from '@/content/acts'
import { ActShell } from '@/components/scroll/ActShell'
import { Icon } from '@/components/ui/Icon'
import { MicroLabel } from '@/components/ui/MicroLabel'

const meta = ACTS.find((a) => a.id === 'toolkit')!

export function ToolkitAct() {
  const [focus, setFocus] = useState<string | null>(null)

  return (
    <ActShell meta={meta} layout="stacked">
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CLUSTERS.map((cl, i) => {
            const dim = focus !== null && focus !== cl.id
            return (
              <motion.div
                key={cl.id}
                onMouseEnter={() => setFocus(cl.id)}
                onMouseLeave={() => setFocus(null)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                animate={{ opacity: dim ? 0.45 : 1, scale: focus === cl.id ? 1.02 : 1 }}
                className="group relative overflow-hidden rounded-[var(--radius-lg)] glass p-5"
                style={{ border: `1px solid color-mix(in oklab, var(${cl.hue}) ${focus === cl.id ? 55 : 22}%, transparent)` }}
              >
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-2xl transition-opacity"
                  style={{ background: `var(${cl.hue})`, opacity: focus === cl.id ? 0.22 : 0.1 }}
                />
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-8 w-8 place-items-center rounded-[var(--radius-sm)]" style={{ color: `var(${cl.hue})`, background: `color-mix(in oklab, var(${cl.hue}) 14%, transparent)`, border: `1px solid color-mix(in oklab, var(${cl.hue}) 35%, transparent)` }}>
                      <Icon name={cl.icon} size={17} />
                    </span>
                    <span className="text-sm font-semibold text-hi">{cl.label}</span>
                  </div>
                  <span className="micro text-faint">{cl.items.length}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cl.items.map((it) => (
                    <span
                      key={it}
                      className="rounded-[var(--radius-pill)] px-2.5 py-1 font-mono text-[11px]"
                      style={{ color: `var(${cl.hue})`, background: `color-mix(in oklab, var(${cl.hue}) 12%, transparent)`, border: `1px solid color-mix(in oklab, var(${cl.hue}) 28%, transparent)` }}
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
        <MicroLabel hue={meta.hue}>curated from your installed skills + connectors — grouped by purpose</MicroLabel>
      </div>
    </ActShell>
  )
}
