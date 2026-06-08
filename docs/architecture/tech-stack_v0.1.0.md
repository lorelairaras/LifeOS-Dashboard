# Tech Stack — LifeOS Portfolio Dashboard

**Version:** v0.1.0  
**Date:** 2026-06-03  
**Author:** Rory  
**Status:** Decided

---

## Stack Summary

| Layer | Tool | Version | Free Tier |
|---|---|---|---|
| Runtime | Node.js | 20 LTS | Free (local) |
| Package manager | npm | Bundled with Node | Free |
| Framework | React | 18.x | Free (MIT) |
| Build tool | Vite | 5.x | Free (MIT) |
| Language | TypeScript | 5.x | Free (MIT) |
| Styling | Tailwind CSS | 3.x | Free (MIT) |
| Routing | React Router | 6.x | Free (MIT) |
| E2E testing | Playwright | 1.x | Free (Apache 2.0) |
| Unit testing | Vitest | 1.x | Free (MIT) |
| Linting | ESLint | 8.x | Free (MIT) |
| Formatting | Prettier | 3.x | Free (MIT) |
| Version control | Git + GitHub | — | Free (public repo) |
| Deployment | Vercel | Free tier | Free up to limits |
| Database (Phase 7) | Supabase | Free tier | Free up to limits |

---

## Tool Decisions and Rationale

### React 18 + Vite 5

React is the most widely used frontend library. Vite is the current standard build tool for React projects, replacing Create React App. The combination is fast, well-documented, and has excellent community support.

Vite features used:
- HMR (Hot Module Replacement) for fast development
- Native TypeScript support without separate configuration
- Path aliasing (`@/` maps to `src/`) configured in `vite.config.ts`
- Production build with tree-shaking and code splitting

### TypeScript 5 (Strict Mode)

TypeScript strict mode is enabled. This means:
- `noImplicitAny: true`
- `strictNullChecks: true`
- `strictFunctionTypes: true`

All component props, hook return types, and utility functions must be typed. No `any` without an inline comment.

### Tailwind CSS 3

Utility-first CSS. PostCSS integration is configured by Vite. The `tailwind.config.ts` specifies the content paths so unused classes are purged in production.

Custom values (colours, spacing, fonts) are defined in `tailwind.config.ts` under `theme.extend` — not hardcoded as arbitrary values.

### React Router 6

Client-side routing. Routes are defined in a central route file. Uses the `createBrowserRouter` API.

Route structure:
```
/                    → Portfolio layout
  /                  → Homepage (all sections)
/dashboard           → Dashboard layout
  /                  → Dashboard home
  /tasks             → Task tracker
  /prompts           → Prompt library
  /jobs              → Job tracker
  /budget            → Budget tracker
  /settings          → Settings placeholder
```

### Playwright

E2E testing. Tests run against the Vite dev server or the production build. Configuration lives in `playwright.config.ts`.

Tests cover:
- Public portfolio page rendering
- Navigation smoke tests
- Dashboard navigation
- Tracker CRUD operations (Phase 3–6)

### Vitest

Unit/component testing for logic-heavy utilities: date formatting, budget calculations, prompt filtering, status helpers. Configured in `vite.config.ts` alongside the main Vite config.

### ESLint + Prettier

ESLint with TypeScript and React plugins. Prettier for formatting. Both run in CI (future) and on pre-commit.

Config files:
- `.eslintrc.cjs` or `eslint.config.js`
- `.prettierrc`

### GitHub (public repository)

Public repository. Demonstrates commit history, branch strategy, and PR workflow. The repository URL is the primary portfolio evidence for code quality.

Branch strategy:
- `main` — protected, only merged via PR
- `develop` — optional integration branch
- `feat/[name]` — feature branches
- `docs/[name]` — documentation-only branches

### Vercel (free tier)

Zero-configuration deployment for Vite projects. Free tier includes:
- Unlimited hobby deployments
- Automatic HTTPS
- Custom domain support
- 100 GB bandwidth/month

The project will be connected to the GitHub repository. Every push to `main` triggers a new deployment. Preview deployments are created for every PR.

### Supabase (Phase 7, free tier)

PostgreSQL + Auth + Storage. Free tier includes:
- 500 MB database storage
- 2 projects
- 50,000 monthly active users
- 1 GB file storage

Supabase is not configured in Phase 0–6. Environment variables for the Supabase URL and anon key will be added when Phase 7 begins. The `.env.example` file will document the required variables.

---

## Free Tier Assumptions

The following assumptions about free tiers are documented here. If any assumption becomes false (e.g. pricing changes), the affected decision must be updated in `docs/product/decision-log.md` and a human decision must be logged in `docs/decisions/human-decisions.md`.

| Service | Assumption |
|---|---|
| Vercel | Free hobby tier is sufficient for a personal portfolio with no team collaboration |
| Supabase | Free tier (500 MB storage, 50k MAU) is sufficient for a single-user dashboard |
| GitHub | Public repository is free with no limitations relevant to this project |
| All npm packages | Listed packages are MIT or Apache licensed with no runtime cost |

---

## Not Used and Why

| Tool | Reason not used |
|---|---|
| Next.js | SSR not needed for MVP — see DEC-001 |
| Create React App | Deprecated, replaced by Vite |
| Webpack | Vite is faster and better for this use case |
| Styled Components | Runtime CSS-in-JS overhead, Tailwind is simpler |
| Redux | Overkill for local state in MVP |
| Zustand | Considered but deferred — use React state first, add Zustand only if prop drilling becomes problematic |
| Firebase | Google product with complex pricing; Supabase is open-source and simpler |
| Jest | Vitest is preferred in the Vite ecosystem |
| Cypress | Playwright is faster to set up for this stack |

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.1.0 | 2026-06-03 | Initial tech stack document created |
