import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

interface Props extends HTMLAttributes<HTMLDivElement> {
  strong?: boolean
  hue?: string
}

/** Frosted-glass surface, the base of every panel in the control room. */
export function GlassPanel({ strong, hue, className, style, children, ...rest }: Props) {
  return (
    <div
      className={cn(
        strong ? 'glass-strong' : 'glass',
        'rounded-[var(--radius-lg)] shadow-[var(--shadow-panel)]',
        className,
      )}
      style={{
        ...(hue ? { ['--tint' as string]: `var(${hue})` } : {}),
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  )
}
