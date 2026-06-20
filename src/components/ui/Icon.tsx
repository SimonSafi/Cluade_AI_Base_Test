import type { SVGProps } from 'react'

export type IconName =
  | 'core'
  | 'agent'
  | 'explore'
  | 'plan'
  | 'build'
  | 'delegate'
  | 'review'
  | 'design'
  | 'verify'
  | 'polish'
  | 'ship'
  | 'skill'
  | 'mcp'
  | 'token'
  | 'figma'
  | 'browser'
  | 'slides'
  | 'data'
  | 'spark'

/* Shape families — consistent 1.5 stroke, small internal detail, subtle filled accents.
   Agents = satellite/drone · Skills = cartridge · MCP = gateway/plug
   Tokens = fuel cell · Workflow = rails/checkpoints */
const P: Record<IconName, JSX.Element> = {
  // command core — hexagon reactor with inner node + ticks
  core: (
    <>
      <path d="M12 2.6 19.1 6.8V15.2L12 21.4 4.9 15.2V6.8Z" />
      <circle cx="12" cy="11" r="2.4" fill="currentColor" fillOpacity="0.18" />
      <circle cx="12" cy="11" r="2.4" />
      <path d="M12 4.4v2M12 15.6v2M6.6 8v6M17.4 8v6" opacity="0.6" />
    </>
  ),
  // AGENTS family — satellite/drone: body + side panels + antenna + signal
  agent: (
    <>
      <rect x="9" y="9" width="6" height="6" rx="1.4" fill="currentColor" fillOpacity="0.16" />
      <rect x="9" y="9" width="6" height="6" rx="1.4" />
      <path d="M9 12H5.5M3 10.4h2.5v3.2H3ZM15 12h3.5M18.5 10.4H21v3.2h-2.5Z" />
      <path d="M12 9V5.6" />
      <circle cx="12" cy="4.4" r="1" fill="currentColor" />
    </>
  ),
  explore: (
    <>
      <circle cx="11" cy="11" r="6" />
      <circle cx="11" cy="11" r="2.4" fill="currentColor" fillOpacity="0.2" />
      <path d="m20 20-3.7-3.7" />
    </>
  ),
  plan: (
    <>
      <rect x="3.5" y="4" width="17" height="16" rx="2" />
      <path d="M7 8h7M7 12h9M7 16h5" />
      <circle cx="17.5" cy="16" r="1.4" fill="currentColor" />
    </>
  ),
  build: (
    <>
      <path d="M3 21h18" />
      <path d="M5 21V9l7-4.4L19 9v12" />
      <rect x="9.5" y="13" width="5" height="8" fill="currentColor" fillOpacity="0.16" />
      <path d="M9.5 13h5v8" />
      <path d="M8 9.5h0M16 9.5h0" />
    </>
  ),
  // WORKFLOW family — delegate as branching rail
  delegate: (
    <>
      <circle cx="5.5" cy="12" r="2.3" />
      <circle cx="18" cy="6" r="2.3" />
      <circle cx="18" cy="18" r="2.3" />
      <path d="M7.7 11 15.8 6.7M7.7 13l8.1 4.3" />
    </>
  ),
  review: (
    <>
      <path d="M12 3 19 6v5c0 4.3-3 7.7-7 8.8C8 17.7 5 14.3 5 10V6Z" fill="currentColor" fillOpacity="0.12" />
      <path d="M12 3 19 6v5c0 4.3-3 7.7-7 8.8C8 17.7 5 14.3 5 10V6Z" />
      <path d="m9 11 2.1 2.1L15 9.2" />
    </>
  ),
  design: (
    <>
      <path d="M12 3.2 14 8.3l5.3.4-4 3.4 1.3 5.1L12 14.6 7.4 17.2l1.3-5.1-4-3.4L10 8.3Z" fill="currentColor" fillOpacity="0.12" />
      <path d="M12 3.2 14 8.3l5.3.4-4 3.4 1.3 5.1L12 14.6 7.4 17.2l1.3-5.1-4-3.4L10 8.3Z" />
    </>
  ),
  // WORKFLOW checkpoint — verify
  verify: (
    <>
      <circle cx="12" cy="12" r="8.4" />
      <circle cx="12" cy="12" r="8.4" fill="currentColor" fillOpacity="0.08" />
      <path d="m8.4 12 2.5 2.5 4.7-4.9" />
    </>
  ),
  polish: (
    <>
      <path d="M5 16 15.5 5.5l3 3L8 19l-4 1Z" fill="currentColor" fillOpacity="0.12" />
      <path d="M5 16 15.5 5.5l3 3L8 19l-4 1Z" />
      <path d="M14 7 17 10" />
      <path d="M19.5 4.5 21 6M18 3l.7 1.6M21 8.5 19.4 9" opacity="0.7" />
    </>
  ),
  // WORKFLOW launch — ship
  ship: (
    <>
      <path d="M12 2.6c2.6 1.8 4 4.6 4 7.8 0 1.9-.5 3.7-1.4 5.2H9.4C8.5 14.1 8 12.3 8 10.4c0-3.2 1.4-6 4-7.8Z" fill="currentColor" fillOpacity="0.12" />
      <path d="M12 2.6c2.6 1.8 4 4.6 4 7.8 0 1.9-.5 3.7-1.4 5.2H9.4C8.5 14.1 8 12.3 8 10.4c0-3.2 1.4-6 4-7.8Z" />
      <circle cx="12" cy="9.5" r="1.4" fill="currentColor" />
      <path d="M9.4 15.6 7 18.4l2.3-.3M14.6 15.6 17 18.4l-2.3-.3M12 17v4" />
    </>
  ),
  // SKILLS family — cartridge / tool module
  skill: (
    <>
      <rect x="6" y="4.5" width="12" height="15" rx="1.8" fill="currentColor" fillOpacity="0.1" />
      <rect x="6" y="4.5" width="12" height="15" rx="1.8" />
      <path d="M9.5 4.5V2.6h5v1.9" />
      <rect x="9" y="8" width="6" height="3.4" rx="0.8" />
      <path d="M9 14.5h6M9.2 19.5v1.9M14.8 19.5v1.9" />
    </>
  ),
  // MCP family — gateway hexagon with plug
  mcp: (
    <>
      <path d="M12 2.8 19 6.9v8.2L12 19.2 5 15.1V6.9Z" fill="currentColor" fillOpacity="0.08" />
      <path d="M12 2.8 19 6.9v8.2L12 19.2 5 15.1V6.9Z" />
      <rect x="9.5" y="9.5" width="5" height="4.5" rx="1" />
      <path d="M10.5 9.5V7.5M13.5 9.5V7.5M12 14v2.4" />
    </>
  ),
  // TOKENS family — fuel cell / battery with cells
  token: (
    <>
      <rect x="3" y="7.5" width="15.5" height="9" rx="2" fill="currentColor" fillOpacity="0.08" />
      <rect x="3" y="7.5" width="15.5" height="9" rx="2" />
      <path d="M21 10.5v3" />
      <rect x="5.4" y="9.8" width="2" height="4.4" fill="currentColor" fillOpacity="0.55" stroke="none" />
      <rect x="8.4" y="9.8" width="2" height="4.4" fill="currentColor" fillOpacity="0.35" stroke="none" />
      <rect x="11.4" y="9.8" width="2" height="4.4" fill="currentColor" fillOpacity="0.18" stroke="none" />
    </>
  ),
  figma: (
    <>
      <circle cx="9.5" cy="6" r="2.5" />
      <circle cx="9.5" cy="12" r="2.5" />
      <circle cx="9.5" cy="18" r="2.5" />
      <circle cx="15" cy="9" r="2.5" fill="currentColor" fillOpacity="0.18" />
      <circle cx="15" cy="9" r="2.5" />
    </>
  ),
  browser: (
    <>
      <rect x="3.5" y="5" width="17" height="14" rx="2" fill="currentColor" fillOpacity="0.07" />
      <rect x="3.5" y="5" width="17" height="14" rx="2" />
      <path d="M3.5 9h17" />
      <circle cx="6.4" cy="7" r="0.6" fill="currentColor" />
      <circle cx="8.6" cy="7" r="0.6" fill="currentColor" />
    </>
  ),
  slides: (
    <>
      <rect x="3.5" y="4.5" width="17" height="11.5" rx="2" fill="currentColor" fillOpacity="0.07" />
      <rect x="3.5" y="4.5" width="17" height="11.5" rx="2" />
      <path d="M7.5 12 10 9.3l2 1.8 3-3.4" />
      <path d="M12 16v3.4M8.5 19.4h7" />
    </>
  ),
  data: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="2.6" fill="currentColor" fillOpacity="0.1" />
      <ellipse cx="12" cy="6" rx="7" ry="2.6" />
      <path d="M5 6v6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V6" />
      <path d="M5 12v6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6v-6" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3.4c.3 3 1.6 4.3 4.6 4.6-3 .3-4.3 1.6-4.6 4.6-.3-3-1.6-4.3-4.6-4.6 3-.3 4.3-1.6 4.6-4.6Z" fill="currentColor" fillOpacity="0.16" />
      <path d="M12 3.4c.3 3 1.6 4.3 4.6 4.6-3 .3-4.3 1.6-4.6 4.6-.3-3-1.6-4.3-4.6-4.6 3-.3 4.3-1.6 4.6-4.6Z" />
      <path d="M17.5 14.5c.15 1.5.8 2.15 2.3 2.3-1.5.15-2.15.8-2.3 2.3-.15-1.5-.8-2.15-2.3-2.3 1.5-.15 2.15-.8 2.3-2.3Z" />
    </>
  ),
}

interface Props extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName
  size?: number
}

/** Crisp geometric line-icon set (currentColor stroke, subtle filled accents). */
export function Icon({ name, size = 22, ...rest }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...rest}
    >
      {P[name]}
    </svg>
  )
}
