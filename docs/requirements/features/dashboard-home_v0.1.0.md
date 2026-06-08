# Feature Spec: Dashboard Home

**Version:** v0.1.0
**Date:** 2026-06-03
**Author:** Rory
**Status:** Draft

---

## Purpose

The dashboard home is the "daily brief" of LifeOS. Every morning, opening the dashboard gives an instant picture of what matters today — tasks due, active applications, budget balance, active projects, recent prompts, and a weekly focus reminder. It is the command centre for the personal OS.

## Scope

**In scope (MVP):** Seven widgets (stat cards, weekly focus, recent prompts, quick actions). Data-loss notice. Navigation to all six sections. Local state only.

**Out of scope (MVP):** Customisable widget layout, additional widgets, widget settings, charts/trends, notifications, Supabase persistence.

---

## User Stories

| Story ID | Persona | User Story | Business Value | Priority | Status |
|---|---|---|---|---|---|
| US-DB-001 | Rory | As Rory, I want to see an overview of my current state (tasks, applications, balance, projects) when I open the dashboard, so I can orient quickly without navigating to each section. | Daily orientation in seconds | P1 | Planned |
| US-DB-002 | Rory | As Rory, I want to write a weekly focus note that stays visible on the dashboard, so I do not lose sight of my main goal for the week. | Weekly goal visibility | P1 | Planned |
| US-DB-003 | Rory | As Rory, I want to see my most recently used prompts on the dashboard, so I can quickly copy one without going to the full prompt library. | One-click prompt reuse | P2 | Planned |
| US-DB-004 | Rory | As Rory, I want quick action buttons for common tasks (Add Task, Log Application, Add Entry), so I can capture things in two clicks from anywhere in the dashboard. | Reduced friction for data capture | P2 | Planned |
| US-DB-005 | Rory | As Rory, I want to be clearly told that data is not saved between sessions in this demo, so I am not confused when data disappears on refresh. | Honesty about MVP limitation | P1 | Planned |

---

## Functional Requirements

| Requirement ID | Requirement | Priority | MVP / Future | Notes |
|---|---|---|---|---|
| DASH-MVP-001 | Dashboard home loads at `/dashboard` and shows all seven widgets | P1 | MVP | — |
| DASH-MVP-002 | "Today's Tasks" stat card: count of tasks with dueDate today or earlier that are not status "done" | P1 | MVP | — |
| DASH-MVP-003 | "Open Applications" stat card: count of applications with status not in [rejected, closed] | P1 | MVP | — |
| DASH-MVP-004 | "Budget Balance" stat card: current month income minus expenses | P1 | MVP | Month = current calendar month |
| DASH-MVP-005 | "Active Projects" stat card: count of projects with status "in_progress" | P1 | MVP | — |
| DASH-MVP-006 | "Weekly Focus" widget: single-line editable text field. Placeholder: "What am I focusing on this week?" Saves to state on blur or Enter. | P1 | MVP | State persists within session only in MVP |
| DASH-MVP-007 | "Recent Prompts" widget: shows last 3 prompts sorted by `lastUsedAt` or `createdAt`. Each shows title, category, and copy button. | P2 | MVP | Copy button same as in prompt library |
| DASH-MVP-008 | "Quick Actions" widget: three buttons — "Add Task" (opens task form), "Log Application" (opens job form), "Add Entry" (opens budget form) | P2 | MVP | — |
| DASH-MVP-009 | Navigation sidebar/bottom bar links to: Home, Tasks, Prompts, Jobs, Budget, Projects, Settings | P1 | MVP | — |
| DASH-MVP-010 | Data-loss notice displayed on first load, dismissable per session | P1 | MVP | Non-blocking; does not prevent use |
| DASH-MVP-011 | Dashboard layout must be responsive on 390px mobile, 768px tablet, and 1280px desktop | P1 | MVP | — |
| DASH-FUTURE-001 | Customisable widget layout | — | Future | Drag-and-drop |
| DASH-FUTURE-002 | Additional widgets (mood, workout, notes preview) | — | Future | Post-MVP features required first |
| DASH-FUTURE-003 | Weekly summary AI-generated text | — | Future | Requires AI API approval |

---

## Acceptance Criteria

| AC ID | Scenario | Given | When | Then | Status |
|---|---|---|---|---|---|
| AC-DB-001 | Dashboard loads | I navigate to `/dashboard` | Page loads | All seven widgets are visible with no console errors | Not tested |
| AC-DB-002 | Today's Tasks count | I have 3 tasks due today, 1 due yesterday, 2 due next week | Dashboard loads | Today's Tasks shows 4 (today + overdue) | Not tested |
| AC-DB-003 | Open Applications count | I have 5 applications; 2 are rejected | Dashboard loads | Open Applications shows 3 | Not tested |
| AC-DB-004 | Budget Balance | I have income 5000 and expenses 2000 this month | Dashboard loads | Budget Balance shows +3000 (green) | Not tested |
| AC-DB-005 | Active Projects count | I have 2 "In Progress" projects and 1 "Complete" | Dashboard loads | Active Projects shows 2 | Not tested |
| AC-DB-006 | Weekly Focus editable | I click the weekly focus field and type text | I click outside the field | Text is saved and displayed | Not tested |
| AC-DB-007 | Recent Prompts shows 3 | I have 5 prompts in the library | Dashboard loads | 3 most recent prompts shown with copy buttons | Not tested |
| AC-DB-008 | Quick Action — Add Task | I click "Add Task" | — | Task creation modal opens | Not tested |
| AC-DB-009 | Data-loss notice | I open the dashboard for the first time | Page loads | A non-blocking notice about data not being saved is visible | Not tested |
| AC-DB-010 | Notice dismissable | I click dismiss on the data-loss notice | — | Notice disappears and does not reappear during the same session | Not tested |
| AC-DB-011 | Navigation links | I am on the dashboard | I look at the sidebar/nav | Links to all sections (Tasks, Prompts, Jobs, Budget, Projects, Settings) are present | Not tested |
| AC-DB-012 | Mobile layout | I open dashboard at 390px | — | Stat cards stack vertically; all widgets visible without overflow | Not tested |

---

## UI / UX Notes

**Layout (desktop, 1280px):**
```
┌───────────────────────────────────────────────────────┐
│ [Sidebar 240px]   │  Dashboard Home                    │
│                   │  ┌──────┬──────┬──────┬──────┐    │
│  [Navigation]     │  │Tasks │Apps  │Budget│Proj  │    │
│                   │  └──────┴──────┴──────┴──────┘    │
│                   │  ┌─────────────────────────────┐  │
│                   │  │  Weekly Focus               │  │
│                   │  └─────────────────────────────┘  │
│                   │  ┌────────────────┬────────────┐  │
│                   │  │  Recent Prompts │ Quick      │  │
│                   │  │                │ Actions    │  │
│                   │  └────────────────┴────────────┘  │
└───────────────────────────────────────────────────────┘
```

**Layout (mobile, 390px):** Stat cards in 2×2 grid. Weekly focus full width. Recent prompts full width (max 3). Quick actions full width (buttons stack or wrap). Navigation: bottom bar with Home, Tasks, Jobs, Budget icons + overflow.

**Stat cards:**
- Today's Tasks: number in large type; amber colour if > 0
- Open Applications: number; neutral
- Budget Balance: formatted currency; green if positive, red if negative
- Active Projects: number; neutral

**Weekly Focus widget:** Single textarea or contenteditable div. Placeholder text. Saves on blur. Shows last updated time in small text below.

**Data-loss notice:** Fixed banner below the page header. Amber/info colour. Text: "This is a demo version. Data is not saved between sessions." Dismiss (×) button.

---

## Data Model

The dashboard home derives all its data from the other feature states:

```typescript
// Derived from tasks state
const todaysTasks = tasks.filter(t =>
  t.status !== 'done' && isOverdue(t.dueDate ?? '')
).length;

// Derived from jobs state
const openApplications = jobs.filter(j =>
  !['rejected', 'closed'].includes(j.status)
).length;

// Derived from budget state
const budgetBalance = calculateCurrentMonthBalance(entries);

// Derived from projects state
const activeProjects = projects.filter(p => p.status === 'in_progress').length;

// Derived from prompts state
const recentPrompts = [...prompts]
  .sort((a, b) => (b.lastUsedAt ?? b.createdAt).localeCompare(a.lastUsedAt ?? a.createdAt))
  .slice(0, 3);
```

Weekly Focus is its own piece of state:
```typescript
const [weeklyFocus, setWeeklyFocus] = useState<string>('');
```

---

## QA Test Cases

| Test ID | Test Case | Steps | Expected Result | Status |
|---|---|---|---|---|
| TC-DB-001 | Dashboard loads | Navigate to `/dashboard` | All widgets visible, no errors | Not run |
| TC-DB-002 | Today's Tasks count | Create 2 tasks due today (not done), 1 due next week | Dashboard shows 2 | Not run |
| TC-DB-003 | Open Applications count | Create 4 applications; reject 1 | Dashboard shows 3 | Not run |
| TC-DB-004 | Navigation links | View dashboard sidebar/nav | All 7 links present | Not run |
| TC-DB-005 | Data-loss notice visible | Open dashboard | Notice is shown | Not run |
| TC-DB-006 | Data-loss notice dismissable | Click dismiss | Notice disappears | Not run |
| TC-DB-007 | Quick Action Add Task | Click "Add Task" | Task modal opens | Not run |
| TC-DB-008 | Weekly Focus saves text | Click field, type "Ship Phase 1", click elsewhere | "Ship Phase 1" displayed in widget | Not run |
| TC-DB-009 | Mobile 390px | Open at 390px | Stat cards in 2×2; no overflow | Not run |

---

## Future Improvements

- Customisable widget layout (drag-and-drop)
- Additional widgets: mood check-in, workout log, notes preview
- AI-generated weekly summary (post-MVP, requires API approval)
- Streak tracker (days with logged tasks / budget entries)
- Notification badge on nav items with overdue items

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.1.0 | 2026-06-03 | Initial dashboard home feature spec created |
