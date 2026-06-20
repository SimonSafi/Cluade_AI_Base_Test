# Agent/Subagent Workflow Prompt

Use this when Claude starts mixing exploration, implementation, and review in one messy flow.

Please reorganize the work using subagent-driven development.

Use separate roles:
1. Explore agent — read-only inspection of current app structure.
2. Visual Product Director — critique the product experience and identify the highest-impact improvements.
3. Learning Experience Reviewer — check whether concepts are understandable to beginners.
4. Frontend Polish Reviewer — inspect UI/component quality.
5. Implementation agent — make scoped changes only after the plan is clear.
6. Verification — run and visually verify the app.

Rules:
- Exploration agents must return concise summaries only.
- Implementation must be done in small phases.
- Do not let review agents edit files directly unless explicitly asked.
- Keep the main session clean and decision-focused.
