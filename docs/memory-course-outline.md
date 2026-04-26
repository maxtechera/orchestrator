# /memory course outline, OSS tool course

## Course position in the ladder
- **Free offer:** `/memory` OSS tool
- **Paid offer:** `/memory course` at **$97**
- **Funnel:** GitHub star → install → friction point → README CTA → newsletter → course
- **Audience:** Claude Code users who installed `/memory`, can run setup, but still do not trust their memory system enough to rely on it in real work.

## The friction point this course solves
The install gets the hooks running, but the user still hits the same anxiety loop:

> "I installed it, the hooks fire, but I do not actually know what a *good* persistent-memory system looks like, what to save, how to structure the vault, when to sync, or how to keep it from turning into note sludge."

That is the course entry. The free tool solves **mechanics**. The course solves **operating model**.

### Install pain → paid transformation map
| Install friction after the OSS tool | What the course teaches instead |
|---|---|
| Hooks run, but the user cannot tell if memory quality is good or noisy | A practical rubric for what belongs in HOT, WARM, and COLD |
| User has an Obsidian vault, but no structure for durable recall | A repeatable 3-tier architecture with folder boundaries and sync rules |
| Sessions save data, but retrieval still feels random | Query patterns, wiki usage, and topic-file design for reliable recall |
| The user fears memory bloat and stale notes | TTL, dream cycle, pruning, and contradiction cleanup |
| The user can sync one session, but not a team or long-running project | A complete cross-session and cross-agent memory workflow |

## Course promise
Build a persistent-memory system for Claude Code that survives session boundaries, compaction, subagents, and long projects, without drowning in stale notes or giant context dumps.

## Core transformation
By the end of the course, the student goes from:
- "I installed `/memory`, but I am not sure what it is really doing"
- to
- "I have a working memory architecture, I know what each tier stores, I know when to sync, and I can recover project context across sessions on demand."

## Module breakdown

### Module 1. Why agents forget, and why naive note dumps fail
**Learning outcome:** Understand the real failure modes behind session amnesia, compaction loss, and context-window overload.

**Demo / exercise:**
- Run the same Claude Code task twice, once with no memory system and once with a minimal HOT layer.
- Identify where state gets lost: decisions, preferences, current task, and project boundaries.
- Write a simple "before memory / after memory" diagnostic for one real workflow.

### Module 2. The 3-tier architecture, HOT, WARM, COLD
**Learning outcome:** Design a memory stack where active context stays tiny, topic knowledge loads on demand, and permanent knowledge stays searchable instead of bloating every session.

**Demo / exercise:**
- Build a full `/memory` folder layout from scratch.
- Configure `MEMORY.md`, `SESSION-STATE.md`, `memory/topics/*.md`, and daily journals.
- Classify 20 sample facts into HOT, WARM, or COLD and explain why.

### Module 3. Hooks, setup, and the sync pipeline in real life
**Learning outcome:** Move beyond "the hooks fired" into a reliable sync loop that survives start, stop, compaction, and multi-session work.

**Demo / exercise:**
- Run `/memory setup`, inspect installed hooks, and trace what happens on session start, compaction, and session stop.
- Map the full detect → classify → write flow using one real project.
- Validate one sync report and fix one intentional misconfiguration.

### Module 4. Build a retrieval system that Claude can actually use
**Learning outcome:** Structure topics, journals, and wiki pages so future sessions can pull the *right* memory instead of dumping everything back into context.

**Demo / exercise:**
- Create three topic files, one daily journal, and one wiki page from a week of work.
- Practice queries for recent decisions, durable preferences, and project-specific rules.
- Refactor a noisy topic file into a usable retrieval surface.

### Module 5. Cross-session, cross-agent, cross-platform memory
**Learning outcome:** Use `/memory` as infrastructure for longer runs, helpers, and platform switching, not just a personal note bucket.

**Demo / exercise:**
- Simulate a parent session that spawns a helper and hand off enough state for clean continuation.
- Pass work from Claude Code to OpenClaw or another environment while preserving continuity.
- Build a memory checklist for one multi-day project.

### Module 6. Prevent memory rot, drift, and note sludge
**Learning outcome:** Keep the system trustworthy over time with TTL, audits, dream cycles, and contradiction cleanup.

**Demo / exercise:**
- Run a memory audit on a deliberately messy example.
- Expire stale topic entries, merge duplicates, and promote one durable insight into the wiki.
- Create a weekly maintenance cadence using `/memory dream` and `/memory audit`.

### Module 7. The full working system, from install to trusted recall
**Learning outcome:** Assemble the entire system into a repeatable setup the student can use daily for coding, research, and long-lived projects.

**Demo / exercise:**
- Set up a greenfield project with `/memory`.
- Run a two-session workflow separated by compaction or restart.
- Recover context cleanly in the second session without re-briefing Claude manually.

## Suggested delivery shape
- **Format:** 6 to 7 modules, short hands-on lessons
- **Teaching style:** show the memory system live, not as theory
- **Assets:** diagrams for tier boundaries, hook lifecycle, sync pipeline, and wiki flow
- **Outcome:** student leaves with a working persistent-memory setup, not just conceptual understanding

## README CTA copy
### Option A
Installed `/memory`, but still not sure what should live in memory and what should stay out?

The course shows the full system in action, HOT/WARM/COLD tiers, hooks, sync pipeline, wiki, and the maintenance loop that keeps memory useful instead of noisy.

**Join the `/memory` course →** Learn the operating model behind persistent Claude Code memory.

### Option B
`/memory` gives you the engine. The course gives you the operating model.

If setup worked but you still do not trust the system yet, the `/memory` course walks you through the exact architecture, retrieval patterns, and sync workflow behind a memory setup you can use every day.

**Get the course →** Build a persistent-memory system that actually survives real work.

## Newsletter CTA copy
### Option A
You installed `/memory`. Great. But the real unlock is not the install, it is knowing how to structure the system so Claude can recover the *right* context at the right time.

In the new `/memory` course, I break down the full setup, hooks, 3-tier architecture, sync pipeline, wiki flow, and the maintenance loop that keeps memory from turning into note sludge.

**Enroll here →** Build your persistent-memory system for Claude Code.

### Option B
Most people stop after `/memory setup`.

That gets the hooks running. It does **not** teach you what to store, how to organize the tiers, how to query old work, or how to keep the system clean when projects get long.

That is exactly what the `/memory` course covers.

**See the course →** From install to trusted recall.
