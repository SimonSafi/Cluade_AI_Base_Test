import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTime, useTransform } from 'motion/react'
import { bolt } from '@/components/fx/ElectricArc'
import { Icon, type IconName } from '@/components/ui/Icon'
import { Tooltip } from '@/components/ui/Tooltip'

/** orbit centre x; y is responsive (lower + tighter on phones) */
const CX = 50

/** true when the viewport is phone-width — used to tighten the orbit so icons
    don't collide with the title or clip off the screen edges. */
function useMobile() {
  const [m, setM] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)')
    const on = () => setM(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return m
}

interface Feature {
  id: string; icon: IconName; label: string; hue: string; route: string
  rx: number; ry: number; rot: number; angle0: number; period: number; dir: 1 | -1
}
/** pairs share a ring — flattened ellipse = a 3D ring tilted around the head */
const FEATURES: Feature[] = [
  { id: 'agents', icon: 'agent', label: 'Agents', hue: '--violet', route: 'agents', rx: 31, ry: 13, rot: -7, angle0: 200, period: 24, dir: 1 },
  { id: 'tokens', icon: 'token', label: 'Tokens', hue: '--cyan', route: 'tokens', rx: 31, ry: 13, rot: -7, angle0: 20, period: 24, dir: 1 },
  { id: 'skills', icon: 'skill', label: 'Skills', hue: '--magenta', route: 'skills', rx: 42, ry: 16, rot: 9, angle0: 120, period: 34, dir: -1 },
  { id: 'mcp', icon: 'mcp', label: 'MCP', hue: '--teal', route: 'mcp', rx: 42, ry: 16, rot: 9, angle0: 300, period: 34, dir: -1 },
  { id: 'workflow', icon: 'delegate', label: 'Workflow', hue: '--blue', route: 'workflow', rx: 53, ry: 20, rot: -4, angle0: 70, period: 46, dir: 1 },
  { id: 'verify', icon: 'verify', label: 'Verify', hue: '--cyan', route: 'think', rx: 53, ry: 20, rot: -4, angle0: 250, period: 46, dir: 1 },
]

function goTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
const RINGS = [{ rx: 31, ry: 13, rot: -7 }, { rx: 42, ry: 16, rot: 9 }, { rx: 53, ry: 20, rot: -4 }]

function ptDepth(f: Feature, ms: number, sc: number, cy: number) {
  const a = ((f.angle0 + (ms / (f.period * 1000)) * 360 * f.dir) * Math.PI) / 180
  const r = (f.rot * Math.PI) / 180
  const ex = f.rx * sc * Math.cos(a)
  const ey = f.ry * sc * Math.sin(a)
  return {
    x: CX + ex * Math.cos(r) - ey * Math.sin(r),
    y: cy + ex * Math.sin(r) + ey * Math.cos(r),
    depth: Math.sin(a), // >0 = front (near viewer), <0 = behind the head
  }
}

function FloatingBolt({ f, sc, cy }: { f: Feature; sc: number; cy: number }) {
  const t = useTime()
  const d = useTransform(t, (ms) => { const p = ptDepth(f, ms, sc, cy); return bolt(CX, cy, p.x, p.y, Math.floor(ms / 80), 2.4) })
  const off = useTransform(t, (ms) => (f.dir === 1 ? -1 : 1) * (ms / 45))
  const opacity = useTransform(t, (ms) => 0.25 + 0.4 * (ptDepth(f, ms, sc, cy).depth + 1) / 2)
  const c = `var(${f.hue})`
  return (
    <g>
      <motion.path d={d} fill="none" stroke={c} strokeWidth={0.18} strokeOpacity={0.2} vectorEffect="non-scaling-stroke" />
      <motion.path d={d} fill="none" stroke={c} strokeWidth={0.55} strokeLinecap="round" strokeDasharray="2.5 14" style={{ strokeDashoffset: off, opacity, filter: `drop-shadow(0 0 2px ${c})` }} vectorEffect="non-scaling-stroke" />
    </g>
  )
}

function FloatingFeature({ f, sc, cy, mobile }: { f: Feature; sc: number; cy: number; mobile: boolean }) {
  const t = useTime()
  const left = useTransform(t, (ms) => `${ptDepth(f, ms, sc, cy).x}%`)
  const top = useTransform(t, (ms) => `${ptDepth(f, ms, sc, cy).y}%`)
  const scale = useTransform(t, (ms) => 0.72 + 0.4 * (ptDepth(f, ms, sc, cy).depth + 1) / 2)
  const opacity = useTransform(t, (ms) => 0.42 + 0.58 * (ptDepth(f, ms, sc, cy).depth + 1) / 2)
  const zIndex = useTransform(t, (ms) => (ptDepth(f, ms, sc, cy).depth > 0 ? 20 : 5))
  const labelOpacity = useTransform(t, (ms) => (ptDepth(f, ms, sc, cy).depth > 0.15 ? 1 : 0))
  const c = `var(${f.hue})`
  const dim = mobile ? 38 : 44
  return (
    <motion.div className="absolute" style={{ left, top, x: '-50%', y: '-50%', scale, opacity, zIndex }}>
      <Tooltip label={`Open ${f.label} →`}>
        <button type="button" onClick={() => goTo(f.route)} aria-label={`Open ${f.label}`}
          className="group relative flex cursor-pointer flex-col items-center gap-1 outline-none">
          <span className="pointer-events-none absolute -z-10 h-[72px] w-[72px] -translate-y-3 rounded-full transition-all group-hover:scale-125" style={{ background: `radial-gradient(circle, color-mix(in oklab, ${c} 30%, transparent), transparent 70%)` }} />
          <span className="grid place-items-center rounded-full text-hi transition-transform group-hover:scale-110"
            style={{ width: dim, height: dim, color: c, background: `radial-gradient(38% 38% at 36% 30%, color-mix(in oklab, ${c} 75%, #fff 12%), color-mix(in oklab, ${c} 36%, transparent) 52%, color-mix(in oklab, var(--bg-void) 82%, ${c}) 100%)`, border: `1px solid color-mix(in oklab, ${c} 62%, transparent)`, boxShadow: `0 0 18px -3px ${c}, inset -3px -5px 12px rgba(0,0,0,0.55)` }}>
            <Icon name={f.icon} size={mobile ? 16 : 19} />
          </span>
          <motion.span className="whitespace-nowrap text-[10px] font-medium text-mid group-hover:text-hi" style={{ opacity: labelOpacity }}>{f.label}</motion.span>
        </button>
      </Tooltip>
    </motion.div>
  )
}

export function HeroScene() {
  const ref = useRef<HTMLDivElement>(null)
  const mobile = useMobile()
  const sc = mobile ? 0.64 : 1
  const cy = mobile ? 60 : 56
  const px = useSpring(useMotionValue(0), { stiffness: 50, damping: 18 })
  const py = useSpring(useMotionValue(0), { stiffness: 50, damping: 18 })
  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    px.set(((e.clientX - r.left) / r.width - 0.5) * 2)
    py.set(((e.clientY - r.top) / r.height - 0.5) * 2)
  }
  const gx = useTransform(px, (v) => v * 12)
  const gy = useTransform(py, (v) => v * 12)

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={() => { px.set(0); py.set(0) }} className="relative mx-auto h-full w-full max-w-3xl">
      <motion.div className="absolute inset-0" style={{ x: gx, y: gy }}>
        {/* dark separation disc — keeps background planets/stars from merging into her */}
        <div className="pointer-events-none absolute rounded-full" style={{ left: `${CX}%`, top: `${cy}%`, width: mobile ? '64%' : '52%', height: mobile ? '52%' : '70%', transform: 'translate(-50%,-50%)', zIndex: 2, background: 'radial-gradient(circle at 50% 44%, var(--bg-void) 0%, var(--bg-void) 38%, transparent 72%)' }} />

        {/* orbit rings (behind head; back arc hidden by her) */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" style={{ zIndex: 3 }}>
          {RINGS.map((o, i) => (
            <ellipse key={i} cx={CX} cy={cy} rx={o.rx * sc} ry={o.ry * sc} transform={`rotate(${o.rot} ${CX} ${cy})`} fill="none" stroke="var(--glass-border-strong)" strokeWidth="0.12" strokeOpacity="0.45" vectorEffect="non-scaling-stroke" />
          ))}
        </svg>

        {/* portrait — centred on head, soft-feathered into the void */}
        <div
          className="absolute"
          style={{
            left: `${CX}%`, top: `${cy}%`, transform: 'translate(-50%,-50%)', zIndex: 10,
            width: 'clamp(168px, 44vw, 320px)', height: 'clamp(214px, 58vw, 400px)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-full"
            style={{
              backgroundImage: 'url(/hero/portrait.png)', backgroundSize: 'cover', backgroundPosition: 'center 38%', backgroundRepeat: 'no-repeat',
              WebkitMaskImage: 'radial-gradient(56% 60% at 50% 42%, #000 26%, rgba(0,0,0,0.6) 56%, transparent 80%)',
              maskImage: 'radial-gradient(56% 60% at 50% 42%, #000 26%, rgba(0,0,0,0.6) 56%, transparent 80%)',
            }}
          />
        </div>

        {/* signal bolts */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" style={{ zIndex: 11 }}>
          {FEATURES.map((f) => <FloatingBolt key={f.id} f={f} sc={sc} cy={cy} />)}
        </svg>

        {/* floating features (z toggles 5/20 → behind / in front of the head) */}
        {FEATURES.map((f) => <FloatingFeature key={f.id} f={f} sc={sc} cy={cy} mobile={mobile} />)}
      </motion.div>
    </div>
  )
}
