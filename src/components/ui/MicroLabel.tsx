import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/** Tiny mono caption / tag used directly on diagrams instead of paragraphs. */
export function MicroLabel({
  children,
  hue = '--accent',
  dot = true,
  className,
}: {
  children: ReactNode
  hue?: string
  dot?: boolean
  className?: string
}) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 micro text-mid', className)}>
      {dot && (
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: `var(${hue})`, boxShadow: `0 0 8px var(${hue})` }}
        />
      )}
      {children}
    </span>
  )
}
