# AI Test Cases — LifeOS Portfolio Dashboard

**Version:** v0.1.0
**Date:** 2026-06-08
**Author:** Rory
**Status:** Planning (Phase 16)

---

## Test Strategy

AI features require two test layers:

1. **Unit tests (Vitest):** Test hooks, prompt templates, and service layer with mocked API responses
2. **E2E tests (Playwright):** Test UI integration — button visibility, loading states, error handling. API calls mocked at network level.

No tests call live AI APIs. All tests use deterministic mocked responses.

---

## General AI Test Cases

| ID | Test Case | Type | Feature | Priority |
|---|---|---|---|---|
| TC-AI-001 | AI buttons show "not configured" tooltip when VITE_AI_API_KEY is missing | E2E | All | Must |
| TC-AI-002 | AI buttons are enabled when API key is configured | E2E | All | Must |
| TC-AI-003 | Loading spinner shown during AI API call | E2E | All | Must |
| TC-AI-004 | Error message displayed on API failure (non-technical wording) | E2E | All | Must |
| TC-AI-005 | Dismiss button closes AI result panel without data changes | E2E | All | Must |
| TC-AI-006 | AI service layer correctly selects provider based on VITE_AI_PROVIDER | Unit | Config | Must |

---

## Prompt Improver Test Cases (MVP)

| ID | Test Case | Type | Priority |
|---|---|---|---|
| TC-PI-001 | "Improve" button visible on each prompt card | E2E | Must |
| TC-PI-002 | Clicking "Improve" triggers API call with prompt text | Unit | Must |
| TC-PI-003 | Comparison modal shows original and improved text side by side | E2E | Must |
| TC-PI-004 | "Accept" replaces original prompt with improved version | E2E | Must |
| TC-PI-005 | "Edit" opens improved text in editable field before saving | E2E | Should |
| TC-PI-006 | "Dismiss" closes modal, original prompt unchanged | E2E | Must |
| TC-PI-007 | Prompt template includes original text and instruction for improvement | Unit | Must |
| TC-PI-008 | Character count shown for both original and improved versions | E2E | Nice |
| TC-PI-009 | Empty prompt shows error — does not trigger API call | Unit | Must |

---

## Weekly Task Summary Test Cases

| ID | Test Case | Type | Priority |
|---|---|---|---|
| TC-TS-001 | "Weekly Summary" button visible on dashboard home | E2E | Must |
| TC-TS-002 | Summary includes completed and pending task counts | Unit | Must |
| TC-TS-003 | Summary text displayed in summary panel | E2E | Must |
| TC-TS-004 | Copy-to-clipboard button copies summary text | E2E | Must |
| TC-TS-005 | Empty task list produces "no tasks this week" message without API call | Unit | Must |

---

## Job Application Notes Test Cases

| ID | Test Case | Type | Priority |
|---|---|---|---|
| TC-JN-001 | "Generate Notes" button visible on job application cards | E2E | Must |
| TC-JN-002 | Notes adapt based on application status (different prompts for different statuses) | Unit | Should |
| TC-JN-003 | "Save" writes notes to application record | E2E | Must |
| TC-JN-004 | Notes panel shows generated content with save/dismiss options | E2E | Must |

---

## Cover Letter Test Cases

| ID | Test Case | Type | Priority |
|---|---|---|---|
| TC-CL-001 | "Draft Cover Letter" button visible on job application | E2E | Must |
| TC-CL-002 | Generated letter includes company name and role | Unit | Must |
| TC-CL-003 | Modal editor allows editing before saving | E2E | Must |
| TC-CL-004 | Copy button copies letter to clipboard | E2E | Must |

---

## Budget Summary Test Cases

| ID | Test Case | Type | Priority |
|---|---|---|---|
| TC-BS-001 | "Analyze" button visible on budget page | E2E | Must |
| TC-BS-002 | Privacy notice shown on first use | E2E | Must |
| TC-BS-003 | Only aggregated data sent to API (no individual transactions) | Unit | Must |
| TC-BS-004 | Budget amounts not present in console logs during AI call | Unit | Must |
| TC-BS-005 | Summary shows income, expenses, and net balance | E2E | Must |

---

## Next Steps Suggester Test Cases

| ID | Test Case | Type | Priority |
|---|---|---|---|
| TC-NS-001 | "Suggest Next Steps" button visible on dashboard home | E2E | Must |
| TC-NS-002 | Suggestions displayed as numbered list | E2E | Must |
| TC-NS-003 | "Add as Task" converts suggestion to new task | E2E | Should |
| TC-NS-004 | Works with empty data (no tasks/jobs) — gives generic suggestions | Unit | Must |

---

## Privacy and Security Test Cases

| ID | Test Case | Type | Priority |
|---|---|---|---|
| TC-SEC-001 | API key not present in built JavaScript bundle | Unit | Must |
| TC-SEC-002 | AI-generated HTML content rendered as plain text (no XSS) | Unit | Must |
| TC-SEC-003 | Budget data not logged to console during AI processing | Unit | Must |
| TC-SEC-004 | Error messages do not contain API request/response bodies | Unit | Must |

---

## Standards-Readiness Notes

- **ISO 9001 8.5.1:** All test cases have unique IDs (TC-AI-xxx, TC-PI-xxx, etc.) for traceability.
- **ISO 27001 A.14.2.8:** Security testing included (TC-SEC-001 to TC-SEC-004).
- **DPTM:** Privacy-specific tests (TC-BS-003, TC-BS-004, TC-SEC-003) verify data minimisation.

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.1.0 | 2026-06-08 | Initial AI test cases — 40+ test cases across 6 features + security |
