import { motion } from 'motion/react'
import { setMode } from '@/lib/mode'
import { Icon } from '@/components/ui/Icon'

interface Props {
  /** when set, show a back chevron + this title instead of the brand */
  title?: string
  hue?: string
  onBack?: () => void
}

/** Slim app-mode header: brand + a switch back to the scroll Tour, or a
 *  back chevron + topic title when inside a detail screen. */
export function AppTopBar({ title, hue = '--c-hero', onBack }: Props) {
  return (
    <header
      className="relative z-20 flex h-14 shrink-0 items-center gap-3 px-4"
      style={{ paddingTop: 'env(safe-area-inset-top)', height: 'calc(3.5rem + env(safe-area-inset-top))' }}
    >
      {onBack ? (
        <>
          <button onClick={onBack} aria-label="Back" className="grid h-9 w-9 place-items-center rounded-full text-hi glass">
            <span className="text-lg leading-none" style={{ color: `var(${hue})` }}>‹</span>
          </button>
          <span className="truncate text-sm font-semibold text-hi">{title}</span>
        </>
      ) : (
        <>
          <span className="grid h-7 w-7 place-items-center rounded-[var(--radius-sm)]" style={{ background: 'color-mix(in oklab, var(--accent) 22%, transparent)', border: '1px solid color-mix(in oklab, var(--accent) 45%, transparent)' }}>
            <span className="h-2.5 w-2.5 rounded-full bg-accent" style={{ boxShadow: '0 0 12px var(--accent)' }} />
          </span>
          <span className="text-sm font-semibold tracking-tight text-hi">
            Visual <span className="holo-text">Lab</span>
          </span>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setMode('tour')}
            className="ml-auto flex items-center gap-1.5 rounded-[var(--radius-pill)] px-3 py-1.5 text-xs font-medium text-mid"
            style={{ background: 'var(--glass)', border: '1px solid var(--glass-border-strong)' }}
          >
            <Icon name="browser" size={14} />
            Tour
          </motion.button>
        </>
      )}
    </header>
  )
}
