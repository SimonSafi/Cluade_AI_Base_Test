import { useState, type ReactNode } from 'react'

/** Lightweight hover/focus tooltip — extra context on demand, zero layout cost. */
export function Tooltip({ label, children }: { label: ReactNode; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      {open && (
        <span
          role="tooltip"
          className="glass-strong pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-max max-w-[220px] -translate-x-1/2 rounded-[var(--radius-md)] px-3 py-2 text-xs leading-snug text-mid shadow-[var(--shadow-float)]"
        >
          {label}
        </span>
      )}
    </span>
  )
}
