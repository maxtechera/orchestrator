# MAX-542 Course Outline

Offer stack: `/orchestrator`
Course title EN: **Orchestrate AI Agents**
Course title ES: **Orquesta tus Agentes IA**
Price: **$197**
Tagline EN: **Stop being the QA department for your own AI agents**
Tagline ES: **Deja de ser el QA de tus propios agentes**

## Course promise

This course teaches operators, founders, and technical leads how to run AI agents with a real delivery system instead of vibe-based prompting. Students learn to define tickets, separate execution from verification, route work across the tools they already use, and review outputs with clear operational controls.

The core transformation: students stop personally QA-ing every agent output and start operating an inspectable delivery system where agents produce proof, verifiers check claims, and humans only step in for judgment calls.

## Ideal student

- Builders already using AI agents but frustrated by inconsistent delivery
- Operators managing recurring work across content, engineering, e-commerce, and internal ops
- Founders who want leverage without becoming the bottleneck reviewer for every output
- Teams moving from single-chat prompting to durable, ticket-based execution

## Before / after transformation

### Before
- Agents do work, but quality varies wildly
- The human becomes the final QA layer every time
- Tasks get redone because context is missing or unverifiable
- Tool sprawl creates confusion instead of throughput
- "Done" means the agent said it was done

### After
- Agents execute against scoped tickets with explicit verification criteria
- Work moves through a repeatable lifecycle instead of ad hoc prompting
- The human reviews exceptions, not everything
- AI labor becomes inspectable, auditable, and easier to scale
- "Done" means business intent and proof align

## Course outcomes

By the end of the course, students will be able to:

1. Explain why AI self-grading fails without independent verification.
2. Set up a practical work board in Linear, GitHub Issues, Notion, or Jira.
3. Run agent work through a 5-stage lifecycle: Intake → Execute → Verify → Review → Done.
4. Write verification criteria that reduce ambiguity, rework, and reviewer load.
5. Design domain-specific agent workflows for content, engineering, and e-commerce.
6. Turn repeated failures into durable rules, templates, and acceptance checks.
7. Operate team-mode agent workflows with sweep scheduling and escalation rules.

## Course structure

- **7 modules** aligned to the `/orchestrator` operating model
- **28 core lessons** plus exercises and templates
- **Format:** short video lessons, worksheets, board templates, verification checklists, and cloneable `/orchestrator` examples
- **Languages:** English course with Spanish adaptation track using the same operational skeleton

---

## Module 1. The verification problem — why AI self-grading fails

**Goal:** Show why prompting alone does not create reliable operations.

### Lessons
1. Why capable agents still produce low-trust output
2. The trap of AI self-grading and circular confidence
3. Failure modes: hallucinated completion, false confidence, shallow checks, and hidden regressions
4. Why external artifacts beat agent claims

### Takeaways
- Reliability comes from system design, not model optimism
- Verification must be separated from execution
- Trust increases when work produces inspectable proof

### Exercise
Audit one recent agent-delivered task and identify where execution and verification were mixed together.

### Deliverable
A short failure map showing: request, agent claim, actual proof, missing verification, and reviewer burden.

---

## Module 2. Board setup — Linear, GitHub Issues, Notion, Jira

**Goal:** Give students a practical substrate for routing agent work.

### Lessons
1. What makes a board usable for AI operations
2. Choosing between Linear, GitHub Issues, Notion, and Jira
3. Required ticket fields: objective, surface, proof, owner, state, blocker, and acceptance criteria
4. Designing a board that humans and agents can both understand

### Recommended board fields
- **Objective:** what business outcome the ticket serves
- **Surface:** repo, page, doc, channel, dashboard, campaign, or workflow being changed
- **Inputs:** links, files, constraints, source material
- **Deliverable:** what must be created or changed
- **Proof required:** screenshots, tests, diffs, URLs, metrics, or rendered artifacts
- **Owner:** human or agent responsible for the current state
- **State:** Intake, Execute, Verify, Review, Done

### Takeaways
- The board is the source of truth for agent work
- Clean ticket structure lowers coordination cost
- Good fields prevent hidden assumptions during execution

### Exercise
Create a reusable ticket template in the student’s preferred system with objective, proof requirements, owner, delivery surface, and acceptance criteria.

### Deliverable
A working AI-agent ticket template for Linear, GitHub Issues, Notion, or Jira.

---

## Module 3. The 5-stage ticket lifecycle — Intake → Execute → Verify → Review → Done

**Goal:** Teach the operating model that makes agent work reviewable.

### Lifecycle
1. **Intake:** clarify the business request, target surface, constraints, and proof requirements
2. **Execute:** produce the artifact, implementation, or campaign output
3. **Verify:** independently check the claimed result against observable criteria
4. **Review:** human or designated approver inspects exceptions, taste calls, and tradeoffs
5. **Done:** close only when business intent and proof align

### Lessons
1. What belongs in each stage and what does not
2. Hand-offs between executor, verifier, reviewer, and owner
3. State transitions that reduce ambiguity
4. Common anti-patterns, including premature Done, vague Review, and skipped Verify states

### Takeaways
- A ticket lifecycle is an operational control layer
- Verification deserves its own explicit stage
- Review is faster when upstream proof is consistent

### Exercise
Map one existing team workflow into the 5-stage model and note what is missing.

### Deliverable
A lifecycle map for one real recurring workflow, including owner, input, output, proof, and escalation at each stage.

---

## Module 4. Writing verification criteria — automated checks vs AI quality checks

**Goal:** Help students create checks that agents can execute and humans can trust.

### Lessons
1. The anatomy of strong verification criteria
2. Automated checks: tests, lint, typecheck, build, links, schema validation, and visual regression
3. AI quality checks: rubric scoring, completeness review, tone review, strategy review, and contradiction checks
4. Converting vague requests into testable completion standards
5. Examples for content, code, operations, and research tasks

### Verification framework
For each ticket, define:
- **Artifact delta:** what changed, created, or shipped
- **Business delta:** why the change matters or what outcome it enables
- **Surface correctness:** how we know it landed in the right place and format
- **Automated gate:** the smallest reliable machine-checkable proof
- **Quality gate:** the rubric or judgment criteria for non-deterministic work
- **Human gate:** the point where taste, risk, or authority requires human approval

### Takeaways
- Verification criteria should be observable, not interpretive
- Strong proof reduces reviewer load dramatically
- Automated checks and AI quality checks solve different problems
- The ticket should tell the verifier what “done” actually means

### Exercise
Rewrite three vague requests into tickets with explicit verification criteria and required proof.

### Deliverable
Three before/after ticket rewrites with artifact proof, automated checks, AI quality checks, and human approval rules.

---

## Module 5. Domain skills — content, engineering, e-commerce

**Goal:** Show students how to adapt the same orchestration system to different business domains.

### Lessons
1. Why domain skills matter: agents need operating context, not just instructions
2. Content workflows: brief → draft → edit → package → publish proof
3. Engineering workflows: ticket → implementation → tests → PR → review proof
4. E-commerce workflows: product update → listing QA → pricing/checkouts → publish proof
5. How to write reusable domain rules without overfitting to one task

### Domain examples

#### Content
- Inputs: angle, audience, offer, channel, brand voice
- Proof: final asset, platform preview, hook variants, CTA alignment, publish checklist

#### Engineering
- Inputs: issue, repo surface, constraints, expected behavior
- Proof: diff, tests, lint/typecheck/build, screenshots, PR link

#### E-commerce
- Inputs: SKU/product, price, inventory, listing copy, images, marketplace rules
- Proof: listing preview, price verification, checkout path, image compliance, publish URL

### Takeaways
- The lifecycle stays stable while domain criteria change
- Reusable skills reduce repeated instruction overhead
- Domain-specific verification is what makes agent output operationally useful

### Exercise
Choose one domain and create a skill card with inputs, outputs, proof requirements, failure modes, and escalation triggers.

### Deliverable
One reusable domain skill card for content, engineering, or e-commerce.

---

## Module 6. Self-improving rules — every failure becomes a rule

**Goal:** Teach students how to convert agent mistakes into durable operating improvements.

### Lessons
1. The failure-capture loop: incident → cause → rule → template update → next run
2. How to distinguish one-off mistakes from systemic rules
3. Writing rules that agents can actually follow
4. Updating ticket templates, verification checklists, and domain skills after failures
5. Avoiding rule bloat and contradictory instructions

### Rule improvement loop
1. Capture the failed ticket and the exact failure mode
2. Identify whether the failure came from missing context, weak acceptance criteria, poor verification, or tool misuse
3. Add one small rule to the relevant template, skill, or checklist
4. Re-run or verify the next similar task against the new rule
5. Remove or consolidate rules that no longer earn their complexity

### Takeaways
- A good agent system gets safer after each failure
- The fix is usually a better rule, checklist, or proof requirement—not a longer prompt
- Rules should live where future agents will actually see them

### Exercise
Take one real agent failure and write the exact rule/template/checklist update that would prevent recurrence.

### Deliverable
A failure-to-rule log with at least three entries and one updated ticket template or skill checklist.

---

## Module 7. Team mode + sweep scheduling

**Goal:** Help students operate `/orchestrator` as a recurring team workflow instead of a one-off demo.

### Lessons
1. Team mode: coordinator, executor, verifier, reviewer, and owner roles
2. Sweep scheduling: recurring checks for stale tickets, missing proof, blocked work, and ready-for-review items
3. Escalation rules for blockers, risky changes, and human decisions
4. Operating cadence: daily sweep, weekly cleanup, and post-failure rule updates
5. Metrics that matter: cycle time, verification failure rate, reviewer load, and escaped defects

### Team operating model
- **Coordinator:** decomposes work and assigns ownership
- **Executor:** creates the artifact or implementation
- **Verifier:** checks proof against criteria independently
- **Reviewer:** handles judgment, taste, risk, and final approval
- **Owner:** accountable for business outcome and closing the loop

### Sweep examples
- Find tickets stuck in Execute without proof
- Find Review tickets missing screenshots, tests, URLs, or diffs
- Find Done tickets with no business proof
- Find repeated failure modes that deserve new rules
- Find recurring work that should become a scheduled orchestrator run

### Takeaways
- Scheduling creates consistency without constant human babysitting
- Team mode works when roles and handoffs are explicit
- Good operations make agent leverage compound over time

### Exercise
Design one scheduled sweep for a real board and define the trigger, query, action, owner, and escalation path.

### Deliverable
A team-mode operating cadence with one daily sweep, one weekly cleanup, and one escalation rule.

---

## Funnel trigger

**Trigger:** GitHub install → first verified ticket → course CTA for domain depth

### Funnel logic
1. User installs or clones `/orchestrator`
2. User runs their first ticket through Execute and Verify
3. They see the gap between ad hoc agent work and a real operating system
4. CTA introduces the course as the next step for templates, domain skills, board setup, and team-mode workflows

### CTA placements
- GitHub README after quickstart and first verified ticket example
- `/orchestrator` proof artifact examples
- Post-install success message or docs page
- Newsletter and launch emails for builders using agent workflows

## English / Spanish adaptation notes

### English hooks
- Your AI agent is not failing because it is dumb. It is failing because your system has no verification layer.
- If you are checking every agent output yourself, you do not have leverage. You have a new intern.
- The goal is not more prompts. The goal is a delivery system.
- Stop being the QA department for your own AI agents.

### Spanish hooks
- Tu agente no falla por falta de inteligencia. Falla porque tu sistema no tiene una capa de verificación.
- Si estás revisando cada entrega del agente, no tienes apalancamiento. Tienes otro trabajo.
- La meta no es escribir más prompts. La meta es construir un sistema de entrega.
- Deja de ser el QA de tus propios agentes.

### Adaptation guidance
- Keep module structure identical in EN and ES
- Localize examples for Spanish-speaking operators and founders
- Avoid literal translation when the operational metaphor is clearer in Spanish
- Preserve `/orchestrator`, ticket lifecycle, verification, and proof terminology consistently

## Production deliverables

1. **Course outline finalized:** this document
2. **Modules scripted (EN):** one script brief per lesson using this outline
3. **Spanish track adaptation:** translated/adapted lesson briefs, examples, and worksheets
4. **Course page copy:** promise, bullets, module accordion, FAQ, and CTA
5. **GitHub README CTA:** install → first verified ticket → course CTA

## Final deliverable recommendation

Turn this outline into:
1. a lesson-by-lesson script brief,
2. a worksheet with ticket and verification templates,
3. a companion board template for `/orchestrator` users,
4. domain skill cards for content, engineering, and e-commerce,
5. a sweep scheduling checklist for team-mode operations.
