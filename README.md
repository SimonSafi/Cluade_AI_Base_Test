# Claude Code AI Visual Lab

A project starter pack for building a highly visual, interactive learning app that explains Claude Code, agents/subagents, skills, MCP, tokens, workflows, and cost/context discipline.

This package is intended to be opened as a new project folder in Claude Code. Start with `prompts/00_MASTER_PROMPT.md`.

## Goal

Build an app that teaches AI tooling through interaction, not long text:
- visual metaphors
- animated flows
- clickable cards
- simulations
- live token/context-budget examples
- agent/team diagrams
- MCP connector maps
- skill lifecycle demos
- practical Claude Code workflow recipes

## Suggested target stack

Recommended:
- Vite + React + TypeScript
- Tailwind CSS
- Framer Motion
- React Flow or similar graph library
- shadcn/ui or a custom design system
- local-only content data in JSON/TS modules first

Do not start with a backend unless there is a concrete need.

## How to use

1. Create a clean project folder.
2. Copy this entire folder into the project root.
3. Open Claude Code in the root.
4. Paste `prompts/00_MASTER_PROMPT.md`.
5. Let Claude create the implementation plan first.
6. Ask Claude to implement in phases:
   - design system + shell
   - visual learning modules
   - interactivity/simulations
   - polish
   - verification
7. Use `/run` and `/verify` after meaningful milestones.
8. Use the project agents in `.claude/agents/` when reviewing design, learning quality, and technical quality.

## Project philosophy

The app should feel like an interactive museum exhibit, not a documentation site.
Every concept should have:
- one simple metaphor
- one animated visualization
- one concrete Claude Code example
- one “try it yourself” mini interaction
- one short takeaway
