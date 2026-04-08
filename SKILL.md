---
name: orchestrator
version: "1.0.0"
description: "Skill-first orchestration framework. Dispatch agents, verify deliverables, improve with every cycle."
argument-hint: 'orchestrator sweep, orchestrator status, orchestrator review, orchestrator setup'
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, Agent, AskUserQuestion, WebSearch
homepage: https://github.com/maxtechera/orchestrator
repository: https://github.com/maxtechera/orchestrator
author: maxtechera
license: MIT
user-invocable: true
triggers:
  - orchestrator
  - orchestrator sweep
  - orchestrator setup
  - sweep board
  - process tickets
metadata:
  openclaw:
    emoji: "🎯"
    optionalEnv:
      - BOARD_PROVIDER
      - LINEAR_API_KEY
      - GH_TOKEN
      - NOTION_API_KEY
      - JIRA_API_TOKEN
      - SHOPIFY_ACCESS_TOKEN
      - MAILERLITE_API_KEY
      - INSTAGRAM_ACCESS_TOKEN
      - META_ADS_TOKEN
      - GOOGLE_ADS_TOKEN
      - APOLLO_API_KEY
      - HUBSPOT_API_KEY
      - GA4_PROPERTY_ID
      - STRIPE_SECRET_KEY
      - QUICKBOOKS_TOKEN
      - ZENDESK_TOKEN
      - MERCADOLIBRE_TOKEN
      - XERO_TOKEN
      - DEFAULT_MODEL
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
/orchestrator sweep                            Process all actionable tickets
/orchestrator sweep TICKET-046                 Re-run a single ticket
/orchestrator status                           Show current ticket states and verification results
/orchestrator review                           Show tickets awaiting your review (pre-verified)
/orchestrator approve TICKET-044               Approve → Done
/orchestrator approve TICKET-044 --note "..."  Approve with a note
/orchestrator reject TICKET-044 --note "..."   Reject → back to execution with your feedback
/orchestrator approve-rule "..."               Approve a proposed rule into the skill
/orchestrator reject-rule "..."                Reject a proposed rule
/orchestrator rules --pending                  List proposed rules awaiting approval
/orchestrator flag TICKET-XXX "description"    Report a verification false negative
/orchestrator setup                            Connect your board and validate integrations
/orchestrator stats                            Show this week's pass/fail rate, ticket count, cost
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
7. Ticket moves to Done (pass), Review (needs human), or retries with failure context (failed check)

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
- Failed verification triggers auto-retry with failure context; if retry fails, escalates to Review
- System crash → tickets stay in last known state, next sweep picks up

## Board Support

Works with any issue tracker. Run `/orchestrator setup` to connect:

- Linear
- GitHub Issues
- Notion
- Jira

## Core Skills

| Skill | Plugin |
|-------|--------|
| Content production | `maxtechera/skill-content` |
| E-commerce operations | `maxtechera/skill-ecommerce` |
| SEO | `maxtechera/skill-seo` |
| Sales outreach | `maxtechera/skill-sales-outreach` |
| Financial reporting | `maxtechera/skill-finance` |
| Growth | `maxtechera/skill-growth` |
| Go-to-market launches | `maxtechera/skill-gtm` |
| Engineering | Built-in (agent default) |

### Starter Templates

| Skill | Plugin |
|-------|--------|
| Customer support | `maxtechera/skill-support` |
| Paid acquisition | `maxtechera/skill-paid-ads` |
| Brand design | `maxtechera/skill-brand` |
| Research / competitive intel | `maxtechera/skill-research` |

## Configuration

> The orchestrator detects available MCP servers (Linear, GitHub, etc.) and uses them when available. The .env file is a fallback for environments without MCP support.

```
~/.config/orchestrator/.env       # API keys and credentials
~/.orchestrator/skills/           # Installed domain skill files
~/.orchestrator/rules/            # Accumulated operational rules
~/.orchestrator/history/          # Outcome logs for self-improvement
```

## Runtime Principles

- Your ticket board is the single source of truth
- The executor and the verifier are always different
- Done is fail-closed: no evidence, no completion
- The system fails visibly, not silently
- Finishing beats starting
- You define the boundaries. The system operates inside them.
