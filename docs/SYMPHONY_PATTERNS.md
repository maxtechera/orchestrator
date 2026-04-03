# Symphony Patterns — OpenClaw vs Symphony Reference

## What is Symphony
OpenAI released March 5 2026. Elixir/OTP orchestration service. Polls Linear → isolated git-clone workspace per issue → spawns Codex agents → delivers verified PRs. Key: WORKFLOW.md as YAML+Liquid config, full workspace isolation, multi-turn agents (20 turns), JSON-RPC 2.0 App-Server Protocol, exponential backoff (10s→300s), lifecycle hooks (after_create/before_run/after_run/before_remove), Phoenix LiveView real-time dashboard, SSH distributed workers across machines.

## Capability Comparison

| Symphony | OpenClaw | Status |
|----------|----------|--------|
| Issue tracker polling (30s GenServer) | 15min cron → kanban-dispatch-fast.py | Built — coarser interval |
| 5-state machine (Unclaimed/Claimed/Running/Succeeded/Failed) | 8 states (richer lifecycle) | OpenClaw wins |
| Full git-clone workspace isolation per issue | session-per-ticket label, /data volume dirs | Partial — dir-level not container |
| JSON-RPC 2.0 App-Server Protocol over stdio | sessions_spawn with task string | Different approach |
| Multi-turn (20 turns, workspace persists) | resumeSessionKey built in, needs cleanup='keep' | Built — needs activation |
| Exponential backoff (10s→300s) | policy state + no-op suppression (cooldown=0) | Framework exists, backoff disabled |
| Per-state concurrency limits | shard routing + max-spawn cap | Different pattern |
| Proof of Work (CI must pass) | Proof pack: PR + evidence + artifacts + Drive | OpenClaw richer |
| No human gates (fully autonomous) | Blocked by Max with structured payload | OpenClaw wins |
| Codex only | 4-tier model-router: Opus/Sonnet/Flash/Lite | OpenClaw wins |
| No cost optimization | swarm skill: 200x cheaper parallel (Gemini Flash) | OpenClaw wins |
| Phoenix LiveView real-time dashboard | None | Gap |
| WORKFLOW.md as YAML+Liquid config | Skill-first SKILL.md | Same intent, different form |
| SSH distributed workers | Single Railway instance | Gap — future |
| In-memory run store (rebuilds from Linear on restart) | SQLite run store in tools/orchestrator/ | OpenClaw more durable |

## Continuation Protocol
**Current state**: `kanban-dispatch-fast.py` adds `resumeSessionKey` to each spawn item (read lines 305-325 to confirm). But cron uses `cleanup='delete'` — sessions die after run. Contradiction: key is set, immediately invalidated.

**Target state (how to activate)**:
1. Change kanban:sweep cron payload: `"cleanup": "delete"` → `"cleanup": "keep"`
2. Workers on continuation turns: skip re-reading already-read files, resume from last checkpoint
3. Turn detection: if session has prior context, enter "continuation mode" immediately

**Why it matters**: Symphony agents get 20 turns to iterate on failing code. OpenClaw workers currently get 1 shot. Continuation enables iterative problem-solving.

## Lifecycle Hooks (Agent Instruction Contract)
Symphony has infrastructure hooks. OpenClaw uses agent instructions instead.

- `on_pickup`: Validate contract sections (Inputs/Deliverables/Verification/Artifacts exist). Set session label `ticket-<ID>`. Read AGENTS.md.
- `before_execute`: Checkout isolated branch `feat/<ticket-id>-<slug>`. Verify workspace clean (`git status` clean).
- `after_execute`: Run all checks from Verification section. Capture exact command output as evidence.
- `on_verify`: Post proof in Linear comment: commands run + outputs + screenshots/URLs.
- `on_done`: Post final proof pack. Update state to Done or Blocked by Max. Never self-transition without evidence.

## Reconciliation Contract
Symphony: re-fetches tracker every 30s, cancels stale workers automatically.

OpenClaw: ACTIVE_RUN_STALE_SECONDS = 1800 (30 min). Sessions older than 30min → added to `cleanup[]` array in dispatcher output → sweep parent sends kill signals before spawning new workers.

**Gap**: No mid-run state re-fetch. Workaround: agent re-reads Linear ticket at each phase transition.

## Harness Engineering
Symphony concept: design constraints + feedback loops for reliable agent execution.

**OpenClaw constraints**:
- Session isolation by `ticket-<ID>` label — prevents cross-ticket contamination
- max-spawn cap — prevents resource exhaustion
- Shard routing — prevents duplicate ticket ownership across parallel sweeps
- No self-modification rule (2026-02-25 incident)
- No-op suppression — prevents idle chatter loops
- runTimeoutSeconds = 21600 (6h per worker)

**OpenClaw feedback loops**:
- Proof pack enforcement — state-only updates = zero credit
- dispatch-quality-audit cron — hourly quality scoring /100
- policy state JSON — tracks dispatchedAt, lastState, sameStateStreak, suppressUntil per ticket

**Future to add (Symphony-informed)**:
- Per-state concurrency limits (Symphony: `human review: 1`)
- Token budget per ticket run
- Cost cap per sweep cycle
- Observability dashboard

## What to Build Next (Prioritized)
1. **Activate continuation** — change cron `cleanup='delete'` → `cleanup='keep'` (est. 30min, high value: agents can iterate)
2. **Per-state concurrency limits** — add to dispatcher policy (prevents QA queue pileup)
3. **Cost tracking per run** — use model-router cost data to track spend per ticket
4. **Observability dashboard** — Symphony has LiveView, OpenClaw has dashboard.json foundation
