# Token Reduction Prompt

Use this when the Claude Code session becomes long, noisy, or expensive.

Please optimize this session for token/context efficiency.

Actions:
1. Summarize the current project state in 20 lines or less.
2. Identify the 10 most important files.
3. Identify stale/noisy context that can be ignored.
4. Move repeated procedures into skills or compact checklists.
5. Use subagents for broad search instead of reading many files into the main context.
6. From now on, before reading large files or logs, explain why they are needed.
7. Return only concise findings unless more detail is required.

Do not remove important project requirements.
Do not sacrifice verification.
