# QA Execution Log — v0.18.0

**Phase:** 23C — Wording Simplification  
**Date:** 2026-06-11  
**Executed by:** Claude (author) + independent review agent (reviewer ≠ author)  
**Branch:** feat/phase-23c-wording-simplification  
**Supersedes:** qa-execution-log_v0.17.0.md

---

## Summary

| Check | Result |
|---|---|
| TypeScript (`npm run typecheck`) | PASS |
| ESLint (`npm run lint`) | PASS — 0 warnings |
| Unit tests (`vitest run`) | PASS — 20/20 |
| Playwright E2E (80 tests) | PASS — 80/80 on Chromium + mobile-chrome (two full runs: post-rename, post-review-fixes) |
| Independent review | APPROVE WITH MINOR FIXES — all actionable findings applied (see below) |

### Independent Review Findings and Resolutions

| # | Severity | Finding | Resolution |
|---|---|---|---|
| 1 | Minor | Demo project keyFeatures still listed old flavor names | FIXED — plain names |
| 2 | Minor | Portfolio eyebrow said "Project Reliquary" (matches neither primary nor new flavor name) | FIXED — "The Reliquary" (brand moment per naming convention) |
| 3 | Low | Home page missing flavor subtitle; palette Home/Today sublabels had no flavor keywords | FIXED — "The Command Chamber" subtitle + palette keywords |
| 4 | Low | Flavor toggle could stick ON when localStorage is blocked | FIXED — in-memory fallback value |
| 6 | Minor | Invalid `h-4.5` Tailwind classes + inline style on toggle knob | FIXED — `h-[18px] w-[18px]`, inline style removed |
| 7 | Nit | Voice inconsistency "Save my day" | FIXED — "Save today's plan" |
| 8 | Low | "surface spending patterns" jargon | FIXED — "find spending patterns" |
| 9 | Nit | Test describe-blocks used old names | FIXED — renamed (cosmetic) |
| 5 | Nit | Toggle label not programmatically associated (enhancement) | DEFERRED — meets WCAG 4.1.2 as-is |

---

## Phase 23C Changes

### Naming flip (plain English primary, gothic flavor optional)
Per `docs/uiux/naming-conventions_v0.1.0.md`:
- Sidebar: Home, Today, Tasks, Prompts, Projects, Budget, Job Tracker, Weekly Review, Habits, AI Assistant, Notes
- Sidebar groups: OVERVIEW · WORK · LIFE · REFLECT · MORE
- Page headers updated on all 11 module pages; flavor names render as subtitles only when enabled
- Command palette: plain labels; flavor names kept in sublabels as search keywords

### Flavor names toggle
- New `useFlavorNames()` hook — localStorage key `lifeos:flavor-names`, default OFF
- Settings page: working toggle switch (role="switch", aria-checked)
- `PageHeader` accepts optional `flavor` prop

### Microcopy simplification
- Demo notice: "This is a demo with example data. Changes are not saved." + "Set up your own dashboard" link to the personal setup guide
- "Seal the Day" → "Save my day" (flavor version shown only when toggle ON)
- "Close the Séance" → "Save weekly review" (same)
- "The ritual is sealed" → "Your day is saved"; "Unseal and edit" → "Edit again"
- Momentum labels: "Peak ritual achieved" → "On fire"; "Awakening" → "Getting started"
- "No rituals scheduled yet" → "No tasks yet"
- AI page: "Dormant" → "Not active yet"; oracle quote shown only in flavor mode
- Demo task titles and project keyFeatures no longer reference old module names
- Demo budget dates shifted to the last 10 days so the current-month summary stays populated (was empty when relative dates drifted into the previous month)
- Home stat card "Career Pipeline" → "Open Applications"

### Tests updated
- TC-DB-001/002/003, TC-JT-001/005, TC-BT-001/005, TC-PR-001, TC-HB-001, TC-KV-001 — selectors renamed to plain names

---

## Standards Readiness Check

| Standard | Flag | Notes |
|---|---|---|
| WCAG 3.1.5 (reading level) | ✅ | All functional copy at or below grade-8; flavor language opt-in only |
| WCAG 4.1.2 | ✅ | Toggle uses role="switch" + aria-checked |
| Nielsen heuristic #2 | ✅ | All module names now use real-world vocabulary |
| ISO 9001 | ✅ | Naming convention documented (naming-conventions_v0.1.0.md); QA loop followed |

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.18.0 | 2026-06-11 | Phase 23C wording simplification QA |
| v0.17.0 | 2026-06-11 | Phase 23B review fix round |
