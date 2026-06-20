import { useState } from 'react'
import { motion, useTime, useTransform } from 'motion/react'
import { ACTS, AGENTS_TOPIC } from '@/content/acts'
import { ActShell } from '@/components/scroll/ActShell'
import { Icon, type IconName } from '@/components/ui/Icon'
import { Chip } from '@/components/ui/Chip'

const meta = ACTS.find((a) => a.id === 'agents')!

interface Orbit {
  id: string
  label: string
  icon: IconName
  task: string
  returns: string
  hue: string
  rx: number
  ry: number
  rot: number
  angle: number
  dur: number
}
const ORBITS: Orbit[] = [
  { id: 'explore', label: 'Explorer', icon: 'explore', task: 'Search a huge codebase', returns: 'files + conclusions', hue: '--cyan', rx: 42, ry: 17, rot: -10, angle: 202, dur: 24 },
  { id: 'plan', label: 'Planner', icon: 'plan', task: 'Design the approach', returns: 'step-by-step plan', hue: '--blue', rx: 30, ry: 30, rot: 16, angle: -54, dur: 30 },
  { id: 'review', label: 'Reviewer', icon: 'review', task: 'Audit the diff', returns: 'verdict + risks', hue: '--violet', rx: 45, ry: 23, rot: 10, angle: 38, dur: 36 },
  { id: 'design', label: 'Designer', icon: 'design', task: 'Critique the UI', returns: 'polish notes', hue: '--magenta', rx: 26, ry: 39, rot: -22, angle: 138, dur: 42 },
]

function pt(rx: number, ry: number, rotDeg: number, aDeg: number) {
  const rot = (rotDeg * Math.PI) / 180
  const a = (aDeg * Math.PI) / 180
  const ex = rx * Math.cos(a)
  const ey = ry * Math.sin(a)
  return { x: 50 + ex * Math.cos(rot) - ey * Math.sin(rot), y: 50 + ex * Math.sin(rot) + ey * Math.cos(rot) }
}

/** A moon that continuously travels its orbit ellipse (life/motion). */
function Moon({ o }: { o: Orbit }) {
  const t = useTime()
  const left = useTransform(t, (ms) => `${pt(o.rx, o.ry, o.rot, (ms / (o.dur * 1000)) * 360 + o.angle + 60).x}%`)
  const top = useTransform(t, (ms) => `${pt(o.rx, o.ry, o.rot, (ms / (o.dur * 1000)) * 360 + o.angle + 60).y}%`)
  return <motion.span className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ left, top, background: `var(${o.hue})`, boxShadow: `0 0 8px var(${o.hue})` }} />
}

function AgentOrbit({ o, active, onSelect }: { o: Orbit; active: boolean; onSelect: () => void }) {
  const p = pt(o.rx, o.ry, o.rot, o.angle)
  const size = active ? 58 : 48
  return (
    <>
      {/* satellite station */}
      <button
        className="absolute z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 outline-none"
        style={{ left: `${p.x}%`, top: `${p.y}%` }}
        onMouseEnter={onSelect}
        onFocus={onSelect}
        onClick={onSelect}
      >
        <motion.span
          className="relative grid place-items-center rounded-full"
          animate={{ width: size, height: size }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          style={{
            color: `var(${o.hue})`,
            background: `radial-gradient(38% 38% at 36% 30%, color-mix(in oklab, var(${o.hue}) 70%, #fff 12%), color-mix(in oklab, var(${o.hue}) 36%, transparent) 52%, color-mix(in oklab, var(--bg-void) 78%, var(${o.hue})) 100%)`,
            border: `1px solid color-mix(in oklab, var(${o.hue}) ${active ? 90 : 50}%, transparent)`,
            boxShadow: active
              ? `0 0 26px -2px color-mix(in oklab, var(${o.hue}) 75%, transparent), inset -4px -6px 14px rgba(0,0,0,0.6)`
              : `0 0 14px -6px var(${o.hue}), inset -4px -6px 14px rgba(0,0,0,0.55)`,
          }}
        >
          <span className="text-hi"><Icon name={o.icon} size={active ? 22 : 18} /></span>
          {active && (
            <motion.span className="absolute inset-0 rounded-full" style={{ border: `1px solid var(${o.hue})` }} animate={{ scale: [1, 1.5], opacity: [0.8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }} />
          )}
        </motion.span>
        <span className="whitespace-nowrap text-[11px] font-medium" style={{ color: active ? 'var(--text-hi)' : 'var(--text-mid)' }}>{o.label}</span>
      </button>
    </>
  )
}

export function AgentsAct() {
  const [active, setActive] = useState<Orbit>(ORBITS[0])

  return (
    <ActShell meta={meta} layout="split">
      <div className="relative h-[400px] w-full sm:h-[440px]">
        {/* orbit ellipses (curved paths) */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          {ORBITS.map((o) => {
            const on = active.id === o.id
            return (
              <ellipse
                key={o.id}
                cx="50" cy="50" rx={o.rx} ry={o.ry}
                transform={`rotate(${o.rot} 50 50)`}
                fill="none"
                stroke={`var(${o.hue})`}
                strokeWidth={on ? 0.5 : 0.25}
                strokeOpacity={on ? 0.85 : 0.32}
                vectorEffect="non-scaling-stroke"
              />
            )
          })}
        </svg>
        {ORBITS.map((o) => <Moon key={o.id} o={o} />)}

        {/* central planet — main session */}
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="relative grid h-[88px] w-[88px] place-items-center rounded-full"
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              background: 'radial-gradient(38% 38% at 36% 30%, color-mix(in oklab, var(--cyan) 65%, #fff 14%), color-mix(in oklab, var(--accent-2) 32%, transparent) 55%, color-mix(in oklab, var(--bg-void) 82%, var(--cyan)) 100%)',
              boxShadow: '0 0 50px -6px var(--accent-glow), inset -6px -8px 22px rgba(0,0,0,0.6)',
              border: '1px solid color-mix(in oklab, var(--cyan) 50%, transparent)',
            }}
          >
            <span className="text-hi"><Icon name="core" size={30} /></span>
          </motion.div>
          <span className="mt-2 block whitespace-nowrap text-center micro text-mid">main session</span>
        </div>

        {/* satellites */}
        {ORBITS.map((o) => <AgentOrbit key={o.id} o={o} active={active.id === o.id} onSelect={() => setActive(o)} />)}

        {/* readout (keyed fade, no exit barrier) */}
        <motion.div key={active.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }} className="absolute bottom-0 left-0 z-30 glass-strong rounded-[var(--radius-md)] px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-[var(--radius-sm)]" style={{ color: `var(${active.hue})`, background: `color-mix(in oklab, var(${active.hue}) 14%, transparent)` }}>
              <Icon name={active.icon} size={18} />
            </span>
            <div>
              <div className="micro text-faint">task out</div>
              <div className="text-sm text-hi">{active.task}</div>
            </div>
            <span className="text-lo">→</span>
            <div>
              <div className="micro text-faint">returns</div>
              <div className="text-sm" style={{ color: `var(${active.hue})` }}>{active.returns}</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* topic context chips */}
      <div className="mt-1 flex flex-col gap-3">
        <p className="text-sm leading-snug text-mid">{AGENTS_TOPIC.what}</p>
        <div className="flex flex-wrap gap-2">{AGENTS_TOPIC.when.map((t) => <Chip key={t} variant="use">{t}</Chip>)}</div>
        <div className="flex flex-wrap gap-2">{AGENTS_TOPIC.avoid.map((t) => <Chip key={t} variant="avoid">{t}</Chip>)}</div>
        <Chip variant="example">{AGENTS_TOPIC.example}</Chip>
      </div>
    </ActShell>
  )
}
