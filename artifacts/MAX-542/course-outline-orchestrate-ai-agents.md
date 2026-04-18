# MAX-542 Course Outline

Offer stack: `/orchestrator`
Course title EN: **Orchestrate AI Agents**
Course title ES: **Orquesta tus Agentes IA**
Price: **$197**
Tagline EN: **Stop being the QA department for your own AI agents**
Tagline ES: **Deja de ser el QA de tus propios agentes**

## Course promise

This course teaches operators, founders, and technical leads how to run AI agents with a real delivery system instead of vibe-based prompting. Students will learn how to define tickets, enforce verification, route work across tools, and review outputs with clear operational controls.

## Ideal student

- Builders already using AI agents but frustrated by inconsistent delivery
- Operators managing recurring work across content, engineering, and internal ops
- Founders who want leverage without becoming the bottleneck reviewer for every output
- Teams moving from single-chat prompting to durable, ticket-based execution

## Transformation

### Before
- Agents do work, but quality varies wildly
- The human becomes the final QA layer every time
- Tasks get redone because context is missing or unverifiable
- Tool sprawl creates confusion instead of throughput

### After
- Agents execute against scoped tickets with explicit verification criteria
- Work moves through a repeatable lifecycle instead of ad hoc prompting
- The human reviews exceptions, not everything
- AI labor becomes inspectable, auditable, and easier to scale

## Course outcomes

By the end of the course, students will be able to:

1. Explain why self-grading agents fail without external verification.
2. Set up a practical board across Linear, GitHub Issues, Notion, or Jira.
3. Define a 5-stage agent delivery lifecycle from intake to done.
4. Write verification criteria that reduce ambiguity and rework.
5. Route work between execution agents, verifier agents, and human review.
6. Build a lightweight operating system for repeatable agent work.

## Module outline

## Module 1. The verification problem
**Goal:** Show why prompting alone does not create reliable operations.

### Lessons
1. Why capable agents still produce low-trust output
2. The trap of AI self-grading
3. Failure modes: hallucinated completion, false confidence, shallow checks
4. Why external artifacts beat agent claims

### Takeaways
- Reliability comes from system design, not model optimism
- Verification must be separated from execution
- Trust increases when work produces inspectable proof

### Exercise
Audit one recent agent-delivered task and identify where execution and verification were mixed together.

---

## Module 2. Board setup: Linear, GitHub Issues, Notion, Jira
**Goal:** Give students a practical substrate for routing agent work.

### Lessons
1. What makes a board usable for AI operations
2. Choosing between Linear, GitHub Issues, Notion, and Jira
3. Required ticket fields: objective, surface, proof, owner, state
4. Designing a board that humans and agents can both understand

### Takeaways
- The board is the source of truth for agent work
- Clean ticket structure lowers coordination cost
- Good fields prevent hidden assumptions during execution

### Exercise
Create a template ticket in the student’s preferred system with objective, proof requirements, and delivery surface.

---

## Module 3. The 5-stage ticket lifecycle
**Goal:** Teach the operating model that makes agent work reviewable.

### Lifecycle
1. **Intake**: clarify the business request and target surface
2. **Execute**: produce the artifact or implementation
3. **Verify**: independently check the claimed result
4. **Review**: human or designated approver inspects exceptions and tradeoffs
5. **Done**: close only when business intent and proof align

### Lessons
1. What belongs in each stage
2. Hand-offs between executor, verifier, and reviewer
3. State transitions that reduce ambiguity
4. Common anti-patterns, including premature “Done” states

### Takeaways
- A ticket lifecycle is an operational control layer
- Verification deserves its own explicit stage
- Review is faster when upstream proof is consistent

### Exercise
Map one existing team workflow into the 5-stage model and note what is missing.

---

## Module 4. Writing verification criteria
**Goal:** Help students create checks that agents can execute and humans can trust.

### Lessons
1. The anatomy of strong verification criteria
2. Artifact proof vs. business proof vs. surface correctness
3. Converting vague requests into testable completion standards
4. Examples for content, code, operations, and research tasks

### Verification framework
For each ticket, define:
- **Artifact delta**: what changed, created, or shipped
- **Business delta**: why the change matters or what outcome it enables
- **Surface correctness**: how we know it landed in the right place and format

### Takeaways
- Verification criteria should be observable, not interpretive
- Strong proof reduces reviewer load dramatically
- The ticket should tell the verifier what “done” actually means

### Exercise
Rewrite three vague requests into tickets with explicit verification criteria and required proof.

---

## Suggested bonus module. Orchestrating specialist agents
**Goal:** Show how execution, verification, and review agents work together in practice.

### Lessons
1. Executor vs. verifier vs. supervisor roles
2. When to parallelize work and when not to
3. Escalation rules for blockers and human decisions
4. Keeping context small while preserving continuity

### Exercise
Design a mini multi-agent workflow for one recurring business process.

## Delivery format

- 4 core modules, 1 optional bonus module
- Each lesson designed for short video delivery
- Each module ends with an implementation exercise
- English and Spanish versions share the same operational skeleton

## Recommended lesson pacing

- Module 1: 20 to 25 minutes
- Module 2: 25 to 30 minutes
- Module 3: 25 to 30 minutes
- Module 4: 25 to 30 minutes
- Bonus module: 15 to 20 minutes

Estimated total runtime: **1 hour 50 minutes to 2 hours 15 minutes**

## Production notes

### English hooks
- Your AI agent is not failing because it is dumb. It is failing because your system has no verification layer.
- If you are checking every agent output yourself, you do not have leverage. You have a new intern.
- The goal is not more prompts. The goal is a delivery system.

### Spanish hooks
- Tu agente no falla por falta de inteligencia. Falla porque tu sistema no tiene una capa de verificación.
- Si estás revisando cada entrega del agente, no tienes apalancamiento. Tienes otro trabajo.
- La meta no es escribir más prompts. La meta es construir un sistema de entrega.

## Final deliverable recommendation

Turn this outline into:
1. a lesson-by-lesson script brief,
2. a worksheet with ticket and verification templates,
3. a companion board template for `/orchestrator` users.
