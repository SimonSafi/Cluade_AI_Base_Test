/** Tiny classnames joiner (no dep). */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/** Resolve a css hue var name to a usable color string. */
export function hueVar(name: string): string {
  return `var(${name})`
}
