import type { ReactNode } from 'react'

interface Props {
  eyebrow?: string
  title: ReactNode
  oneLiner?: string
  hue?: string
}

/** Module/section header: eyebrow + title + one-sentence explanation (per PRD content rules). */
export function SectionHeading({ eyebrow, title, oneLiner, hue = '--accent' }: Props) {
  return (
    <header className="max-w-2xl">
      {eyebrow && (
        <div
          className="mb-2 text-xs font-semibold uppercase tracking-[0.2em]"
          style={{ color: `var(${hue})` }}
        >
          {eyebrow}
        </div>
      )}
      <h1 className="text-balance text-3xl font-semibold leading-tight text-hi sm:text-4xl">
        {title}
      </h1>
      {oneLiner && <p className="mt-3 text-balance text-base leading-relaxed text-mid">{oneLiner}</p>}
    </header>
  )
}
