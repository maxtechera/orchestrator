---
name: orchestrator-skill-finance
description: "Finance domain skill. Composes memory Mode 1 for data capture and adds arithmetic verification, source citation rules, and payment API checks."
user-invocable: false
composes:
  - memory/SKILL.md (Mode 1)
---

# Finance Domain Skill

Adds arithmetic verification and financial data integrity rules. Invokes memory Mode 1 at completion to persist financial decisions and KPI baselines. Used when `/orchestrator sweep` matches a ticket to the finance domain.

## Composes

- [`memory/SKILL.md` Mode 1](https://github.com/maxtechera/memory/blob/main/SKILL.md) — session sync at completion to persist financial data, decisions, and KPI snapshots to the knowledge vault

## Domain Rules

- **Invoice required fields**: every invoice must include invoice number, issue date, due date, line items (description + quantity + unit price), subtotal, tax field (set to 0 if no tax — not omitted), total, and payment link or wire instructions.
- **Arithmetic**: invoice totals must match the sum of line items. Verification runs the arithmetic — do not trust the document's stated total.
- **KPI scorecards**: every number must cite its source and date range. "Revenue: $12,400" is not acceptable — "Revenue: $12,400 (Stripe, March 2026)" is.
- **No unsigned invoices**: invoices sent to clients must have sender name/company and contact info. Anonymous invoices are a verification failure.
- **Date ranges explicit**: every metric on a scorecard must have an explicit date range. "MoM growth" without dates is a verification failure.

## Verification Checklist

- [ ] Invoice arithmetic verified (line item sum = stated total)
- [ ] All required invoice fields present (number, dates, line items, tax, payment method)
- [ ] KPI sources cited for every metric (tool name + date range)
- [ ] Stripe/QuickBooks/Xero API confirmation of payment status (if ticket involves payment)
- [ ] No unsigned deliverables (sender info present)
- [ ] Date ranges explicit on every metric in scorecards
- [ ] `/memory sync` invoked at completion to persist financial snapshot
