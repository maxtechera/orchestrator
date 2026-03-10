# Workflow

## 1) Intake / pickup

1. Read full Linear ticket.
2. Validate contract sections exist:
   - `## Inputs`
   - `## Deliverables`
   - `## Verification`
   - `## Artifacts`
3. Choose execution domain: `code | research | content | design | video | ops`.

## 2) Execute

- Produce concrete deliverables (files, links, reports, PRs).
- Keep artifacts inspectable and canonical.
- For code/config changes: use isolated branch + PR.

## 3) Verify

- Run checks/tests defined by ticket.
- Attach proof in ticket comments (commands, outputs, screenshots/URLs).

## 4) Transition state

- PR opened: `Code Review` (or `In Review` per board mapping).
- PR merged by human reviewer: `QA` / `Todo (needs-qa)`.
- All verification + artifacts complete: `Done`.
- Human-only gate left: `Blocked by Max` with explicit unblock step.

## 5) Comment contract

Every meaningful update should include:

```md
status_summary: <what changed + current confidence>
next_steps:
- <owner>: <next concrete step>
- <owner>: <fallback/contingency>
```
