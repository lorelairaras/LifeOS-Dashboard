# Test Cases — LifeOS Portfolio Dashboard

**Version:** v0.3.0  
**Date:** 2026-06-08  
**Author:** Rory  
**Status:** Updated for Phase 11 — Supabase QA cases added  
**Supersedes:** test-cases_v0.2.0.md

---

## Changes in v0.3.0

Added Supabase-specific test cases: auth flow (TC-AUTH-*), RLS (TC-RLS-*), CRUD persistence (TC-CRUD-*), and error handling (TC-ERR-*). These tests are blocked until Phase 12 implementation.

---

## Public Portfolio Test Cases

**TC-PF-001** | Phase 1 | Playwright | P1
Given: app is running | When: navigate to `/` | Then: page loads, title contains "Rory" | Status: Not run

**TC-PF-002** | Phase 1 | Playwright | P1
Given: homepage | When: page loads | Then: `#hero` section visible, h1 contains "Rory" | Status: Not run

**TC-PF-003** | Phase 1 | Playwright | P1
Given: homepage | When: page loads | Then: nav with aria-label "Main navigation" has links | Status: Not run

**TC-PF-004** | Phase 1 | Playwright | P1
Given: hero section | When: visible | Then: "View Projects" and "Get in Touch" CTA links present | Status: Not run

**TC-PF-005** | Phase 1 | Playwright | P2
Given: page top | When: Tab once | Then: skip link receives focus | Status: Not run

**TC-PF-006** | Phase 1 | Playwright | P2
Given: external links (`target="_blank"`) | When: inspect rel attr | Then: all contain "noopener" | Status: Not run

**TC-PF-007** | Phase 1 | Playwright | P2
Given: `#skills` section | When: visible | Then: at least 6 `<li>` elements | Status: Not run

**TC-PF-008** | Phase 3 | Playwright | P2
Given: `#case-studies` section | When: visible | Then: at least 1 `<article>` element | Status: Not run

**TC-PF-009** | Phase 3 | Playwright | P2
Given: `#resume` section | When: visible | Then: at least 1 `<li>` in timeline | Status: Not run

**TC-PF-010** | Phase 1 | Manual | P2
Given: 390px viewport | When: scroll all sections | Then: no horizontal overflow | Status: Not run

**TC-PF-011** | Phase 1 | Manual | P2
Given: 320px viewport | When: scroll all sections | Then: no horizontal overflow | Status: Not run

**TC-PF-012** | Phase 1 | Playwright | P2
Given: 390px viewport | When: click hamburger | Then: mobile nav opens, all links visible | Status: Not run

---

## Authentication Test Cases (Phase 12+)

**TC-AUTH-001** | Phase 12 | Manual/Playwright | P1
Given: unauthenticated user | When: navigate to `/dashboard` | Then: redirected to login page | Status: Blocked

**TC-AUTH-002** | Phase 12 | Manual/Playwright | P1
Given: login page | When: enter valid email/password and submit | Then: redirected to `/dashboard` | Status: Blocked

**TC-AUTH-003** | Phase 12 | Manual/Playwright | P1
Given: login page | When: enter invalid credentials | Then: error message shown, no redirect | Status: Blocked

**TC-AUTH-004** | Phase 12 | Manual/Playwright | P1
Given: authenticated user | When: click logout | Then: session cleared, redirected to public portfolio | Status: Blocked

**TC-AUTH-005** | Phase 12 | Manual | P2
Given: authenticated session | When: session expires | Then: next API call redirects to login | Status: Blocked

**TC-AUTH-006** | Phase 12 | Playwright | P1
Given: unauthenticated user | When: navigate to `/` (public portfolio) | Then: page loads normally, no redirect | Status: Blocked

---

## RLS Test Cases (Phase 13+)

**TC-RLS-001** | Phase 13 | Manual | P1
Given: User A creates a task | When: User B logs in | Then: User B cannot see User A's task | Status: Blocked

**TC-RLS-002** | Phase 13 | Manual | P1
Given: User A creates a budget entry | When: User B queries budget_entries | Then: User B gets empty result | Status: Blocked

**TC-RLS-003** | Phase 13 | Manual | P1
Given: User A's task ID known | When: User B attempts update via Supabase client | Then: update fails silently (0 rows affected) | Status: Blocked

**TC-RLS-004** | Phase 13 | Manual | P1
Given: User A's prompt ID known | When: User B attempts delete via Supabase client | Then: delete fails (0 rows affected) | Status: Blocked

---

## CRUD Persistence Test Cases (Phase 13+)

**TC-CRUD-001** | Phase 13 | Playwright | P1
Given: authenticated user on tasks page | When: create task with title "Test task" | Then: task appears in list AND persists after page refresh | Status: Blocked

**TC-CRUD-002** | Phase 13 | Playwright | P1
Given: existing task | When: update status to "done" | Then: status persists after refresh | Status: Blocked

**TC-CRUD-003** | Phase 13 | Playwright | P1
Given: existing task | When: delete task | Then: task removed AND stays removed after refresh | Status: Blocked

**TC-CRUD-004** | Phase 13 | Playwright | P1
Given: authenticated user on prompts page | When: create prompt | Then: prompt persists after refresh | Status: Blocked

**TC-CRUD-005** | Phase 13 | Playwright | P1
Given: authenticated user on jobs page | When: create job application | Then: application persists after refresh | Status: Blocked

**TC-CRUD-006** | Phase 13 | Playwright | P1
Given: authenticated user on budget page | When: create budget entry | Then: entry persists, totals update correctly | Status: Blocked

**TC-CRUD-007** | Phase 13 | Manual | P2
Given: authenticated user | When: update weekly focus text | Then: text persists after refresh | Status: Blocked

---

## Error Handling Test Cases (Phase 13+)

**TC-ERR-001** | Phase 13 | Manual | P2
Given: Supabase unavailable | When: user tries to create task | Then: user-friendly error shown, no crash | Status: Blocked

**TC-ERR-002** | Phase 13 | Manual | P2
Given: budget entry creation fails | When: error occurs | Then: error message does not contain amount or notes | Status: Blocked

**TC-ERR-003** | Phase 13 | Manual | P2
Given: network error during load | When: page renders | Then: loading state shown, then error state, no blank page | Status: Blocked

---

## Unit Test Cases (Vitest)

**TC-BT-UNIT-001** | Phase 8 | Vitest | P1
calculateTotals([income 5000, income 2000, expense 3000]) → income: 7000, expenses: 3000, balance: 4000

**TC-BT-UNIT-002** | Phase 8 | Vitest | P2
calculateTotals([]) → income: 0, expenses: 0, balance: 0

**TC-BT-UNIT-003** | Phase 8 | Vitest | P2
isOverdue(yesterday's date) → true

**TC-BT-UNIT-004** | Phase 8 | Vitest | P2
isOverdue(tomorrow's date) → false

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.3.0 | 2026-06-08 | Added TC-AUTH (6 cases), TC-RLS (4 cases), TC-CRUD (7 cases), TC-ERR (3 cases) for Supabase integration |
| v0.2.0 | 2026-06-03 | Added TC-PF-008, TC-PF-009 for Phase 3 new sections |
| v0.1.0 | 2026-06-03 | Initial test cases created |
