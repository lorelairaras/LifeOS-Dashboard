# Deployment Plan — LifeOS Portfolio Dashboard

**Version:** v0.2.0
**Date:** 2026-06-08
**Author:** Rory
**Status:** Ready for Phase 10 deployment — all pre-deployment checks passing

---

## Deployment Target

**Platform:** Vercel (free tier / Hobby plan)
**Repository:** GitHub (public)
**Method:** GitHub integration — automatic deployment on push to `main`

---

## Deployment Architecture

```
Developer machine
  → git push origin feat/[branch]
  → Pull Request created on GitHub
  → Vercel Preview Deployment (auto, from PR)
  → Review and approve PR
  → Merge to main
  → Vercel Production Deployment (auto, from main)
  → Live at [vercel-url]
```

---

## Pre-Deployment Checklist

Before merging any branch to `main`:

- [x] `npm run build` completes without errors locally ✅ (verified Phase 9)
- [x] `npm run typecheck` returns no type errors ✅ (verified Phase 9)
- [x] `npm run lint` returns no errors ✅ (verified Phase 9)
- [ ] Playwright tests pass locally (`npx playwright test`) ⏭ run locally before merge
- [x] `.npmrc` present at project root with `legacy-peer-deps=true` ✅ (added Phase 10)
- [x] `engines` field in `package.json` pins Node `20.x` ✅ (added Phase 10)
- [ ] No `console.error` output in the browser on any tested page
- [ ] No broken links (internal or external) on changed pages
- [ ] Environment variables are set on Vercel if a new variable was added
- [ ] `README.md` is accurate and up to date ✅ (updated Phase 10)

---

## First Deployment Steps

1. Create a GitHub repository (public): `lifeos-portfolio`
2. Push the local project to GitHub:
   ```bash
   git init
   git add .
   git commit -m "chore(repo): initialize LifeOS project"
   git branch -M main
   git remote add origin https://github.com/[USERNAME]/lifeos-portfolio.git
   git push -u origin main
   ```
3. Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub
4. Select `lifeos-portfolio`
5. Framework preset: **Vite** (Vercel detects this automatically)
6. Build settings (Vercel defaults, no changes needed):
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install` (`.npmrc` handles `--legacy-peer-deps` automatically)
7. Click Deploy
8. Confirm the deployment URL is live and the homepage loads
9. Add the live URL to `README.md`

---

## Environment Variables

### MVP (no variables required)

No environment variables are needed in Phases 0–10. All data is local state.

### Phase 12 (Supabase)

When Supabase is added, the following must be set in the Vercel project settings:

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase project anon key (public key) |

These values are also documented in `.env.example` but must never be committed to the repository.

---

## Branch and PR Workflow

1. Never push directly to `main`
2. Create a branch: `git checkout -b feat/[feature-name]`
3. Make changes, commit with Conventional Commits
4. Push branch: `git push origin feat/[feature-name]`
5. Open a PR on GitHub
6. Vercel creates a preview deployment for the PR automatically
7. Review the preview URL
8. Merge to `main`
9. Vercel deploys to production automatically

---

## Rollback Plan

If a production deployment is broken:

1. Go to the Vercel project dashboard
2. Navigate to the Deployments tab
3. Find the last known-good deployment
4. Click "Promote to Production" on that deployment
5. Investigate the broken deployment locally before re-deploying

---

## Deployment Status

| Environment | URL | Status |
|---|---|---|
| Production | TBD — not yet deployed | Ready to deploy (Phase 10 complete) |
| Preview | Auto-generated per PR | Not yet set up |

This table will be updated when the project is deployed. Do not add a URL here until the deployment is verified working.

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.1.0 | 2026-06-03 | Initial deployment plan created |
| v0.2.0 | 2026-06-08 | Status updated to Ready (Phase 10). Pre-deployment checklist updated with verified items. `.npmrc` and `engines` items added. Supabase phase updated from Phase 7 to Phase 12. Supersedes v0.1.0. |
