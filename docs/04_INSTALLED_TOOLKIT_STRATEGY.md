# Installed Toolkit Strategy

This is how to use the user's installed skills/plugins for this specific app.

## Highest-value skills to use

### Planning / orchestration
- writing-plans
- executing-plans
- subagent-driven-development
- dispatching-parallel-agents
- verification-before-completion

Use for:
- phased implementation
- splitting design/content/code review work
- avoiding one giant uncontrolled generation

### Design / UI quality
- frontend-design
- interface-kit
- design:design-system
- design:design-critique
- design:accessibility-review
- gstack-design-consultation
- gstack-design-html
- gstack-design-review
- gstack-design-shotgun

Use for:
- first visual direction
- component system
- critique loops
- visual polish

### Figma
- figma:figma-generate-design
- figma:figma-generate-diagram
- figma:figma-use
- figma:figma-create-new-file

Use only if you want a Figma design source before coding, or if you want to convert app screens into editable Figma layouts.

### Claude-specific / education
- anthropic-skills:mcp-builder
- anthropic-skills:skill-creator
- anthropic-skills:web-artifacts-builder
- anthropic-skills:canvas-design
- anthropic-skills:theme-factory
- claude-api
- ai-firstify:ai-firstify

Use for:
- explaining Claude ecosystem accurately
- building app-like artifacts
- creating a dedicated app visual language

### QA / quality
- systematic-debugging
- test-driven-development
- code-review
- security-review
- review
- verify
- run

Use for:
- validating the app visually and technically
- avoiding “looks done but broken” output

## Skills to avoid for this project unless needed

Mechanical/fluid engineering skills are not relevant for this app, except if you intentionally want engineering-style visual metaphors.

Do not activate too many skills at once. Start with:
1. frontend-design
2. design:design-system
3. writing-plans
4. subagent-driven-development
5. verification-before-completion
6. run / verify

Add others only when a phase needs them.

## Suggested custom agents

Included in `.claude/agents/`:
- `visual-product-director.md`
- `learning-experience-reviewer.md`
- `token-context-optimizer.md`
- `frontend-polish-reviewer.md`
