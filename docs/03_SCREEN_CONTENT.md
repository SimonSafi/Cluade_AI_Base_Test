# Initial Screen Content

## Home — Command Center

One-liner:
“Claude Code is not just chat. It is a coding command center with tools, memory, specialists, and workflows.”

Primary visual:
A central cockpit labelled “Main Claude Session” with orbiting systems:
- Agents
- Skills
- MCP
- Tokens
- Hooks
- Git/PR
- Design Tools
- Verification

Interaction:
Hover/click nodes to see:
- what it is
- when to use it
- what can go wrong
- best practice

## Agents

One-liner:
“Agents are specialists that keep side work out of your main conversation.”

Metaphor:
A workshop with separate rooms:
- Explorer room
- Design critique room
- Code review room
- Implementation room

Mini demo:
Drag “Search huge codebase” into Explorer.
Result:
- main context stays clean
- only summary returns

## Skills

One-liner:
“Skills are reusable playbooks Claude can load only when relevant.”

Metaphor:
Toolbox cards.

Mini demo:
Repeated messy prompt → converted into reusable skill.

Show:
- too broad skill = triggers too often
- too narrow skill = never triggers
- good skill = clear purpose + specific steps + examples

## MCP

One-liner:
“MCP is the adapter layer that lets Claude Code work with external tools.”

Metaphor:
Universal ports on a command hub.

Mini demo:
Connect:
- Figma → design context
- GitHub → issues/PRs
- Browser → web app verification
- Calendar/Gmail → personal workflow data

Warning card:
External tools can bring untrusted content. Permissions and review matter.

## Tokens

One-liner:
“Tokens are the working fuel of the model.”

Metaphor:
Fuel tank + limited workbench space.

Mini demo:
Scenario A: paste 5,000 lines of logs into main chat.
Scenario B: send logs to Explorer and return summary.
Scenario C: create a skill for repeated checklist.
Show conceptual token/context savings.

## Prompt Lab

One-liner:
“Claude performs better when the job is shaped like a project, not a wish.”

Interaction:
Compare weak prompt vs. strong prompt.

Weak:
“Make me a beautiful app about AI.”

Strong:
“Build a visual interactive learning app with these modules, design style, constraints, verification steps, and quality bar.”
