---
name: orchestrator
description: OpenClaw's unified orchestration contract — replaces kanban, kanban-contract, and old orchestrator. Load this skill when processing Linear tickets, running sweep dispatch, or orchestrating multi-step work.
triggers:
  - kanban sweep
  - process Linear tickets
  - orchestrate work
  - dispatch agents
  - ticket workflow
replaces: [kanban, kanban-contract]
---

# Orchestrator Skill — OpenClaw's Symphony

OpenClaw's unified orchestration contract for ticket-driven execution. This skill owns both deterministic `kanban:sweep` dispatch and multi-step decomposition/delegation for complex work.

## Overview

**What this skill owns:**
- Ticket lifecycle from pickup to Done (8-state machine)
- Deterministic cron-driven dispatch (Mode A: `kanban:sweep`)
- Multi-step orchestration for complex work (Mode B)
- Worker hard contract (proof packs, evidence gates, state transitions)
- Operational guardrails (non-negotiable rules from production incidents)

**What it replaces:**
- `kanban` shim (compatibility layer, now deprecated)
- `kanban-contract` skill (merged into this skill)
- Old `orchestrator/SKILL.md` (19-line stale stub)

**What it documents (not implements):**
- Python tools: `tools/kanban-dispatch-fast.py`, `tools/kanban-sweep-state.py`, `tools/linear.py`
- State files: `state/kanban-dispatch-policy.json`, `state/kanban-ticket-sessions.json`, `state/kanban-sweep.sig.json`
- Related skills: `model-router` (for model selection), `swarm` (for parallel work)

---

## Mode A — `kanban:sweep` (Deterministic Fastpath)

The autonomous cron-driven sweep. **Parent session ONLY dispatches — never implements.**

### State Pickup Priority

Dispatcher processes tickets in this order:
1. **Code Review** — PR open, awaiting human merge
2. **QA** — post-merge validation, regression checks
3. **In Review** — non-code artifact review or evidence pending
4. **In Progress** (orphaned) — ticket has In Progress state but no active session with `ticket-<ID>` label
5. **Todo** — pickup-ready (Inputs defined, Deliverables specified)
6. **Backlog** — not pickup-ready (missing contract sections or not prioritized)

Always skip: `Done`, `Cancelled`, `Duplicate`, `Blocked by Max`.

### Dispatcher Invocation

**Exact command from cron:**
```bash
python3 /data/workspace/tools/kanban-dispatch-fast.py \
  --cache /data/workspace/state/kanban-sweep.sig.json \
  --max-spawn 5 \
  --include-review \
  [--shard-index 0 --shard-count 2]  # optional for multi-shard
```

**Dispatcher output schema:**
```json
{
  "hasWork": true,
  "spawn": [
    {
      "id": "NEO-123",
      "title": "Implement feature X",
      "mode": "run",
      "stateName": "Todo",
      "resumeSessionKey": "ses_abc123"  // optional, for continuation
    }
  ],
  "cleanup": ["ses_old1", "ses_old2"],  // stale sessions to kill
  "locked": ["NEO-456"],  // tickets with active sessions
  "throttled": [
    {
      "id": "NEO-789",
      "reason": "cooldown_active_until_2026-03-14T10:30:00Z"
    }
  ],
  "staleLocks": ["ses_stale1"]  // sessions older than ACTIVE_RUN_STALE_SECONDS
}
```

### Parent Sweep Execution Contract

1. **Run dispatcher pre-pass:**
   ```bash
   python3 /data/workspace/tools/kanban-dispatch-fast.py --cache <shard-cache> --max-spawn <cap> --include-review [--shard-index <i> --shard-count <n>]
   ```

2. **Cleanup stuck children** from `cleanup` list (kill stale sessions before spawning new workers).

3. **If no work** (`hasWork=false` or empty `spawn`): output `NO_REPLY` and exit immediately.

4. **For each spawn candidate**, call `sessions_spawn` with:
   - `runtime='subagent'`
   - `mode='run'`
   - `label='ticket-<ID>'` (for session tracking)
   - `cleanup='keep'` (preserve evidence/history for proof packs)
   - `runTimeoutSeconds=21600` (6 hours, long-running end-to-end ownership)
   - Continue on per-item errors (do not fail entire sweep if one spawn fails)

5. **Exit immediately** (no polling loop, no status chatter without delta).

### Worker Hard Contract (Non-Negotiable)

**Proof pack requirement (all 5 required for Done):**

Before claiming completion, attach a **proof pack on the Linear issue comment** with:

1. **PR URL or primary artifact link**
   - Format: `PR: https://github.com/...` or `URL: https://...`
   - If code/config/content changed in repo, PR is mandatory

2. **Evidence log** (exact commands run + outputs)
   - Format: code block with command + output summary
   - Example: `$ pnpm build` → `✓ Build succeeded in 45s`

3. **Artifact/test/run logs**
   - Test reports, build logs, deployment logs
   - Format: file path or Drive link

4. **Canonical link** (the main deliverable URL)
   - Where the work lives: deployed page, published post, merged PR, etc.
   - Format: `https://...`

5. **Drive folder URL** (where all artifacts are stored)
   - Format: `https://drive.google.com/drive/folders/...`

**Content handoff gate (applies to all content tickets):**
- Content is NOT complete unless artifacts are linked and attached in the ticket `Artifacts` section
- Must explicitly mark handoff state: `Ready for publish` or `Not ready` (never implicit)
- Reel recording is a publish decision by default, not an automatic blocker, unless ticket states it as blocking
- If there is a real human gate, include a one-line `Human decision needed` field with a specific yes/no decision

**AI agency gate (applies to all deliverables, not just content):**
- Worker default is full autonomous completion, not partial prep
- Use all relevant skills/tools to produce the final artifact before requesting human intervention
- Only use `Blocked by Max` when the remaining step is truly non-automatable or explicitly human-owned in scope/AC
- If blocked, include `alternatives_attempted` and why each alternative cannot satisfy acceptance criteria

**Zero-credit rules:**
- State transition alone = REJECTED (no proof)
- Checklist tick alone = REJECTED (no proof)
- Status comment without artifact delta = REJECTED (no proof)
- Must have concrete evidence before state change

**Fail-closed Done gate:**
- Agent CANNOT self-transition to Done without proof pack
- Must post proof pack as Linear comment BEFORE state change
- If proof pack is incomplete: do NOT move ticket to Done/In Review

**Blocked by Max format** (all 4 fields required):
```
## Blocked by Max

**human_dependency**: [exact human action needed]

**why_ai_cannot_proceed**: [why AI cannot complete this step]

**alternatives_attempted**: [what AI tried automatically and why each path failed AC]

**direct_question_for_max**: [yes/no question or specific decision needed]
```

Example:
```
## Blocked by Max

**human_dependency**: Merge PR #284 to production

**why_ai_cannot_proceed**: Only Max can approve and merge PRs to main branch

**alternatives_attempted**: Opened PR, attached proof pack, reran checks, prepared rollback notes; merge action still requires human repo authority

**direct_question_for_max**: Should I proceed with the QA verification after you merge?
```

### Hard Rules (Non-Negotiable)

These rules come from real production incidents (2026-02-25, 2026-03-10, 2026-03-11):

1. **NEVER modify own cron job**
   - Incident: 2026-02-25, agent rewrote kanban:sweep payload, breaking all autonomous dispatch
   - Guardrail: agents are workers, not cron managers
   - If cron needs changes, move ticket to **Blocked by Max** with exact change needed

2. **NEVER merge PRs**
   - Agents open PRs, humans merge
   - No exceptions, ever
   - If PR is ready to merge, move to **Blocked by Max** with merge request

3. **NEVER re-dispatch active tickets**
   - Incident: 2026-03-10 dispatch loop, same tickets dispatched repeatedly
   - Dispatcher handles deduplication via session map (`kanban-ticket-sessions.json`)
   - If ticket is locked, skip it (dispatcher will retry next cycle)

4. **NEVER output repeated status chatter without delta**
   - State/checklist updates with no new artifacts or evidence = zero credit
   - Wastes context and confuses Max
   - Only post Linear comments when there is concrete progress

5. **Dispatcher-only parent**
   - The sweep parent session only dispatches
   - It reads dispatcher output, spawns workers, exits
   - It does NOT implement ticket work itself
   - It does NOT loop or poll for completion

6. **Linear-first gate (mandatory before any implementation)**
   - No implementation starts without a Linear ticket that is pickup-ready (state: Todo or In Progress with Inputs + Deliverables defined)
   - If no ticket exists for the requested work: create it, set state to Todo, add Inputs/Deliverables/Verification/Artifacts — then begin
   - Fail-closed: if ticket is in Backlog (missing contract sections), fix the ticket first; do NOT start implementation
   - This gate applies to ALL workers (sub-agents, cron, interactive sessions)

### Sharding + Concurrency Contract

For high-volume dispatch without duplicate ticket ownership:

```bash
# Production pattern (two parallel sweeps):
# Sweep-A: shard 0/2, max-spawn 5
# Sweep-B: shard 1/2, max-spawn 5
# Effective: ~10 concurrent ticket workers
```

Use deterministic shard routing in dispatcher:
- `--shard-index <i> --shard-count <n>`
- Dispatcher hashes ticket ID to shard, ensuring no duplicate ownership

---

## Mode B — Multi-Step Orchestration (Interactive/Manual)

Use when request spans multiple independent tracks or requires decomposition.

### When to Use Mode B

- Complex tickets requiring decomposition into sub-tasks
- Tickets spanning multiple agents (e.g., design + implementation + content)
- Manual orchestration requests (not cron-driven)
- Tickets with sequential dependencies (upstream → downstream)

### Flow

1. **Enforce kanban contract** on driving ticket:
   - Verify `Inputs`, `Deliverables`, `Verification`, `Artifacts` sections exist
   - If missing, move to Backlog with comment explaining what's needed

2. **Decompose** into discrete sub-tasks:
   - Create Linear sub-issues for each independent track
   - Each sub-issue gets its own kanban contract (Inputs, Deliverables, Verification, Artifacts)
   - Link upstream Artifacts as downstream Inputs

3. **Delegate** via focused sub-agents in parallel:
   - Spawn one agent per sub-task
   - Use `model-router` skill to select optimal model for each task
   - Use `swarm` skill for parallel execution if >3 sub-tasks

4. **Require evidence-first handoffs**:
   - Each sub-task must produce artifacts before orchestrator synthesizes
   - Downstream tasks read upstream Artifacts as Inputs
   - No implicit handoff — if artifact is not linked, it does not exist

5. **Synthesize output** and write back state transitions:
   - Collect all sub-task artifacts
   - Update parent ticket Artifacts with all links
   - Move parent ticket to Done only when all sub-tasks are Done

### Deliverable Standards

- Every sub-task must return inspectable artifacts
- State transitions must include rationale + proof
- `Done` is fail-closed: no proof, no completion
- Parent ticket Done gate: all sub-tasks Done + all Artifacts linked

---

## Ticket Contract (Kanban Template)

Every ticket description MUST include these sections (in this order):

```markdown
## Inputs
- [links, attachments, prior tickets, repo paths]

## Deliverables
- [ ] [artifact list with identifiers]

## Verification
- [ ] AC-1: [acceptance criterion]
  - Proof required: [screenshot | command output | test report | URL/permalink | PR diff]
- [ ] AC-2: [acceptance criterion]
  - Proof required: [...]

## Artifacts
- [final URLs, permalinks, PR links, file paths]
```

### Artifact ID Formats

Use stable IDs so other agents can refer to the same thing:
- **PRs**: `PR: https://github.com/...`
- **Deployments/pages**: `URL: https://...`
- **Content**: `IG: https://instagram.com/...` / `ML: https://dashboard.mailerlite.com/...`
- **Files**: `<repo-path>` or `Drive: https://drive.google.com/...`

### State Rules

- **Backlog** — not pickup-ready (missing contract sections or not prioritized)
- **Todo** — pickup-ready (Inputs defined, Deliverables specified)
- **In Progress** — agent actively executing (session label `ticket-<ID>` set)
- **Code Review** — PR open, awaiting human review/merge
- **QA** — post-merge validation, regression checks
- **In Review** — non-code artifact review or evidence pending
- **Blocked by Max** — explicit human dependency (structured payload required)
- **Done** — all Verification checks passed, all Artifacts linked

### Transition Rules

- **PR opened** → Code Review
- **Human merges PR** → QA
- **QA passed + Artifacts complete** → Done
- **Human-only step remaining** → Blocked by Max (with exact unblock instruction)
- **Evidence complete (no PR)** → Done

### Collaboration Protocol

- **Upstream work** always ends by updating **Artifacts** with links
- **Downstream work** always starts by reading **Inputs** and **Artifacts**
- No implicit handoff — if artifact is not linked, it does not exist
- Upstream tickets link their Artifacts as downstream Inputs

---

## State Machine (8 States)

```
Backlog
  ↓
Todo
  ↓
In Progress ──→ Code Review ──→ QA ──→ Done
  ↓
In Review ──────────────────────↑
  ↓
Blocked by Max (explicit human dependency)
```

**All 8 states:**

1. **Backlog** — not pickup-ready (missing contract sections or not prioritized)
2. **Todo** — pickup-ready (Inputs defined, Deliverables specified)
3. **In Progress** — agent actively executing (session label `ticket-<ID>` set)
4. **Code Review** — PR open, awaiting human review/merge
5. **QA** — post-merge validation, regression checks
6. **In Review** — non-code artifact review or evidence pending
7. **Blocked by Max** — explicit human dependency (structured payload required)
8. **Done** — all Verification checks passed, all Artifacts linked

**Dispatcher pickup priority:** Code Review → QA → In Review → In Progress (orphaned) → Todo → Backlog

**"Orphaned In Progress"** = ticket has In Progress state but no active session with `ticket-<ID>` label in session map. Dispatcher re-picks it up.

---

## Operational Hard Rules

(From real production incidents — non-negotiable)

### Rule 1: NEVER modify own cron job

**Incident:** 2026-02-25, agent rewrote kanban:sweep payload, breaking all autonomous dispatch

**Why:** Agents are workers, not cron managers. Cron jobs are the orchestration backbone.

**What to do instead:** If cron needs changes, move ticket to **Blocked by Max** with exact change needed.

### Rule 2: NEVER merge PRs

**Incident:** Multiple incidents where agents attempted to merge their own PRs

**Why:** Only humans can approve and merge code. Agents open PRs, humans merge.

**What to do instead:** If PR is ready to merge, move to **Blocked by Max** with merge request.

### Rule 3: NEVER re-dispatch active tickets

**Incident:** 2026-03-10 dispatch loop, same tickets dispatched repeatedly causing duplicate work and token waste

**Why:** Dispatcher handles deduplication via session map. Re-dispatch breaks the contract.

**What to do instead:** If ticket is locked, skip it. Dispatcher will retry next cycle.

### Rule 4: NEVER output repeated status chatter without delta

**Incident:** 2026-03-11, agents posting status comments with no new artifacts or evidence

**Why:** Wastes context and confuses Max. Only meaningful updates count.

**What to do instead:** Only post Linear comments when there is concrete progress (new artifact, new evidence, state change).

### Rule 5: Dispatcher-only parent

**Incident:** 2026-03-10, parent sweep session attempted to implement ticket work

**Why:** Parent sweep must stay minimal and fast. Workers handle implementation.

**What to do instead:** Parent reads dispatcher output, spawns workers, exits. No polling loops.

---

## Tool Reference Map

(Do not embed — reference only)

### Dispatcher & State Planning

- **`tools/kanban-dispatch-fast.py`** (361 lines)
  - Production dispatcher
  - Args: `--cache`, `--max-spawn`, `--include-review`, `--shard-index`, `--shard-count`
  - Reads Linear, computes dispatch plan, outputs JSON schema
  - Handles stale lock detection, cooldown gating, session dedup

- **`tools/kanban-sweep-state.py`** (293 lines)
  - State planner called by dispatcher
  - Computes pickup priority, validates contract sections
  - Returns actionable ticket list

### Linear Integration

- **`tools/linear.py`**
  - Linear API wrapper
  - Commands: `issues`, `create`, `update`, `comment`, `search`
  - Used by dispatcher and workers for ticket operations

### State Files

- **`state/kanban-dispatch-policy.json`**
  - Tracks dispatchedAt, lastState, sameStateStreak, suppressUntil per ticket
  - Used for cooldown gating and no-op suppression

- **`state/kanban-ticket-sessions.json`**
  - Maps ticket ID → session key
  - Used for dedup and orphaned ticket detection

- **`state/kanban-sweep.sig.json`**
  - Dedup signature for sweep runs
  - Prevents re-dispatch of same tickets in same cycle

### Related Skills

- **`model-router`** — Select optimal model for any task (complexity, cost, provider)
- **`swarm`** — Parallel task execution using Gemini Flash workers (200x cheaper than Opus)

---

## Symphony Patterns (Future Contracts)

Document what agents should do — NOT code implementations.

### Continuation Protocol

Dispatcher already adds `resumeSessionKey` to spawn items for long-running work.

**Activation:** Change cron payload `cleanup='delete'` → `cleanup='keep'`. On continuation turns, agent skips re-reading already-read files and resumes from last checkpoint.

**Use case:** Tickets requiring >6 hours of work can be resumed across multiple cron cycles without losing context.

### Lifecycle Hooks (What Agents MUST Do)

**`on_pickup`:**
- **Linear-first check**: confirm a Linear ticket exists and is pickup-ready (has Inputs, Deliverables, Verification, Artifacts). If not, stop and fix the ticket contract before executing any implementation.
- Validate contract sections exist (Inputs, Deliverables, Verification, Artifacts)
- Set session label `ticket-<ID>`
- Read AGENTS.md for workspace rules

**`before_execute`:**
- Checkout isolated branch `feat/<ticket-id>-<slug>` (or `fix/...`, `chore/...`)
- Verify workspace clean (no uncommitted changes)

**`after_execute`:**
- Run all Verification section checks
- Capture output as evidence (screenshots, command output, test logs)

**`on_verify`:**
- Post proof pack in Linear comment (commands + outputs + screenshots)
- Include all 5 proof pack elements

**`on_done`:**
- Post final proof pack
- Update ticket state to Done
- Never self-transition without evidence

### Reconciliation

**ACTIVE_RUN_STALE_SECONDS=1800** (30 minutes)

Sessions older than 30 minutes → cleanup[] array → dispatcher sends kill signals before spawning new workers.

**Stale lock detection:**
- Dispatcher checks `/data/.clawdbot/subagents/runs.json` for `endedAt=null` entries
- If session is older than 30 min, mark as stale
- Kill stale sessions before spawning new workers

### Model Routing

Load `model-router` skill for dispatch decisions. Never embed model selection logic in this skill.

**Example:**
```
Load model-router skill
→ Ask: "What model for a 2-hour code implementation ticket?"
→ Get: "anthropic/claude-opus-4-6 (primary), anthropic/claude-sonnet-4-5 (fallback)"
→ Spawn worker with selected model
```

### Parallel Execution

Use `swarm` skill for >3 independent sub-tasks.

**Example:**
```
Decompose ticket into 5 sub-tasks
→ Load swarm skill
→ Spawn 5 workers in parallel
→ Collect results
→ Synthesize output
```

---

## Output Contract

**For Mode A (kanban:sweep):**
- Dispatch list (spawn candidates)
- Cleanup list (stale sessions)
- Throttled list (cooldown-gated tickets)
- Exit immediately (no polling)

**For Mode B (multi-step orchestration):**
- Task plan (decomposed sub-tasks)
- Sub-agent payloads (if delegated)
- Consolidated summary with links/proof
- Explicit next state decision per ticket

---

## Quick Reference

| Concern | Answer |
|---------|--------|
| **When to use this skill?** | Processing Linear tickets, running sweep dispatch, orchestrating multi-step work |
| **What replaces?** | kanban, kanban-contract, old orchestrator/SKILL.md |
| **What's the proof pack?** | 5 elements: PR URL, evidence log, artifact logs, canonical link, Drive folder |
| **What's fail-closed?** | Done gate: no proof, no completion |
| **What's the hard rule?** | NEVER modify cron, NEVER merge PRs, NEVER re-dispatch, NEVER spam status, dispatcher-only parent, Linear-first gate (ticket required before implementation) |
| **What's the state machine?** | 8 states: Backlog → Todo → In Progress → Code Review → QA → In Review → Blocked by Max → Done |
| **What's the pickup priority?** | Code Review → QA → In Review → In Progress (orphaned) → Todo → Backlog |
| **What's the ticket contract?** | Inputs, Deliverables, Verification, Artifacts (all required) |
| **What's the collaboration protocol?** | Upstream links Artifacts, downstream reads Artifacts as Inputs |
| **What's the continuation protocol?** | Dispatcher adds resumeSessionKey, agent resumes from checkpoint on next cycle |
| **What's the reconciliation rule?** | ACTIVE_RUN_STALE_SECONDS=1800, kill stale sessions before spawning |

---

## Related Documentation

- `skills/orchestrator/SKILL.md` — Unified orchestrator contract (this file)
- `skills/orchestrator/WORKFLOW.md` — Full ticket lifecycle (pickup → Done)
- `skills/orchestrator/references/state-machine.md` — State machine details
- `skills/orchestrator/references/architecture.md` — Architecture overview
- `skills/orchestrator/references/runtime-model.md` — Runtime loop model
- `skills/orchestrator/references/guardrails.md` — Guardrails summary
- `skills/orchestrator/references/symphony-patterns.md` — OpenClaw vs Symphony comparison
- `memory/2026-03-11.md` — Recent orchestrator migration notes
- `memory/2026-03-10.md` — Dispatch loop incident analysis
- `memory/2026-02-25.md` — Cron self-modification incident + fixes
