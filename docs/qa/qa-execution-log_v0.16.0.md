# QA Execution Log — v0.16.0

**Phase:** 23B — Functional Features (Projects CRUD, Habit Rituals, Knowledge Vault)  
**Date:** 2026-06-11  
**Executed by:** Claude (automated) + independent review agent  
**Branch:** feat/phase-23b-functional-features  
**Supersedes:** qa-execution-log_v0.15.0.md

---

## Summary

| Check | Result |
|---|---|
| TypeScript (`npm run typecheck`) | PASS |
| ESLint (`npm run lint`) | PASS — 0 warnings |
| Playwright E2E (78 tests: 46 existing + 32 new) | PASS — 78/78 on Chromium + mobile-chrome |
| Visual verification (3 new module pages) | PASS — screenshots captured |
| Mobile layout (390px) | PASS — including 3 new TC-RESP-23B tests |
| Independent review agent | See "Independent Review" section |

---

## New Playwright Tests — Phase 23B (16 test cases × 2 browsers)

| ID | Description | Result |
|---|---|---|
| TC-PR-001 | Demo projects displayed on load | PASS |
| TC-PR-002 | Create a project | PASS |
| TC-PR-003 | Edit a project | PASS |
| TC-PR-004 | Delete a project with confirmation | PASS |
| TC-HB-001 | Demo habits displayed on load | PASS |
| TC-HB-002 | Add a new habit | PASS |
| TC-HB-003 | Toggle a habit check for today | PASS |
| TC-HB-004 | Delete a habit with confirmation | PASS |
| TC-KV-001 | Demo notes displayed on load | PASS |
| TC-KV-002 | Create a note | PASS |
| TC-KV-003 | Search filters notes | PASS |
| TC-KV-004 | Tag filter narrows the list | PASS |
| TC-KV-005 | Delete a note with confirmation | PASS |
| TC-RESP-23B (×3) | No horizontal overflow at 390px — Projects, Habits, Vault | PASS |

---

## Bugs Found and Fixed This Session

### BUG-23B-01: TC-JT-004 strict mode violation (date-dependent test)
- **Classification:** Test environment (date-dependent assertion)
- **Symptom:** `getByText(/⚠/)` resolved to 2 elements — a demo job's relative follow-up date crossed into "overdue" overnight, adding a second ⚠ badge
- **Root cause:** Assertion scoped to the entire job list rather than the entity the test creates
- **Fix:** Scoped assertion to the card containing 'OverdueInc' (the test's own data)
- **Verification:** Targeted rerun PASS, full suite rerun 78/78 PASS

### BUG-23B-02: New delete tests targeted wrong ARIA role
- **Classification:** Test setup
- **Symptom:** Delete confirmation tests failed — `getByRole('dialog')` not found
- **Root cause:** ConfirmDialog correctly uses `role="alertdialog"` (proper ARIA for destructive confirms); new tests copied the `dialog` role from form-modal tests
- **Fix:** Tests updated to `getByRole('alertdialog')`. Component unchanged (it was correct).

---

## Phase 23B Changes Validated

### Projects (Project Reliquary) — now fully functional
- `useProjects` wired to Supabase `projects` table (matches established useTasks pattern)
- `ProjectForm` modal: name, status, visibility, problem, tech stack, features, URLs
- Card actions: edit (pencil) and delete (trash with ConfirmDialog)
- Demo fallback: 3 demo projects in-memory when Supabase not configured

### Habit Rituals — now fully functional (was placeholder)
- `useHabits` hook: habits + habit_checks, Supabase + demo fallback
- 7-day toggle grid per habit with `aria-pressed` state
- Current streak calculation (today optional — doesn't break streak if unchecked yet)
- Add habit inline form, delete with confirmation
- 4 demo habits with staggered 7-day check history

### Knowledge Vault — now fully functional (was placeholder)
- `useNotes` hook: Supabase `notes` table + demo fallback
- Note CRUD via NoteForm modal (title, content, tags)
- Full-text search across title/content/tags + tag pill filters
- 5 demo notes with realistic content

### Infrastructure
- `supabase/migrations/002_projects_habits_notes.sql`: 4 new tables (projects, habits, habit_checks, notes), all with RLS owner-only policies, indexes, and updated_at triggers; `UNIQUE(habit_id, date)` prevents duplicate checks
- New types: `Habit`, `HabitCheck`, `Note` in `src/types/index.ts`
- Demo data: `DEMO_HABITS`, `DEMO_HABIT_CHECKS`, `DEMO_NOTES` (persona "Lyra M.")
- Sidebar: "soon" badges removed from Habit Rituals and Knowledge Vault (AI Oracle keeps it)
- New doc: `docs/deployment/personal-setup-guide_v0.1.0.md` — demo vs personal mode + Supabase setup

---

## Independent Review

Per organisation review policy, a separate review agent (no memory of the implementation) reviewed the staged diff for security (RLS), correctness, data integrity, accessibility, and consistency. Findings and resolutions are recorded in the PR description.

---

## Standards Readiness Check

| Standard | Flag | Notes |
|---|---|---|
| ISO 27001 | ✅ | All new tables RLS owner-only; anon key only in env (never committed); no service-role key anywhere |
| DPTM | ✅ | Personal data isolated per user; demo data is fictional; budget data still never logged |
| WCAG 2.1 AA | ✅ | Habit toggles use aria-pressed; all icon buttons labelled; alertdialog role on destructive confirms; forms use FormField + aria-required |
| ISO 9001 | ✅ | QA loop followed (classify → fix smallest root cause → targeted rerun → full rerun → log) |
| SOC 2 | ✅ | No secrets in repo; .env gitignored; .env.example only |

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.16.0 | 2026-06-11 | Phase 23B QA — 78/78 tests pass; 2 test bugs fixed and logged; independent review run |
| v0.15.0 | 2026-06-10 | Phase 23A QA execution log — 46/46 tests pass |
