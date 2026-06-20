/** Shared content model (per docs/02_INFORMATION_ARCHITECTURE.md). */

export type ConceptId =
  | 'claude-code'
  | 'agents'
  | 'skills'
  | 'mcp'
  | 'tokens'
  | 'workflow'
  | 'hooks'
  | 'git'
  | 'verify'

export type VisualType = 'flow' | 'map' | 'gauge' | 'workbench' | 'simulation'

export interface Example {
  title: string
  bad?: string
  good?: string
  why: string
}

export interface Concept {
  id: ConceptId
  title: string
  oneLiner: string
  metaphor: string
  visualType: VisualType
  shortExplanation: string
  deeperExplanation?: string
  examples?: Example[]
}

/** A node on the Command Center constellation. */
export interface ConceptNodeData {
  id: ConceptId
  label: string
  /** css var name, e.g. "--c-agents" */
  hue: string
  /** route to open, or null if surfaced only on home */
  route: string | null
  whatItIs: string
  whenToUse: string
  whatGoesWrong: string
  bestPractice: string
  /** angle (deg) + radius factor for orbit placement */
  angle: number
  ready: boolean
}
