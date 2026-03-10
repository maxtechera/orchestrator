# kanban (stub)

Purpose: sweep incomplete tickets, rank by urgency, dispatch focused sub-agents, then stop.

Core behavior:
- prioritize: Code Review > QA > In Review > In Progress > Todo > Backlog
- skip active ticket sessions
- spawn with ticket-scoped labels
- no long polling loops
