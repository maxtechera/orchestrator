# Runtime Model

## Loop model

- Wake via cron/webhook/manual trigger.
- Read incomplete tickets.
- Skip tickets already owned by active sessions.
- Dispatch top actionable set.
- Stop; rely on push completion updates.

## Session policy

- Isolate work by ticket label (`ticket-<ID>`).
- Prefer short-lived worker sessions (`cleanup=delete`).
- Avoid tight polling loops.
