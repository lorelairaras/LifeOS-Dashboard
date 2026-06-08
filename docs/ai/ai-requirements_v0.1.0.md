# AI Requirements — LifeOS Portfolio Dashboard

**Version:** v0.1.0
**Date:** 2026-06-08
**Author:** Rory
**Status:** Planning (Phase 16)

---

## Functional Requirements

### General AI Requirements

| ID | Requirement | Priority | Status |
|---|---|---|---|
| AI-FR-001 | All AI features must be explicitly triggered by the user (no auto-running AI) | Must | Planning |
| AI-FR-002 | AI-generated content must be displayed for review before any data modification | Must | Planning |
| AI-FR-003 | User must be able to dismiss any AI suggestion without side effects | Must | Planning |
| AI-FR-004 | AI features must work with or without Supabase (local-state compatible) | Must | Planning |
| AI-FR-005 | AI features must degrade gracefully when API key is not configured | Must | Planning |
| AI-FR-006 | Loading state must be shown during AI API calls | Must | Planning |
| AI-FR-007 | Error messages must be user-friendly (no raw API errors exposed) | Must | Planning |
| AI-FR-008 | AI response time should be under 10 seconds for single-item operations | Should | Planning |

### Prompt Improver Requirements (MVP)

| ID | Requirement | Priority | Status |
|---|---|---|---|
| AI-PI-001 | User can select any prompt from the Prompt Library and trigger "Improve" | Must | Planning |
| AI-PI-002 | Improved prompt displayed alongside original for comparison | Must | Planning |
| AI-PI-003 | User can Accept (replace), Edit (modify before saving), or Dismiss | Must | Planning |
| AI-PI-004 | Improvement preserves the intent and context of the original prompt | Must | Planning |
| AI-PI-005 | Button disabled with tooltip when API key not configured | Should | Planning |
| AI-PI-006 | Character count shown for original and improved versions | Nice | Planning |

### Weekly Task Summary Requirements

| ID | Requirement | Priority | Status |
|---|---|---|---|
| AI-TS-001 | Summary covers tasks from the current Monday-Sunday week | Must | Planning |
| AI-TS-002 | Summary includes completed count, pending count, overdue count | Must | Planning |
| AI-TS-003 | Summary suggests top 3 priorities for remaining week | Should | Planning |
| AI-TS-004 | Copy-to-clipboard button for the summary | Must | Planning |

### Job Application Notes Requirements

| ID | Requirement | Priority | Status |
|---|---|---|---|
| AI-JN-001 | Notes generated based on company, role, and current status | Must | Planning |
| AI-JN-002 | Notes adapt to application status (e.g., interview prep vs. follow-up) | Should | Planning |
| AI-JN-003 | Generated notes saved to the application's notes field on user confirmation | Must | Planning |

### Cover Letter Requirements

| ID | Requirement | Priority | Status |
|---|---|---|---|
| AI-CL-001 | Draft uses job details (company, role, description) as input | Must | Planning |
| AI-CL-002 | Draft incorporates user's skills from portfolio section | Should | Planning |
| AI-CL-003 | Output in a modal editor with copy and save options | Must | Planning |

### Budget Summary Requirements

| ID | Requirement | Priority | Status |
|---|---|---|---|
| AI-BS-001 | Summary covers a user-selected date range (default: current month) | Must | Planning |
| AI-BS-002 | Summary includes total income, total expenses, net balance | Must | Planning |
| AI-BS-003 | Summary identifies top 3 spending categories | Should | Planning |
| AI-BS-004 | No budget amounts included in API request logs or error messages | Must | Planning |

### Next Steps Suggester Requirements

| ID | Requirement | Priority | Status |
|---|---|---|---|
| AI-NS-001 | Analyzes active tasks, open applications, and project status | Must | Planning |
| AI-NS-002 | Produces 3-5 actionable suggestions | Must | Planning |
| AI-NS-003 | Each suggestion can be converted to a new task with one click | Should | Planning |

---

## Non-Functional Requirements

| ID | Requirement | Category | Priority |
|---|---|---|---|
| AI-NFR-001 | API keys stored in environment variables only, never in source code | Security | Must |
| AI-NFR-002 | API calls made from client-side only (no custom backend required for MVP) | Architecture | Must |
| AI-NFR-003 | AI provider must have a free tier sufficient for development and light usage | Cost | Must |
| AI-NFR-004 | AI responses cached in session to avoid duplicate API calls for same input | Performance | Should |
| AI-NFR-005 | All AI UI components follow existing Tailwind design system | Consistency | Must |
| AI-NFR-006 | AI features must not block or slow down non-AI dashboard functionality | Performance | Must |
| AI-NFR-007 | Sensitive data (budget amounts, personal notes) must not be logged by AI provider | Privacy | Must |

---

## Standards-Readiness Notes

- **ISO 27001 A.13.2.1 (Information transfer):** All AI API calls transfer user data to external services. Privacy impact must be documented per feature.
- **ISO 27001 A.9.4.2 (Secure log-on):** API keys managed via environment variables, not hardcoded.
- **DPTM (Data minimisation):** Only the minimum required data sent to AI APIs. Budget data handling requires extra care (AI-BS-004).
- **SOC 2 (CC6.6 Logical access):** AI features gated behind feature flags when API key not present.
- **ISO 9001 (8.2.2 Determination of requirements):** All requirements have unique IDs and traceability.

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.1.0 | 2026-06-08 | Initial AI requirements — 6 feature areas, 30+ requirements defined |
