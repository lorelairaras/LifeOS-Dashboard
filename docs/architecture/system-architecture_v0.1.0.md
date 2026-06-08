# System Architecture — LifeOS Portfolio Dashboard

**Version:** v0.1.0  
**Date:** 2026-06-03  
**Author:** Rory  
**Status:** Draft

---

## Architecture Overview

LifeOS is a client-side single-page application (SPA) with two logical sections sharing one codebase, one repository, and one deployment.

```
Browser
  └── React SPA (Vite build)
        ├── Public Portfolio  →  /
        └── Private Dashboard →  /dashboard/*
```

There is no server-side rendering. There is no backend server in MVP. All data in MVP is held in React component state and is not persisted.

---

## High-Level Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    User's Browser                        │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │               React Application                  │   │
│  │                                                  │   │
│  │   ┌──────────────────┐  ┌──────────────────┐    │   │
│  │   │  Public Portfolio│  │ Private Dashboard│    │   │
│  │   │  Route: /        │  │ Route: /dashboard│    │   │
│  │   │                  │  │                  │    │   │
│  │   │ - Homepage       │  │ - Dashboard Home │    │   │
│  │   │ - About          │  │ - Task Tracker   │    │   │
│  │   │ - Skills         │  │ - Prompt Library │    │   │
│  │   │ - Projects       │  │ - Job Tracker    │    │   │
│  │   │ - Contact        │  │ - Budget Tracker │    │   │
│  │   └──────────────────┘  │ - Settings       │    │   │
│  │                         └──────────────────┘    │   │
│  │                                                  │   │
│  │   ┌──────────────────────────────────────────┐  │   │
│  │   │         React Router (client-side)        │  │   │
│  │   └──────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
└─────────────────────────────────────────────────────────┘
          │
          │  Static files served via CDN
          ▼
┌─────────────────────┐
│   Vercel CDN        │
│   (free tier)       │
│   dist/ folder      │
└─────────────────────┘
          │
          │  (Phase 7 only)
          ▼
┌─────────────────────┐
│   Supabase          │
│   - PostgreSQL      │
│   - Auth            │
│   - Storage         │
│   (free tier)       │
└─────────────────────┘
```

---

## Application Layers

### Routing Layer
React Router v6 manages all client-side routing. Two root layouts are defined:
- `PortfolioLayout` — wraps all public portfolio pages
- `DashboardLayout` — wraps all dashboard pages, includes sidebar navigation

### Component Layer

Components are organised into three levels:

1. **Page components** (`src/app/` or `src/features/[feature]/pages/`) — Full page views. Composed from feature and shared components.
2. **Feature components** (`src/features/[feature]/components/`) — Components specific to one feature (e.g. `TaskCard`, `PromptForm`).
3. **Shared components** (`src/components/`) — Generic, reusable UI primitives (e.g. `Button`, `Card`, `Modal`, `EmptyState`).

### State Layer (MVP)

In MVP, each feature manages its own state using `useState` and `useReducer`. State lives at the feature page level and is passed down via props or a local context.

No global state management library is used in MVP. If prop drilling becomes a problem, a feature-scoped context will be introduced before considering Zustand or similar.

### Data Layer (Phase 7)

When Supabase is added:
- Each feature will have a dedicated service file in `src/lib/` (e.g. `src/lib/tasks.ts`)
- Service files use the Supabase JavaScript client
- Data fetching uses React's built-in patterns (useEffect + useState) initially, optionally migrated to TanStack Query if complexity warrants it
- Environment variables: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

---

## File Structure

```
lifeos-portfolio/
├── public/
│   └── assets/              # Static images, fonts, icons
├── src/
│   ├── app/                 # Route definitions and root layouts
│   │   ├── router.tsx
│   │   ├── PortfolioLayout.tsx
│   │   └── DashboardLayout.tsx
│   ├── components/          # Shared, generic UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── EmptyState.tsx
│   │   ├── LoadingState.tsx
│   │   └── ...
│   ├── features/            # Feature-specific logic and components
│   │   ├── portfolio/
│   │   │   ├── pages/
│   │   │   └── components/
│   │   ├── tasks/
│   │   ├── prompts/
│   │   ├── jobs/
│   │   └── budget/
│   ├── hooks/               # Shared custom React hooks
│   ├── lib/                 # External service clients (Supabase in Phase 7)
│   ├── styles/              # Global styles, Tailwind base
│   │   └── index.css
│   ├── types/               # Shared TypeScript type definitions
│   │   └── index.ts
│   └── utils/               # Pure utility functions
│       ├── formatDate.ts
│       ├── formatCurrency.ts
│       └── ...
├── tests/
│   ├── e2e/                 # Playwright tests
│   └── unit/                # Vitest tests
├── docs/                    # All project documentation
├── .env.example             # Environment variable template
├── .eslintrc.cjs
├── .prettierrc
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
├── playwright.config.ts
├── CLAUDE.md
└── README.md
```

---

## Security Considerations (MVP)

- No authentication in MVP. The dashboard is not protected. It is a demo/portfolio tool.
- No sensitive data is stored. All data is local state and disappears on refresh.
- No environment variables are exposed in MVP (no API keys required).
- External links use `rel="noopener noreferrer"` to prevent tab-napping.
- When Supabase is added (Phase 7), the anon key is a public key by design (row-level security controls access). The service role key must never be committed or exposed in the client.

See `docs/security/privacy-and-data-notes.md` for full details.

---

## Performance Considerations

- Vite production builds use tree-shaking and code splitting by default.
- Tailwind CSS is purged in production — only used utility classes are included.
- Images in `public/assets/` should be compressed (WebP preferred where supported).
- React lazy loading (`React.lazy` + `Suspense`) should be applied to dashboard feature pages to reduce the initial bundle size.

---

## Accessibility Architecture

- All interactive elements use semantic HTML (`<button>`, `<a>`, `<input>`, `<label>`).
- Focus management: modals trap focus when open, return focus to trigger on close.
- ARIA labels are applied to icon-only buttons.
- Colour contrast targets: WCAG 2.1 AA minimum (4.5:1 for normal text, 3:1 for large text).
- Keyboard navigation must be possible for all primary user flows.

See `docs/uiux/responsive-design.md` for the full accessibility checklist.

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.1.0 | 2026-06-03 | Initial system architecture created |
