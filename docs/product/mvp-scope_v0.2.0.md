# MVP Scope — LifeOS Portfolio Dashboard

**Version:** v0.2.0
**Date:** 2026-06-03
**Author:** Rory
**Status:** Draft
**Supersedes:** mvp-scope_v0.1.0.md

---

## MVP Definition

The MVP is the smallest version of LifeOS that:
- Is deployed and accessible via a live URL
- Demonstrates frontend development, product thinking, documentation, and QA skills
- Gives Rory a usable daily productivity and career management system
- Runs entirely on free tools with no paid subscription required

---

## In Scope for MVP

### 1. Public Portfolio

| Section | Description | Fields / Content |
|---|---|---|
| Hero | Name, title/tagline, two CTA buttons | Name, tagline, "View Projects" CTA, "Contact" CTA |
| About | Professional bio and background | 2–4 paragraphs, focus areas |
| Skills | Categorised skill tags | Frontend, Backend/Tools, Business & Product, Other |
| Projects | Project cards linking to work | Title, description, tech stack tags, GitHub link, live link |
| Case Studies | Deeper project write-ups | Problem, solution, tech, screenshots, lessons learned |
| Resume / Experience | Career timeline and download link | Roles, dates, responsibilities, download PDF link |
| Contact | Contact links (no server form) | Email (mailto), GitHub, LinkedIn |

### 2. Dashboard Home

| Widget | Description |
|---|---|
| Today's Tasks | Count of tasks due today or overdue |
| Open Job Applications | Count of active applications (not rejected/closed) |
| Budget Balance | Current month net balance (income minus expenses) |
| Active Projects | Count of in-progress projects |
| Weekly Focus | Editable single-line text note — "What am I focusing on this week?" |
| Recent Prompts | Last 3 prompts used/copied |
| Quick Actions | Buttons: "Add Task", "Log Application", "Add Entry" |

### 3. Task Tracker

| Field | Required | Default |
|---|---|---|
| Title | ✅ | — |
| Description | No | — |
| Status | No | "To Do" |
| Priority | No | "Medium" |
| Category | No | "General" |
| Due Date | No | — |
| Notes | No | — |

Operations: Create, Read, Edit, Delete. Filter by status and priority.

### 4. Prompt Library

| Field | Required | Default |
|---|---|---|
| Title | ✅ | — |
| Prompt Body | ✅ | — |
| Category | No | "Uncategorised" |
| Use Case | No | — |
| Tags | No | [] |

Operations: Create, Read, Edit, Delete, Copy to clipboard. Filter by category.
Categories: Frontend Development, QA Testing, Documentation, Business Analysis, Product Planning, Resume & Cover Letter, Daily Planning, Other.

### 5. Job Application Tracker

| Field | Required | Default |
|---|---|---|
| Company | ✅ | — |
| Role | ✅ | — |
| Location | No | — |
| Job Type | No | — (Remote / Hybrid / On-site / Flexible) |
| Status | No | "Applied" |
| Job URL | No | — |
| Date Applied | No | — |
| Follow-up Date | No | — |
| Notes | No | — |

Statuses: Saved, Applied, Phone Screen, Assessment, Interviewing, Offer, Rejected, Closed.
Operations: Create, Read, Edit, Delete. Filter by status.

### 6. Budget Tracker

| Field | Required | Default |
|---|---|---|
| Title | ✅ | — |
| Amount | ✅ | — |
| Type | ✅ | — (Income / Expense) |
| Category | No | "Uncategorised" |
| Date | ✅ | Today |
| Notes | No | — |

Operations: Create, Read, Delete. Filter by type. Show income total, expense total, net balance.
Note: Edit is deferred. Users delete and re-create to correct an entry.

### 7. Projects / Case Studies

| Field | Required | Description |
|---|---|---|
| Project Name | ✅ | — |
| Status | ✅ | Idea / In Progress / Complete / Archived |
| Problem Solved | No | What problem does this project address? |
| Tech Stack | No | List of technologies used |
| Key Features | No | What does it do? |
| GitHub URL | No | — |
| Live Demo URL | No | — |
| Lessons Learned | No | What did you learn? |
| Future Improvements | No | What would you add next? |
| Visibility | ✅ | Public (appears in portfolio) / Private (dashboard only) |

Operations: Create, Read, Edit, Delete. Public projects feed the portfolio case studies section.

### Technical

| Item | Detail |
|---|---|
| Stack | React + Vite + TypeScript + Tailwind CSS |
| State | Local component state only — no database in MVP |
| Routing | React Router v6 |
| Testing | Playwright E2E + Vitest for utility functions |
| Linting | ESLint + Prettier |
| TypeScript | Strict mode |
| Deployment | Vercel free tier |
| Repository | Public GitHub |
| SPA Routing | `vercel.json` rewrite rule required on day 1 |

---

## Explicitly Out of Scope for MVP

| Feature | Reason deferred |
|---|---|
| Supabase Auth | Phase 7 — adds complexity before UI is validated |
| Supabase PostgreSQL | Phase 7 — data resets on refresh in MVP, documented in UI |
| AI API integration | Post-MVP — requires paid API approval |
| 3D landing page | Post-MVP — Three.js/R3F |
| Mobile PWA | Post-MVP |
| Analytics | Post-MVP — not needed before traffic exists |
| Mood tracker | Post-MVP |
| Workout tracker | Post-MVP |
| Notes / blog system | Post-MVP |
| Dark/light mode toggle | Post-MVP — dark is the default design |
| Server-side contact form | MVP uses mailto link only |
| Edit budget entries | Intentionally deferred — delete and re-create instead |

---

## MVP Acceptance Criteria

The MVP is complete when all of the following are true:

- [ ] Public portfolio is live on Vercel at a working URL
- [ ] All seven portfolio sections render on desktop and mobile
- [ ] Dashboard home loads with all seven widgets/quick actions
- [ ] All six dashboard feature pages are accessible via navigation
- [ ] Each tracker supports create, view, delete using local state
- [ ] Task tracker and prompt library support edit
- [ ] Job tracker and projects support edit
- [ ] `npm run build` passes with no TypeScript errors
- [ ] `npm run lint` passes with no errors
- [ ] Playwright smoke tests pass for public portfolio (minimum 8 tests)
- [ ] No 404 errors on any linked page
- [ ] Responsive on 390px, 768px, and 1280px
- [ ] `vercel.json` SPA rewrite rule is in place and tested
- [ ] Data-loss notice is shown on dashboard first load
- [ ] README includes the live URL

---

## MVP Data Persistence Note

All tracker data lives in React state. Data resets on browser refresh. This is intentional. A non-blocking banner informs users: "Data is not saved between sessions in this demo version." Supabase persistence is Phase 7.

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.2.0 | 2026-06-03 | Added Case Studies and Resume/Experience to portfolio; added Task.description/category, Job.jobType, Budget.title, Projects feature; expanded Dashboard Home widgets; fixed job statuses (added Assessment, renamed Withdrawn→Closed); added vercel.json note |
| v0.1.0 | 2026-06-03 | Initial MVP scope created |
