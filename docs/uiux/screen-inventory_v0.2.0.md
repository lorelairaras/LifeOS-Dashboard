# Screen Inventory — LifeOS Portfolio Dashboard

**Version:** v0.2.0
**Date:** 2026-06-03
**Author:** Rory
**Status:** Draft
**Supersedes:** screen-inventory_v0.1.0.md

---

## Screen Registry

Format: Screen ID | Screen Name | Route | Purpose | MVP / Future | Main Components | Status

### Public Portfolio

| Screen ID | Screen Name | Route | Purpose | MVP / Future | Main Components | Status |
|---|---|---|---|---|---|---|
| SCR-001 | Portfolio Home | `/` | Public landing page — all portfolio sections on one scrollable page | MVP | HeroSection, AboutSection, SkillsSection, ProjectsSection, CaseStudiesSection, ResumeSection, ContactSection | Planned |
| SCR-002 | 404 Not Found | `*` | Friendly error page with link back to homepage | MVP | NotFoundPage | Planned |

Note: The public portfolio is a single scrollable page. Section navigation uses anchor links (`#hero`, `#about`, `#skills`, `#projects`, `#case-studies`, `#resume`, `#contact`).

---

### Private Dashboard

| Screen ID | Screen Name | Route | Purpose | MVP / Future | Main Components | Status |
|---|---|---|---|---|---|---|
| SCR-003 | Dashboard Home | `/dashboard` | Daily overview — tasks, jobs, budget, projects, weekly focus, quick actions | MVP | StatCard, WeeklyFocusWidget, QuickActions, RecentPromptsList | Planned |
| SCR-004 | Task Tracker | `/dashboard/tasks` | Create, view, edit, delete personal and project tasks | MVP | TaskList, TaskCard, TaskForm (modal), StatusBadge, PriorityBadge, EmptyState | Planned |
| SCR-005 | Prompt Library | `/dashboard/prompts` | Store and reuse AI prompts with copy-to-clipboard | MVP | PromptGrid, PromptCard, PromptForm (modal), CategoryFilter, EmptyState | Planned |
| SCR-006 | Job Tracker | `/dashboard/jobs` | Track job applications, statuses, and follow-up dates | MVP | JobList, JobCard, JobForm (modal), StatusBadge, OverdueBadge, EmptyState | Planned |
| SCR-007 | Budget Tracker | `/dashboard/budget` | Income and expense tracking with totals and category summary | MVP | EntryList, EntryRow, EntryForm (modal), BudgetSummary, CategorySummary, TypeFilter, EmptyState | Planned |
| SCR-008 | Projects | `/dashboard/projects` | Manage project case studies — feeds the public portfolio | MVP | ProjectList, ProjectCard, ProjectForm (modal), VisibilityBadge, EmptyState | Planned |
| SCR-009 | Settings | `/dashboard/settings` | Placeholder — no functionality in MVP | MVP | SettingsPlaceholder | Planned |

---

## Section Breakdown — Portfolio Home (SCR-001)

| Section ID | Section Name | Anchor | Content | Component | MVP |
|---|---|---|---|---|---|
| SEC-001 | Hero | `#hero` | Name, title/tagline, "View Projects" CTA, "Contact" CTA | `HeroSection` | ✅ |
| SEC-002 | About | `#about` | Professional bio (2–4 paragraphs), focus areas, background | `AboutSection` | ✅ |
| SEC-003 | Skills | `#skills` | Skill tags in four categories: Frontend, Tools, Business & Product, Other | `SkillsSection`, `SkillTag` | ✅ |
| SEC-004 | Projects | `#projects` | Project cards: title, description, tech stack tags, GitHub/live links | `ProjectsSection`, `ProjectCard` | ✅ |
| SEC-005 | Case Studies | `#case-studies` | In-depth project write-ups: problem, solution, tech, lessons | `CaseStudiesSection`, `CaseStudyCard` | ✅ |
| SEC-006 | Resume / Experience | `#resume` | Career timeline and optional resume download link | `ResumeSection`, `ExperienceItem` | ✅ |
| SEC-007 | Contact | `#contact` | Email (mailto), GitHub, LinkedIn links | `ContactSection` | ✅ |

---

## Dashboard Home Widget Breakdown (SCR-003)

| Widget ID | Widget | Data Source | Component |
|---|---|---|---|
| WID-001 | Today's Tasks | Tasks due today or overdue | `StatCard` |
| WID-002 | Open Applications | Active job applications (not rejected/closed) | `StatCard` |
| WID-003 | Budget Balance | Current month income minus expenses | `StatCard` |
| WID-004 | Active Projects | Projects with status "In Progress" | `StatCard` |
| WID-005 | Weekly Focus | Editable text — persists in state | `WeeklyFocusWidget` |
| WID-006 | Recent Prompts | Last 3 prompts by updatedAt | `RecentPromptsList` |
| WID-007 | Quick Actions | "Add Task", "Log Application", "Add Entry" buttons | `QuickActions` |

---

## Modal and Overlay Inventory

| Modal ID | Name | Triggered by | Screen |
|---|---|---|---|
| MOD-001 | Create/Edit Task | "Add Task" button, task "Edit" button | SCR-004 |
| MOD-002 | Create/Edit Prompt | "Add Prompt" button, prompt "Edit" button | SCR-005 |
| MOD-003 | Create/Edit Job Application | "Add Application" button, job "Edit" button | SCR-006 |
| MOD-004 | Create Budget Entry | "Add Entry" button | SCR-007 |
| MOD-005 | Create/Edit Project | "Add Project" button, project "Edit" button | SCR-008 |
| MOD-006 | Confirm Delete | "Delete" button on any item | All dashboard screens |

---

## Portfolio Navigation Structure

```
[Logo/Name]   [About]   [Skills]   [Projects]   [Case Studies]   [Resume]   [Contact]
```

Sticky header, transparent to solid on scroll, anchor-linked. Mobile: hamburger → full-screen drawer. Focus returns to hamburger button when drawer closes.

---

## Dashboard Navigation Structure

**Desktop:** Persistent left sidebar (240px wide)

```
LifeOS
──────────────
[Home]
[Tasks]
[Prompts]
[Jobs]
[Budget]
[Projects]
──────────────
[Settings]
```

**Mobile:** Bottom navigation bar (5 primary items) + overflow drawer for remaining items, OR top hamburger → slide-in drawer.

---

## Empty States

| Screen | Message | CTA |
|---|---|---|
| SCR-004 Tasks | "No tasks yet. Add your first task." | "Add Task" |
| SCR-005 Prompts | "Your prompt library is empty. Save your first prompt." | "Add Prompt" |
| SCR-006 Jobs | "No applications tracked yet. Start your job search log." | "Add Application" |
| SCR-007 Budget | "No entries yet. Record your first income or expense." | "Add Entry" |
| SCR-008 Projects | "No projects yet. Add your first project or case study." | "Add Project" |

---

## Accessibility Notes Per Screen

| Screen | Key A11y Requirements |
|---|---|
| SCR-001 Portfolio | Skip-to-main link at top of page; all images have alt text; nav has `aria-label="Main navigation"` |
| SCR-003 Dashboard Home | Stat cards use `<article>` with `aria-label`; WeeklyFocus textarea has visible label; Quick action buttons have descriptive text (not just icons) |
| SCR-004 to SCR-008 | All modals: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`; focus trapped inside modal; Escape closes modal; focus returns to trigger button on close |
| All forms | Every input has a `<label>`; validation errors use `aria-describedby`; required fields have `aria-required="true"` |
| Mobile nav (portfolio) | Hamburger button: `aria-expanded`, `aria-controls`; drawer: `aria-label="Mobile menu"`; focus moves to first nav item when drawer opens |

---

## Responsive Breakpoints

| Breakpoint | Width | Key layout changes |
|---|---|---|
| Mobile S | 320px | Single column, stacked nav, all content linearised |
| Mobile M | 390px | Single column, standard mobile spacing |
| Tablet | 768px | 2-col project grid, dashboard sidebar begins collapsing |
| Desktop | 1280px | Full sidebar (240px), 3-col project grid, multi-col dashboard |

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.2.0 | 2026-06-03 | New format with MVP/Future and Main Components columns; added Case Studies, Resume, Projects screens; expanded dashboard home widgets; added accessibility notes; added SCR-008 Projects route |
| v0.1.0 | 2026-06-03 | Initial screen inventory created |
