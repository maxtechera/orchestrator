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

- [ ] Live URL resolves (HTTP 200)
- [ ] Screenshot of published content captured
- [ ] Brand voice check passed (no flagged phrases)
- [ ] Format spec met (dimensions/word count/subject length per format)
- [ ] All links in the piece resolve (no broken links)
- [ ] Engagement baseline captured within 24h of publish (views, reach, or open rate)
- [ ] `/memory sync` invoked at completion to persist performance data
