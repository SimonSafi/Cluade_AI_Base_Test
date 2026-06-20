import { motion } from 'motion/react'

const HEAD =
  'M100 14 C138 14 158 40 160 78 C161 100 156 118 146 134 C140 144 134 152 126 162 C118 172 110 184 100 196 C90 184 82 172 74 162 C66 152 60 144 54 134 C44 118 39 100 40 78 C42 40 62 14 100 14 Z'

/** Holographic android/alien "main AI" head — brain core, glowing eyes, circuit contours, scan. */
export function AiHead({ size = 280 }: { size?: number }) {
  return (
    <motion.div
      style={{ width: size, height: size * 1.16 }}
      animate={{ scale: [1, 1.015, 1] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg viewBox="0 0 200 230" className="h-full w-full" style={{ overflow: 'visible' }}>
        <defs>
          <clipPath id="aiHeadClip"><path d={HEAD} /></clipPath>
          <radialGradient id="aiGlow" cx="50%" cy="42%" r="60%">
            <stop offset="0%" stopColor="var(--cyan)" stopOpacity="0.45" />
            <stop offset="45%" stopColor="var(--accent-2)" stopOpacity="0.16" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <linearGradient id="aiEdge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--cyan)" />
            <stop offset="100%" stopColor="var(--accent-2)" />
          </linearGradient>
        </defs>

        {/* aura */}
        <ellipse cx="100" cy="100" rx="96" ry="110" fill="url(#aiGlow)" />

        {/* face fill + clipped interior */}
        <g clipPath="url(#aiHeadClip)">
          <path d={HEAD} fill="color-mix(in oklab, var(--cyan) 7%, transparent)" />
          {/* topographic facial contours */}
          <g fill="none" stroke="var(--cyan)" strokeWidth="0.8" strokeOpacity="0.4">
            <path d="M58 70 Q100 60 142 70" />
            <path d="M54 92 Q100 86 146 92" />
            <path d="M56 112 Q100 124 144 112" />
            <path d="M66 134 Q100 146 134 134" />
            <path d="M78 154 Q100 166 122 154" />
            <path d="M100 38 L100 168" strokeOpacity="0.22" />
          </g>
          {/* android side plating */}
          <g fill="none" stroke="var(--accent-2)" strokeWidth="0.7" strokeOpacity="0.5">
            <path d="M48 96 L70 120 L66 150" />
            <path d="M152 96 L130 120 L134 150" />
          </g>
          {/* scan sweep */}
          <motion.rect
            x="0" width="200" height="10" fill="var(--cyan)" opacity="0.12"
            animate={{ y: [20, 196, 20] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </g>

        {/* head outline */}
        <path d={HEAD} fill="none" stroke="url(#aiEdge)" strokeWidth="1.6" style={{ filter: 'drop-shadow(0 0 4px var(--cyan))' }} />

        {/* eyes */}
        {[76, 124].map((ex, i) => (
          <g key={ex}>
            <motion.path
              d={`M${ex - 13} 95 Q${ex} 86 ${ex + 13} 95 Q${ex} 103 ${ex - 13} 95 Z`}
              fill="color-mix(in oklab, var(--cyan) 30%, transparent)"
              stroke="var(--cyan)" strokeWidth="0.8"
              animate={{ opacity: [1, 0.45, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
            />
            <motion.circle cx={ex} cy="95" r="2.4" fill="var(--cyan)" style={{ filter: 'drop-shadow(0 0 4px var(--cyan))' }} animate={{ opacity: [1, 0.6, 1] }} transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3 }} />
          </g>
        ))}

        {/* brain / AI core at forehead */}
        <g>
          <path d="M86 56 Q100 46 114 56" fill="none" stroke="var(--accent-2)" strokeWidth="0.8" strokeOpacity="0.7" />
          <path d="M82 62 Q100 50 118 62" fill="none" stroke="var(--cyan)" strokeWidth="0.8" strokeOpacity="0.5" />
          <motion.circle cx="100" cy="60" r="5.5" fill="var(--cyan)" style={{ filter: 'drop-shadow(0 0 8px var(--cyan))' }}
            animate={{ opacity: [1, 0.5, 1], scale: [1, 1.18, 1] }} transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }} />
        </g>

        {/* circuit nodes */}
        {[[60, 86], [140, 86], [70, 130], [130, 130], [100, 176], [100, 38]].map(([x, y], i) => (
          <motion.circle key={i} cx={x} cy={y} r="1.6" fill="var(--accent-2)"
            animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }} />
        ))}

        {/* mouth / vocoder */}
        <g stroke="var(--cyan)" strokeWidth="0.8" strokeOpacity="0.55">
          {[90, 96, 102, 110].map((x, i) => (
            <motion.line key={x} x1={x} y1={172} x2={x} y2={178} animate={{ y2: [178, 174, 178] }} transition={{ duration: 0.9 + i * 0.15, repeat: Infinity, ease: 'easeInOut' }} />
          ))}
        </g>
      </svg>
    </motion.div>
  )
}
