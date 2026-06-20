import { motion } from 'motion/react'

const spin = (dur: number, dir = 1) => ({
  rotate: dir * 360,
  transition: { duration: dur, repeat: Infinity, ease: 'linear' as const },
})
const ringStyle = { transformBox: 'fill-box' as const, transformOrigin: 'center' }

/** Crisp vector command core — segmented rotating rings, radar sweep, pulsing reactor. */
export function CommandCore({ size = 240 }: { size?: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* radar sweep */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, transparent 0deg, color-mix(in oklab, var(--cyan) 26%, transparent) 38deg, transparent 70deg)',
          maskImage: 'radial-gradient(circle, #000 62%, transparent 63%)',
          WebkitMaskImage: 'radial-gradient(circle, #000 62%, transparent 63%)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
      />

      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id="coreFill" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="var(--cyan)" stopOpacity="0.55" />
            <stop offset="55%" stopColor="var(--accent-2)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <linearGradient id="seg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--cyan)" />
            <stop offset="100%" stopColor="var(--accent-2)" />
          </linearGradient>
        </defs>

        {/* outer dashed ring */}
        <motion.circle cx="100" cy="100" r="92" fill="none" stroke="var(--glass-border-strong)" strokeWidth="1" strokeDasharray="2 6" style={ringStyle} animate={spin(60)} />

        {/* mid segmented ring */}
        <motion.g style={ringStyle} animate={spin(26, -1)}>
          <circle cx="100" cy="100" r="74" fill="none" stroke="var(--glass-border)" strokeWidth="6" />
          {[0, 90, 180, 270].map((a) => (
            <circle key={a} cx="100" cy="100" r="74" fill="none" stroke="url(#seg)" strokeWidth="6" strokeLinecap="round" strokeDasharray="58 407" strokeDashoffset={-a * 1.29} opacity="0.9" />
          ))}
        </motion.g>

        {/* tick ring */}
        <motion.g style={ringStyle} animate={spin(40)}>
          {Array.from({ length: 36 }).map((_, i) => (
            <line key={i} x1="100" y1="44" x2="100" y2={i % 3 === 0 ? 50 : 47} stroke="var(--cyan)" strokeWidth="1" opacity={i % 3 === 0 ? 0.7 : 0.3} transform={`rotate(${i * 10} 100 100)`} />
          ))}
        </motion.g>

        {/* hexagon reactor */}
        <circle cx="100" cy="100" r="40" fill="url(#coreFill)" />
        <motion.path
          d="M100 64 131 82 131 118 100 136 69 118 69 82Z"
          fill="color-mix(in oklab, var(--cyan) 10%, transparent)"
          stroke="var(--cyan)"
          strokeWidth="1.5"
          style={ringStyle}
          animate={spin(34)}
        />
        <motion.path
          d="M100 74 122 87 122 113 100 126 78 113 78 87Z"
          fill="none"
          stroke="var(--accent-2)"
          strokeWidth="1"
          opacity="0.7"
          style={ringStyle}
          animate={spin(22, -1)}
        />

        {/* pulsing center node */}
        <motion.circle cx="100" cy="100" r="7" fill="var(--cyan)" animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }} style={{ filter: 'drop-shadow(0 0 8px var(--cyan))' }} />
        {[0, 1].map((i) => (
          <motion.circle key={i} cx="100" cy="100" r="7" fill="none" stroke="var(--cyan)" strokeWidth="1.5" animate={{ r: [7, 30], opacity: [0.7, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeOut', delay: i * 1.5 }} />
        ))}
      </svg>
    </div>
  )
}
