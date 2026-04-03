# The Orchestrator

**Manage work, not agents.**

### Claude Code (recommended)
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

The skill-first orchestration framework that turns your ticket board into an autonomous workforce. `/orchestrator` reads your board, dispatches agents loaded with domain-specific skills, independently verifies every deliverable, and improves with every cycle. Content, e-commerce, engineering, marketing, finance, sales, support — one system, every deliverable checked before it ships.

**The agent that did the work never grades its own homework.** Verification is hybrid: automated data checks (real API calls, exact-match assertions) plus AI judgment (brand voice, content quality, visual inspection). Nothing ships without proof.

**The tradeoff:** The orchestrator runs a full dispatch → execute → verify cycle. Depending on ticket complexity and how many are queued, a sweep takes 5-30 minutes. We think verified output is worth the wait, but simple one-off tasks may be faster done directly.

**Best for:** operators running AI agents across multiple domains who are tired of being the QA department.

## Installation

### Claude Code Plugin (recommended)
```
/install marketplace maxtechera/orchestrator
```

### OpenClaw
```
plugin install maxtechera/orchestrator
```

### Manual Install
```bash
git clone https://github.com/maxtechera/orchestrator.git ~/.claude/skills/orchestrator
```

That's it. Run `/orchestrator sweep` to start. The setup wizard walks you through connecting your board and adding domain skills.

---

## Setup: Progressive Integration Unlocking

Start using `/orchestrator` immediately. Add integrations when you want more domains.

### 1. Zero Config — Just install

Install the skill and run `/orchestrator sweep`. The orchestrator works with whatever board your agent can already access. No API keys needed to start.

### 2. Connect Your Board

For reliable, persistent board access:

```bash
# Add to ~/.config/orchestrator/.env
LINEAR_API_KEY=lin_api_xxxxx
```

### 3. Add Domain Skills (RECOMMENDED)

Domain skills give agents expertise. Without them, agents use built-in capabilities. With them, they follow domain-specific rules, verification criteria, and best practices learned from real executions.

```
/install marketplace maxtechera/skill-content
/install marketplace maxtechera/skill-ecommerce
/install marketplace maxtechera/skill-seo
```

### 4. Connect Integrations

Each domain skill lists the integrations it needs. Add API keys to `~/.config/orchestrator/.env`:

```bash
# E-commerce
SHOPIFY_ACCESS_TOKEN=shpat_xxxxx

# Marketing
MAILERLITE_API_KEY=xxxxx

# Sales
APOLLO_API_KEY=xxxxx

# Growth
META_ADS_TOKEN=xxxxx

# Analytics
GA4_PROPERTY_ID=xxxxx
```

The orchestrator validates every connection before dispatching. Missing integrations fail early with a clear message.

---

### Do I need API keys?

| Integration | Free? | Required? | Notes |
|-------------|-------|-----------|-------|
| Linear | Free tier | Recommended | Primary board. Or use GitHub/Notion. |
| Shopify | Paid | For e-commerce skill | Product pages, pricing, inventory |
| MailerLite | Free tier | For content/newsletter | Email sequences, newsletters |
| Instagram | Free (Graph API) | For content skill | Post publishing, carousels |
| Meta Ads | Paid | For growth skill | Campaign management |
| Google Ads | Paid | For growth skill | Campaign management |
| Apollo | Free tier | For sales skill | Lead sourcing, outreach |
| HubSpot | Free tier | For sales skill | CRM, pipeline |
| GA4 | Free | For growth skill | Analytics, conversions |
| Stripe | Paid | For finance skill | Payment verification |
| QuickBooks | Paid | For finance skill | Invoicing, AR |
| Zendesk | Paid | For support skill | Ticket management |
| MercadoLibre | Free | For e-commerce (LATAM) | Marketplace listings |

*All credentials stored in `~/.config/orchestrator/.env`. The orchestrator validates connections before dispatch — missing credentials fail early, not midway through execution.*

---

### Config file locations

```
~/.config/orchestrator/.env       # API keys and credentials
~/.orchestrator/skills/           # Installed domain skill files
~/.orchestrator/rules/            # Accumulated operational rules (grow automatically)
~/.orchestrator/history/          # Outcome logs for self-improvement
```

---

## Usage

```
/orchestrator sweep     Process all actionable tickets on your board
/orchestrator status    Show current ticket states and verification results
/orchestrator review    Show tickets awaiting your review (pre-verified)
```

On OpenClaw, the orchestrator also runs on cron — dispatching agents automatically every 15 minutes.

---

## Available Domain Skills

| Skill | What it does | Plugin |
|-------|-------------|--------|
| content | Reels, carousels, blog posts, newsletters, stories | `maxtechera/skill-content` |
| ecommerce | Product pages, pricing, inventory, cross-sell | `maxtechera/skill-ecommerce` |
| seo | Blog posts, sitemaps, meta tags, structured data | `maxtechera/skill-seo` |
| sales-outreach | Cold email sequences, lead sourcing, CRM | `maxtechera/skill-sales-outreach` |
| finance | Invoicing, AR, KPI scorecards | `maxtechera/skill-finance` |
| growth | Ad campaigns, referral loops, social proof | `maxtechera/skill-growth` |
| go-to-market | Coordinated product launches | `maxtechera/skill-gtm` |
| engineering | Features, bug fixes, infrastructure | Built-in (agent default) |

---

## How It Works

Three steps, every cycle:

1. **Dispatch** — reads the board, prioritizes by proximity to done, matches each ticket to an installed domain skill, validates integrations, dispatches a worker agent
2. **Verify** — after the worker delivers, a separate verification step runs with fresh context and zero knowledge of how the work was done. Automated data checks (API assertions, link validation, test suites) plus AI judgment for subjective criteria (brand voice, content quality)
3. **Proof** — verification report posted to the ticket with evidence (screenshots, API responses, test results). PASS moves to Done. PARTIAL moves to Review. FAIL retries or escalates.

**Finishing beats starting** — tickets closest to done get dispatched first (Review before Todo, Todo before Backlog).

**The ticket contract** — every ticket has four sections: Inputs, Deliverables, Verification, Artifacts. Missing any section → rejected to Backlog. [Full spec in docs/VISION.md](docs/VISION.md).

**Self-improving** — every failure becomes a rule. Skills evolve, verification hardens, rules accumulate. All version-controlled. You approve every change.

**Fail visible** — nothing publishes without passing verification. Blocked tickets include a structured reason. Partial failures are caught. The system fails visibly, not silently.

---

## What This Repo Contains

```
orchestrator/
  SKILL.md             # Core orchestrator skill — the agent reads this
  WORKFLOW.md          # Ticket lifecycle (intake → execute → verify → done)
  docs/
    VISION.md          # North star vision document (full deck)
    STATE_MACHINE.md   # Ticket state transitions
  skills/              # Domain skill directory (plugins installed here)
  examples/            # Example tickets
```

## Runtime Principles

- Your ticket board is the single source of truth
- The executor and the verifier are always different
- `Done` is fail-closed: no evidence, no completion
- The system fails visibly, not silently
- Finishing beats starting
- You define the boundaries. The system operates inside them.

## Vision

Read the full north star document: [`docs/VISION.md`](docs/VISION.md)

**One board. Any domain. Verified output. The operator's leverage finally scales.**

## License

MIT
