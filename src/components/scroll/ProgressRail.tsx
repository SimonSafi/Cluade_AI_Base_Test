import { ACTS } from '@/content/acts'
import { useActiveSection } from '@/lib/useActiveSection'
import { cn } from '@/lib/cn'

const IDS = ACTS.map((a) => a.id)

/** Fixed left rail: one node per act, active node glows + expands its label. */
export function ProgressRail() {
  const active = useActiveSection(IDS)
  return (
    <nav className="fixed left-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
      {ACTS.map((a) => {
        const on = a.id === active
        return (
          <a key={a.id} href={`#${a.id}`} className="group flex items-center gap-3" aria-label={a.kicker}>
            <span
              className={cn('relative h-2.5 w-2.5 rounded-full transition-all duration-300')}
              style={{
                background: on ? `var(${a.hue})` : 'var(--glass-border-strong)',
                boxShadow: on ? `0 0 14px var(${a.hue})` : 'none',
                transform: on ? 'scale(1.3)' : 'scale(1)',
              }}
            />
            <span
              className={cn(
                'micro whitespace-nowrap transition-all duration-300',
                on ? 'opacity-100' : 'opacity-0 group-hover:opacity-60',
              )}
              style={{ color: on ? `var(${a.hue})` : 'var(--text-lo)' }}
            >
              {a.kicker}
            </span>
          </a>
        )
      })}
    </nav>
  )
}
