# QA Execution Log — v0.17.0

**Phase:** 23B — Functional Features + Independent Review Fix Round  
**Date:** 2026-06-11  
**Executed by:** Claude (author) + independent review agent (reviewer ≠ author)  
**Branch:** feat/phase-23b-functional-features  
**Supersedes:** qa-execution-log_v0.16.0.md (pre-review run)

---

## Final Summary

| Check | Result |
|---|---|
| TypeScript (`npm run typecheck`) | PASS |
| ESLint (`npm run lint`) | PASS — 0 warnings |
| Unit tests (`vitest run`) | PASS — 20/20 (13 new for habit date/streak logic) |
| Playwright E2E (80 tests) | PASS — 80/80 on Chromium + mobile-chrome |
| Independent review | REQUEST CHANGES → all 3 Major findings fixed → re-verified |

---

## Independent Review Findings and Resolutions

Review performed by a separate agent with no knowledge of the implementation, per organisation review policy.

| # | Severity | Finding | Resolution |
|---|---|---|---|
| 1 | Major | `habit_checks` INSERT policy didn't verify the habit belongs to the caller — cross-tenant interference via cross-user `UNIQUE(habit_id, date)` | **FIXED** — policy now requires `EXISTS (SELECT 1 FROM habits WHERE id = habit_id AND user_id = auth.uid())` (migration 002, never applied to a live DB before fix) |
| 2 | Major | Habit dates used UTC (`toISOString`) while labels used local time — "Today" wrote to yesterday's row for UTC+N users before ~N am | **FIXED** — new `src/features/habits/utils/dates.ts` with local-date helpers; `mockData.d()` aligned; 13 unit tests added incl. the UTC+7 06:00 edge case |
| 3 | Major | Clearing an optional project field on edit silently failed to persist (undefined keys dropped by `toDb`) | **FIXED** — new `toDbUpdate()` helper maps undefined → NULL on update paths; applied in `useProjects` |
| 4 | Minor | No URL scheme validation — `javascript:` URLs storable (latent stored-XSS once projects render publicly) | **FIXED** — ProjectForm validates `^https?://` with field-level errors; invalid `'#'` placeholder URLs removed from demo data |
| 5 | Minor | Sticky error banner — `error` never reset on subsequent success | **FIXED** — `setError(null)` at the start of every mutate operation in useProjects/useHabits/useNotes |
| 6 | Minor | Load effects lack unmount guards / `.catch` (matches pre-existing useTasks pattern) | **DEFERRED** — consistent with established pattern; flagged for a hooks-wide hardening pass |
| 7 | Minor | `deleteHabit` guard asymmetry vs `addHabit` | **NO CHANGE** — follows the established useTasks convention (delete guards `!isSupabaseConfigured` only); RLS covers server side |
| 8 | Minor | A11y: aria-label on non-interactive span; day labels hidden on mobile; today-cell not visually marked | **FIXED** — sr-only streak text; per-cell 2-letter day labels on mobile; pink ring marks today's cell; checked border contrast raised to /50. ConfirmDialog focus-trap + aria-live loading deferred (pre-existing shared components) |
| 9 | Minor | Projects list rendered empty `<ul>` during loading | **FIXED** — proper `loading ? … : empty ? … : list` ternary |
| 10 | Minor | No unit tests for `currentStreak`; no note-edit E2E | **FIXED** — 13 unit tests (dates.test.ts) + TC-KV-006 note edit test |

## Bug Found by New Validation (this fix round)

### BUG-23B-03: Demo projects used `'#'` placeholder URLs
- **Classification:** Data (demo seed)
- **Symptom:** TC-PR-003 edit modal wouldn't close — new URL validation correctly rejected `githubUrl: '#'`
- **Fix:** Removed placeholder `'#'` URLs from DEMO_PROJECTS (cards already hid them)
- **Verification:** Targeted rerun PASS → full suite 80/80 PASS

---

## Test Inventory After This Round

| Suite | Count |
|---|---|
| Unit (vitest) | 20 (7 budgetUtils + 13 habit dates/streak) |
| E2E (Playwright, ×2 browsers) | 80 (homepage 46 + phase23b 34) |
| New test IDs this round | TC-KV-006 (note edit), 13 unit cases for localIsoDate/currentStreak/dayLabel |

---

## Standards Readiness Check

| Standard | Flag | Notes |
|---|---|---|
| ISO 27001 | ✅ | Tenant-isolation gap fixed at migration time (never reached a live DB); RLS verified by independent reviewer |
| OWASP | ✅ | URL scheme allow-list closes latent stored-XSS; React text interpolation everywhere (no innerHTML) |
| WCAG 2.1 AA | ✅ | Review gaps fixed; remaining ConfirmDialog focus-trap deferred and tracked |
| ISO 9001 | ✅ | Full QA loop: independent review → classify → fix → targeted rerun → full rerun → log |
| DPTM | ✅ | No personal data exposure; demo data fictional; budget data never logged |

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.17.0 | 2026-06-11 | Independent review fix round — 3 Major + 5 Minor fixed, 2 deferred with rationale; 80/80 E2E + 20/20 unit |
| v0.16.0 | 2026-06-11 | Phase 23B pre-review QA — 78/78 tests |
| v0.15.0 | 2026-06-10 | Phase 23A QA — 46/46 tests |
