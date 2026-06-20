import { motion } from 'motion/react'

/** Thin vertical link with a downward traveling pulse — visual continuity between acts. */
export function SectionConnector({ hue = '--accent' }: { hue?: string }) {
  return (
    <div aria-hidden className="relative mx-auto h-24 w-px" style={{ background: 'linear-gradient(var(--glass-border-strong), transparent)' }}>
      <motion.span
        className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full"
        style={{ background: `var(${hue})`, boxShadow: `0 0 10px var(${hue})` }}
        animate={{ top: ['-4px', '96px'], opacity: [0, 1, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeIn' }}
      />
    </div>
  )
}
