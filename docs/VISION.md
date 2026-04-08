# The Orchestrator

## Slide 1: Title

**THE ORCHESTRATOR**
Manage work, not agents.

Dispatch agents. Verify output. Ship with proof.
Your agents execute. Verification confirms. You architect the outcomes.

## Slide 2: The End State

You open your board at 2pm. Ten tickets are done.

You spent the morning on a partnership call. You ate lunch without checking Slack. You didn't verify the invoice amount, inspect the outreach sequence, or open Shopify to confirm the sale price. You forgot there were tickets running. That's the point.

The agents handled it. Each ticket was picked up by an agent loaded with the right expertise — content, commerce, finance, sales. Each deliverable was independently verified: prices confirmed via live API, screenshots captured, emails tested, links validated. Nothing shipped without proof.

Four tickets landed in Review. You see them now — verification reports attached with what passed, what failed, and the evidence. You approve three, redirect one with a note. Five minutes.

One ticket failed earlier. You didn't know because the system caught it, retried with the failure context, and it passed on the second run. A new rule was proposed — "always confirm collection sort order after product updates." You approve it. That mistake won't happen again.

You close your laptop. Ten tickets done. Five minutes of your attention. The rest of the day was yours. Not "yours to catch up on Slack." Yours. The kind of afternoon where you almost forget you run a business — because nothing needed you.

## Slide 3: The Gap

That end state doesn't exist today. Here's why:

- You assign a task. The agent says "done." You check — it's wrong.
- You fix it, re-assign, check again. You're the QA department now.
- Work stalls silently. You only find out when a deadline passes.
- Every domain needs output. You are the bottleneck in all of them.

AI can execute. What's missing is a system that makes execution trustworthy across every domain.

If you have a board and AI tools but no system you trust — keep reading.

## Slide 4: The Landscape

Models can execute real work now. Content, commerce, invoices, outreach — not just code.

The pattern that makes agent output trustworthy already exists: dispatch a task, verify the output independently, learn from failures, tighten the rules. It works. Verification catch rates improve from 60% to 94% of known failure modes when the system learns from its own mistakes.

Existing frameworks treat verification as domain-specific — one tool for code, another for content, nothing for finance or sales. The Orchestrator treats verification as a protocol. Same engine. Any domain.

The Orchestrator is a harness — the constraints, verification, and feedback loops that make agent output trustworthy across every domain. The key difference: domain is a plugin, not a hardcoded assumption. Install a skill for content, another for e-commerce, another for finance. Same verification engine. Same self-improving loop.

## Slide 5: What Is the Orchestrator

The Orchestrator doesn't replace your tools. It dispatches agents to use them, and verifies the output.

Add it to Claude Code, Codex, or any AI agent runtime. Install from GitHub or as a plugin. Open source. Free.

Core includes orchestrator, dispatcher, worker, and verification engine. Domain skills are add-ons you install separately.

Write the ticket. The Orchestrator does the rest.

Ticket → Agent + Skill → Verification → Done

Your board is the only system that matters. Every deliverable checked before it's marked complete. Works with Linear, GitHub Issues, Notion, Jira — any issue tracker your agent can read. Run `/orchestrator setup` to connect yours.

## Slide 6: Verification That Actually Works

The agent that did the work never grades its own homework.

Verification runs as a separate pass — a different agent instance that reads the ticket spec and checks the deliverable with zero knowledge of how the work was done. It's not fully independent (it reads the same spec the executor used), but it eliminates confirmation bias from the implementation path. The verifier doesn't know what shortcuts were taken or what edge cases were dodged — it only knows what was promised and what exists.

The engine makes real requests, parses real responses, and compares real data against the ticket spec. Here's what this looks like for a Shopify task:

1. Agent completes the pricing update on your store
2. Verification engine calls the Shopify API, parses the live product data
3. Asserts the price matches the ticket spec — exact match, not LLM judgment
4. Checks that variant prices, compare-at prices, and inventory are all consistent
5. Takes a screenshot of the live storefront page as visual evidence
6. Posts the verification report to the ticket: PASS with evidence, or FAIL with the specific discrepancy

Different domains, same pattern:

**Engineering** — Fix reconnection logic. Verification: test suite (47 tests) all pass, deployment health endpoint returns 200, error rate monitored 5 min post-deploy. PASS. 8 minutes.

**Sales** — Source 200 target leads and build 4-step sequence in Apollo. Verification: 200 contacts imported, bounce rate 1.8%, all sequence steps match spec, email compliance rules met. PASS. 4 minutes.

**How much is automated vs. AI judgment:**

| Domain type | Automated checks | AI judgment | Examples |
|-------------|-----------------|-------------|----------|
| E-commerce, engineering | ~80-100% | ~0-20% | API assertions, test suites, price matching |
| Content, brand, outreach | ~40-60% | ~40-60% | Links + formatting automated; tone + quality by AI |

For data-heavy domains, verification is strong and reliable. For subjective domains — brand voice, content quality, visual design — it's a useful second opinion, not a guarantee. The system is honest about this: every AI-judged check is labeled as such in the verification report, and the system moves checks from AI judgment to automated as patterns are identified and turned into rules.

In practice, verification catch rate improves from 60% to 94% of known failure modes over 8 weeks as rules accumulate. That denominator matters — "known failure modes" means issues the operator noticed post-verification. There are always defects neither the system nor the human caught. The goal is to shrink that blind spot over time, not to claim perfection.

## Slide 7: The Numbers

These are my results running the orchestrator across multiple domains for 8 weeks:

**BEFORE**
- 14 hours/week supervising agents
- 8 tickets shipped per week
- Zero verification — I was the verifier
- Every "done" required manual inspection

**AFTER**
- 2 hours/week reviewing pre-verified work
- 31 tickets shipped per week
- 100% of deliverables verified before review
- Every "done" has proof attached

12 hours/week back. Nearly 4x the output. Same agents. Different system.

*Your results will vary by domain complexity and ticket volume. Data-heavy domains (e-commerce, engineering) see the fastest gains. Subjective domains (content, brand) take longer to build reliable rules.*

**One task, side by side:**

Before (manual): Open MailerLite → create 3 emails → write subject lines → add links → set segments → send test → check rendering → schedule. 40 minutes. No verification that links work or segments are right.

After (Orchestrator): Write ticket "Build 3-email welcome sequence for new subscribers." The agent builds the sequence, the verification engine confirms all emails exist, checks every link resolves, validates segment targeting, runs a send test. 4 minutes. Verified. With evidence.

## Slide 8: What It Looks Like

Install the skill, invoke it, and watch it work. Here's what a run produces:

```
> /orchestrator sweep

Reading board... 12 tickets synced (8 Todo, 2 In Review, 2 Done)
Dispatching 4 tickets...

  → TICKET-042: Monthly invoice → finance skill → agent started
  → TICKET-043: SEO blog post → seo skill → agent started
  → TICKET-044: Welcome sequence → content skill → agent started
  → TICKET-045: IG carousel → content skill → agent started

> /orchestrator status

  TICKET-042  Monthly invoice             ██████████ VERIFIED ✓
  TICKET-043  SEO blog post              ██████████ VERIFIED ✓
  TICKET-044  Welcome sequence           ████████░░ IN REVIEW — brand tone flagged
  TICKET-045  IG carousel batch          ██████████ VERIFIED ✓

> /orchestrator review

  TICKET-044: Welcome sequence
    Verification: PARTIAL — brand tone check flagged CTA in email 2
    [10:42] Agent loaded content skill (v2)
    [10:43] Connected to MailerLite API ✓
    [10:45] Created 3-email sequence in draft
    [10:47] Verification started (separate pass)
    [10:48] Email 1: subject ✓, links ✓, segment ✓
    [10:48] Email 2: subject ✓, links ✓, CTA tone ✗ — "BUY NOW" flagged
    [10:49] Result: PARTIAL — 1 issue found
    Action needed: approve, reject, or redirect

> /orchestrator approve TICKET-044 --note "BUY NOW is fine for this campaign"
  TICKET-044 → Done ✓

> /orchestrator reject TICKET-044 --note "fix the CTA to match brand voice"
  TICKET-044 → Back to execution with notes attached
  Agent will re-run with your feedback as context
```

And when verification fails — the system handles it:

```
> /orchestrator status

  TICKET-046  Shopify collection update   ████████░░ FAILED — verification caught issue

  TICKET-046: Shopify collection update
    Verification: FAIL — 2 issues found
    [11:02] Agent updated collection "Spring Sale" — added 12 products
    [11:04] Verification started (separate pass)
    [11:04] Collection exists ✓
    [11:04] Product count: 12 ✓
    [11:05] Product price: $34.99 — expected $29.99 ✗ (sale price not applied)
    [11:05] Collection sort order: manual — expected "best-selling" ✗
    [11:05] Result: FAIL — 2 discrepancies

    → Auto-retry triggered. Agent re-executing with failure context...
    → Proposed rule: "Always confirm collection sort order after product updates"

  TICKET-046: Shopify collection update (retry 1)
    [11:08] Agent corrected price to $29.99 and sort order to "best-selling"
    [11:09] Verification re-run (separate pass)
    [11:09] All checks pass ✓
    [11:10] Result: PASS — screenshot captured

  TICKET-046 → VERIFIED ✓ (after 1 retry — flagged for human spot-check)

> /orchestrator approve-rule "Always confirm collection sort order after product updates"
  Rule added to ecommerce skill ✓
```

Skills live in `~/.orchestrator/skills/`
Rules accumulate in `~/.orchestrator/rules/`

You own every file. No black box. No vendor lock.

## Slide 9: The Ticket Contract and Skills

**The ticket is the spec.** Every ticket — regardless of domain — has four sections:

- **Inputs** — what the agent needs to start
- **Deliverables** — what "done" looks like, concretely
- **Verification** — how to confirm the work is correct (automated checks + quality checks)
- **Artifacts** — proof that the work exists in the real world

Example:

**Content — Publish SEO blog post**
Inputs: keyword brief, brand voice guide, competitor URLs
Deliverables: blog post published on CMS, meta tags set, internal links added
Verification: page returns 200, word count > 1,500, SEO score green, no brand violations
Artifacts: published URL, screenshot of live page

More templates included for every domain. You'll be writing your own within a week.

**Skills** turn your AI tool into a domain specialist. They're text files that evolve with use:

```
# Skill: E-commerce Operations (v4 — refined after 63 tickets)
Domain: ecommerce
Integrations: shopify, stripe, mercadolibre
Rules:
  - Always confirm collection sort order after product updates (added after TICKET-046)
  - Verify compare-at price is cleared when not on sale (added after 3 pricing errors)
  - Check inventory sync across all sales channels before marking done
Verification: price match via API, screenshot of live storefront, inventory count
```

**8 core skills:** content, e-commerce, SEO, sales outreach, finance, growth, go-to-market, engineering.
**4 starter templates** you can customize: customer support, paid acquisition, brand design, research.

Install them, customize them, or write your own.

## Slide 10: Integrations

Skills connect to the systems where work happens:

| Category | Integrations |
|----------|-------------|
| Commerce | Shopify, Stripe, MercadoLibre |
| Content & Marketing | MailerLite, Instagram, Meta Ads, Google Ads, GA4 |
| Sales & CRM | Apollo, HubSpot |
| Finance & Ops | QuickBooks, Xero, Zendesk |
| Engineering | GitHub |

This is the authoritative list. Every integration listed here has a corresponding env var in SKILL.md and is validated before agents start. If a connection is missing, the ticket fails early — not midway through execution.

Board connectors (Linear, GitHub Issues, Notion, Jira) are configured separately via `/orchestrator setup`.

## Slide 11: What Happens When Things Go Wrong

The system is designed to fail visibly, not silently.

- Nothing publishes without passing verification. A carousel with off-brand colors gets flagged, not posted.
- If an agent can't complete a ticket, it moves to "Blocked" with a reason — not "Done" with broken output.
- Destructive actions (publishing, sending emails, changing prices) require approval rules you configure once.
- Partial failures are caught: if an agent updates 3 of 5 products then crashes, verification flags the incomplete work.
- When a ticket fails verification, the system retries with the failure context. If the retry fails, it escalates to Review with a full report.
- **Tickets that required retries are flagged for closer human review.** The retry teaches the agent what checks to pass — which means it could learn to satisfy the verifier without actually fixing the root issue. Flagging retried tickets keeps the human in the loop where it matters most.
- Failures are captured as rules. The system proposes a fix; you approve or reject.

If the system itself stops mid-run, your tickets stay in their last known state on the board. Nothing is lost. Next run picks up where it left off.

You define the boundaries. The system operates inside them.

## Slide 12: Tradeoffs

Every system has costs and limits. Here are ours.

**Cost per sweep:** Token spend varies by ticket complexity. A simple verification (checking a price via API) costs ~$0.02. A full content review (AI judgment on brand voice, visual inspection) costs ~$0.15-0.40. A typical 30-ticket sweep costs roughly $2-8 in tokens plus API calls. You control the budget by choosing which domains to run and how many tickets to queue.

**Security:** Credentials are stored locally in `~/.config/orchestrator/.env` — never transmitted, never logged. Skills are plain text files — inspectable, auditable, version-controlled. The agent only accesses APIs you explicitly configure. No cloud backend. No telemetry.

**What if the verifier is wrong?** Automated checks can't hallucinate — an API returns what it returns. AI judgment checks (brand voice, content quality) can miss things. That's why every AI-verified PASS includes the evidence: screenshots, response data, comparison details. You can spot-check any result. The system is honest about this gradient — automated verification is strong, AI judgment is useful but not infallible.

The system gets better at catching things over time. But it's not perfect on day one. Neither were you.

## Slide 13: The System Gets Smarter

Every completed ticket produces a record of what was done, what passed, and what failed. Three feedback loops run on that data:

**Skill refinement** — when a skill produces repeated failures with the same root cause, the system proposes a patch:

```diff
# Skill: E-commerce Operations
+ Rule: Confirm product is in correct collection after price update
+ Rule: Verify compare-at price is cleared when not on sale
# Added automatically after verification gaps on TICKET-078, TICKET-091
```

You approve or reject every change — inline during review or via `/orchestrator approve-rule`.

**Verification hardening** — when a deliverable passes verification but you later flag it as wrong, the system adds the missed check to that domain's verification. AI judgment checks get replaced with automated checks as patterns emerge.

**Rule accumulation** — operational rules across all skills. "Never publish content without confirming all image URLs resolve." Every rule is a line in a text file — visible, editable, deletable, version-controlled.

**The same ticket type, 8 weeks apart:**

Week 1 — "Publish Instagram carousel"
- Agent posts carousel. Verification finds: images are 1080x1080 (wrong aspect for feed), no social preview image set, 2 hashtags missing from spec. FAIL. Agent retries. Second attempt passes after corrections. Total: 2 runs, 8 minutes.

Week 8 — "Publish Instagram carousel"
- Three rules now exist in the content skill from prior failures: "images must be 1080x1350," "always set social preview," "hashtag count must match spec." Agent follows all three on first attempt. Verification passes. PASS. Total: 1 run, 3 minutes.

The skill file grew from 12 rules to 31 over 8 weeks. Verification catch rate improved from 60% to 94% of known failure modes.

Every failure becomes a rule. The same mistake never happens twice.

## Slide 14: Roadmap

**NOW — v1.0**
- Ticket-driven orchestration across multiple domains
- Hybrid verification engine (automated data checks + AI quality judgment)
- Auto-retry with failure context (retried tickets flagged for human review)
- 8 core skills: content, e-commerce, engineering, growth, go-to-market, SEO, sales outreach, finance
- 4 starter templates: customer support, paid acquisition, brand design, research
- Integrations: Shopify, MailerLite, Instagram, GitHub, GA4, Stripe, Meta Ads, Google Ads, Apollo, HubSpot, QuickBooks, Xero, Zendesk, MercadoLibre
- Self-improving rules and skill evolution
- Works with Claude Code, Codex, OpenClaw, and any AI agent runtime
- Works with Linear, GitHub Issues, Notion, Jira — any issue tracker
- Open source on GitHub

**NEXT**
- **Dry-run mode — simulate without touching production systems** *(coming first)*
- Metric-gate verification — check performance thresholds at 24h, 48h, or 7 days after launch
- Cross-ticket dependencies — landing page must PASS before ad campaign starts
- Skill marketplace — discover and install skills in one command
- Cost tracking per ticket (tokens, time, API calls)
- Weekly stats and reporting dashboard

**FUTURE**
- Multi-operator support — teams share skill libraries and rules with client namespacing
- Auto-ticket generation — system proposes tickets based on KPI trends

Every item has a ticket on the board. Backlog, not wish list.

## Slide 15: Get Started

1. **Install** — `/plugin marketplace add maxtechera/orchestrator` on Claude Code, `clawhub install orchestrator` on OpenClaw, or `git clone` for manual.
2. **Set up your board** — `/orchestrator setup` walks you through connecting Linear, GitHub Issues, Notion, or Jira.
3. **Write your first ticket** — use the templates included for any domain. Four sections: Inputs, Deliverables, Verification, Artifacts.
4. **Run** — `/orchestrator sweep`. First verified output in one session.
5. **Review** — `/orchestrator review` to see pre-verified results. Approve, reject, or redirect.

Open source. Free. Maintained by maxtechera. Built for the OpenClaw ecosystem. Contributions welcome — skills, integrations, verification templates.

## Slide 16: The Vision

The end state from the beginning of this deck isn't aspirational. It's the design target.

The bottleneck was never the agents. It was the absence of a system that makes their output trustworthy.

The Orchestrator is that system. You define what your business needs. Agents execute. Hybrid verification confirms — automated checks for data, AI judgment for quality, real evidence for proof. And every completed ticket makes the next one more reliable.

Today it runs multiple domains for one operator. Tomorrow it runs dozens for a team. The skills compound. The rules accumulate. The verification gets harder to fool. The system gets smarter and you stop doing work that never required a human.

This is the trajectory: from supervising agents, to reviewing verified output, to architecting outcomes while the system handles everything between the ticket and the proof.

**The operator's leverage finally scales.**

GitHub: github.com/maxtechera/orchestrator
