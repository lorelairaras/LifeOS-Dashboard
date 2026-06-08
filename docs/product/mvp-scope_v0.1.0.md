# MVP Scope — LifeOS Portfolio Dashboard

**Version:** v0.1.0  
**Date:** 2026-06-03  
**Author:** Rory  
**Status:** Draft

---

## MVP Definition

The MVP is the smallest version of LifeOS that:
- Can be deployed and shared as a live URL
- Demonstrates the core technical and product skills
- Gives Rory a usable daily productivity tool
- Does not require a backend server or paid service to run

---

## In Scope for MVP

### Public Portfolio

| Section | Description |
|---|---|
| Homepage | Hero section with name, title, and call-to-action links |
| About | Short bio, background, what I work on |
| Skills | Categorised skill tags (frontend, backend, tools, soft skills) |
| Projects | At least two project cards with title, description, tech stack, and links |
| Contact | Email link, GitHub link, LinkedIn link (no form with server required) |

### Private Dashboard

| Section | Description |
|---|---|
| Dashboard Home | Summary cards showing counts: tasks, applications, prompts, budget balance |
| Task Tracker | Create, view, edit, delete tasks. Fields: title, status, priority, due date, notes |
| Prompt Library | Create, view, edit, delete prompts. Fields: title, category, use case, prompt body, tags, created date, copy action |
| Job Application Tracker | Create, view, edit, delete applications. Fields: company, role, location, status, link, notes, date applied, follow-up date |
| Budget Tracker | Create, view, delete entries. Fields: category, amount, type (income/expense), date, notes. Show totals per type |
| Settings | Placeholder page — no functionality in MVP |

### Technical

| Item | Description |
|---|---|
| Stack | React + Vite + TypeScript + Tailwind CSS |
| State | Local component state only — no database in MVP |
| Routing | React Router v6 — separate routes for portfolio and dashboard |
| Testing | Playwright E2E smoke tests for public portfolio pages |
| Linting | ESLint + Prettier configured and passing |
| TypeScript | Strict mode, no build errors |
| Deployment | Vercel free tier |
| Repository | Public GitHub repository |

---

## Explicitly Out of Scope for MVP

The following are documented as future features and must not be added to the MVP without explicit approval:

| Feature | Reason deferred |
|---|---|
| Supabase Auth | Adds complexity, not needed for local-only MVP |
| Supabase PostgreSQL | Data does not persist across sessions in MVP — this is acceptable |
| AI API integration | Paid API, adds cost and complexity |
| 3D landing page | Three.js/React Three Fiber — performance risk, not needed for core demo |
| Mobile PWA | Service workers, manifest — out of scope for first deploy |
| Analytics | Not needed until there is traffic to measure |
| Mood tracker | Feature not needed for MVP utility |
| Workout tracker | Feature not needed for MVP utility |
| Notes system | Feature not needed for MVP utility |
| Resume/cover letter builder | Feature not needed for MVP utility |
| Theming/dark mode | Nice to have, not critical |
| Form-based contact section | Requires a backend email service — mailto link is sufficient for MVP |

---

## MVP Acceptance Criteria

The MVP is complete when all of the following are true:

- [ ] The public portfolio is live on Vercel with a working URL
- [ ] All five public portfolio sections render correctly on desktop and mobile
- [ ] The dashboard shell loads with sidebar or top navigation
- [ ] All five tracker sections are accessible via navigation
- [ ] Each tracker supports create, view, and delete operations using local state
- [ ] The app builds without TypeScript errors (`npm run build`)
- [ ] ESLint passes with no errors (`npm run lint`)
- [ ] At least three Playwright smoke tests pass for the public portfolio
- [ ] No 404 errors on any linked page
- [ ] Responsive on 390px mobile, 768px tablet, and 1280px desktop
- [ ] README includes the live URL

---

## MVP Data Persistence Note

In MVP, all tracker data lives in React component state. Refreshing the browser resets the data. This is intentional and documented. Supabase persistence is planned for Phase 7. This limitation must be clearly communicated in the UI (e.g. a small banner: "Data is not saved between sessions in this demo version").

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.1.0 | 2026-06-03 | Initial MVP scope created |
