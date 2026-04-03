# The Orchestrator

**Manage work, not agents.**

The operating system for AI-augmented business operations. Your agents execute. Verification confirms. You architect the outcomes.

> Install from GitHub or as a Claude Code plugin. Open source. Free.

## What Is the Orchestrator

A system you add to Claude Code, Codex, or any AI tool. It pulls tickets from your board, dispatches agents with domain-specific skills, and runs verification on every deliverable before it ships.

The Orchestrator doesn't replace your tools. It dispatches agents to use them, and verifies the output.

```
Ticket → Agent + Skill → Verification → Done
```

**The agent that did the work never grades its own homework.** Verification is hybrid: automated data checks (real API calls, exact-match assertions) plus AI judgment (brand voice, content quality, visual inspection).

## Quickstart

```bash
git clone https://github.com/maxtechera/orchestrator.git ~/.orchestrator
# Or: claude plugin install orchestrator

# Add domain skills
orchestrator skill add content ecommerce seo

# Sync tickets from your board
orchestrator sync --board linear --project "Q2 Sprint"

# Run the full cycle: dispatch, execute, verify
orchestrator run --tickets todo --parallel 4

# Check status
orchestrator status
```

## What This Repo Contains

- [`docs/VISION.md`](docs/VISION.md) — full vision deck (north star document)
- `SKILL.md` — core orchestrator skill contract
- `WORKFLOW.md` — end-to-end lifecycle (pickup → execution → review/qa)
- `docs/` — architecture, runtime model, guardrails, state machine
- `skills/` — redistributable skill contracts mapped to runtime behaviors
- `examples/` — minimal sweep + supervisor loop examples
- `.github/workflows/` — docs and contract lint CI

## Core Concepts

### The Ticket Contract

Every ticket has four sections. If all four are filled in, any agent with the right skill can execute it end-to-end:

- **Inputs** — what the agent needs to start
- **Deliverables** — what "done" looks like, concretely
- **Verification** — how to confirm the work is correct
- **Artifacts** — proof that the work exists in the real world

### Skills

Skills turn your AI tool into a domain specialist. They're text files that evolve with use:

```yaml
# Skill: Content Production (v3 — refined after 47 tickets)
Domain: content
Integrations: instagram, mailerlite, cms
Rules:
  - Always set social preview image before publishing
  - Carousel images must be 1080x1350
  - Never schedule posts within 4 hours of each other
Verification: screenshot + brand check, link validation, hashtag count
```

Available skills: content production, e-commerce, go-to-market, growth/SEO, finance, engineering, sales outreach, customer support, paid acquisition, brand design, research, vendor management.

### Hybrid Verification

- **Automated data checks** (API calls, test suites, link validation) — strong and reliable
- **AI judgment checks** (brand voice, content quality, visual inspection) — better than self-checking, but not infallible
- The system moves more checks from AI judgment to automated over time
- Every check that CAN be automated BECOMES automated. AI judgment handles what's genuinely subjective.

### Self-Improving

Every failure becomes a rule. The same mistake never happens twice. Three feedback loops:

1. **Skill refinement** — repeated failures with the same root cause trigger a proposed patch
2. **Verification hardening** — missed checks get added to domain verification
3. **Rule accumulation** — operational rules across all skills, version-controlled

## Runtime Principles

- Your ticket board is the single source of truth
- Agents can implement and open PRs, but cannot merge
- `Done` is fail-closed: no evidence, no completion
- The system fails visibly, not silently
- You define the boundaries. The system operates inside them.

## Vision

Read the full north star document: [`docs/VISION.md`](docs/VISION.md)

**One board. Any domain. Verified output. The operator's leverage finally scales.**

## License

MIT
