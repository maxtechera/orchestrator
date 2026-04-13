# /orchestrator

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](CHANGELOG.md)

**Your AI agents say "done" but the work is wrong. The Orchestrator catches that.**

```
/plugin marketplace add maxtechera/orchestrator
```

Zero config. Run `/orchestrator sweep` immediately — if no board is connected, the setup wizard runs automatically.

---

### Claude Code (recommended)
```
/plugin marketplace add maxtechera/orchestrator
/plugin install orchestrator@orchestrator
```

The first command registers the plugin repository. The second installs the `orchestrator` plugin from it (`plugin-name@marketplace-name`). Verify with `/orchestrator status`.

### Manual Install (Claude Code)
```bash
git clone https://github.com/maxtechera/orchestrator.git ~/.claude/skills/orchestrator
```

After cloning, Claude Code discovers the skill via `.claude-plugin/plugin.json`. Verify with `/orchestrator status`.

**The agent that did the work never grades its own homework.** A separate verification pass checks with real API calls, screenshots, link checks, and compliance validation. Not just another AI saying "looks good."

**The tradeoff:** A sweep takes 5-30 minutes depending on ticket complexity. A typical 30-ticket sweep costs $2-8 in tokens. We think verified output is worth the wait, but simple one-off tasks may be faster done directly.

**Best for:** operators running AI agents across multiple domains who are tired of being the QA department.

That's it. Run `/orchestrator sweep` to get started. If no board is connected, the orchestrator will prompt you to run `/orchestrator setup`. See [Your First Ticket](#your-first-ticket) below for a copy-paste template.

---

## What people use it for

**Running a content operation.** `/orchestrator sweep` reads all open tickets, dispatches content agents loaded with your brand voice, and independently verifies every deliverable before marking it done. Not just "here's a draft" — checked output.

**Managing an e-commerce store.** Set `BOARD_PROVIDER=linear` and connect Shopify. The orchestrator processes inventory updates, price changes, and product listings — and verifies prices, compare-at fields, and image counts before closing tickets.

**Engineering ticket flow.** `/orchestrator sweep` picks up GitHub Issues, runs domain-specific verification (link checks, schema validation, test presence), and only marks tickets done when the deliverable actually passes.

**Auditing before a release.** `/orchestrator review <ticket>` independently checks a specific deliverable. The agent that did the work never grades its own homework.

---

## Setup: Progressive Integration Unlocking

Start using `/orchestrator` immediately. Add integrations when you want more domains.

### 1. Zero Config (built-in skills) — Just install

Run `/orchestrator sweep`. The orchestrator uses your existing board connections (MCP servers for Linear, GitHub, etc.) and built-in agent capabilities. No API keys, no configuration. If no board is detected, you'll be prompted to run `/orchestrator setup`.

### 2. Run the setup wizard (connect your board)

```
/orchestrator setup
```

The setup wizard detects your environment, connects your issue tracker, and validates integrations. Takes about 30 seconds. Supports Linear, GitHub Issues, Notion, and Jira. It writes `BOARD_PROVIDER` and your API key to `~/.config/orchestrator/.env`.

If you prefer manual config:

```bash
mkdir -p ~/.config/orchestrator && chmod 700 ~/.config/orchestrator
```

Then add to `~/.config/orchestrator/.env`:

```bash
# Add to ~/.config/orchestrator/.env
BOARD_PROVIDER=linear        # or: github, notion, jira
LINEAR_API_KEY=lin_api_xxxxx  # swap for your tracker's key
```

### 3. Add domain skills (RECOMMENDED — the single most impactful upgrade)

**Domain skills give agents real expertise** — domain-specific rules, verification criteria, and best practices learned from actual executions. Without them, agents use general capabilities. With them, they follow rules like "carousel images must be 1080x1350" and "always verify compare-at price is cleared when not on sale."

> **Note:** Domain skill plugins are currently in development. The orchestrator works without them using built-in agent capabilities. Check [skills/README.md](skills/README.md) for current availability.

```
/plugin marketplace add maxtechera/skill-content
/plugin marketplace add maxtechera/skill-ecommerce
/plugin marketplace add maxtechera/skill-seo
```

### 4. Add Shopify (e-commerce verification)

Connect your Shopify store for automated price, inventory, and product verification.

```bash
# Add to ~/.config/orchestrator/.env
SHOPIFY_ACCESS_TOKEN=shpat_xxxxx
```

### 5. Add MailerLite (content/newsletter verification)

Free tier at [mailerlite.com](https://mailerlite.com). Enables email sequence verification — link checks, segment validation, send tests.

```bash
# Add to ~/.config/orchestrator/.env
MAILERLITE_API_KEY=xxxxx
```

### 6. Add Apollo (sales verification)

Free tier at [apollo.io](https://apollo.io). Enables lead sourcing verification — bounce rate, compliance, sequence validation.

```bash
# Add to ~/.config/orchestrator/.env
APOLLO_API_KEY=xxxxx
```

### 7. Optional integrations

```bash
# Add to ~/.config/orchestrator/.env
META_ADS_TOKEN=xxxxx          # Meta Ads — campaign management
GOOGLE_ADS_TOKEN=xxxxx        # Google Ads — campaign management
GA4_PROPERTY_ID=xxxxx         # Google Analytics — conversions
HUBSPOT_API_KEY=xxxxx         # HubSpot — CRM, pipeline
STRIPE_SECRET_KEY=xxxxx       # Stripe — payment verification
QUICKBOOKS_TOKEN=xxxxx        # QuickBooks — invoicing, AR
XERO_TOKEN=xxxxx              # Xero — alternative to QuickBooks
ZENDESK_TOKEN=xxxxx           # Zendesk — support ticket management
MERCADOLIBRE_TOKEN=xxxxx      # MercadoLibre — LATAM marketplace
INSTAGRAM_ACCESS_TOKEN=xxxxx  # Instagram Graph API — post publishing
```

The orchestrator validates every connection before dispatching. Missing integrations fail early with a clear message — not midway through execution.

---

### Do I need API keys?

| Integration | Free? | Do you need it? |
|-------------|-------|-----------------|
| Issue tracker | Free | **Yes — pick one.** Linear, GitHub Issues, Notion, or Jira. |
| Shopify | Paid | **Yes, for e-commerce.** Product pages, pricing, inventory. |
| MailerLite | Free tier | **Yes, for content.** Email sequences, newsletters. |
| Apollo | Free tier | **Yes, for sales.** Lead sourcing, outreach. |
| Instagram | Free (Graph API) | **Optional.** Post publishing, carousels. |
| Meta Ads | Paid | **Optional.** Campaign management. |
| Google Ads | Paid | **Optional.** Campaign management. |
| HubSpot | Free tier | **Optional.** CRM, pipeline. |
| GA4 | Free | **Optional.** Analytics, conversions. |
| Stripe | Paid | **Optional.** Payment verification. |
| QuickBooks | Paid | **Optional.** Invoicing, AR. |
| Xero | Paid | **Optional.** Alternative to QuickBooks. |
| Zendesk | Paid | **Optional.** Ticket management. |
| MercadoLibre | Free | **Optional.** LATAM marketplace listings. |
| GitHub | Free | **For engineering.** PRs, CI, deployments. |

*All credentials stored locally in `~/.config/orchestrator/.env`. Never transmitted. The orchestrator detects available MCP servers first and uses them when available — the .env is a fallback.*

*The orchestrator receives no money from any integration provider — no referrals, no kickbacks.*

---

### Config file locations

```bash
# Global config
~/.config/orchestrator/.env       # API keys and credentials (chmod 600 recommended)
~/.orchestrator/skills/           # Installed domain skill files
~/.orchestrator/rules/            # Accumulated operational rules (grow automatically)
~/.orchestrator/history/          # Outcome logs for self-improvement
```

### Codex CLI

This skill also works in OpenAI Codex CLI:

```bash
git clone https://github.com/maxtechera/orchestrator.git ~/.agents/skills/orchestrator
```

After cloning, Codex discovers the skill from `SKILL.md`. Use the same commands as Claude Code (e.g., `orchestrator sweep`). Add credentials to `~/.config/orchestrator/.env` — see the setup section above.

### Gemini CLI

```bash
gemini extensions install maxtechera/orchestrator
```

After install, run `orchestrator sweep` to get started. The extension manifest (`gemini-extension.json`) prompts for board credentials during setup. Additional integrations can be added to `~/.config/orchestrator/.env`.

### OpenClaw / OpenCode

Copy the SKILL.md into your skills directory:

```bash
git clone https://github.com/maxtechera/orchestrator.git ~/.agents/skills/orchestrator
```

Add credentials to `~/.config/orchestrator/.env` — see the setup section above. At minimum, provide one board key (`LINEAR_API_KEY`, `GH_TOKEN`, `NOTION_API_KEY`, or `JIRA_API_TOKEN`).

---

## Usage

```
/orchestrator sweep                            Process all actionable tickets
/orchestrator sweep TICKET-046                 Re-run a single ticket
/orchestrator status                           Current ticket states and verification results
/orchestrator review                           Tickets awaiting your review (pre-verified)
/orchestrator approve TICKET-044               Approve → Done
/orchestrator approve TICKET-044 --note "..."  Approve with a note
/orchestrator reject TICKET-044 --note "..."   Reject → back to execution with your feedback
/orchestrator approve-rule "..."               Approve a proposed rule into the skill
/orchestrator reject-rule "..."                Reject a proposed rule
/orchestrator rules --pending                  List proposed rules awaiting approval
/orchestrator flag TICKET-XXX "description"    Report a verification false negative
/orchestrator setup                            Connect your board and validate integrations
/orchestrator stats                            This week's pass/fail rate, ticket count, cost
```

**Reviewing verified work:** When tickets land in Review, run `/orchestrator review` to see the verification report — what passed, what failed, and the evidence. Then approve, reject with a note, or approve with a note. This is your only daily touchpoint.

**When rules are proposed:** After repeated failures with the same root cause, the system proposes a new rule in the review output and via `/orchestrator rules --pending`. Approve or reject inline. Approved rules are added to the skill file and apply to all future tickets.

---

## What It Does

Three steps, every cycle:

1. **Dispatch** — reads the board, prioritizes by proximity to done (Review > Verification > In Progress stale > Todo > Backlog), matches each ticket to a domain skill, validates integrations, dispatches a worker agent
2. **Verify** — a separate verification pass runs with fresh context. Automated data checks (API assertions, link validation, test suites) plus AI judgment for subjective criteria (brand voice, content quality). Eliminates confirmation bias — the verifier doesn't know how the work was done.
3. **Proof** — verification report posted to the ticket with evidence (screenshots, API responses, test results). PASS → Done. PARTIAL → Review. FAIL → auto-retry with failure context, or escalates.

---

## Your First Ticket

Add the four sections as markdown headers (`## Inputs`, `## Deliverables`, `## Verification`, `## Artifacts`) in your ticket description. Copy this to your board and run `/orchestrator sweep`:

**Publish SEO blog post**

```
## Inputs
Keyword brief "AI agent verification", brand voice guide, 3 competitor URLs

## Deliverables
Blog post published on CMS, meta tags set, internal links added

## Verification
Page returns 200, word count > 1,500, SEO score green, no brand violations

## Artifacts
Published URL, screenshot of live page
```

**What to expect on your first sweep:**
- Tickets with all four sections get dispatched
- Tickets missing sections get moved to Backlog with a comment explaining what's needed
- If none of your tickets are in this format, the orchestrator tells you and offers to help reformat them

More templates for every domain in [docs/VISION.md](docs/VISION.md).

---

## Example: What a Verification Report Looks Like

After the orchestrator verifies a ticket, this is posted to the ticket:

```
## Verification Report — TICKET-043

Status: PASS ✓

Checks:
  ✓ Page returns 200 (automated — 0.3s)
  ✓ Word count: 1,847 > 1,500 (automated — 0.1s)
  ✓ SEO score: 92/100, green (automated — 1.2s)
  ✓ Meta title set, under 60 chars (automated — 0.1s)
  ✓ og:image present and resolves (automated — 0.4s)
  ✓ 3 internal links found (automated — 0.2s)
  ✓ Brand voice check: consistent, no violations (AI judgment — 2.1s)

Evidence:
  - Screenshot: live page captured
  - Lighthouse report: attached
  - All links validated: 3/3 resolve

Result: PASS — moved to Done
```

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

## Key Concepts

**Finishing beats starting** — tickets closest to done get dispatched first.

**The ticket contract** — every ticket has four sections: Inputs, Deliverables, Verification, Artifacts. Missing any → rejected to Backlog with guidance. [Full spec](docs/VISION.md).

**Self-improving** — every failure becomes a rule. Skills evolve, verification hardens, rules accumulate. All version-controlled. You approve every change.

**Fail visible** — nothing publishes without passing verification. Blocked tickets include a structured reason. Partial failures are caught. The system fails visibly, not silently.

---

## What This Repo Contains

```
orchestrator/
  SKILL.md                        # Core orchestrator skill — the agent reads this
  WORKFLOW.md                     # Ticket lifecycle (intake → execute → verify → done)
  .claude-plugin/                 # Claude Code marketplace manifests
  .codex-plugin/                  # Codex CLI discovery
  .agents/                        # OpenCode/OpenClaw skill discovery
  gemini-extension.json           # Gemini CLI extension manifest
  .clawhubignore                  # Distribution exclusions
  .env.example                    # All configuration variables
  CHANGELOG.md                    # Release history
  docs/
    VISION.md                     # Vision deck — the full story
    STATE_MACHINE.md              # Ticket state transitions (detailed)
  skills/                         # Domain skill directory
  examples/                       # Example workflows and tickets
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
