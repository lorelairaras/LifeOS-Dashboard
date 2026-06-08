# Privacy and Data Notes — LifeOS Portfolio Dashboard

**Version:** v0.2.0  
**Date:** 2026-06-08  
**Author:** Rory  
**Status:** Updated for Phase 11 Supabase planning  
**Supersedes:** privacy-and-data-notes_v0.1.0.md  
**Standards reference:** ISO 27001 (A.8, A.18), DPTM, SOC 2 (CC6, CC7)

---

## Overview

LifeOS is a personal productivity tool. In MVP (Phases 0–10), no user data is collected or stored on a server. Starting Phase 12, Supabase provides authentication and database persistence.

---

## MVP Data Handling (Phases 0–10)

### What data exists

- All tracker data (tasks, prompts, job applications, budget entries) lives in React component state only.
- Data is not written to localStorage, sessionStorage, IndexedDB, or any browser storage.
- Data is not sent to any server or API.
- Data disappears when the browser tab is closed or refreshed.

### What data is collected

None. The application does not:
- Track page views
- Collect any personal information from visitors
- Use cookies
- Use analytics scripts
- Use third-party tracking pixels

### Third-party services (MVP)

| Service | Purpose | Data sent |
|---|---|---|
| Vercel CDN | Hosts static files | Standard HTTP request logs (IP address, user agent, timestamp) — managed by Vercel's privacy policy |

---

## Supabase Data Handling (Phases 12+)

### Data stored in Supabase

| Table | Data type | Sensitivity | Notes |
|---|---|---|---|
| auth.users | Email, hashed password | PII / Credential | Managed by Supabase Auth — not directly accessible to app |
| user_profiles | Display name | Low | Auto-created on signup |
| tasks | Title, description, notes | Low | User-controlled content |
| prompts | Title, body, tags | Low | User-authored prompt text |
| job_applications | Company, role, location, notes | Medium | Professional information; notes may contain salary data |
| budget_entries | Title, amount, category, notes | HIGH | Financial data — amounts and notes must never appear in logs or error output |
| weekly_focus | Short text | Low | Single editable string |

### Data location

- Supabase free tier: AWS US East 1 (default)
- No region selection on free tier
- Data encrypted at rest (Supabase default: AES-256)
- Data encrypted in transit (TLS 1.2+)

### Row-level security

- All tables have RLS enabled
- Only the authenticated user can read, insert, update, or delete their own records
- No service role key in client code
- Anon key is public by design; access controlled by RLS policies

### Supabase keys

| Key | Type | Safe in client? | Notes |
|---|---|---|---|
| Anon key | Public | Yes | Access controlled by RLS — safe to expose in client bundle |
| Service role key | Secret | NO | Never commit, never use in client code |

### Privacy controls

| Control | Implementation |
|---|---|
| User data isolation | RLS: auth.uid() = user_id on every table |
| Password storage | Supabase Auth bcrypt hashing |
| Session management | Supabase Auth JWT tokens |
| Budget data logging | Amounts and notes excluded from error messages and console output |
| Job notes logging | Notes excluded from error messages |
| Account deletion | CASCADE delete removes all user data from all tables |
| Data export | Not implemented in MVP; planned for future phase |

### Error handling privacy rules

1. Never include budget amounts in error messages
2. Never include budget notes in error messages
3. Never include job application notes in error messages
4. Never log raw Supabase error responses to the console in production
5. Show generic user-friendly error messages; log technical details only in development

---

## Security Controls

| Control | MVP Status | Supabase Status |
|---|---|---|
| HTTPS | Enforced by Vercel | Enforced by Vercel + Supabase |
| Authentication | None (demo) | Supabase Auth (email/password) |
| Authorization | None | RLS per-user isolation |
| External links | `rel="noopener noreferrer"` | Same |
| Secrets in code | None | .env.local only; .gitignore enforced |
| `.env.example` | Present | Updated with Supabase vars |
| Input validation | Client-side only | Client-side + DB CHECK constraints |
| Rate limiting | None | Supabase default rate limits on auth |

---

## Standards-Readiness Notes (ISO 27001 / DPTM / SOC 2)

| # | Gap | Standard | Severity | Resolution phase |
|---|---|---|---|---|
| SEC-001 | No formal data classification policy | ISO 27001 A.8.2 | Low (personal project) | Document if pursuing certification |
| SEC-002 | No defined data retention period | DPTM, SOC 2 | Medium | Phase 14 or later |
| SEC-003 | No incident response plan | ISO 27001 A.16, SOC 2 | Medium | Document if pursuing certification |
| SEC-004 | No audit logging for data mutations | ISO 27001 A.12.4 | Medium | Phase 14 or later |
| SEC-005 | No vendor risk assessment for Supabase/Vercel | SOC 2 CC9.2 | Low (personal project) | Document if pursuing certification |
| SEC-006 | No rate limiting on custom endpoints | ISO 27001 A.14.1 | Low | Not applicable in MVP (no custom endpoints) |
| SEC-007 | Single role only (owner) — no admin/viewer separation | SOC 2 CC6.3 | Low | Not needed for single-user tool |

These gaps are documented for portfolio demonstration purposes.

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.2.0 | 2026-06-08 | Added Supabase data handling section, security controls comparison, error handling privacy rules, updated standards-readiness gaps |
| v0.1.0 | 2026-06-03 | Initial privacy and data notes created |
