---
name: orchestrator-skill-growth
description: "Growth domain skill. Composes ship/supervisors/awareness + lead-capture + ship/content/measure and adds UTM, A/B, and GA4 conversion verification."
user-invocable: false
composes:
  - ship/supervisors/awareness/SKILL.md
  - ship/supervisors/lead-capture/SKILL.md
  - ship/content/skills/measure/SKILL.md
---

# Growth Domain Skill

Adds UTM hygiene, A/B testing requirements, and GA4 conversion event verification on top of ship's awareness, lead-capture, and measure skills. Used when `/orchestrator sweep` matches a ticket to the growth domain.

## Composes

- [`ship/supervisors/awareness/SKILL.md`](https://github.com/maxtechera/ship/blob/main/supervisors/awareness/SKILL.md) — content assets, channel execution, and distribution
- [`ship/supervisors/lead-capture/SKILL.md`](https://github.com/maxtechera/ship/blob/main/supervisors/lead-capture/SKILL.md) — opt-in mechanics, lead magnets, and conversion wiring
- [`ship/content/skills/measure/SKILL.md`](https://github.com/maxtechera/ship/blob/main/content/measure/SKILL.md) — attribution, reporting, and metric capture

## Domain Rules

- **UTM required before launch**: every campaign link must have UTM parameters (`utm_source`, `utm_medium`, `utm_campaign`) set before any traffic is sent. Launching without UTMs is a verification failure.
- **A/B test control variant required**: any A/B test must have a live control variant running simultaneously. A test without a control is not a test.
- **Referral loop**: every referral campaign must have a tracked share URL (unique per referrer or at minimum unique per campaign). Untracked referral links are a verification failure.
- **Conversion event before campaign**: the GA4 conversion event must be named, wired, and verified firing before the campaign goes live. No retroactive event setup.
- **Ad creative dimensions**: ad creatives must match the exact platform spec (e.g. Meta feed 1080×1350, Stories 1080×1920, Google responsive). Mis-sized creatives are caught in verification.

## Verification Checklist

- [ ] UTM links resolve and are tagged correctly (source/medium/campaign)
- [ ] GA4 real-time confirms conversion event fires on test click-through
- [ ] A/B control variant is live (not just drafted)
- [ ] Referral share URL is tracked and unique to campaign
- [ ] Ad creative dimensions match platform spec
- [ ] Landing page conversion event fires (GA4 real-time check)
- [ ] Campaign is paused or not yet live until all above pass
