# Runtime Model

## Wake Model

Orchestrator uses a **fire-and-forget** wake model:

1. Cron fires (or webhook/manual trigger)
2. Dispatcher reads Linear tickets + session state
3. Dispatcher spawns worker agents for actionable tickets
4. Dispatcher exits (no tight loop, no polling)
5. Worker agents push completion updates back to Linear
6. Next cron cycle picks up new state

**No polling loops. No tight event loops. Exit after dispatch.**

## Constants

| Constant | Value | Purpose |
|----------|-------|---------|
| `ACTIVE_RUN_STALE_SECONDS` | 1800 | Mark runs as orphaned if no activity for 30 min |
| `DEFAULT_COOLDOWN_SECONDS` | 0 | No cooldown between dispatch cycles |
| `REVIEW_COOLDOWN_SECONDS` | 0 | No cooldown for Code Review tickets |
| `IMPLEMENT_COOLDOWN_SECONDS` | 0 | No cooldown for Todo tickets |
| `NO_OP_SUPPRESS_STREAK` | 999999 | Suppress repeated no-op status updates |
| `NO_OP_SUPPRESS_SECONDS` | 0 | No suppression delay |

## Tool Paths (Railway)

| Tool | Path |
|------|------|
| Dispatcher | `/data/workspace/tools/kanban-dispatch-fast.py` |
| State reader | `/data/workspace/tools/kanban-sweep-state.py` |

## State File Paths (Railway)

| State file | Path | Purpose |
|-----------|------|---------|
| Dispatch policy | `/data/workspace/state/kanban-dispatch-policy.json` | Tracks dispatch decisions + no-op suppression |
| Ticket sessions | `/data/workspace/state/kanban-ticket-sessions.json` | Maps ticket ID → active session |
| Sweep signature | `/data/workspace/state/kanban-sweep.sig.json` | Caches sweep run signatures for dedup |

## No-Op Suppression

The dispatcher tracks **no-op state** per ticket to avoid repeated status updates:

- **Policy file**: `/data/workspace/state/kanban-dispatch-policy.json`
- **Per-ticket tracking**:
  - `dispatchedAt`: Timestamp of last dispatch
  - `lastState`: Last observed Linear state
  - `sameStateStreak`: Count of consecutive cycles with same state
  - `suppressUntil`: Timestamp until which status updates are suppressed

**Rule**: If `sameStateStreak >= NO_OP_SUPPRESS_STREAK` and current time < `suppressUntil`, skip status comment.

## Session Policy

- **Isolation**: Tickets isolated by `ticket-<ID>` label
- **Cleanup**: `cleanup='keep'` for continuation across cron cycles
- **Resume**: `resumeSessionKey` enables agent to pick up where it left off
- **Session map**: `/data/workspace/state/kanban-ticket-sessions.json` tracks:
  - `ticket_id`: Linear ticket ID
  - `session_id`: OpenClaw session ID
  - `created_at`: Session creation timestamp
  - `last_activity`: Last activity timestamp
  - `status`: Current session status (active, stale, complete)

## Cron Payload Structure

The `kanban:sweep` cron payload:

```json
{
  "mode": "announce",
  "channel": "telegram",
  "to": "-5060881037",
  "prompt": "Run kanban sweep dispatcher...",
  "thinking": "medium",
  "timeout": 60
}
```

- **mode**: `announce` (post result to Telegram)
- **channel**: `telegram` (target channel)
- **to**: `-5060881037` (neo-events group ID)
- **thinking**: `medium` (enable reasoning for spawned agents)
- **timeout**: 60s (fire-and-forget, no tight loop)

## Dispatch Behavior

1. **Read state**: Load Linear tickets + session map
2. **Filter actionable**: Skip Backlog, Blocked by Max, Done
3. **Check sessions**: Skip tickets with active sessions (unless orphaned)
4. **Prioritize**: Code Review → QA → In Review → In Progress (orphaned) → Todo
5. **Spawn**: Create worker session for each actionable ticket
6. **Exit**: Return dispatch summary, no polling
