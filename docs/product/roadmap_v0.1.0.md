# Roadmap — LifeOS Portfolio Dashboard

**Version:** v0.1.0  
**Date:** 2026-06-03  
**Author:** Rory  
**Status:** Draft

---

## Roadmap Overview

This roadmap is structured by development phase. Each phase builds on the previous one. No phase should begin until the prior phase is working, tested, and documented.

Phases 0–8 form the MVP release. Everything beyond Phase 8 is post-MVP.

---

## Phase 0 — Project Setup

**Goal:** A buildable, lintable, deployable empty project.

| Task | Status |
|---|---|
| Initialise Vite + React + TypeScript project | Not started |
| Configure Tailwind CSS | Not started |
| Configure ESLint and Prettier | Not started |
| Create folder structure | Done |
| Write README.md and CLAUDE.md | Done |
| Create documentation suite | In progress |
| Configure GitHub repository | Not started |
| Configure Vercel project | Not started |
| Confirm `npm run build` passes on empty project | Not started |

---

## Phase 1 — Public Portfolio

**Goal:** A live, responsive, shareable portfolio website.

| Task | Status |
|---|---|
| Homepage (hero section, name, title, CTAs) | Not started |
| About section | Not started |
| Skills section | Not started |
| Projects section (at least two projects) | Not started |
| Contact section (mailto + social links) | Not started |
| Responsive layout (mobile + tablet + desktop) | Not started |
| Playwright smoke tests for each section | Not started |
| Deploy to Vercel | Not started |

---

## Phase 2 — Dashboard Shell

**Goal:** A working dashboard layout with navigation, routing, and placeholder sections for all tracker features.

| Task | Status |
|---|---|
| Dashboard layout component | Not started |
| Sidebar navigation (desktop) | Not started |
| Top navigation (mobile) | Not started |
| Dashboard home page with placeholder stat cards | Not started |
| Routes for all tracker sections | Not started |
| Mobile navigation drawer | Not started |

---

## Phase 3 — Task Tracker

**Goal:** A fully functional task tracker using local state.

| Task | Status |
|---|---|
| Task list view | Not started |
| Create task form | Not started |
| Edit task | Not started |
| Delete task | Not started |
| Status and priority filters | Not started |
| Due date display | Not started |

---

## Phase 4 — Prompt Library

**Goal:** A searchable, copyable library of saved AI prompts.

| Task | Status |
|---|---|
| Prompt list view | Not started |
| Create/edit prompt form | Not started |
| Copy prompt to clipboard | Not started |
| Category filter | Not started |
| Tag display | Not started |

---

## Phase 5 — Job Application Tracker

**Goal:** Track every job application with full context.

| Task | Status |
|---|---|
| Application list view | Not started |
| Create/edit application form | Not started |
| Status column (applied, interviewing, offered, rejected, withdrawn) | Not started |
| Follow-up date display | Not started |
| External link to job posting | Not started |

---

## Phase 6 — Budget Tracker

**Goal:** Simple income and expense tracking with category totals.

| Task | Status |
|---|---|
| Entry list view | Not started |
| Create entry form (category, amount, type, date, notes) | Not started |
| Income vs expense totals | Not started |
| Category summary | Not started |
| Delete entry | Not started |

---

## Phase 7 — Supabase Persistence

**Goal:** Data persists across browser sessions.

**Prerequisite:** All Phase 3–6 features work correctly with local state.

| Task | Status |
|---|---|
| Create Supabase project (free tier) | Not started |
| Design database schema | Not started |
| Connect task tracker to Supabase | Not started |
| Connect prompt library to Supabase | Not started |
| Connect job tracker to Supabase | Not started |
| Connect budget tracker to Supabase | Not started |
| Add Supabase Auth (optional in this phase) | Not started |
| Update environment variables on Vercel | Not started |

---

## Phase 8 — QA, Accessibility, and Deployment

**Goal:** The application meets quality and accessibility standards and is fully deployed.

| Task | Status |
|---|---|
| Playwright E2E tests for all dashboard sections | Not started |
| Accessibility audit (WCAG 2.1 AA) | Not started |
| Responsive testing (320px, 390px, 768px, 1280px) | Not started |
| Final Vercel deployment | Not started |
| Smoke test on live URL | Not started |
| README updated with live URL | Not started |
| Final document-index.md update | Not started |

---

## Post-MVP Features (Future)

These features are explicitly deferred. They should not be planned, designed, or started until Phase 8 is complete and the MVP is live.

| Feature | Notes |
|---|---|
| Supabase Auth | Row-level security, private dashboard protection |
| 3D portfolio landing page | React Three Fiber / Three.js |
| AI prompt improver | AI API integration — cost to be approved |
| Resume / cover letter helper | AI-assisted, template-based |
| Mood tracker | Daily mood log with trends chart |
| Workout tracker | Exercise log, sets/reps/weight |
| Notes system | Free-form markdown notes |
| Analytics | Page view tracking (e.g. Plausible free tier) |
| Mobile PWA | Service worker, install prompt, offline support |
| Dark mode | System preference + manual toggle |
| Blog / writing section | Markdown-based articles |
| Case study detail pages | Extended project write-ups with screenshots |

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.1.0 | 2026-06-03 | Initial roadmap created |
