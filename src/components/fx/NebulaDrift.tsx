import { motion } from 'motion/react'

/* Slow-drifting deep-space nebula clouds — gradient only (no blur filter) so it's cheap.
   Gives the fixed background an alive, breathing, outer-space feel. */
const CLOUDS = [
  { hue: '--blue', x: '14%', y: '20%', size: '70vh', dur: 46, path: { x: [0, 60, -30, 0], y: [0, 40, -20, 0] } },
  { hue: '--indigo', x: '82%', y: '34%', size: '64vh', dur: 58, path: { x: [0, -50, 30, 0], y: [0, -30, 40, 0] } },
  { hue: '--blue', x: '60%', y: '78%', size: '60vh', dur: 52, path: { x: [0, 40, -40, 0], y: [0, -50, 20, 0] } },
  { hue: '--cyan', x: '24%', y: '70%', size: '58vh', dur: 64, path: { x: [0, -40, 50, 0], y: [0, 30, -30, 0] } },
]

export function NebulaDrift() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {CLOUDS.map((c, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ left: c.x, top: c.y, width: c.size, height: c.size, transform: 'translate(-50%,-50%)', background: `radial-gradient(circle, color-mix(in oklab, var(${c.hue}) 9%, transparent), transparent 64%)` }}
          animate={{ x: c.path.x, y: c.path.y, opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: c.dur, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}
