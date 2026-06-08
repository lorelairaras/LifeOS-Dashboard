# Project Brief — LifeOS Portfolio Dashboard

**Version:** v0.1.0  
**Date:** 2026-06-03  
**Author:** Rory  
**Status:** Draft

---

## Project Name

LifeOS Portfolio Dashboard

---

## One-Line Summary

A public portfolio website and private personal productivity dashboard, built as a single React application to demonstrate frontend, product, documentation, QA, and AI workflow skills.

---

## Problem Statement

Developers and analysts building their careers need two things that are rarely in one place:

1. A professional portfolio that clearly shows what they can build, how they think, and what they have shipped.
2. A productivity system that actually fits their workflow — task tracking, job hunting, budget awareness, and a prompt library for AI-assisted work.

Most portfolio sites are shallow one-pagers. Most productivity tools are bloated or expensive. LifeOS combines both into one project that serves a real daily purpose while publicly demonstrating the skills that matter to employers.

---

## Target Users

### Primary User
**Rory** — the developer/analyst building and maintaining this system. Uses the private dashboard daily. Benefits from having productivity tools and portfolio in one maintained codebase.

### Secondary User (Public)
**Employers, recruiters, and collaborators** who visit the public portfolio to evaluate skills, see case studies, and make contact.

---

## Goals

### Portfolio Goals
- Show frontend development capability with a real, deployed application
- Demonstrate product thinking through visible documentation and case studies
- Demonstrate QA discipline through test setup and documentation
- Demonstrate documentation quality through the public docs folder
- Make it easy for employers to understand what was built and why

### Dashboard Goals
- Replace scattered notes, spreadsheets, and sticky notes with a single tool
- Track job applications without losing context
- Maintain a personal prompt library for reuse
- Track budget entries without a full accounting tool
- Track tasks without a paid project management subscription

---

## Scope

### In Scope (MVP)
- Public portfolio: homepage, about, skills, projects, contact
- Private dashboard: shell, task tracker, prompt library, job tracker, budget tracker
- React + Vite + TypeScript + Tailwind CSS stack
- Local state only for MVP (no database in first release)
- Playwright E2E tests for public portfolio
- Deployed to Vercel free tier
- Full documentation suite

### Out of Scope (MVP)
- Supabase authentication
- Supabase database persistence
- AI API integration
- 3D landing page
- Mobile PWA
- Analytics
- Mood tracker
- Workout tracker
- Notes system
- Resume/cover letter builder

See `docs/product/roadmap.md` for the full future feature list.

---

## Success Criteria

MVP is complete when:
1. The public portfolio is live on Vercel and accessible via URL
2. The dashboard shell loads with navigation to all five tracker sections
3. All five trackers work with local state (create, read, update, delete)
4. Playwright smoke tests pass for the public portfolio
5. The application passes lint and TypeScript typecheck
6. Documentation is complete enough for a developer handoff
7. The portfolio is shareable as a GitHub link and a live URL

---

## Constraints

- Free tools only. No paid subscriptions unless explicitly approved.
- No paid APIs. No paid templates. No paid design assets.
- Must work on Vercel free tier.
- Must be maintainable by one person.
- Must not require a running server to view the public portfolio.

---

## Stakeholders

| Name | Role | Input Required |
|---|---|---|
| Rory | Product owner, developer, designer | All major decisions |
| Employers / recruiters | External reviewers | N/A — they evaluate the output |

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.1.0 | 2026-06-03 | Initial project brief created |
