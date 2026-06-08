# Test Plan — LifeOS Portfolio Dashboard

**Version:** v0.1.0  
**Date:** 2026-06-03  
**Author:** Rory  
**Status:** Draft

---

## Testing Philosophy

Tests exist to catch regressions, not to create false confidence. Every test in this project must:
- Test real behaviour (not implementation details)
- Have a clear pass/fail result
- Be maintainable by one developer
- Run in CI without manual intervention

No test result is to be fabricated. If a test fails, the failure is logged in `docs/qa/qa-execution-log.md` and fixed before the phase is closed.

---

## Testing Layers

| Layer | Tool | Scope |
|---|---|---|
| E2E | Playwright | Full user flows from browser |
| Unit | Vitest | Pure utility functions, calculations |
| Manual | Checklist | Responsive layout, visual review |
| Accessibility | Playwright + manual | WCAG 2.1 AA checks |

---

## Test Phases

### Phase 0 — Setup and Build

Goal: confirm the project can be initialised, built, and linted cleanly.

| Check | Command | Expected result |
|---|---|---|
| Dependencies install | `npm install` | Exit code 0, no errors |
| Dev server starts | `npm run dev` | Server runs at localhost:5173 |
| Production build | `npm run build` | Exit code 0, dist/ created |
| TypeScript check | `npm run typecheck` | No type errors |
| Lint | `npm run lint` | No lint errors |
| Format check | `npm run format --check` | No formatting violations |

### Phase 1 — Public Portfolio

Goal: confirm all portfolio sections render correctly on all viewports.

| Test ID | Description | Type |
|---|---|---|
| TC-PF-001 | Homepage loads without errors | Playwright |
| TC-PF-002 | All navigation links are visible | Playwright |
| TC-PF-003 | Hero section contains name and two CTA links | Playwright |
| TC-PF-004 | About section contains bio text | Playwright |
| TC-PF-005 | Skills section shows at least six skill tags | Playwright |
| TC-PF-006 | Projects section shows at least two project cards | Playwright |
| TC-PF-007 | Each project card has a clickable link | Playwright |
| TC-PF-008 | Contact section shows email, GitHub, LinkedIn links | Playwright |
| TC-PF-009 | External links have `target="_blank"` and `rel="noopener noreferrer"` | Playwright |
| TC-PF-010 | No horizontal overflow at 390px viewport | Manual |
| TC-PF-011 | No horizontal overflow at 320px viewport | Manual |
| TC-PF-012 | Navigation accessible on mobile (hamburger opens/closes) | Playwright |

### Phase 2 — Dashboard Shell

| Test ID | Description | Type |
|---|---|---|
| TC-DB-001 | Dashboard home loads at `/dashboard` | Playwright |
| TC-DB-002 | Sidebar or nav shows all 6 links | Playwright |
| TC-DB-003 | Each nav link navigates to the correct route | Playwright |
| TC-DB-004 | Data-loss notice is visible on first load | Playwright |
| TC-DB-005 | Data-loss notice can be dismissed | Playwright |
| TC-DB-006 | Dashboard renders on 390px mobile | Manual |

### Phase 3 — Task Tracker

| Test ID | Description | Type |
|---|---|---|
| TC-TK-001 | Task tracker shows empty state with no tasks | Playwright |
| TC-TK-002 | New task appears in list after creation | Playwright |
| TC-TK-003 | Task created with default status "To Do" | Playwright |
| TC-TK-004 | Task status can be updated | Playwright |
| TC-TK-005 | Task priority can be updated | Playwright |
| TC-TK-006 | Edit form opens pre-filled with existing task data | Playwright |
| TC-TK-007 | Task is removed from list after confirmed deletion | Playwright |
| TC-TK-008 | Deletion cancel leaves task in list | Playwright |

### Phase 4 — Prompt Library

| Test ID | Description | Type |
|---|---|---|
| TC-PL-001 | Prompt library shows empty state with no prompts | Playwright |
| TC-PL-002 | New prompt appears after creation | Playwright |
| TC-PL-003 | Copy button shows "Copied!" feedback | Playwright |
| TC-PL-004 | Category filter shows only matching prompts | Playwright |
| TC-PL-005 | "All" filter shows all prompts | Playwright |
| TC-PL-006 | Prompt edit form pre-fills existing data | Playwright |

### Phase 5 — Job Tracker

| Test ID | Description | Type |
|---|---|---|
| TC-JT-001 | Job tracker shows empty state with no applications | Playwright |
| TC-JT-002 | New application appears after creation | Playwright |
| TC-JT-003 | Application status can be updated | Playwright |
| TC-JT-004 | Overdue follow-up date is visually highlighted | Playwright |
| TC-JT-005 | Job posting URL opens in new tab | Manual |

### Phase 6 — Budget Tracker

| Test ID | Description | Type |
|---|---|---|
| TC-BT-001 | Budget tracker shows empty state with no entries | Playwright |
| TC-BT-002 | New entry appears after creation | Playwright |
| TC-BT-003 | Income total is calculated correctly | Playwright + Vitest |
| TC-BT-004 | Expense total is calculated correctly | Playwright + Vitest |
| TC-BT-005 | Net balance = income - expenses | Playwright + Vitest |
| TC-BT-006 | Type filter shows only income entries when "Income" selected | Playwright |
| TC-BT-007 | Entry is removed after confirmed deletion, totals update | Playwright |

### Phase 7 — Responsive and Accessibility

| Test ID | Description | Type |
|---|---|---|
| TC-A11Y-001 | All interactive elements reachable by Tab | Manual |
| TC-A11Y-002 | All focusable elements have visible focus rings | Manual |
| TC-A11Y-003 | All form inputs have associated labels | Playwright (attr check) |
| TC-A11Y-004 | All icon-only buttons have aria-label | Playwright (attr check) |
| TC-A11Y-005 | Modal traps focus and closes on Escape | Playwright |
| TC-A11Y-006 | Colour contrast passes for primary text | Manual (WebAIM) |
| TC-RESP-001 | No horizontal overflow at 320px | Manual |
| TC-RESP-002 | No horizontal overflow at 390px | Manual |
| TC-RESP-003 | No horizontal overflow at 768px | Manual |
| TC-RESP-004 | Layout correct at 1280px | Manual |

### Phase 8 — Deployment Smoke Test

| Test ID | Description | Type |
|---|---|---|
| TC-DEP-001 | Production build completes without errors | CLI |
| TC-DEP-002 | Live Vercel URL loads the homepage | Manual |
| TC-DEP-003 | Dashboard route loads on live URL | Manual |
| TC-DEP-004 | No 404 errors on any linked page on live URL | Manual |
| TC-DEP-005 | HTTPS is active on the live URL | Manual |

---

## Unit Test Scope (Vitest)

Vitest tests are written for pure utility functions only. Do not test React components with Vitest — use Playwright.

Planned unit tests:
- `formatCurrency(amount, type)` — returns correct string for income and expense
- `calculateTotals(entries)` — returns correct income, expense, balance
- `isOverdue(dateString)` — returns true when date is today or earlier
- `formatDate(isoString)` — returns human-readable date string

---

## Test Execution Log

Results are recorded in `docs/qa/qa-execution-log.md`. Bug reports go in `docs/qa/bug-fix-log.md`.

Do not mark a phase as complete until all tests for that phase pass and are logged.

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.1.0 | 2026-06-03 | Initial test plan created |
