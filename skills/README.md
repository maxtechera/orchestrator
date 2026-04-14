# Domain Skills

Domain skills give agents expertise in a specific domain. Each skill is a **composition wrapper** — it loads the right capabilities from [`maxtechera/ship`](https://github.com/maxtechera/ship) and [`maxtechera/memory`](https://github.com/maxtechera/memory), then adds only what's unique: domain rules and verification checklists.

Install `maxtechera/ship` and `maxtechera/memory` first. The domain skill then activates their capabilities for orchestrator verification.

A skill file contains four things:
1. **Composes** — which ship/memory skills this domain loads
2. **Domain Rules** — what this domain adds that the composed skills don't cover
3. **Verification Checklist** — the unique verification steps for this domain
4. **Install path**: drop into `~/.orchestrator/skills/`

---

## Available Skills

| Skill | Composes from | File |
|-------|---------------|------|
| Content production | `ship/content/` (17 sub-skills), `memory` Mode 1 | [content/SKILL.md](content/SKILL.md) |
| E-commerce operations | `ship/content/copy`, `image`, `page` | [ecommerce/SKILL.md](ecommerce/SKILL.md) |
| SEO | `ship/content/blog`, `page`, `distribution` | [seo/SKILL.md](seo/SKILL.md) |
| Sales outreach | `ship/content/copy`, `ship/supervisors/lead-capture`, `nurture` | [sales-outreach/SKILL.md](sales-outreach/SKILL.md) |
| Financial reporting | `memory` Mode 1 | [finance/SKILL.md](finance/SKILL.md) |
| Growth / paid acquisition | `ship/supervisors/awareness`, `lead-capture`, `ship/content/measure` | [growth/SKILL.md](growth/SKILL.md) |
| Go-to-market launches | `ship/supervisors/engine` (full pipeline), `ship/credentials` | [gtm/SKILL.md](gtm/SKILL.md) |
| Engineering | `memory` Mode 3 | [engineering/SKILL.md](engineering/SKILL.md) |

## Writing Your Own

A skill is a text file following the structure in each `SKILL.md` above. Install custom skills by dropping them into `~/.orchestrator/skills/`.
