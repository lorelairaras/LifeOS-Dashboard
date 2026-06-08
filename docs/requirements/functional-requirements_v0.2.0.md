# Functional Requirements — LifeOS Portfolio Dashboard

**Version:** v0.2.0
**Date:** 2026-06-03
**Author:** Rory
**Status:** Draft
**Supersedes:** functional-requirements_v0.1.0.md

---

## Requirement ID Format

`FR-[SECTION]-[NUMBER]`

Section codes: `PF` Portfolio · `DB` Dashboard · `TK` Tasks · `PL` Prompts · `JT` Jobs · `BT` Budget · `PR` Projects

For detailed per-feature requirements with user stories, acceptance criteria, and QA test cases, see `docs/requirements/features/`.

---

## Public Portfolio Requirements

| Requirement ID | Requirement | Priority | MVP / Future | Notes |
|---|---|---|---|---|
| FR-PF-001 | Hero section: developer name, tagline, two CTA buttons (View Projects, Contact) | P1 | MVP | — |
| FR-PF-002 | About section: professional bio (2–4 paragraphs), focus areas | P1 | MVP | — |
| FR-PF-003 | Skills section: categorised tags in at least 3 categories | P1 | MVP | Frontend, Tools, Business & Product |
| FR-PF-004 | Projects section: at least 2 project cards (title, description, tech tags, links) | P1 | MVP | — |
| FR-PF-005 | Case Studies section: at least 1 in-depth write-up (problem, solution, tech, lessons) | P2 | MVP | Fed from Projects feature (visibility=public) |
| FR-PF-006 | Resume/Experience section: career timeline with at least 2 entries; optional PDF download link | P2 | MVP | PDF is a static file in /public/assets/ |
| FR-PF-007 | Contact section: email (mailto), GitHub, LinkedIn | P1 | MVP | No server-side form |
| FR-PF-008 | All external links: `target="_blank"` and `rel="noopener noreferrer"` | P1 | MVP | Security requirement |
| FR-PF-009 | Persistent sticky navigation with anchor links to all sections | P1 | MVP | — |
| FR-PF-010 | Navigation collapses to hamburger menu on mobile | P1 | MVP | — |
| FR-PF-011 | Responsive at 320px, 390px, 768px, 1280px — no horizontal overflow | P1 | MVP | — |
| FR-PF-012 | Skip-to-main-content link at top of page | P1 | MVP | WCAG 2.4.1 |

---

## Dashboard Requirements

| Requirement ID | Requirement | Priority | MVP / Future | Notes |
|---|---|---|---|---|
| FR-DB-001 | Persistent navigation to: Home, Tasks, Prompts, Jobs, Budget, Projects, Settings | P1 | MVP | Sidebar (desktop), bottom bar or drawer (mobile) |
| FR-DB-002 | Dashboard home: Today's Tasks count, Open Applications count, Budget Balance, Active Projects count | P1 | MVP | — |
| FR-DB-003 | Dashboard home: Weekly Focus editable text widget | P1 | MVP | Saves in state; persists within session |
| FR-DB-004 | Dashboard home: Recent Prompts (last 3 by lastUsedAt); each with copy button | P2 | MVP | — |
| FR-DB-005 | Dashboard home: Quick Actions — "Add Task", "Log Application", "Add Entry" buttons | P2 | MVP | — |
| FR-DB-006 | Route separation: `/` for portfolio, `/dashboard/*` for all dashboard sections | P1 | MVP | — |
| FR-DB-007 | Data-loss notice: non-blocking, dismissable per session, shown on first dashboard load | P1 | MVP | — |
| FR-DB-008 | Settings placeholder page at `/dashboard/settings` | P1 | MVP | No functionality in MVP |

---

## Task Tracker Requirements

| Requirement ID | Requirement | Priority | MVP / Future | Notes |
|---|---|---|---|---|
| FR-TK-001 | Task list: title, status badge, priority badge, category, due date (if set) | P1 | MVP | — |
| FR-TK-002 | Create task: required: title; optional: description, status, priority, category, due date, notes | P1 | MVP | — |
| FR-TK-003 | Edit task: all fields editable | P1 | MVP | — |
| FR-TK-004 | Delete task: confirmation prompt required | P1 | MVP | — |
| FR-TK-005 | Statuses: "To Do", "In Progress", "Done", "Blocked" | P1 | MVP | Default: "To Do" |
| FR-TK-006 | Priorities: "Low", "Medium", "High", "Urgent" | P1 | MVP | Default: "Medium" |
| FR-TK-007 | Categories: "General", "Work", "Project", "Personal", "Career" | P2 | MVP | Default: "General" |
| FR-TK-008 | Tasks due today or earlier (not done) highlighted with amber indicator | P2 | MVP | — |
| FR-TK-009 | Filter by status; "All" is default | P2 | MVP | — |
| FR-TK-010 | Empty state when no tasks exist | P1 | MVP | — |

---

## Prompt Library Requirements

| Requirement ID | Requirement | Priority | MVP / Future | Notes |
|---|---|---|---|---|
| FR-PL-001 | Prompt list/grid: title, category badge, tags, copy button | P1 | MVP | — |
| FR-PL-002 | Create prompt: required: title, body; optional: category, use case, tags | P1 | MVP | — |
| FR-PL-003 | Edit prompt: all fields editable | P1 | MVP | — |
| FR-PL-004 | Delete prompt: confirmation prompt required | P1 | MVP | — |
| FR-PL-005 | Copy button: copies body to clipboard, shows "Copied!" for ≥1.5 seconds | P1 | MVP | — |
| FR-PL-006 | Copying updates `lastUsedAt` timestamp | P2 | MVP | — |
| FR-PL-007 | Categories: Frontend Dev, QA Testing, Documentation, Business Analysis, Product Planning, Resume & Cover Letter, Daily Planning, Other | P1 | MVP | Default: "Other" |
| FR-PL-008 | Filter by category; "All" is default | P1 | MVP | — |
| FR-PL-009 | Empty state when no prompts exist | P1 | MVP | — |

---

## Job Application Tracker Requirements

| Requirement ID | Requirement | Priority | MVP / Future | Notes |
|---|---|---|---|---|
| FR-JT-001 | Application list: company, role, status badge, job type, date applied | P1 | MVP | — |
| FR-JT-002 | Create application: required: company, role; optional: location, job type, status, URL, dates, notes | P1 | MVP | Default status: "Applied" |
| FR-JT-003 | Edit application: all fields editable | P1 | MVP | — |
| FR-JT-004 | Delete application: confirmation prompt required | P1 | MVP | — |
| FR-JT-005 | Statuses: Saved, Applied, Phone Screen, Assessment, Interviewing, Offer, Rejected, Closed | P1 | MVP | — |
| FR-JT-006 | Job types: Remote, Hybrid, On-site, Flexible | P2 | MVP | — |
| FR-JT-007 | Job URL: clickable icon link, opens in new tab | P1 | MVP | — |
| FR-JT-008 | Follow-up date: visually highlighted (amber) if today or earlier | P1 | MVP | — |
| FR-JT-009 | Filter by status; "All" is default | P2 | MVP | — |
| FR-JT-010 | Empty state when no applications exist | P1 | MVP | — |

---

## Budget Tracker Requirements

| Requirement ID | Requirement | Priority | MVP / Future | Notes |
|---|---|---|---|---|
| FR-BT-001 | Entry list: title, amount, type badge, category, date; sorted by date descending | P1 | MVP | — |
| FR-BT-002 | Create entry: required: title, amount (positive), type, date; optional: category, notes | P1 | MVP | — |
| FR-BT-003 | Delete entry: confirmation prompt; totals update immediately | P1 | MVP | — |
| FR-BT-004 | No edit in MVP: intentional limitation, communicated in UI | P1 | MVP | — |
| FR-BT-005 | Totals: total income, total expenses, net balance | P1 | MVP | — |
| FR-BT-006 | Category summary: total per category | P2 | MVP | — |
| FR-BT-007 | Filter by type: All, Income, Expense; "All" is default | P2 | MVP | — |
| FR-BT-008 | Empty state when no entries exist | P1 | MVP | — |

---

## Projects / Case Studies Requirements

| Requirement ID | Requirement | Priority | MVP / Future | Notes |
|---|---|---|---|---|
| FR-PR-001 | Project list: name, status badge, visibility badge, tech stack chips | P1 | MVP | — |
| FR-PR-002 | Create project: required: name, status; optional: visibility, problem, tech stack, features, links, lessons, improvements | P1 | MVP | Default status: "In Progress"; default visibility: "Private" |
| FR-PR-003 | Edit project: all fields editable | P1 | MVP | — |
| FR-PR-004 | Delete project: confirmation prompt; removes from portfolio if public | P1 | MVP | — |
| FR-PR-005 | Statuses: Idea, In Progress, Complete, Archived | P1 | MVP | — |
| FR-PR-006 | Visibility: Public (appears in portfolio) / Private (dashboard only) | P1 | MVP | — |
| FR-PR-007 | Public projects feed the portfolio Case Studies section | P1 | MVP | Sourced from same state |
| FR-PR-008 | GitHub and live demo URLs open in new tab with rel="noopener noreferrer" | P1 | MVP | — |
| FR-PR-009 | Empty state when no projects exist | P1 | MVP | — |

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.2.0 | 2026-06-03 | Converted to table format; added FR-PF-005/006/012 (case studies, resume, skip link); added FR-DB-003/004/005 (weekly focus, recent prompts, quick actions); updated FR-TK with description/category fields; updated FR-PL with specific categories and lastUsedAt; updated FR-JT with jobType and assessment status; added FR-BT-002 title field; added full FR-PR section (Projects) |
| v0.1.0 | 2026-06-03 | Initial functional requirements created |
