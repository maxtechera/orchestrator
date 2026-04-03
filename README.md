# The Orchestrator

**Manage work, not agents.**

> **Permissions overview:** Reads your ticket board (Linear, GitHub Issues, Notion) and dispatches agents with domain-specific skills. Connects to external services (Shopify, MailerLite, Instagram, etc.) via user-provided API keys stored in `~/.config/orchestrator/.env`. All credential usage documented in the [Configuration](#configuration) section.

The skill-first orchestration framework that turns your ticket board into an autonomous workforce. Dispatch agents, verify every deliverable independently, and improve with every cycle.

## Installation

**Claude Code (Recommended):**
```
/install marketplace maxtechera/orchestrator
```

**OpenClaw:**
```
plugin install maxtechera/orchestrator
```

**Manual:**
```bash
git clone https://github.com/maxtechera/orchestrator.git ~/.claude/skills/orchestrator
```

## Setup: Progressive Integration Unlocking

### Level 1 — Zero Config (core orchestration)

Install the skill and invoke it. The orchestrator reads your board, identifies actionable tickets, and dispatches agents. Works immediately with any board your agent can already access.

```
/orchestrator sweep
```

### Level 2 — Connect Your Board

For persistent board access, add your tracker API key to `~/.config/orchestrator/.env`:

```bash
# Linear (recommended)
LINEAR_API_KEY=lin_api_xxxxx

# Or GitHub
GH_TOKEN=ghp_xxxxx

# Or Notion
NOTION_API_KEY=ntn_xxxxx
```

### Level 3 — Add Domain Skills

The orchestrator dispatches agents, but domain skills give them expertise. Each domain skill is a separate plugin:

```
/install marketplace maxtechera/skill-content
/install marketplace maxtechera/skill-ecommerce
/install marketplace maxtechera/skill-seo
```

Available domain skills:

| Skill | What it does | Install |
|-------|-------------|---------|
| content | Reels, carousels, blog posts, newsletters | `skill-content` |
| ecommerce | Product pages, pricing, inventory, cross-sell | `skill-ecommerce` |
| seo | Blog posts, sitemaps, meta tags, locale expansion | `skill-seo` |
| sales-outreach | Cold email sequences, lead sourcing, CRM | `skill-sales-outreach` |
| finance | Invoicing, AR, KPI scorecards | `skill-finance` |
| engineering | Features, bug fixes, infrastructure | Built-in (agent default) |
| growth | Ad campaigns, referral loops, social proof | `skill-growth` |
| go-to-market | Full product launches end to end | `skill-gtm` |

### Level 4 — Connect Integrations

Each domain skill lists required integrations. Add API keys to `~/.config/orchestrator/.env`:

```bash
# E-commerce
SHOPIFY_ACCESS_TOKEN=shpat_xxxxx
MERCADOLIBRE_TOKEN=xxxxx

# Marketing
MAILERLITE_API_KEY=xxxxx
MANYCHAT_API_KEY=xxxxx

# Social
INSTAGRAM_ACCESS_TOKEN=xxxxx
META_ADS_TOKEN=xxxxx

# Sales
APOLLO_API_KEY=xxxxx
HUBSPOT_API_KEY=xxxxx

# Analytics
GA4_PROPERTY_ID=xxxxx
```

The orchestrator validates every connection before dispatching agents. If a required integration is missing, the ticket fails early — not halfway through execution.

## Usage

```
/orchestrator sweep              # Process all actionable tickets on your board
/orchestrator status             # Check current ticket states and verification results
/orchestrator review             # Show tickets awaiting human review (pre-verified)
```

On OpenClaw, the orchestrator runs automatically via cron — `kanban:sweep` fires every 15 minutes, dispatching agents without manual invocation.

## What It Does

Three steps, on every cycle:

1. **Dispatch** — reads the board, matches each ticket to the right domain skill, assigns an agent
2. **Verify** — a separate verification step checks every deliverable (API assertions for data, AI judgment for quality). The agent that did the work never grades its own homework.
3. **Proof** — posts verification evidence to the ticket: screenshots, API responses, test results. Nothing ships without proof.

## Example: One Ticket, End to End

You write this ticket on your board:

```
Title: Publish SEO blog post — "5 Shopify CRO Quick Wins"
Inputs: keyword brief, brand voice guide, competitor URLs
Deliverables: blog post published on CMS, meta tags set, internal links added
Verification: page returns 200, word count > 1,500, SEO score green, no brand violations
Artifacts: published URL, screenshot of live page
```

The orchestrator picks it up. An agent loads the SEO skill, writes the post, publishes it. A separate verification step loads the published page, checks the status code, counts words, runs an SEO check, screenshots the result. Posts PASS with evidence to the ticket. Moves it to Done.

Total time: minutes. Total human involvement: zero (unless you configured approval rules for publishing).

## The Ticket Contract

Every ticket — regardless of domain — has four sections:

- **Inputs** — what the agent needs to start
- **Deliverables** — what "done" looks like, concretely
- **Verification** — how to confirm the work is correct (automated checks + quality checks)
- **Artifacts** — proof that the work exists in the real world

If any section is missing, the ticket stays in Backlog. Templates for every domain are included.

## Integrations

| Integration | What it enables | Free? | Required? |
|-------------|----------------|-------|-----------|
| Linear | Board sync, ticket state management | Free tier | Recommended |
| GitHub | Code repos, PR workflow, issues | Free | Optional |
| Shopify | Product pages, pricing, inventory | Paid | For e-commerce |
| MailerLite | Email sequences, newsletters | Free tier | For email marketing |
| Instagram | Post publishing, carousel creation | Free (Graph API) | For content |
| Meta Ads | Campaign management, pixel verification | Paid | For paid acquisition |
| Apollo | Lead sourcing, outreach sequences | Free tier | For sales |
| HubSpot | CRM, deal pipeline | Free tier | For sales |
| GA4 | Analytics, conversion tracking | Free | For growth |
| Stripe | Payment verification | Paid | For finance |
| QuickBooks | Invoicing, AR *(v1.5)* | Paid | For finance |
| Zendesk | Support tickets *(v1.5)* | Paid | For support |

## Core Concepts

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

### Fail Visible

The system is designed to fail visibly, not silently:

- Nothing publishes without passing verification
- Blocked tickets include a reason, not just a status
- Destructive actions require approval rules you configure once
- Partial failures are caught and flagged

## Configuration

```
~/.config/orchestrator/.env      # API keys and integration credentials
~/.orchestrator/skills/          # Domain skill files
~/.orchestrator/rules/           # Accumulated operational rules
```

Config check: the orchestrator validates all required connections on first run and before every dispatch cycle.

## What This Repo Contains

```
orchestrator/
  SKILL.md          # Core orchestrator skill contract
  WORKFLOW.md       # End-to-end lifecycle (pickup → execution → review/qa)
  docs/
    VISION.md       # North star vision document (16 slides)
    ARCHITECTURE.md # System architecture
    GUARDRAILS.md   # Operational guardrails from production incidents
    RUNTIME_MODEL.md
    STATE_MACHINE.md
  skills/           # Domain skill contracts
  examples/         # Minimal sweep + supervisor loop examples
  .github/          # CI workflows
```

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
