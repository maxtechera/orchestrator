# Orchestrator (OpenClaw-style)

Public, runtime-aligned orchestration kit for Linear-driven agent workflows.

> Goal: ship work through a strict kanban contract (`Inputs → Deliverables → Verification → Artifacts`) with sub-agent delegation and explicit human gates.

## Quickstart

```bash
git clone https://github.com/maxtechera/orchestrator.git
cd orchestrator
cp .env.example .env

# Lint docs + contract examples
rg -q '^## Inputs$' examples/minimal_workflow.md && \
rg -q '^## Deliverables$' examples/minimal_workflow.md && \
rg -q '^## Verification$' examples/minimal_workflow.md && \
rg -q '^## Artifacts$' examples/minimal_workflow.md

# Review sample sweep plan
cat examples/sweep_run.md
```

## What this repo contains

- `WORKFLOW.md` — end-to-end lifecycle (pickup → execution → review/qa)
- `docs/` — architecture, runtime model, guardrails, state machine, Linear contract
- `skills/` — redistributable skill contracts/stubs mapped to runtime behaviors
- `examples/` — minimal sweep + supervisor loop examples
- `.github/workflows/` — docs and contract lint CI

## Runtime principles

- Linear is source of truth for ticket state.
- Agents can implement and open PRs, but cannot merge.
- `Done` is fail-closed: no evidence, no completion.
- If only human decision/merge remains, move ticket to **Blocked by Max** with exact unblock instruction.

## Reference runtime docs

This OSS package mirrors behavior from private runtime docs and skills:

- `docs/KANBAN_CONTRACT.md`
- `skills/kanban/`
- `skills/orchestrator/`
- `skills/ship-engine-supervisor/`
- `skills/content-engine-supervisor/`
- `skills/linear/`
- `skills/model-router/`
