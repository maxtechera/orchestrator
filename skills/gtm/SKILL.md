---
name: orchestrator-skill-gtm
description: "Go-to-market domain skill. Composes the full ship engine pipeline (intake → measure) + credentials preflight. The deepest composition in the suite."
user-invocable: false
composes:
  - ship/supervisors/engine/SKILL.md
  - ship/credentials/SKILL.md
---

# GTM Domain Skill

The full composition chain: orchestrator → gtm skill → ship engine supervisor → all stage supervisors. This skill delegates the entire GTM pipeline to ship's engine, while orchestrator handles dispatch, verification, and proof. Used when `/orchestrator sweep` matches a ticket to the gtm domain.

## Composes

- [`ship/supervisors/engine/SKILL.md`](https://github.com/maxtechera/ship/blob/main/supervisors/engine/SKILL.md) — full pipeline: intake → validate → strategy → awareness + lead-capture + nurture + closing (parallel) → launch → measure
- [`ship/credentials/SKILL.md`](https://github.com/maxtechera/ship/blob/main/credentials/SKILL.md) — credentials preflight gate before any deploy step

The composition chain:
```
orchestrator/skills/gtm/SKILL.md
  → ship/supervisors/engine/SKILL.md
    → ship/supervisors/{intake,validate,strategy}/SKILL.md   (sequential)
    → ship/supervisors/{awareness,lead-capture,nurture,closing}/SKILL.md  (parallel)
    → ship/supervisors/launch/SKILL.md
    → ship/supervisors/measure/SKILL.md
  → ship/credentials/SKILL.md  (preflight at /ship create + at launch)
```

`intake.product_type` drives which ship stage behaviors activate (especially `oss_tool` branches in strategy, nurture, closing).

## Domain Rules

- **All 4 parallel workstreams tracked**: awareness, lead-capture, nurture, and closing must all have Linear tickets and artifact links before the launch stage begins. Missing a workstream is a verification failure.
- **Launch checklist complete before announcement**: no public announcement, press, or social push until the launch readiness checklist is signed off.
- **Credentials preflight**: run `python3 credentials/scripts/check_local.py --json` before any deploy. Exit 1 = halt.
- **Critic gates**: Gate-V (validate), Gate-S (strategy lock), Gate-L (pre-launch) must all return PASS or have recorded human override before stage advancement.
- **Tracking verified end-to-end**: UTM → capture mechanism → ESP → GA4 chain must be tested before launch.

## Verification Checklist

- [ ] All 4 parallel workstream artifacts linked in Linear
- [ ] Credentials preflight passed (exit 0 from `check_local.py --json`)
- [ ] Gate-V, Gate-S, Gate-L all show critic PASS (or recorded human override)
- [ ] Launch readiness checklist complete and owner-approved
- [ ] UTM → capture → ESP → GA4 chain tested end-to-end
- [ ] No broad social publishing before Final Social Push approval
- [ ] Stage 8 (Measure) ticket created with baseline metrics captured at 24h post-launch
