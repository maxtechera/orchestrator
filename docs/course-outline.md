# /orchestrator course outline

**Course:** /orchestrator — Run reliable multi-agent workflows in 1 week  
**Price:** $197  
**Format:** Mixed (video lessons, text workbooks, cloneable `/orchestrator` skill templates)  
**Audience:** Claude Code users who already write single-agent workflows and want to scale to parallel, reliable, multi-agent teams  
**Outcome promise:** Run reliable, parallel multi-agent workflows in 1 week, without losing context, duplicating work, or watching agents drift.

## Course entry friction
Students already get useful output from a single coding agent, but the moment they try to split work across multiple agents, the system breaks. Context gets lost, two agents do the same task, handoffs are vague, and nobody knows what “done” means. The course is designed to solve that exact jump: single-agent competence to reliable multi-agent orchestration.

## Who this is for
- Indie developers building with Claude Code or similar coding agents
- AI-forward engineers who want parallel execution without chaos
- Small agencies turning ad hoc prompting into a repeatable delivery system
- Operators who need verification, handoffs, and predictable outputs across agent teams

## Transformation
By the end of the course, students will be able to:
1. Diagnose when a single-agent workflow is enough and when orchestration is required
2. Write ticket contracts that constrain agents and reduce drift
3. Spawn parallel and sequential agent teams with clear merge boundaries
4. Preserve context across sessions with durable memory and handoff discipline
5. Add reliability layers like critics, retries, and human approval gates
6. Run `/orchestrator` as a repeatable production workflow instead of a one-off demo

## Course structure
- **Modules:** 6
- **Target lesson count:** ~30 lessons
- **Per-module pattern:** 1 hook, 3 to 5 teach lessons, 1 to 2 apply lessons
- **Delivery assets:** lesson videos, workbooks, checklists, reusable templates

---

## Module 1 — Why single-agent breaks (and what multi-agent fixes)
**Learning outcome:** Students understand the limits of single-agent workflows, recognize the failure modes that appear at scale, and know when orchestration becomes necessary.

### Hook
- **Lesson 1.1:** The context-limit wall and why single-agent workflows break

### Teach
- **Lesson 1.2:** Four operating patterns, single, sequential, parallel, hierarchical
- **Lesson 1.3:** The three signals that tell you it is time to scale beyond one agent
- **Lesson 1.4:** Failure modes, context loss, duplicate work, drift, and invisible blockers

### Apply
- **Lesson 1.5:** Audit your current workflow and mark parallelization opportunities

### Demo / exercise
Students map one real workflow they already run, identify where the agent loses context, and select one candidate task to split into multiple executors.

---

## Module 2 — Ticket Contracts, the orchestrator primitive
**Learning outcome:** Students can write ticket contracts that define deliverables, proof, and acceptance criteria tightly enough for delegated execution.

### Hook
- **Lesson 2.1:** Why agents without contracts drift

### Teach
- **Lesson 2.2:** Ticket contract anatomy, inputs, outputs, proof, and failure states
- **Lesson 2.3:** Deliverables versus proof, what the agent makes versus how it proves completion
- **Lesson 2.4:** Acceptance criteria that survive handoffs and verification
- **Lesson 2.5:** Writing handoff-ready tickets for build, verify, and publish paths

### Apply
- **Lesson 2.6:** Write a contract for a repo task
- **Lesson 2.7:** Write a contract for a content or launch task

### Demo / exercise
Students produce two real ticket contracts from their own backlog and score them against a drift-prevention checklist.

---

## Module 3 — Spawning agent teams (parallel versus sequential)
**Learning outcome:** Students can choose the right execution pattern, spawn multi-agent work safely, and merge outputs without collisions.

### Hook
- **Lesson 3.1:** The coordinator and executor pattern

### Teach
- **Lesson 3.2:** Coordinator ↔ executor in 20 minutes
- **Lesson 3.3:** When to run parallel, when to run sequential
- **Lesson 3.4:** Merge strategies, scoped ownership, stitched outputs, and arbitration
- **Lesson 3.5:** Fleet patterns, worktree isolation, and branch hygiene

### Apply
- **Lesson 3.6:** Run a 3-executor parallel task and merge the outputs

### Demo / exercise
Students launch a coordinator with three executors, each with a narrow scope, then merge the outputs into one final artifact with no overlapping ownership.

---

## Module 4 — Memory, context, and handoff
**Learning outcome:** Students can preserve state across long-running work and keep multi-session tasks coherent.

### Hook
- **Lesson 4.1:** The silent context loss problem

### Teach
- **Lesson 4.2:** The 3-tier memory model for agent teams
- **Lesson 4.3:** Session state, handoff docs, and durable operating context
- **Lesson 4.4:** SESSION-STATE, pre-compact discipline, and recovery after interruption
- **Lesson 4.5:** Designing memory flows for multi-session work

### Apply
- **Lesson 4.6:** Build a persistent memory flow across a 2-session task

### Demo / exercise
Students run one task across two sessions using memory notes, session state, and a formal handoff document.

---

## Module 5 — Reliability patterns (retries, guardrails, critics)
**Learning outcome:** Students can make agents check themselves, retry safely, and stop at the right human gate.

### Hook
- **Lesson 5.1:** Agents that check their own work, but do not grade it alone

### Teach
- **Lesson 5.2:** Critic evaluators and rubric-driven review
- **Lesson 5.3:** Retry policies, bounded loops, and fail-fast triggers
- **Lesson 5.4:** Human-in-the-loop gates for risky or taste-sensitive tasks

### Apply
- **Lesson 5.5:** Add a critic and retry loop to your orchestrator

### Demo / exercise
Students wire a critic pass into a real orchestration flow and tune retry logic so the system improves instead of looping forever.

---

## Module 6 — Production orchestration (monitoring, cost, scale)
**Learning outcome:** Students can operate `/orchestrator` as a daily driver with visibility, cost awareness, and recurring execution.

### Hook
- **Lesson 6.1:** From demo to daily driver

### Teach
- **Lesson 6.2:** Monitoring runs, statuses, and bottlenecks
- **Lesson 6.3:** Cost attribution and choosing the right model for each job
- **Lesson 6.4:** Model routing with `/model-router`
- **Lesson 6.5:** Cron dispatch, pause and resume, and recurring workflows

### Apply
- **Lesson 6.6:** Deploy your orchestrator as a recurring workflow

### Demo / exercise
Students turn one manual weekly workflow into an orchestrated recurring system with clear monitoring and escalation points.

---

## Lesson inventory summary
- **Module 1:** 5 lessons
- **Module 2:** 7 lessons
- **Module 3:** 6 lessons
- **Module 4:** 6 lessons
- **Module 5:** 5 lessons
- **Module 6:** 6 lessons
- **Total:** 35 lesson units in outline format, which is in range for a recorded delivery trimmed to about 30 final lessons by combining adjacent teach segments during production

## Teaching assets to produce
- 6 module workbooks
- 1 operator checklist per module
- Cloneable ticket contract templates
- Sample orchestrator configs for sequential and parallel runs
- Critic rubric templates
- Session handoff template

## Free and gated preview lessons
### Free public lesson
- **Module 1, Lesson 1:** The context-limit wall and why single-agent workflows break
- **Format:** full video + workbook
- **Placement:** `/academia/orchestrator/preview`
- **Goal:** create demand by showing the core pain clearly and proving there is a structured path out

### Gated preview lesson
- **Module 3, Lesson 2:** Coordinator ↔ executor in 20 minutes
- **Format:** preview lesson after email signup
- **Goal:** let the student feel the speed and leverage of orchestration before purchase

## CTA copy
### README CTA
> Aprendé a orquestar equipos de agentes → curso /orchestrator ($197)

### Newsletter CTA
> El curso /orchestrator abre el [date]. Reservá tu lugar.

### Landing page primary CTA
> Inscribirme al curso /orchestrator

### Landing page secondary CTA
> Ver la lección gratuita

## Positioning notes
- **Free OSS product:** `/orchestrator`
- **Paid next step:** implementation system, templates, and workflow design in a guided course
- **Core promise:** not “learn agents” but “run reliable agent teams in production”
- **Main competitor substitute:** DIY prompting plus trial-and-error coordination
- **Reason to buy now:** compress weeks of failed orchestration experiments into a one-week implementation path

## Production notes for the launch team
- Keep examples grounded in real delivery work, repo changes, content ops, and recurring workflows
- Lead with failure modes students already feel, not abstract agent theory
- Use live `/orchestrator` walkthroughs as the trust anchor for each module
- Show verification and proof constantly so the course feels operational, not motivational
