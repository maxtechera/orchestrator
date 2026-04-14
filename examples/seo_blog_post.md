# Example: SEO — Publish Blog Post

Domain skill: `seo`

---

## Inputs
- Keyword brief: "AI agent verification" (primary keyword, informational intent)
- Brand voice guide (linked)
- 3 competitor URLs to reference structure (not copy)
- CMS credentials in `~/.config/orchestrator/.env`

## Deliverables
- [ ] Blog post published on CMS (WordPress / Webflow / Ghost)
- [ ] Title: contains "AI agent verification", ≤60 chars
- [ ] Meta description: ≤155 chars, complete sentence
- [ ] Structured data: Article schema set
- [ ] Canonical URL set
- [ ] Internal links: ≥3 pointing to related posts or key pages
- [ ] Word count: ≥1,500 words

## Verification
- Page returns HTTP 200
- Meta title ≤60 chars and contains primary keyword
- Meta description ≤155 chars
- Article structured data present and valid (schema.org)
- Canonical URL set and matches published URL
- Internal link count ≥3 (verified by parsing the live page)
- Word count ≥1,500
- Lighthouse SEO score ≥85
- All links in post resolve (no 404s)
- GSC URL inspection submitted

## Artifacts
- Published URL: [link]
- Screenshot of live page: [attached]
- Lighthouse report: [attached]
- GSC submission confirmation: [screenshot]
