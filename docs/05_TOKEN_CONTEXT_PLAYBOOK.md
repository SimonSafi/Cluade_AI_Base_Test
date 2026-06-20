# Token & Context Playbook

## Mental model

Claude has a limited working area. Anything you paste, every file it reads, and every tool output can consume context. The goal is not to minimize information; the goal is to route information intelligently.

## Good patterns

### 1. Explore first, summarize second
Use read-only exploration agents for broad codebase search. Ask them to return only:
- relevant files
- conclusions
- risks
- next actions

### 2. Keep CLAUDE.md stable and short
Put permanent project rules in CLAUDE.md.
Do not put giant tutorials there.

### 3. Convert repeated instructions to skills
If you paste the same review checklist five times, create a skill.

### 4. Use narrow tool outputs
Ask for focused searches, not huge dumps.

### 5. Verify with running app
Token savings are useless if the result is wrong. Use `/run` and `/verify`.

## Bad patterns

- Pasting thousands of log lines into the main session.
- Asking for “make everything amazing” with no constraints.
- Enabling every skill for every task.
- Putting huge reference docs in CLAUDE.md.
- Letting design, content, implementation, and QA happen in one uncontrolled pass.

## Practical prompt

“Use a read-only exploration agent to inspect the relevant files. Return only the files that matter, the current architecture, and the smallest safe implementation plan. Do not edit files yet.”
