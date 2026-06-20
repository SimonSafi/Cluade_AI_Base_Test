import { useTime, useTransform, motion } from 'motion/react'

/* Document-spanning neon "circulatory system": a few meandering conduits running the full
   height of the page with energy pulses flowing down — makes every section feel part of one
   living organism. viewBox is stretched (preserveAspectRatio none) to the full page height. */

const VEINS = [
  { d: 'M 9 0 C 20 120, 2 220, 12 340 S 26 560, 8 700 S 20 880, 10 1000', delay: 0 },
  { d: 'M 31 0 C 24 140, 38 260, 30 380 S 20 600, 34 740 S 26 900, 30 1000', delay: -6 },
  { d: 'M 69 0 C 76 130, 62 250, 70 370 S 80 590, 66 730 S 74 900, 70 1000', delay: -10 },
  { d: 'M 91 0 C 80 110, 98 230, 88 360 S 74 580, 92 720 S 80 900, 90 1000', delay: -14 },
]

function Vein({ d, delay }: { d: string; delay: number }) {
  const t = useTime()
  // pulses flow downward continuously
  const off = useTransform(t, (ms) => -((ms / 45) + delay * 50) % 100000)
  return (
    <g>
      {/* soft conductor glow */}
      <path d={d} fill="none" stroke="url(#veinGrad)" strokeWidth={3} strokeOpacity={0.12} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      {/* base line */}
      <path d={d} fill="none" stroke="url(#veinGrad)" strokeWidth={0.5} strokeOpacity={0.32} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      {/* flowing neon pulses */}
      <motion.path d={d} fill="none" stroke="url(#veinGrad)" strokeWidth={1.6} strokeLinecap="round" strokeDasharray="3 18" style={{ strokeDashoffset: off, filter: 'drop-shadow(0 0 5px var(--cyan)) drop-shadow(0 0 2px #fff)' }} vectorEffect="non-scaling-stroke" />
    </g>
  )
}

export function NeonVeins() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg className="h-full w-full" viewBox="0 0 100 1000" preserveAspectRatio="none">
        <defs>
          <linearGradient id="veinGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--cyan)" />
            <stop offset="30%" stopColor="var(--accent-2)" />
            <stop offset="55%" stopColor="var(--teal)" />
            <stop offset="78%" stopColor="var(--magenta)" />
            <stop offset="100%" stopColor="var(--blue)" />
          </linearGradient>
        </defs>
        {VEINS.map((v, i) => <Vein key={i} d={v.d} delay={v.delay} />)}
      </svg>
    </div>
  )
}
