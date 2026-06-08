# Test Cases — LifeOS Portfolio Dashboard

**Version:** v0.2.0
**Date:** 2026-06-03
**Author:** Rory
**Status:** Draft
**Supersedes:** test-cases_v0.1.0.md

---

## Changes in v0.2.0

Added TC-PF-008 and TC-PF-009 for new Phase 3 sections.

---

## Public Portfolio Test Cases

**TC-PF-001** | Phase 1 | Playwright | P1
Given: app is running | When: navigate to `/` | Then: page loads, title contains "Rory" | Status: Not run

**TC-PF-002** | Phase 1 | Playwright | P1
Given: homepage | When: page loads | Then: `#hero` section visible, h1 contains "Rory" | Status: Not run

**TC-PF-003** | Phase 1 | Playwright | P1
Given: homepage | When: page loads | Then: nav with aria-label "Main navigation" has links: About, Skills, Projects, Case Studies, Resume, Contact | Status: Not run

**TC-PF-004** | Phase 1 | Playwright | P1
Given: hero section | When: visible | Then: "View Projects" and "Get in Touch" CTA links present | Status: Not run

**TC-PF-005** | Phase 1 | Playwright | P2
Given: page top | When: Tab once | Then: skip link receives focus | Status: Not run

**TC-PF-006** | Phase 1 | Playwright | P2
Given: any external links (`target="_blank"`) | When: inspect rel attr | Then: all contain "noopener" | Status: Not run

**TC-PF-007** | Phase 1 | Playwright | P2
Given: `#skills` section | When: visible | Then: at least 6 `<li>` elements | Status: Not run

**TC-PF-008** | Phase 3 | Playwright | P2 ✅ NEW
Given: `#case-studies` section | When: visible | Then: at least 1 `<article>` element | Status: Not run

**TC-PF-009** | Phase 3 | Playwright | P2 ✅ NEW
Given: `#resume` section | When: visible | Then: at least 1 `<li>` in timeline | Status: Not run

**TC-PF-010** | Phase 1 | Manual | P2
Given: 390px viewport | When: scroll all sections | Then: no horizontal overflow | Status: Not run

**TC-PF-011** | Phase 1 | Manual | P2
Given: 320px viewport | When: scroll all sections | Then: no horizontal overflow | Status: Not run

**TC-PF-012** | Phase 1 | Playwright | P2
Given: 390px viewport | When: click hamburger | Then: mobile nav opens, all links visible | Status: Not run

---

## Dashboard Test Cases

(See test-cases_v0.1.0.md for TC-DB-001 through TC-DB-005 and TC-TK-001 through TC-BT-007)

All dashboard test cases remain unchanged. Dashboard CRUD tests will be added in Phases 4–8.

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
| v0.2.0 | 2026-06-03 | Added TC-PF-008, TC-PF-009 for Phase 3 new sections |
| v0.1.0 | 2026-06-03 | Initial test cases created |
