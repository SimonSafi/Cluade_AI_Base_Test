// Initial categorized inventory based on the user's installed skills/plugins.
// Use this as content seed for the Toolkit Map screen.

export const toolkitCategories = [
  {
    id: 'planning',
    title: 'Planning & Workflow',
    metaphor: 'Project control tower',
    recommendedUse: 'Use for breaking work into phases and preventing chaotic all-in-one generation.',
    items: [
      'writing-plans',
      'executing-plans',
      'subagent-driven-development',
      'dispatching-parallel-agents',
      'verification-before-completion',
      'using-git-worktrees'
    ]
  },
  {
    id: 'design',
    title: 'Design & Frontend',
    metaphor: 'Design studio',
    recommendedUse: 'Use for visual direction, design systems, accessibility, and UI polish.',
    items: [
      'frontend-design',
      'interface-kit',
      'design:design-system',
      'design:design-critique',
      'design:accessibility-review',
      'gstack-design-html',
      'gstack-design-review',
      'gstack-design-shotgun'
    ]
  },
  {
    id: 'figma',
    title: 'Figma',
    metaphor: 'Editable blueprint board',
    recommendedUse: 'Use when you want editable design files, diagrams, or design-to-code workflows.',
    items: [
      'figma:figma-use',
      'figma:figma-generate-design',
      'figma:figma-generate-diagram',
      'figma:figma-create-new-file',
      'figma:figma-generate-library'
    ]
  },
  {
    id: 'claude',
    title: 'Claude-specific',
    metaphor: 'AI tooling lab',
    recommendedUse: 'Use for building skills, MCP tools, artifacts, and Claude-related explanations.',
    items: [
      'anthropic-skills:skill-creator',
      'anthropic-skills:mcp-builder',
      'anthropic-skills:web-artifacts-builder',
      'anthropic-skills:canvas-design',
      'anthropic-skills:theme-factory',
      'claude-api'
    ]
  },
  {
    id: 'mcp',
    title: 'MCP / Connectors',
    metaphor: 'External tool ports',
    recommendedUse: 'Use when Claude needs to interact with Figma, Canva, Gamma, browser, desktop, or external services.',
    items: [
      'Figma MCP',
      'Canva MCP',
      'Gamma MCP',
      'Google Slides MCP',
      'Wolfram MCP',
      'Computer Use',
      'Claude in Chrome',
      'Claude Preview'
    ]
  },
  {
    id: 'qa',
    title: 'QA & Review',
    metaphor: 'Inspection station',
    recommendedUse: 'Use before calling the app finished.',
    items: [
      'run',
      'verify',
      'code-review',
      'security-review',
      'design:accessibility-review',
      'systematic-debugging',
      'test-driven-development'
    ]
  }
]
