# Memory marketplace optimization package

This doc packages the final repo-optimization assets for the `maxtechera/memory` Claude Code marketplace submission.

## GitHub repo description

**Final description, 81 chars**

`Durable memory for AI agents with Obsidian sync, session hooks, and recall flows.`

## GitHub topics

Use these six topics in this exact order:

1. `memory`
2. `ai-agents`
3. `claude-code`
4. `obsidian`
5. `session-hooks`
6. `knowledge-management`

## Social preview card

Use: `artifacts/MAX-534/social-preview-card.png`

Card angle: show the free `/memory` install as the entry point, then position Obsidian sync and durable recall as the upgrade path that makes the repo marketplace-ready.

## Claude marketplace manifest verification

Manifest checked against the current Claude plugin format on 2026-04-19 by fetching the live `maxtechera/memory` repo manifests:

- Plugin slug: `memory`
- Category: `productivity`
- Source path: `./`
- Homepage/repository: `https://github.com/maxtechera/memory`
- Install verb: `/plugin marketplace add maxtechera/memory`

Before submit, verify these files in the target repo:

- `.claude-plugin/plugin.json`
- `.claude-plugin/marketplace.json`

## README install block

Copy this install block into the target repo README:

    ## Install

    ### Claude Code
    ```bash
    /plugin marketplace add maxtechera/memory
    ```

    ### OpenClaw
    ```bash
    clawhub install memory
    ```

    ### Manual
    ```bash
    git clone https://github.com/maxtechera/memory.git ~/.claude/skills/memory
    ```

## Install test checklist

1. Run `/plugin marketplace add maxtechera/memory` in Claude Code.
2. Confirm the plugin installs without manifest errors.
3. Run the first memory command from the repo quickstart.
4. Capture a screenshot of the rendered README/install surface for Linear proof.

Status in this package: manifest structure verified from the live repo, but the interactive install still needs to be run in Claude Code before the ticket can honestly claim install confirmed working.

## Proof assets

- Package manifest: `artifacts/MAX-534/package.json`
- Preview board: `artifacts/MAX-534/preview.html`
- Rendered markdown proof: `artifacts/MAX-534/github-readme.html`
- Social card PNG: `artifacts/MAX-534/social-preview-card.png`
- Rendered GitHub markdown screenshot: `artifacts/MAX-534/rendered_github_markdown_screenshot.png`
