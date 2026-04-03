# State Machine

All 8 workflow states with descriptions and transition triggers.

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
  - PR opened → Code Review
  - Non-code artifact ready for review → In Review
  - Human dependency identified → Blocked by Max
- **Dispatcher action**: Skip (session active); re-dispatch if orphaned (stale > 1800s)

### Code Review
- **Description**: PR open, awaiting human merge
- **Characteristics**: PR exists, CI passing, awaiting Max approval
- **Transition trigger**: Human merges PR → QA
- **Dispatcher action**: Monitor PR status; move to Blocked by Max if feedback unresolved

### QA
- **Description**: Post-merge validation
- **Characteristics**: PR merged, verification in progress
- **Transition trigger**: Verification passed + artifacts complete → Done
- **Dispatcher action**: Spawn QA validation session if needed

### In Review
- **Description**: Non-code artifact review pending
- **Characteristics**: Artifact (doc, design, research, etc.) ready for human review
- **Transition trigger**: Human approves → Done
- **Dispatcher action**: Monitor review status; move to Blocked by Max if feedback pending

### Blocked by Max
- **Description**: Explicit human dependency
- **Characteristics**: Requires Max decision/action; agent cannot proceed
- **Mandatory payload**: 
  - `human_dependency`: What Max must do
  - `why_ai_cannot_proceed`: Why agent is stuck
  - `direct_question_for_max`: Specific question or decision needed
- **Transition trigger**: Max provides decision/action → appropriate next state
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
| In Progress | Code Review | PR opened |
| In Progress | In Review | Non-code artifact ready |
| In Progress | Blocked by Max | Human dependency identified |
| Code Review | QA | Human merges PR |
| Code Review | Blocked by Max | Feedback unresolved, human input needed |
| QA | Done | Verification passed + artifacts complete |
| In Review | Done | Human approves artifact |
| In Review | Blocked by Max | Feedback pending, human input needed |
| Blocked by Max | Todo | Max provides decision, more work needed |
| Blocked by Max | Done | Max provides decision, work complete |

## Dispatcher Pickup Priority

```
1. Code Review (PR awaiting merge)
2. QA (post-merge validation)
3. In Review (artifact review pending)
4. In Progress (orphaned, stale > 1800s)
5. Todo (pickup-ready)
6. Backlog (not actionable, skip)
```

## State Diagram

```
Backlog ──contract──> Todo ──dispatch──> In Progress ──┬──> Code Review ──merge──> QA ──verify──> Done
                                            │           │
                                            │           └──> In Review ──approve──> Done
                                            │
                                            └──> Blocked by Max ──decision──> (Todo|Done)
```
