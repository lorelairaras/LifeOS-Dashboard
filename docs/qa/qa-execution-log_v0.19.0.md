# QA Execution Log — v0.19.0

**Phase:** BUG-23C-01 fix — cleared optional fields not persisting on update
**Date:** 2026-06-12
**Executed by:** Claude (author) + independent review agent (reviewer ≠ author)
**Branch:** fix/cleared-fields-persistence
**Supersedes:** qa-execution-log_v0.18.0.md

> Merge note: this QA round was originally written as `v0.18.0` on the
> `fix/cleared-fields-persistence` branch. The `fix/dialog-focus-a11y` branch
> independently claimed `v0.18.0` for its a11y round and merged to main first.
> On merging this branch, the cleared-fields round was re-homed to `v0.19.0`
> (superseding the published a11y `v0.18.0`); main's `v0.18.0` is unchanged.

---

## Scope

Fix the cleared-fields persistence defect (BUG-23C-01) in the four feature hooks whose
edit forms submit full payloads with `undefined` for cleared optional fields, while the
update path used `toDb()` (which drops `undefined` keys). Verify demo-mode reducers are
unaffected. Full QA per CLAUDE.md before PR.

See `bug-fix-log_v0.3.0.md` for the BUG-23C-01 root-cause/fix record.

---

## Final Summary

| Check | Result |
|---|---|
| TypeScript (`npm run typecheck`) | PASS |
| ESLint (`npm run lint`) | PASS — 0 warnings (`--max-warnings 0`) |
| Unit tests (`vitest run`) | PASS — 34/34 (14 new: 8 helper, 6 call-site contract) |
| Playwright E2E (`npx playwright test`) | PASS — 82/82 on Chromium + mobile-chrome (was 80; +TC-JT-006 ×2) |
| Independent review | Round 1: REQUEST CHANGES (2 Major + findings) → all addressed → re-review |
| Post-merge re-verification | Recorded below (merge with main's a11y round) |

---

## Changes Made

| File | Change |
|---|---|
| `src/features/jobs/hooks/useJobs.ts` | update path `toDb(changes)` → `toDbUpdate(changes)` |
| `src/features/tasks/hooks/useTasks.ts` | update path `toDb(changes)` → `toDbUpdate(changes)` |
| `src/features/prompts/hooks/usePrompts.ts` | update path `toDb(changes)` → `toDbUpdate(changes)` |
| `src/features/budget/hooks/useBudget.ts` | update path `toDb(changes)` → `toDbUpdate(changes)` (same defect, found during fix) |
| `src/features/vault/hooks/useNotes.ts` | update path → `toDbUpdate(changes)` (behaviour-identical today; prevents silent recurrence) |
| `src/lib/supabaseHelpers.test.ts` | NEW — 8 unit tests for `snakeToCamel`/`camelToSnake`/`fromDb`/`toDb`/`toDbUpdate` |
| `src/lib/supabaseUpdateContract.test.ts` | NEW — 6 source-contract tests pinning every update hook to `toDbUpdate` |
| `tests/e2e/homepage.spec.ts` | NEW TC-JT-006 — clear optional field → save → reopen → field empty |

`useProjects` already used `toDbUpdate` (Phase 23B review fix); left unchanged.

---

## Demo-Mode Verification

The non-Supabase branch of every update function was left untouched. It dispatches
`{ ...changes }` directly into the reducer, where the spread already overwrites a field
with explicit `undefined`, clearing it in memory. Demo mode and Supabase mode therefore
now behave identically on field clear. Confirmed by E2E (tests run in demo mode — no
Supabase env configured), where TC-JT-006 asserts the cleared value is gone from the
store after reopening the form.

---

## Independent Review (Round 1) Findings and Resolutions

Review performed by a separate agent with no knowledge of the implementation, per
organisation review policy. Verdict: **REQUEST CHANGES** (code correct; test/process gaps).

| # | Severity | Finding | Resolution |
|---|---|---|---|
| 1 | Major | Helper-only tests can't catch the real bug — it lived at the hook call sites; reverting a hook to `toDb` still passed the suite | **FIXED** — added `supabaseUpdateContract.test.ts` (mutation-tested: reverting any hook to `toDb` fails it) + E2E TC-JT-006 |
| 2 | Major (process) | Mandatory QA docs not updated — no `bug-fix-log` bump, no `qa-execution-log` entry | **FIXED** — `bug-fix-log` (BUG-23C-01) + this log + document index |
| 3 | Minor | `useNotes` still used `toDb` on update — latent recurrence if an optional field is added to `NoteInput` | **FIXED** — switched to `toDbUpdate` with explanatory comment |
| 4 | Info | `toDbUpdate` passes through any key incl. `id`/`user_id`/`created_at` | **NO CHANGE** — unreachable from typed callers; neutralised by RLS `WITH CHECK (auth.uid() = user_id)`. Flagged for optional defense-in-depth hardening |
| 5 | Info | Four fixed hooks don't `setError(null)` on entry (stale banner) — `useProjects` does | **DEFERRED** — pre-existing, not introduced here; tracked for a hooks-wide consistency pass |
| 6 | Info | update/delete guards use `!isSupabaseConfigured` only while load/add use `\|\| !user` | **DEFERRED** — pre-existing across all hooks; tracked separately |

---

## Mutation Test (regression-pin proof)

To confirm the new contract test actually guards the fix, `useJobs` update path was
temporarily reverted to `toDb(changes)`:

- `supabaseUpdateContract.test.ts` → **1 failed / 5 passed** (caught the regression)
- Reverted back via `git checkout` → **6/6 passed**

---

## Post-Merge Re-Verification (merge with main)

After merging `origin/main` (which carries the a11y round: ConfirmDialog focus trap,
focus restore, persistent loading live regions, +8 a11y E2E tests), the combined tree
was re-verified. Both change sets touch different files; the only merge conflicts were
versioned doc bookkeeping (resolved by re-homing this branch's docs to the next free
version numbers). Combined-suite results are recorded in the merge commit.

---

## Standards Readiness Check

| Standard | Flag | Notes |
|---|---|---|
| ISO 27001 | ✅ | No change to RLS posture; UPDATE payload cannot reassign `user_id`/`id` (RLS `WITH CHECK`). Reviewer confirmed from migration SQL |
| OWASP | ✅ | No new injection surface (parameterised PostgREST); identity/audit columns not writable by typed callers |
| ISO 9001 | ✅ | Full QA loop: author fix → independent review → classify → fix → mutation-test → targeted + full rerun → versioned log |
| SOC 2 | ✅ | Change-management evidence trail complete (bug log, QA log, document index versioned; PR not direct push) |
| DPTM | ✅ | No personal data exposure; demo data fictional |

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.19.0 | 2026-06-12 | BUG-23C-01 fix re-homed from a colliding v0.18.0 — cleared optional fields persist on update in jobs/tasks/prompts/budget (+useNotes hardening). 14 new tests; 82/82 E2E + 34/34 unit. |
| v0.18.0 | 2026-06-11 | (main) A11y fix round — ConfirmDialog focus trap, focus restore both dialogs, persistent loading live regions. 88/88 E2E. |
| v0.17.0 | 2026-06-11 | Independent review fix round — 3 Major + 5 Minor fixed; 80/80 E2E + 20/20 unit |
| v0.16.0 | 2026-06-11 | Phase 23B pre-review QA — 78/78 tests |
| v0.15.0 | 2026-06-10 | Phase 23A QA — 46/46 tests |
