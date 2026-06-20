# Project Instructions for Claude Code

## Product intent

You are building a premium, visual, interactive educational web app that explains the AI tooling ecosystem around Claude Code.

The target user is smart and technical enough to build things, but may not yet understand the surrounding concepts: agents, subagents, MCP, skills, tokens, context windows, tool permissions, workflows, and how to orchestrate Claude Code effectively.

The app must avoid feeling like a wall of documentation. Prefer:
- visual explanation over paragraphs
- interaction over static text
- animation over bullet lists when it clarifies the idea
- practical examples over theory
- progressive disclosure over long pages

## Non-negotiable UX principles

1. Minimal text.
2. Strong visual hierarchy.
3. Every module must include at least one interactive element.
4. Every concept must include a metaphor.
5. Beginner-friendly language, but technically accurate.
6. Desktop-first, responsive enough for laptop/tablet.
7. The app should look polished enough to be shown as a portfolio piece.
8. Do not use placeholder-gray boring UI unless intentionally part of a design system.
9. Avoid generic SaaS dashboards.
10. Verify the running app visually, not only through type checks.

## Accuracy constraints

Explain these concepts accurately:
- Claude Code is an agentic coding tool.
- Skills are reusable instructions/workflows loaded when relevant; long skill content should not pollute context until used.
- Subagents are specialized assistants with their own context, prompts, permissions, and sometimes model choice.
- MCP connects Claude Code to external tools/data sources through servers.
- Tokens are chunks of model input/output; token usage is affected by context, files, logs, tool results, and repeated instructions.
- Good orchestration reduces token waste by separating exploration, planning, implementation, verification, and design review.

## Visual metaphor system

Use a consistent visual metaphor:
- Main Claude session = command center / cockpit
- Context window = workbench with limited space
- Tokens = fuel / battery / budget meter
- Subagents = specialist workers in side rooms
- Skills = tool cards / reusable playbooks
- MCP servers = external ports / adapters to other systems
- Hooks = sensors / automatic triggers
- Permissions = access badges / locked doors
- CLAUDE.md = house rules / project constitution

## Recommended implementation choices

Use:
- React + TypeScript
- Framer Motion for animations
- React Flow or a custom SVG/canvas layer for diagrams
- Tailwind for styling
- component-driven design
- local content data modules

Avoid:
- backend unless explicitly needed
- over-engineering auth/database
- excessive copy
- generating huge unreviewed files
- building everything before the visual direction is approved

## Working method

Before implementation:
1. Inspect the starter docs.
2. Produce a concrete build plan.
3. Define routes/screens/modules.
4. Define design tokens and component architecture.
5. Identify which installed skills/subagents/MCP tools are useful.

During implementation:
1. Build the design system first.
2. Build one excellent vertical slice before scaling.
3. Verify visually with preview/screenshot tools if available.
4. Run lint/type checks/build after each implementation phase.
5. Keep changes organized and commit-ready.

## Definition of done

The result is done only when:
- app runs locally
- no TypeScript/build errors
- visual design is cohesive
- at least 6 learning modules are implemented
- each module has interaction
- the home screen is impressive
- the user can understand agents, skills, MCP, and tokens with minimal reading
- there is a final self-review report
