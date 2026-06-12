# QA Execution Log — v0.20.0

**Phase:** 23C — Wording Simplification (re-homed + merged with main)
**Date:** 2026-06-12
**Executed by:** Claude (author) + independent review agent (reviewer ≠ author)
**Branch:** feat/phase-23c-wording-simplification
**Supersedes:** qa-execution-log_v0.19.0.md

> Merge note: the 23C wording QA round was originally written as `v0.18.0`. The
> `fix/dialog-focus-a11y` branch claimed `v0.18.0` and merged to main first, then
> cleared-fields took `v0.19.0`. On reconciling 23C with main, this round is re-homed
> to `v0.20.0` (superseding the published `v0.19.0`); main's `v0.18.0`/`v0.19.0` are
> unchanged.

---

## Phase 23C Changes (wording simplification)

Per `docs/uiux/naming-conventions_v0.1.0.md`:
- **Naming flip — plain English primary, gothic flavor optional.** Sidebar: Home, Today, Tasks,
  Prompts, Projects, Budget, Job Tracker, Weekly Review, Habits, AI Assistant, Notes. Groups:
  OVERVIEW · WORK · LIFE · REFLECT · MORE. Page headers on all 11 modules; flavor names render as
  subtitles only when the toggle is ON. Command palette: plain labels, flavor names kept as search keywords.
- **Flavor-names toggle** — new `useFlavorNames()` hook (localStorage, default OFF, in-memory fallback),
  Settings switch (`role="switch"`, `aria-checked`), optional `flavor` prop on `PageHeader`.
- **Microcopy** simplified to grade-8: demo notice + setup link, "Seal the Day" → "Save today's plan",
  momentum labels, empty states, AI page status; demo data de-branded; "Career Pipeline" stat → "Open Applications".

## Merge with main (this reconciliation)

Merged `origin/main` (which now carries the a11y round **and** cleared-fields). Conflicts were limited to:
- `DashboardLayout.tsx` — demo-notice copy (kept 23C's simplified text + setup link).
- `document-index_v0.14.0.md`, `qa-execution-log_v0.18.0.md` — version collisions; kept main's published
  a11y versions, re-homed 23C's docs to `document-index_v0.16.0.md` + this `v0.20.0` log.
The 7 dashboard pages auto-merged cleanly (23C renames + a11y persistent loading regions coexist).

## Final Summary (merged tree re-verification)

| Check | Result |
|---|---|
| TypeScript (`npm run typecheck`) | PASS |
| ESLint (`npm run lint`) | PASS — 0 warnings |
| Unit tests (`vitest run`) | PASS — 34/34 |
| Playwright E2E (`npx playwright test`) | PASS — 90/90 on Chromium + mobile-chrome (1.3m) |
| Independent review (23C, pre-merge) | APPROVE WITH MINOR FIXES — all actionable findings applied |

## Independent Review Findings (23C, recorded at v0.18.0/v0.19.0-era; resolutions still in tree)

| # | Severity | Finding | Resolution |
|---|---|---|---|
| 1 | Minor | Demo project keyFeatures listed old flavor names | FIXED — plain names |
| 2 | Minor | Portfolio eyebrow "Project Reliquary" matched neither name | FIXED — "The Reliquary" (brand moment) |
| 3 | Low | Home page missing flavor subtitle; palette lacked flavor keywords | FIXED |
| 4 | Low | Flavor toggle could stick ON when localStorage blocked | FIXED — in-memory fallback |
| 6 | Minor | Invalid `h-4.5` Tailwind + inline style on toggle knob | FIXED — `h-[18px] w-[18px]` |
| 7 | Nit | Voice inconsistency "Save my day" | FIXED — "Save today's plan" |
| 8 | Low | "surface spending patterns" jargon | FIXED — "find spending patterns" |
| 9 | Nit | Test describe-blocks used old names | FIXED |
| 5 | Nit | Toggle label not programmatically associated | DEFERRED — meets WCAG 4.1.2 as-is |

---

## Standards Readiness Check

| Standard | Flag | Notes |
|---|---|---|
| WCAG 3.1.5 (reading level) | ✅ | Functional copy at/below grade 8; flavor language opt-in |
| WCAG 4.1.2 | ✅ | Flavor toggle uses role="switch" + aria-checked |
| Nielsen heuristic #2 | ✅ | Module names use real-world vocabulary |
| ISO 9001 | ✅ | QA loop followed; merge conflicts resolved without weakening assertions; full re-verify after merge |
| ISO 27001 / SOC 2 (change mgmt) | ✅ | Branch + PR; reviewer ≠ author; versioned evidence; published doc versions preserved on re-home |

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.20.0 | 2026-06-12 | 23C wording round re-homed from a colliding v0.18.0 and merged with main (a11y + cleared-fields). 90/90 E2E + 34/34 unit on the merged tree. |
| v0.19.0 | 2026-06-12 | (main) Cleared-fields fix — cleared optional fields persist on update. 90/90 E2E. |
| v0.18.0 | 2026-06-11 | (main) A11y fix round — dialog focus trap, focus restore, persistent loading regions. 88/88. |
| v0.17.0 | 2026-06-11 | Independent review fix round — 80/80 E2E. |
