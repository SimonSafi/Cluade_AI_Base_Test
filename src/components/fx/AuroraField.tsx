import { motion } from 'motion/react'

/** Soft drifting holographic light blobs behind a scene. */
export function AuroraField({ hue = '--accent', hue2 = '--accent-2' }: { hue?: string; hue2?: string }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -left-24 top-0 h-[42rem] w-[42rem] rounded-full blur-[120px]"
        style={{ background: `radial-gradient(circle, color-mix(in oklab, var(${hue}) 38%, transparent), transparent 70%)` }}
        animate={{ x: [0, 60, -20, 0], y: [0, 40, -30, 0], scale: [1, 1.12, 0.95, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-24 bottom-0 h-[40rem] w-[40rem] rounded-full blur-[120px]"
        style={{ background: `radial-gradient(circle, color-mix(in oklab, var(${hue2}) 32%, transparent), transparent 70%)` }}
        animate={{ x: [0, -50, 30, 0], y: [0, -40, 20, 0], scale: [1, 0.92, 1.1, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
