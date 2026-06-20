import { useState } from 'react'
import { motion } from 'motion/react'
import { ACTS, CARTRIDGES, SKILLS_TOPIC } from '@/content/acts'
import { ActShell } from '@/components/scroll/ActShell'
import { Icon } from '@/components/ui/Icon'
import { Chip } from '@/components/ui/Chip'
import { cn } from '@/lib/cn'

const meta = ACTS.find((a) => a.id === 'skills')!

const CONTEXTS = [
  { id: 'review', label: 'Review a PR', loads: ['review', 'broad'] },
  { id: 'plan', label: 'Plan a feature', loads: ['plans', 'broad'] },
  { id: 'chat', label: 'Quick question', loads: ['broad'] },
]

const SLOT_X = [22, 50, 78] // % positions of the three cartridges
const CORE = { x: 50, y: 17 }

function Beam({ x, hue }: { x: number; hue: string }) {
  return (
    <g>
      <line x1={x} y1={60} x2={CORE.x} y2={CORE.y + 6} stroke={`var(${hue})`} strokeWidth="0.5" strokeOpacity="0.5" strokeDasharray="2 2" vectorEffect="non-scaling-stroke">
        <animate attributeName="stroke-dashoffset" from="0" to="-8" dur="0.6s" repeatCount="indefinite" />
      </line>
      <motion.circle r="0.9" fill={`var(${hue})`} initial={{ cx: x, cy: 60 }} animate={{ cx: [x, CORE.x], cy: [60, CORE.y + 6] }} transition={{ duration: 1.4, repeat: Infinity, ease: 'easeIn' }} style={{ filter: `drop-shadow(0 0 3px var(${hue}))` }} />
    </g>
  )
}

export function SkillsAct() {
  const [ctx, setCtx] = useState(CONTEXTS[0])

  return (
    <ActShell meta={meta} layout="stacked">
      <div className="flex flex-col gap-6">
        <p className="max-w-2xl text-sm leading-snug text-mid">{SKILLS_TOPIC.what}</p>

        {/* context selector */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="micro text-faint">context</span>
          {CONTEXTS.map((c) => {
            const on = c.id === ctx.id
            return (
              <button key={c.id} onClick={() => setCtx(c)} className={cn('rounded-[var(--radius-pill)] px-4 py-1.5 text-sm transition-all', on ? 'text-hi' : 'text-mid hover:text-hi')} style={{ background: on ? 'color-mix(in oklab, var(--c-skills) 18%, transparent)' : 'var(--glass)', border: `1px solid ${on ? 'color-mix(in oklab, var(--c-skills) 50%, transparent)' : 'var(--glass-border)'}` }}>
                {c.label}
              </button>
            )
          })}
        </div>

        {/* cartridge bay */}
        <div className="relative h-[340px] w-full rounded-[var(--radius-lg)] glass">
          {/* beams */}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            {CARTRIDGES.map((cart, i) => {
              if (!ctx.loads.includes(cart.id)) return null
              return <Beam key={cart.id} x={SLOT_X[i]} hue={cart.good ? '--c-skills' : '--gauge-high'} />
            })}
          </svg>

          {/* session core (consumer) */}
          <div className="absolute z-10 -translate-x-1/2 -translate-y-1/2 text-center" style={{ left: `${CORE.x}%`, top: `${CORE.y}%` }}>
            <motion.div className="grid h-14 w-14 place-items-center rounded-full text-cyan" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3.6, repeat: Infinity }} style={{ background: 'radial-gradient(40% 40% at 36% 30%, color-mix(in oklab, var(--cyan) 60%, #fff 12%), color-mix(in oklab, var(--bg-void) 80%, var(--cyan)) 100%)', border: '1px solid color-mix(in oklab, var(--cyan) 50%, transparent)', boxShadow: '0 0 30px -6px var(--accent-glow)' }}>
              <Icon name="core" size={24} />
            </motion.div>
            <span className="mt-1.5 block whitespace-nowrap micro text-mid">session</span>
          </div>

          {/* cartridges */}
          {CARTRIDGES.map((cart, i) => {
            const loaded = ctx.loads.includes(cart.id)
            const hue = cart.good ? '--c-skills' : '--gauge-high'
            const state = !loaded ? 'idle · not in context' : cart.good ? 'loaded on cue' : 'fires anyway · noise'
            return (
              <motion.div
                key={cart.id}
                className="absolute z-10 -translate-x-1/2"
                style={{ left: `${SLOT_X[i]}%`, bottom: '8%' }}
                animate={{ y: loaded ? -10 : 8, opacity: loaded ? 1 : 0.42 }}
                transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              >
                {/* cartridge module */}
                <div
                  className="relative w-[110px] overflow-hidden rounded-[var(--radius-md)] px-3 pb-3 pt-4"
                  style={{ background: 'var(--glass-strong)', border: `1px solid color-mix(in oklab, var(${hue}) ${loaded ? 65 : 22}%, transparent)`, boxShadow: loaded ? `0 0 26px -8px color-mix(in oklab, var(${hue}) 70%, transparent)` : 'none' }}
                >
                  {/* top handle + LED */}
                  <div className="absolute left-1/2 top-1 h-1.5 w-8 -translate-x-1/2 rounded-full" style={{ background: `color-mix(in oklab, var(${hue}) ${loaded ? 70 : 25}%, transparent)` }} />
                  <span className="absolute right-2 top-2 h-2 w-2 rounded-full" style={{ background: loaded ? `var(${hue})` : 'var(--text-faint)', boxShadow: loaded ? `0 0 8px var(${hue})` : 'none' }} />

                  <div className="mb-2 grid h-8 w-8 place-items-center rounded-[var(--radius-sm)]" style={{ color: loaded ? `var(${hue})` : 'var(--text-lo)', background: `color-mix(in oklab, var(${hue}) ${loaded ? 16 : 6}%, transparent)` }}>
                    <Icon name="skill" size={18} />
                  </div>
                  <div className="font-mono text-[12px] text-hi">{cart.name}</div>
                  <div className="mt-0.5 text-[10px] text-lo">{cart.trigger}</div>
                  {/* contacts */}
                  <div className="mt-2 flex gap-1">
                    {[0, 1, 2, 3].map((k) => (
                      <span key={k} className="h-1 flex-1 rounded-full" style={{ background: loaded ? `var(${hue})` : 'var(--glass-border-strong)' }} />
                    ))}
                  </div>
                </div>
                <div className="mt-2 text-center micro" style={{ color: loaded ? `var(${hue})` : 'var(--text-faint)' }}>{state}</div>
              </motion.div>
            )
          })}
        </div>

        {/* context chips */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">{SKILLS_TOPIC.when.map((t) => <Chip key={t} variant="use">{t}</Chip>)}</div>
          <div className="flex flex-wrap gap-2">{SKILLS_TOPIC.avoid.map((t) => <Chip key={t} variant="avoid">{t}</Chip>)}</div>
          <Chip variant="example">{SKILLS_TOPIC.example}</Chip>
        </div>
      </div>
    </ActShell>
  )
}
