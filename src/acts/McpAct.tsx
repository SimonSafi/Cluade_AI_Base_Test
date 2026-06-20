import { useState } from 'react'
import { motion } from 'motion/react'
import { ACTS, PORTS, MCP_TOPIC, type Port } from '@/content/acts'
import { ActShell } from '@/components/scroll/ActShell'
import { ElectricArc } from '@/components/fx/ElectricArc'
import { Icon } from '@/components/ui/Icon'
import { Chip } from '@/components/ui/Chip'

const meta = ACTS.find((a) => a.id === 'mcp')!

interface OrbitDef { rx: number; ry: number; rot: number; angle: number }
const ORBITS: Record<string, OrbitDef> = {
  figma: { rx: 40, ry: 18, rot: -10, angle: 202 },
  browser: { rx: 29, ry: 30, rot: 16, angle: -56 },
  slides: { rx: 44, ry: 22, rot: 10, angle: 40 },
  data: { rx: 27, ry: 38, rot: -22, angle: 136 },
}
function pt(o: OrbitDef) {
  const r = (o.rot * Math.PI) / 180
  const a = (o.angle * Math.PI) / 180
  const ex = o.rx * Math.cos(a)
  const ey = o.ry * Math.sin(a)
  return { x: 50 + ex * Math.cos(r) - ey * Math.sin(r), y: 50 + ex * Math.sin(r) + ey * Math.cos(r) }
}

export function McpAct() {
  const [active, setActive] = useState<Port>(PORTS[0])

  return (
    <ActShell meta={meta} layout="split">
      <div className="relative h-[400px] w-full sm:h-[440px]">
        {/* orbit ellipses + lightning data flow (inbound) */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          {PORTS.map((p) => {
            const o = ORBITS[p.id]
            return <ellipse key={p.id} cx="50" cy="50" rx={o.rx} ry={o.ry} transform={`rotate(${o.rot} 50 50)`} fill="none" stroke={`var(${p.hue})`} strokeWidth={active.id === p.id ? 0.4 : 0.2} strokeOpacity={active.id === p.id ? 0.7 : 0.28} vectorEffect="non-scaling-stroke" />
          })}
          {PORTS.map((p, i) => {
            const q = pt(ORBITS[p.id])
            return <ElectricArc key={p.id} x1={50} y1={50} x2={q.x} y2={q.y} hue={p.hue} dir="in" active={active.id === p.id} phase={i * 0.17} />
          })}
        </svg>

        {/* central planet — Claude Code */}
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center">
          <motion.div className="grid h-[84px] w-[84px] place-items-center rounded-full text-hi" animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ background: 'radial-gradient(38% 38% at 36% 30%, color-mix(in oklab, var(--cyan) 65%, #fff 14%), color-mix(in oklab, var(--accent-2) 30%, transparent) 55%, color-mix(in oklab, var(--bg-void) 82%, var(--cyan)) 100%)', border: '1px solid color-mix(in oklab, var(--cyan) 50%, transparent)', boxShadow: '0 0 46px -6px var(--accent-glow), inset -5px -7px 18px rgba(0,0,0,0.6)' }}>
            <Icon name="core" size={30} />
          </motion.div>
          <span className="mt-2 block whitespace-nowrap micro text-mid">Claude Code</span>
        </div>

        {/* port moons */}
        {PORTS.map((p) => {
          const q = pt(ORBITS[p.id])
          const on = active.id === p.id
          return (
            <button key={p.id} className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 outline-none" style={{ left: `${q.x}%`, top: `${q.y}%`, color: `var(${p.hue})` }} onMouseEnter={() => setActive(p)} onFocus={() => setActive(p)} onClick={() => setActive(p)}>
              <motion.span className="grid place-items-center rounded-full" animate={{ width: on ? 54 : 46, height: on ? 54 : 46 }} transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                style={{ background: `radial-gradient(38% 38% at 36% 30%, color-mix(in oklab, var(${p.hue}) 72%, #fff 12%), color-mix(in oklab, var(${p.hue}) 34%, transparent) 52%, color-mix(in oklab, var(--bg-void) 80%, var(${p.hue})) 100%)`, border: `1px solid color-mix(in oklab, var(${p.hue}) ${on ? 85 : 50}%, transparent)`, boxShadow: on ? `0 0 24px -2px var(${p.hue})` : `0 0 14px -6px var(${p.hue}), inset -3px -5px 12px rgba(0,0,0,0.55)` }}>
                <span className="text-hi"><Icon name={p.icon} size={on ? 22 : 18} /></span>
              </motion.span>
              <span className="whitespace-nowrap text-[11px] font-medium" style={{ color: on ? 'var(--text-hi)' : 'var(--text-mid)' }}>{p.label}</span>
            </button>
          )
        })}

        {/* readout */}
        <motion.div key={active.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }} className="absolute bottom-0 left-0 z-30 glass-strong rounded-[var(--radius-md)] px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-[var(--radius-sm)]" style={{ color: `var(${active.hue})`, background: `color-mix(in oklab, var(${active.hue}) 14%, transparent)` }}>
              <Icon name={active.icon} size={18} />
            </span>
            <div>
              <div className="micro text-faint">{active.label} → flows in</div>
              <div className="text-sm" style={{ color: `var(${active.hue})` }}>{active.role}</div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-1 flex flex-col gap-3">
        <p className="text-sm leading-snug text-mid">{MCP_TOPIC.what}</p>
        <div className="flex flex-wrap gap-2">{MCP_TOPIC.when.map((t) => <Chip key={t} variant="use">{t}</Chip>)}</div>
        <div className="flex flex-wrap gap-2">{MCP_TOPIC.avoid.map((t) => <Chip key={t} variant="avoid">{t}</Chip>)}</div>
        <Chip variant="example">{MCP_TOPIC.example}</Chip>
        <div className="flex items-start gap-2 rounded-[var(--radius-md)] px-3 py-2" style={{ border: '1px solid color-mix(in oklab, var(--gauge-high) 35%, transparent)', background: 'color-mix(in oklab, var(--gauge-high) 8%, transparent)' }}>
          <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full" style={{ background: 'var(--gauge-high)' }} />
          <span className="text-xs text-mid">External data can carry untrusted instructions — grant least access, review what returns.</span>
        </div>
      </div>
    </ActShell>
  )
}
