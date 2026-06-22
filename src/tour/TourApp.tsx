import { TopBar } from '@/components/shell/TopBar'
import { AssistantDock } from '@/components/chat/AssistantDock'
import { ProgressRail } from '@/components/scroll/ProgressRail'
import { SpaceFlight } from '@/components/fx/SpaceFlight'
import { NebulaPlate } from '@/components/fx/NebulaPlate'
import { NebulaDrift } from '@/components/fx/NebulaDrift'
import { NeonVeins } from '@/components/fx/NeonVeins'
import { SectionConnector } from '@/components/scroll/SectionConnector'
import { HeroAct } from '@/acts/HeroAct'
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
import { OutroAct } from '@/acts/OutroAct'

/** The immersive scroll experience (default on desktop). */
export function TourApp() {
  return (
    <div className="grain relative min-h-screen">
      {/* fixed deep-space layer: warp flight + drifting nebula */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0">
          <SpaceFlight />
        </div>
        <NebulaPlate />
        <NebulaDrift />
        <div className="vignette absolute inset-0" />
      </div>

      {/* document-spanning neon circulatory system — connects every section */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <NeonVeins />
      </div>

      <TopBar />
      <ProgressRail />

      <main className="relative z-10">
        <HeroAct />
        <ThinkAct />
        <AgentsAct />
        <SkillsAct />
        <McpAct />
        <TokensAct />
        <WorkflowAct />
        <ToolkitAct />
        <SectionConnector hue="--c-mcp" />
        <GlossaryAct />
        <ResourcesAct />
        <DevGuideAct />
        <SectionConnector hue="--c-hero" />
        <ProjectGeneratorAct />
        <BuilderAct />
        <OutroAct />
      </main>

      <AssistantDock />
    </div>
  )
}
