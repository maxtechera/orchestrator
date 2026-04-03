# The Orchestrator — Next Steps

## Where We Are

The vision is defined. The SKILL.md contract exists. The README follows the skill-first pattern. The repo is public. The deck (docs/VISION.md) has been through 12+ rounds of iteration and scores 88/100 across CTO, solopreneur, and storytelling reviewers.

What exists today:
- The orchestrator skill running in OpenClaw (kanban:sweep cron, dispatch, worker contracts)
- 300+ skills in the openclaw-config workspace
- Real production results: 31 tickets/week across 12+ domains, independently verified
- SKILL.md with proper frontmatter, triggers, env requirements
- Vision deck, architecture docs, guardrails, state machine, workflow docs

What doesn't exist yet:
- The `/orchestrator sweep` skill invocation (currently cron-only via kanban:sweep)
- The first-run setup wizard (last30days pattern)
- Standalone domain skill plugins (skills live in openclaw-config, not as separate installable packages)
- Marketplace listing on ClawdHub (ClawdHub itself is v1.5 roadmap)
- Hybrid verification engine as described (deterministic API checks + AI judgment — currently proof packs are worker-posted)
- The self-improving loop as formalized (rules accumulate informally, not through the three-loop system described)
- Multi-board support (Linear only today)
- Any user beyond the creator (N=1)

## Phase 1: Make It Invocable (Week 1-2)

**Goal:** Someone installs the orchestrator skill and runs `/orchestrator sweep` — it reads their Linear board and dispatches work.

### 1.1 — Build the `/orchestrator` skill invocation

The SKILL.md currently describes the contract but doesn't implement the invocation path. Need:

- **`/orchestrator sweep`** — reads the board, identifies actionable tickets, dispatches workers
  - Today this happens via `kanban-dispatch-fast.py` on a cron. Extract the dispatch logic into something the skill can invoke directly.
  - The agent reads SKILL.md, sees the sweep trigger, and follows the dispatch instructions.
  - Output: list of tickets picked up, agents spawned, status per ticket.

- **`/orchestrator status`** — reads ticket states from the board, shows current status
  - Today this is `kanban-sweep-state.py`. Surface it as a skill invocation.

- **`/orchestrator review`** — shows tickets in Review/Blocked state with verification results
  - Filter board for tickets awaiting human input. Show proof packs inline.

### 1.2 — First-run setup wizard

Following the last30days pattern:

1. Check if `~/.config/orchestrator/.env` exists
2. If not → welcome message explaining what the orchestrator does
3. AskUserQuestion: "How would you like to set up?"
   - Auto setup — detect LINEAR_API_KEY, check installed domain skills
   - Manual — show what to configure
   - Skip — run with whatever's available
4. Store config in `~/.config/orchestrator/.env`

### 1.3 — Ticket contract validation on pickup

Before an agent executes a ticket, validate the 4-section contract:
- Inputs section exists and is non-empty
- Deliverables section exists and is non-empty
- Verification section exists with at least one criterion
- Artifacts section exists (can be empty — agent fills it)

If any section is missing → reject ticket back to Backlog with a comment explaining what's needed.

**Deliverable:** A user installs the skill, runs `/orchestrator sweep`, and sees their first ticket dispatched and executed.

---

## Phase 2: Hybrid Verification Engine (Week 3-4)

**Goal:** Every deliverable gets independently verified — automated data checks where possible, AI judgment where necessary.

### 2.1 — Verification dispatcher

After a worker posts deliverables, the orchestrator dispatches a separate verification step:
- Fresh agent context (no knowledge of how the work was done)
- Reads the ticket's Verification section
- Executes each verification criterion
- Posts a structured verification report to the ticket

### 2.2 — Automated data checks

Build verification primitives that the verification agent can use:
- **HTTP check** — `GET {url}`, assert status code, check response body
- **API assertion** — call an API endpoint, parse JSON, assert field values
- **Link validation** — resolve all URLs in artifacts, confirm they return 200
- **Screenshot** — capture a webpage via headless browser or browser MCP
- **Test runner** — execute test suites, capture pass/fail results

These are deterministic — no LLM judgment involved.

### 2.3 — AI quality checks

For subjective verification (brand voice, content quality, visual design):
- Separate AI agent with fresh context
- Reads the ticket spec + the deliverable
- Grades against criteria
- Returns structured pass/fail with reasoning

### 2.4 — Verification report format

Standardize the output:
```
## Verification Report — TICKET-042

Status: PASS | PARTIAL | FAIL

Checks:
  ✓ Page returns 200 (automated — 0.3s)
  ✓ Word count: 1,847 (automated — 0.1s)
  ✓ SEO score: 92/100 (automated — 1.2s)
  ✗ Brand voice: CTA too aggressive (AI judgment — flagged "BUY NOW")

Evidence:
  - Screenshot: [attached]
  - API response: [attached]

Result: PARTIAL — 1 issue flagged for human review
```

**Deliverable:** A ticket goes from execution → independent verification → structured report posted. The executor never sees the verification.

---

## Phase 3: Domain Skill Plugins (Week 5-6)

**Goal:** Domain skills are separate installable plugins, not monolithic files in openclaw-config.

### 3.1 — Extract domain skills into standalone repos

Each domain skill becomes its own repo following the skill pattern:
- `maxtechera/skill-content` — content production (reels, carousels, blogs, newsletters)
- `maxtechera/skill-ecommerce` — Shopify, MercadoLibre, pricing, inventory
- `maxtechera/skill-seo` — blog posts, sitemaps, meta tags, locale expansion
- `maxtechera/skill-sales-outreach` — Apollo, cold email, lead sourcing
- `maxtechera/skill-finance` — invoicing, AR, KPI scorecards
- `maxtechera/skill-growth` — ads, referral loops, social proof
- `maxtechera/skill-gtm` — product launches end to end

Each repo has:
- SKILL.md with frontmatter (name, version, required integrations, tags)
- Templates for common tickets in that domain
- Verification criteria specific to the domain
- README with install + usage

### 3.2 — Skill discovery and loading

The orchestrator needs to:
- Know which domain skills are installed (`ls ~/.orchestrator/skills/` or `ls ~/.claude/skills/`)
- Match a ticket's domain/tags to the right skill
- Load the skill context before dispatching the worker agent
- Fall back gracefully if no domain skill matches (use base agent capabilities)

### 3.3 — Ticket templates per domain

Each domain skill ships with starter ticket templates:
- Content: blog post, carousel, reel, newsletter, story sequence
- E-commerce: price update, new product listing, collection update, cross-sell setup
- SEO: blog post, sitemap update, meta tag audit, locale expansion
- Sales: outreach sequence, lead list, CRM update
- Finance: invoice, expense report, KPI scorecard

Templates are copy-paste ready with placeholder values.

**Deliverable:** A user runs `/install marketplace maxtechera/skill-content`, then writes a content ticket, and the orchestrator loads the content skill for that ticket.

---

## Phase 4: Self-Improving Loop (Week 7-8)

**Goal:** The three feedback loops are formalized and running.

### 4.1 — Outcome tracking

After every ticket completes (or fails), log a structured outcome:
```json
{
  "ticket_id": "TICKET-042",
  "domain": "content",
  "skill_used": "content-production",
  "outcome": "pass",
  "verification_results": [...],
  "failure_reason": null,
  "time_elapsed_s": 240,
  "tokens_used": 12400
}
```

Store in `~/.orchestrator/history/` or append to a local SQLite DB.

### 4.2 — Skill refinement

When a skill produces 3+ failures with the same root cause:
1. System detects the pattern from outcome history
2. Proposes a rule addition to the skill file (as a diff)
3. Posts the proposal for human approval
4. If approved, appends the rule to the skill file with a reference to the tickets that caused it

### 4.3 — Verification hardening

When a deliverable passes verification but the human later flags it as wrong:
1. The missed check is identified
2. System proposes adding it to the domain's verification criteria
3. If approved, future tickets in that domain include the new check

### 4.4 — Rule accumulation

Cross-domain rules that apply to all skills:
- Stored in `~/.orchestrator/rules/`
- One rule per line, with a reference to the incident that created it
- Loaded into every agent context before execution
- Periodically reviewed for conflicts (propose removals when rules contradict)

**Deliverable:** After 50 tickets, the system has accumulated 10+ rules, 3+ skill patches, and 2+ new verification checks — all with audit trail.

---

## Phase 5: Second Operator (Week 9-10)

**Goal:** Someone who is NOT the creator installs and runs the orchestrator on their own business.

### 5.1 — Onboarding documentation

- Quick start guide with real screenshots
- Video walkthrough: install → setup → first ticket → first verified output
- Troubleshooting: common setup issues, credential problems, skill mismatches

### 5.2 — Measure the delta

Collect the same metrics as the first operator:
- Hours/week supervising agents (before vs after)
- Tickets shipped per week (before vs after)
- Verification catch rate (how many agent mistakes does verification catch?)
- Time to first verified output

N=2 with an external operator makes every claim in the deck credible.

### 5.3 — Feedback loop from second operator

What breaks? What's confusing? What's missing?
- Skill format issues (is it clear how to write a ticket?)
- Integration gaps (what services do they need that aren't supported?)
- Verification gaps (what domains have weak verification?)

Feed learnings back into the skill, docs, and vision.

---

## Phase 6: Distribution + Community (Week 11-12)

**Goal:** The orchestrator is discoverable and installable by anyone.

### 6.1 — Claude Code marketplace listing

Submit the orchestrator skill to the Claude Code plugin marketplace. Ensure:
- SKILL.md frontmatter is complete
- README is clear
- First-run setup wizard works
- At least 3 domain skills are available as separate plugins

### 6.2 — ClawdHub listing (when ClawdHub ships)

Register the orchestrator as a featured skill on ClawdHub. Domain skills listed as companions.

### 6.3 — Community contribution guide

- CONTRIBUTING.md: how to write a domain skill, how to submit a verification template, how to propose a rule
- Skill spec document: formal schema for skill files
- Skill testing harness: `orchestrator skill test my-skill.yaml --dry-run`

### 6.4 — Content + launch

- Blog post: "How I run 12 domains with one ticket board and AI agents"
- Demo video: one ticket end-to-end with real verification output
- Thread/reel: "The agent that did the work never grades its own homework"
- Submit to HN, r/ClaudeCode, r/ClaudeAI

---

## Phase 7: Scale (Month 3+)

From the v1.5 and v2.0 roadmap:

- **Metric-gate verification** — check campaign performance 24-48 hours after launch
- **Multi-board sync** — Linear + Notion + GitHub Issues in one run
- **Cross-ticket dependencies** — landing page must PASS before ad campaign starts
- **Dry-run mode** — simulate without executing against production
- **Cost tracking** — tokens, time, API calls per ticket
- **Multi-operator support** — teams share skill libraries with client namespacing
- **Skill marketplace** — community-contributed skills, rated and versioned
- **Auto-ticket generation** — system proposes tickets based on KPI trends

---

## Priority Order

| Priority | Phase | Why |
|---|---|---|
| 1 | Phase 1: Make It Invocable | Nothing else matters if `/orchestrator sweep` doesn't work |
| 2 | Phase 2: Verification Engine | This is the core differentiator — without it, we're just another dispatcher |
| 3 | Phase 5: Second Operator | N=2 validates everything. Do this before building more features. |
| 4 | Phase 3: Domain Skill Plugins | Needed for distribution but the orchestrator works without them |
| 5 | Phase 4: Self-Improving Loop | High value but can run informally until formalized |
| 6 | Phase 6: Distribution | Only after phases 1-3 + 5 prove the system works for multiple operators |
| 7 | Phase 7: Scale | v1.5+ features, after community traction |

## Success Metrics

| Metric | Target | When |
|---|---|---|
| `/orchestrator sweep` works end-to-end | First ticket dispatched + verified | Phase 1 |
| Verification catch rate | >80% of injected failures caught | Phase 2 |
| Second operator running | N=2 with external user | Phase 5 |
| Tickets shipped by external operator | 10+/week verified | Phase 5 |
| GitHub stars | 100+ | Phase 6 |
| Community-contributed skills | 3+ | Phase 6 |
| Operators running the system | 10+ | Phase 7 |
