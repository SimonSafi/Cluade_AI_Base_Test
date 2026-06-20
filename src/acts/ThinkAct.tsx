import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { ACTS, THINK_STAGES } from '@/content/acts'
import { Icon } from '@/components/ui/Icon'
import { MicroLabel } from '@/components/ui/MicroLabel'
import { OrbitBackdrop } from '@/components/fx/OrbitBackdrop'

const meta = ACTS.find((a) => a.id === 'think')!
const N = THINK_STAGES.length

/** Pinned, centered diagram. Scroll advances the active stage in place — nothing drifts. */
export function ThinkAct() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const el = ref.current
        if (!el) return
        const total = el.offsetHeight - window.innerHeight
        if (total <= 0) return
        const p = Math.min(1, Math.max(0, -el.getBoundingClientRect().top / total))
        setActive(Math.min(N - 1, Math.max(0, Math.round(p * (N - 1)))))
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const stage = THINK_STAGES[active]
  const fillPct = (active / (N - 1)) * 100
  const done = active >= N - 1

  return (
    <section id={meta.id} ref={ref} className="relative" style={{ height: `${N * 42}vh` }}>
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center gap-10 overflow-hidden px-6">
        <div className="absolute inset-0 -z-10">
          <OrbitBackdrop hue={meta.hue} seed={1} />
        </div>
        {/* heading */}
        <div className="text-center">
          <div className="mb-2 flex items-center justify-center gap-3">
            <span className="font-mono text-sm text-faint">{meta.index}</span>
            <MicroLabel hue={meta.hue}>{meta.kicker}</MicroLabel>
          </div>
          <h2 className="display text-balance text-3xl text-hi sm:text-4xl">{meta.title}</h2>
        </div>

        {/* centered stage track */}
        <div className="relative w-full max-w-4xl">
          {/* base + progress rail */}
          <div className="absolute left-0 right-0 top-7 h-px bg-[var(--glass-border-strong)] sm:top-8" />
          <motion.div
            className="absolute left-0 top-7 h-px sm:top-8"
            style={{ background: 'linear-gradient(90deg, var(--cyan), var(--violet), var(--accent))', boxShadow: '0 0 12px var(--accent)' }}
            animate={{ width: `${fillPct}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 22 }}
          />
          <div className="relative flex justify-between">
            {THINK_STAGES.map((s, i) => {
              const isDone = i < active
              const isActive = i === active
              const lit = isDone || isActive
              return (
                <div key={s.id} className="flex flex-1 flex-col items-center gap-3">
                  <motion.div
                    className="relative grid h-14 w-14 place-items-center rounded-[var(--radius-md)]"
                    animate={{ scale: isActive ? 1.12 : 1 }}
                    transition={{ type: 'spring', stiffness: 250, damping: 18 }}
                    style={{
                      color: lit ? `var(${s.hue})` : 'var(--text-faint)',
                      background: lit ? `color-mix(in oklab, var(${s.hue}) 16%, var(--glass))` : 'var(--glass)',
                      border: `1px solid color-mix(in oklab, var(${s.hue}) ${isActive ? 80 : lit ? 45 : 18}%, transparent)`,
                      boxShadow: isActive ? `0 0 26px -4px color-mix(in oklab, var(${s.hue}) 75%, transparent)` : 'none',
                    }}
                  >
                    <Icon name={s.icon} size={22} />
                    {isActive && (
                      <motion.span
                        className="absolute inset-0 rounded-[var(--radius-md)]"
                        style={{ border: `1px solid var(${s.hue})` }}
                        animate={{ opacity: [0.8, 0], scale: [1, 1.5] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                      />
                    )}
                  </motion.div>
                  <span className="text-center text-[11px] font-medium" style={{ color: lit ? 'var(--text-hi)' : 'var(--text-lo)' }}>
                    {s.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* in-place focus detail (never moves) — keyed fade, no exit barrier */}
        <div className="flex h-20 items-center justify-center">
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
            className="flex items-center gap-3 rounded-[var(--radius-lg)] glass px-5 py-3"
            style={{ border: `1px solid color-mix(in oklab, var(${stage.hue}) ${done ? 70 : 40}%, transparent)` }}
          >
            <span className="grid h-9 w-9 place-items-center rounded-[var(--radius-sm)]" style={{ color: `var(${stage.hue})`, background: `color-mix(in oklab, var(${stage.hue}) 14%, transparent)` }}>
              <Icon name={stage.icon} size={18} />
            </span>
            <div className="text-left">
              <div className="micro" style={{ color: `var(${stage.hue})` }}>{done ? '✓ ' : ''}{stage.label}</div>
              <div className="text-sm text-hi">{stage.detail}</div>
            </div>
          </motion.div>
        </div>

        <MicroLabel hue={meta.hue}>keep scrolling — same diagram, the work advances</MicroLabel>
      </div>
    </section>
  )
}
