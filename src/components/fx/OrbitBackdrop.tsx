import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

/* Per-act spacey backdrop: a drifting ringed planet, elliptical orbits, nebula glow.
   Subtle — sits behind content, hue-tinted by the act. */

const SPOTS = [
  { px: '82%', py: '18%', size: 200 },
  { px: '12%', py: '74%', size: 250 },
  { px: '88%', py: '70%', size: 170 },
  { px: '8%', py: '20%', size: 220 },
]

export function OrbitBackdrop({ hue = '--accent', seed = 0 }: { hue?: string; seed?: number }) {
  const spot = SPOTS[seed % SPOTS.length]
  const c = `var(${hue})`
  const ref = useRef<HTMLDivElement>(null)
  // only animate when this act is on screen — keeps the page light + smooth
  const live = useInView(ref, { margin: '0px 0px -10% 0px' })

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* nebula glow — gradient (no blur filter) keeps it cheap */}
      <div
        className="absolute h-[70vh] w-[70vh] rounded-full"
        style={{ left: spot.px, top: spot.py, transform: 'translate(-50%,-50%)', background: `radial-gradient(circle, color-mix(in oklab, ${c} 16%, transparent), transparent 62%)`, opacity: 0.85 }}
      />

      {/* faint elliptical orbits, slowly counter-rotating */}
      <motion.svg
        className="absolute left-1/2 top-1/2 h-[120vh] w-[120vh] -translate-x-1/2 -translate-y-1/2"
        viewBox="0 0 100 100"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        animate={live ? { rotate: seed % 2 ? -360 : 360 } : {}}
        transition={{ duration: 220, repeat: Infinity, ease: 'linear' }}
      >
        <ellipse cx="50" cy="50" rx="46" ry="22" fill="none" stroke={c} strokeOpacity="0.08" strokeWidth="0.15" />
        <ellipse cx="50" cy="50" rx="38" ry="40" fill="none" stroke={c} strokeOpacity="0.06" strokeWidth="0.15" transform="rotate(28 50 50)" />
      </motion.svg>

      {/* drifting ringed planet */}
      <motion.div
        className="absolute"
        style={{ left: spot.px, top: spot.py, width: spot.size, height: spot.size, transform: 'translate(-50%,-50%)' }}
        animate={live ? { x: [0, 18, -10, 0], y: [0, -14, 12, 0] } : {}}
        transition={{ duration: 40, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* the sphere */}
        <div
          className="absolute inset-[18%] rounded-full"
          style={{
            background: `radial-gradient(35% 35% at 35% 30%, color-mix(in oklab, ${c} 55%, #fff 10%), color-mix(in oklab, ${c} 30%, transparent) 45%, color-mix(in oklab, var(--bg-void) 80%, ${c}) 100%)`,
            boxShadow: `inset -8px -10px 26px rgba(0,0,0,0.6), 0 0 60px -10px ${c}`,
            opacity: 0.5,
          }}
        />
        {/* planetary ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{ border: `1px solid color-mix(in oklab, ${c} 40%, transparent)`, transform: 'rotateX(74deg) rotateZ(18deg)', opacity: 0.5 }}
        />
        {/* a tiny moon orbiting */}
        <motion.div className="absolute inset-0" animate={live ? { rotate: 360 } : {}} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}>
          <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full" style={{ background: c, boxShadow: `0 0 8px ${c}` }} />
        </motion.div>
      </motion.div>
    </div>
  )
}
