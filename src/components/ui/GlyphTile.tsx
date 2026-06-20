import { Icon, type IconName } from './Icon'
import { cn } from '@/lib/cn'

interface Props {
  icon: IconName
  hue?: string
  size?: number
  active?: boolean
  className?: string
}

/** A product-like framed icon tile: glass, hue edge, corner ticks, optional active glow. */
export function GlyphTile({ icon, hue = '--accent', size = 44, active = false, className }: Props) {
  const tick = 'absolute h-2 w-2 border-current opacity-70'
  return (
    <span
      className={cn('relative grid place-items-center rounded-[var(--radius-md)] glass', className)}
      style={{
        width: size,
        height: size,
        color: `var(${hue})`,
        borderColor: `color-mix(in oklab, var(${hue}) ${active ? 75 : 42}%, transparent)`,
        boxShadow: active
          ? `0 0 22px -4px color-mix(in oklab, var(${hue}) 70%, transparent), inset 0 0 14px -8px var(${hue})`
          : 'inset 0 0 12px -10px var(--text-hi)',
        background: `color-mix(in oklab, var(${hue}) ${active ? 16 : 8}%, var(--glass))`,
      }}
    >
      {/* corner ticks */}
      <i className={cn(tick, 'left-1 top-1 border-l border-t')} />
      <i className={cn(tick, 'right-1 top-1 border-r border-t')} />
      <i className={cn(tick, 'bottom-1 left-1 border-b border-l')} />
      <i className={cn(tick, 'bottom-1 right-1 border-b border-r')} />
      <Icon name={icon} size={Math.round(size * 0.46)} />
    </span>
  )
}
