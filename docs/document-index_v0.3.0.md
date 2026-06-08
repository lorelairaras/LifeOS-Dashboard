# Document Index — LifeOS Portfolio Dashboard

**Version:** v0.3.0
**Date:** 2026-06-03
**Author:** Rory
**Status:** Active
**Supersedes:** document-index_v0.2.0.md

---

## Root Documents

| # | Document | Path | Purpose | Status | Latest Version |
|---|---|---|---|---|---|
| 1 | README | `README.md` | Project overview, setup, scripts, roadmap | Draft | v0.2.0 |
| 2 | CLAUDE Rules | `CLAUDE.md` | AI assistant rules, coding standards, git rules | Draft | v0.1.0 |

---

## Product Documents (`docs/product/`)

| # | Document | Path | Status | Latest Version |
|---|---|---|---|---|
| 3 | Project Brief | `docs/product/project-brief_v0.1.0.md` | Draft | v0.1.0 |
| 4 | Product Vision | `docs/product/product-vision_v0.2.0.md` | Draft | v0.2.0 |
| 5 | MVP Scope | `docs/product/mvp-scope_v0.2.0.md` | Draft | v0.2.0 |
| 6 | Roadmap | `docs/product/roadmap_v0.1.0.md` | Draft | v0.1.0 |
| 7 | Decision Log | `docs/product/decision-log_v0.1.0.md` | Draft | v0.1.0 |

---

## Requirements Documents (`docs/requirements/`)

| # | Document | Path | Status | Latest Version |
|---|---|---|---|---|
| 8 | Functional Requirements | `docs/requirements/functional-requirements_v0.2.0.md` | Draft | v0.2.0 |
| 9 | User Stories | `docs/requirements/user-stories_v0.1.0.md` | Draft | v0.1.0 |
| 10 | Acceptance Criteria | `docs/requirements/acceptance-criteria_v0.1.0.md` | Draft | v0.1.0 |

---

## Feature Spec Documents (`docs/requirements/features/`)

| # | Document | Path | Status | Latest Version |
|---|---|---|---|---|
| 11 | Portfolio Feature Spec | `docs/requirements/features/portfolio_v0.1.0.md` | Draft | v0.1.0 |
| 12 | Dashboard Home Spec | `docs/requirements/features/dashboard-home_v0.1.0.md` | Draft | v0.1.0 |
| 13 | Task Tracker Spec | `docs/requirements/features/task-tracker_v0.1.0.md` | Draft | v0.1.0 |
| 14 | Prompt Library Spec | `docs/requirements/features/prompt-library_v0.1.0.md` | Draft | v0.1.0 |
| 15 | Job Tracker Spec | `docs/requirements/features/job-tracker_v0.1.0.md` | Draft | v0.1.0 |
| 16 | Budget Tracker Spec | `docs/requirements/features/budget-tracker_v0.1.0.md` | Draft | v0.1.0 |
| 17 | Projects Spec | `docs/requirements/features/projects_v0.1.0.md` | Draft | v0.1.0 |

---

## Architecture Documents (`docs/architecture/`)

| # | Document | Path | Status | Latest Version |
|---|---|---|---|---|
| 18 | System Architecture | `docs/architecture/system-architecture_v0.1.0.md` | Draft | v0.1.0 |
| 19 | Tech Stack | `docs/architecture/tech-stack_v0.1.0.md` | Draft | v0.1.0 |
| 20 | Data Model | `docs/architecture/data-model_v0.2.0.md` | Draft | v0.2.0 |

---

## UI/UX Documents (`docs/uiux/`)

| # | Document | Path | Status | Latest Version |
|---|---|---|---|---|
| 21 | Screen Inventory | `docs/uiux/screen-inventory_v0.2.0.md` | Draft | v0.2.0 |
| 22 | Design System | `docs/uiux/design-system_v0.1.0.md` | Draft | v0.1.0 |
| 23 | Responsive Design | `docs/uiux/responsive-design_v0.1.0.md` | Draft | v0.1.0 |

---

## QA Documents (`docs/qa/`)

| # | Document | Path | Status | Latest Version |
|---|---|---|---|---|
| 24 | Test Plan | `docs/qa/test-plan_v0.1.0.md` | Draft | v0.1.0 |
| 25 | Test Cases | `docs/qa/test-cases_v0.2.0.md` | Draft | v0.2.0 ✅ |
| 26 | Playwright Plan | `docs/qa/playwright-plan_v0.1.0.md` | Draft | v0.1.0 |
| 27 | QA Execution Log | `docs/qa/qa-execution-log_v0.3.0.md` | Active | v0.3.0 ✅ |
| 28 | Bug Fix Log | `docs/qa/bug-fix-log_v0.1.0.md` | Active | v0.1.0 |

---

## Deployment Documents (`docs/deployment/`)

| # | Document | Path | Status | Latest Version |
|---|---|---|---|---|
| 29 | Deployment Plan | `docs/deployment/deployment-plan_v0.1.0.md` | Draft | v0.1.0 |
| 30 | Vercel Guide | `docs/deployment/vercel-deployment-guide_v0.1.0.md` | Draft | v0.1.0 |

---

## Security Documents (`docs/security/`)

| # | Document | Path | Status | Latest Version |
|---|---|---|---|---|
| 31 | Privacy and Data Notes | `docs/security/privacy-and-data-notes_v0.1.0.md` | Draft | v0.1.0 |

---

## Decision Documents (`docs/decisions/`)

| # | Document | Path | Status | Latest Version |
|---|---|---|---|---|
| 32 | Human Decisions Log | `docs/decisions/human-decisions_v0.1.0.md` | Active | v0.1.0 |

---

## Source File Summary (Phase 3 — 37 files)

```
src/
├── app/            3 files  (router, PortfolioLayout, DashboardLayout)
├── components/    11 files  (Badge, Button, button.utils, Card, CaseStudyCard,
│                             ContactCard, EmptyState, index, PageHeader,
│                             ProjectCard, Section, SkillBadge)
├── features/
│   ├── portfolio/ 10 files  (data, 7 sections, 2 pages)
│   └── dashboard/  7 files  (7 stub pages)
├── styles/         1 file
├── types/          1 file
└── root            4 files  (App, main, vite-env.d.ts)
```

---

## Known Issues (to fix in next phase)

| Issue | Severity | Fix Phase |
|---|---|---|
| `DashboardLayout.tsx` reverted to `useState` side-effect (should be `useEffect`) | Medium | Phase 4 |
| All `[YOUR_USERNAME]` placeholders need real values before deploy | Low | Before Phase 10 |
| `RESUME_PDF_PATH` is `undefined` — set when PDF is available | Low | Before Phase 10 |

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.3.0 | 2026-06-03 | Phase 3 complete — 37 source files, updated QA and test case docs |
| v0.2.0 | 2026-06-03 | Phase 2 complete — 7 feature spec docs added |
| v0.1.0 | 2026-06-03 | Initial index — 25 documents |
