# Official Reference Notes

These notes summarize stable concepts from Anthropic Claude Code documentation.

## Skills
Skills are reusable instruction packages. A skill is typically defined by a `SKILL.md` file and can be invoked directly or used when relevant. Long skill body content is loaded only when used, which makes skills useful for repeatable procedures without permanently bloating the main context.

## Subagents
Subagents are specialized assistants with their own context, system prompt, tool access, and permissions. They are useful when a side task would flood the main conversation with search output, logs, or codebase exploration. They return a concise result to the main session.

## MCP
MCP connects Claude Code to external tools and data sources through servers. Use it when you otherwise would copy data manually from tools such as design systems, issue trackers, monitoring dashboards, or databases.

## CLAUDE.md
`CLAUDE.md` is project-level memory/instructions read at session startup. Keep it stable, concise, and focused on project rules and architecture.

## Plugins/settings
Claude Code supports plugins that can include skills, agents, hooks, and MCP servers. Configure carefully so useful tools are available without creating noisy routing.
