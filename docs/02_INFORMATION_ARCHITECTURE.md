# Information Architecture

## Routes

- `/` — Command Center
- `/claude-code` — What Claude Code Is
- `/agents` — Agents & Subagents
- `/skills` — Skills & Reusable Workflows
- `/mcp` — MCP / Connectors / Tools
- `/tokens` — Tokens, Context, Cost Discipline
- `/workflow` — Recommended Workflows
- `/toolkit` — User's Installed Skills & MCP Map
- `/prompt-lab` — Prompt Quality Lab
- `/builder-mode` — How this app was built with Claude Code

## Navigation concept

Use a visual constellation/map as the main navigation. Each node opens a module.

## Global UI components

- AppShell
- CommandCenterHero
- ConceptNode
- MotionCard
- TokenGauge
- ContextWorkbench
- AgentRoom
- ToolPort
- SkillCard
- WorkflowStepper
- PromptComparison
- ConceptGlossaryDrawer
- VisualQuizCard
- ProgressRibbon

## Data model

Use local files first:

```ts
type Concept = {
  id: string
  title: string
  oneLiner: string
  metaphor: string
  visualType: 'flow' | 'map' | 'gauge' | 'workbench' | 'simulation'
  shortExplanation: string
  deeperExplanation?: string
  examples: Example[]
  interactions: Interaction[]
}

type Example = {
  title: string
  bad?: string
  good?: string
  why: string
}
```
