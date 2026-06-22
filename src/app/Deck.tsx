import { motion } from 'motion/react'
import { ACTS } from '@/content/acts'
import { TOPICS } from '@/app/topics'
import { Icon, type IconName } from '@/components/ui/Icon'

function meta(id: string) {
  return ACTS.find((a) => a.id === id)!
}

function Tile({ id, role, icon, onOpen, i }: { id: string; role: string; icon: IconName; onOpen: (id: string) => void; i: number }) {
  const m = meta(id)
  const c = `var(${m.hue})`
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(id)}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: i * 0.035, ease: [0.22, 1, 0.36, 1] }}
      whileTap={{ scale: 0.96 }}
      className="group relative flex h-28 flex-col justify-between overflow-hidden rounded-[var(--radius-lg)] glass p-3.5 text-left outline-none"
      style={{ border: `1px solid color-mix(in oklab, ${c} 30%, transparent)` }}
    >
      {/* accent glow */}
      <span className="pointer-events-none absolute -right-7 -top-7 h-20 w-20 rounded-full blur-2xl transition-opacity group-active:opacity-60" style={{ background: c, opacity: 0.16 }} />
      <div className="flex items-start justify-between">
        <span className="grid h-10 w-10 place-items-center rounded-[var(--radius-md)]" style={{ color: c, background: `color-mix(in oklab, ${c} 16%, transparent)`, border: `1px solid color-mix(in oklab, ${c} 38%, transparent)` }}>
          <Icon name={icon} size={20} />
        </span>
        <span className="mt-1 h-2 w-2 rounded-full" style={{ background: c, boxShadow: `0 0 8px ${c}` }} />
      </div>
      <div className="relative">
        <div className="text-sm font-semibold leading-tight text-hi">{m.kicker}</div>
        <div className="mt-0.5 micro" style={{ color: c }}>{role}</div>
      </div>
    </motion.button>
  )
}

export function Deck({ section, onOpen }: { section: 'core' | 'guide'; onOpen: (id: string) => void }) {
  const tiles = TOPICS.filter((t) => t.section === section)

  return (
    <div className="mx-auto w-full max-w-xl px-4 pb-6 pt-3">
      {section === 'core' ? (
        <>
          {/* command-deck status header (signature) */}
          <div className="flex items-center gap-3 rounded-[var(--radius-lg)] glass-strong p-4">
            <motion.span
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-hi"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ color: 'var(--cyan)', background: 'radial-gradient(40% 40% at 36% 30%, color-mix(in oklab, var(--cyan) 60%, #fff 12%), color-mix(in oklab, var(--bg-void) 82%, var(--cyan)) 100%)', border: '1px solid color-mix(in oklab, var(--cyan) 50%, transparent)', boxShadow: '0 0 26px -6px var(--accent-glow)' }}
            >
              <Icon name="core" size={26} />
            </motion.span>
            <div className="min-w-0">
              <div className="text-base font-semibold text-hi">Command center</div>
              <div className="mt-0.5 flex items-center gap-1.5 micro text-faint">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--teal)', boxShadow: '0 0 6px var(--teal)' }} />
                session online · tap a module
              </div>
            </div>
          </div>

          <div className="mb-3 mt-6 micro text-faint">Core concepts</div>
        </>
      ) : (
        <>
          <h1 className="display text-2xl text-hi">Reference</h1>
          <p className="mt-1 text-sm text-mid">Vocabulary, links, files & how it was built.</p>
          <div className="mb-3 mt-6 micro text-faint">Open a guide</div>
        </>
      )}

      <div className="grid grid-cols-2 gap-3">
        {tiles.map((t, i) => (
          <Tile key={t.id} id={t.id} role={t.role} icon={t.icon} onOpen={onOpen} i={i} />
        ))}
      </div>
    </div>
  )
}
