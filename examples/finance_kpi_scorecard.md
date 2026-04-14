# Example: Finance — Monthly KPI Scorecard

Domain skill: `finance`

---

## Inputs
- Stripe API key in `~/.config/orchestrator/.env`
- GA4 property ID in `~/.config/orchestrator/.env`
- Reporting period: March 2026 (2026-03-01 to 2026-03-31)
- KPI targets from last month's scorecard (linked)
- Template: monthly KPI scorecard (linked Google Doc or Notion page)

## Deliverables
- [ ] KPI scorecard populated with March 2026 actuals:
  - Revenue (Stripe, March 2026)
  - MRR and MoM growth (Stripe)
  - New customers (Stripe)
  - Churn rate (Stripe, calculated)
  - Website sessions (GA4, March 2026)
  - Trial-to-paid conversion rate (Stripe + GA4)
- [ ] Each metric cited with source and date range
- [ ] MoM deltas calculated vs. February 2026 actuals
- [ ] Scorecard shared with team (link posted to ticket)

## Verification
- Invoice arithmetic: every calculated total verified (MoM delta, conversion rate, etc.)
- Stripe API: revenue and customer counts match scorecard values
- GA4: session count matches scorecard value
- All metrics have source and date range cited (e.g. "Stripe, 2026-03-01–2026-03-31")
- No unsigned or undated metrics
- `/memory sync` invoked to persist March 2026 baseline to vault

## Artifacts
- Scorecard link: [Google Doc / Notion URL]
- Stripe export screenshot: [attached]
- GA4 export screenshot: [attached]
