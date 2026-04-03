# Orchestrator Workflow — Ticket Lifecycle

Complete reference for the ticket journey from pickup to Done. This document defines the canonical workflow for all agents executing work through Linear tickets.

**Canonical source**: This file. All agents follow this contract.

---

## Overview

Every ticket follows a strict 5-stage lifecycle:

1. **Intake / Pickup** — Validate contract, choose domain, set session label
2. **Execute** — Produce deliverables, keep artifacts canonical
3. **Verify** — Run checks, attach proof
4. **Transition State** — Move ticket through kanban states
5. **Comment Contract** — Every update includes status + next steps

---

## Stage 1: Intake / Pickup

**Goal**: Understand the ticket fully before starting work.

### 1.1 Read the Full Ticket

- Open the Linear ticket in full view.
- Read all sections: title, description, acceptance criteria, linked issues.
- Check for existing comments and context.
- Identify the requester and any stakeholders.

### 1.2 Validate Contract Sections

Every ticket MUST have these sections (or be rejected for rework):

```markdown
## Inputs
[What you're given: context, data, requirements, constraints]

## Deliverables
[What you must produce: files, links, reports, PRs, comments]

## Verification
[How to prove it's done: tests, checks, acceptance criteria]

## Artifacts
[Where proof lives: PR links, file paths, screenshots, URLs]
```

**If any section is missing**: Comment on the ticket:
```
status_summary: Contract incomplete — missing [SECTION]. Cannot proceed.
next_steps:
- Max: Add [SECTION] to ticket
- Fallback: Reject ticket, return to backlog
```

Then stop. Do not proceed without a complete contract.

### 1.3 Choose Execution Domain

Classify the ticket into ONE domain. This determines tooling, skill selection, and verification approach:

| Domain | Triggers | Tools | Verification |
|--------|----------|-------|--------------|
| **code** | Source file changes, config, dependencies, migrations | Git, LSP, tests, linters | Build passes, tests pass, linter clean |
| **research** | Market research, competitive analysis, technical investigation | Web search, Perplexity, xAI, knowledge base | Research report, sources cited, KB entry |
| **content** | Writing, editing, social posts, newsletters, scripts, captions | write-copy skill, humanize skill | Tone check, brand voice match, proof of posting |
| **design** | UI/UX, mockups, visual assets, Figma, Pencil | Figma, Pencil, design system | Design file link, component library, visual proof |
| **video** | Scripts, production, editing, Remotion, b-roll | reel-engine, content-video, Remotion | MP4 file, platform link, engagement metrics |
| **ops** | Infrastructure, cron jobs, deployments, system config | Railway, Render, OpenClaw gateway | Deployment logs, health check output, monitoring link |

**Example classification**:
- "Add authentication to API" → `code`
- "Research competitor pricing" → `research`
- "Write launch email" → `content`
- "Design landing page mockup" → `design`
- "Create product demo reel" → `video`
- "Deploy to production" → `ops`

### 1.4 Set Session Label

Create a session label for tracking:

```
session_label = ticket-<ID>
```

Example: `ticket-MAX-123`

This label appears in:
- OpenClaw session metadata
- Cron job logs
- Telegram notifications
- Session store

---

## Stage 2: Execute

**Goal**: Produce concrete, inspectable deliverables.

### 2.1 Produce Deliverables

Create exactly what the ticket asks for:

- **Code**: Source files, config changes, migrations
- **Research**: Report document, sources, KB entry
- **Content**: Draft copy, posted content, proof of publication
- **Design**: Figma file, component library, visual assets
- **Video**: MP4 file, platform link, metadata
- **Ops**: Deployment confirmation, config changes, monitoring setup

Keep all artifacts **inspectable and canonical**:
- Files in version control (git)
- Links in ticket comments
- Reports in shared drives
- Proof of publication in ticket artifacts section

### 2.2 For Code/Config Changes: Use Isolated Branch + PR

**MANDATORY**: Never commit directly to main/master.

1. **Create isolated git worktree**:
   ```bash
   git worktree add ../<ticket-id>-<slug> -b feat/<ticket-id>-<slug>
   ```
   Example: `git worktree add ../MAX-123-auth-api -b feat/MAX-123-auth-api`

2. **Make changes in the worktree**:
   ```bash
   cd ../<ticket-id>-<slug>
   # Edit files, commit, test
   git add .
   git commit -m "feat(auth): add JWT validation"
   ```

3. **Push to remote**:
   ```bash
   git push -u origin feat/<ticket-id>-<slug>
   ```

4. **Open PR** (agents open, humans merge):
   ```bash
   gh pr create --title "feat: <description>" --body "Closes #<ID>"
   ```

5. **Link PR in ticket**:
   - Add PR link to ticket Artifacts section
   - Update ticket state to `Code Review`

### 2.3 Keep Artifacts Canonical

- **Source of truth**: Git for code, Google Drive for docs, Linear for tickets
- **No duplicates**: One version of each artifact
- **Versioning**: Use git tags for releases, Drive version history for docs
- **Proof**: Always link to the canonical location, never paste full content

---

## Stage 3: Verify

**Goal**: Prove the work is done and correct.

### 3.1 Run Checks Defined by Ticket

Execute every check in the Verification section:

```markdown
## Verification
- [ ] Build passes: `pnpm build`
- [ ] Tests pass: `pnpm test`
- [ ] Linter clean: `pnpm lint`
- [ ] Type check: `tsc --noEmit`
- [ ] Manual test: Visit http://localhost:3000/feature
```

Run each check and capture output.

### 3.2 Attach Proof in Ticket Comments

Post a comment with evidence:

```markdown
## Verification Complete ✓

### Build
```
$ pnpm build
✓ Build succeeded (2.3s)
```

### Tests
```
$ pnpm test
✓ 42 tests passed
```

### Linter
```
$ pnpm lint
✓ No errors
```

### Manual Test
[Screenshot of feature working]

### Artifacts
- PR: https://github.com/maxtechera/max-techera-web/pull/123
- Build log: [attached]
```

**Never move to Done without proof.** If verification fails, fix and re-verify.

### 3.3 Lifecycle Hook: `on_verify`

Before marking Done:

1. Run all acceptance criteria
2. Capture evidence (commands, outputs, screenshots, URLs)
3. Post proof comment
4. Confirm no blockers remain

---

## Stage 4: Transition State

**Goal**: Move ticket through kanban states based on progress.

### 4.1 State Transitions

| Event | New State | Action |
|-------|-----------|--------|
| Pickup | `In Progress` | Set session label, begin work |
| PR opened | `Code Review` | Link PR, wait for review |
| PR merged | `QA` | Verification begins |
| All verification + artifacts complete | `Done` | Post final proof comment |
| Human decision/merge needed | `Blocked by Max` | Post exact unblock instruction |

### 4.2 Blocked by Max

Use this state when work is complete but requires human action:

```markdown
status_summary: Feature complete, awaiting merge approval.
next_steps:
- Max: Review PR #123 and merge when ready
- Fallback: If rejected, comment with changes needed
```

**Exact unblock instruction** (MANDATORY):
- What Max needs to do
- Where to find the work (PR link, file path, etc.)
- What happens after (merge, deploy, etc.)

### 4.3 Lifecycle Hook: `on_done`

When moving to Done:

1. Post final comment with proof pack
2. Link all artifacts (PR, files, reports, screenshots)
3. Confirm verification complete
4. Set state to `Done`

Example final comment:

```markdown
## ✓ Done

### Deliverables
- [x] API endpoint implemented
- [x] Tests added (42 new tests)
- [x] Documentation updated
- [x] Deployed to staging

### Proof
- PR: https://github.com/maxtechera/max-techera-web/pull/123
- Tests: https://github.com/maxtechera/max-techera-web/actions/runs/12345
- Staging: https://staging.maxtechera.dev/api/auth

### Verification
- Build: ✓ Passed
- Tests: ✓ 42 passed
- Linter: ✓ Clean
- Manual: ✓ Tested on staging

Ready for production merge.
```

---

## Stage 5: Comment Contract

**Goal**: Keep ticket state synchronized with reality.

### 5.1 Every Meaningful Update

Every comment that changes state or adds artifacts MUST include:

```markdown
status_summary: <what changed + current confidence>
next_steps:
- <owner>: <next concrete step>
- <owner>: <fallback/contingency>
```

### 5.2 Status Summary

Describe what changed and your confidence level:

```markdown
status_summary: Implemented JWT validation. High confidence — tests pass, manual testing complete.
```

```markdown
status_summary: Research complete, 5 competitors analyzed. Medium confidence — need Max review of pricing assumptions.
```

```markdown
status_summary: Blocked on API response format. Low confidence — waiting for backend team clarification.
```

### 5.3 Next Steps

Always specify:
- **Owner**: Who does the next action (you, Max, another agent, etc.)
- **Action**: Concrete, specific step
- **Fallback**: What happens if the action fails or is blocked

```markdown
next_steps:
- You: Run `pnpm test` and post results
- Fallback: If tests fail, debug and re-run
```

```markdown
next_steps:
- Max: Review PR #123 and approve or request changes
- Fallback: If rejected, I'll implement feedback and re-request review
```

```markdown
next_steps:
- Backend team: Clarify API response format for user object
- Fallback: I'll assume current format and add comment to PR for review
```

### 5.4 Never Output Status Chatter

Do NOT post comments without state/artifact/proof delta:

❌ **Bad**:
```
Working on this now...
```

❌ **Bad**:
```
Still investigating...
```

✅ **Good**:
```
status_summary: Investigated 3 approaches, chose approach B (lowest complexity). PR ready for review.
next_steps:
- Max: Review PR #123
- Fallback: If rejected, I'll implement feedback
```

---

## Domain Classification Reference

### Code Domain

**Triggers**:
- Source file changes (`.ts`, `.tsx`, `.js`, `.py`, etc.)
- Config changes (`next.config.ts`, `tailwind.config.ts`, etc.)
- Dependency updates (`package.json`, `pyproject.toml`, etc.)
- Database migrations
- Build/test configuration

**Tools**:
- Git (worktree, branch, PR)
- LSP (type checking, diagnostics)
- Linters (ESLint, Prettier, ruff)
- Test runners (Jest, pytest, Vitest)
- Build tools (Next.js, Turbopack, esbuild)

**Verification**:
- Build passes: `pnpm build`
- Tests pass: `pnpm test`
- Linter clean: `pnpm lint`
- Type check: `tsc --noEmit`
- Manual testing on local/staging

**Artifacts**:
- PR link
- Build logs
- Test results
- Type check output
- Screenshots of feature working

### Research Domain

**Triggers**:
- Market research
- Competitive analysis
- Technical investigation
- Customer discovery
- Trend analysis

**Tools**:
- Web search (Perplexity, xAI, Google)
- Knowledge base (semantic search)
- Research skill
- Gemini Deep Research

**Verification**:
- Sources cited (URLs, dates)
- Multi-source synthesis
- KB entry created
- Report structure complete

**Artifacts**:
- Research report (markdown)
- KB entry link
- Source spreadsheet
- Competitive matrix
- Trend analysis

### Content Domain

**Triggers**:
- Writing (blog posts, emails, scripts)
- Editing (copy review, tone adjustment)
- Social posts (Instagram, Twitter, LinkedIn)
- Newsletters
- Captions and descriptions

**Tools**:
- write-copy skill (voice matching)
- humanize skill (AI detection removal)
- brand-voice skill (tone guidelines)
- content-compose skill (pillar content)

**Verification**:
- Tone matches brand voice
- No AI detection patterns
- Proof of publication
- Engagement metrics (if posted)

**Artifacts**:
- Draft copy (markdown)
- Posted content link
- Screenshot of published post
- Engagement metrics

### Design Domain

**Triggers**:
- UI/UX mockups
- Visual assets
- Component design
- Design system updates
- Figma/Pencil files

**Tools**:
- Figma
- Pencil design system
- ui-design skill
- component-architecture skill

**Verification**:
- Design file link
- Component library updated
- Accessibility check (WCAG)
- Visual proof (screenshot)

**Artifacts**:
- Figma file link
- Component library link
- Design system documentation
- Visual assets (PNG, SVG)

### Video Domain

**Triggers**:
- Reel scripts
- Video production
- Editing
- Remotion compositions
- B-roll sourcing

**Tools**:
- reel-engine skill
- content-video skill
- Remotion
- FFmpeg
- text-overlay skill

**Verification**:
- MP4 file created
- Platform link (Instagram, YouTube)
- Engagement metrics
- Manual review

**Artifacts**:
- MP4 file
- Platform link
- Engagement metrics
- Script/storyboard

### Ops Domain

**Triggers**:
- Infrastructure changes
- Cron job setup/updates
- Deployments
- System configuration
- Monitoring setup

**Tools**:
- Railway CLI
- Render CLI
- OpenClaw gateway commands
- Terraform/IaC
- Monitoring dashboards

**Verification**:
- Deployment logs
- Health check output
- Monitoring alerts
- Service status

**Artifacts**:
- Deployment confirmation
- Config file link
- Monitoring dashboard link
- Health check output

---

## Branch/PR Lifecycle

### Branch Naming

Use conventional commit prefixes:

```
feat/<ticket-id>-<slug>     # New feature
fix/<ticket-id>-<slug>      # Bug fix
chore/<ticket-id>-<slug>    # Maintenance, config, docs
refactor/<ticket-id>-<slug> # Code refactoring
```

Examples:
- `feat/MAX-123-jwt-auth`
- `fix/MAX-456-null-pointer`
- `chore/MAX-789-update-deps`

### Worktree Pattern (Mandatory)

Every ticket = isolated worktree:

```bash
# Create worktree with branch
git worktree add ../<ticket-id>-<slug> -b feat/<ticket-id>-<slug>

# Work in the worktree
cd ../<ticket-id>-<slug>
# Make changes, commit, test

# Push to remote
git push -u origin feat/<ticket-id>-<slug>

# Open PR
gh pr create --title "feat: description" --body "Closes #<ID>"

# After merge, clean up
cd ..
git worktree remove <ticket-id>-<slug>
```

### PR Lifecycle

1. **Open**: Agent creates PR with description and acceptance criteria
2. **Review**: Human reviewer checks code, tests, documentation
3. **Approve**: Reviewer approves or requests changes
4. **Merge**: Human merges (agents never merge)
5. **Verify**: Agent verifies merge and runs post-merge checks
6. **Done**: Agent moves ticket to Done with proof

**Agents NEVER merge PRs.** This is a hard gate.

### Commit Message Format

Follow Conventional Commits:

```
<type>(<scope>): <subject>

<body>

<footer>
```

Examples:

```
feat(auth): add JWT validation

- Implement JWT token validation middleware
- Add tests for valid/invalid tokens
- Update API documentation

Closes #MAX-123
```

```
fix(api): handle null response in user endpoint

The user endpoint was not handling null responses from the database.
Added null check and return 404 instead.

Closes #MAX-456
```

---

## Lifecycle Hooks Summary

| Hook | When | What to Do |
|------|------|-----------|
| `on_pickup` | Ticket picked up | Set session label = `ticket-<ID>` |
| `before_execute` | Before starting work | Checkout branch, verify workspace clean |
| `after_execute` | After deliverables complete | Run checks defined by ticket, capture output |
| `on_verify` | Before marking Done | Run acceptance criteria, capture evidence |
| `on_done` | Moving to Done | Post final comment with proof pack |

---

## Guardrails (Non-Negotiable)

From `docs/GUARDRAILS.md`:

1. **Never merge agent-created PRs** — Only humans merge
2. **Never mark Done without evidence** — Proof required
3. **Never bypass human gates** on risky/irreversible actions
4. **Never mutate cron/jobs** from execution tickets unless explicitly scoped

---

## Quick Reference

### Pickup Checklist
- [ ] Read full ticket
- [ ] Validate contract (Inputs, Deliverables, Verification, Artifacts)
- [ ] Choose domain (code/research/content/design/video/ops)
- [ ] Set session label: `ticket-<ID>`

### Execute Checklist
- [ ] Create isolated worktree (code domain)
- [ ] Produce deliverables
- [ ] Keep artifacts canonical
- [ ] Open PR (code domain)

### Verify Checklist
- [ ] Run all checks from Verification section
- [ ] Capture proof (commands, outputs, screenshots)
- [ ] Post proof comment
- [ ] Confirm no blockers

### Transition Checklist
- [ ] Move state based on progress
- [ ] Use `Blocked by Max` with exact unblock instruction
- [ ] Post final proof comment before Done

### Comment Checklist
- [ ] Every update includes status_summary
- [ ] Every update includes next_steps
- [ ] No status chatter without state/artifact/proof delta

---

## Examples

### Example 1: Code Ticket (API Endpoint)

**Ticket**: MAX-123 — Add JWT validation to API

**Pickup**:
- Read ticket, validate contract ✓
- Domain: `code`
- Session label: `ticket-MAX-123`

**Execute**:
- Create worktree: `git worktree add ../MAX-123-jwt-auth -b feat/MAX-123-jwt-auth`
- Implement JWT validation middleware
- Add tests
- Commit: `feat(auth): add JWT validation`
- Push: `git push -u origin feat/MAX-123-jwt-auth`
- Open PR: `gh pr create --title "feat(auth): add JWT validation" --body "Closes #MAX-123"`

**Verify**:
- Run: `pnpm build` ✓
- Run: `pnpm test` ✓
- Run: `pnpm lint` ✓
- Post proof comment with outputs

**Transition**:
- State: `Code Review` (PR opened)
- State: `QA` (PR merged)
- State: `Done` (verification complete)

**Comment**:
```
status_summary: JWT validation implemented and tested. High confidence — all checks pass.
next_steps:
- Max: Review PR #123 and merge when ready
- Fallback: If rejected, I'll implement feedback
```

### Example 2: Research Ticket (Competitor Analysis)

**Ticket**: MAX-456 — Research competitor pricing

**Pickup**:
- Read ticket, validate contract ✓
- Domain: `research`
- Session label: `ticket-MAX-456`

**Execute**:
- Use research skill to analyze 5 competitors
- Create research report
- Add to knowledge base
- Capture sources

**Verify**:
- Report complete ✓
- Sources cited ✓
- KB entry created ✓
- Post proof comment with report link

**Transition**:
- State: `In Review` (report ready)
- State: `Done` (Max approves)

**Comment**:
```
status_summary: Analyzed 5 competitors, pricing matrix complete. Medium confidence — need Max review of assumptions.
next_steps:
- Max: Review competitor-pricing-report.md and approve or request changes
- Fallback: If rejected, I'll revise and re-submit
```

---

## See Also

- `skills/orchestrator/SKILL.md` — Unified orchestrator contract
- `docs/STATE_MACHINE.md` — Full state machine
- `docs/GUARDRAILS.md` — Hard rules
- `skills/orchestrator/SKILL.md` — Orchestrator skill reference
