# Phase Roadmap — LifeOS Portfolio Dashboard

**Version:** v0.1.0
**Date:** 2026-06-03
**Author:** Rory
**Status:** Active — reference document for all future sessions

---

## How to Use This Document

At the start of each new session, read this document to understand which phase to continue from.
Check `docs/qa/qa-execution-log_v0.3.0.md` (or latest) for the current completed phase.
Then paste the relevant phase prompt below into a new Claude session.

---

## Phase Completion Status

| Phase | Name | Status |
|---|---|---|
| 0 | Project setup | ✅ Complete |
| 1 | Portfolio shell | ✅ Complete |
| 2 | Dashboard shell (stubs) | ✅ Complete |
| 3 | Portfolio pages | ✅ Complete |
| 4 | Dashboard shell (full) | Not started |
| 5 | Task Tracker | Not started |
| 6 | Prompt Library | Not started |
| 7 | Job Application Tracker | Not started |
| 8 | Budget Tracker | Not started |
| 9 | Full QA + Refactor pass | Not started |
| 10 | Vercel deployment preparation | Not started |
| 11 | Supabase planning only | Not started |
| 12 | Supabase foundation | Not started |
| 13 | Connect features to Supabase | Not started |
| 14 | Auth + privacy hardening | Not started |
| 15 | Full Supabase QA | Not started |
| 16 | AI planning only | Not started |
| 17 | Optional AI implementation | Not started |
| 18 | 3D planning only | Not started |
| 19 | Optional 3D implementation | Not started |
| 20 | Final release review | Not started |

---

## Known Issue Carried Forward

**DashboardLayout.tsx regression (BUG-014):** The `useEffect` for closing the sidebar on route change reverted to `useState` side-effect pattern. Fix in Phase 4 before building dashboard shell.

File: `src/app/DashboardLayout.tsx` line ~64
Fix: Change `useState(() => { setSidebarOpen(false) })` to `useEffect(() => { setSidebarOpen(false) }, [location.pathname])`
Also restore: `import { useState, useEffect, Suspense } from 'react'` and add `<Suspense>` wrapper around `<Outlet />`.

---

## NTFS Truncation Note

The Windows NTFS mount at `C:\Users\Work\Documents\Claude\Projects\Sample\lifeos-portfolio\` truncates large file writes from the Write tool. Use the subagent pattern for any file over ~50 lines:
- Write files via bash heredocs to `/sessions/.../lifeos-pN-final/` (native Linux ext3)
- Verify build there
- `cp -r` back to the NTFS mount

---

## Phase 4 Prompt

Start Phase 4 for LifeOS Portfolio Dashboard.

Goal: Build the full dashboard shell — layout, navigation, dashboard home with live stat cards,
weekly focus widget, quick actions, and stat widgets wired to feature state.

Known regression to fix first (before adding new features):
- DashboardLayout.tsx has useState(() => { setSidebarOpen(false) }) on line 64.
  Fix: replace with useEffect(() => { setSidebarOpen(false) }, [location.pathname]).
  Also restore import { useState, useEffect, Suspense } from 'react' and add the
  <Suspense> wrapper around <Outlet /> in the main content area.

Then build:
1. DashboardHomePage — wire StatCards to derive real counts from empty state arrays:
   - todaysTasks: tasks where dueDate <= today and status !== 'done' (always 0 in shell, shows placeholder)
   - openApplications: jobs where status not in [rejected, closed]
   - budgetBalance: sum of income minus expenses for current month
   - activeProjects: projects where status === 'in_progress'
2. WeeklyFocusWidget — editable single-line input saved to useState
3. QuickActions — "Add Task", "Log Application", "Add Entry" buttons (onClick opens modal stubs)
4. DashboardLayout — fix useEffect regression, restore Suspense wrapper

Also fix DashboardLayout mobile: confirm bottom nav or drawer works correctly on 390px,
no nav items are hidden or inaccessible.

Add new reusable components: StatCard (extract from DashboardHomePage inline), WeeklyFocusWidget.

Update router.tsx to confirm lazy-loading works with the Suspense wrapper.

Run after each sub-task:
- tsc -b (or via subagent if NTFS truncation occurs)
- eslint .

Update:
- docs/qa/qa-execution-log_v0.4.0.md (new run)
- docs/document-index_v0.4.0.md
- README.md if roadmap changes

Reference:
- docs/requirements/features/dashboard-home_v0.1.0.md (full spec)
- src/features/dashboard/pages/DashboardHomePage.tsx (current stub)
- src/app/DashboardLayout.tsx (regression to fix)

---

## Phase 5 Prompt

Start Phase 5 for LifeOS Portfolio Dashboard.

Goal: Build the Task Tracker MVP using local state only.

Do not add Supabase yet.
Do not add authentication yet.

Route: /dashboard/tasks

Task fields: id, title, description, status (todo/in_progress/done/blocked), priority (low/medium/high/urgent), dueDate, category, createdAt

Build:
- task list
- create task form
- edit task
- delete task with confirmation
- mark as done
- filter by status
- filter by priority
- empty state
- basic validation: title required

New reusable components: FormField, Input, Textarea, Select, ConfirmDialog

Testing (Playwright):
- create task
- required title validation
- mark as done
- empty state
- mobile layout

Documentation updates:
- docs/requirements/functional-requirements.md
- docs/requirements/acceptance-criteria.md
- docs/architecture/data-model.md
- docs/qa/test-cases.md
- docs/qa/qa-execution-log.md

Run: npm run build, npm run lint, npx playwright test

---

## Phase 6 Prompt

Start Phase 6 for LifeOS Portfolio Dashboard.

Goal: Build the Prompt Library MVP using local state only.

Do not add Supabase yet. Do not add AI generation yet.

Route: /dashboard/prompts

Prompt fields: id, title, category, useCase, promptBody, tags, createdAt, updatedAt

Categories: frontend development, QA testing, documentation, business analysis, product planning, resume and cover letter, daily planning, email replies

Build:
- prompt list
- prompt card with copy button
- prompt detail modal
- create prompt form
- edit prompt
- delete prompt
- category filter
- copy-to-clipboard with "Copied!" feedback
- empty state
- validation: title and prompt body required

Testing: create, copy, filter by category, validation, mobile layout

Documentation: functional-requirements, acceptance-criteria, data-model, test-cases, qa-execution-log, README

Run: npm run build, npm run lint, npx playwright test

---

## Phase 7 Prompt

Start Phase 7 for LifeOS Portfolio Dashboard.

Goal: Build the Job Application Tracker MVP using local state only.

Route: /dashboard/jobs

Job fields: id, company, role, location, jobType, status, jobLink, dateApplied, followUpDate, notes, createdAt

Statuses: saved, applied, interview, assessment, offer, rejected, closed

Build:
- job list
- create/edit/delete application
- status filter
- follow-up date highlighting (amber if today or earlier)
- empty state
- validation: company and role required
- clickable job link opens new tab

Testing: create, update status, filter, validate required fields, mobile layout

Documentation: functional-requirements, acceptance-criteria, data-model, test-cases, qa-execution-log

Run: npm run build, npm run lint, npx playwright test

---

## Phase 8 Prompt

Start Phase 8 for LifeOS Portfolio Dashboard.

Goal: Build the Budget Tracker MVP using local state only.

Do not add bank integrations. Do not add paid APIs.

Route: /dashboard/budget

Budget entry fields: id, title, amount, type (income/expense), category, date, notes, createdAt

Build:
- add income / add expense
- edit entry
- delete entry with confirmation
- entry list sorted by date desc
- filter by type/category
- total income, total expenses, remaining balance
- empty state
- validation: title required, amount must be positive

Testing (Playwright + Vitest): add income, add expense, totals correct, invalid amount rejected, delete updates totals, mobile layout

Vitest unit tests: calculateTotals(), isOverdue()

Documentation: functional-requirements, acceptance-criteria, data-model, test-cases, qa-execution-log, README

Run: npm run build, npm run lint, npx playwright test

---

## Phase 9 Prompt

Start Phase 9 for LifeOS Portfolio Dashboard.

Goal: Full QA, mobile, accessibility, and refactor pass across the MVP.

Do not add new major features. Do not add Supabase/AI/3D yet.

Review: public portfolio, dashboard shell, task tracker, prompt library, job tracker, budget tracker, reusable components, documentation, tests

Use: /code-review, /feature-review, /design:accessibility-review, /autogenerate, avoid-ai-writing, verification-before-completion

Check: broken imports, TypeScript issues, duplicated components, inconsistent UI, mobile overflow, icon overlap, inaccessible buttons, missing labels, weak empty states, missing validation, missing test cases, outdated documentation

Responsive viewports: 320px, 360px, 390px, 414px, 768px, desktop

Run: npm run build, npm run lint, npm run typecheck, npx playwright test

Update: docs/qa/test-plan.md, test-cases.md, playwright-plan.md, qa-execution-log.md, responsive-design.md, component-guide.md, document-index.md, README.md

---

## Phase 10 Prompt

Start Phase 10 for LifeOS Portfolio Dashboard.

Goal: Prepare the MVP for GitHub and Vercel deployment.

Do not add Supabase unless explicitly needed. No AI. No 3D.

Tasks:
1. Review repository structure and package scripts
2. Confirm build command and Vercel settings
3. Confirm no environment variables needed for MVP
4. Confirm README setup instructions
5. Create deployment-prep branch
6. Prepare PR with Conventional Commits

Run: npm run build, npm run lint, npm run typecheck, npx playwright test

Update: README.md, deployment-plan.md, vercel-deployment-guide.md, qa-execution-log.md, document-index.md

Create: PR_DRAFT.md

PR draft must include: summary, features included, checks run, test status, deployment instructions, known limitations, future Supabase plan

---

## Phase 11 Prompt — Supabase Planning Only

Start Phase 11 for LifeOS Portfolio Dashboard.

Goal: Plan Supabase integration only. Do not implement yet.

Supabase free tier only.

Create or update:
- docs/architecture/supabase-plan.md
- docs/architecture/database-schema.md
- docs/security/privacy-and-data-notes.md
- docs/requirements/functional-requirements.md
- docs/qa/test-cases.md
- docs/deployment/deployment-plan.md

Plan Supabase for: authentication, PostgreSQL, storage (future), RLS, tables: user_profiles, tasks, prompts, job_applications, budget_entries

For each table: fields, types, required/optional, owner relationship, privacy notes, RLS policy, CRUD behavior, QA cases

Do not implement. Do not create paid resources. Do not add secrets to GitHub.

---

## Phase 12 Prompt — Supabase Foundation

Start Phase 12 for LifeOS Portfolio Dashboard.

Goal: Implement the Supabase foundation after Phase 11 plan is approved.

Use Supabase free tier only. Author / Owner: Lorelai Raras

Main tasks:
1. Install Supabase client
2. Create Supabase environment variable documentation
3. Add Supabase client setup
4. Add authentication foundation
5. Add database schema documentation
6. Keep existing local-state features working while adding Supabase safely

Required tables: user_profiles, tasks, prompts, job_applications, budget_entries

Rules: no .env commits, .env.example only, clear setup instructions in README, do not break existing local-state UI

Update: README.md, supabase-plan.md, database-schema.md, privacy-and-data-notes.md, deployment-plan.md, test-cases.md, qa-execution-log.md, document-index.md

Run: npm run build, npm run lint, npm run typecheck, npx playwright test

---

## Phase 13 Prompt — Connect Features to Supabase

Start Phase 13 for LifeOS Portfolio Dashboard.

Goal: Connect Task Tracker, Prompt Library, Job Tracker, and Budget Tracker to Supabase persistence.

Requirements: keep UI behavior the same, replace local state with Supabase CRUD, add loading/error states, handle unauthenticated state, follow RLS policies, do not expose another user's data

For each feature: list current local-state behavior, implement Supabase CRUD, add loading/error handling, test, update docs

Testing: all CRUD operations, unauthenticated handling, mobile layout, data isolation

Run: npm run build, npm run lint, npm run typecheck, npx playwright test

---

## Phase 14 Prompt — Auth + Privacy Hardening

Start Phase 14 for LifeOS Portfolio Dashboard.

Goal: Harden authentication, user data separation, privacy, and Supabase security.

Review: Supabase Auth setup, protected routes, unauthenticated redirects, RLS policies, user-owned records, privacy docs, environment variables, GitHub secret safety, Vercel env setup

Requirements: public portfolio stays public, dashboard requires auth, users only access own data, no secrets committed, user-friendly error messages, mobile auth flow usable

Run: npm run build, npm run lint, npm run typecheck, npx playwright test

---

## Phase 15 Prompt — Full Supabase QA

Start Phase 15 for LifeOS Portfolio Dashboard.

Goal: Full QA pass after Supabase integration.

Test: logged-out public access, logged-out dashboard protection, login/logout, task CRUD, prompt CRUD, job CRUD, budget CRUD, user data isolation, mobile dashboard, mobile forms, empty/error/loading states

Run: npm run build, npm run lint, npm run typecheck, npx playwright test

---

## Phase 16 Prompt — AI Planning Only

Start Phase 16 for LifeOS Portfolio Dashboard.

Goal: Plan AI assistant features only. Do not implement yet. Free or optional AI only. No paid APIs without explicit approval.

AI features to plan: improve a prompt, summarize weekly tasks, generate job application notes, draft cover letter, analyze budget summary, suggest next project steps

Create: docs/product/ai-feature-plan.md, docs/requirements/ai-requirements.md, docs/architecture/ai-architecture.md, docs/security/ai-privacy-notes.md, docs/qa/ai-test-cases.md

---

## Phase 17 Prompt — Optional AI Implementation

Only proceed after Phase 16 plan is approved and specific feature is chosen.

Start Phase 17 for LifeOS Portfolio Dashboard.

Goal: Implement ONE approved AI feature. Keep it optional. Include fallback if AI unavailable. Do not expose secrets. Document whether paid API is required.

---

## Phase 18 Prompt — 3D Portfolio Planning Only

Start Phase 18 for LifeOS Portfolio Dashboard.

Goal: Plan the optional 3D portfolio layer only. Use React Three Fiber / Three.js only if it does not harm performance, accessibility, or usability.

Plan: 3D landing concept, fallback non-3D version, performance constraints, accessibility constraints (reduced-motion), mobile behavior, implementation risks

Create: docs/product/3d-portfolio-plan.md, docs/uiux/3d-experience-design.md, docs/architecture/3d-technical-plan.md, docs/qa/3d-test-cases.md

---

## Phase 19 Prompt — Optional 3D Implementation

Only proceed after Phase 18 plan is approved.

Rules: normal portfolio usable without 3D, include reduced-motion support, mobile fallback, do not harm Core Web Vitals, free/open-source packages only

---

## Phase 20 Prompt — Final Release Review

Start Phase 20 for LifeOS Portfolio Dashboard.

Goal: Prepare for final public portfolio release.

Review everything. Create: PR_DRAFT.md, docs/qa/final-release-review.md, docs/deployment/final-deployment-checklist.md, docs/product/portfolio-case-study.md

Do not push directly to main. Prepare PR for human review.

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.1.0 | 2026-06-03 | Phase roadmap created — Phases 0-3 complete, 4-20 documented |
