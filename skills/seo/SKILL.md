---
name: orchestrator-skill-seo
description: "SEO domain skill. Composes ship/content blog+page+distribution and adds technical SEO field rules and Lighthouse/GSC verification."
user-invocable: false
composes:
  - ship/content/skills/blog/SKILL.md
  - ship/content/skills/page/SKILL.md
  - ship/content/skills/distribution/SKILL.md
---

# SEO Domain Skill

Adds technical SEO validation and search-console verification on top of ship's blog, page, and distribution content skills. Used when `/orchestrator sweep` matches a ticket to the seo domain.

## Composes

- [`ship/content/skills/blog/SKILL.md`](https://github.com/maxtechera/ship/blob/main/content/blog/SKILL.md) — blog post structure and long-form writing
- [`ship/content/skills/page/SKILL.md`](https://github.com/maxtechera/ship/blob/main/content/page/SKILL.md) — landing page and CMS page structure
- [`ship/content/skills/distribution/SKILL.md`](https://github.com/maxtechera/ship/blob/main/content/distribution/SKILL.md) — publishing and indexing steps

## Domain Rules

- **Meta title**: ≤60 characters. Must contain the primary keyword.
- **Meta description**: ≤155 characters. Must be a complete sentence.
- **Structured data**: required for product pages (Product schema) and article pages (Article schema). Validate with schema.org validator before Done.
- **Canonical URL**: must be set on every published page. No duplicate-URL publishing.
- **Internal links**: ≥3 internal links per blog post pointing to related content or key conversion pages.
- **No broken links on publish**: all internal and external links in the piece must resolve before marking Done.
- **Word count**: ≥1,500 words for blog posts targeting informational keywords. ≥800 for product/landing pages.

## Verification Checklist

- [ ] Page returns HTTP 200
- [ ] Meta title present, ≤60 chars, contains primary keyword
- [ ] Meta description present, ≤155 chars
- [ ] Structured data present and valid (schema.org check)
- [ ] Canonical URL set
- [ ] Internal link count ≥3
- [ ] All links in the piece resolve (no 404s)
- [ ] Word count meets target (≥1,500 for posts, ≥800 for pages)
- [ ] Lighthouse SEO score ≥85
- [ ] GSC URL inspection submitted after indexing
