---
name: orchestrator-skill-content
description: "Content production domain skill. Composes ship/content suite + memory Mode 1 and adds brand, format, and publication verification."
user-invocable: false
composes:
  - ship/content/SKILL.md
  - memory/SKILL.md (Mode 1)
---

# Content Domain Skill

Loads ship's full content suite (17 sub-skills) and adds orchestrator-level brand enforcement and publication verification. Used when `/orchestrator sweep` matches a ticket to the content domain.

## Composes

- [`ship/content/SKILL.md`](https://github.com/maxtechera/ship/blob/main/content/SKILL.md) — 17 sub-skills: copy, blog, video, image, distribution, broll, storyboard, talent, compose, waterfall, repurposing, multiplication, measure, feedback-loop, page, offer, form
- [`memory/SKILL.md` Mode 1](https://github.com/maxtechera/memory/blob/main/SKILL.md) — session sync at ticket completion to capture engagement metrics and execution learnings

## Domain Rules

- **Brand voice**: every piece must pass through `content-copy` brand voice check. No generic AI cadence phrases.
- **Carousel format**: images must be 1080×1350px (crop-safe). Feed carousels only — no square for feed.
- **Reel format**: hook must land within 0–3 seconds. CTA must appear in the final 3 seconds.
- **Newsletter**: subject line ≤50 characters. One CTA per email. No more than 3 sections.
- **Blog/SEO posts**: word count ≥1,500. Internal links ≥3. Meta title ≤60 chars.
- **All content**: publication proof required before Done (screenshot + live URL). No self-reported "done."

## Verification Checklist

Quality gate uses the v3 rubric (100-pt, 10 categories × 10). Threshold ≥75 to pass. One revise pass max.

| # | Category | What to check |
|---|----------|---------------|
| 1 | Brand voice | No flagged phrases, no generic AI cadence |
| 2 | Audience fit | Matches ICP signal from research guide |
| 3 | Hook strength | STEPPS ≥3/6, VE ≥100, matches viral pattern library |
| 4 | CTA + Hormozi | Two-part rule: Action + Reason-for-now both present |
| 5 | Offer framing | Value stack, risk reversal, urgency, dream outcome |
| 6 | Structural | Format complete, no missing sections |
| 7 | Guide alignment | Matches research guide angle and anti-patterns |
| 8 | Human-sounding | Zero Tier-1 AI words, varied sentence length, contractions, no rule-of-three |
| 9 | Format craft | Platform-specific: carousel cadence, reel first-10s hook, YT packaging, HN no-emoji |
| 10 | Verbatim/specificity | Real numbers and receipts — no unsubstantiated claims |

Publication checks (automated):
- [ ] Live URL resolves (HTTP 200)
- [ ] Screenshot of published content captured
- [ ] All links in the piece resolve (no broken links)
- [ ] Engagement baseline captured within 24h (views, reach, or open rate)
- [ ] `/memory sync` invoked at completion to persist performance data
