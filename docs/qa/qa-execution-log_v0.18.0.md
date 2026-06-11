# QA Execution Log — v0.18.0

**Phase:** A11y fix round — deferred Minor findings from v0.17.0 (finding #8)
**Date:** 2026-06-11
**Executed by:** Claude (author) + independent review agent (reviewer ≠ author)
**Branch:** `fix/dialog-focus-a11y` (based on `feat/phase-23b-functional-features` @ 70fd6b1)
**Supersedes:** qa-execution-log_v0.17.0.md

---

## Scope

Resolves the two findings deferred in v0.17.0 finding #8 (pre-existing shared components):

| ID | Finding | WCAG reference |
|---|---|---|
| A11Y-FT | ConfirmDialog had no Tab focus trap (Modal already had one); neither dialog restored focus to the triggering element on close | 2.4.3 Focus Order, 2.1.2 No Keyboard Trap |
| A11Y-LR | Dashboard loading states ("Loading projects...", etc.) not announced to screen readers | 4.1.3 Status Messages |

## Changes

- `ConfirmDialog.tsx` — Tab/Shift+Tab focus trap (same `handleTabKey` pattern as Modal, disabled controls excluded) + focus restore to opener on close.
- `Modal.tsx` — focus restore to opener on close.
- Both dialogs capture the opener at the `isOpen` false→true transition **during render**, because `autoFocus` inside children moves focus during React's commit phase, before any effect runs (see BUG-A11Y-01).
- 7 dashboard pages (Budget, Habits, Jobs, Vault, Projects, Prompts, Tasks) — loading message now lives in a **persistent** `role="status"` `aria-live="polite"` region whose text toggles, rather than a conditionally mounted node (conditionally inserted live regions are unreliably announced across screen readers).
- `DashboardLayout.tsx` — `role="status"` + `aria-live="polite"` on the Suspense fallback (conditionally mounted by Suspense; see residual gaps).
- New E2E spec `tests/e2e/a11y-dialog.spec.ts` — TC-A11Y-001..004.

---

## Final Summary

| Check | Result |
|---|---|
| TypeScript (`npm run typecheck`) | PASS |
| ESLint (`npm run lint`) | PASS — 0 warnings |
| Prettier | PASS (touched files formatted) |
| Unit tests (`vitest run`) | PASS — 20/20 |
| Playwright E2E (88 tests) | PASS — 88/88 on chromium + mobile-chrome (4.0m) |
| Independent review | REQUEST CHANGES → both Major findings fixed, Minors fixed/deferred with rationale → re-verified |

E2E runs were executed on an isolated port (5199) with `reuseExistingServer: false` via a throwaway config, because port 5173 was serving unrelated in-progress Phase 23C work.

---

## Independent Review Findings and Resolutions

Review performed by a separate agent with no knowledge of the implementation, per organisation review policy.

| # | Severity | Finding | Resolution |
|---|---|---|---|
| 1 | Major | Modal focus restore captured the opener in a passive effect — `autoFocus` in every hosted form runs at commit, so the captured element was inside the dialog; restore silently no-oped (TC-A11Y-003 failed 2×) | **FIXED** — opener captured at the open transition during render in both dialogs; see BUG-A11Y-01. Re-verified: 88/88 |
| 2 | Major | Document index referenced a QA log (v0.18.0) that had not been written | **FIXED** — this document; records the real history including the failed intermediate run |
| 3 | Minor | Conditionally mounted live regions are unreliably announced; load completion never announced | **FIXED** (pages) — persistent `role="status"` region with toggled text on all 7 pages. Suspense fallback remains conditional (architectural; tracked below) |
| 4 | Minor | (a) Tests hard-code demo seed names; (b) no Modal trap test; (c) TC-A11Y IDs not in test-cases doc | (a) **NO CHANGE** — consistent with the existing phase23b suite convention; suite-wide selector hardening tracked as follow-up. (b) **FIXED** — TC-A11Y-004 added. (c) **DEFERRED** — matches existing convention (TC-PR/HB/KV are also QA-log-only); test-cases doc backfill tracked as follow-up |
| 5 | Nit | QA wrapper piped Playwright through `tail`, masking the real exit code (a failing run reported "exit 0"); leftover run artifacts in worktree | **FIXED** — reruns use output redirection (no pipe); the log file content is the recorded evidence; artifacts deleted before commit |

### Process note (honest record)

The first full-suite run during this round was reported as passing based on the wrapper's exit code 0 — that code was `tail`'s, not Playwright's. The re-run with correct capture recorded **2 failed / 84 passed** (TC-A11Y-003 on both projects), which the independent reviewer caught from the run artifact. The failure was real (BUG-A11Y-01), fixed, and the final run is 88/88. Lesson recorded: never pipe a test runner's output when its exit code is the gate.

---

## Bug Found This Round

### BUG-A11Y-01: Modal focus restore captured opener after autoFocus
See `bug-fix-log_v0.2.0.md`. Classification: logic (effect timing). Verified by TC-A11Y-003/004, full suite 88/88.

---

## Test Inventory After This Round

| Suite | Count |
|---|---|
| Unit (vitest) | 20 (7 budgetUtils + 13 habit dates/streak) |
| E2E (Playwright, ×2 browsers) | 88 (homepage 46 + phase23b 34 + a11y-dialog 8) |
| New test IDs this round | TC-A11Y-001 (ConfirmDialog trap), TC-A11Y-002 (ConfirmDialog restore), TC-A11Y-003 (Modal restore), TC-A11Y-004 (Modal trap) |

---

## Residual Gaps (tracked, not blocking)

| # | Gap | Rationale |
|---|---|---|
| 1 | Suspense fallback in `DashboardLayout` is still a conditionally mounted live region | Suspense controls mounting; a persistent app-level status region is an architectural change — follow-up |
| 2 | After confirm-delete, the opener is gone and focus falls to `<body>` (guarded, no error) | APG suggests a logical fallback target (list container/heading) — follow-up |
| 3 | Background content not `inert` while dialogs are open; `aria-modal` relied upon | Modern browser/SR pairs honour `aria-modal`; `inert` hardening — follow-up |
| 4 | Modal's `focusable[0]` initial focus lands on the X button, stomping form `autoFocus` | Pre-existing behavior, interacts with initial-focus policy — follow-up decision needed |
| 5 | E2E selectors hard-code demo seed names; TC IDs live only in QA logs, not the test-cases doc | Existing suite-wide convention — backfill/refactor as a dedicated chore |

---

## Standards Readiness Check

| Standard | Flag | Notes |
|---|---|---|
| WCAG 2.1 AA | ✅ | 2.4.3 / 2.1.2 verified by TC-A11Y-001..004 on both dialogs; 4.1.3 materially improved (persistent regions); residual gaps 1–4 tracked |
| ISO 9001 | ✅ | Full loop: implement → independent review → classify → fix root cause → targeted re-verify → full re-verify → log. Process defect (masked exit code) recorded with corrective action |
| ISO 27001 / SOC 2 (change mgmt) | ✅ | Branch + PR flow, reviewer ≠ author, evidence files versioned, no fabricated results — failed intermediate run recorded |
| DPTM | ✅ | No personal data involved; demo data fictional |

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.18.0 | 2026-06-11 | A11y fix round: ConfirmDialog focus trap, focus restore both dialogs (BUG-A11Y-01 found by independent review and fixed), persistent loading live regions. 88/88 E2E + 20/20 unit. |
| v0.17.0 | 2026-06-11 | Independent review fix round — 3 Major + 5 Minor fixed, 2 deferred with rationale; 80/80 E2E + 20/20 unit |
| v0.16.0 | 2026-06-11 | Phase 23B pre-review QA — 78/78 tests |
| v0.15.0 | 2026-06-10 | Phase 23A QA — 46/46 tests |
