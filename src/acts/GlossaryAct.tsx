import { motion } from 'motion/react'
import { ACTS, GLOSSARY } from '@/content/acts'
import { ActShell } from '@/components/scroll/ActShell'
import { Tooltip } from '@/components/ui/Tooltip'
import { MicroLabel } from '@/components/ui/MicroLabel'

const meta = ACTS.find((a) => a.id === 'glossary')!

export function GlossaryAct() {
  return (
    <ActShell meta={meta} layout="stacked">
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {GLOSSARY.map((g, i) => (
            <Tooltip key={g.term} label={<span><strong className="text-hi">Why — </strong>{g.why}</span>}>
              <motion.div
                initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.4, delay: (i % 2) * 0.05 }}
                className="flex w-full cursor-help items-start gap-3 rounded-[var(--radius-md)] glass p-4"
                style={{ borderColor: `color-mix(in oklab, var(${g.hue}) 26%, transparent)` }}
              >
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full" style={{ background: `var(${g.hue})`, boxShadow: `0 0 8px var(${g.hue})` }} />
                <div>
                  <div className="text-sm font-semibold text-hi">{g.term}</div>
                  <div className="mt-0.5 text-xs leading-snug text-mid">{g.def}</div>
                </div>
              </motion.div>
            </Tooltip>
          ))}
        </div>
        <MicroLabel hue={meta.hue}>hover any term for why it matters</MicroLabel>
      </div>
    </ActShell>
  )
}
