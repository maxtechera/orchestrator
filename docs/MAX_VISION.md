# Max's Vision for the Orchestrator

> This document captures Max's actual vision as expressed across two full sessions (April 2-3, 2026). These are his words, decisions, and the reasoning behind them — traced from every message in the conversation. This is the source of truth for what the orchestrator should be, how it evolved, and why each decision was made.

---

## All Messages — Verbatim (Chronological)

Every message Max sent across both sessions, in order. These are the raw inputs that shaped the vision.

### Session 1 (April 2, 2026) — From OpenClaw config to open-source vision

1. "build a gamma presentation on the orchestrator skill. the harness engineering autonoms loop"

2. "Remove the details this should be service,cli agnostic. skill first framework deployed on any agent"

3. "improve the gamma.sh cli to be able to update slides individually instead of creating a new slide everytime"

4. "ok lets iterate over the markdown for the slides until were ready to create them in gamma"

5. "make the text simpler and higher level focus on concepts rather than implementation"

6. "Take the concepts and language from symphony(but dont mention them explicitly) focusing on how orchestrator and openclaw-config implementation works"

7. "check the linear ticket for 421 where we talk about improvements to the orchestrator current state, and talks a lot about the vision"

8. "update the deck with those principles, again we dont want to dive super deep into technical"

9. "Lets remove the details... focusing on concepts again openai/symphony has great language for this"

10. "review it again and provide feedback"

11. "apply these changes"

12. "still too high level, too techy, too much about principles... should be a presentation of orchestrator, problem statement, demo, how its used"

13. "analyze the current slides and provide feedback"

14. "ok my vision is this orchestrator framework is the skill first for any agentic platform to do ANY work for any organization, multitude of skills"

15. "the contract defines the ticket template to ensure the orchestrated agents are able to work autonomously"

16. "visual verification is a strong part of the symphony, independent verification agents, human in the loop"

17. "update the deck"

18. "heres a slide you can see for a similar product" *(shared Alpha Loop deck link)*

19. "apply these changes"

20. "nobody knows what symphony, or alphaloop, or harness engineering is... but they do know claude code, openclaw and other creators are building agentic workflows"

21. "yes ultrathink and propose how to reframe the orchestrator deck. spin up a team of agents so we can iterate over the deck from different POVs"

22. "are we representing GTM, marketing, sales, outreach, etc? all that is also covered. spin up more agent teams"

23. "use parallel agent teams"

24. "Update all agents pov with clear verificators and providing honest critical feedback"

25. "Ok whats the latest feedback critical and honest"

26. "ok implement this feedback into the slides, continue iterating, wanna make these slides have the vision and ideal state (painting the end state, then working backwards)"

27. "what pricing?" → "we dont need pricing, this is opensource, probably a skill that you install for free in clawdhub and claude code plugin"

28. "Give me your honest critical feedback on the orchestrator"

29. "Ok lets push this to the orchestrator skill and repo from maxtechera"

30. "Lets remove explicit references to SYMPHONY_PATTERNS"

31. "Move the orchestrator repo to ~/dev/* with the correct name"

32. "Make sure the quick start follow the correct patterns, https://github.com/mvanhorn/last30days-skill is a good example of an AI agent skill repo"

33. "There is no orchestrator CLI, this is skill first framework, like /last30days"

34. "better, iterate more on this improvements. cc and openclaw installs should be through plugin/marketplace"

35. "integration setup should be like last30days"

36. "Nicee this new direction brings simplicity and paints the final picture of what using the orchestrator is. This helps develop and make the vision more solid. Write a plan for the next steps"

37. "More focused on polishing the concept the vision. We have a working version of this glued together. The goal now is to define the vision and final state (readme.md)"

38. "Keep the readme structure following the best practices of last30days. You can show more and expand more on the VISION deck"

39. "Yes lets have the README follow the best patterns. The vision deck is where we can put the depth right now to iterate on both with the user to validate, and define it"

40. "we still wanna do it in the form of slides this keeps us honest and visual, practical, high level"

41. "OK audit the current repo for orchestrator, remove anything that is not aligned with the current README and vision. Goal is to scrape the repo to start over based on the README and Vision."

### Session 2 (April 3, 2026) — Research, agent teams, plan refinement

42. "Give me a summary of the current state"

43. "define a prompt to be used with /last30days to bring in an expert to continue iterating on VISION.md and README.md"

44. *(ran /last30days harness engineering symphony autoresearch)*

45. "ok save that into claude code agent so we have the experts always available"

46. "the research as persistent memory should be global not inside the commands of the orchestrator"

47. "no commands please" *(rejected creating slash commands)*

48. "this is enough. I want you to invoke this expert as subagent, and verifier, and editor. Let's go through a complete iteration providing critical feedback on the current state of the orchestrator"

49. "Whats the ideal team to iterate on orchestrator vision and readme"

50. "Create an agents team so they can collaborate"

51. "everything will be in v1. linearapikey is setup through the /orchestrator setup or whatever the command name is."

52. "Linear is one implementation but any issue tracker would work. The skill should be abstracted"

53. Decisions via structured questions:
    - Competitors: "Reference the patterns only"
    - Cost/security: "Add a tradeoffs slide"
    - Board: "Multiple examples equally"
    - Skills: "8 core + 4 community"

54. "Dont apply changes, iterate and create a plan"

55. "keep iterating" *(rejected exiting plan mode)*

56. "iterate on the plan further, use the experts" *(rejected exiting plan mode again, wanted more agent review)*

57. "commit this state"

58. "ok give me a summary of the destination, the readme, the vision. Review everything ive said and summarize into a single file verbatim to keep track of My actual vision based on my messages"

59. "i want it verbose"

60. "does it have the verbatim extracted from the session?"

---

## Origin Story

The orchestrator started as an OpenClaw-specific kanban dispatch system — a config file that told OpenClaw how to process Linear tickets. It had hardcoded references to Linear, Railway, and OpenClaw internals. The original WORKFLOW.md was 764 lines of implementation-specific logic.

Max's first request was to build a Gamma presentation about "the orchestrator skill, the harness engineering autonomous loop." But as soon as the first draft appeared, the vision started expanding rapidly.

The orchestrator was never meant to be a config file for one platform. It was meant to be the system that makes AI agent output trustworthy across every domain of a business.

---

## The Evolution (In Max's Words)

### Phase 1: Strip the implementation

"Remove the details. This should be service, CLI agnostic. Skill first framework deployed on any agent."

"Make the text simpler and higher level. Focus on concepts rather than implementation."

"Take the concepts and language from Symphony (but don't mention them explicitly) focusing on how orchestrator and openclaw-config implementation works."

Max wanted the orchestrator to be described in terms of what it does, not how it's built. The concepts from OpenAI's Symphony framework — dispatch, verification, proof-of-work, self-improving loops — were the right vocabulary, but Symphony itself shouldn't be named because the orchestrator isn't a Symphony clone. It's a different product that shares architectural patterns.

### Phase 2: Find the right altitude

"Lets remove the details... focusing on concepts again. OpenAI/Symphony has great language for this."

"Still too high level, too techy, too much about principles... should be a presentation of orchestrator, problem statement, demo, how its used."

Max kept bouncing between too-detailed and too-abstract. The deck went through 12+ rounds of agent team reviews (CTO, solopreneur, storytelling, investor, developer, agency, skeptic, CMO, COO perspectives). Each round tightened the altitude. The sweet spot: concrete enough to be believable (real CLI output, real verification examples), abstract enough to not be implementation-specific.

### Phase 3: The vision crystallizes

"Ok my vision is this orchestrator framework is the skill first for any agentic platform to do ANY work for any organization, multitude of skills."

This was the breakthrough message. Not "an orchestrator for OpenClaw." Not "a kanban dispatch tool." The orchestrator is a **skill-first orchestration framework** that works on **any agentic platform** to do **any work** for **any organization** with a **multitude of skills**.

"The contract defines the ticket template to ensure the orchestrated agents are able to work autonomously."

The ticket contract (Inputs, Deliverables, Verification, Artifacts) is what makes autonomous execution possible. Without all four sections, an agent doesn't have enough information to work independently. The contract is the interface between human intent and agent execution.

### Phase 4: Verification as the core

"Visual verification is a strong part of the symphony, independent verification agents, human in the loop."

Max identified verification as the thing that makes the orchestrator different from every other agent framework. Not "we also have verification." Verification IS the product. The agent that did the work never grades its own homework. A separate agent, with fresh context and zero knowledge of how the work was done, checks the output against the ticket spec.

The verification model is hybrid and Max insisted on honesty about this:
- Automated data checks (API calls, assertions) — strong, reliable, can't hallucinate
- AI judgment checks (brand voice, content quality) — better than self-checking, but not infallible
- The system is transparent about this gradient. It doesn't pretend AI verification is perfect.

### Phase 5: Multi-domain — the real differentiator

"Are we representing GTM, marketing, sales, outreach, etc? All that is also covered. Spin up more agent teams."

Max realized the deck was underrepresenting the orchestrator's scope. A Linear ticket audit showed 13-15 domains were actually being processed through the system, but the deck only claimed 6-8. The orchestrator isn't a code tool that also does some content. It covers:

- Content (reels, carousels, blog posts, newsletters, stories)
- E-commerce (product pages, pricing, inventory, cross-sell)
- SEO (blog posts, sitemaps, meta tags, structured data)
- Sales outreach (cold email sequences, lead sourcing, CRM)
- Finance (invoicing, AR, KPI scorecards)
- Growth (ad campaigns, referral loops, social proof)
- Go-to-market (coordinated product launches)
- Engineering (features, bug fixes, infrastructure)
- Customer support (ticket triage, SLA tracking, tone checking)
- Paid acquisition (campaign setup, bid management, reporting)
- Brand design (asset generation, brand consistency checks)
- Research (competitive intelligence, market analysis)

"Everything will be in v1."

Max was clear: don't gate features behind version numbers. The working system already handles all these domains. The v1.0 should reflect what actually works, not artificially hold things back. (The strategist agent later refined this to "credible v1.0" — core loop + 8 skills + existing integrations, with metric-gate and cross-ticket deps moved to NEXT because they're genuinely harder engineering problems.)

### Phase 6: No CLI, skill-first

"There is no orchestrator CLI, this is skill first framework, like /last30days."

This was a critical correction. Early drafts had fake CLI commands like `orchestrator run`, `orchestrator sync`. Max killed those. The orchestrator is a SKILL — a text file (SKILL.md) that an agent reads and follows. You invoke it with `/orchestrator sweep`, just like you invoke `/last30days` to research a topic. The skill IS the product.

"CC and OpenClaw installs should be through plugin/marketplace."

No `git clone` as the primary install. The orchestrator installs like any other skill:
- Claude Code: `/install marketplace maxtechera/orchestrator`
- OpenClaw: `plugin install maxtechera/orchestrator`

This is how the ecosystem works. Skills are distributed through marketplaces, not manually cloned.

### Phase 7: Follow last30days patterns

"Make sure the quick start follows the correct patterns. https://github.com/mvanhorn/last30days-skill is a good example of an AI agent skill repo."

"Integration setup should be like last30days."

The last30days-skill is the gold standard for how a skill repo should look. Max wanted the orchestrator README to follow the same patterns:
- Install commands up top
- Progressive integration unlocking (zero config → add keys → unlock more)
- Config stored in `~/.config/orchestrator/.env`
- Concise, scannable, practical

"Keep the README structure following the best practices of last30days. You can show more and expand more on the VISION deck."

The README stays lean. The VISION.md is where depth goes. Two documents, two purposes:
- README = "what is it, how do I install it, how do I use it" (30-second scan)
- VISION = "why does it exist, what does it look like in practice, where is it going" (15-slide deck)

### Phase 8: Slides keep us honest

"We still wanna do it in the form of slides — this keeps us honest and visual, practical, high level."

Max insisted the VISION.md stay in slide format even as it gained depth. Slides force clarity. You can't hide behind a wall of text in a slide. Every slide needs a headline, a point, and evidence. If a slide is vague, it's obvious. If it's redundant, it's obvious. The format is the discipline.

"Ok implement this feedback into the slides, continue iterating, wanna make these slides have the vision and ideal state (painting the end state, then working backwards)."

The narrative structure: paint the destination first (Slide 2: The End State), then explain why you're not there (Slide 3: The Gap), then show how to get there. End-state-first, not feature-first.

### Phase 9: Scrape and rebuild

"OK audit the current repo for orchestrator, remove anything that is not aligned with the current README and vision. Goal is to scrape the repo to start over based on the README and Vision."

The repo was ~60% aligned with the vision. 19 files were removed (1,931 lines of legacy OpenClaw-specific code), 3 files were rewritten, the repo was trimmed to 14 clean files. The README and VISION became the north star documents — everything else either serves them or gets deleted.

### Phase 10: Board-agnostic

"Linear is one implementation but any issue tracker would work. The skill should be abstracted."

"LINEAR_API_KEY is setup through the /orchestrator setup or whatever the command name is."

Max was emphatic: Linear is not special. The orchestrator works with any issue tracker — Linear, GitHub Issues, Notion, Jira. The setup command (`/orchestrator setup`) walks you through connecting whichever board you use. No default, no preference. The system reads tickets from a board; which board is a configuration detail.

### Phase 11: Positioning without naming competitors

"Nobody knows what symphony, or alphaloop, or harness engineering is... but they do know Claude Code, OpenClaw and other creators are building agentic workflows."

Max's audience is operators and builders, not researchers. They don't know what "harness engineering" means. They don't follow OpenAI's internal projects. They know Claude Code, they know OpenClaw, they know skills and plugins.

When asked about competitors in the deck, Max chose: "Reference the patterns only." Don't name Symphony. Don't name Codex. Say what the pattern proved ("dispatch, verify independently, learn from failures") and say where the gap is ("every implementation stops at code"). Let the audience connect the dots.

The word "harness" appears once in the deck, naturally, not as jargon: "The Orchestrator is a harness — the constraints, verification, and feedback loops that make agent output trustworthy across every domain."

### Phase 12: Open source, free, no pricing

"We don't need pricing, this is opensource, probably a skill that you install for free in ClawdHub and Claude Code plugin."

The orchestrator is MIT-licensed. Free. No hosted tier. No premium features. It's a skill you install from a marketplace. This is a deliberate choice — the orchestrator is infrastructure for the ecosystem, not a revenue product.

The strategist agent later suggested adding a sustainability signal ("Maintained by maxtechera. Built for the OpenClaw ecosystem.") to address the "will this be maintained?" question. Max approved this.

---

## The Destination (Current State)

### What the orchestrator IS

A skill-first orchestration framework. A text file (SKILL.md) that any AI agent reads and follows. It turns your ticket board into an autonomous workforce by dispatching agents loaded with domain-specific skills, independently verifying every deliverable, and improving with every cycle.

It is NOT:
- A CLI tool
- A hosted service
- A SaaS platform
- An OpenClaw-specific config
- A code-only tool

### How it works

1. **Dispatch** — reads the board, prioritizes tickets closest to done (finishing beats starting), matches each ticket to an installed domain skill, validates integrations, dispatches a worker agent
2. **Verify** — after the worker delivers, a separate verification step runs with fresh context and zero knowledge of how the work was done. Automated data checks plus AI judgment for subjective criteria.
3. **Proof** — verification report posted to the ticket with evidence. PASS moves to Done. PARTIAL moves to Review. FAIL retries with failure context or escalates.

### The ticket contract

Every ticket has four required sections:
- **Inputs** — what the agent needs to start
- **Deliverables** — what "done" looks like, concretely
- **Verification** — how to confirm the work is correct
- **Artifacts** — proof that the work exists in the real world

Missing any section → ticket rejected to Backlog. This contract is what makes autonomous execution possible. If an agent has all four sections and the right skill, it can execute end-to-end without human intervention.

### Verification model

Hybrid verification with honest transparency about the gradient:
- **Automated data checks** — real API calls, exact-match assertions, link validation, test suites. Strong and reliable. Can't hallucinate.
- **AI judgment checks** — brand voice, content quality, visual inspection. Separate agent, fresh context. Better than self-checking, but not infallible.
- **Self-improving** — the system moves checks from AI judgment to automated over time. Every check that CAN be automated BECOMES automated.
- **Evidence always attached** — every PASS includes screenshots, API responses, comparison data. You can spot-check any result.

Verification catch rate improves from 60% to 94% over 8 weeks as rules accumulate.

### Self-improving loop

"Every failure becomes a rule. The same mistake never happens twice."

Three feedback loops:
1. **Skill refinement** — repeated failures with the same root cause trigger proposed patches. You approve or reject.
2. **Verification hardening** — when a deliverable passes verification but you later flag it as wrong, the missed check gets added.
3. **Rule accumulation** — operational rules across all skills. Every rule is a line in a text file — visible, editable, deletable, version-controlled.

This is Karpathy's autoresearch loop (edit → run → measure → keep/discard → repeat) applied to business operations instead of ML training.

### Skills and distribution

**8 core skills** (maintained by maxtechera):
content, ecommerce, seo, sales-outreach, finance, growth, go-to-market, engineering

**4 starter templates** (customize or use as starting points):
customer support, paid acquisition, brand design, research/competitive intel

Skills are text files that evolve with use. They accumulate rules from real failures. A content skill that has processed 47 tickets has 31 rules learned from actual production issues.

Install via marketplace: `/install marketplace maxtechera/skill-content`

### Board support

Works with any issue tracker equally:
- Linear
- GitHub Issues
- Notion
- Jira

Connect via `/orchestrator setup`. No default. No preference.

### Integrations

Progressive unlocking — start with zero config, add integrations as you need them:

**Commerce & Marketing:** Shopify, MailerLite, Instagram, GitHub, GA4, Stripe, MercadoLibre, ManyChat, WhatsApp, Meta Ads, Google Ads

**Sales & CRM:** Apollo, HubSpot, LinkedIn, Slack

**Finance & Ops:** QuickBooks, Xero, Zendesk, Freshdesk, Gusto, DocuSign

All credentials stored locally in `~/.config/orchestrator/.env`. Never transmitted. The system validates connections before dispatch — missing credentials fail early, not midway.

### Tradeoffs (honesty)

- **Cost:** A 30-ticket sweep costs roughly $2-8 in tokens + API calls. A simple API verification costs ~$0.02. A full content review costs ~$0.15-0.40.
- **Speed:** A sweep takes 5-30 minutes depending on ticket complexity. Verified output is worth the wait, but simple one-off tasks may be faster done directly.
- **Security:** Credentials stored locally, skills are plain text, no cloud backend, no telemetry.
- **Verifier reliability:** Automated checks can't hallucinate. AI judgment checks can miss things. Evidence is always attached for spot-checking.

---

## The Documents

### README.md — The practical guide
- Follows last30days-skill patterns
- Scannable in 30 seconds
- Install → setup → usage → done
- Progressive integration unlocking
- Lean. No vision content. Points to VISION.md for depth.

### VISION.md — The depth document
- 15-slide deck format
- Narrative arc: Feel → Problem → Context → Solution → Proof → How → Trust → Rebound → Future
- Slide format forces clarity — can't hide behind walls of text
- This is the document to share, pitch from, and validate against
- Iterate on this with agent teams to refine the vision

### SKILL.md — The contract
- What the agent actually reads at runtime
- Commands: `/orchestrator sweep`, `/orchestrator status`, `/orchestrator review`, `/orchestrator setup`
- Ticket contract, verification model, domain skills, config paths, principles
- The skill IS the product

---

## Principles

These emerged from Max's messages and decisions across both sessions:

1. **"The agent that did the work never grades its own homework"** — the executor and the verifier are always different
2. **"Finishing beats starting"** — tickets closest to done get dispatched first
3. **"Fail visibly, not silently"** — nothing ships without passing verification. Blocked tickets include a reason.
4. **"Done is fail-closed: no evidence, no completion"** — you can't mark something done without proof
5. **"You define the boundaries. The system operates inside them"** — the operator sets the rules, the system follows them
6. **"Your ticket board is the single source of truth"** — not a database, not a config file, your board
7. **"Every failure becomes a rule"** — the system learns from mistakes and adds rules so they don't repeat
8. **"The skill IS the product"** — no CLI, no daemon, no server. A text file that turns any agent into an orchestrator.
9. **"Domain is a plugin, not a hardcoded assumption"** — any domain can be added by installing a skill
10. **"Slides keep us honest"** — the vision stays in deck format because it forces clarity

---

## Key Decisions and Why

### Skill-first, not CLI
**Decision:** No orchestrator binary. The SKILL.md is the product.
**Why:** "There is no orchestrator CLI, this is skill first framework, like /last30days." The orchestrator runs wherever your AI agent runs. It doesn't need its own runtime. It needs to be a text file that any agent can read and follow.

### Marketplace distribution, not git clone
**Decision:** Install via `/install marketplace maxtechera/orchestrator`
**Why:** "CC and OpenClaw installs should be through plugin/marketplace." This is how the ecosystem works. Skills are distributed through marketplaces. Git clone is a fallback, not the primary path.

### Open source, free, no monetization
**Decision:** MIT license, no hosted tier, no premium features.
**Why:** "We don't need pricing, this is opensource." The orchestrator is infrastructure for the ecosystem. Revenue comes from the businesses it enables, not from the tool itself.

### Board-agnostic, no default
**Decision:** Linear, GitHub Issues, Notion, Jira shown equally. No recommended default.
**Why:** "Linear is one implementation but any issue tracker would work." The system should be abstracted. Which board you use is a config choice, not an architectural decision.

### Reference patterns, don't name competitors
**Decision:** Mention harness engineering concepts once, in plain language. Never name Symphony.
**Why:** "Nobody knows what symphony, or alphaloop, or harness engineering is... but they do know Claude Code, OpenClaw." The audience is operators and builders, not researchers. Name what the pattern does, not who invented it.

### Everything v1.0 (with credible scope)
**Decision:** All domains, all integrations ship at v1.0. Metric-gate and cross-ticket deps moved to NEXT.
**Why:** "Everything will be in v1." Max wanted no artificial gating. The strategist agent refined this to avoid looking like vaporware — the core loop and skills ship now, genuinely harder engineering problems (async metric gates, DAG dependencies) are NEXT.

### 8 core + 4 starter templates (not "community")
**Decision:** Label the extra 4 skills as "starter templates," not "community-contributed."
**Why:** Both the operator and strategist agents flagged that "community-contributed" implies a community that doesn't exist yet. "Starter templates" is honest — they're maintained templates you can customize.

### Tradeoffs slide — honesty over marketing
**Decision:** Add a dedicated slide about cost, security, and verifier failure modes.
**Why:** Max chose "add a tradeoffs slide" over "skip for now" or "mention briefly." Transparency builds trust. The system is honest about its limits — AI verification is useful but not infallible, sweeps cost money, nothing is perfect on day one.

### Slides, not spec docs
**Decision:** VISION.md stays in slide format.
**Why:** "We still wanna do it in the form of slides — this keeps us honest and visual, practical, high level." The slide format is a discipline. It forces every point to have a headline, a claim, and evidence. Vague slides are obvious. Redundant slides are obvious.

### README follows last30days, VISION gets the depth
**Decision:** Two-document strategy with clear separation.
**Why:** "Keep the README structure following the best practices of last30days. You can show more and expand more on the VISION deck." The README is for the person who wants to install and use it in 5 minutes. The VISION is for the person who wants to understand why it exists and where it's going.

---

## The Iteration Process

Max's approach to refining the vision was distinctive:

1. **Spin up agent teams** — CTO, solopreneur, storyteller, investor, developer, agency, skeptic, CMO, COO, operator, strategist perspectives. Each team reviews from a different POV.

2. **Iterate in parallel** — multiple agents review simultaneously, then feedback is synthesized into a single prioritized change list.

3. **Paint the end state first** — "wanna make these slides have the vision and ideal state (painting the end state, then working backwards)." Start with what it looks like when it's working perfectly. Then explain the gap. Then show how to get there.

4. **Demand honesty** — "Update all agents POV with clear verificators and providing honest critical feedback." "Give me your honest critical feedback." Kind feedback is useless. The agents need to find what's broken.

5. **Slides keep you honest** — the deck format prevents hand-waving. If a slide is weak, it's obvious. If two slides say the same thing, it's obvious.

6. **The repo follows the vision** — "audit the current repo, remove anything that is not aligned with the current README and vision. Goal is to scrape the repo to start over based on the README and Vision." The documents are the north star. Code that doesn't serve them gets deleted.

---

## What Exists Today

"We have a working version of this glued together."

A glued-together version of the dispatch → execute → verify loop exists and has been used in production across multiple domains for 8+ weeks. Results: 14h/week → 2h/week supervision time, 8 → 31 tickets/week shipped, verification catch rate from 60% → 94%.

The repo (`github.com/maxtechera/orchestrator`) is the SPEC for the clean, open-source, multi-domain version. It contains:
- SKILL.md — the contract agents read
- README.md — public-facing practical guide
- docs/VISION.md — 15-slide vision deck
- docs/MAX_VISION.md — this document
- WORKFLOW.md — ticket lifecycle
- docs/STATE_MACHINE.md — ticket state transitions
- skills/ — domain skill directory
- examples/ — example workflow
- .env.example, .github/, LICENSE (MIT), SECURITY.md, CODE_OF_CONDUCT.md, CONTRIBUTING.md

---

## What's Next

"The goal now is to define the vision and final state to guide as we recreate the skills, setup scripts, sweep, etc."

The three north star documents (README, VISION, SKILL) define the destination. Implementation follows the spec:

1. **Build `/orchestrator sweep`** — the actual dispatch → verify → proof loop, implemented as a skill that reads SKILL.md
2. **Build `/orchestrator setup`** — board detection and integration validation wizard
3. **Create the 8 core skill repos** — `maxtechera/skill-content`, `maxtechera/skill-ecommerce`, etc.
4. **Create the 4 starter template repos** — `maxtechera/skill-support`, `maxtechera/skill-paid-ads`, etc.
5. **Publish to marketplace** — ClawdHub and Claude Code plugin marketplace
6. **Continue iterating on VISION.md** — the slide deck is a living document that evolves as the implementation teaches us what works

### Implementation: Deployment Modes per Platform

The same skill runs everywhere, but the automation loop differs by platform:

- **Claude Code** — manual `/orchestrator sweep` or Agent teams for parallel dispatch
- **OpenClaw** — cron (every 15 min), webhook on board events, or manual
- **Codex/Other** — platform-native scheduling, skill reads the same

This needs to be implemented:
- Cron/webhook setup in OpenClaw config
- Agent team spawning for parallel ticket dispatch in Claude Code
- Platform detection in `/orchestrator setup`
- Blocking vs background sweep behavior per platform

The destination: "One board. Any domain. Verified output. The operator's leverage finally scales."
