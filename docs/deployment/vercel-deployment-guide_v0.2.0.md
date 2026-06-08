# Vercel Deployment Guide — LifeOS Portfolio Dashboard

**Version:** v0.2.0
**Date:** 2026-06-08
**Author:** Rory
**Status:** Ready — validated at Phase 10

---

## Prerequisites

- GitHub account with the `lifeos-portfolio` repository
- Vercel account (free — sign up at vercel.com with GitHub)
- The project builds locally with `npm run build`

---

## .npmrc and Node Version Notes

**Peer dependency handling (resolved in Phase 10):**
A `.npmrc` file at the project root sets `legacy-peer-deps=true` automatically. Vercel's `npm install` will pick this up — no manual `installCommand` override needed in the Vercel dashboard.

**Node version (resolved in Phase 10):**
The project pins Node `20.x` via the `engines` field in `package.json`. Vercel respects this automatically and selects Node 20 for builds.

---

## Step 1 — Connect GitHub to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New** → **Project**
3. Under "Import Git Repository", find `lifeos-portfolio`
4. Click **Import**

---

## Step 2 — Configure the Project

Vercel detects Vite automatically. Confirm these settings:

| Setting | Value |
|---|---|
| Framework Preset | Vite |
| Root Directory | `.` (repository root) |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

No changes are needed. The `.npmrc` at the root handles `--legacy-peer-deps` automatically. Click **Deploy**.

---

## Step 3 — Verify the Deployment

1. Wait for the build to complete (typically 30–60 seconds)
2. Click the generated URL (e.g. `lifeos-portfolio-xxx.vercel.app`)
3. Confirm the homepage loads
4. Confirm the dashboard route loads at `/dashboard`
5. Confirm no 404 errors on any linked pages

---

## Step 4 — Add the URL to README

Once verified:

```markdown
## Live URL
https://[your-vercel-url].vercel.app
```

Do not add the URL until the deployment is verified working.

---

## Step 5 — Configure Custom Domain (Optional)

If you have a custom domain:

1. Go to the project settings in Vercel → Domains
2. Add your domain
3. Update your DNS records as instructed by Vercel
4. Wait for DNS propagation (can take up to 48 hours)

---

## Automatic Deployments

After the initial setup:

- Every push to `main` → Production deployment
- Every PR → Preview deployment (unique URL per PR)

No manual steps are required for subsequent deployments.

---

## Vercel Free Tier Limits

| Limit | Value |
|---|---|
| Bandwidth | 100 GB / month |
| Deployments | Unlimited |
| Serverless functions | 100 GB-hours / month |
| Custom domains | 1 per project |
| Team members | 1 (personal/hobby) |

A personal portfolio is well within these limits.

---

## Troubleshooting

**Build fails on Vercel due to peer dependency conflicts:**
- This is resolved. The `.npmrc` file at the project root sets `legacy-peer-deps=true` — Vercel picks this up automatically. No manual `installCommand` override is needed.

**Build fails on Vercel due to Node version mismatch:**
- This is resolved. `package.json` contains `"engines": { "node": "20.x" }` — Vercel respects this and uses Node 20 automatically.

**404 on page refresh (SPA routing):**
- The `vercel.json` at the project root already contains the SPA rewrite rule. This should not occur on a fresh deployment.
  ```json
  {
    "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
  }
  ```

**Environment variables not found:**
- Go to Vercel project settings → Environment Variables
- Add variables for the correct environment (Production / Preview / Development)
- Re-deploy after adding variables

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.1.0 | 2026-06-03 | Initial Vercel deployment guide created |
| v0.2.0 | 2026-06-08 | Status updated to Ready (Phase 10 validated). Added `.npmrc` note. Added `engines` note. Resolved build troubleshooting items. Supersedes v0.1.0. |
