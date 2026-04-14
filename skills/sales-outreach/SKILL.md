---
name: orchestrator-skill-sales-outreach
description: "Sales outreach domain skill. Composes ship/content copy + lead-capture + nurture supervisors and adds sequence compliance and ESP verification."
user-invocable: false
composes:
  - ship/content/skills/copy/SKILL.md
  - ship/supervisors/lead-capture/SKILL.md
  - ship/supervisors/nurture/SKILL.md
---

# Sales Outreach Domain Skill

Adds sequence compliance rules and ESP-level verification on top of ship's copy, lead-capture, and nurture skills. Used when `/orchestrator sweep` matches a ticket to the sales-outreach domain.

## Composes

- [`ship/content/skills/copy/SKILL.md`](https://github.com/maxtechera/ship/blob/main/content/copy/SKILL.md) — email copy, subject lines, and CTAs
- [`ship/supervisors/lead-capture/SKILL.md`](https://github.com/maxtechera/ship/blob/main/supervisors/lead-capture/SKILL.md) — lead sourcing, opt-in wiring, and capture mechanics
- [`ship/supervisors/nurture/SKILL.md`](https://github.com/maxtechera/ship/blob/main/supervisors/nurture/SKILL.md) — email sequence structure and content drip

## Domain Rules

- **Minimum sequence length**: ≥3 touches with defined spacing. Minimum cadence: day 1, day 3, day 7. Single-touch sequences are not Done.
- **Subject line variants**: ≥2 A/B subject line variants required per send. No single subject line going to the full list without a variant.
- **Compliance**: every email must have a working unsubscribe link and physical address. CAN-SPAM and GDPR required — not optional.
- **Bounce rate gate**: Apollo/ESP bounce rate must be ≤5% before any send. Run the check; do not assume.
- **Personalization**: first-name or company-name merge tag required in at least the subject line or first sentence of every cold email.

## Verification Checklist

- [ ] Sequence imported to ESP (MailerLite, Apollo, or equivalent) — not just drafted
- [ ] Test email received and rendered correctly (text + links + images)
- [ ] Unsubscribe link present and functional in every email
- [ ] Physical address present in footer
- [ ] Subject line A/B variants set
- [ ] Bounce rate check run against Apollo/ESP list (≤5% before send)
- [ ] All UTM-tagged links resolve
- [ ] Spacing between touches matches spec (day 1 / day 3 / day 7 minimum)
