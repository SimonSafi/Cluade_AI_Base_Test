import { motion } from 'motion/react'
import { Icon, type IconName } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'

export type Tab = 'deck' | 'generate' | 'assistant' | 'guide'

const TABS: { id: Tab; label: string; icon: IconName }[] = [
  { id: 'deck', label: 'Home', icon: 'core' },
  { id: 'generate', label: 'Build', icon: 'spark' },
  { id: 'assistant', label: 'Ask', icon: 'agent' },
  { id: 'guide', label: 'Guide', icon: 'plan' },
]

export function BottomNav({ tab, onTab }: { tab: Tab; onTab: (t: Tab) => void }) {
  return (
    <nav
      className="relative z-20 flex shrink-0 items-stretch justify-around glass-strong"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)', borderTop: '1px solid var(--glass-border-strong)' }}
    >
      {TABS.map((t) => {
        const on = t.id === tab
        return (
          <button
            key={t.id}
            onClick={() => onTab(t.id)}
            aria-label={t.label}
            aria-current={on ? 'page' : undefined}
            className="relative flex flex-1 flex-col items-center gap-1 py-2.5 outline-none"
          >
            {on && (
              <motion.span
                layoutId="tab-glow"
                className="absolute -top-px h-0.5 w-8 rounded-full"
                style={{ background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }}
                transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              />
            )}
            <span className={cn('transition-colors', on ? 'text-hi' : 'text-lo')} style={on ? { color: 'var(--accent)' } : undefined}>
              <Icon name={t.icon} size={22} />
            </span>
            <span className={cn('text-[10px] font-medium tracking-wide transition-colors', on ? 'text-hi' : 'text-faint')}>{t.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
