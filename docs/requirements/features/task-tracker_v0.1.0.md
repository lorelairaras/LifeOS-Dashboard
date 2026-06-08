# Feature Spec: Task Tracker

**Version:** v0.1.0
**Date:** 2026-06-03
**Author:** Rory
**Status:** Draft

---

## Purpose

The task tracker is the daily engine of LifeOS. It replaces sticky notes, browser tabs, and mental lists with a single organised view of everything that needs doing — broken down by category, priority, and due date.

## Scope

**In scope (MVP):** Create, read, edit, delete tasks. Status, priority, category, due date, description, notes. Empty state. Filter by status and priority. Local state only.

**Out of scope (MVP):** Subtasks, recurring tasks, task dependencies, drag-and-drop reorder, search, notifications, bulk actions, Supabase persistence.

---

## User Stories

| Story ID | Persona | User Story | Business Value | Priority | Status |
|---|---|---|---|---|---|
| US-TK-001 | Rory | As Rory, I want to create a task with a title and optional details, so I can capture what I need to do without leaving the dashboard. | Reduces friction of task capture | P1 | Planned |
| US-TK-002 | Rory | As Rory, I want to see all tasks in a list with status, priority, and due date, so I can scan what needs attention today. | Daily planning at a glance | P1 | Planned |
| US-TK-003 | Rory | As Rory, I want to update a task's status to track progress, so my list reflects what is actually happening. | Keeps list accurate | P1 | Planned |
| US-TK-004 | Rory | As Rory, I want to set a priority and due date on a task, so I know what to do first. | Prioritisation | P1 | Planned |
| US-TK-005 | Rory | As Rory, I want to assign tasks to a category (work, project, personal, career), so I can see where my time is going. | Mental separation of work types | P2 | Planned |
| US-TK-006 | Rory | As Rory, I want to delete a task that is no longer relevant, so my list stays clean. | List hygiene | P1 | Planned |
| US-TK-007 | Rory | As Rory, I want to filter tasks by status so I can see only "In Progress" or "Blocked" items, so I can focus without distraction. | Focus mode | P2 | Planned |

---

## Functional Requirements

| Requirement ID | Requirement | Priority | MVP / Future | Notes |
|---|---|---|---|---|
| TASK-MVP-001 | The system must allow the user to create a task with title, description, status, priority, category, due date, and notes | P1 | MVP | Title is required; all others optional |
| TASK-MVP-002 | Tasks must default to status "To Do" and priority "Medium" on creation | P1 | MVP | — |
| TASK-MVP-003 | The task list must display title, status badge, priority badge, category, and due date | P1 | MVP | Due date hidden if not set |
| TASK-MVP-004 | The user must be able to edit all fields of an existing task | P1 | MVP | Via modal form |
| TASK-MVP-005 | The user must be able to delete a task with a confirmation step | P1 | MVP | Prevents accidental deletion |
| TASK-MVP-006 | Supported statuses: "To Do", "In Progress", "Done", "Blocked" | P1 | MVP | — |
| TASK-MVP-007 | Supported priorities: "Low", "Medium", "High", "Urgent" | P1 | MVP | — |
| TASK-MVP-008 | Supported categories: "General", "Work", "Project", "Personal", "Career" | P2 | MVP | — |
| TASK-MVP-009 | The list must show an empty state with a CTA when no tasks exist | P1 | MVP | — |
| TASK-MVP-010 | The user must be able to filter tasks by status | P2 | MVP | "All" is default |
| TASK-MVP-011 | Tasks with a due date that is today or earlier must be visually highlighted | P2 | MVP | Orange text or badge |
| TASK-FUTURE-001 | Subtasks | — | Future | — |
| TASK-FUTURE-002 | Recurring tasks | — | Future | — |
| TASK-FUTURE-003 | Search across task titles and descriptions | — | Future | — |

---

## Acceptance Criteria

| AC ID | Scenario | Given | When | Then | Status |
|---|---|---|---|---|---|
| AC-TK-001 | Empty state shown | No tasks exist | I open the task tracker | Empty state message and "Add Task" button are visible | Not tested |
| AC-TK-002 | Task created with required field only | I click "Add Task", enter a title, and submit | Form closes | New task appears in the list with status "To Do" and priority "Medium" | Not tested |
| AC-TK-003 | Task created with all fields | I fill in all fields including category "Work" and due date | Form closes | Task shows correct category badge and due date | Not tested |
| AC-TK-004 | Edit form pre-fills | I click "Edit" on a task | Modal opens | All fields show the current values | Not tested |
| AC-TK-005 | Edit saves changes | I change priority to "Urgent" and submit | Modal closes | Task list shows "Urgent" badge | Not tested |
| AC-TK-006 | Delete with confirmation | I click "Delete" on a task and confirm | — | Task is removed from the list | Not tested |
| AC-TK-007 | Delete cancelled | I click "Delete" then cancel | — | Task remains in the list | Not tested |
| AC-TK-008 | Status filter works | I select "In Progress" from filter | — | Only "In Progress" tasks are shown | Not tested |
| AC-TK-009 | Overdue date highlighted | Task has a due date of yesterday | I view the task list | The due date is shown in orange/warning colour | Not tested |
| AC-TK-010 | Mobile layout | I open task tracker on 390px viewport | — | Task list renders correctly, Add button is accessible | Not tested |

---

## UI / UX Notes

**Layout:** List view (single column). Page header with title "Tasks" and "Add Task" button. Optional status filter row below header.

**TaskCard:** Title (bold), category badge (left), status badge (right), priority indicator (coloured dot or badge), due date (if set), short description preview (truncated at 1 line).

**Form:** Modal. Fields in order: Title (text input), Description (textarea), Status (select), Priority (select), Category (select), Due Date (date input), Notes (textarea). Save and Cancel buttons.

**Empty state:** Illustration or large icon, "No tasks yet. Add your first task to get started." text, "Add Task" button.

**Status badge colours:** To Do → grey, In Progress → blue, Done → green, Blocked → amber.

**Priority indicator colours:** Low → grey, Medium → blue, High → orange, Urgent → red.

**Overdue indicator:** Due date text turns amber if date is today or earlier.

---

## Data Model

See `docs/architecture/data-model_v0.2.0.md` — `Task` interface.

Key fields: `id`, `title`, `description`, `status`, `priority`, `category`, `dueDate`, `notes`, `createdAt`, `updatedAt`.

---

## QA Test Cases

| Test ID | Test Case | Steps | Expected Result | Status |
|---|---|---|---|---|
| TC-TK-001 | Empty state | Navigate to `/dashboard/tasks` with no tasks | Empty state visible, "Add Task" button present | Not run |
| TC-TK-002 | Create task (title only) | Click "Add Task", enter title, submit | Task appears in list with correct defaults | Not run |
| TC-TK-003 | Default status/priority | Create task without selecting status or priority | Status shows "To Do", priority shows "Medium" | Not run |
| TC-TK-004 | Edit task | Click Edit on any task | Form opens pre-filled; edit priority and submit; list updates | Not run |
| TC-TK-005 | Delete task — confirm | Click Delete, confirm in dialog | Task removed from list | Not run |
| TC-TK-006 | Delete task — cancel | Click Delete, cancel in dialog | Task remains in list | Not run |
| TC-TK-007 | Status filter | Add tasks with different statuses, select "Done" filter | Only Done tasks visible | Not run |
| TC-TK-008 | Overdue highlight | Create task with due date of yesterday | Due date text appears in amber/warning colour | Not run |
| TC-TK-009 | Mobile layout (390px) | Open task tracker at 390px viewport | No overflow; card layout correct; form opens correctly | Not run |

---

## Future Improvements

- Subtasks (nested under a parent task)
- Recurring task templates
- Bulk status update
- Drag-and-drop reorder
- Search / text filter
- Keyboard shortcut to open "Add Task" (e.g. `N`)
- Integration with Projects feature (link task to a project)

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.1.0 | 2026-06-03 | Initial task tracker feature spec created |
