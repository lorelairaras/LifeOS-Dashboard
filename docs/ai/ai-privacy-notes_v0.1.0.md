# AI Privacy Notes — LifeOS Portfolio Dashboard

**Version:** v0.1.0
**Date:** 2026-06-08
**Author:** Rory
**Status:** Planning (Phase 16)

---

## Purpose

This document records privacy considerations for AI features in the LifeOS dashboard. It supplements `docs/security/privacy-and-data-notes_v0.2.0.md` with AI-specific concerns.

---

## Data Classification for AI Features

| Feature | Data Type | Classification | Risk Level |
|---|---|---|---|
| Prompt Improver | User-authored prompts | Internal | Low |
| Weekly Task Summary | Task titles, dates, completion status | Internal | Low |
| Job Application Notes | Company names, role titles, application status | Confidential | Medium |
| Cover Letter Drafter | Company, role, user skills/experience | Confidential | Medium |
| Budget Summary | Financial amounts, categories, dates | Highly Confidential | High |
| Next Steps Suggester | Aggregated task/job/project status | Internal | Low |

---

## Privacy Principles

### 1. User Control (Consent)

- AI features are opt-in. No AI processing without explicit user action (button click).
- First use of any AI feature shows a one-time notice explaining what data will be sent.
- User can disable AI features entirely by not setting `VITE_AI_API_KEY`.

### 2. Data Minimisation

- Send only the minimum data required for each AI feature.
- Never send user IDs, email addresses, or authentication tokens to AI APIs.
- Budget data: send aggregated totals and category names only — never individual transaction details, merchant names, or account numbers.
- Task data: send titles and dates only — never task descriptions containing personal notes.

### 3. No Persistent Storage by AI Provider

- API calls use the completion endpoint (not assistants/threads that retain conversation history).
- No training data opt-in. Use API providers that do not use API data for training (OpenAI API, Anthropic API both have this policy as of 2025).

### 4. No Logging of Sensitive Data

- Budget amounts must not appear in `console.log`, `console.error`, or error reporting.
- API request bodies containing financial data must not be logged.
- Error messages must be generic — no request/response payloads in user-facing errors.

---

## API Key Security

| Concern | Mitigation |
|---|---|
| Key in source code | Never committed. Stored in `.env.local` (gitignored). |
| Key in browser DevTools | Accepted risk for MVP. Post-MVP: proxy via Vercel/Supabase Edge Function. |
| Key rotation | User can change key in `.env.local` and restart dev server. |
| Key scope | Use least-privilege API key (no admin/org access). |

---

## Provider-Specific Privacy Policies

| Provider | Data Retention | Training Use | Policy URL |
|---|---|---|---|
| OpenAI API | 30 days (abuse monitoring) | Not used for training | openai.com/policies |
| Anthropic API | 30 days (safety monitoring) | Not used for training | anthropic.com/privacy |
| Ollama (local) | No data leaves device | N/A | Fully local |

**Recommendation:** For maximum privacy, use Ollama with a local model. For convenience, OpenAI or Anthropic APIs are acceptable given their data policies.

---

## Privacy Impact per Feature

### Prompt Improver — Low Risk
- Sends: prompt text (typically 50-500 words of generic instructions)
- Does not contain: personal data, financial data, credentials
- Acceptable for external API processing

### Weekly Task Summary — Low Risk
- Sends: task titles and dates
- Risk: task titles may contain personal references (e.g., "Call dentist")
- Mitigation: user explicitly triggers, aware of what is sent

### Job Application Notes — Medium Risk
- Sends: company name, role title, application status
- Risk: reveals job search activity
- Mitigation: user explicitly triggers per-application

### Cover Letter — Medium Risk
- Sends: company, role, user's skills/experience
- Risk: combines professional details with target company
- Mitigation: skills are already public on portfolio page

### Budget Summary — High Risk
- Sends: aggregated financial data (totals, categories)
- Risk: financial information is highly personal
- Mitigation: aggregate before sending, strip transaction details, privacy notice on first use
- **Requirement:** AI-BS-004 — no amounts in logs or error messages

### Next Steps Suggester — Low Risk
- Sends: status counts and titles (not descriptions)
- Mitigation: aggregated data only

---

## Compliance Mapping

| Requirement | Standard | Status |
|---|---|---|
| User consent before AI processing | DPTM | Planned (first-use notice) |
| Data minimisation in API calls | DPTM, ISO 27001 A.18.1.4 | Planned (per-feature data limits) |
| API key not in source code | ISO 27001 A.9.4.2 | Planned (.env.local pattern) |
| No sensitive data in logs | SOC 2 CC6.1, DPTM | Planned (budget data protection) |
| External transfer documentation | ISO 27001 A.13.2.1 | This document |
| Data processing records | DPTM | This document |

---

## Recommendations for Human Review

The following items require human decision before AI implementation:

1. **AI provider selection** — which provider to use (impacts data residency)
2. **Budget AI feature** — whether to include budget data in AI analysis at all
3. **Local-only option** — whether to mandate Ollama for sensitive data features
4. **Privacy notice wording** — exact text shown to users on first AI use

Document decisions in `docs/decisions/human-decisions.md`.

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.1.0 | 2026-06-08 | Initial AI privacy notes — data classification, per-feature impact, compliance mapping |
