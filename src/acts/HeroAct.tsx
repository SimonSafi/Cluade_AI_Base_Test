import { motion } from 'motion/react'
import { MicroLabel } from '@/components/ui/MicroLabel'
import { HeroScene } from '@/components/hero/HeroScene'

export function HeroAct() {
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* scene fills the viewport — head sits dead-centre of the page */}
      <div className="absolute inset-0">
        <HeroScene />
      </div>

      {/* overlaid copy */}
      <div className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-between px-6 py-10 text-center sm:py-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <MicroLabel hue="--c-hero">Claude Code · Visual Lab</MicroLabel>
          <h1 className="display mt-4 max-w-3xl text-balance text-3xl text-hi sm:text-5xl">
            Your coding <span className="holo-text">command center</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="pointer-events-auto flex flex-col items-center gap-4"
        >
          <p className="max-w-md text-balance text-sm text-mid sm:text-base">
            One session orchestrating agents, skills, tools, and context.
          </p>
          <motion.a
            href="#think"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center gap-2.5 rounded-[var(--radius-pill)] px-6 py-3 text-sm font-medium text-hi"
            style={{ background: 'color-mix(in oklab, var(--accent) 16%, transparent)', border: '1px solid color-mix(in oklab, var(--accent) 45%, transparent)', boxShadow: '0 0 30px -6px var(--accent-glow)' }}
          >
            Explore the system
            <span className="transition-transform group-hover:translate-y-0.5">↓</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
