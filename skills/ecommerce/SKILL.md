---
name: orchestrator-skill-ecommerce
description: "E-commerce operations domain skill. Composes ship/content copy+image+page and adds Shopify-specific field validation and API verification."
user-invocable: false
composes:
  - ship/content/skills/copy/SKILL.md
  - ship/content/skills/image/SKILL.md
  - ship/content/skills/page/SKILL.md
---

# E-commerce Domain Skill

Adds Shopify product field validation and live API verification on top of ship's copy, image, and page content skills. Used when `/orchestrator sweep` matches a ticket to the ecommerce domain.

## Composes

- [`ship/content/skills/copy/SKILL.md`](https://github.com/maxtechera/ship/blob/main/content/copy/SKILL.md) — product description copy and CTA writing
- [`ship/content/skills/image/SKILL.md`](https://github.com/maxtechera/ship/blob/main/content/image/SKILL.md) — product image spec and asset handling
- [`ship/content/skills/page/SKILL.md`](https://github.com/maxtechera/ship/blob/main/content/page/SKILL.md) — landing and product page structure

## Domain Rules

- **Required fields on every product**: title, description, price, compare-at price field (set or explicitly cleared), ≥3 images, SEO meta title ≤60 chars, meta description ≤155 chars, variant inventory set.
- **Compare-at price**: must be cleared (set to null/empty) when item is NOT on sale. A leftover compare-at price on a non-sale item is a pricing error.
- **Collection sort order**: always confirm collection sort order after any product or collection update. Do not assume it is unchanged.
- **Inventory**: variant inventory must be set on all SKUs before marking Done. Zero-inventory items should be explicitly set, not left null.
- **Pricing changes**: verify price matches the ticket spec exactly — exact match, not approximate.

## Verification Checklist

- [ ] Shopify API call confirms price matches ticket spec (exact match)
- [ ] Compare-at price state matches ticket spec (set if on sale, cleared if not)
- [ ] Image count ≥3 on the product
- [ ] Product page returns HTTP 200
- [ ] Variant inventory is set on all SKUs
- [ ] SEO meta title ≤60 chars and meta description ≤155 chars
- [ ] Collection sort order confirmed after any collection changes
- [ ] Screenshot of live storefront product page captured
