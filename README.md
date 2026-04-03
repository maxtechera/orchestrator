# The Orchestrator

**Manage work, not agents.**

> **Permissions overview:** Reads your ticket board (Linear, GitHub Issues, Notion) and dispatches agents with domain-specific skills. Connects to external services via user-provided API keys stored in `~/.config/orchestrator/.env`. The orchestrator only reads your board and dispatches — agents do the work using integrations you explicitly configure.

The skill-first orchestration framework that turns your ticket board into an autonomous workforce. You write tickets. The Orchestrator dispatches agents, verifies every deliverable independently, and improves with every cycle.

The agent that did the work never grades its own homework.

## Installation

**Claude Code:**
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

## Setup

On first run, the orchestrator walks you through setup:

```
> /orchestrator

👋 Welcome to the Orchestrator!

I turn your ticket board into an autonomous workforce —
dispatching agents, verifying deliverables, and improving with every cycle.

To get started, I need to connect to your board.

? How would you like to set up?
  ● Auto setup — I'll detect your board and installed skills
  ○ Manual — show me what to configure
  ○ Skip — I'll work with what's available
```

### Progressive Unlocking

**Level 1 — Zero Config**
Install the skill. Invoke `/orchestrator sweep`. The orchestrator reads whatever board your agent can already access. No API keys needed to start.

**Level 2 — Connect Your Board**
Add your tracker API key to `~/.config/orchestrator/.env` for persistent, reliable board access:

```bash
LINEAR_API_KEY=lin_api_xxxxx     # Linear (recommended)
# Or: GH_TOKEN, NOTION_API_KEY
```

**Level 3 — Add Domain Skills**
Domain skills give agents expertise. Each is a separate plugin you install:

```
/install marketplace maxtechera/skill-content
/install marketplace maxtechera/skill-ecommerce
/install marketplace maxtechera/skill-seo
```

Without domain skills, agents use their built-in capabilities. With them, they follow domain-specific rules, verification criteria, and best practices learned from real executions.

**Level 4 — Connect Integrations**
Each domain skill lists the integrations it needs. Add API keys to `~/.config/orchestrator/.env`:

```bash
SHOPIFY_ACCESS_TOKEN=shpat_xxxxx    # For e-commerce skill
MAILERLITE_API_KEY=xxxxx            # For content/newsletter skill
APOLLO_API_KEY=xxxxx                # For sales outreach skill
META_ADS_TOKEN=xxxxx                # For growth/paid skill
```

The orchestrator validates every connection before dispatching. Missing integrations fail the ticket early — not halfway through execution.

## Usage

```
/orchestrator sweep     Process all actionable tickets on your board
/orchestrator status    Show current ticket states and verification results
/orchestrator review    Show tickets awaiting your review (pre-verified)
```

On OpenClaw, the orchestrator also runs on a cron — dispatching agents automatically every 15 minutes without manual invocation.

### What Happens When You Run `/orchestrator sweep`

1. Reads your board, identifies tickets in actionable states
2. Prioritizes by proximity to done (tickets in Review before new tickets in Todo)
3. For each actionable ticket:
   - Validates the ticket contract (Inputs, Deliverables, Verification, Artifacts)
   - Matches the ticket to an installed domain skill (or uses base agent)
   - Confirms required integrations are connected
   - Dispatches a worker agent with the skill loaded
4. Each worker executes independently
5. After execution, a separate verification step runs (fresh context, no knowledge of how the work was done)
6. Verification report posted to the ticket with evidence
7. Ticket moves to Done (all checks pass), Review (needs human judgment), or back to In Progress (failed check, agent retries)

You see the results on your board. Proof attached to every ticket.

## The Ticket Contract

Every ticket — regardless of domain — has four sections. If all four are present, any agent with the right skill can execute it end-to-end without asking you a single question:

- **Inputs** — everything the agent needs to start (briefs, data, URLs, credentials context)
- **Deliverables** — exactly what must be produced (not vague, not open-ended)
- **Verification** — how to confirm the work is correct (automated checks + quality checks)
- **Artifacts** — where the finished work lives (links, screenshots, files)

If any section is missing, the ticket is rejected back to Backlog with a comment explaining what's needed.

### Example Tickets

**Content — Publish SEO blog post**
```
Inputs: keyword brief, brand voice guide, competitor URLs
Deliverables: blog post published on CMS, meta tags set, internal links added
Verification: page returns 200, word count > 1,500, SEO score green, no brand violations
Artifacts: published URL, screenshot of live page
```

**Finance — Generate monthly invoice**
```
Inputs: client "Acme Corp," service "March consulting retainer," amount $8,500, terms Net 30
Deliverables: invoice created in QuickBooks, PDF generated, email sent to billing contact
Verification: QuickBooks confirms invoice with correct amount and terms, email delivered, no duplicate
Artifacts: invoice PDF, QuickBooks URL, delivery confirmation
```

**Sales — Build cold outreach sequence**
```
Inputs: target customer profile, 4-email sequence template, sender email
Deliverables: 200 leads sourced from Apollo, email addresses verified, 4-step sequence created
Verification: bounce rate < 3%, personalization fields populated, email compliance rules met
Artifacts: Apollo sequence URL, lead list export
```

**E-commerce — Update product pricing**
```
Inputs: product "Summer Tote," new price $34.99
Deliverables: price updated on Shopify, old price logged
Verification: API confirms price == $34.99, variant prices consistent, no other fields changed
Artifacts: screenshot of product page, change log
```

Templates for every domain are included with each domain skill plugin.

## Verification

The agent that did the work never grades its own homework.

After a worker delivers, the orchestrator runs a separate verification step — a fresh context with zero knowledge of how the work was done. It only checks whether the output matches the ticket spec.

### How Verification Works

**Automated data checks** — the engine makes real API calls, parses real responses, and asserts exact values:
- Calls the Shopify API and asserts `variant.price == "34.99"`
- Loads a published URL and confirms HTTP 200
- Queries QuickBooks and confirms invoice amount matches spec
- Runs a test suite and captures pass/fail
- Resolves every link in the deliverable

**AI quality checks** — for subjective criteria, a separate AI agent grades with fresh context:
- Screenshots a published page and checks brand consistency
- Reads content and evaluates voice/tone against guidelines
- Inspects visual layout for obvious issues

**The verification gradient:**
- Automated checks are strong and reliable today
- AI judgment checks are better than self-checking, but not infallible
- The system moves more checks from AI judgment to automated over time, as patterns are identified and turned into rules
- Every check that CAN be automated BECOMES automated. AI judgment handles what's genuinely subjective.

### Verification Report

Every verified ticket gets a structured report posted as a comment:

```
## Verification Report — TICKET-042

Status: PASS

Checks:
  ✓ Page returns 200 (automated — 0.3s)
  ✓ Word count: 1,847 (automated — 0.1s)
  ✓ SEO meta tags present (automated — 0.2s)
  ✓ Internal links: 3 found (automated — 0.4s)
  ✓ Brand voice check (AI judgment — passed)

Evidence:
  - Screenshot of published page: [attached]
  - SEO audit report: [attached]

Result: PASS — all checks passed. Ticket moved to Done.
```

When verification finds issues:

```
## Verification Report — TICKET-044

Status: PARTIAL — 1 issue found

Checks:
  ✓ 3 emails created in MailerLite (automated)
  ✓ Subject lines match spec (automated)
  ✓ All links resolve to 200 (automated)
  ✓ Segment targeting correct (automated)
  ✗ CTA tone in email 2 — "BUY NOW" flagged (AI judgment)

Evidence:
  - Screenshot of email 2: [attached]

Result: PARTIAL — moved to Review for human decision.
```

## Domain Skills

Skills turn your AI tool into a domain specialist. A skill is a text file that gives the agent domain-specific rules, verification criteria, and best practices. Skills evolve — rules get added from real execution failures.

### Available Skills

| Skill | What it does | Plugin |
|-------|-------------|--------|
| content | Reels, carousels, blog posts, newsletters, story sequences | `maxtechera/skill-content` |
| ecommerce | Product pages, pricing, inventory, cross-sell, collections | `maxtechera/skill-ecommerce` |
| seo | Blog posts, sitemaps, meta tags, structured data, locale expansion | `maxtechera/skill-seo` |
| sales-outreach | Cold email sequences, lead sourcing, CRM pipeline | `maxtechera/skill-sales-outreach` |
| finance | Invoicing, AR, expense tracking, KPI scorecards | `maxtechera/skill-finance` |
| growth | Ad campaigns, referral loops, social proof, conversion optimization | `maxtechera/skill-growth` |
| go-to-market | Coordinated product launches across multiple channels | `maxtechera/skill-gtm` |
| engineering | Features, bug fixes, infrastructure, monitoring | Built-in (agent default) |

### What a Skill Looks Like

```yaml
# Skill: Content Production (v3 — refined after 47 tickets)
Domain: content
Integrations: instagram, mailerlite, cms

Rules:
  - Always set social preview image before publishing (added after 3 SEO failures)
  - Carousel images must be 1080x1350 (added after 2 brand check failures)
  - Never schedule posts within 4 hours of each other
  - Verify all image URLs resolve before publishing (added after broken image incident)

Verification:
  - Screenshot published asset and check against brand guidelines
  - Validate all links resolve to 200
  - Confirm hashtag count matches spec
  - Check post scheduling doesn't conflict with existing calendar

Templates:
  - blog-post.md
  - instagram-carousel.md
  - newsletter-sequence.md
  - reel-script.md
```

Skills are text files. Read them, edit them, fork them, write your own. Install from the marketplace or drop into `~/.orchestrator/skills/`.

## Integrations

| Integration | What it enables | Free? | Required? |
|-------------|----------------|-------|-----------|
| Linear | Board sync, ticket state management | Free tier | Recommended |
| GitHub | Code repos, PR workflow, issues as board | Free | Optional |
| Shopify | Product pages, pricing, inventory | Paid | For e-commerce skill |
| MailerLite | Email sequences, newsletters | Free tier | For content/newsletter |
| Instagram | Post publishing, carousel creation | Free (Graph API) | For content skill |
| Meta Ads | Campaign management, pixel verification | Paid | For growth skill |
| Google Ads | Campaign management | Paid | For growth skill |
| Apollo | Lead sourcing, outreach sequences | Free tier | For sales skill |
| HubSpot | CRM, deal pipeline | Free tier | For sales skill |
| GA4 | Analytics, conversion tracking | Free | For growth skill |
| Stripe | Payment verification | Paid | For finance skill |
| QuickBooks | Invoicing, AR | Paid | For finance skill |
| Zendesk | Support ticket management | Paid | For support skill |
| Slack | Notifications, team coordination | Free | Optional |
| MercadoLibre | Marketplace listings (LATAM) | Free | For e-commerce |
| ManyChat | Chat automation flows | Paid | For marketing |
| WhatsApp | Messaging campaigns | Paid | For marketing |

All credentials stored in `~/.config/orchestrator/.env`. The orchestrator validates connections before dispatch — missing credentials fail early with a clear message, not midway through execution.

## Self-Improving

Every failure becomes a rule. The same mistake never happens twice.

Three feedback loops run on completed ticket data:

**1. Skill refinement** — when a skill produces repeated failures with the same root cause, the system proposes a patch:

```diff
# Skill: E-commerce Operations
+ Rule: Confirm product is in correct collection after price update
+ Rule: Verify compare-at price is cleared when not on sale
# Added after verification gaps on TICKET-078, TICKET-091
```

You approve or reject every change.

**2. Verification hardening** — when a deliverable passes verification but you later flag it as wrong, the system adds the missed check to that domain's verification criteria. AI judgment checks get replaced with automated checks as patterns emerge.

**3. Rule accumulation** — operational rules that apply across all skills. Every rule is a line in a text file — visible, editable, deletable, version-controlled. Periodically reviewed for conflicts and staleness.

## Failure Handling

The system is designed to fail visibly, not silently.

- Nothing publishes without passing verification
- If an agent can't complete a ticket, it moves to "Blocked" with a structured reason — not "Done" with broken output
- Destructive actions (publishing, sending emails, changing prices) require approval rules you configure once
- Partial failures are caught: if an agent updates 3 of 5 products then crashes, verification flags the incomplete work
- Failures are captured as rules — the system proposes a fix, you approve or reject

If the orchestrator itself stops mid-run, tickets stay in their last known state on the board. Nothing is lost. Next sweep picks up where it left off.

## Configuration

```
~/.config/orchestrator/.env       # API keys and integration credentials
~/.orchestrator/skills/           # Installed domain skill files
~/.orchestrator/rules/            # Accumulated operational rules
~/.orchestrator/history/          # Outcome logs for self-improvement
```

The orchestrator validates all required connections on first run and before every dispatch cycle. Run `/orchestrator status` to check what's connected.

## What This Repo Contains

```
orchestrator/
  SKILL.md             # Core orchestrator skill — the agent reads this
  WORKFLOW.md          # Ticket lifecycle (pickup → execution → verification → done)
  docs/
    VISION.md          # North star vision document
    ARCHITECTURE.md    # System design
    GUARDRAILS.md      # Hard rules from production incidents
    RUNTIME_MODEL.md   # Dispatch cycle model
    STATE_MACHINE.md   # Ticket state transitions
  skills/              # Bundled domain skill contracts
  examples/            # Example tickets and sweep outputs
  .github/             # CI workflows
```

## Runtime Principles

- Your ticket board is the single source of truth
- Agents execute and post deliverables, but cannot self-verify
- The executor and the verifier are always different
- `Done` is fail-closed: no evidence, no completion
- The system fails visibly, not silently
- Finishing beats starting — work closest to done gets dispatched first
- You define the boundaries. The system operates inside them.

## Vision

Read the full north star document: [`docs/VISION.md`](docs/VISION.md)

**One board. Any domain. Verified output. The operator's leverage finally scales.**

## License

MIT
