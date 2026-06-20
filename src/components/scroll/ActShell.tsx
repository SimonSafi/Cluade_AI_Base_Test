import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { ACTS, type ActMeta } from '@/content/acts'
import { MicroLabel } from '@/components/ui/MicroLabel'
import { OrbitBackdrop } from '@/components/fx/OrbitBackdrop'

interface Props {
  meta: ActMeta
  children: ReactNode
  /** scene sits 'beside' the heading (split) or 'below' it (stacked). */
  layout?: 'split' | 'stacked'
}

const reveal = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

/** Full-viewport act: minimal overlaid heading + a scene that carries the meaning. */
export function ActShell({ meta, children, layout = 'stacked' }: Props) {
  const Heading = (
    <motion.div
      variants={reveal}
      className={layout === 'split' ? 'max-w-sm' : 'max-w-2xl'}
    >
      <div className="mb-3 flex items-center gap-3">
        <span className="font-mono text-sm text-faint">{meta.index}</span>
        <MicroLabel hue={meta.hue}>{meta.kicker}</MicroLabel>
      </div>
      <h2
        className="display text-balance text-4xl text-hi sm:text-5xl lg:text-6xl"
        style={{ textShadow: `0 0 40px color-mix(in oklab, var(${meta.hue}) 25%, transparent)` }}
      >
        {meta.title}
      </h2>
      <p className="mt-4 text-balance text-base text-mid sm:text-lg">{meta.caption}</p>
    </motion.div>
  )

  const seed = Math.max(0, ACTS.findIndex((a) => a.id === meta.id))
  return (
    <section id={meta.id} className="relative flex min-h-screen w-full items-center overflow-hidden py-24">
      <OrbitBackdrop hue={meta.hue} seed={seed} />
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }}
        variants={{ show: { transition: { staggerChildren: 0.12 } } }}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10"
      >
        {layout === 'split' ? (
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(260px,380px)_1fr]">
            {Heading}
            <motion.div variants={reveal} className="relative">
              {children}
            </motion.div>
          </div>
        ) : (
          <div className="flex flex-col gap-12">
            {Heading}
            <motion.div variants={reveal} className="relative">
              {children}
            </motion.div>
          </div>
        )}
      </motion.div>
    </section>
  )
}
