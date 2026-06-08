# LifeOS Portfolio Dashboard

**Version:** v0.2.0
**Status:** Phases 0–9 complete — WCAG 2.1 AA accessibility pass, mobile-responsive, build verified
**Author:** Rory
**Contact:** lorelai.raras@edufied.edu.vn

---

## What This Is

LifeOS is a personal operating system — two products in one repository:

1. **Public Portfolio** — a professional portfolio site demonstrating frontend development, product thinking, documentation, QA, and AI workflow skills.
2. **Private Dashboard** — a personal productivity hub for tasks, job applications, prompts, budget, and projects.

Built entirely on free and open-source tools. No paid subscriptions, APIs, or templates.

---

## Tech Stack

| Layer | Tool | Why |
|---|---|---|
| Framework | React + Vite + TypeScript | Fast, lightweight, no SSR needed for MVP |
| Styling | Tailwind CSS | Utility-first, rapid iteration |
| Routing | React Router v6 | SPA routing with lazy-loaded dashboard chunks |
| Testing (E2E) | Playwright | Free, cross-browser, real-browser tests |
| Linting | ESLint + Prettier | Consistent code quality |
| Version Control | GitHub | Free public repository |
| Deployment | Vercel (free tier) | Zero-config Vite deployment |
| Database (Phase 12) | Supabase (free tier) | PostgreSQL + Auth + Storage |

---

## Features

### Public Portfolio (built in base shell)
- Hero section with name, tagline, and CTAs
- About section
- Skills section with categorised tags
- Projects section with tech stack chips and links
- Contact section with email, GitHub, LinkedIn
- Responsive navigation with mobile hamburger menu
- Skip-to-main-content link (WCAG 2.4.1)

### Private Dashboard (Phases 2–9 complete)
- Dashboard home with stat cards and weekly focus widget
- Task Tracker — full CRUD (Phase 5)
- Prompt Library — full CRUD with copy (Phase 6)
- Job Application Tracker — full CRUD with status filtering (Phase 7)
- Budget Tracker — full CRUD with income/expense summary (Phase 8)
- Projects — placeholder (Phase 11+)
- Settings — placeholder (Phase 11+)

---

## Local Setup

```bash
# Clone the repository
git clone https://github.com/[YOUR_GITHUB_USERNAME]/lifeos-portfolio.git
cd lifeos-portfolio

# Install dependencies (.npmrc sets legacy-peer-deps=true automatically)
npm install

# Start development server
npm run dev
```

The app runs at `http://localhost:5173`.

> **Before going live:** Replace `[YOUR_USERNAME]` placeholders in `src/features/portfolio/data/portfolioData.ts` and `src/features/portfolio/sections/ContactSection.tsx` with your real GitHub/LinkedIn handles.

---

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start Vite development server |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint (zero warnings enforced) |
| `npm run lint:fix` | Auto-fix ESLint issues |
| `npm run format` | Run Prettier |
| `npm run format:check` | Check formatting without writing |
| `npm run typecheck` | TypeScript check only (no build) |
| `npm run test:e2e` | Run Playwright E2E tests |
| `npm run test:e2e:ui` | Playwright with interactive UI |

---

## Deployment

Deployed on **Vercel free tier**. The `vercel.json` SPA rewrite rule is already in place.

> Deployment URL will be added here once the first deploy is verified.

See [`docs/deployment/vercel-deployment-guide_v0.2.0.md`](docs/deployment/vercel-deployment-guide_v0.2.0.md) for step-by-step setup.

---

## Source Structure

```
src/
├── app/                     # Router, layouts
│   ├── router.tsx           # All routes (dashboard routes lazy-loaded)
│   ├── PortfolioLayout.tsx  # Public portfolio wrapper + nav
│   └── DashboardLayout.tsx  # Private dashboard wrapper + sidebar
├── components/              # Shared reusable components
│   ├── Badge.tsx
│   ├── Button.tsx
│   ├── button.utils.ts      # Button style utilities
│   ├── Card.tsx
│   ├── EmptyState.tsx
│   ├── PageHeader.tsx
│   ├── Section.tsx
│   └── index.ts
├── features/
│   ├── portfolio/           # Public portfolio feature
│   │   ├── data/            # Static portfolio content
│   │   ├── pages/           # PortfolioPage, NotFoundPage
│   │   └── sections/        # Hero, About, Skills, Projects, Contact
│   └── dashboard/
│       └── pages/           # Dashboard stubs (7 pages)
├── styles/                  # Global CSS (Tailwind + skip link)
├── types/                   # All shared TypeScript types
├── vite-env.d.ts            # Vite client type declarations
└── main.tsx                 # Entry point
```

---

## Documentation

All documentation is in `docs/`. See [`docs/document-index_v0.2.0.md`](docs/document-index_v0.2.0.md) for the full 32-document index.

Key documents:
- [MVP Scope](docs/product/mvp-scope_v0.2.0.md)
- [Roadmap](docs/product/roadmap_v0.1.0.md)
- [Tech Stack](docs/architecture/tech-stack_v0.1.0.md)
- [Data Model](docs/architecture/data-model_v0.2.0.md)
- [Feature Specs](docs/requirements/features/)
- [Test Plan](docs/qa/test-plan_v0.1.0.md)
- [Deployment Plan](docs/deployment/deployment-plan_v0.2.0.md)

---

## Roadmap

| Phase | Milestone | Status |
|---|---|---|
| 0 | Project setup, config, docs | ✅ Done |
| 1 | Public portfolio shell | ✅ Done |
| 2 | Dashboard shell | ✅ Done |
| 3 | Dashboard page routing | ✅ Done |
| 4 | Shared component library | ✅ Done |
| 5 | Task Tracker (CRUD + state) | ✅ Done |
| 6 | Prompt Library (CRUD + copy) | ✅ Done |
| 7 | Job Application Tracker (CRUD) | ✅ Done |
| 8 | Budget Tracker (CRUD) | ✅ Done |
| 9 | QA, accessibility, mobile pass | ✅ Done |
| 10 | Vercel deployment preparation | ✅ Done |
| 11 | Projects feature | Not started |
| 12 | Supabase persistence | Not started |
| Future | Auth, AI features, 3D landing | Post-MVP |

---

## License

MIT. Free to use as reference. Do not publish as your own portfolio without changes.
