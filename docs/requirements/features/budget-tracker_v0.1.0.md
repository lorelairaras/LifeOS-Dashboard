# Feature Spec: Budget Tracker

**Version:** v0.1.0
**Date:** 2026-06-03
**Author:** Rory
**Status:** Draft

---

## Purpose

The budget tracker is a simple income and expense log. It is not an accounting system — it is the minimum needed to understand where money is coming from and going, without opening a spreadsheet or paying for a finance app.

## Scope

**In scope (MVP):** Create, read, delete budget entries. Title, amount, type, category, date, notes. Income/expense totals and net balance. Category summary. Type filter. Local state only.

**Out of scope (MVP):** Edit entries (delete and re-create instead), recurring entries, charts/graphs, multi-currency, budget targets, Supabase persistence.

---

## User Stories

| Story ID | Persona | User Story | Business Value | Priority | Status |
|---|---|---|---|---|---|
| US-BT-001 | Rory | As Rory, I want to log an income or expense entry with a title, amount, and date, so I have a running record of my finances. | Basic financial visibility | P1 | Planned |
| US-BT-002 | Rory | As Rory, I want to see my total income, total expenses, and net balance at a glance, so I know where I stand without calculating it manually. | Instant financial summary | P1 | Planned |
| US-BT-003 | Rory | As Rory, I want to see spending broken down by category, so I can see which areas are consuming the most money. | Spending pattern awareness | P2 | Planned |
| US-BT-004 | Rory | As Rory, I want to filter entries by income or expense, so I can focus on one side of my finances at a time. | Focused financial review | P2 | Planned |
| US-BT-005 | Rory | As Rory, I want to delete an incorrect entry, so I can correct mistakes without needing an edit feature. | Data accuracy | P1 | Planned |

---

## Functional Requirements

| Requirement ID | Requirement | Priority | MVP / Future | Notes |
|---|---|---|---|---|
| BUDGET-MVP-001 | User can create a budget entry with title, amount, type, and date as required fields | P1 | MVP | — |
| BUDGET-MVP-002 | Optional fields: category, notes | P2 | MVP | Category defaults to "Uncategorised" |
| BUDGET-MVP-003 | Entry type must be either "Income" or "Expense" | P1 | MVP | — |
| BUDGET-MVP-004 | Amount must be a positive number | P1 | MVP | Validation error if zero or negative |
| BUDGET-MVP-005 | Entry list shows title, amount, type badge, category, and date sorted by date descending | P1 | MVP | — |
| BUDGET-MVP-006 | The tracker must display total income, total expenses, and net balance (income minus expenses) | P1 | MVP | — |
| BUDGET-MVP-007 | The tracker must display a category summary showing totals per category | P2 | MVP | — |
| BUDGET-MVP-008 | The user can filter the entry list by type: All, Income, Expense | P2 | MVP | "All" is default |
| BUDGET-MVP-009 | The user can delete an entry with a confirmation step; totals update immediately | P1 | MVP | — |
| BUDGET-MVP-010 | Entries cannot be edited in MVP — delete and re-create to correct | P1 | MVP | Intentional limitation, communicated in UI |
| BUDGET-MVP-011 | Empty state shown when no entries exist | P1 | MVP | — |
| BUDGET-FUTURE-001 | Edit entries | — | Future | Deferred intentionally |
| BUDGET-FUTURE-002 | Recurring entries | — | Future | — |
| BUDGET-FUTURE-003 | Spending trend chart | — | Future | Requires chart library |
| BUDGET-FUTURE-004 | Monthly budget targets per category | — | Future | — |

---

## Acceptance Criteria

| AC ID | Scenario | Given | When | Then | Status |
|---|---|---|---|---|---|
| AC-BT-001 | Empty state | No entries exist | I open the budget tracker | Empty state and "Add Entry" button visible | Not tested |
| AC-BT-002 | Create income entry | I add a title "Freelance payment", amount 5000, type Income, date today | Form closes | Entry appears in list with Income badge | Not tested |
| AC-BT-003 | Totals update on add | I have income 5000 and expense 2000 | I view the summary | Income shows 5000, Expenses show 2000, Balance shows 3000 | Not tested |
| AC-BT-004 | Delete entry updates totals | I delete the expense 2000 entry | — | Balance updates to 5000 immediately | Not tested |
| AC-BT-005 | Type filter — Income | I click "Income" filter | — | Only income entries shown | Not tested |
| AC-BT-006 | Type filter — All | I click "All" filter | — | All entries shown | Not tested |
| AC-BT-007 | Category summary | I add entries in categories "Food" and "Salary" | I scroll to category summary | Each category shows its total | Not tested |
| AC-BT-008 | Amount validation | I enter amount 0 or -100 | I try to submit | Form shows validation error, entry not created | Not tested |
| AC-BT-009 | Delete with confirmation | I click Delete and confirm | — | Entry removed from list | Not tested |
| AC-BT-010 | Mobile layout | I open budget tracker at 390px | — | Entry list and summary render correctly | Not tested |

---

## UI / UX Notes

**Layout:** Summary bar at top (3 stat cards: Total Income, Total Expenses, Net Balance). Type filter pills below. Entry list. Category summary section at bottom.

**EntryRow:** Title (bold), amount (coloured: green for income, red for expense), type badge, category chip, date. Delete button (icon).

**Summary cards:**
- Total Income: green accent, + prefix
- Total Expenses: red accent, - prefix
- Net Balance: green if positive, red if negative

**Edit limitation notice:** Small info banner below the page header: "Entries cannot be edited. Delete and re-add to correct a mistake." Shown only when entries exist.

**Form modal:** Fields: Title (text), Amount (number, min 0.01), Type (radio: Income / Expense), Category (text or select), Date (date, defaults to today), Notes (textarea).

---

## Data Model

See `docs/architecture/data-model_v0.2.0.md` — `BudgetEntry` interface.

Key fields: `id`, `title`, `amount`, `type`, `category`, `date`, `notes`, `createdAt`.

**Derived values (computed, not stored):**
```typescript
const totalIncome = entries.filter(e => e.type === 'income').reduce((sum, e) => sum + e.amount, 0);
const totalExpenses = entries.filter(e => e.type === 'expense').reduce((sum, e) => sum + e.amount, 0);
const balance = totalIncome - totalExpenses;
```

These calculations live in `src/utils/budgetUtils.ts` and are covered by Vitest unit tests.

---

## QA Test Cases

| Test ID | Test Case | Steps | Expected Result | Status |
|---|---|---|---|---|
| TC-BT-001 | Empty state | Navigate to `/dashboard/budget` with no entries | Empty state and "Add Entry" button visible | Not run |
| TC-BT-002 | Create income entry | Add entry: title, 5000, Income, today | Entry in list with Income badge | Not run |
| TC-BT-003 | Totals calculated | Add: income 5000, expense 2000 | Summary: Income 5000, Expenses 2000, Balance 3000 | Not run |
| TC-BT-004 | Delete updates totals | Delete the 2000 expense entry | Balance becomes 5000 | Not run |
| TC-BT-005 | Type filter Income | Click "Income" filter | Only income entries shown | Not run |
| TC-BT-006 | Amount validation | Enter amount = 0, try to submit | Validation error shown | Not run |
| TC-BT-007 | Category summary | Add entries in 2 categories | Category summary shows correct totals per category | Not run |
| TC-BT-008 | Mobile 390px | Open at 390px | Summary cards and entry list render correctly | Not run |
| TC-BT-UNIT-001 | calculateTotals() | Call with [income 5000, income 2000, expense 3000] | Returns income: 7000, expenses: 3000, balance: 4000 | Not run |
| TC-BT-UNIT-002 | calculateTotals() empty | Call with [] | Returns income: 0, expenses: 0, balance: 0 | Not run |

---

## Future Improvements

- Edit entries
- Recurring income/expense entries (salary, rent, subscriptions)
- Monthly spending chart (bar or line)
- Budget targets per category with overspend indicator
- Multi-month comparison view
- Export to CSV

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.1.0 | 2026-06-03 | Initial budget tracker feature spec created |
