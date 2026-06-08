# Document Index — LifeOS Portfolio Dashboard

**Version:** v0.4.0
**Date:** 2026-06-03
**Author:** Rory
**Status:** Active
**Supersedes:** document-index_v0.3.0.md

---

## Root Documents

| # | Document | Path | Status | Latest Version |
|---|---|---|---|---|
| 1 | README | `README.md` | Draft | v0.2.0 |
| 2 | CLAUDE Rules | `CLAUDE.md` | Draft | v0.1.0 |

---

## Product Documents (`docs/product/`)

| # | Document | Path | Status | Latest Version |
|---|---|---|---|---|
| 3 | Project Brief | `docs/product/project-brief_v0.1.0.md` | Draft | v0.1.0 |
| 4 | Product Vision | `docs/product/product-vision_v0.2.0.md` | Draft | v0.2.0 |
| 5 | MVP Scope | `docs/product/mvp-scope_v0.2.0.md` | Draft | v0.2.0 |
| 6 | Roadmap | `docs/product/roadmap_v0.1.0.md` | Draft | v0.1.0 |
| 7 | Decision Log | `docs/product/decision-log_v0.1.0.md` | Draft | v0.1.0 |
| 8 | Phase Roadmap | `docs/product/phase-roadmap_v0.1.0.md` | Active | v0.1.0 ✅ NEW |
| 9 | Session Checkpoint | `docs/product/session-checkpoint_v0.1.0.md` | Active | v0.1.0 ✅ NEW |

---

## Requirements Documents (`docs/requirements/`)

| # | Document | Path | Status | Latest Version |
|---|---|---|---|---|
| 10 | Functional Requirements | `docs/requirements/functional-requirements_v0.2.0.md` | Draft | v0.2.0 |
| 11 | User Stories | `docs/requirements/user-stories_v0.1.0.md` | Draft | v0.1.0 |
| 12 | Acceptance Criteria | `docs/requirements/acceptance-criteria_v0.1.0.md` | Draft | v0.1.0 |

---

## Feature Spec Documents (`docs/requirements/features/`)

| # | Document | Path | Status | Latest Version |
|---|---|---|---|---|
| 13 | Portfolio | `features/portfolio_v0.1.0.md` | Draft | v0.1.0 |
| 14 | Dashboard Home | `features/dashboard-home_v0.1.0.md` | Draft | v0.1.0 |
| 15 | Task Tracker | `features/task-tracker_v0.1.0.md` | Draft | v0.1.0 |
| 16 | Prompt Library | `features/prompt-library_v0.1.0.md` | Draft | v0.1.0 |
| 17 | Job Tracker | `features/job-tracker_v0.1.0.md` | Draft | v0.1.0 |
| 18 | Budget Tracker | `features/budget-tracker_v0.1.0.md` | Draft | v0.1.0 |
| 19 | Projects | `features/projects_v0.1.0.md` | Draft | v0.1.0 |

---

## Architecture Documents (`docs/architecture/`)

| # | Document | Path | Status | Latest Version |
|---|---|---|---|---|
| 20 | System Architecture | `docs/architecture/system-architecture_v0.1.0.md` | Draft | v0.1.0 |
| 21 | Tech Stack | `docs/architecture/tech-stack_v0.1.0.md` | Draft | v0.1.0 |
| 22 | Data Model | `docs/architecture/data-model_v0.2.0.md` | Draft | v0.2.0 |

---

## UI/UX Documents (`docs/uiux/`)

| # | Document | Path | Status | Latest Version |
|---|---|---|---|---|
| 23 | Screen Inventory | `docs/uiux/screen-inventory_v0.2.0.md` | Draft | v0.2.0 |
| 24 | Design System | `docs/uiux/design-system_v0.1.0.md` | Draft | v0.1.0 |
| 25 | Responsive Design | `docs/uiux/responsive-design_v0.1.0.md` | Draft | v0.1.0 |

---

## QA Documents (`docs/qa/`)

| # | Document | Path | Status | Latest Version |
|---|---|---|---|---|
| 26 | Test Plan | `docs/qa/test-plan_v0.1.0.md` | Draft | v0.1.0 |
| 27 | Test Cases | `docs/qa/test-cases_v0.2.0.md` | Draft | v0.2.0 |
| 28 | Playwright Plan | `docs/qa/playwright-plan_v0.1.0.md` | Draft | v0.1.0 |
| 29 | QA Execution Log | `docs/qa/qa-execution-log_v0.4.0.md` | Active | v0.4.0 ✅ |
| 30 | Bug Fix Log | `docs/qa/bug-fix-log_v0.1.0.md` | Active | v0.1.0 |

---

## Deployment Documents (`docs/deployment/`)

| # | Document | Path | Status | Latest Version |
|---|---|---|---|---|
| 31 | Deployment Plan | `docs/deployment/deployment-plan_v0.1.0.md` | Draft | v0.1.0 |
| 32 | Vercel Guide | `docs/deployment/vercel-deployment-guide_v0.1.0.md` | Draft | v0.1.0 |

---

## Security Documents (`docs/security/`)

| # | Document | Path | Status | Latest Version |
|---|---|---|---|---|
| 33 | Privacy and Data Notes | `docs/security/privacy-and-data-notes_v0.1.0.md` | Draft | v0.1.0 |

---

## Decision Documents (`docs/decisions/`)

| # | Document | Path | Status | Latest Version |
|---|---|---|---|---|
| 34 | Human Decisions Log | `docs/decisions/human-decisions_v0.1.0.md` | Active | v0.1.0 |

---

## Source File Summary (Phase 4 — 40 files)

```
src/
├── app/            3 files  (router, PortfolioLayout, DashboardLayout)
├── components/    13 files  (+ StatCard, WeeklyFocusWidget)
├── features/
│   ├── portfolio/ 10 files
│   └── dashboard/  7 files  (DashboardHomePage now fully wired)
├── styles/         1 file
├── types/          1 file
├── utils/          2 files  (dateUtils, budgetUtils)  ← NEW
└── root            3 files
```

### New in Phase 4

| File | Type | Purpose |
|---|---|---|
| `src/utils/dateUtils.ts` | Utility | `isOverdue`, `formatDate`, `getCurrentMonthRange` |
| `src/utils/budgetUtils.ts` | Utility | `calculateTotals`, `formatCurrency`, `filterCurrentMonth` |
| `src/components/StatCard.tsx` | Component | Accessible stat card with `data-testid` |
| `src/components/WeeklyFocusWidget.tsx` | Component | Editable weekly focus with accessible label |

### Fixed in Phase 4

| File | Fix |
|---|---|
| `src/app/DashboardLayout.tsx` | BUG-014: `useState` → `useEffect`; added `Suspense` wrapper |
| `src/app/router.tsx` | BUG-015: restored `React.lazy()` for all dashboard routes |
| `src/features/dashboard/pages/DashboardHomePage.tsx` | Full implementation: stat cards wired to derived state |

---

## Known Issues

| Issue | Severity | Fix Phase |
|---|---|---|
| `[YOUR_USERNAME]` placeholders in portfolio data | Low | Before Phase 10 |
| `RESUME_PDF_PATH = null` (no PDF yet) | Low | Before Phase 10 |

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.4.0 | 2026-06-03 | Phase 4 complete — 40 source files, 3 bugs fixed, utilities added |
| v0.3.0 | 2026-06-03 | Phase 3 complete — 37 source files |
| v0.2.0 | 2026-06-03 | Phase 2 complete — feature spec docs added |
| v0.1.0 | 2026-06-03 | Initial index |
