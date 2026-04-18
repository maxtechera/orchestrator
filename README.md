# /orchestrator

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](CHANGELOG.md)

**Orchestrator keeps AI teams from going idle, drifting, or claiming progress without proof. It runs ticket-driven execution with an independent verification harness, so work only moves forward when there is real evidence, not just a confident status update.**

Claude Code:
```bash
/plugin marketplace add maxtechera/orchestrator
```

OpenClaw:
```bash
clawhub install orchestrator
```

Zero config. Run `/orchestrator sweep` immediately. If no board is connected, the setup flow will tell you what to connect next.

---

## Why teams install it

Most agent teams do one of two bad things: they go idle and wait for instructions, or they keep talking like work is done when nobody has verified the artifact. Orchestrator fixes both by pulling from a ticket board, dispatching the right worker, and requiring a proof pack before anything can be treated as complete.

**Core pattern:** ticket contract (Inputs / Deliverables / Verification / Artifacts) → worker execution → independent verifier → evidence posted back to the ticket.

---

## Core concepts

| Concept | What it means | Why it matters |
|---|---|---|
| Sweep mode | A supervisor scans actionable tickets and dispatches focused workers one by one. | Best for backlog burn-down, inbox triage, and single-ticket execution. |
| Team mode | A coordinator runs a small specialist team around one sprint or outcome. | Best for multi-step launches, code plus QA, or content pipelines. |
| Proof pack | A result bundle with artifacts, links, command output, screenshots, and verification notes. | Prevents "done" theater and makes handoffs reviewable. |
| Guardrails | State rules, repo rules, proof requirements, and human-decision boundaries. | Keeps agents useful without letting them invent completion. |

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

If a board is already connected, Orchestrator starts dispatching actionable tickets. If not, it points you to `/orchestrator setup` and validates the connection before work begins.

### Example ticket contract

Paste this into any Linear, GitHub Issues, Notion, or Jira ticket:

```md
## Inputs
Keyword brief "AI agent verification", brand voice guide, 3 competitor URLs

## Deliverables
Blog post published on CMS, meta tags set, internal links added

## Verification
Page returns 200, word count > 1,500, SEO score green, no brand violations

## Artifacts
Published URL, screenshot of live page
```

---

## Usage

```bash
/orchestrator sweep                            Process all actionable tickets
/orchestrator sweep TICKET-046                 Re-run a single ticket
/orchestrator team                             Run a parallel specialist team for one sprint
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

---

## Domain coverage

| Domain | Typical deliverable | Typical proof pack contents |
|---|---|---|
| Code | PR against target repo, migration, bug fix, shipped feature | PR URL, tests, screenshots, changed files |
| Research | Memo, source pack, recommendation doc | Artifact path, cited sources, summary |
| Content | Draft, newsletter, landing page, publish-ready asset | Doc path, rendered preview, approval notes |
| Design | Mock, component update, visual system change | Image links, screenshots, affected surface |
| Video | Script, edit package, render output | Render path, review link, export proof |
| Ops | Config change, runbook, automation patch | Command output, logs, runtime path |

Domain skills extend the base harness with specialized verification rules. Examples: `maxtechera/skill-content`, `maxtechera/skill-ecommerce`, and `maxtechera/skill-seo`.

---

## How it works

Three steps, every ticket:

1. **Dispatch**: read the board, prioritize by proximity to done, match the domain skill, validate integrations, dispatch a worker.
2. **Verify**: run a separate verification pass with fresh context. The agent that did the work never grades its own homework.
3. **Prove**: post the verification report and artifacts back to the ticket. Pass moves forward. Partials go to review. Fails retry or escalate with a clear reason.

The harness is the invariant. Workers can change. The verification contract does not.

---

## Team mode

Use `/orchestrator team` when you have a sprint with multiple related tickets and different roles.

A typical roster looks like this:

| Agent | Focus |
|---|---|
| Builder | Feature code, integrations, implementation |
| Designer | UI, landing pages, copy |
| Tester | Verification, regression, E2E checks |
| Strategist | Positioning, content, sequencing |
| Analyst | Metrics, attribution, funnel validation |

Sweep mode is sequential and ticket-focused. Team mode is parallel and outcome-focused. Independent verification still applies in both.

---

## Guardrails

These are operational rules, not marketing claims.

- **No evidence, no done.** Status-only updates never count as completion.
- **The executor and verifier must be different.** The agent that did the work cannot approve itself.
- **Use the exact target repo or delivery surface.** Clean work in the wrong place is still wrong.
- **`Blocked by Max` is for real human decisions only.** It is not a parking lot for incomplete execution.
- **Fail visible.** If verification is partial or missing, the ticket stays reviewable instead of silently advancing.
- **Accumulate rules from real failures.** When the same mistake repeats, the harness hardens.

---

## Setup and integrations

Run:

```bash
/orchestrator setup
```

The setup flow detects your environment, connects your issue tracker, and validates integrations. Supported board providers include:

- Linear
- GitHub Issues
- Notion
- Jira

Optional integrations extend verification depth for specific domains, including Shopify, MailerLite, Apollo, Meta Ads, Google Ads, HubSpot, Stripe, QuickBooks, Xero, Zendesk, MercadoLibre, and Instagram.

If you prefer manual configuration:

```bash
mkdir -p ~/.config/orchestrator && chmod 700 ~/.config/orchestrator
```

Then add to `~/.config/orchestrator/.env`:

```bash
BOARD_PROVIDER=linear
LINEAR_API_KEY=lin_api_xxxxx
```

Config locations:

```bash
~/.config/orchestrator/.env       # API keys and credentials
~/.orchestrator/skills/           # Installed domain skill files
~/.orchestrator/rules/            # Accumulated operational rules
~/.orchestrator/history/          # Outcome logs for self-improvement
```

---

## Example verification report

```md
## Verification Report — TICKET-043

Status: PASS ✓

Checks:
  ✓ Page returns 200
  ✓ Word count: 1,847 > 1,500
  ✓ SEO score: 92/100, green
  ✓ Meta title set, under 60 chars
  ✓ og:image present and resolves
  ✓ 3 internal links found
  ✓ Brand voice check: consistent, no violations

Evidence:
  - Screenshot: live page captured
  - Lighthouse report: attached
  - All links validated: 3/3 resolve

Result: PASS — moved to Done
```

---

## What this repo contains

```text
orchestrator/
  SKILL.md                        # Core orchestrator skill
  WORKFLOW.md                     # Ticket lifecycle
  .claude-plugin/                 # Claude Code marketplace manifests
  .codex-plugin/                  # Codex CLI discovery
  .agents/                        # OpenCode/OpenClaw skill discovery
  gemini-extension.json           # Gemini CLI extension manifest
  .clawhubignore                  # Distribution exclusions
  .env.example                    # Configuration variables
  docs/                           # Vision and state-machine docs
  examples/                       # Example workflows and tickets
  skills/                         # Domain skill directory
```

## Principles

- Your ticket board is the single source of truth
- Finishing beats starting
- The verification harness rules completion
- The system fails visibly, not silently
- You define the boundaries, the system operates inside them

Read the full vision: [docs/VISION.md](docs/VISION.md)

## License

MIT
