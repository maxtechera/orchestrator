# Orchestrator Workflow — Ticket Lifecycle

Complete reference for the ticket journey from pickup to Done.

**Canonical source**: This file. All agents follow this contract.
For the detailed state machine with all transitions, see [docs/STATE_MACHINE.md](docs/STATE_MACHINE.md).

---

## Overview

Every ticket follows a 5-stage lifecycle:

1. **Intake** — validate ticket contract, match domain skill, confirm integrations
2. **Execute** — agent produces deliverables using the loaded skill
3. **Verify** — separate verification step checks output independently
4. **Review** — human reviews pre-verified work (if required)
5. **Done** — proof posted, ticket closed

---

## Stage 1: Intake

**Goal:** Ensure the ticket is ready for autonomous execution.

1. Read the full ticket
2. Validate all four contract sections exist:
   - **Inputs** — everything the agent needs (no guessing, no asking)
   - **Deliverables** — exactly what must be produced
   - **Verification** — how to confirm the work is correct
   - **Artifacts** — where the finished work lives
3. If any section is missing → reject to Backlog with a comment explaining what's needed
4. Match ticket to installed domain skill (content, ecommerce, seo, etc.)
5. If no matching skill → use base agent capabilities
6. Confirm required integrations are connected
7. If integration missing → fail early with clear message

---

## Stage 2: Execute

**Goal:** Produce the deliverables specified in the ticket.

1. Agent loads the matched domain skill
2. Agent reads Inputs and follows skill instructions
3. Agent produces each Deliverable
4. Agent populates the Artifacts section with links/evidence
5. Agent posts a status update: what was done, what was produced

**Rules during execution:**
- Follow all rules in the loaded skill file
- Do not skip verification criteria — even if you think the work is correct
- If blocked → move ticket to Blocked with structured reason (what's needed, what was tried, direct question for human)

---

## Stage 3: Verify

**Goal:** Independently confirm the deliverables match the ticket spec.

**The executor and the verifier are always different.**

1. Verification runs with fresh context — zero knowledge of how the work was done
2. For each verification criterion in the ticket:
   - **Automated checks** where possible (API assertions, link validation, test suites)
   - **AI quality checks** for subjective criteria (brand voice, content quality, visual inspection)
3. Each check produces: PASS or FAIL with specific evidence
4. Verification report posted to ticket

**Verification report format:**
```
## Verification Report — TICKET-XXX

Status: PASS | PARTIAL | FAIL

Checks:
  ✓ [check description] (type — time)
  ✗ [check description] — [specific discrepancy]

Evidence:
  - [attached screenshots, API responses, test results]

Result: [outcome + next action]
```

**On PASS:** proceed to Done
**On PARTIAL:** move to Review for human decision
**On FAIL:** retry with failure context, or escalate if retry fails

---

## Stage 4: Review (if needed)

**Goal:** Human reviews pre-verified work that requires judgment.

Only tickets that require human judgment land here — everything that can be verified automatically already was.

The human sees:
- The deliverable
- The verification report (what passed, what was flagged)
- Evidence (screenshots, API responses)

Human actions: approve → Done | reject → back to Execute | redirect → back to Execute with notes

---

## Stage 5: Done

**Goal:** Close the ticket with proof.

Requirements for Done:
- All Deliverables produced
- All Verification criteria passed (or human-approved)
- All Artifacts linked
- Verification report posted

Done is fail-closed: no evidence, no completion.

---

## Priority Order

Tickets closest to done get dispatched first:

1. **Review** — artifact exists, needs human approval
2. **Verification** — delivered, needs checking
3. **In Progress (stale)** — agent went idle (>30 min), needs fresh worker
4. **Todo** — ready to start, contract complete
5. **Backlog** — not ready, missing contract sections

Finishing beats starting.

---

## Domain Classification

The orchestrator matches tickets to domain skills based on ticket content:

| Domain | Typical deliverables |
|--------|---------------------|
| Content | Blog posts, carousels, reels, newsletters, stories |
| E-commerce | Product pages, pricing updates, collections, cross-sell |
| SEO | Meta tags, sitemaps, structured data, locale pages |
| Sales | Outreach sequences, lead lists, CRM updates |
| Finance | Invoices, expense reports, KPI scorecards |
| Growth | Ad campaigns, referral loops, conversion optimization |
| GTM | Multi-channel launches |
| Engineering | Code changes, infrastructure, monitoring |

If no domain skill is installed for the ticket's domain, the agent uses built-in capabilities.

---

## Failure Handling

- Nothing publishes without passing verification
- Blocked tickets include: what's needed, what was tried, direct question for human
- Destructive actions require configured approval rules
- Partial failures are caught (3 of 5 products updated → flagged)
- System crash → tickets stay in last known state, next sweep picks up
- Every failure becomes a rule in the skill file (proposed, human-approved)

---

## Self-Improving

After every ticket (pass or fail):
1. Log structured outcome (domain, skill, result, time, checks)
2. If repeated failure pattern detected → propose skill patch
3. If verification missed an issue → add check to domain verification
4. All rule changes are version-controlled and human-approved

---

## Runtime Principles

- Your ticket board is the single source of truth
- The executor and the verifier are always different
- Done is fail-closed: no evidence, no completion
- The system fails visibly, not silently
- Finishing beats starting
- You define the boundaries. The system operates inside them.
