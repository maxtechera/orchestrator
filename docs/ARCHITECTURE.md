# Architecture

Orchestrator is a skill-first control plane:

- **Planner**: prioritizes tickets from kanban state + priority.
- **Dispatcher**: spawns focused sub-agents with strict task scopes.
- **Verifier**: enforces done gate (evidence + artifacts + PR policy).
- **State writer**: updates Linear state/comments deterministically.

Data flow:

`Linear ticket -> pickup validation -> execution -> verification evidence -> state transition`
