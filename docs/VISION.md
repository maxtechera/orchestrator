# The Orchestrator

## Slide 1: Title

**THE ORCHESTRATOR**
Manage work, not agents.

The operating system for AI-augmented business operations.
Your agents execute. Verification confirms. You architect the outcomes.

## Slide 2: The End State

Imagine your business runs like this:

You write tickets that describe what needs to happen. Agents pick them up — each one loaded with the right expertise for the domain. They execute across content, commerce, engineering, marketing, finance, sales, and support simultaneously.

Every deliverable gets independently verified — prices checked via API assertions, content screenshotted and brand-checked, invoices cross-referenced, campaigns confirmed live. Nothing ships without proof.

When something fails, you never see it. The system catches it, flags it, fixes it, and adds a rule so it never happens again. Each week the verification gets tighter without you touching it.

You open your board in the afternoon. Ten tickets are Done with proof attached. You approved three things today. You spent the rest of your time on the business — pricing strategy, a new product line, a partnership call. The agents handled everything between the ticket and the deliverable.

This is where you should be operating. Here's why you're not.

## Slide 3: The Gap

That end state doesn't exist today. Here's why:

- You assign a task. The agent says "done." You check — it's wrong.
- You fix it, re-assign, check again. You're the QA department now.
- Work stalls silently. You only find out when a deadline passes.
- Every domain needs output. You are the bottleneck in all of them.

AI can execute. What's missing is a system that makes execution trustworthy across every domain.

If you have a board and AI tools but no system you trust — keep reading.

## Slide 4: What Is the Orchestrator

Agents just crossed the threshold where they can execute real business work — content, commerce, finance, marketing, engineering. But nobody built the system to make that work trustworthy. Until now.

The Orchestrator doesn't replace your tools. It dispatches agents to use them, and verifies the output. Add it to Claude Code, Codex, or any AI tool. Install from GitHub or as a Claude Code plugin. Open source. Free.

Core includes orchestrator, dispatcher, worker, and verification engine. Domain skills are add-ons you install separately.

Write the ticket. The Orchestrator does the rest.

Ticket → Agent + Skill → Verification → Done

Your board is the only system that matters. Every deliverable checked before it's marked complete.

**Why not Zapier, n8n, or custom scripts?** Those automate tasks. The Orchestrator orchestrates agents — dispatching, verifying, and learning across every domain. Automation runs one workflow. Orchestration runs your entire operation.

## Slide 5: Verification That Actually Works

The agent that did the work never grades its own homework.

Verification is hybrid: automated data checks (real API calls, exact-match assertions) plus AI judgment (brand voice, content quality, visual inspection). Not another LLM call. The engine makes real requests, parses real responses, and compares real data against the ticket spec.

Here's what this looks like for a Shopify task:

1. Agent completes the pricing update on your store
2. Verification engine calls Shopify API: `GET /products/{id}.json` — parses the response automatically
3. Asserts `variant.price == "34.99"` — exact match, not LLM judgment
4. Checks that variant prices, compare-at prices, and inventory are all consistent via API
5. Takes a screenshot of the live storefront page as visual evidence
6. Posts the verification report to the ticket: PASS with evidence, or FAIL with the specific discrepancy

For subjective checks (brand voice, content quality, visual design), a separate AI agent grades with fresh context — zero knowledge of how the work was done.

**Where verification is today:**
- Automated data checks (API calls, test suites, link validation) — strong and reliable
- AI judgment checks (brand voice, content quality, visual inspection) — better than self-checking, but not infallible
- The system moves more checks from AI judgment to automated over time, as patterns are identified and turned into rules
- The goal: every check that CAN be automated BECOMES automated. AI judgment handles what's genuinely subjective.

## Slide 6: The Numbers

**BEFORE THE ORCHESTRATOR**
- 14 hours/week supervising agents
- 8 tickets shipped per week
- Zero verification — you were the verifier
- Every "done" required manual inspection

**AFTER THE ORCHESTRATOR**
- 2 hours/week reviewing pre-verified work
- 31 tickets shipped per week
- 100% of deliverables verified before review
- Every "done" has proof attached

12 hours/week back. Nearly 4x the output. Same operator. Same agents. Different system.

*These are the results from the first operator to run this system — multiple domains, 8 weeks. Every new operator starts with the same foundation: same ticket format, same verification engine, same skill library.*

**One task, side by side:**

Before (manual): Open MailerLite → create 3 emails → write subject lines → add links → set segments → send test → check rendering → schedule. 40 minutes. No verification that links work or segments are right.

After (Orchestrator): Write ticket "Build 3-email welcome sequence for new subscribers." The agent builds the sequence, the verification engine confirms all emails exist, checks every link resolves, validates segment targeting, runs a send test. 4 minutes. Verified. With evidence.

## Slide 7: A Day With the Orchestrator

**Morning.** 12 tickets in Todo. You wrote them yesterday. Last time you touch them.

**The system fires.** Connections validated. Agents pick up tickets, each loaded with the right skill. Multiple domains running at once. You go focus on your business.

**Midday.** Verification runs. Carousel screenshotted and brand-checked. Product page price confirmed via API. Invoice cross-checked against QuickBooks. Outreach verified — 200 leads imported, bounce rate under 3%. One ticket fails — the blog post's meta description is too long. The system flags it, the agent fixes it and resubmits. You never touched it.

**Afternoon.** 4 tickets in Review — pre-verified. You approve three, redirect one with a note. Takes five minutes.

**End of day.** 10 tickets Done. KPI dashboard updated. Newsletter subscribers +47. Shopify conversion rate +0.3pp. Every deliverable has proof attached.

You wrote tickets. Agents shipped them. Verification confirmed them. You spent the day on the business, not in it.

## Slide 8: Proof — What Verification Actually Produces

Trust is evidence, not promises. Here's what the system actually outputs:

**E-commerce — Shopify pricing update**
Ticket: Update "Summer Tote" to $34.99. Verification: API assertion confirmed price == $34.99, variant prices consistent, screenshot captured. PASS. 90 seconds.

**Content — Instagram carousel batch**
Ticket: Publish 5-slide carousel with brand-approved assets. Verification: post confirmed live, image order matches spec, caption matches draft, brand voice check passed. PASS. 2 minutes.

**Finance — Monthly invoice**
Ticket: Generate March invoice for Acme Corp, $8,500 retainer, Net 30. Verification: QuickBooks API confirmed invoice exists with correct amount/terms, email delivered, no duplicate found. PASS. 2 minutes.

**Engineering — Websocket hardening**
Ticket: Fix reconnection logic. Verification: test suite (47 tests) all pass, deployment health endpoint returns 200, error rate monitored 5 min post-deploy. PASS. 8 minutes.

**Sales — Cold outreach sequence**
Ticket: Source 200 target leads and build 4-step sequence in Apollo. Verification: 200 contacts imported, bounce rate 1.8%, all sequence steps match spec, email compliance rules met. PASS. 4 minutes.

Also verified: GTM launches, support tickets (SLA + tone check), newsletter sequences, SEO blog posts, WhatsApp campaigns, KPI scorecards, paid-media reporting, and more.

**For deliverables where proof takes time** — ad campaigns, email sequences, growth experiments — the roadmap includes metric-gate verification: performance checked 24 hours, 48 hours, or 7 days after launch against your thresholds. Misses move the ticket back to Review automatically.

Verified across every domain the system touches.

## Slide 9: What It Looks Like

Install the skill, invoke it, and watch it work. Here's what a run produces:

```
> /orchestrator sweep

Reading board... 12 tickets synced (8 Todo, 2 In Review, 2 Done)
Dispatching 8 tickets...

  → TICKET-042: Monthly invoice → finance skill → agent started
  → TICKET-043: SEO blog post → seo skill → agent started
  → TICKET-044: Newsletter → newsletter skill → agent started
  → TICKET-045: IG carousel → content skill → agent started

> /orchestrator status

  TICKET-042  Monthly invoice             ██████████ VERIFIED ✓
  TICKET-043  SEO blog post              ██████████ VERIFIED ✓
  TICKET-044  Newsletter sequence        ████████░░ IN REVIEW — brand tone flagged
  TICKET-045  IG carousel batch          ██████████ VERIFIED ✓

> /orchestrator review

  TICKET-044: Newsletter sequence
    Verification: PARTIAL — brand tone check flagged CTA in email 2
    [10:42] Agent loaded newsletter skill (v2)
    [10:43] Connected to MailerLite API ✓
    [10:45] Created 3-email sequence in draft
    [10:47] Verification started (fresh context)
    [10:48] Email 1: subject ✓, links ✓, segment ✓
    [10:48] Email 2: subject ✓, links ✓, CTA tone ✗ — "BUY NOW" flagged
    [10:49] Result: PARTIAL — 1 issue found
    Action needed: approve, reject, or redirect
```

Skills live in `~/.orchestrator/skills/`
Rules accumulate in `~/.orchestrator/rules/`

You own every file. No black box. No vendor lock.

## Slide 10: The Ticket Format + Your First Tickets

The ticket is the spec. Write it precisely; the system handles the rest.

Every ticket — regardless of domain — has four sections. If all four are filled in, any agent with the right skill can execute it end-to-end:

- **Inputs** — what the agent needs to start
- **Deliverables** — what "done" looks like, concretely
- **Verification** — how to confirm the work is correct (automated checks + quality checks)
- **Artifacts** — proof that the work exists in the real world

Start with these — copy them, modify them, you'll be writing your own within a week:

**Content — Publish SEO blog post**
Inputs: keyword brief, brand voice guide, competitor URLs
Deliverables: blog post published on CMS, meta tags set, internal links added
Verification: page returns 200, word count > 1,500, SEO score green, no brand violations
Artifacts: published URL, screenshot of live page

**Finance — Generate monthly invoice**
Inputs: client "Acme Corp," $8,500 retainer, Net 30
Deliverables: invoice in QuickBooks, PDF sent to client
Verification: amount/terms correct, email delivered, no duplicate
Artifacts: invoice PDF, delivery confirmation

**Sales — Build cold outreach sequence**
Inputs: target customer profile, 4-email template, sender email
Deliverables: 200 leads sourced, sequence created in Apollo
Verification: bounce rate < 3%, personalization populated, email compliance rules met
Artifacts: sequence URL, lead list export

Same structure for e-commerce, marketing, engineering, support, ads, or any domain. Templates for every domain are included. No brand voice doc? The system interviews you and generates one.

## Slide 11: Skills, Integrations, and Architecture

**Skills** turn your AI tool into a domain specialist. They're text files that evolve with use:

```
# Skill: Content Production (v3 — refined after 47 tickets)
Domain: content
Integrations: instagram, mailerlite, cms
Rules:
  - Always set social preview image before publishing (added after 3 SEO failures)
  - Carousel images must be 1080x1350 (added after 2 brand check failures)
  - Never schedule posts within 4 hours of each other
Verification: screenshot + brand check, link validation, hashtag count
```

Available skills: content production, e-commerce operations, go-to-market launches, growth and SEO, financial reporting, engineering, sales outreach, customer support, paid acquisition, brand design, research and competitive intelligence, vendor management. Install them, customize them, or write your own.

**Integrations** connect skills to the systems where work happens:

**Commerce & Marketing:** Shopify | MailerLite | Instagram | GitHub | GA4 | Stripe | MercadoLibre | ManyChat | WhatsApp | Meta Ads | Google Ads

**Sales & CRM:** Apollo | HubSpot | LinkedIn | Slack

**Finance & Ops:** QuickBooks | Xero | Zendesk | Freshdesk | Gusto | DocuSign *(v1.5)*

Every integration is validated before agents start. If a connection is missing, the ticket fails early.

**Under the hood:** Board → Ticket Parser → Skill Router → Agent Dispatcher → Verification Engine (automated data checks + AI quality checks) → Results posted back. Text files and API calls. Runs wherever your AI tool runs.

Text files are the right starting point — inspectable, version-controlled, git-friendly. As the system scales to teams and hundreds of rules, structured storage is the natural next step.

## Slide 12: What Happens When Things Go Wrong

The system is designed to fail visibly, not silently.

- Nothing publishes without passing verification. A carousel with off-brand colors gets flagged, not posted.
- If an agent can't complete a ticket, it moves to "Blocked" with a reason — not "Done" with broken output.
- Destructive actions (publishing, sending emails, changing prices) require approval rules you configure once.
- Partial failures are caught: if an agent updates 3 of 5 products then crashes, verification flags the incomplete work.
- Failures are captured as rules. The system proposes a fix; you approve or reject it.

If the system itself stops mid-run, your tickets stay in their last known state on the board. Nothing is lost. Next run picks up where it left off.

You define the boundaries. The system operates inside them.

## Slide 13: The System Gets Smarter

Every completed ticket produces a record of what was done, what passed, and what failed. Three feedback loops run on that data:

**Skill refinement** — when a skill produces repeated failures with the same root cause, the system proposes a patch:

```diff
# Skill: E-commerce Operations
+ Rule: Confirm product is in correct collection after price update
+ Rule: Verify compare-at price is cleared when not on sale
# Added automatically after verification gaps on TICKET-078, TICKET-091
```

You approve or reject every change.

**Verification hardening** — when a deliverable passes verification but you later flag it as wrong, the system adds the missed check to that domain's verification. AI judgment checks get replaced with automated checks as patterns emerge.

**Rule accumulation** — operational rules across all skills. "Never publish content without confirming all image URLs resolve." Every rule is a line in a text file — visible, editable, deletable, version-controlled. Periodically reviewed for conflicts and staleness.

Every failure becomes a rule. The same mistake never happens twice.

## Slide 14: Roadmap

**NOW — v1.0**
- Ticket-driven orchestration across multiple domains
- Hybrid verification engine (automated data checks + AI quality judgment)
- Core skills: content, e-commerce, engineering, growth, marketing, SEO, sales outreach, paid ads, brand design, research
- Integration validation for Shopify, MailerLite, Instagram, GitHub, GA4, Stripe, Meta Ads, Apollo, HubSpot
- Self-improving rules and skill evolution
- Works with Claude Code and Codex
- Open source on GitHub

**NEXT — v1.5**
- **ClawdHub** — a skill registry that makes skill discovery and installation one command
- Metric-gate verification — check performance thresholds at 24 hours, 48 hours, or 7 days later
- Multi-board sync (Linear + Notion + GitHub Issues in one run)
- Finance and ops skills (invoicing, AR, support triage, SLA, vendor POs)
- Finance and ops integrations (QuickBooks, Xero, Zendesk, Freshdesk, Gusto)
- Cross-ticket dependencies — landing page must PASS before ad campaign starts
- Dry-run mode — simulate without executing against production
- Cost tracking per ticket (tokens, time, API calls)

**FUTURE — v2.0**
- Skill marketplace on ClawdHub — community-contributed domain skills, rated and versioned
- Multi-operator support — teams share skill libraries and rules with client namespacing
- Autonomous re-runs — failed tickets retry with adjusted approach
- Auto-ticket generation — system proposes tickets based on KPI trends

Every item has a ticket on the board. Backlog, not wish list.

## Slide 15: Get Started

1. **Install** — `/install marketplace maxtechera/orchestrator` in Claude Code, or `plugin install` on OpenClaw.
2. **Add domain skills** — install the skill plugins for your domains (content, ecommerce, SEO, etc.).
3. **Connect** — add your API keys to `~/.config/orchestrator/.env`. The system validates everything before any agent runs.
4. **Write your first ticket** — templates included for every domain.
5. **Invoke** — `/orchestrator sweep`. First verified output in one session.

Open source. Free. Maintained by the OpenClaw community. Contributions welcome — skills, integrations, verification templates.

## Slide 16: The Vision

The end state from the beginning of this deck isn't aspirational. It's the design target.

The bottleneck was never the agents. It was the absence of a system that makes their output trustworthy.

The Orchestrator is that system. You define what your business needs. Agents execute. Hybrid verification confirms — automated checks for data, AI judgment for quality, real evidence for proof. And every completed ticket makes the next one more reliable.

Today it runs multiple domains for one operator. Tomorrow it runs dozens for a team. The skills compound. The rules accumulate. The verification gets harder to fool. The system gets smarter and you stop doing work that never required a human.

This is the trajectory: from supervising agents, to reviewing verified output, to architecting outcomes while the system handles everything between the ticket and the proof.

**One board. Any domain. Verified output. The operator's leverage finally scales.**

GitHub: github.com/openclaw/orchestrator
Star the repo. Clone it. Ship your first verified ticket tonight.
