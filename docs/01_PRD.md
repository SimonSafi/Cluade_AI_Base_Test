# PRD — Claude Code AI Visual Lab

## 1. Product summary

A visually rich, interactive educational app that teaches the Claude Code ecosystem: agents/subagents, skills, MCP, tokens, context management, hooks, plugins, and practical workflows.

The app should help the user both understand the concepts and learn how to build better apps with Claude Code.

## 2. Target audience

Primary:
- Builders who recently started using Claude Code.
- Technical users who can follow engineering concepts but lack mental models for AI-agent tooling.

Secondary:
- Non-technical viewers who need a simple demo explaining “how AI coding agents work.”

## 3. Main outcome

After 10–15 minutes in the app, a user should be able to explain:
- what Claude Code does
- what an agent/subagent is
- why skills are useful
- what MCP connects
- what tokens/context mean
- how to avoid wasting tokens
- how to structure a better Claude Code project

## 4. App structure

### Home / Command Center
A high-impact animated overview:
- central command center
- orbiting modules: Agents, Skills, MCP, Tokens, Workflows, Safety
- live “context/fuel” gauge
- animated data/tool lines

### Module 1 — Claude Code Basics
Visual: terminal/cockpit hybrid.
Interaction: choose a task and watch Claude Code move through read → plan → edit → test → verify.

### Module 2 — Agents & Subagents
Visual: main cockpit plus specialist rooms.
Interaction: drag tasks to specialists:
- Explorer
- Planner
- Designer
- Reviewer
- Implementer
Result: show what stays in the main context vs. subagent context.

### Module 3 — Skills
Visual: toolbox/playbook shelf.
Interaction: create a mini skill from repeated instructions.
Show:
- when skill loads
- why it saves context
- how too many broad skills can conflict

### Module 4 — MCP
Visual: adapter hub / ports.
Interaction: connect Figma, GitHub, Browser, Calendar, etc.
Show:
- tool access
- external data flow
- prompt-injection risk
- permissions

### Module 5 — Tokens & Context
Visual: battery/fuel/workbench.
Interaction: compare:
- paste huge logs into main chat
- send logs to Explore agent
- summarize first
- use skill only when needed
Show live token estimate meters conceptually, not exact billing.

### Module 6 — Workflow Orchestration
Visual: assembly line.
Interaction: choose a project type and get a recommended Claude Code workflow:
- research
- plan
- design
- implement
- verify
- review
- polish
- commit

### Module 7 — Building Beautiful Apps with Claude Code
Visual: design studio.
Interaction: toggle between weak prompt and strong prompt; show expected output quality differences.

### Module 8 — My Installed Toolkit Map
Visual: categorized skill/plugin map based on the user's installed inventory.
Interaction: filter by purpose:
- design
- engineering
- Claude-specific
- Figma
- research
- browser/computer
- presentations/docs
- QA/review

## 5. Content rules

- Each screen should have a “one-sentence explanation.”
- Keep paragraphs under 40 words.
- Prefer cards, icons, motion, and diagrams.
- Use expandable “deeper explanation” only when needed.
- Include practical Claude Code command examples in compact cards.

## 6. Visual style

Suggested direction: “AI control room + interactive museum.”
- dark premium background or dynamic light/dark toggle
- glowing but controlled accents
- glass panels with depth
- animated connector lines
- large icons
- mechanical/engineering-inspired meters
- minimal but sharp typography
- smooth transitions

Avoid:
- generic docs site
- plain markdown renderer
- huge text blocks
- chaotic neon overload

## 7. Success criteria

Functional:
- local app runs
- responsive layout
- navigation works
- all modules have content
- at least 6 interactive demos

Quality:
- visual polish
- consistent metaphors
- fast load
- no broken interactions
- understandable to non-experts

Learning:
- concepts become memorable
- user understands when to use skills/subagents/MCP
- user learns token/context discipline
