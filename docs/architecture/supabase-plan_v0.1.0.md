# Supabase Integration Plan — LifeOS Portfolio Dashboard

**Version:** v0.1.0  
**Date:** 2026-06-08  
**Author:** Rory  
**Status:** Phase 11 — Planning (awaiting implementation in Phase 12)  
**Standards reference:** ISO 27001 (A.8 Asset Management, A.9 Access Control), SOC 2 (CC6.1 Logical Access)

---

## 1. Overview

Supabase provides the persistence and authentication layer for LifeOS. The MVP local-state UI remains functional; Supabase replaces in-memory state with durable, user-scoped storage.

### Supabase free tier constraints (as of 2026)

| Resource | Free tier limit |
|---|---|
| Database | 500 MB |
| Auth users | Unlimited |
| API requests | Unlimited |
| Realtime connections | 200 concurrent |
| Edge Functions | 500K invocations/month |
| Storage | 1 GB |
| Bandwidth | 5 GB |

**Decision:** All Phase 12–15 features stay within free tier. No paid features required.

---

## 2. Architecture

```
Browser (React SPA)
  ├── Public portfolio pages → No auth required, no database calls
  └── Dashboard pages → Supabase Auth required
        ├── supabaseClient.ts → Single client instance
        ├── AuthProvider (React Context) → Session state
        ├── useAuth() hook → Login/logout/session
        └── Feature hooks (useTasks, usePrompts, etc.)
              └── Supabase CRUD via supabaseClient
                    └── RLS enforces user_id = auth.uid()
```

### Client setup

- Single `supabaseClient.ts` file using `createClient()` from `@supabase/supabase-js`
- Environment variables: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Anon key is public by design — RLS controls access
- Service role key is never used in client code

### Auth flow

1. User navigates to `/dashboard`
2. AuthProvider checks session via `supabase.auth.getSession()`
3. If no session → redirect to login page
4. Login via email/password (Supabase Auth)
5. On success → redirect to `/dashboard`
6. Session token stored in browser by Supabase client (httpOnly cookie or localStorage based on config)
7. All API calls include session token automatically
8. Logout clears session and redirects to public portfolio

### Route protection

- Public routes (`/`, `/portfolio/*`): No auth check
- Dashboard routes (`/dashboard/*`): Wrapped in `<ProtectedRoute>` component
- `<ProtectedRoute>` reads auth state from `useAuth()` and redirects to login if unauthenticated

---

## 3. Database tables

### 3.1 user_profiles

| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | UUID | PK, references auth.users(id) ON DELETE CASCADE | Same as Supabase Auth user ID |
| display_name | TEXT | | User's display name |
| created_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | |
| updated_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | |

**Purpose:** Extends Supabase Auth user with app-specific profile data.  
**Created:** Automatically via database trigger on auth.users insert.

### 3.2 tasks

| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | UUID | PK DEFAULT gen_random_uuid() | |
| user_id | UUID | NOT NULL, FK → auth.users(id) ON DELETE CASCADE | Owner |
| title | TEXT | NOT NULL | |
| description | TEXT | | Optional |
| status | TEXT | NOT NULL DEFAULT 'todo', CHECK IN (...) | todo, in_progress, done, blocked |
| priority | TEXT | NOT NULL DEFAULT 'medium', CHECK IN (...) | low, medium, high, urgent |
| category | TEXT | NOT NULL DEFAULT 'general', CHECK IN (...) | general, work, project, personal, career |
| due_date | DATE | | Optional |
| notes | TEXT | | Optional |
| created_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | |
| updated_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | |

### 3.3 prompts

| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | UUID | PK DEFAULT gen_random_uuid() | |
| user_id | UUID | NOT NULL, FK → auth.users(id) ON DELETE CASCADE | Owner |
| title | TEXT | NOT NULL | |
| body | TEXT | NOT NULL | The prompt text |
| category | TEXT | NOT NULL DEFAULT 'other', CHECK IN (...) | 8 categories |
| use_case | TEXT | | Optional |
| tags | TEXT[] | NOT NULL DEFAULT '{}' | Array of tag strings |
| last_used_at | TIMESTAMPTZ | | Updated on copy |
| created_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | |
| updated_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | |

### 3.4 job_applications

| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | UUID | PK DEFAULT gen_random_uuid() | |
| user_id | UUID | NOT NULL, FK → auth.users(id) ON DELETE CASCADE | Owner |
| company | TEXT | NOT NULL | |
| role | TEXT | NOT NULL | |
| location | TEXT | | Optional |
| job_type | TEXT | CHECK IN (...) | remote, hybrid, on_site, flexible |
| status | TEXT | NOT NULL DEFAULT 'applied', CHECK IN (...) | 8 statuses |
| job_url | TEXT | | Optional |
| notes | TEXT | | Optional — may contain sensitive info |
| date_applied | DATE | | Optional |
| follow_up_date | DATE | | Optional |
| created_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | |
| updated_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | |

### 3.5 budget_entries

| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | UUID | PK DEFAULT gen_random_uuid() | |
| user_id | UUID | NOT NULL, FK → auth.users(id) ON DELETE CASCADE | Owner |
| title | TEXT | NOT NULL | |
| amount | NUMERIC(12,2) | NOT NULL, CHECK > 0 | Always positive; type determines sign |
| type | TEXT | NOT NULL, CHECK IN ('income','expense') | |
| category | TEXT | NOT NULL DEFAULT '' | |
| date | DATE | NOT NULL | |
| notes | TEXT | | Optional |
| created_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | |

### 3.6 weekly_focus

| Column | Type | Constraints | Notes |
|---|---|---|---|
| user_id | UUID | PK, FK → auth.users(id) ON DELETE CASCADE | One row per user |
| text | TEXT | NOT NULL DEFAULT '' | |
| updated_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | |

---

## 4. Row-Level Security (RLS) policies

Every table has RLS enabled. The pattern is identical for all user-scoped tables:

```sql
ALTER TABLE <table> ENABLE ROW LEVEL SECURITY;

-- Users can only see their own rows
CREATE POLICY "select_own" ON <table>
  FOR SELECT USING (auth.uid() = user_id);

-- Users can only insert rows they own
CREATE POLICY "insert_own" ON <table>
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can only update their own rows
CREATE POLICY "update_own" ON <table>
  FOR UPDATE USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can only delete their own rows
CREATE POLICY "delete_own" ON <table>
  FOR DELETE USING (auth.uid() = user_id);
```

**No service role bypass in client code.** The anon key + RLS is the only access path.

---

## 5. CRUD rules per table

### tasks

| Operation | Rule | Notes |
|---|---|---|
| CREATE | user_id = auth.uid(), title required | status defaults to 'todo' |
| READ | user_id = auth.uid() | Filtered/sorted client-side |
| UPDATE | user_id = auth.uid(), updated_at = now() | Any field except id, user_id, created_at |
| DELETE | user_id = auth.uid() | Hard delete — no soft delete in MVP |

### prompts

| Operation | Rule | Notes |
|---|---|---|
| CREATE | user_id = auth.uid(), title + body required | |
| READ | user_id = auth.uid() | |
| UPDATE | user_id = auth.uid(), updated_at = now() | last_used_at updated on copy action |
| DELETE | user_id = auth.uid() | Hard delete |

### job_applications

| Operation | Rule | Notes |
|---|---|---|
| CREATE | user_id = auth.uid(), company + role required | |
| READ | user_id = auth.uid() | |
| UPDATE | user_id = auth.uid(), updated_at = now() | Status transitions not enforced in DB |
| DELETE | user_id = auth.uid() | Hard delete |

### budget_entries

| Operation | Rule | Notes |
|---|---|---|
| CREATE | user_id = auth.uid(), title + amount + type + date required | |
| READ | user_id = auth.uid() | |
| UPDATE | user_id = auth.uid() | No updated_at column (immutable-ish) |
| DELETE | user_id = auth.uid() | Hard delete |

### weekly_focus

| Operation | Rule | Notes |
|---|---|---|
| UPSERT | user_id = auth.uid() | Single row per user — use upsert |
| READ | user_id = auth.uid() | |

---

## 6. Privacy notes

| Data type | Sensitivity | Handling |
|---|---|---|
| Email (auth) | PII | Managed by Supabase Auth; not stored in app tables |
| Password | Credential | Hashed by Supabase Auth; never visible to app |
| Task titles/notes | Low | User-controlled content |
| Prompt body | Low | User-controlled content |
| Job applications | Medium | Contains company names, roles, professional info |
| Budget entries | High | Financial data — never log amounts in error messages |
| Budget notes | High | May contain account references |

### Data residency

Supabase free tier: AWS US East 1 (default). No region selection on free tier.

### Data retention

No automatic deletion. User can delete individual records. Account deletion cascades all data via ON DELETE CASCADE.

### Data export

Not implemented in MVP. Planned for future phase if needed.

---

## 7. Environment variables

| Variable | Purpose | Where stored | Committed to repo? |
|---|---|---|---|
| VITE_SUPABASE_URL | Supabase project URL | .env.local / Vercel env vars | NO — .env.example only |
| VITE_SUPABASE_ANON_KEY | Supabase public anon key | .env.local / Vercel env vars | NO — .env.example only |

The anon key is public by design, but we keep it in env vars for easy rotation and environment separation.

---

## 8. Implementation phases

| Phase | Scope |
|---|---|
| 12 | Install client, auth foundation, schema SQL, env docs |
| 13 | Connect all 4 trackers + weekly focus to Supabase CRUD |
| 14 | Harden auth, RLS, privacy, protected routes |
| 15 | Full QA pass |

---

## 9. Standards-readiness check

| Standard | Requirement | Status |
|---|---|---|
| ISO 27001 A.9.2 | User access management | Addressed — Supabase Auth + RLS |
| ISO 27001 A.9.4 | System and application access control | Addressed — RLS per-user isolation |
| ISO 27001 A.10.1 | Cryptographic controls | Addressed — Supabase uses TLS + bcrypt passwords |
| ISO 27001 A.12.4 | Logging and monitoring | Gap — no audit logging in MVP |
| SOC 2 CC6.1 | Logical and physical access controls | Addressed — RLS + auth |
| SOC 2 CC6.3 | Role-based access | Partial — single role (owner) only |
| DPTM | Data protection | Partial — no data retention policy defined |
| ISO 9001 | Document control | Addressed — versioned docs with changelog |

**Items flagged for rework before certification:**
- FR-SUP-001: Add audit logging for data mutations (ISO 27001 A.12.4)
- FR-SUP-002: Define data retention policy (DPTM, SOC 2)
- FR-SUP-003: Add rate limiting on auth endpoints (ISO 27001 A.14.1)

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.1.0 | 2026-06-08 | Initial Supabase integration plan created (Phase 11) |
