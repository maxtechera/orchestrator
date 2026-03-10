# State Machine

- Backlog -> not pickup-ready
- Todo -> pickup-ready
- In Progress -> executing
- Code Review -> PR open, awaiting human merge
- QA -> post-merge validation
- In Review -> non-code artifact review or evidence pending
- Blocked by Max -> explicit human dependency
- Done -> verification + artifacts complete

Transition rules:

- Open PR => Code Review
- Human merge => QA
- QA passed + evidence => Done
- Human-only step left => Blocked by Max
