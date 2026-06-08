# Screen Inventory — LifeOS Portfolio Dashboard

**Version:** v0.1.0  
**Date:** 2026-06-03  
**Author:** Rory  
**Status:** Draft

---

## Screen List

### Public Portfolio

| Screen ID | Name | Route | Description | Status |
|---|---|---|---|---|
| SCR-PF-01 | Portfolio Homepage | `/` | Single scrollable page containing all portfolio sections: Hero, About, Skills, Projects, Contact | Not built |
| SCR-PF-02 | 404 Page | `*` | Friendly not-found page with a link back to homepage | Not built |

Note: The public portfolio is a single-page layout. All sections (Hero, About, Skills, Projects, Contact) are on one scrollable route. Anchor links in the navigation scroll to each section.

### Private Dashboard

| Screen ID | Name | Route | Description | Status |
|---|---|---|---|---|
| SCR-DB-01 | Dashboard Home | `/dashboard` | Summary view with stat cards: task count, open tasks, job applications, budget balance | Not built |
| SCR-DB-02 | Task Tracker | `/dashboard/tasks` | Full task list with create/edit/delete functionality | Not built |
| SCR-DB-03 | Prompt Library | `/dashboard/prompts` | Searchable prompt list with category filter and copy-to-clipboard | Not built |
| SCR-DB-04 | Job Tracker | `/dashboard/jobs` | Application list with status tracking and follow-up date highlighting | Not built |
| SCR-DB-05 | Budget Tracker | `/dashboard/budget` | Income/expense entry list with totals and category summary | Not built |
| SCR-DB-06 | Settings | `/dashboard/settings` | Placeholder page — no functionality in MVP | Not built |

---

## Section Breakdown — Portfolio Homepage (SCR-PF-01)

| Section | Anchor ID | Content | Component |
|---|---|---|---|
| Hero | `#hero` | Name, title/tagline, two CTA buttons | `HeroSection` |
| About | `#about` | Bio, background, focus areas | `AboutSection` |
| Skills | `#skills` | Categorised skill tags | `SkillsSection` |
| Projects | `#projects` | Project cards (min. 2) | `ProjectsSection`, `ProjectCard` |
| Contact | `#contact` | Email, GitHub, LinkedIn links | `ContactSection` |

---

## Navigation Structure

### Portfolio Navigation (SCR-PF-01)
```
[Name/Logo]  [About]  [Skills]  [Projects]  [Contact]
```
Sticky header on scroll. Anchor-linked. On mobile: hamburger menu.

### Dashboard Navigation (SCR-DB-*)
Desktop: Persistent left sidebar
```
[LifeOS]
──────────
[Dashboard]
[Tasks]
[Prompts]
[Jobs]
[Budget]
──────────
[Settings]
```

Mobile: Bottom navigation bar or top hamburger drawer.

---

## Modal and Overlay Inventory

| Modal ID | Name | Triggered by | Used on |
|---|---|---|---|
| MOD-01 | Create/Edit Task | "New Task" button, "Edit" button | SCR-DB-02 |
| MOD-02 | Create/Edit Prompt | "New Prompt" button, "Edit" button | SCR-DB-03 |
| MOD-03 | Create/Edit Job | "New Application" button, "Edit" button | SCR-DB-04 |
| MOD-04 | Create Budget Entry | "Add Entry" button | SCR-DB-05 |
| MOD-05 | Confirm Delete | "Delete" button on any item | SCR-DB-02 through SCR-DB-05 |

---

## Empty States

Each tracker has a unique empty state shown when no items exist.

| Screen | Empty State Message | CTA |
|---|---|---|
| Tasks | "No tasks yet. Add your first task to get started." | "Add Task" button |
| Prompts | "Your prompt library is empty. Save your first prompt." | "Save Prompt" button |
| Jobs | "No applications tracked yet. Start logging your search." | "Add Application" button |
| Budget | "No entries yet. Record your first income or expense." | "Add Entry" button |

---

## Responsive Breakpoints

| Breakpoint | Width | Layout change |
|---|---|---|
| Mobile S | 320px | Single column, stack everything, hamburger nav |
| Mobile M | 390px | Single column, slightly more breathing room |
| Tablet | 768px | Two-column project grid, sidebar begins to appear |
| Desktop | 1280px | Full sidebar, multi-column layouts |

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.1.0 | 2026-06-03 | Initial screen inventory created |
