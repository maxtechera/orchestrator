# MAX-534, memory marketplace optimization package

## Ticket intent
Package the repo optimization assets needed to submit `maxtechera/memory` to the Claude marketplace: GitHub description, topics, social preview card, manifest check, install steps, and proof screenshots.

## Assets in this package
- `package.json`, machine-readable package for the content/release system
- `preview.html`, review board for the final description, topics, and install CTA
- `github-readme.html`, rendered markdown proof surface
- `social-preview-card.png`, preview card ready for repo social image usage
- `rendered_preview_screenshot.png`, screenshot of the preview board
- `rendered_github_markdown_screenshot.png`, screenshot of the rendered README/install proof
- `docs/memory-marketplace-package.md`, execution-ready copy for the target repo

## Final recommendation
Use the shorter description focused on the end result, not the implementation details:

`Durable memory for AI agents with Obsidian sync, session hooks, and recall flows.`

It stays under GitHub's description cap and keeps the differentiators that matter for marketplace discovery.

## Topic set
`memory`, `ai-agents`, `claude-code`, `obsidian`, `session-hooks`, `knowledge-management`

## Install proof target
The README block centers the marketplace install command first:

```bash
/plugin marketplace add maxtechera/memory
```

That keeps the submission aligned with the Claude marketplace surface while still documenting OpenClaw and manual install fallbacks.
