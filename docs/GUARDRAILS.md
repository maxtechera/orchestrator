# Guardrails

Hard rules enforced by incidents and operational experience.

## HARD RULES

### NEVER modify own cron job
**Incident**: 2026-02-25 — Agent rewrote `kanban:sweep` cron payload using the `cron` tool

- Root cause: Delivery mode was `none`, causing announce failures → agent got confused and tried to "fix" the cron
- Fix: Delivery now routes to neo-events; skill has explicit guardrail
- **Enforcement**: Skill explicitly forbids cron modification; agents must ask Max if cron needs changes

### NEVER merge PRs
**Incident**: Multiple — Agents attempted to merge their own PRs

- **Rule**: Agents open PRs, humans merge
- **Why**: Merge is an irreversible gate; only humans can approve
- **Enforcement**: Agents must move ticket to Code Review and wait for Max

### NEVER re-dispatch active tickets
**Incident**: 2026-03-10 — Dispatch loop caused duplicate work on same tickets

- Root cause: Dispatcher re-dispatched tickets already in flight, causing comment spam and duplicate work
- Fix: Session map prevents re-dispatch; orphaned detection uses 1800s stale threshold
- **Enforcement**: Check session map before dispatch; only re-dispatch if `lastActivity > ACTIVE_RUN_STALE_SECONDS`

### NEVER output repeated status without delta
**Incident**: Multiple — Status comments with zero new information

- **Rule**: Zero credit for state transition alone; zero credit for checklist tick alone
- **Why**: Wastes context, confuses humans, pollutes Linear
- **Enforcement**: Only comment if state changed OR new evidence added

### NEVER change dispatcher tool paths/args from inside cron payloads
**Incident**: Potential — Agents could rewrite dispatcher invocation

- **Rule**: Dispatcher paths and arguments are immutable during cron execution
- **Why**: Changing dispatcher behavior mid-run breaks orchestration contract
- **Enforcement**: Skill forbids tool path/arg modification; agents must ask Max

### NEVER change cron payloads from within sweep worker sessions
**Incident**: 2026-02-25 — Agent used `cron` tool to rewrite its own cron

- **Rule**: Worker sessions cannot modify cron jobs
- **Why**: Cron is the orchestration backbone; changes must be deliberate and reviewed
- **Enforcement**: Skill forbids cron modification; agents must ask Max

## Proof Enforcement

- **State transition alone = zero credit**: Moving ticket to Done without evidence = no completion
- **Checklist tick alone = zero credit**: Checking a box without proof = no completion
- **Evidence required**: PR merged, artifacts linked, verification passed

## Blocked by Max Mandatory

When moving ticket to **Blocked by Max** state, MUST include:

1. **human_dependency**: What Max must do (e.g., "Merge PR", "Approve design", "Make pricing decision")
2. **why_ai_cannot_proceed**: Why agent is stuck (e.g., "Requires human judgment", "Needs Max approval", "Blocked on external decision")
3. **direct_question_for_max**: Specific question or decision needed (e.g., "Should we use Stripe or Paddle?", "Approve this copy?")

**Example**:
```
Blocked by Max

human_dependency: Merge PR #123
why_ai_cannot_proceed: Only humans can merge PRs; CI passing, code reviewed
direct_question_for_max: Ready to merge?
```

## Git Rules

- **Isolated branch per ticket**: Every ticket = dedicated git worktree + branch
- **Worktree pattern**: `git worktree add ../wt-<ticket-id>-<slug> -b feat/<ticket-id>-<slug>`
- **Never commit to main/master**: All work goes to feature branches
- **PR before merge**: Create branch, push, open PR, then merge (no direct commits to main)
- **Sub-agents follow same rules**: Instruct them to use isolated worktrees

## Session Rules

- **NEVER delete/nuke sessions**: Archive/compact only (Max explicit, Feb 16)
- **NEVER restart gateway with active sessions**: Kills runs + corrupts state (Max explicit, Feb 18)
- **Compaction**: Always write summary to `memory/YYYY-MM-DD.md` on flush (Max explicit, Feb 18)
- **Session cleanup**: `cleanup='keep'` for continuation; `cleanup='delete'` for short-lived workers

## Incident Reference

| Date | Incident | Root Cause | Fix |
|------|----------|-----------|-----|
| 2026-02-25 | Cron self-modification | Delivery mode `none` → agent confused | Delivery to neo-events; guardrail added |
| 2026-02-25 | Session accumulation | `cleanup='keep'` sessions never pruned | Sweep compacts before spawning |
| 2026-02-25 | Lane contention | Cron session holding dispatcher lane | Reduce cron timeout to 60s |
| 2026-03-10 | Re-dispatch loop | Dispatcher re-dispatched active tickets | Session map + 1800s stale threshold |
| 2026-03-10 | Timeout churn | Cron execution exceeded 180s cap | Fast-dispatch rewrite; 60s timeout |

## Additional Guardrails from GUARDRAILS.md

- Never merge agent-created PRs
- Never mark Done without evidence
- Never bypass human gates on risky/irreversible actions
- Never mutate cron/jobs from execution tickets unless ticket explicitly scopes it
