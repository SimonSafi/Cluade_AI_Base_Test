import { useTime, useTransform, motion } from 'motion/react'

/** deterministic pseudo-random in [0,1) */
function rnd(a: number, b: number) {
  const s = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453
  return s - Math.floor(s)
}

export function bolt(x1: number, y1: number, x2: number, y2: number, step: number, amp: number, seg = 5) {
  const dx = x2 - x1
  const dy = y2 - y1
  const len = Math.hypot(dx, dy) || 1
  const nx = -dy / len
  const ny = dx / len
  let d = `M ${x1.toFixed(2)} ${y1.toFixed(2)}`
  for (let i = 1; i < seg; i++) {
    const t = i / seg
    const j = (rnd(step + i, i * 3.1) - 0.5) * amp * Math.sin(t * Math.PI)
    d += ` L ${(x1 + dx * t + nx * j).toFixed(2)} ${(y1 + dy * t + ny * j).toFixed(2)}`
  }
  return d + ` L ${x2.toFixed(2)} ${y2.toFixed(2)}`
}

/** Electric arc with travelling SIGNAL PULSES (running dashes, not blobs).
    Render inside an <svg viewBox="0 0 100 100">. */
export function ElectricArc({
  x1, y1, x2, y2, hue = '--cyan', active = false, dir = 'out', phase = 0,
}: {
  x1: number; y1: number; x2: number; y2: number; hue?: string; active?: boolean; dir?: 'in' | 'out'; phase?: number
}) {
  const t = useTime()
  const amp = active ? 5 : 3
  const d = useTransform(t, (ms) => bolt(x1, y1, x2, y2, Math.floor(ms / 80) + phase * 7, amp))
  const op = useTransform(t, (ms) => (active ? 0.4 : 0.2) + 0.3 * rnd(Math.floor(ms / 70) + phase, 4))
  const off = useTransform(t, (ms) => (dir === 'out' ? -1 : 1) * ((ms / 45 + phase * 50)))
  const c = `var(${hue})`
  return (
    <g>
      {/* faint conductor */}
      <motion.path d={d} fill="none" stroke={c} strokeWidth={0.25} strokeOpacity={op} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      {/* running signal pulses */}
      <motion.path d={d} fill="none" stroke={c} strokeWidth={active ? 0.9 : 0.6} strokeLinecap="round" strokeDasharray="2.5 15" style={{ strokeDashoffset: off, filter: `drop-shadow(0 0 2px ${c})` }} vectorEffect="non-scaling-stroke" />
    </g>
  )
}
