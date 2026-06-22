import type { FC } from 'react'
import { CompactCtx } from '@/lib/compact'
import { ThinkAct } from '@/acts/ThinkAct'
import { AgentsAct } from '@/acts/AgentsAct'
import { SkillsAct } from '@/acts/SkillsAct'
import { McpAct } from '@/acts/McpAct'
import { TokensAct } from '@/acts/TokensAct'
import { WorkflowAct } from '@/acts/WorkflowAct'
import { ToolkitAct } from '@/acts/ToolkitAct'
import { GlossaryAct } from '@/acts/GlossaryAct'
import { ResourcesAct } from '@/acts/ResourcesAct'
import { DevGuideAct } from '@/acts/DevGuideAct'
import { ProjectGeneratorAct } from '@/acts/ProjectGeneratorAct'
import { BuilderAct } from '@/acts/BuilderAct'

const REGISTRY: Record<string, FC> = {
  think: ThinkAct,
  agents: AgentsAct,
  skills: SkillsAct,
  mcp: McpAct,
  tokens: TokensAct,
  workflow: WorkflowAct,
  toolkit: ToolkitAct,
  glossary: GlossaryAct,
  resources: ResourcesAct,
  devguide: DevGuideAct,
  generate: ProjectGeneratorAct,
  builder: BuilderAct,
}

/** Renders one reused Act in compact (phone) layout. */
export function TopicScreen({ id }: { id: string }) {
  const C = REGISTRY[id]
  if (!C) return null
  return (
    <CompactCtx.Provider value={true}>
      <C />
    </CompactCtx.Provider>
  )
}
