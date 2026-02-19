# Orchestrator Skill

## Purpose
The `orchestrator` skill empowers the main agent to efficiently manage and delegate complex, multi-faceted tasks. Its primary purpose is to break down high-level objectives into granular sub-tasks, assign them to appropriate sub-agents or other specialized skills, monitor their execution, and synthesize their outputs to achieve the overarching goal. This skill is critical for optimizing token usage, leveraging specialized models, and enabling parallel processing of complex work.

## Typical Use Cases

The orchestrator skill is ideal for scenarios requiring:

1.  **Complex Project Management:** Breaking down large projects (e.g., "Develop a new feature for the CRM," "Conduct a comprehensive market analysis") into sequential or parallel sub-tasks and assigning them to different sub-agents.
2.  **Multi-Stage Research:** When a research query requires several steps like web search, data extraction, analysis, and summarization, where each step could be a distinct sub-agent.
3.  **Automated Workflow Execution:** Implementing workflows that involve multiple tools or skills, where the orchestrator manages the flow of data and control between them.
4.  **Resource Optimization:** Intelligently choosing the right model (e.g., `gemini-flash-lite` for simple bash commands, `sonnet-4-5` for code generation, `opus-4-6` for strategic planning) for each sub-task, thereby optimizing cost and performance.
5.  **Handling Large Data Sets:** Delegating tasks like data processing, transformation, or analysis to sub-agents to avoid maxing out the main session's context window.
6.  **Error Handling and Retries:** Potentially incorporating logic to re-spawn failed sub-tasks or implement fallback strategies.

## Key Functionality

The orchestrator skill would provide functions to:

*   **`orchestrate.task(objective: str, steps: list[str], dependencies: dict = None) -> str`:**
    *   Takes a high-level `objective` and an optional list of `steps` or a predefined workflow.
    *   Internally breaks down the `objective` into sub-tasks (if not provided).
    *   Spawns sub-agents for each sub-task, adhering to the "Standard Task Template" (Context, Deliverable, Model Recommendation, Report To, CRITICAL footer).
    *   Manages `dependencies` between sub-tasks, ensuring correct execution order.
    *   Returns a `session_id` or `orchestration_id` for monitoring.

*   **`orchestrate.status(orchestration_id: str) -> dict`:**
    *   Provides real-time status updates for an ongoing orchestration, including the status of individual sub-agents and overall progress.

*   **`orchestrate.cancel(orchestration_id: str) -> str`:**
    *   Allows the main agent to terminate an ongoing orchestration and all its spawned sub-agents.

*   **`orchestrate.retrieve_results(orchestration_id: str) -> dict`:**
    *   Collects and synthesizes the deliverables from all completed sub-agents into a final output for the main agent.

## Delegation and Interoperability

The `orchestrator` skill achieves its goals by:

*   **Spawning Sub-Agents:** It is the primary mechanism for the main agent to spawn sub-agents for specific tasks, ensuring they conform to best practices outlined in `docs/SUB_AGENT_PATTERNS.md`.
*   **Invoking Other Skills:** For tasks that don't require an entire sub-agent (e.g., a quick web search, a file read), the orchestrator can directly call other OpenClaw skills as part of its workflow.
*   **Context Management:** By systematically offloading work to isolated sub-agents, the orchestrator minimizes token burn in the main session and contributes to better overall session health.
*   **Standardized Reporting:** It consolidates reports from various sub-agents into a unified overview, making it easier for the main agent to understand progress and integrate results.

This skill essentially formalizes the process of breaking down and delegating work, which is a common pattern for agents when faced with complex challenges.