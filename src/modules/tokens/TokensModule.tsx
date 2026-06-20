import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { tokensConcept } from '@/content/tokens'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Badge } from '@/components/ui/Badge'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { CodeCard } from '@/components/ui/CodeCard'
import { ScenarioSim } from './ScenarioSim'

const HUE = '--c-tokens'

export function TokensModule() {
  const [deep, setDeep] = useState(false)
  const c = tokensConcept

  return (
    <div className="flex max-w-5xl flex-col gap-10">
      <SectionHeading eyebrow="Module · Tokens & Context" title={c.title} oneLiner={c.oneLiner} hue={HUE} />

      {/* metaphor + short explanation */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1fr]">
        <GlassPanel className="p-5" hue={HUE}>
          <Badge hue={HUE}>metaphor</Badge>
          <p className="mt-3 text-lg font-medium leading-snug text-hi">{c.metaphor}</p>
          <p className="mt-2 text-sm leading-relaxed text-mid">{c.shortExplanation}</p>
          <button
            onClick={() => setDeep((d) => !d)}
            className="mt-4 text-sm font-medium text-tokens transition-opacity hover:opacity-80"
          >
            {deep ? '− Hide deeper explanation' : '+ Deeper explanation'}
          </button>
          <AnimatePresence initial={false}>
            {deep && c.deeperExplanation && (
              <motion.p
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden text-sm leading-relaxed text-mid"
              >
                <span className="block pt-3">{c.deeperExplanation}</span>
              </motion.p>
            )}
          </AnimatePresence>
        </GlassPanel>

        <div className="flex flex-col gap-3">
          <CodeCard
            label="route work to a read-only agent"
            code={'> Use an Explore agent to inspect these logs.\n  Return only the files that matter + conclusions.'}
          />
          <CodeCard
            label="repeated checklist → skill"
            code={'/skill-creator  # turn the checklist you keep\n                # pasting into a reusable skill'}
          />
        </div>
      </div>

      {/* interactive sim */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Badge hue={HUE}>try it yourself</Badge>
          <span className="text-sm text-lo">Route the same 5,000 log lines three ways.</span>
        </div>
        <ScenarioSim />
      </section>

      {/* good vs bad examples */}
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-hi">Patterns</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {c.examples?.map((ex) => {
            const bad = !!ex.bad
            const hue = bad ? '--gauge-high' : '--c-tokens'
            return (
              <GlassPanel key={ex.title} className="p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xs font-bold" style={{ color: `var(${hue})` }}>
                    {bad ? '✕ avoid' : '✓ prefer'}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-hi">{ex.title}</h3>
                <p className="mt-1 font-mono text-[12px] leading-snug text-mid">{ex.bad ?? ex.good}</p>
                <p className="mt-2 text-xs leading-relaxed text-lo">{ex.why}</p>
              </GlassPanel>
            )
          })}
        </div>
      </section>
    </div>
  )
}
