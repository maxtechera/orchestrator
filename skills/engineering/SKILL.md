---
name: orchestrator-skill-engineering
description: "Engineering domain skill. Composes memory Mode 3 for project memory sync and adds build/test/CI verification rules. Engineering is built-in agent capability."
user-invocable: false
composes:
  - memory/SKILL.md (Mode 3)
---

# Engineering Domain Skill

Engineering capability is built into the agent — this skill adds orchestrator-level verification rules and invokes memory Mode 3 at completion to persist architectural decisions. Used when `/orchestrator sweep` matches a ticket to the engineering domain (default for tickets with no other domain match).

## Composes

- [`memory/SKILL.md` Mode 3](https://github.com/maxtechera/memory/blob/main/SKILL.md) — sync `~/.claude/projects/` project memory to Obsidian vault at ticket completion, capturing architectural decisions and patterns

## Domain Rules

- **Build must pass**: the build command (whatever is in the ticket spec) must exit 0. No untested builds.
- **Tests must pass**: all tests must pass before Done. Failing tests are not acceptable even if the feature works manually.
- **Linter and type check**: linter must be clean. Type check must pass. No exceptions without explicit note in the ticket.
- **CI green before PR**: the PR must have a green CI run before requesting review. Do not ask for review on a red CI.
- **Manual test on staging**: a manual test on local or staging is required before marking Done. "It works on my machine" is not evidence — it must be documented.
- **No self-merge**: agents never merge their own PRs. A human merges. This is a hard guardrail per the orchestrator's WORKFLOW.md.
- **PR required**: no direct commits to main. Work happens on a feature branch with a PR.

## Verification Checklist

- [ ] Build log attached (exact command + output showing exit 0)
- [ ] Test results attached (test runner output showing all pass)
- [ ] Linter clean (output attached)
- [ ] Type check passes (output attached)
- [ ] CI status green on the PR (link to CI run attached)
- [ ] PR URL linked in ticket Artifacts
- [ ] Manual test evidence documented (what was tested, on what environment)
- [ ] No self-merge (PR left open for human review)
- [ ] `/memory sync` invoked at completion to persist architectural decisions via Mode 3
