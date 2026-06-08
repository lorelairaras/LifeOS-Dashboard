# QA Execution Log

<!-- changelog:
  v0.9.0 — Phase 9 QA + Accessibility Pass. Bugs A-G fixed. Bug H confirmed false alarm.
-->

Supersedes: `qa-execution-log_v0.8.0.md`

---

## Run 008 — Phase 9 QA + Accessibility Pass

**Date:** 2026-06-08  
**Phase:** 9 — Full QA + Accessibility + Mobile Consistency  
**Scope:** Fix real bugs only. No new features.

---

## Build Gate Results

| Check | Command | Exit Code | Result |
|-------|---------|-----------|--------|
| TypeScript | `tsc -b` | 0 | PASS |
| ESLint | `eslint src --max-warnings 0` | 0 | PASS |
| Vite build | `vite build` | 0 | PASS |

---

## Accessibility Fixes

| Bug ID | File | Finding | Severity | Fix Applied |
|--------|------|---------|----------|-------------|
| BUG B | `src/features/prompts/components/PromptCard.tsx` | Body preview `<p onClick>` had no keyboard handler, no role, no tabIndex — keyboard users could not activate it (WCAG 2.1 AA failure, SC 2.1.1) | High | Converted `<p>` to `<button type="button">` with `aria-label`, `w-full text-left`, preserving line-clamp and mono styling |
| BUG C | `src/features/prompts/components/PromptCard.tsx` | "View full prompt" button had no identifying aria-label; screen readers could not distinguish between multiple cards | High | Added `aria-label={\`View full prompt: ${prompt.title}\`}` |
| BUG D | `src/components/Modal.tsx` | Tab key not trapped within modal dialog — focus escaped to page behind it (WCAG 2.1 AA failure, ARIA APG modal pattern) | High | Added `handleTabKey` function intercepting Tab/Shift+Tab to cycle focus within focusable elements; bound to `onKeyDown` on dialog div |
| BUG H | `src/features/prompts/components/PromptCard.tsx` | Title `<button>` reviewed for missing aria-label | Low | **False alarm — no fix needed.** Button text content `{prompt.title}` is its accessible name per ARIA spec. Already correct. |

---

## Mobile Consistency Fixes

| Bug ID | Files | Finding | Severity | Fix Applied |
|--------|-------|---------|----------|-------------|
| BUG E | `src/features/tasks/components/TaskForm.tsx` (2 occurrences) | `grid grid-cols-2 gap-4` inside modals caused ~155px columns on 390px viewport — too cramped | Medium | Changed to `grid grid-cols-1 gap-4 sm:grid-cols-2` |
| BUG E | `src/features/jobs/components/JobForm.tsx` (4 occurrences) | Same as above | Medium | Changed to `grid grid-cols-1 gap-4 sm:grid-cols-2` |
| BUG E | `src/features/budget/components/BudgetForm.tsx` (2 occurrences) | Same as above | Medium | Changed to `grid grid-cols-1 gap-4 sm:grid-cols-2` |
| BUG G | `src/features/budget/components/BudgetForm.tsx` | Cancel/Submit buttons used default size while TaskForm and JobForm use `size="sm"` — visual inconsistency | Low | Added `size="sm"` to both BudgetForm buttons |

---

## Stale Comment Fixes

| Bug ID | File | Finding | Fix Applied |
|--------|------|---------|-------------|
| BUG F | `src/features/dashboard/pages/DashboardHomePage.tsx` | Line 14 comment referenced "Phases 5-8" (now complete) | Updated to: `// Placeholder state arrays — local state only. Cross-page aggregation wired in Phase 12 (Supabase).` |
| BUG F | `src/features/dashboard/pages/DashboardHomePage.tsx` | User-visible `<p>` at line 87 read "modals will be added in Phases 5-8" — inaccurate for users | Removed the `<p>` element entirely |

---

## Playwright Test Changes

| Test ID | Change | Reason |
|---------|--------|--------|
| TC-PF-004 | `page.getByRole('region', { name: /hero/i })` → `page.locator('#hero')` | `HeroSection` has `aria-labelledby="hero-heading"` pointing to `<h1 id="hero-heading">Hi, I'm Rory</h1>`. Accessible name is "Hi, I'm Rory", not matching `/hero/i`. `#hero` is the stable ID selector. |

---

## Documented Decisions

### Stat Cards Show Zero

Dashboard stat cards (Tasks Due Today, Open Applications, Budget Balance, Active Projects) remain hardcoded to state arrays initialized as `[]`. This is intentional — the arrays are local state only. Cross-page aggregation and persistence will be wired in Phase 12 (Supabase integration). No fix required in Phase 9.

### BUG-017: execCommand Fallback in CopyButton

`document.execCommand('copy')` is a deprecated browser API used as a fallback in `CopyButton.tsx` when the Clipboard API is unavailable. This is acceptable for MVP. The modern `navigator.clipboard.writeText()` path is used when available. execCommand fallback is documented and will be revisited when browser support allows full removal.

### Modal Focus Trap Implementation

Tab cycling has been added to `Modal.tsx` via `handleTabKey` (bound to `onKeyDown` on the dialog div). This satisfies WCAG 2.1 AA for the modal pattern. Full `inert` attribute support for background content suppression is deferred to Phase 10+ — the `inert` attribute has broad browser support as of 2023 but requires additional coordination with routing and portal layers. The current Tab trap covers the core ARIA APG requirement.

---

## Standards-Readiness Notes (ISO 9001 / ISO 27001 / WCAG 2.1 AA)

- **WCAG 2.1 AA (SC 2.1.1 Keyboard):** BUG B resolved — all interactive content now keyboard-operable.
- **WCAG 2.1 AA (SC 4.1.2 Name, Role, Value):** BUG C resolved — all buttons now have distinguishable accessible names.
- **WCAG 2.1 AA (ARIA APG Dialog pattern):** BUG D resolved — focus trap implemented for modal dialogs.
- **WCAG 2.1 AA (responsive / reflow, SC 1.4.10):** BUG E resolved — form grids stack to single column at mobile widths.
- **ISO 9001 document control:** Versioned filename `qa-execution-log_v0.9.0.md` maintained per semantic versioning policy.
