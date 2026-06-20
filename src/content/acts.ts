import type { IconName } from '@/components/ui/Icon'

/** Practical, visual-first content: how to USE Claude Code / Codex features well. */

export interface ActMeta {
  id: string
  index: string
  hue: string
  kicker: string
  title: string
  caption: string
}

export const ACTS: ActMeta[] = [
  { id: 'hero', index: '00', hue: '--c-hero', kicker: 'Claude Code', title: 'Your coding command center', caption: 'One session orchestrating agents, skills, tools, and context.' },
  { id: 'think', index: '01', hue: '--c-think', kicker: 'How it works', title: 'A request becomes shipped work', caption: 'Understand → plan → tools → edit → verify.' },
  { id: 'agents', index: '02', hue: '--c-agents', kicker: 'Agents', title: 'Specialists on call', caption: 'Send heavy work to a subagent — keep the main session focused.' },
  { id: 'skills', index: '03', hue: '--c-skills', kicker: 'Skills', title: 'Playbooks, loaded on cue', caption: 'Reusable instructions — present only when relevant.' },
  { id: 'mcp', index: '04', hue: '--c-mcp', kicker: 'MCP', title: 'Ports to real tools', caption: 'Connect Figma, browsers, databases, GitHub.' },
  { id: 'tokens', index: '05', hue: '--c-tokens', kicker: 'Tokens & context', title: 'Spend context wisely', caption: 'Route information — don’t dump it into the session.' },
  { id: 'workflow', index: '06', hue: '--c-workflow', kicker: 'Workflow', title: 'The power-user loop', caption: 'Explore → Plan → Build → Delegate → Verify → Polish → Ship.' },
  { id: 'toolkit', index: '07', hue: '--c-toolkit', kicker: 'Your toolkit', title: 'Tools, by purpose', caption: 'Skills + connectors grouped for the job.' },
  { id: 'glossary', index: '08', hue: '--c-mcp', kicker: 'Glossary', title: 'The vocabulary', caption: 'Every term, one line. Hover for the why.' },
  { id: 'resources', index: '09', hue: '--c-workflow', kicker: 'Resources', title: 'Go deeper', caption: 'Official docs + references to keep going.' },
  { id: 'generate', index: '10', hue: '--c-hero', kicker: 'Build', title: 'Generate your first workflow', caption: 'Describe an idea → get a Claude Code starting kit.' },
  { id: 'builder', index: '11', hue: '--c-verify', kicker: 'Builder mode', title: 'How this was built', caption: 'The stack and principles behind this lab.' },
]

/* ---------- Glossary ---------- */
export interface GlossaryTerm { term: string; def: string; why: string; hue: string }
export const GLOSSARY: GlossaryTerm[] = [
  { term: 'Agent', def: 'An AI that plans and acts with tools, not just chats.', why: 'It can read, edit, run, and verify — a worker, not an autocomplete.', hue: '--c-agents' },
  { term: 'Subagent', def: 'A specialist with its own fresh context + permissions.', why: 'Heavy work runs off to the side; only the answer returns.', hue: '--c-agents' },
  { term: 'Skill', def: 'A reusable playbook loaded only when its trigger matches.', why: 'Repeated instructions live once, out of context until needed.', hue: '--c-skills' },
  { term: 'MCP', def: 'Adapter protocol connecting Claude Code to external tools/data.', why: 'Figma, browsers, DBs, GitHub — without bespoke glue.', hue: '--c-mcp' },
  { term: 'Token', def: 'A chunk of model input/output — the unit of cost + context.', why: 'Everything you load is carried every turn.', hue: '--c-tokens' },
  { term: 'Context window', def: 'The finite workbench the model reasons on.', why: 'Fill it with noise and quality drops.', hue: '--c-tokens' },
  { term: 'Hook', def: 'An automatic trigger that runs on a tool event.', why: 'Enforce a rule every time something happens.', hue: '--c-hooks' },
  { term: 'Permission', def: 'An access gate on what the agent may do.', why: 'Least privilege limits the blast radius.', hue: '--c-verify' },
  { term: 'CLAUDE.md', def: 'Project house-rules loaded into every session.', why: 'Stable conventions; keep it short to save context.', hue: '--c-workflow' },
  { term: 'Workflow', def: 'A repeatable loop: explore → plan → build → verify.', why: 'Separating phases beats one uncontrolled pass.', hue: '--c-workflow' },
]

/* ---------- Resources ---------- */
export interface ResourceLink { label: string; url: string; kind: string; icon: IconName; hue: string }
export const RESOURCES: ResourceLink[] = [
  { label: 'Claude Code docs', url: 'https://docs.claude.com/en/docs/claude-code', kind: 'official guide', icon: 'core', hue: '--c-hero' },
  { label: 'Skills', url: 'https://docs.claude.com/en/docs/claude-code/skills', kind: 'reusable playbooks', icon: 'skill', hue: '--c-skills' },
  { label: 'Subagents', url: 'https://docs.claude.com/en/docs/claude-code/sub-agents', kind: 'specialists', icon: 'agent', hue: '--c-agents' },
  { label: 'Model Context Protocol', url: 'https://modelcontextprotocol.io', kind: 'MCP spec', icon: 'mcp', hue: '--c-mcp' },
  { label: 'Anthropic API', url: 'https://docs.claude.com/en/api', kind: 'build with Claude', icon: 'build', hue: '--c-workflow' },
  { label: 'Anthropic Console', url: 'https://console.anthropic.com', kind: 'keys + usage', icon: 'token', hue: '--c-tokens' },
]

/* ---------- Builder mode ---------- */
export const BUILDER_STACK = ['Vite', 'React', 'TypeScript', 'Tailwind v4', 'Framer Motion', 'Canvas / SVG']
export interface BuildPrinciple { label: string; note: string; icon: IconName; hue: string }
export const BUILD_PRINCIPLES: BuildPrinciple[] = [
  { label: 'Visual-first', note: 'Every concept = a scene, not a paragraph.', icon: 'design', hue: '--c-skills' },
  { label: 'One immersive page', note: 'Scrollytelling acts, a living neon background.', icon: 'spark', hue: '--c-hero' },
  { label: 'Vector, not blobs', note: 'Crisp SVG/Canvas — orbits, lightning, gauges.', icon: 'verify', hue: '--c-mcp' },
  { label: 'Bring-your-own-key AI', note: 'Chatbot + generator call your provider directly.', icon: 'mcp', hue: '--c-agents' },
]

/* ---------- shared shape for topic context ---------- */
export interface Topic {
  what: string
  when: string[]
  avoid: string[]
  example: string
}

/* ---------- Act 02 — Agents ---------- */
export interface Specialist {
  id: string
  label: string
  icon: IconName
  task: string
  returns: string
  hue: string
  angle: number
}
export const SPECIALISTS: Specialist[] = [
  { id: 'explore', label: 'Explorer', icon: 'explore', task: 'Search a huge codebase', returns: 'files + conclusions', hue: '--cyan', angle: -52 },
  { id: 'plan', label: 'Planner', icon: 'plan', task: 'Design the approach', returns: 'step-by-step plan', hue: '--blue', angle: -18 },
  { id: 'review', label: 'Reviewer', icon: 'review', task: 'Audit the diff', returns: 'verdict + risks', hue: '--violet', angle: 18 },
  { id: 'design', label: 'Designer', icon: 'design', task: 'Critique the UI', returns: 'polish notes', hue: '--magenta', angle: 52 },
]
export const AGENTS_TOPIC: Topic = {
  what: 'A subagent has its own context, prompt, and permissions. It does a job and returns only the answer.',
  when: ['Searching a large codebase', 'Independent tasks in parallel', 'A design or code-review pass'],
  avoid: ['Trivial one-file edits', 'Work needing live shared context', 'When round-trip latency hurts'],
  example: 'Run a design-review agent right after building the UI.',
}

/* ---------- Act 03 — Skills ---------- */
export interface SkillCartridge {
  id: string
  name: string
  trigger: string
  good: boolean
  note: string
}
export const CARTRIDGES: SkillCartridge[] = [
  { id: 'review', name: 'code-review', trigger: 'before merge', good: true, note: 'Clear cue, specific steps.' },
  { id: 'plans', name: 'writing-plans', trigger: 'multi-step task', good: true, note: 'Loads only when planning.' },
  { id: 'broad', name: 'make-it-nice', trigger: 'fires on everything', good: false, note: 'Too broad — never silent.' },
]
export const SKILLS_TOPIC: Topic = {
  what: 'A skill is a reusable playbook Claude loads only when its trigger matches — so it stays out of context otherwise.',
  when: ['You repeat the same instructions', 'A checklist you paste often', 'Team-wide conventions'],
  avoid: ['One-off tasks', 'Triggers so broad it fires always', 'Dozens of overlapping skills'],
  example: 'Make a skill for your repeated frontend-polish review.',
}

/* ---------- Act 04 — MCP ---------- */
export interface Port {
  id: string
  label: string
  icon: IconName
  role: string
  hue: string
}
export const PORTS: Port[] = [
  { id: 'figma', label: 'Figma', icon: 'figma', role: 'design context', hue: '--magenta' },
  { id: 'browser', label: 'Browser', icon: 'browser', role: 'verify live app', hue: '--cyan' },
  { id: 'slides', label: 'Slides', icon: 'slides', role: 'build decks', hue: '--violet' },
  { id: 'data', label: 'Data / GitHub', icon: 'data', role: 'query + issues', hue: '--teal' },
]
export const MCP_TOPIC: Topic = {
  what: 'MCP servers connect Claude Code to external tools and data through a standard adapter.',
  when: ['Pull a design from Figma', 'Verify the app in a real browser', 'Query a DB or GitHub issues'],
  avoid: ['The capability is already local', 'The source is untrusted', 'You add tools you never call'],
  example: 'Connect Figma → implement the screen 1:1 from real specs.',
}

/* ---------- Act 05 — Tokens ---------- */
export const TOKENS_TOPIC = {
  what: 'Context is a finite workbench; tokens are the fuel. Everything you load stays — and crowds out reasoning.',
  waste: ['5k log lines in main chat', 'Re-reading huge files each turn', 'Every skill enabled at once', 'Giant tutorials in CLAUDE.md'],
  reduce: ['Explore agent returns a summary', 'Load skills only on cue', 'Keep CLAUDE.md short + stable', 'Ask for narrow tool output'],
  example: 'Send logs to an Explore agent, not the main session.',
}

/* ---------- Act 01 — Think (pipeline stages) ---------- */
export interface ThinkStage {
  id: string
  label: string
  icon: IconName
  hue: string
  detail: string
}
export const THINK_STAGES: ThinkStage[] = [
  { id: 'request', label: 'Request', icon: 'spark', hue: '--cyan', detail: '“Add dark mode to settings.”' },
  { id: 'understand', label: 'Understand', icon: 'explore', hue: '--cyan', detail: 'Reads only the files that matter.' },
  { id: 'plan', label: 'Plan', icon: 'plan', hue: '--blue', detail: 'Smallest safe set of steps.' },
  { id: 'tools', label: 'Tools', icon: 'mcp', hue: '--violet', detail: 'Search, run, fetch via MCP.' },
  { id: 'edit', label: 'Edit', icon: 'build', hue: '--magenta', detail: 'Targeted diffs, not rewrites.' },
  { id: 'verify', label: 'Verify', icon: 'verify', hue: '--teal', detail: 'Runs the app, checks output.' },
  { id: 'output', label: 'Shipped', icon: 'ship', hue: '--accent', detail: 'Working change, evidence shown.' },
]

/* ---------- Act 06 — Workflow ---------- */
export interface WorkStep {
  id: string
  label: string
  icon: IconName
  caption: string
  tip: string
  hue: string
}
export const WORKFLOW: WorkStep[] = [
  { id: 'explore', label: 'Explore', icon: 'explore', caption: 'Read-only first', tip: 'Use an Explore agent; return files + risks only.', hue: '--cyan' },
  { id: 'plan', label: 'Plan', icon: 'plan', caption: 'Smallest safe path', tip: 'Approve the plan before any edits.', hue: '--blue' },
  { id: 'build', label: 'Build', icon: 'build', caption: 'One slice at a time', tip: 'Ship a vertical slice, then scale.', hue: '--violet' },
  { id: 'delegate', label: 'Delegate', icon: 'delegate', caption: 'Offload heavy work', tip: 'Parallel subagents for independent tasks.', hue: '--magenta' },
  { id: 'verify', label: 'Verify', icon: 'verify', caption: 'Run the real app', tip: 'Evidence over “looks done”.', hue: '--teal' },
  { id: 'polish', label: 'Polish', icon: 'polish', caption: 'Design + a11y pass', tip: 'A review agent catches what you miss.', hue: '--pink' },
  { id: 'ship', label: 'Ship', icon: 'ship', caption: 'Branch · commit · PR', tip: 'Commit only when asked; branch first.', hue: '--indigo' },
]

/* ---------- Act 07 — Toolkit clusters (curated from installed inventory) ---------- */
export interface Cluster {
  id: string
  label: string
  icon: IconName
  hue: string
  items: string[]
}
export const CLUSTERS: Cluster[] = [
  { id: 'design', label: 'Design', icon: 'design', hue: '--magenta', items: ['frontend-design', 'interface-kit', 'design-system', 'design-critique', 'accessibility-review'] },
  { id: 'engineering', label: 'Engineering', icon: 'build', hue: '--blue', items: ['code-review', 'system-design', 'test-driven-development', 'systematic-debugging', 'security-review'] },
  { id: 'workflow', label: 'Workflow', icon: 'delegate', hue: '--violet', items: ['writing-plans', 'executing-plans', 'subagent-driven-development', 'dispatching-parallel-agents', 'verification-before-completion'] },
  { id: 'present', label: 'Presentation', icon: 'slides', hue: '--pink', items: ['pptx', 'canvas-design', 'gamma', 'docx', 'pdf'] },
  { id: 'browser', label: 'Browser / Computer', icon: 'browser', hue: '--cyan', items: ['Chrome', 'computer-use', 'gstack-browse'] },
  { id: 'claude', label: 'Claude-specific', icon: 'core', hue: '--teal', items: ['claude-api', 'skill-creator', 'mcp-builder', 'caveman'] },
]

/* ---------- Act 08 — Project Generator (placeholder outputs) ---------- */
export interface GenCard {
  id: string
  label: string
  icon: IconName
  hue: string
  hint: string
}
export const GEN_CARDS: GenCard[] = [
  { id: 'prd', label: 'PRD', icon: 'plan', hue: '--cyan', hint: 'Goals, users, scope' },
  { id: 'arch', label: 'Architecture', icon: 'build', hue: '--blue', hint: 'Stack + structure' },
  { id: 'prompt', label: 'First prompt', icon: 'spark', hue: '--violet', hint: 'Shaped, not a wish' },
  { id: 'agents', label: 'Agents', icon: 'agent', hue: '--magenta', hint: 'Who to delegate to' },
  { id: 'skills', label: 'Skills', icon: 'skill', hue: '--pink', hint: 'Reusable playbooks' },
  { id: 'mcp', label: 'MCP tools', icon: 'mcp', hue: '--teal', hint: 'Connectors to wire' },
  { id: 'tokens', label: 'Token strategy', icon: 'token', hue: '--c-tokens', hint: 'Keep context lean' },
  { id: 'phases', label: 'Phases', icon: 'ship', hue: '--indigo', hint: 'Build order' },
]
