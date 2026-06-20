import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'

/** Minimal floating brand + a top scroll-progress beam. */
export function TopBar() {
  const { scrollYProgress } = useScroll()
  const x = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const [solid, setSolid] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={`flex h-14 items-center px-5 transition-colors sm:px-8 ${solid ? 'glass' : ''}`}>
        <a href="#hero" className="flex items-center gap-2.5">
          <span className="grid h-7 w-7 place-items-center rounded-[var(--radius-sm)]" style={{ background: 'color-mix(in oklab, var(--accent) 22%, transparent)', border: '1px solid color-mix(in oklab, var(--accent) 45%, transparent)' }}>
            <span className="h-2.5 w-2.5 rounded-full bg-accent" style={{ boxShadow: '0 0 12px var(--accent)' }} />
          </span>
          <span className="text-sm font-semibold tracking-tight text-hi">
            Claude Code <span className="holo-text">Visual Lab</span>
          </span>
        </a>
      </div>
      <motion.div className="h-px origin-left" style={{ scaleX: x, background: 'linear-gradient(90deg, var(--cyan), var(--accent-2), var(--magenta))' }} />
    </header>
  )
}
