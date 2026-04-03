# Orchestrator Architecture

Orchestrator is a skill-first control plane with 4 core components:

## 4-Component Model

1. **Planner**: Prioritizes tickets from Linear kanban state + priority labels
2. **Dispatcher**: Spawns focused sub-agents with strict task scopes
3. **Verifier**: Enforces done gate (evidence + artifacts + PR policy)
4. **State Writer**: Updates Linear state/comments deterministically

## Data Flow

```
Linear tickets
    ↓
kanban-sweep cron (trigger)
    ↓
kanban-dispatch-fast.py (planner + dispatcher)
    ↓
kanban-sweep-state.py (state reader)
    ↓
sessions_spawn (worker agent spawner)
    ↓
worker agents (execute ticket work)
    ↓
Linear state update (verifier + state writer)
```

## Session Management

- **Isolation**: Tickets are isolated by `ticket-<ID>` label in session map
- **Cleanup policy**: `cleanup='keep'` for continuation across cron cycles
- **Resume key**: `resumeSessionKey` enables agent to pick up where it left off
- **Session map**: `/data/workspace/state/kanban-ticket-sessions.json` tracks active sessions per ticket

## Concurrency & Dispatch

- **Sharding**: Dispatcher supports `--shard-index 0/1 of --shard-count 2` for parallel cron runs
- **Max spawn cap**: Configurable per-cycle spawn limit to prevent resource exhaustion
- **Per-ticket locking**: Session map prevents duplicate dispatch of same ticket
- **Stale detection**: `ACTIVE_RUN_STALE_SECONDS=1800` (30 min) marks runs as orphaned if no progress

## Dispatcher Pickup Priority

Tickets are picked up in this order:

1. **Code Review** — PR open, awaiting human merge
2. **QA** — post-merge validation
3. **In Review** — non-code artifact review pending
4. **In Progress (orphaned)** — active session stale, needs re-dispatch
5. **Todo** — pickup-ready, no active session
6. **Backlog** — not pickup-ready (missing contract sections)

## Orphaned In Progress Definition

A ticket in "In Progress" is considered **orphaned** if:
- Its session exists in the session map
- The session's `lastActivity` timestamp is older than `ACTIVE_RUN_STALE_SECONDS` (1800s)
- No recent state updates in Linear

Orphaned tickets are re-dispatched to a fresh worker session.
