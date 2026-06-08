# Document Index — LifeOS Portfolio Dashboard

**Version:** v0.1.0  
**Date:** 2026-06-03  
**Author:** Rory  
**Status:** Active — update after every session

---

## Index Format

| # | Document | Path | Purpose | Status | Version |
|---|---|---|---|---|---|

Status values: `Draft` | `Review` | `Approved` | `Superseded`

---

## Root Documents

| # | Document | Path | Purpose | Status | Version |
|---|---|---|---|---|---|
| 1 | README | `README.md` | Project overview, setup, scripts, roadmap | Draft | v0.1.0 |
| 2 | CLAUDE Rules | `CLAUDE.md` | AI assistant rules, coding standards, git rules, QA rules | Draft | v0.1.0 |

---

## Product Documents (`docs/product/`)

| # | Document | Path | Purpose | Status | Version |
|---|---|---|---|---|---|
| 3 | Project Brief | `docs/product/project-brief_v0.1.0.md` | Project purpose, goals, scope, constraints, success criteria | Draft | v0.1.0 |
| 4 | Product Vision | `docs/product/product-vision_v0.1.0.md` | Long-term vision, values, what success looks like | Draft | v0.1.0 |
| 5 | MVP Scope | `docs/product/mvp-scope_v0.1.0.md` | Exact in/out scope for MVP, acceptance criteria | Draft | v0.1.0 |
| 6 | Roadmap | `docs/product/roadmap_v0.1.0.md` | Phase-by-phase development plan | Draft | v0.1.0 |
| 7 | Decision Log | `docs/product/decision-log_v0.1.0.md` | Technical and product decisions with rationale | Draft | v0.1.0 |

---

## Requirements Documents (`docs/requirements/`)

| # | Document | Path | Purpose | Status | Version |
|---|---|---|---|---|---|
| 8 | Functional Requirements | `docs/requirements/functional-requirements_v0.1.0.md` | All FR-* requirements with IDs | Draft | v0.1.0 |
| 9 | User Stories | `docs/requirements/user-stories_v0.1.0.md` | US-* user stories with references | Draft | v0.1.0 |
| 10 | Acceptance Criteria | `docs/requirements/acceptance-criteria_v0.1.0.md` | AC-* Given/When/Then criteria | Draft | v0.1.0 |

---

## Architecture Documents (`docs/architecture/`)

| # | Document | Path | Purpose | Status | Version |
|---|---|---|---|---|---|
| 11 | System Architecture | `docs/architecture/system-architecture_v0.1.0.md` | High-level architecture, file structure, data flow | Draft | v0.1.0 |
| 12 | Tech Stack | `docs/architecture/tech-stack_v0.1.0.md` | All tools, versions, free-tier assumptions, rationale | Draft | v0.1.0 |
| 13 | Data Model | `docs/architecture/data-model_v0.1.0.md` | TypeScript types, planned Supabase schema | Draft | v0.1.0 |

---

## UI/UX Documents (`docs/uiux/`)

| # | Document | Path | Purpose | Status | Version |
|---|---|---|---|---|---|
| 14 | Screen Inventory | `docs/uiux/screen-inventory_v0.1.0.md` | All screens, routes, sections, modals | Draft | v0.1.0 |
| 15 | Design System | `docs/uiux/design-system_v0.1.0.md` | Colours, typography, spacing, components | Draft | v0.1.0 |
| 16 | Responsive Design | `docs/uiux/responsive-design_v0.1.0.md` | Breakpoints, accessibility requirements, checklists | Draft | v0.1.0 |

---

## QA Documents (`docs/qa/`)

| # | Document | Path | Purpose | Status | Version |
|---|---|---|---|---|---|
| 17 | Test Plan | `docs/qa/test-plan_v0.1.0.md` | Testing strategy, phases, tools, layers | Draft | v0.1.0 |
| 18 | Test Cases | `docs/qa/test-cases_v0.1.0.md` | TC-* test cases with Given/When/Then and status | Draft | v0.1.0 |
| 19 | Playwright Plan | `docs/qa/playwright-plan_v0.1.0.md` | Playwright config, file structure, example tests | Draft | v0.1.0 |
| 20 | QA Execution Log | `docs/qa/qa-execution-log_v0.1.0.md` | Test run results, phase sign-offs | Active | v0.1.0 |
| 21 | Bug Fix Log | `docs/qa/bug-fix-log_v0.1.0.md` | Bug reports and fix records | Active | v0.1.0 |

---

## Deployment Documents (`docs/deployment/`)

| # | Document | Path | Purpose | Status | Version |
|---|---|---|---|---|---|
| 22 | Deployment Plan | `docs/deployment/deployment-plan_v0.1.0.md` | GitHub + Vercel workflow, pre-deploy checklist, rollback | Draft | v0.1.0 |
| 23 | Vercel Guide | `docs/deployment/vercel-deployment-guide_v0.1.0.md` | Step-by-step Vercel setup, troubleshooting | Draft | v0.1.0 |

---

## Security Documents (`docs/security/`)

| # | Document | Path | Purpose | Status | Version |
|---|---|---|---|---|---|
| 24 | Privacy and Data Notes | `docs/security/privacy-and-data-notes_v0.1.0.md` | Data handling, security controls, standards gaps | Draft | v0.1.0 |

---

## Decision Documents (`docs/decisions/`)

| # | Document | Path | Purpose | Status | Version |
|---|---|---|---|---|---|
| 25 | Human Decisions Log | `docs/decisions/human-decisions_v0.1.0.md` | Decisions requiring product owner approval | Active | v0.1.0 |

---

## Documents To Be Created (Future)

| Document | Phase | Notes |
|---|---|---|
| `docs/architecture/component-guide.md` | Phase 1 | Reusable component documentation |
| `.env.example` | Phase 0 | Environment variable template |
| `vercel.json` | Phase 0 | SPA routing configuration |
| `docs/qa/accessibility-audit.md` | Phase 8 | WCAG 2.1 AA audit results |
| `docs/deployment/supabase-setup.md` | Phase 7 | Supabase project setup guide |

---

## Auto-Generatable vs Human-Required

This section identifies which documents can be drafted by Claude (AUTO) and which require human review or authorship (REVIEW/HUMAN).

Standards referenced: ISO 9001 (quality management), ISO 27001 (information security), DPTM (data protection), SOC 2 (service organisation controls).

| # | Document | Auto-Generate? | Standard Reference | Notes |
|---|---|---|---|---|
| 3 | Project Brief | AUTO | ISO 9001 Cl. 5.2 (policy context) | Human review recommended before sharing |
| 4 | Product Vision | AUTO | — | Human review for accuracy |
| 5 | MVP Scope | AUTO | ISO 9001 Cl. 8.1 (operational planning) | Human approval on scope |
| 6 | Roadmap | AUTO | ISO 9001 Cl. 6.2 (objectives) | Human approval on priorities |
| 7 | Decision Log | REVIEW | ISO 9001 Cl. 7.5 (documented info) | Claude drafts; human confirms each decision |
| 8 | Functional Requirements | AUTO | ISO 9001 Cl. 8.2 (requirements) | Human review for completeness |
| 9 | User Stories | AUTO | — | Human review for accuracy |
| 10 | Acceptance Criteria | AUTO | ISO 9001 Cl. 8.6 (release control) | Human review before development starts |
| 11 | System Architecture | AUTO | ISO 27001 A.14 (system development) | Human review for security architecture |
| 12 | Tech Stack | AUTO | ISO 27001 A.12 (operations security) | Human confirms free-tier assumptions |
| 13 | Data Model | AUTO | ISO 27001 A.8 (asset management), DPTM | Human review for data classification |
| 14 | Screen Inventory | AUTO | — | Human review for completeness |
| 15 | Design System | AUTO | — | Human review for brand accuracy |
| 16 | Responsive Design | AUTO | WCAG 2.1 AA | Human testing required |
| 17 | Test Plan | AUTO | ISO 9001 Cl. 8.7 (nonconformity) | Human review |
| 18 | Test Cases | AUTO | ISO 9001 Cl. 9.1 (monitoring) | Human review for coverage |
| 19 | Playwright Plan | AUTO | — | Human reviews test code |
| 20 | QA Execution Log | HUMAN | ISO 9001 Cl. 9.1 (evidence) | Must reflect actual test runs |
| 21 | Bug Fix Log | HUMAN | ISO 9001 Cl. 10.2 (corrective action) | Must reflect actual bugs |
| 22 | Deployment Plan | AUTO | ISO 27001 A.14.2 (change management) | Human approval before production deploy |
| 23 | Vercel Guide | AUTO | — | Human validates on first deploy |
| 24 | Privacy and Data Notes | REVIEW | ISO 27001, DPTM | Human review for compliance accuracy |
| 25 | Human Decisions Log | HUMAN | ISO 9001 Cl. 5.1 (leadership) | Human-authored by definition |

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.1.0 | 2026-06-03 | Document index created — 25 documents listed |
