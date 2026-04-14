# Example: E-commerce — Shopify Spring Sale Price Update

Domain skill: `ecommerce`

---

## Inputs
- Shopify store URL and access token in `~/.config/orchestrator/.env`
- Collection: "Spring Sale" (handle: `spring-sale`)
- Price list: 12 products with new prices and compare-at prices (linked CSV)
- Sale end date: April 30, 2026

## Deliverables
- [ ] All 12 products updated with correct sale prices (per CSV)
- [ ] Compare-at prices set on all 12 products (showing original price)
- [ ] All products added to "Spring Sale" collection
- [ ] Collection sort order set to "Best Selling"
- [ ] All product images: ≥3 per product

## Verification
- Shopify API: price matches CSV spec for all 12 products (exact match)
- Shopify API: compare-at price set (not null) on all 12 products
- Shopify API: all 12 products present in "Spring Sale" collection
- Shopify API: collection sort order = "best-selling"
- All product pages return HTTP 200
- Screenshot of live storefront "Spring Sale" collection page captured

## Artifacts
- Shopify API verification log: [attached]
- Screenshot of collection page: [attached]
- Updated product URLs: [list]
