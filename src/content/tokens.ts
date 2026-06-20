import type { Concept } from './types'

export const tokensConcept: Concept = {
  id: 'tokens',
  title: 'Tokens & Context',
  oneLiner: 'Tokens are the working fuel of the model — context is the bench it works on.',
  metaphor: 'A fuel tank feeding a workbench with limited space.',
  visualType: 'gauge',
  shortExplanation:
    'Every file read, log pasted, tool result, and repeated instruction takes space on the workbench and burns fuel. The goal is not to minimize information — it is to route it intelligently.',
  deeperExplanation:
    'Context is a fixed window. Once it fills, older detail gets summarized or pushed out, and quality drops. Read-only exploration agents, summaries, and on-demand skills keep the main bench clear so the model reasons on what matters.',
  examples: [
    {
      title: 'Logs into main chat',
      bad: 'Paste 5,000 log lines straight into the session.',
      why: 'The bench clogs and fuel spikes — most lines are noise the model must carry forever.',
    },
    {
      title: 'Route to an Explore agent',
      good: 'Send the logs to a read-only agent; get back files + conclusions.',
      why: 'Only the summary lands on the main bench. Same insight, fraction of the fuel.',
    },
    {
      title: 'Repeated checklist → skill',
      good: 'Convert a checklist you paste often into a skill.',
      why: 'It loads only when relevant instead of living in context every turn.',
    },
  ],
}

/** Scenarios driving the interactive sim. Values are CONCEPTUAL, not real billing. */
export interface Scenario {
  id: 'A' | 'B' | 'C'
  label: string
  desc: string
  /** 0..100 — how full the context bench ends up */
  contextFill: number
  /** relative fuel burned, 0..100 */
  fuelBurn: number
  /** workbench items shown filling the bench */
  benchItems: { label: string; kind: 'noise' | 'signal' | 'skill'; weight: number }[]
  takeaway: string
}

export const SCENARIOS: Scenario[] = [
  {
    id: 'A',
    label: 'Dump logs in main chat',
    desc: 'Paste 5,000 lines of logs directly into the session.',
    contextFill: 88,
    fuelBurn: 92,
    benchItems: [
      { label: '5,000 log lines', kind: 'noise', weight: 7 },
      { label: 'your question', kind: 'signal', weight: 1 },
    ],
    takeaway: 'Raw logs are mostly noise. They stay in context every turn and crowd out reasoning.',
  },
  {
    id: 'B',
    label: 'Route to Explore agent',
    desc: 'Send logs to a read-only agent; it returns files + conclusions only.',
    contextFill: 34,
    fuelBurn: 41,
    benchItems: [
      { label: 'agent summary', kind: 'signal', weight: 2 },
      { label: 'relevant files', kind: 'signal', weight: 1 },
      { label: 'your question', kind: 'signal', weight: 1 },
    ],
    takeaway: 'The agent burns its own throwaway context. Your main bench stays clear for the real work.',
  },
  {
    id: 'C',
    label: 'Checklist → reusable skill',
    desc: 'Turn a repeated checklist into a skill loaded only when relevant.',
    contextFill: 22,
    fuelBurn: 28,
    benchItems: [
      { label: 'skill (loaded on demand)', kind: 'skill', weight: 1 },
      { label: 'your task', kind: 'signal', weight: 1 },
    ],
    takeaway: 'Instructions you repeat belong in a skill — present when needed, absent when not.',
  },
]
