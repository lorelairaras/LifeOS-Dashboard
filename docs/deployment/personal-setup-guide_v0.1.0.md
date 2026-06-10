# Personal Setup Guide — Access Your Own Dashboard

**Version:** v0.1.0
**Date:** 2026-06-11
**Author:** Rory (drafted by Claude)
**Status:** Active
**Standards referenced:** ISO 27001 (access control, secrets management), DPTM (personal data protection)

---

## How the two modes work

LifeOS runs in one of two modes, decided automatically at startup:

| | Demo Mode | Personal Mode |
|---|---|---|
| **When** | No Supabase environment variables set | Supabase configured + you are logged in |
| **Who sees it** | Anyone visiting the public site | Only you, after login |
| **Data shown** | Fictional persona "Lyra M." mock data | Your own private data |
| **Data saved?** | No — changes live in browser memory only and reset on refresh | Yes — saved to your Supabase database |
| **Badge** | Gold "Demo" badge in sidebar | No badge |
| **Login required?** | No — dashboard is open for demo browsing | Yes — redirected to /login |

The public deployment (GitHub Pages) has no Supabase keys, so visitors always get Demo Mode. Your personal data is never on the public site.

---

## Set up your personal dashboard (≈15 minutes, free tier)

### Step 1 — Create a free Supabase project

1. Go to [supabase.com](https://supabase.com) and sign up (free tier — no card needed).
2. Click **New Project**. Pick any name (e.g. `lifeos-personal`), set a strong database password, choose the region closest to you.
3. Wait ~2 minutes for provisioning.

### Step 2 — Run the database migrations

1. In your Supabase project, open **SQL Editor**.
2. Paste the contents of [`supabase/migrations/001_initial_schema.sql`](../../supabase/migrations/001_initial_schema.sql) and click **Run**.
3. Paste the contents of [`supabase/migrations/002_projects_habits_notes.sql`](../../supabase/migrations/002_projects_habits_notes.sql) and click **Run**.

This creates all tables (tasks, prompts, job applications, budget entries, projects, habits, notes) with Row Level Security so each user can only ever read and write their own rows.

### Step 3 — Configure environment variables

1. In Supabase, go to **Settings → API**. Copy the **Project URL** and the **anon public key**.
2. In the project root, copy `.env.example` to `.env`:
   ```
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```

> ⚠️ **Security rules (ISO 27001 / SOC 2):**
> - Never commit `.env` — it is already in `.gitignore`. Only `.env.example` belongs in the repo.
> - The **anon key** is safe in client code (RLS enforces privacy). The **service role key must never** be placed in `.env`, client code, or the repository.

### Step 4 — Run and sign up

```bash
npm install
npm run dev
```

1. Open `http://localhost:5173`.
2. Click **Enter Dashboard** — you will now be redirected to **/login** (Personal Mode is active).
3. Click **Sign up**, create your account, and log in.
4. Every module now starts empty and saves your own data privately.

### Step 5 (optional) — Deploy your personal copy

Deploy to Vercel/Netlify free tier and set the same two environment variables in the host's dashboard. Keep your personal deployment URL private, or rely on login — either way RLS guarantees data isolation per account.

The public GitHub Pages portfolio deployment should **not** have these variables, so it stays in Demo Mode for visitors.

---

## Verifying the privacy boundary

After signup, confirm:

- [ ] Dashboard shows empty states (no "Lyra M." data) — demo data never seeds real accounts
- [ ] No "Demo" badge in the sidebar
- [ ] Create a task, refresh the page — it persists
- [ ] Log out — dashboard redirects to /login
- [ ] (Optional) Create a second account — it cannot see the first account's data

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.1.0 | 2026-06-11 | Initial guide — demo vs personal mode, Supabase setup, security rules |
