# Functional Requirements — LifeOS Portfolio Dashboard

**Version:** v0.1.0  
**Date:** 2026-06-03  
**Author:** Rory  
**Status:** Draft

---

## Requirement ID Format

All functional requirements use the prefix `FR-` followed by a zero-padded three-digit number.  
Format: `FR-[section code]-[number]`

Section codes:
- `PF` — Public Portfolio
- `DB` — Dashboard (general)
- `TK` — Task Tracker
- `PL` — Prompt Library
- `JT` — Job Tracker
- `BT` — Budget Tracker

---

## Public Portfolio Requirements

### FR-PF-001 — Homepage hero section
The homepage must display the developer's name, a short title or tagline, and at least two call-to-action links (e.g. View Projects, Contact).

### FR-PF-002 — About section
The homepage or a dedicated about page must include a short professional bio (2–4 paragraphs), the developer's background, and what they work on.

### FR-PF-003 — Skills section
The site must display a categorised list of skills. Categories must include at minimum: Frontend, Tools, and one additional relevant category. Each skill is displayed as a visual tag or chip.

### FR-PF-004 — Projects section
The site must display at least two project cards. Each card must include: project title, short description, tech stack tags, and a link to the live project or GitHub repository.

### FR-PF-005 — Contact section
The site must provide a way to contact the developer. At minimum: a mailto email link, a GitHub profile link, and a LinkedIn profile link. No server-side form is required in MVP.

### FR-PF-006 — Navigation
The public site must have persistent navigation linking to all major sections. Navigation must be accessible on both desktop and mobile.

### FR-PF-007 — Responsive layout
All public portfolio pages must render correctly at 320px, 390px, 768px, and 1280px viewport widths. No horizontal overflow. Text must be readable at all sizes.

### FR-PF-008 — External links
All external links (GitHub, LinkedIn, live project URLs) must open in a new browser tab with `rel="noopener noreferrer"`.

---

## Dashboard Requirements

### FR-DB-001 — Dashboard layout
The dashboard must have a persistent navigation element (sidebar on desktop, hamburger/drawer on mobile) that links to: Home, Tasks, Prompts, Jobs, Budget, Settings.

### FR-DB-002 — Dashboard home
The dashboard home page must display at least four summary stat cards showing: total tasks, open tasks, total job applications, and total budget balance.

### FR-DB-003 — Route separation
The public portfolio and private dashboard must be on distinct routes. Suggested: `/` for portfolio, `/dashboard` for dashboard home, and `/dashboard/[section]` for each tracker.

### FR-DB-004 — Data loss warning
The dashboard must display a persistent, non-blocking notice informing the user that data is not saved between sessions in the demo version. This notice must be dismissable per session.

### FR-DB-005 — Settings placeholder
A settings page must exist at `/dashboard/settings` and display a placeholder message. No functional settings are required in MVP.

---

## Task Tracker Requirements

### FR-TK-001 — Task list view
The task tracker must display all tasks in a list. The list must show: title, status, priority, and due date (if set).

### FR-TK-002 — Create task
The user must be able to create a new task. Required fields: title. Optional fields: status (default: "To Do"), priority (default: "Medium"), due date, notes.

### FR-TK-003 — Edit task
The user must be able to edit all fields of an existing task.

### FR-TK-004 — Delete task
The user must be able to delete a task. A confirmation prompt must be shown before deletion.

### FR-TK-005 — Task statuses
Tasks must support the following statuses: "To Do", "In Progress", "Done", "Blocked".

### FR-TK-006 — Task priorities
Tasks must support the following priorities: "Low", "Medium", "High", "Urgent".

### FR-TK-007 — Empty state
When no tasks exist, the task list must display an empty state message and a prompt to create the first task.

---

## Prompt Library Requirements

### FR-PL-001 — Prompt list view
The prompt library must display all saved prompts in a list or grid. Each item must show: title, category, and tags.

### FR-PL-002 — Create prompt
The user must be able to create a new prompt. Required fields: title, prompt body. Optional fields: category, use case, tags.

### FR-PL-003 — Edit prompt
The user must be able to edit all fields of an existing prompt.

### FR-PL-004 — Delete prompt
The user must be able to delete a prompt. A confirmation prompt must be shown before deletion.

### FR-PL-005 — Copy prompt
Each prompt must have a "Copy" button. Clicking it copies the prompt body to the clipboard. The button must show visual feedback ("Copied!") for at least 1.5 seconds after the action.

### FR-PL-006 — Prompt fields
A prompt must store: title (string), category (string), use case (string), prompt body (text), tags (array of strings), created date (auto-set on creation).

### FR-PL-007 — Category filter
The prompt library must allow filtering by category. "All" must be the default selected filter.

### FR-PL-008 — Empty state
When no prompts exist, the prompt library must display an empty state message and a prompt to create the first entry.

---

## Job Application Tracker Requirements

### FR-JT-001 — Application list view
The job tracker must display all applications in a list. Each item must show: company, role, status, and date applied.

### FR-JT-002 — Create application
The user must be able to create a new application record. Required fields: company name, role title. Optional fields: location, status (default: "Applied"), link to job posting, notes, date applied, follow-up date.

### FR-JT-003 — Edit application
The user must be able to edit all fields of an existing application.

### FR-JT-004 — Delete application
The user must be able to delete an application. A confirmation prompt must be shown before deletion.

### FR-JT-005 — Application statuses
Applications must support the following statuses: "Saved", "Applied", "Phone Screen", "Interviewing", "Offer", "Rejected", "Withdrawn".

### FR-JT-006 — External link
If a job posting link is saved, it must be displayed as a clickable link that opens in a new tab.

### FR-JT-007 — Follow-up date display
If a follow-up date is set and that date is today or in the past, it must be visually highlighted.

### FR-JT-008 — Empty state
When no applications exist, the job tracker must display an empty state message and a prompt to create the first entry.

---

## Budget Tracker Requirements

### FR-BT-001 — Entry list view
The budget tracker must display all entries in a list, sorted by date descending. Each entry must show: category, amount, type (income/expense), and date.

### FR-BT-002 — Create entry
The user must be able to create a new budget entry. Required fields: amount (positive number), type (income or expense), date. Optional fields: category, notes.

### FR-BT-003 — Delete entry
The user must be able to delete a budget entry. A confirmation prompt must be shown before deletion.

### FR-BT-004 — Totals
The budget tracker must display: total income, total expenses, and net balance (income minus expenses).

### FR-BT-005 — Category summary
The budget tracker must display a summary of total amounts grouped by category.

### FR-BT-006 — Type filter
The user must be able to filter the entry list by type: All, Income, Expense.

### FR-BT-007 — No edit in MVP
Budget entries cannot be edited in MVP. The user must delete and re-create an incorrect entry. This limitation is intentional and may be lifted in a later phase.

### FR-BT-008 — Empty state
When no entries exist, the budget tracker must display an empty state message and a prompt to create the first entry.

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.1.0 | 2026-06-03 | Initial functional requirements created |
