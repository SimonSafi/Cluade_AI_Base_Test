import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, type MotionValue } from 'motion/react'
import { ACTS, WORKFLOW, type WorkStep } from '@/content/acts'
import { ActShell } from '@/components/scroll/ActShell'
import { Icon } from '@/components/ui/Icon'
import { Tooltip } from '@/components/ui/Tooltip'
import { MicroLabel } from '@/components/ui/MicroLabel'
import { useCompact } from '@/lib/compact'

const meta = ACTS.find((a) => a.id === 'workflow')!

function Step({ step, at, p, n }: { step: WorkStep; at: number; p: MotionValue<number>; n: number }) {
  const lit = useTransform(p, (v) => (v >= at - 0.05 ? 1 : 0.32))
  const scale = useTransform(p, (v) => (v >= at - 0.05 ? 1 : 0.92))
  return (
    <motion.div style={{ opacity: lit }} className="flex flex-1 flex-col items-center gap-3 text-center">
      <Tooltip label={step.tip}>
        <motion.div
          style={{ scale, color: `var(${step.hue})`, border: `1px solid color-mix(in oklab, var(${step.hue}) 55%, transparent)`, background: `color-mix(in oklab, var(${step.hue}) 12%, var(--glass))` }}
          className="grid h-16 w-16 cursor-help place-items-center rounded-[var(--radius-lg)]"
          whileHover={{ scale: 1.1 }}
        >
          <Icon name={step.icon} size={24} />
        </motion.div>
      </Tooltip>
      <div className="text-sm font-semibold text-hi">
        <span className="mr-1 font-mono text-xs text-faint">{String(n + 1).padStart(2, '0')}</span>
        {step.label}
      </div>
      <div className="micro text-faint">{step.caption}</div>
    </motion.div>
  )
}

export function WorkflowAct() {
  const compact = useCompact()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.5'] })
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 22 })
  const width = useTransform(p, [0, 1], ['0%', '100%'])

  if (compact) {
    return (
      <ActShell meta={meta} layout="stacked">
        <div className="grid grid-cols-2 gap-x-3 gap-y-6">
          {WORKFLOW.map((step, i) => (
            <div key={step.id} className="flex flex-col items-center gap-2 text-center">
              <div className="grid h-14 w-14 place-items-center rounded-[var(--radius-lg)]" style={{ color: `var(${step.hue})`, border: `1px solid color-mix(in oklab, var(${step.hue}) 55%, transparent)`, background: `color-mix(in oklab, var(${step.hue}) 12%, var(--glass))` }}>
                <Icon name={step.icon} size={22} />
              </div>
              <div className="text-sm font-semibold text-hi">
                <span className="mr-1 font-mono text-xs text-faint">{String(i + 1).padStart(2, '0')}</span>{step.label}
              </div>
              <div className="micro text-faint">{step.caption}</div>
            </div>
          ))}
          <div className="col-span-2 mt-1 flex items-center justify-center gap-2">
            <span className="text-lo">↻</span>
            <MicroLabel hue={meta.hue}>then loop — the power-user cycle</MicroLabel>
          </div>
        </div>
      </ActShell>
    )
  }

  return (
    <ActShell meta={meta} layout="stacked">
      <div ref={ref} className="relative">
        <div className="relative mx-auto hidden h-px w-[calc(100%-4.5rem)] bg-[var(--glass-border-strong)] sm:block">
          <motion.div className="absolute left-0 top-0 h-px" style={{ width, background: 'linear-gradient(90deg, var(--cyan), var(--violet), var(--indigo))', boxShadow: '0 0 12px var(--accent)' }} />
        </div>

        <div className="mt-8 grid grid-cols-2 gap-y-10 sm:-mt-9 sm:flex sm:gap-y-0">
          {WORKFLOW.map((step, i) => (
            <Step key={step.id} step={step} at={i / (WORKFLOW.length - 1)} p={p} n={i} />
          ))}
        </div>

        <div className="mt-12 flex items-center justify-center gap-2">
          <span className="text-lo">↻</span>
          <MicroLabel hue={meta.hue}>hover a phase for the power-user tip — then loop</MicroLabel>
        </div>
      </div>
    </ActShell>
  )
}
