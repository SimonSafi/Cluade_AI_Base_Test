import { motion, useSpring, useTransform } from 'motion/react'
import { useEffect } from 'react'

interface Props {
  /** 0..100 context fill */
  value: number
  size?: number
  label?: string
}

function colorFor(v: number): string {
  if (v < 45) return 'var(--gauge-low)'
  if (v < 75) return 'var(--gauge-mid)'
  return 'var(--gauge-high)'
}

/** Fuel/battery meter — a 270° radial gauge. Reused on Home + Tokens module. */
export function TokenGauge({ value, size = 180, label = 'context used' }: Props) {
  const spring = useSpring(0, { stiffness: 90, damping: 18 })
  useEffect(() => {
    spring.set(Math.max(0, Math.min(100, value)))
  }, [value, spring])

  const r = size / 2 - 14
  const cx = size / 2
  const cy = size / 2
  const sweep = 270 // degrees
  const circumference = 2 * Math.PI * r
  const arcLen = (sweep / 360) * circumference

  const offset = useTransform(spring, (v) => arcLen - (v / 100) * arcLen)
  const display = useTransform(spring, (v) => Math.round(v))
  const stroke = colorFor(value)

  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-[225deg]">
        {/* track */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="var(--glass-border-strong)"
          strokeWidth={12}
          strokeLinecap="round"
          strokeDasharray={`${arcLen} ${circumference}`}
        />
        {/* fill */}
        <motion.circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={stroke}
          strokeWidth={12}
          strokeLinecap="round"
          strokeDasharray={`${arcLen} ${circumference}`}
          style={{ strokeDashoffset: offset, filter: `drop-shadow(0 0 8px ${stroke})` }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <motion.span className="font-mono text-3xl font-semibold text-hi">{display}</motion.span>
        <span className="text-[11px] uppercase tracking-wider text-lo">% {label}</span>
      </div>
    </div>
  )
}
