# Bug Fix Log — LifeOS Portfolio Dashboard

**Version:** v0.3.0
**Date:** 2026-06-12
**Author:** Claude (logged), reported by Rory
**Status:** Active — updated when bugs are found and fixed
**Supersedes:** bug-fix-log_v0.2.0.md

> Merge note: `bug-fix-log_v0.2.0.md` was created independently on two parallel
> branches — `fix/dialog-focus-a11y` (BUG-A11Y-01, merged to main) and
> `fix/cleared-fields-persistence` (BUG-23C-01). This v0.3.0 is the reconciled
> cumulative reference list holding both. The v0.2.0 file is preserved unchanged.

---

## Log Format

```
## BUG-[ID]
Date found: [date]
Found in: [phase] | [test ID if applicable]
Severity: Critical | High | Medium | Low
Description: [what is broken]
Root cause: [why it happened]
Fix applied: [what was changed]
Date fixed: [date]
Verified by: [test ID or manual confirmation]
Status: Open | Fixed | Won't Fix
```

> Note: bugs found during the Phase 22–23B QA rounds were recorded inline in the
> QA execution logs (e.g. BUG-23B-03 in `qa-execution-log_v0.17.0.md`). From v0.2.0
> onward, bugs are also logged here as the single reference list.

---

## BUG-A11Y-01

- **Date found:** 2026-06-11
- **Found in:** A11y fix round (branch `fix/dialog-focus-a11y`) | TC-A11Y-003
- **Severity:** Medium
- **Description:** Modal's newly added focus restore returned focus to `<body>` instead of the triggering element after close, for every Modal hosting a form (all current uses). Caught by the independent reviewer and confirmed by TC-A11Y-003 failing on chromium and mobile-chrome (2 failed / 84 passed).
- **Root cause:** The opener was captured via `document.activeElement` inside a passive `useEffect`. Every form rendered inside Modal sets `autoFocus` on its first field, and React applies `autoFocus` during the commit phase — before passive effects run — so the captured "opener" was actually the form's first input. That input is unmounted on close, the `isConnected` guard short-circuited, and focus silently dropped to `<body>`.
- **Fix applied:** Both `Modal.tsx` and `ConfirmDialog.tsx` now capture the opener at the `isOpen` false→true transition during render (before children commit), restoring it in the focus effect's cleanup with an `isConnected` guard.
- **Date fixed:** 2026-06-11
- **Verified by:** TC-A11Y-003 + TC-A11Y-004 — full suite 88/88 PASS (chromium + mobile-chrome)
- **Status:** Fixed

---

## BUG-23C-01

- **Date found:** 2026-06-11
- **Found in:** Post-23B hardening | reported by Rory; same root cause as Phase 23B independent-review finding #3 (which fixed `useProjects` only)
- **Severity:** High — clearing an optional field on an existing record is impossible in authenticated Supabase mode; no user workaround
- **Description:** Editing a job, task, prompt, or budget entry and clearing an optional field (location, jobType, jobUrl, notes, dateApplied, followUpDate, description, dueDate, useCase, budget notes) appeared to succeed, but the stale value silently survived in the database. On reload the cleared value reappeared.
- **Root cause:** Edit forms submit every field and map cleared optional fields to `undefined` (e.g. `JobForm.tsx` `location: form.location.trim() || undefined`). The update paths in `useJobs`, `useTasks`, `usePrompts`, and `useBudget` built the UPDATE payload with `toDb()`, which drops `undefined` keys — so the cleared column was never included in the UPDATE statement. `toDbUpdate()` (maps `undefined` → `NULL`) existed since the Phase 23B review but was applied only in `useProjects`.
- **Fix applied:**
  - `useJobs`, `useTasks`, `usePrompts`, `useBudget`: update paths switched from `toDb(changes)` to `toDbUpdate(changes)`.
  - `useNotes`: also switched (behaviour-identical today since `NoteInput` has no optional fields; prevents silent recurrence if one is added).
  - Demo-mode reducer paths untouched — explicit-`undefined` spread already cleared fields in memory, so demo and Supabase modes now behave consistently.
  - Regression pins added: unit tests for `toDb`/`toDbUpdate`/`fromDb` semantics (`src/lib/supabaseHelpers.test.ts`), a call-site contract test asserting every hook's update path uses `toDbUpdate` (`src/lib/supabaseUpdateContract.test.ts`, mutation-tested — reverting any hook to `toDb` fails it), and E2E TC-JT-006 (create → set location → edit → clear → save → reopen → field empty).
- **Date fixed:** 2026-06-11
- **Verified by:** TC-JT-006 (E2E), `supabaseUpdateContract.test.ts` (6 unit), `supabaseHelpers.test.ts` (8 unit), full suite reruns (typecheck, lint, vitest, Playwright) on branch `fix/cleared-fields-persistence`; independent review agent (reviewer ≠ author)
- **Status:** Fixed

---

## Severity Definitions

| Severity | Meaning |
|---|---|
| Critical | App crashes, data loss, security issue, or core flow completely broken |
| High | Feature is broken and there is no workaround |
| Medium | Feature is degraded but a workaround exists |
| Low | Minor visual or UX issue with no functional impact |

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.3.0 | 2026-06-12 | Reconciled cumulative log after parallel-branch version collision — now holds both BUG-A11Y-01 (from main) and BUG-23C-01 (cleared-fields). |
| v0.2.0 | 2026-06-11 | Created on two branches independently: main's = BUG-A11Y-01; cleared-fields' = BUG-23C-01. Superseded by v0.3.0. |
| v0.1.0 | 2026-06-03 | Bug fix log created — awaiting first bug |
