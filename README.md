# The Orchestrator

**Manage work, not agents.**
Independent verification for every AI agent deliverable.

Your agents do the work. A separate agent checks it. Nothing ships without proof. Every mistake becomes a rule so it never happens again.

**Best for:** operators running AI agents across multiple domains who are tired of being the QA department.

```
/install marketplace maxtechera/orchestrator
```

---

## What This Does

You write tickets on your board. The orchestrator reads them, dispatches agents loaded with domain-specific skills, and independently verifies every deliverable before marking it done. Content, e-commerce, engineering, marketing, finance, sales — one system, every output checked.

**The agent that did the work never grades its own homework.** A separate agent verifies with fresh context — real API calls to confirm prices are correct, screenshots to prove content is live, link checks, compliance validation. Not just another AI saying "looks good."

**The tradeoff:** A sweep takes 5-30 minutes depending on ticket complexity. A typical 30-ticket sweep costs $2-8 in tokens. Verified output is worth the wait, but simple one-off tasks may be faster done directly.

---

## Get Started

### 1. Install

**Claude Code:**
```
/install marketplace maxtechera/orchestrator
```

**OpenClaw** (multi-agent platform for autonomous workflows):
```
plugin install maxtechera/orchestrator
```

### 2. Connect your board

```
/orchestrator setup
```

The setup wizard walks you through connecting your issue tracker — Linear, GitHub Issues, Notion, or Jira. Or add manually to `~/.config/orchestrator/.env`:

```bash
BOARD_PROVIDER=linear        # or: github, notion, jira
LINEAR_API_KEY=lin_api_xxxxx  # swap for your tracker's key
```

### 3. Try it

```
/orchestrator sweep
```

With just a board connected, the orchestrator will scan your tickets and dispatch agents using built-in capabilities. No domain skills or integrations required to start.

**What to expect on your first sweep:**
- Tickets with all four sections (Inputs, Deliverables, Verification, Artifacts) get dispatched
- Tickets missing sections get moved to Backlog with a comment explaining what's needed
- If you have no tickets in the right format yet, the orchestrator will tell you — use the templates below to write your first one

### 4. Add domain skills (recommended)

Domain skills give agents expertise. Without them, agents use general capabilities. With them, they follow domain-specific rules, verification criteria, and best practices learned from real executions.

```
/install marketplace maxtechera/skill-content
/install marketplace maxtechera/skill-ecommerce
/install marketplace maxtechera/skill-seo
```

### 5. Connect integrations

Each skill uses specific integrations. Add API keys to `~/.config/orchestrator/.env`:

```bash
# E-commerce
SHOPIFY_ACCESS_TOKEN=shpat_xxxxx

# Content / Newsletter
MAILERLITE_API_KEY=xxxxx

# Sales
APOLLO_API_KEY=xxxxx

# Growth
META_ADS_TOKEN=xxxxx

# Analytics
GA4_PROPERTY_ID=xxxxx

# Finance
QUICKBOOKS_TOKEN=xxxxx
```

The orchestrator validates every connection before dispatching. Missing integrations fail early with a clear message — not midway through execution.

---

## Usage

```
/orchestrator sweep                Process all actionable tickets
/orchestrator sweep TICKET-046     Re-run a single ticket
/orchestrator status               Show current ticket states and verification results
/orchestrator review               Show tickets awaiting your review (pre-verified)
/orchestrator approve TICKET-044   Approve a reviewed ticket → Done
/orchestrator reject TICKET-044    Reject → back to execution with your notes
/orchestrator setup                Connect your board and validate integrations
/orchestrator stats                Show this week's pass/fail rate, ticket count, cost
```

**Reviewing verified work:** When tickets land in Review, run `/orchestrator review` to see the verification report. Then approve, reject, or redirect with a note. This is your only daily touchpoint — everything else is automated.

**When rules are proposed:** After repeated failures with the same root cause, the system proposes a new rule in the verification report. You approve or reject it inline. Approved rules are added to the skill file and apply to all future tickets.

On OpenClaw, the orchestrator also runs on cron — dispatching agents automatically every 15 minutes.

---

## Do I Need API Keys?

| Integration | Free? | What it's for |
|-------------|-------|---------------|
| Issue Tracker | Free | Linear, GitHub Issues, Notion, or Jira |
| Shopify | Paid | Product pages, pricing, inventory |
| MailerLite | Free tier | Email sequences, newsletters |
| Instagram | Free (Graph API) | Post publishing, carousels |
| Meta Ads | Paid | Campaign management |
| Google Ads | Paid | Campaign management |
| Apollo | Free tier | Lead sourcing, outreach |
| HubSpot | Free tier | CRM, pipeline |
| GA4 | Free | Analytics, conversions |
| Stripe | Paid | Payment verification |
| QuickBooks | Paid | Invoicing, AR |
| Zendesk | Paid | Ticket management |
| MercadoLibre | Free | Marketplace listings (LATAM) |

*All credentials stored locally in `~/.config/orchestrator/.env`. Never transmitted. The orchestrator validates connections before dispatch.*

---

## Core Skills

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

### Starter Templates

Customize these or use as a starting point:

| Skill | What it does | Plugin |
|-------|-------------|--------|
| customer-support | Ticket triage, SLA tracking, tone checking | `maxtechera/skill-support` |
| paid-acquisition | Campaign setup, bid management, reporting | `maxtechera/skill-paid-ads` |
| brand-design | Asset generation, brand consistency checks | `maxtechera/skill-brand` |
| research | Competitive intelligence, market analysis | `maxtechera/skill-research` |

---

## How It Works

Three steps, every cycle:

1. **Dispatch** — reads the board, prioritizes by proximity to done (Review > Verification > Todo > Backlog), matches each ticket to a domain skill, validates integrations, dispatches a worker agent
2. **Verify** — a separate agent runs with fresh context and zero knowledge of how the work was done. Automated data checks (API assertions, link validation, test suites) plus AI judgment for subjective criteria (brand voice, content quality)
3. **Proof** — verification report posted to the ticket with evidence (screenshots, API responses, test results). PASS → Done. PARTIAL → Review. FAIL → auto-retry with failure context, or escalates.

**Finishing beats starting** — tickets closest to done get dispatched first.

**The ticket contract** — every ticket has four sections: Inputs, Deliverables, Verification, Artifacts. Missing any section → rejected to Backlog. [Full spec in docs/VISION.md](docs/VISION.md).

**Self-improving** — every failure becomes a rule. Skills evolve, verification hardens, rules accumulate. All version-controlled. You approve every change.

**Fail visible** — nothing publishes without passing verification. Blocked tickets include a structured reason. Partial failures are caught. The system fails visibly, not silently.

---

## Your First Ticket

Copy this to your board and run `/orchestrator sweep`:

**Publish SEO blog post**

```
Inputs: keyword brief "AI agent verification", brand voice guide, 3 competitor URLs
Deliverables: blog post published on CMS, meta tags set, internal links added
Verification: page returns 200, word count > 1,500, SEO score green, no brand violations
Artifacts: published URL, screenshot of live page
```

More templates for every domain in [docs/VISION.md](docs/VISION.md).

---

## Config

```
~/.config/orchestrator/.env       # API keys and credentials
~/.orchestrator/skills/           # Installed domain skill files
~/.orchestrator/rules/            # Accumulated operational rules (grow automatically)
~/.orchestrator/history/          # Outcome logs for self-improvement
```

## What This Repo Contains

```
orchestrator/
  SKILL.md             # Core orchestrator skill — the agent reads this
  WORKFLOW.md          # Ticket lifecycle (intake → execute → verify → done)
  docs/
    VISION.md          # Vision deck — the full story (15 slides)
    STATE_MACHINE.md   # Ticket state transitions
  skills/              # Domain skill directory
  examples/            # Example workflows and tickets
```

## Principles

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
