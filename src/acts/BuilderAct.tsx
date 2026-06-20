import { motion } from 'motion/react'
import { ACTS, BUILDER_STACK, BUILD_PRINCIPLES } from '@/content/acts'
import { ActShell } from '@/components/scroll/ActShell'
import { Icon } from '@/components/ui/Icon'
import { MicroLabel } from '@/components/ui/MicroLabel'

const meta = ACTS.find((a) => a.id === 'builder')!

export function BuilderAct() {
  return (
    <ActShell meta={meta} layout="split">
      <div className="flex flex-col gap-6">
        <div>
          <MicroLabel hue={meta.hue}>stack</MicroLabel>
          <div className="mt-3 flex flex-wrap gap-2">
            {BUILDER_STACK.map((s) => (
              <span key={s} className="rounded-[var(--radius-pill)] px-3 py-1.5 font-mono text-xs text-mid" style={{ background: 'var(--glass)', border: '1px solid var(--glass-border-strong)' }}>{s}</span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {BUILD_PRINCIPLES.map((p, i) => (
            <motion.div key={p.label}
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-[var(--radius-lg)] glass p-4" style={{ border: `1px solid color-mix(in oklab, var(${p.hue}) 26%, transparent)` }}>
              <div className="mb-2 grid h-9 w-9 place-items-center rounded-[var(--radius-sm)]" style={{ color: `var(${p.hue})`, background: `color-mix(in oklab, var(${p.hue}) 14%, transparent)` }}>
                <Icon name={p.icon} size={18} />
              </div>
              <div className="text-sm font-semibold text-hi">{p.label}</div>
              <div className="mt-1 text-xs leading-snug text-mid">{p.note}</div>
            </motion.div>
          ))}
        </div>

        <p className="text-sm leading-relaxed text-mid">
          Built with Claude Code itself — visual-first, iterated in passes (design system → modules → interactivity → polish → AI). The whole thing is one React page; no backend.
        </p>
      </div>
    </ActShell>
  )
}
