# Example: GTM — Product Launch (oss_tool)

Domain skill: `gtm`

This ticket fans out to all 4 parallel workstreams via ship's engine supervisor. `product_type: oss_tool` activates OSS-specific behavior in strategy, nurture, and closing stages.

---

## Inputs
- Product: `/orchestrator` open source skill (github.com/maxtechera/orchestrator)
- `product_type`: `oss_tool`
- Install command: `git clone https://github.com/maxtechera/orchestrator.git ~/.claude/skills/orchestrator`
- Course upsell URL: TBD (to be created in closing stage)
- Friction point: users don't know how to write the ticket contract (Inputs/Deliverables/Verification/Artifacts)
- Conversion goal: `github_star` (primary), `newsletter` (secondary)
- ICP: operators running AI agents in Claude Code, Codex, or OpenClaw — tired of manually QA-ing agent output
- Linear run ticket: [created by `/ship create`]

## Deliverables

### Parallel workstream deliverables (ship engine stages 5A–5D):
- [ ] **Awareness**: reel series (3 reels showing orchestrator in action), GitHub README CTA, HN Show HN post draft
- [ ] **Lead Capture**: newsletter signup at `/tools/orchestrator` (email = star = course notification)
- [ ] **Nurture**: 3-email welcome sequence (day 0: welcome; day 3: how verification works; day 7: course CTA)
- [ ] **Closing**: course sales page at `/tools/orchestrator/course` — one price, no trial

### Launch deliverables (stage 6–7):
- [ ] Pre-launch readiness checklist (all 4 workstreams linked)
- [ ] Owner approval posted as Decision Packet
- [ ] Final social push package (3 reels + HN post + GitHub README CTA — scheduled)
- [ ] Directory submission list (Product Hunt, OpenClaw marketplace, etc.)

## Verification
- Credentials preflight passed: `check_local.py --json` exit 0
- Gate-V, Gate-S, Gate-L all show critic PASS (or recorded human override)
- All 4 workstream artifacts linked in Linear
- UTM → newsletter signup → MailerLite → nurture sequence chain tested end-to-end
- Reel content matches `oss_tool` conversion goal (GitHub star CTA, not buy CTA)
- Course page live and checkout tested before launch approval
- GitHub README install section updated with correct install command
- HN Show HN post drafted and owner-approved before submission

## Artifacts
- Linear run ticket: [link]
- Stage completion links: [per stage]
- Pre-launch checklist: [link]
- Final social push package: [link]
- Launch URLs (live after stage 7): [list]
