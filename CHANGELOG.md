# Changelog

All notable changes to the orchestrator skill are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [1.0.0] - 2026-04-08

### Added
- Core orchestrator skill (SKILL.md, WORKFLOW.md)
- 5-stage ticket lifecycle: Intake → Execute → Verify → Review → Done
- Board-agnostic support: Linear, GitHub Issues, Notion, Jira
- 8 core domain skills + 4 starter templates
- Hybrid verification: automated data checks + AI quality checks
- Self-improving rule accumulation from failures
- Claude Code Plugin Marketplace manifests
- ClawHub/OpenClaw distribution
- Gemini CLI extension manifest
- CI: validate workflow (contract lint, manifest validation, version sync, cross-doc checks)
- CI: release workflow (tag-push → GitHub Release)
- Expanded .env.example with all supported environment variables
