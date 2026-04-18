# /orchestrator

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](CHANGELOG.md)

**AI teams do not usually fail because they are incapable. They fail because they go idle, pick the wrong next ticket, and declare work finished without proof.**

**/orchestrator is the workflow engine for that gap. It keeps ticketed work moving, routes it to the right domain specialist, and refuses completion until a proof pack exists.**

Claude Code:
```bash
/plugin marketplace add maxtechera/orchestrator
```

OpenClaw:
```bash
clawhub install orchestrator
```

Then run:
```bash
/orchestrator sweep
```

No board connected yet? `/orchestrator` will push you into setup instead of silently failing.

---

## What it solves

Most agent setups break in one of three places:

1. **Idle time**: tickets sit while agents wait for the next instruction.
2. **Wrong execution path**: a content task gets treated like code, or a design task gets verified like research.
3. **No proof**: the agent says "done" but there is no PR, no screenshot, no artifact log, no verification trail.

/orchestrator closes those gaps with a simple contract:

**ticket contract → domain-aware execution → independent verification → proof pack**

That gives you a system for running agents like an operations team, not a chat thread.

---

## Core concepts

### Sweep mode

`/orchestrator sweep` processes actionable tickets from your board in priority order.

It favors tickets closest to done, validates the contract, picks the right skill, dispatches execution, then runs a separate verification pass.

Use sweep mode when you want a reliable default loop for day-to-day throughput.

### Team mode

`/orchestrator team` runs a named multi-agent roster for a sprint or workstream.

Instead of one ticket at a time, it keeps specialists busy in parallel, for example builder, designer, tester, strategist, analyst. No idle gaps, no constant re-spawning.

Use team mode when you have 3+ related tickets and want continuous flow instead of sequential dispatch.

### Proof pack

Nothing is done because an agent says it is done.

A ticket only qualifies for completion when it has a proof pack:

1. Primary artifact link
2. Evidence log with exact commands or run output
3. Build, test, or execution logs
4. Canonical link to where the work lives
5. Verification report

This is the difference between agent output and operational proof.

### Guardrails

The orchestrator is opinionated because the rules were learned from real failures.

It enforces ticket contracts, separates execution from verification, blocks self-grading, and prevents the common failure modes that create loops, fake progress, and silent regressions.

---

## Quick start

### Install

**Claude Code**
```bash
/plugin marketplace add maxtechera/orchestrator
```

**OpenClaw**
```bash
clawhub install orchestrator
```

**Manual**
```bash
git clone https://github.com/maxtechera/orchestrator.git ~/.claude/skills/orchestrator
```

### Run your first sweep

```bash
/orchestrator sweep
```

If your board is not connected yet:

```bash
/orchestrator setup
```

### Minimal ticket contract

```md
## Inputs
Linear brief, repo link, target outcome

## Deliverables
PR with the implementation, screenshots, and attached proof

## Verification
Tests pass, screenshots match, artifact links resolve

## Artifacts
PR URL, screenshots, verification report
```

### Example sweep flow

```text
/orchestrator sweep
→ finds pickup-ready tickets
→ validates Inputs / Deliverables / Verification / Artifacts
→ matches the domain skill
→ dispatches execution
→ runs independent verification
→ posts proof pack
```

---

## Domain-aware execution

/orchestrator is not just a queue runner. It changes how work is executed and verified based on the domain.

| Domain | What gets dispatched | What gets verified |
|---|---|---|
| Code | repo changes, tests, PRs | build, tests, lint, typecheck, manual proof |
| Research | source gathering, synthesis, KB updates | citations, freshness, structure, completeness |
| Content | copy, assets, publishing workflows | brand voice, publication proof, screenshots, links |
| Design | layouts, assets, UI directions | visual proof, accessibility notes, linked files |
| Video | scripts, edits, renders, exports | MP4 output, platform-ready assets, storyboard/script proof |
| Ops | deployments, configs, service actions | logs, health checks, service status, monitoring evidence |

That domain awareness is what keeps verification honest. A video ticket should not be closed like a code ticket, and a content ticket should not pass without publication proof.

---

## The 5 hard rules

These are the memorable part of the system, and they were written after real incidents.

1. **Never re-dispatch an In Progress ticket**  
   Dispatch loops burn time and duplicate effort. *(incident: 2026-03-10)*

2. **Never merge PRs**  
   The orchestrator can prepare the change and the proof, but merge stays human. *(battle-tested across multiple incidents)*

3. **Never modify your own cron job**  
   Self-editing automation creates recovery nightmares. *(incident: 2026-02-25)*

4. **Never post status chatter without a delta**  
   No "working on it" noise. Only artifact, state, or proof changes count. *(incident: 2026-03-11)*

5. **Parent sweep dispatches only, never implements**  
   The orchestrator is the control plane, not the worker. *(incident: 2026-03-10)*

That is the battle-tested angle: the product is not just "AI agents for tickets." It is a set of operating constraints that came from failures, then got encoded so they do not repeat.

---

## How the loop works

1. Read the board
2. Prioritize by proximity to done
3. Validate the ticket contract
4. Match the task to the right domain skill
5. Dispatch execution
6. Run independent verification with fresh context
7. Post proof and move the ticket to the correct next state

Possible outcomes:

- **Done** when proof and verification fully pass
- **Review** when human judgment is required
- **Blocked** when the next move depends on a specific human action

---

## Why teams use it

**For operators:** it keeps the board moving without constant manual triage.

**For leads:** it gives you evidence, not optimism.

**For multi-domain teams:** it routes work to the right playbook instead of pretending every ticket is the same kind of task.

**For anyone burned by "done" with no receipts:** it makes proof the finish line.

---

## Your first ticket

Paste this into a ticket and run `/orchestrator sweep`.

```md
## Inputs
Keyword brief "AI agent verification", brand voice guide, 3 competitor URLs

## Deliverables
Blog post published on CMS, meta tags set, internal links added

## Verification
Page returns 200, word count above 1,500, SEO score green, no brand violations

## Artifacts
Published URL, screenshot of live page, verification report
```

More examples:

- [examples/seo_blog_post.md](examples/seo_blog_post.md)
- [examples/content_carousel.md](examples/content_carousel.md)
- [examples/ecommerce_product_update.md](examples/ecommerce_product_update.md)
- [examples/sales_outreach_sequence.md](examples/sales_outreach_sequence.md)

---

## Install more depth when you need it

`/orchestrator` works on its own, but gets stronger as you add domain skills and integrations.

Typical upgrades:

- Issue tracker: Linear, GitHub Issues, Notion, Jira
- Commerce: Shopify
- Content: MailerLite, Instagram
- Sales: Apollo, HubSpot
- Growth and analytics: Meta Ads, Google Ads, GA4
- Finance and ops: Stripe, QuickBooks, Xero, Zendesk, MercadoLibre

See [skills/README.md](skills/README.md), [WORKFLOW.md](WORKFLOW.md), and [docs/VISION.md](docs/VISION.md) for the deeper model.

---

## The short version

If you want agents that stay busy, respect ticket contracts, and produce proof before they claim victory, use `/orchestrator`.

If you want vibes, use something else.
