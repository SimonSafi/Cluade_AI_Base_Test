import { useTime, useTransform, motion } from 'motion/react'

/* Document-spanning neon "circulatory system": a few meandering conduits running the full
   height of the page with energy pulses flowing down — makes every section feel part of one
   living organism. viewBox is stretched (preserveAspectRatio none) to the full page height. */

const VEINS = [
  { d: 'M 8 0 C 26 120, -4 230, 14 350 S 32 570, 4 710 S 26 880, 9 1000', delay: 0 },
  { d: 'M 30 0 C 18 150, 44 270, 28 390 S 12 610, 38 750 S 22 900, 31 1000', delay: -6 },
  { d: 'M 70 0 C 82 140, 56 260, 72 380 S 88 600, 60 740 S 80 900, 69 1000', delay: -10 },
  { d: 'M 92 0 C 74 110, 104 240, 86 370 S 68 590, 96 730 S 76 900, 91 1000', delay: -14 },
]

function Vein({ d, delay }: { d: string; delay: number }) {
  const t = useTime()
  // pulses flow downward continuously
  const off = useTransform(t, (ms) => -((ms / 45) + delay * 50) % 100000)
  return (
    <g>
      {/* soft conductor glow */}
      <path d={d} fill="none" stroke="url(#veinGrad)" strokeWidth={3} strokeOpacity={0.09} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      {/* base line */}
      <path d={d} fill="none" stroke="url(#veinGrad)" strokeWidth={0.4} strokeOpacity={0.2} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      {/* flowing neon pulses */}
      <motion.path d={d} fill="none" stroke="url(#veinGrad)" strokeWidth={1.3} strokeLinecap="round" strokeDasharray="2.5 22" style={{ strokeDashoffset: off, filter: 'drop-shadow(0 0 5px var(--cyan)) drop-shadow(0 0 2px #fff)' }} vectorEffect="non-scaling-stroke" />
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
            <stop offset="38%" stopColor="var(--blue)" />
            <stop offset="70%" stopColor="var(--indigo)" />
            <stop offset="100%" stopColor="var(--cyan)" />
          </linearGradient>
        </defs>
        {VEINS.map((v, i) => <Vein key={i} d={v.d} delay={v.delay} />)}
      </svg>
    </div>
  )
}
