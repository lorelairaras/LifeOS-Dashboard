# Decision Log — LifeOS Portfolio Dashboard

**Version:** v0.1.0  
**Date:** 2026-06-03  
**Author:** Rory  
**Status:** Active — updated throughout project

---

## How to Use This Log

Every significant technical or product decision must be recorded here. A decision is significant if it:
- affects the architecture
- chooses one tool or approach over alternatives
- defers a feature to a later phase
- establishes a project standard

Decisions requiring human approval are tracked in `docs/decisions/human-decisions.md`.

---

## Decision Records

---

### DEC-001 — Framework: React + Vite over Next.js

**Date:** 2026-06-03  
**Status:** Decided  
**Decision maker:** Rory

**Decision:** Use React + Vite + TypeScript as the frontend framework.

**Alternatives considered:**
- Next.js + TypeScript: File-based routing, SSR/SSG, excellent Vercel integration. Adds complexity that is not needed for an MVP that is entirely client-side.

**Rationale:** The public portfolio and private dashboard both work as single-page client-side applications. There is no SEO-critical content (the portfolio sections are not dynamically generated from a CMS). The dashboard is private. There is no need for server-side rendering, API routes, or server components in MVP. React + Vite is faster to set up, produces a smaller bundle, and has no server-side complexity to manage.

**Revisit if:** Case studies require dynamic routing from a CMS, or SEO becomes a priority. In that case, migrating to Next.js would be documented as a DEC.

---

### DEC-002 — Styling: Tailwind CSS

**Date:** 2026-06-03  
**Status:** Decided  
**Decision maker:** Rory

**Decision:** Use Tailwind CSS for all styling.

**Alternatives considered:**
- CSS Modules: More explicit, no purging concerns. More verbose for a solo project.
- Styled Components: CSS-in-JS runtime overhead. Not ideal for Vite/Tailwind combination.
- Chakra UI / shadcn/ui: Good component libraries, but add opinions about design that conflict with a portfolio needing a distinctive look.

**Rationale:** Tailwind utility classes allow rapid UI iteration without maintaining a separate CSS file for every component. For a solo project with a clear design direction, Tailwind is the right balance of speed and control. Purging ensures the production bundle contains only used styles.

---

### DEC-003 — State: Local React state for MVP

**Date:** 2026-06-03  
**Status:** Decided  
**Decision maker:** Rory

**Decision:** All tracker data (tasks, prompts, applications, budget) uses local React state in MVP. No database or local storage in Phase 0–6.

**Alternatives considered:**
- localStorage: Persists across browser sessions without a backend. Adds complexity for very little gain if Supabase is the eventual target.
- Supabase from Phase 1: Correct long-term architecture, but adds significant setup time for an MVP whose primary purpose is demonstrating frontend skill.

**Rationale:** The MVP needs to demonstrate UI capability. Data persistence is a separate concern that should be layered on top of a working UI, not built alongside it. A "data resets on refresh" limitation is clearly documented in the UI and in the MVP scope. Supabase integration is Phase 7.

**Revisit:** Phase 7 — Supabase persistence.

---

### DEC-004 — Testing: Playwright for E2E, Vitest for unit tests

**Date:** 2026-06-03  
**Status:** Decided  
**Decision maker:** Rory

**Decision:** Use Playwright for end-to-end tests and Vitest for unit/component tests.

**Rationale:** Playwright is free, cross-browser, and first-class for React + Vite. Vitest is built for the Vite ecosystem and shares configuration with the main project. Both are zero-cost. Vitest will only be added if there is specific utility-level logic to test (e.g. date formatting, budget calculations). E2E tests with Playwright are the primary testing layer.

---

### DEC-005 — Deployment: Vercel free tier

**Date:** 2026-06-03  
**Status:** Decided  
**Decision maker:** Rory

**Decision:** Deploy to Vercel free tier.

**Free tier limits (as of 2026):** 100 GB bandwidth/month, unlimited deployments, custom domain support, automatic HTTPS. Sufficient for a personal portfolio.

**Rationale:** Vercel has native support for Vite projects. Push to main → automatic deployment. No server to manage. No cost for this scale of usage.

**Risk:** If the project exceeds free tier limits (unlikely for a personal portfolio), Netlify or GitHub Pages are equivalent alternatives at zero cost.

---

### DEC-006 — No numbered folder names

**Date:** 2026-06-03  
**Status:** Decided  
**Decision maker:** Rory

**Decision:** All folders use clean descriptive names. No `01_docs`, `02_src`, or similar prefixed naming.

**Rationale:** Numbered folders create maintenance overhead (renumbering when structure changes) and look non-standard to collaborators and interviewers reviewing the repository.

---

### DEC-007 — Database deferred to Phase 7

**Date:** 2026-06-03  
**Status:** Decided  
**Decision maker:** Rory

**Decision:** Supabase (PostgreSQL) integration is deferred until Phase 7, after all dashboard features work with local state.

**Rationale:** Adding a database from the start creates two problems to solve simultaneously: building correct UI and building correct data access. Separating these concerns means UI bugs and data bugs never obscure each other.

---

### DEC-008 — Semantic versioning for documentation files

**Date:** 2026-06-03  
**Status:** Decided  
**Decision maker:** Organisation policy (applied via CLAUDE.md)

**Decision:** Every document that is edited receives a new versioned filename (e.g. `project-brief_v0.1.0.md` → `project-brief_v0.2.0.md`). The previous version is not deleted. A changelog section at the bottom of each file records all changes.

**Rationale:** Version history in filenames is visible without needing to open git history. Useful for review and audit trails.

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.1.0 | 2026-06-03 | Initial decision log created with DEC-001 through DEC-008 |
