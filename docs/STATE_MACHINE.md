# State Machine

All 7 workflow states with descriptions and transition triggers.

> This is the detailed state model. [WORKFLOW.md](../WORKFLOW.md) describes the simplified 5-stage lifecycle. Both describe the same system at different levels of detail.

## States

### Backlog
- **Description**: Ticket not pickup-ready
- **Characteristics**: Missing contract sections (Inputs, Deliverables, Verification, Artifacts)
- **Transition trigger**: Contract completed → Todo
- **Dispatcher action**: Skip (not actionable)

### Todo
- **Description**: Pickup-ready, full contract defined
- **Characteristics**: All contract sections present, no active session
- **Transition trigger**: Dispatcher picks up → In Progress
- **Dispatcher action**: Spawn worker session

### In Progress
- **Description**: Agent executing ticket work
- **Characteristics**: Active session with `ticket-<ID>` label, work in flight
- **Transition trigger**: 
  - Deliverable ready for checking → Verification
  - Human dependency identified → Blocked
- **Dispatcher action**: Skip (session active); re-dispatch if orphaned (stale > 1800s)

### Verification
- **Description**: Independent check of deliverables against ticket spec
- **Characteristics**: Work complete, verification in progress with fresh context
- **Transition trigger**:
  - All checks PASS → Done
  - PARTIAL (needs human judgment) → Review
  - FAIL → back to In Progress with failure context (or escalate)
- **Dispatcher action**: Spawn verification session if needed

### Review
- **Description**: Human reviews pre-verified work that requires judgment
- **Characteristics**: Deliverable (PR, doc, design, research, etc.) verified but flagged for human decision
- **Transition trigger**:
  - Human approves → Done
  - Human rejects → back to In Progress with notes
- **Dispatcher action**: Monitor review status; move to Blocked if feedback unresolved

### Blocked
- **Description**: Explicit human dependency
- **Characteristics**: Requires operator decision/action; agent cannot proceed
- **Mandatory payload**: 
  - `human_dependency`: What the operator must do
  - `why_ai_cannot_proceed`: Why agent is stuck
  - `direct_question_for_operator`: Specific question or decision needed
- **Transition trigger**: Operator provides decision/action → appropriate next state
- **Dispatcher action**: Skip (waiting on human)

### Done
- **Description**: All verification + artifacts complete
- **Characteristics**: Evidence present, PR merged (if code), artifacts linked
- **Transition trigger**: None (terminal state)
- **Dispatcher action**: Skip (complete)

## Transition Rules

| From | To | Condition |
|------|----|----|
| Backlog | Todo | Contract completed |
| Todo | In Progress | Dispatcher spawns session |
| In Progress | Verification | Deliverable ready for checking |
| In Progress | Blocked | Human dependency identified |
| Verification | Done | All checks PASS + artifacts complete |
| Verification | Review | PARTIAL — needs human judgment |
| Verification | In Progress | FAIL — retry with failure context |
| Review | Done | Human approves |
| Review | In Progress | Human rejects, back to execution with notes |
| Review | Blocked | Feedback unresolved, human input needed |
| Blocked | Todo | Operator provides decision, more work needed |
| Blocked | Done | Operator provides decision, work complete |

## Dispatcher Pickup Priority

```
1. Review (pre-verified, awaiting human approval)
2. Verification (delivered, needs checking)
3. In Progress (orphaned, stale > 1800s)
4. Todo (pickup-ready)
5. Backlog (not actionable, skip)
```

## State Diagram

```
Backlog ──contract──> Todo ──dispatch──> In Progress ──> Verification ──┬──pass──> Done
                                              │                         │
                                              │                         └──partial──> Review ──approve──> Done
                                              │                                          │
                                              │                                          └──reject──> In Progress
                                              │
                                              └──> Blocked ──decision──> (Todo|Done)
```
