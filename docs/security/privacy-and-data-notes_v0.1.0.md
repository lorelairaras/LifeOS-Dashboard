# Privacy and Data Notes — LifeOS Portfolio Dashboard

**Version:** v0.1.0  
**Date:** 2026-06-03  
**Author:** Rory  
**Status:** Draft

---

## Overview

LifeOS is a personal tool. In MVP, no user data is collected, stored on a server, or transmitted to any third party. This document describes the data handling posture of the application at each phase.

---

## MVP Data Handling (Phases 0–6)

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
| None | No other third-party services are used in MVP | — |

### Vercel data retention

Vercel retains server logs according to their privacy policy at [vercel.com/legal/privacy-policy](https://vercel.com/legal/privacy-policy). No personal data beyond standard HTTP logs is collected by Vercel for a static Vite deployment.

---

## Phase 7+ Data Handling (Supabase)

When Supabase is added:

### Data stored
- User account (email, hashed password — managed by Supabase Auth)
- Task records
- Prompt records
- Job application records
- Budget entry records

### Data location
- Supabase hosted PostgreSQL database. As of 2026, Supabase free-tier projects are hosted in AWS US East 1 by default. Region selection is available on paid plans.

### Row-level security
- All tables will have RLS enabled. Only the authenticated user can read, insert, update, or delete their own records.

### Supabase anon key
- The Supabase anon key is a public key by design. It is safe to include in client-side code. Access is controlled by RLS policies on the database.
- The service role key must NEVER be committed to the repository or used in client-side code.

### Privacy considerations for Phase 7
- The application is a single-user personal tool. No user registration is open to others.
- Budget data is sensitive personal financial information. It must not be logged in error messages or debug output.
- Job application data contains personal professional information. Same restriction.

---

## Security Controls (MVP)

| Control | Status | Notes |
|---|---|---|
| HTTPS | Enforced by Vercel | All traffic to the Vercel deployment is HTTPS |
| No authentication | N/A | Dashboard is a demo — no protected data in MVP |
| External links | Implemented | All external links use `rel="noopener noreferrer"` |
| No secrets in code | Required | No API keys, tokens, or passwords in the repository |
| `.env.example` | Planned | Documents required variables without values |
| `.gitignore` | Required | `.env` and `.env.local` must be in `.gitignore` |

---

## Standards-Readiness Notes (ISO 27001 / DPTM / SOC 2)

The following gaps would need to be addressed before certification:

1. **Data classification policy** — No formal classification of data types handled by the application. For personal projects this is not required, but a formal policy would be needed for ISO 27001.
2. **Data retention policy** — No defined retention period for Supabase data (Phase 7). Required for DPTM and SOC 2.
3. **Incident response plan** — No documented procedure for security incidents. Required for ISO 27001 and SOC 2.
4. **Access control** — MVP has no authentication. Phase 7 adds Supabase Auth, but a formal access control policy would be needed for certification.
5. **Vendor assessment** — Vercel and Supabase are used as third-party services. A formal vendor risk assessment is not in scope for a personal project but would be required for SOC 2 Type II.

These gaps are noted for portfolio demonstration purposes — they show awareness of certification requirements, not immediate remediation needs.

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.1.0 | 2026-06-03 | Initial privacy and data notes created |
