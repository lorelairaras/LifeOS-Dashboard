# Feature Spec: Projects / Case Studies

**Version:** v0.1.0
**Date:** 2026-06-03
**Author:** Rory
**Status:** Draft

---

## Purpose

The Projects feature is the bridge between the private dashboard and the public portfolio. It is where Rory documents real work — the problem, the solution, the tech stack, the lessons learned. Projects marked as "public" automatically appear in the portfolio's Case Studies section. Private projects stay as personal reference.

## Scope

**In scope (MVP):** Create, read, edit, delete projects. Status, visibility, tech stack, problem/solution fields, GitHub/live links, lessons/improvements. Public projects feed the portfolio.

**Out of scope (MVP):** Image/screenshot uploads, video embeds, collaborator fields, tagging by skill, project templates, Supabase persistence.

---

## User Stories

| Story ID | Persona | User Story | Business Value | Priority | Status |
|---|---|---|---|---|---|
| US-PR-001 | Rory | As Rory, I want to document a project with a problem statement, solution, and tech stack, so I have a written record of what I built and why. | Forces reflection; creates portfolio material | P1 | Planned |
| US-PR-002 | Rory | As Rory, I want to mark a project as "public" so it appears in my portfolio's case studies section, so I can control what employers see without maintaining two separate systems. | Single source of truth for portfolio and dashboard | P1 | Planned |
| US-PR-003 | Rory | As Rory, I want to track the status of a project (idea, in progress, complete, archived), so I know what is active and what is done. | Project lifecycle tracking | P1 | Planned |
| US-PR-004 | Rory | As Rory, I want to add GitHub and live demo links to a project, so visitors viewing my portfolio can explore the work directly. | Portfolio evidence | P1 | Planned |
| US-PR-005 | Rory | As Rory, I want to write lessons learned and future improvements for each project, so my case studies demonstrate how I think, not just what I built. | Shows growth mindset to employers | P2 | Planned |
| US-PR-006 | Employer | As an employer viewing the portfolio, I want to read a project's problem statement and solution in plain language, so I can understand the value of the work without being a developer. | Accessible portfolio content | P1 | Planned |

---

## Functional Requirements

| Requirement ID | Requirement | Priority | MVP / Future | Notes |
|---|---|---|---|---|
| PROJ-MVP-001 | User can create a project with project name and status as required fields | P1 | MVP | — |
| PROJ-MVP-002 | Supported statuses: Idea, In Progress, Complete, Archived | P1 | MVP | Default: "In Progress" |
| PROJ-MVP-003 | Visibility field: Public / Private; default "Private" | P1 | MVP | Public projects appear on portfolio |
| PROJ-MVP-004 | Optional fields: problem solved, tech stack (list), key features, GitHub URL, live demo URL, lessons learned, future improvements | P1 | MVP | — |
| PROJ-MVP-005 | The project list shows name, status badge, visibility badge, and tech stack chips | P1 | MVP | — |
| PROJ-MVP-006 | Public projects (visibility = "public") must appear in the portfolio's Case Studies section | P1 | MVP | Read from same state |
| PROJ-MVP-007 | The user can edit all fields of a project | P1 | MVP | — |
| PROJ-MVP-008 | The user can delete a project with a confirmation step | P1 | MVP | Removing a public project removes it from the portfolio |
| PROJ-MVP-009 | GitHub and live demo URLs open in a new tab with rel="noopener noreferrer" | P1 | MVP | — |
| PROJ-MVP-010 | Empty state shown when no projects exist | P1 | MVP | — |
| PROJ-FUTURE-001 | Screenshot / image upload per project | — | Future | Requires file storage (Supabase Storage in Phase 7) |
| PROJ-FUTURE-002 | Skill/technology filter in project list | — | Future | — |
| PROJ-FUTURE-003 | Project templates (e.g. "Web App", "CLI Tool") | — | Future | — |

---

## Acceptance Criteria

| AC ID | Scenario | Given | When | Then | Status |
|---|---|---|---|---|---|
| AC-PR-001 | Empty state | No projects exist | I open `/dashboard/projects` | Empty state and "Add Project" button visible | Not tested |
| AC-PR-002 | Create project | I enter a name and status, submit | Form closes | Project card appears in the list | Not tested |
| AC-PR-003 | Public project in portfolio | I create a project with visibility "Public" | I view the portfolio case studies section | The project appears there | Not tested |
| AC-PR-004 | Private project not in portfolio | I create a project with visibility "Private" | I view the portfolio case studies section | The project does NOT appear there | Not tested |
| AC-PR-005 | Status badge shown | Project has status "In Progress" | I view the project list | "In Progress" badge is visible | Not tested |
| AC-PR-006 | Tech stack chips shown | Project has tech stack ["React", "TypeScript"] | I view the project list | Both chips are visible on the project card | Not tested |
| AC-PR-007 | GitHub link opens new tab | Project has a GitHub URL | I click the link | GitHub opens in a new tab | Not tested |
| AC-PR-008 | Edit form pre-fills | I click "Edit" on a project | Modal opens | All saved values are in the form | Not tested |
| AC-PR-009 | Delete removes from portfolio | I delete a public project and confirm | — | Project removed from dashboard list and portfolio section | Not tested |
| AC-PR-010 | Mobile layout | I open projects at 390px | — | Cards render correctly; form accessible | Not tested |

---

## UI / UX Notes

**Layout:** Card grid (2 columns on desktop, 1 column on mobile). Page header with "Projects" title and "Add Project" button.

**ProjectCard:**
- Project name (bold)
- Status badge (colour-coded)
- Visibility badge: "Public" (green) / "Private" (grey)
- Tech stack chips (first 4, then "+N more")
- Problem solved (2-line truncated preview)
- GitHub icon link + Live demo icon link (if set)
- Edit and Delete buttons

**Status badge colours:** Idea → grey, In Progress → blue, Complete → green, Archived → muted.

**Portfolio Case Studies section:** Built from `projects.filter(p => p.visibility === 'public')`. Each public project renders a CaseStudyCard in the portfolio with: name, problem solved, solution summary (key features), tech stack, GitHub link, live link, lessons learned.

**Form modal:** Fields in order: Project Name (text), Status (select), Visibility (radio: Public / Private), Problem Solved (textarea), Tech Stack (comma-separated or tag input), Key Features (textarea), GitHub URL (url), Live Demo URL (url), Lessons Learned (textarea), Future Improvements (textarea).

---

## Data Model

See `docs/architecture/data-model_v0.2.0.md` — `Project` interface.

Key fields: `id`, `name`, `status`, `visibility`, `problemSolved`, `techStack`, `keyFeatures`, `githubUrl`, `liveDemoUrl`, `lessonsLearned`, `futureImprovements`, `createdAt`, `updatedAt`.

---

## QA Test Cases

| Test ID | Test Case | Steps | Expected Result | Status |
|---|---|---|---|---|
| TC-PR-001 | Empty state | Navigate to `/dashboard/projects` with no projects | Empty state visible | Not run |
| TC-PR-002 | Create project | Add project with name and status | Project card appears | Not run |
| TC-PR-003 | Public project visible in portfolio | Create project with visibility "Public" | Portfolio case studies section shows the project | Not run |
| TC-PR-004 | Private project not in portfolio | Create project with visibility "Private" | Portfolio case studies section does NOT show the project | Not run |
| TC-PR-005 | Edit project | Click Edit, change status to "Complete" | Status badge updates | Not run |
| TC-PR-006 | Delete public project | Delete a public project and confirm | Project removed from list and from portfolio | Not run |
| TC-PR-007 | GitHub link | Add project with GitHub URL; click link | New tab opens to GitHub | Not run |
| TC-PR-008 | Mobile 390px | Open projects at 390px | Cards render correctly | Not run |

---

## Future Improvements

- Screenshot upload per project (Supabase Storage, Phase 7+)
- Video demo embed (YouTube/Vimeo URL)
- Skill/technology filter on project list
- Project templates to speed up creation
- Share individual case study as a standalone URL
- PDF export of case study

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.1.0 | 2026-06-03 | Initial projects feature spec created |
