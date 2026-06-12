# QA Execution Log — v0.22.0

**Phase:** GitHub Pages deployment pipeline (chore/github-pages-deploy)
**Date:** 2026-06-12
**Executed by:** Claude (author) + independent review agent (reviewer ≠ author)
**Branch:** chore/github-pages-deploy (off main @ 8c2d28b, post PR #9 build fix)
**Supersedes:** qa-execution-log_v0.21.0.md

---

## Scope

Make https://lorelairaras.github.io/LifeOS-Dashboard/ live. Pages was configured to
"Deploy from a branch: main /(root)", which serves the raw unbuilt repo — a Vite app
cannot run that way. This round adds the official Actions build-and-deploy pipeline,
a mode-switched Vite `base`, BASE_URL-aware internal anchors, and a 404.html SPA fallback,
without touching the working Vercel deployment.

## Changes

| File | Change |
|---|---|
| `.github/workflows/deploy-pages.yml` | NEW — official Pages pipeline (checkout@v4, setup-node@v4 + npm cache, `npm run build:ghpages`, index→404 SPA fallback, configure-pages@v5, upload-pages-artifact@v3, deploy-pages@v4; `pages: write` + `id-token: write`; concurrency without cancel-in-progress per GitHub starter). No secrets referenced — Pages build is intentionally Demo Mode. |
| `vite.config.ts` | Function-form `defineConfig(({ mode }) => ...)`; `base: mode === 'ghpages' ? '/LifeOS-Dashboard/' : '/'`. CLI `--mode` avoids `process.env` (no @types/node under strict tsconfig.node). |
| `package.json` | NEW script `build:ghpages` = `tsc -b && vite build --mode ghpages`. |
| `src/app/PortfolioLayout.tsx` (×3), `src/features/portfolio/sections/HeroSection.tsx`, `src/app/DashboardLayout.tsx` | Root-absolute `<a href="/...">` → `import.meta.env.BASE_URL`-based hrefs so full-page links work under both bases. |
| `src/app/router.tsx` | Comment correction only (basename source of truth = Vite base; behavior unchanged — `basename: import.meta.env.BASE_URL` was already in place). |
| `docs/deployment/github-pages-deployment-guide_v0.1.0.md` | NEW — coexistence table, the one manual setup step (Pages Source → "GitHub Actions"), verification steps, caveats. |

## Verification Results

| Check | Command | Result |
|---|---|---|
| TypeScript (strict, real build config) | `tsc -b` (via both builds) | PASS |
| Default build (Vercel path) | `npm run build` | PASS — `dist/index.html` assets at `/assets/...` (base `/` preserved) |
| Pages build | `npm run build:ghpages` | PASS — assets at `/LifeOS-Dashboard/assets/...` |
| ESLint | `npm run lint` (`--max-warnings 0`) | PASS |
| Unit tests | `npx vitest run` | PASS — 34/34 |
| Playwright E2E | `npx playwright test` (exit code checked directly, no pipe) | PASS — **98/98** (chromium + mobile-chrome, 1.2m) |

Runtime verification on the live URL is **pending the one manual step** (Settings → Pages →
Source → "GitHub Actions") + merge to main; verification checklist is in the deployment guide.

## Independent Review

Separate review agent with no knowledge of authorship. **Verdict: APPROVE.**
Evidence-based review: reviewer independently re-ran typecheck, both builds, and vitest;
verified trailing-slash basename support in the installed `@remix-run/router` source;
grepped all of `src/` and confirmed no remaining root-absolute raw anchors.

| # | Severity | Finding | Resolution |
|---|---|---|---|
| 1 | Minor | Favicon `/vite.svg` doesn't exist (no `public/` dir) — pre-existing 404 on both hosts | DEFERRED — already scheduled as Phase 25C-1 (real favicon + OG tags); recorded in deployment guide caveats |
| 2 | Minor | Unrelated local files (`.claude/*`, `scripts/`) must not be swept into the commit | FIXED — files staged explicitly |
| 3 | Minor | `cancel-in-progress: true` deviated from GitHub's official starter (`false` for production deploys) | FIXED — set to `false` with comment |
| 4 | Info | 404-fallback deep links return HTTP status 404 (content correct) — Pages platform behavior | ACCEPTED — documented in guide caveats |
| 5 | Info | `/LifeOS-Dashboard` (no trailing slash) — Pages 301s to trailing slash, so basename edge never hits | NO CHANGE |
| 6 | Info | Stale `router.tsx` comment claimed basename was prod-vs-dev rather than mode-based | FIXED — comment corrected |
| 7 | Info | Raw anchors remain full page loads; `<Link>` conversion would be SPA-smoother | DEFERRED — pre-existing pattern; candidate for Phase 25 |
| 8 | Info | Docs + QA log required before completion per CLAUDE.md | FIXED — this log + deployment guide v0.1.0 |

## Document index note

Index registration of the two new docs is deliberately deferred to integration: the
pending `docs/phase-25-meta-prompt` branch holds `document-index_v0.18.0.md`; registering
here would recreate the parallel-branch version collision. Register both (this guide +
this QA log) as v0.19.0 after both branches merge, per the established
"keep published, re-home to next free version" policy.

## Standards Readiness Check

| Standard | Flag | Notes |
|---|---|---|
| ISO 27001 A.12.1.2 (change management) | ✅ | Pages deploys now go through a versioned, repeatable pipeline instead of raw-branch serving |
| SOC 2 (Availability) | ✅ | SPA fallback + verification checklist documented; concurrency protects in-flight production deploys |
| DPTM | ✅ | Public deployment is provably data-free: no Supabase env vars, demo persona only, no secrets in workflow |
| ISO 9001 | ✅ | Full loop: build → verify both modes → lint/unit/E2E → independent review → findings fixed/dispositioned → versioned log |
| WCAG 2.1 AA | ✅ | No UI behavior change; 98/98 E2E including a11y dialog suite |

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.22.0 | 2026-06-12 | GitHub Pages pipeline QA — both build modes verified, 98/98 E2E, independent review APPROVE (2 fixes applied, rest dispositioned). |
| v0.21.0 | 2026-06-12 | Phase 23E ambient bat flock QA round. |
