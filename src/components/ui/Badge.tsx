import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface Props {
  children: ReactNode
  hue?: string
  className?: string
}

/** Small status pill / access-badge styled chip. */
export function Badge({ children, hue = '--accent', className }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] px-2.5 py-1',
        'text-[11px] font-medium uppercase tracking-wider',
        className,
      )}
      style={{
        color: `var(${hue})`,
        background: `color-mix(in oklab, var(${hue}) 14%, transparent)`,
        border: `1px solid color-mix(in oklab, var(${hue}) 35%, transparent)`,
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: `var(${hue})`, boxShadow: `0 0 8px var(${hue})` }}
      />
      {children}
    </span>
  )
}
