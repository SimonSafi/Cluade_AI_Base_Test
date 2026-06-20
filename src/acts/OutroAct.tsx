import { motion } from 'motion/react'
import { AuroraField } from '@/components/fx/AuroraField'
import { MicroLabel } from '@/components/ui/MicroLabel'

export function OutroAct() {
  return (
    <section className="relative flex min-h-[80vh] w-full items-center justify-center overflow-hidden">
      <AuroraField hue="--accent" hue2="--accent-2" />
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <MicroLabel hue="--c-hero">end of tour</MicroLabel>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="display mt-5 max-w-3xl text-balance text-4xl text-hi sm:text-6xl"
        >
          Now build something <span className="holo-text">alive</span>.
        </motion.h2>
        <p className="mt-5 max-w-md text-balance text-mid">One session. Tools, specialists, skills, and a clean workflow.</p>
        <motion.a
          href="#hero"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="mt-9 inline-flex items-center gap-2 rounded-[var(--radius-pill)] px-6 py-3 text-sm font-medium text-hi"
          style={{ background: 'color-mix(in oklab, var(--accent) 16%, transparent)', border: '1px solid color-mix(in oklab, var(--accent) 45%, transparent)', boxShadow: '0 0 30px -6px var(--accent-glow)' }}
        >
          ↑ Replay the system
        </motion.a>
        <div className="mt-10 micro text-faint">Claude Code · AI Visual Lab — built with Claude Code</div>
      </div>
    </section>
  )
}
