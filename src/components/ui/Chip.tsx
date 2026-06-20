import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Variant = 'use' | 'avoid' | 'why' | 'example' | 'neutral'

const STYLE: Record<Variant, { hue: string; mark: string }> = {
  use: { hue: '--teal', mark: '✓ use when' },
  avoid: { hue: '--gauge-high', mark: '✕ avoid when' },
  why: { hue: '--violet', mark: 'why' },
  example: { hue: '--cyan', mark: 'e.g.' },
  neutral: { hue: '--accent', mark: '' },
}

/** Tiny labelled context chip — carries meaning without paragraphs. */
export function Chip({
  variant = 'neutral',
  children,
  mono,
  className,
}: {
  variant?: Variant
  children: ReactNode
  mono?: boolean
  className?: string
}) {
  const s = STYLE[variant]
  return (
    <span
      className={cn('inline-flex items-start gap-1.5 rounded-[var(--radius-md)] px-2.5 py-1.5 text-left text-xs leading-snug', className)}
      style={{
        color: 'var(--text-mid)',
        background: `color-mix(in oklab, var(${s.hue}) 9%, transparent)`,
        border: `1px solid color-mix(in oklab, var(${s.hue}) 28%, transparent)`,
      }}
    >
      {s.mark && (
        <span className="shrink-0 micro" style={{ color: `var(${s.hue})` }}>
          {s.mark}
        </span>
      )}
      <span className={cn('text-hi', mono && 'font-mono')}>{children}</span>
    </span>
  )
}
