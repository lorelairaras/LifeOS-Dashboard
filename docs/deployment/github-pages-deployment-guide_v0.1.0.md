# GitHub Pages Deployment Guide — LifeOS Portfolio Dashboard

**Version:** v0.1.0
**Date:** 2026-06-12
**Author:** Rory (drafted by Claude)
**Status:** Active
**Live URL:** https://lorelairaras.github.io/LifeOS-Dashboard/
**Standards referenced:** ISO 27001 A.12.1.2 (change management — deploys gated by a repeatable pipeline), SOC 2 (Availability — SPA fallback documented), DPTM (no personal data on the public deployment)

---

## How the two deployments coexist

| | Vercel (existing) | GitHub Pages (this guide) |
|---|---|---|
| Build command | `npm run build` | `npm run build:ghpages` |
| Vite `base` | `/` | `/LifeOS-Dashboard/` (set by `--mode ghpages` in `vite.config.ts`) |
| SPA deep-link handling | `vercel.json` rewrite to `/index.html` | `dist/404.html` copy of `index.html` (Pages has no rewrites) |
| Supabase env vars | Optional (personal mode if set) | **Never set** — site is always Demo Mode ("Lyra M." data) |
| Trigger | Push to `main` (Vercel Git integration) | Push to `main` (`.github/workflows/deploy-pages.yml`) |

The router needs no per-host code: `createBrowserRouter(..., { basename: import.meta.env.BASE_URL })`
picks up whichever base the build used. Internal full-page links use
`import.meta.env.BASE_URL` instead of root-absolute `/...` paths for the same reason.

---

## One-time setup (manual — GitHub UI)

The workflow can only publish when Pages is set to deploy **from Actions**, not from a branch.

1. Open the repo → **Settings → Pages → Build and deployment**.
2. Change **Source** from `Deploy from a branch` to **`GitHub Actions`**.
3. That's it. The next push to `main` (or **Actions → Deploy to GitHub Pages → Run workflow**)
   builds and publishes the site.

> Why the old setting showed a broken site: `Deploy from a branch: main /(root)` serves the
> **raw, unbuilt repository** — an `index.html` that references `/src/main.tsx`, which a browser
> cannot execute. A Vite app must be built before it can be served.

---

## Verifying a deployment

1. **Actions tab** → latest "Deploy to GitHub Pages" run is green.
2. https://lorelairaras.github.io/LifeOS-Dashboard/ loads the portfolio (Rose Obsidian, bats if motion is on).
3. Deep link https://lorelairaras.github.io/LifeOS-Dashboard/dashboard loads the dashboard in
   Demo Mode with the gold Demo badge (served via the 404.html fallback — the HTTP status is 404
   by GitHub Pages design, but the app loads and routes correctly).
4. No Supabase requests appear in the network tab (demo mode has nothing to call).

---

## Known caveats

| # | Caveat | Impact |
|---|---|---|
| 1 | Deep links return HTTP status 404 (content is still the app) | Cosmetic for users; crawlers/uptime monitors see 404 on sub-routes. The portfolio root returns 200. |
| 2 | Favicon `/vite.svg` does not exist (no `public/` directory) | Pre-existing 404 on both hosts; fix scheduled in Phase 25C-1 (real favicon + OG tags). |
| 3 | Internal nav anchors (`Enter Dashboard`, `View Portfolio`) are full page loads | Pre-existing pattern; converting to router `<Link>` is a Phase 25 nicety, not a defect. |

---

## Security / privacy posture

- The workflow references **no secrets** — there is nothing to leak. The public site cannot
  reach any database because `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY` are absent, so
  `isSupabaseConfigured` is false and all hooks serve fictional demo data.
- Personal-mode deployments (with Supabase vars) belong on Vercel/private hosting only —
  see `personal-setup-guide_v0.1.0.md`.

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.1.0 | 2026-06-12 | Initial guide — Actions workflow, mode-switched base, 404 SPA fallback, manual Source switch, caveats. |
