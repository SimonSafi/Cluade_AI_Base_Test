import { cn } from '@/lib/cn'

interface Props {
  code: string
  label?: string
  className?: string
}

/** Compact mono command snippet card. */
export function CodeCard({ code, label, className }: Props) {
  return (
    <div className={cn('glass overflow-hidden rounded-[var(--radius-md)]', className)}>
      {label && (
        <div className="border-b border-[var(--glass-border)] px-3 py-1.5 text-[11px] uppercase tracking-wider text-lo">
          {label}
        </div>
      )}
      <pre className="overflow-x-auto px-3 py-2.5 font-mono text-[13px] leading-relaxed text-accent-soft">
        <code>{code}</code>
      </pre>
    </div>
  )
}
