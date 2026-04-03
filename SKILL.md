---
name: orchestrator
version: "1.0.0"
description: "Skill-first orchestration framework. Dispatch agents, verify deliverables, improve with every cycle."
argument-hint: 'orchestrator sweep, orchestrator status, orchestrator review'
allowed-tools: Bash, Read, Write, AskUserQuestion, WebSearch
homepage: https://github.com/maxtechera/orchestrator
repository: https://github.com/maxtechera/orchestrator
author: maxtechera
license: MIT
user-invocable: true
triggers:
  - orchestrator
  - sweep board
  - process tickets
  - dispatch agents
  - verify deliverables
metadata:
  openclaw:
    emoji: "🎯"
    requires:
      env:
        - LINEAR_API_KEY
      optionalEnv:
        - SHOPIFY_ACCESS_TOKEN
        - MAILERLITE_API_KEY
        - INSTAGRAM_ACCESS_TOKEN
        - META_ADS_TOKEN
        - APOLLO_API_KEY
        - HUBSPOT_API_KEY
        - GA4_PROPERTY_ID
        - GH_TOKEN
        - STRIPE_SECRET_KEY
      bins:
        - python3
    primaryEnv: LINEAR_API_KEY
    tags:
      - orchestration
      - dispatch
      - verification
      - multi-domain
      - autonomous
      - skill-first
      - self-improving
---

# The Orchestrator

Manage work, not agents. Dispatch agents, verify every deliverable independently, improve with every cycle.

> Full vision and depth: [docs/VISION.md](docs/VISION.md)

## Commands

```
/orchestrator sweep     Process all actionable tickets on your board
/orchestrator status    Show current ticket states and verification results
/orchestrator review    Show tickets awaiting your review (pre-verified)
```

## How It Works

1. Read the board — identify tickets in actionable states
2. Prioritize — tickets closest to done come first (Review before Todo)
3. For each ticket:
   - Validate the ticket contract (Inputs, Deliverables, Verification, Artifacts)
   - Match to an installed domain skill (or use base agent capabilities)
   - Confirm required integrations are connected
   - Dispatch a worker agent with the skill loaded
4. Worker executes independently
5. Separate verification step runs (fresh context, zero knowledge of how work was done)
6. Verification report posted to ticket with evidence
7. Ticket moves to Done (pass), Review (needs human), or retries (failed check)

## The Ticket Contract

Every ticket has four required sections:

- **Inputs** — what the agent needs to start
- **Deliverables** — what "done" looks like, concretely
- **Verification** — how to confirm the work is correct
- **Artifacts** — proof that the work exists in the real world

Missing any section → ticket rejected to Backlog with a comment explaining what's needed.

## Verification

The agent that did the work never grades its own homework.

**Automated data checks:** real API calls, exact-match assertions, link validation, test suites. Strong and reliable.

**AI quality checks:** brand voice, content quality, visual inspection. Separate agent, fresh context, no bias. Better than self-checking, but not infallible.

The system moves checks from AI judgment to automated over time. Every check that CAN be automated BECOMES automated.

## Self-Improving

Every failure becomes a rule:

1. **Skill refinement** — repeated failures trigger proposed patches (you approve/reject)
2. **Verification hardening** — missed checks get added to domain verification
3. **Rule accumulation** — operational rules across all skills, version-controlled

## Failure Handling

- Nothing ships without passing verification
- Blocked tickets include a structured reason
- Destructive actions require approval rules you configure once
- Partial failures are caught and flagged
- System crash → tickets stay in last known state, next sweep picks up

## Domain Skills

Domain skills are separate plugins that give agents expertise:

| Skill | Plugin |
|-------|--------|
| Content production | `maxtechera/skill-content` |
| E-commerce operations | `maxtechera/skill-ecommerce` |
| SEO | `maxtechera/skill-seo` |
| Sales outreach | `maxtechera/skill-sales-outreach` |
| Financial reporting | `maxtechera/skill-finance` |
| Growth / paid acquisition | `maxtechera/skill-growth` |
| Go-to-market launches | `maxtechera/skill-gtm` |
| Engineering | Built-in (agent default) |

## Configuration

```
~/.config/orchestrator/.env       # API keys and credentials
~/.orchestrator/skills/           # Installed domain skill files
~/.orchestrator/rules/            # Accumulated operational rules
```

## Runtime Principles

- Your ticket board is the single source of truth
- The executor and the verifier are always different
- Done is fail-closed: no evidence, no completion
- Finishing beats starting
- You define the boundaries. The system operates inside them.
