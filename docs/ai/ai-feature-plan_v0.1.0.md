# AI Feature Plan — LifeOS Portfolio Dashboard

**Version:** v0.1.0
**Date:** 2026-06-08
**Author:** Rory
**Status:** Planning (Phase 16)
**Phase:** 16 — AI Assistant Planning

---

## Overview

The AI assistant layer adds intelligent features to the private dashboard. All AI features operate on the user's existing data (tasks, prompts, jobs, budget) and provide suggestions, summaries, and generated text. No AI feature modifies data without explicit user confirmation.

---

## Planned AI Features

### AI-FP-001: Prompt Improver

**Description:** Takes an existing prompt from the Prompt Library and suggests an improved version with better structure, clarity, and specificity.

**Input:** Selected prompt text from the Prompt Library
**Output:** Improved prompt text displayed in a comparison view
**User action:** Accept (replaces original), Edit (opens in editor), or Dismiss

**Priority:** High — directly enhances the core Prompt Library feature

---

### AI-FP-002: Weekly Task Summary

**Description:** Generates a natural-language summary of the user's completed and pending tasks for the current week.

**Input:** All tasks from the current week (auto-selected by date range)
**Output:** 3-5 sentence summary with completed count, pending count, and suggested priorities
**User action:** Copy to clipboard, or Dismiss

**Priority:** High — provides immediate value for weekly reviews

---

### AI-FP-003: Job Application Notes Generator

**Description:** Given a job application's company name, role, and status, generates contextual notes: interview prep points, follow-up email drafts, or status-specific suggestions.

**Input:** Selected job application record
**Output:** Generated notes displayed in a side panel
**User action:** Save to application notes field, Edit, or Dismiss

**Priority:** Medium — valuable but requires well-structured job data

---

### AI-FP-004: Cover Letter Drafter

**Description:** Generates a draft cover letter based on job details (company, role, description) and the user's portfolio/skills data.

**Input:** Job application record + user's skills from portfolio
**Output:** Draft cover letter in a modal editor
**User action:** Copy, Edit, Save as note, or Dismiss

**Priority:** Medium — high value per use but lower frequency

---

### AI-FP-005: Budget Summary Analyzer

**Description:** Analyzes budget entries for a selected period and provides a natural-language summary: total income, total expenses, net balance, top spending categories, and trends.

**Input:** Budget entries filtered by date range (default: current month)
**Output:** Summary text with key metrics highlighted
**User action:** Copy, or Dismiss

**Priority:** Medium — useful for monthly reviews

**Privacy note:** Budget data is sensitive personal financial information. AI processing must happen client-side or through a privacy-preserving API pattern. No budget data should be logged or stored by the AI provider.

---

### AI-FP-006: Next Steps Suggester

**Description:** Analyzes the user's current tasks, job applications, and project status to suggest 3-5 actionable next steps.

**Input:** Active tasks, open job applications, project statuses
**Output:** Numbered list of suggestions with brief rationale
**User action:** Convert any suggestion to a new task, or Dismiss

**Priority:** Low — depends on all other features being well-populated

---

## Implementation Approach

### MVP AI Feature (Phase 17)

Start with **AI-FP-001: Prompt Improver** — it is:
- Self-contained (operates on a single prompt)
- Low-risk (user explicitly triggers it, must confirm changes)
- Demonstrates the AI integration pattern for all other features
- Tests the full pipeline: UI trigger > API call > response display > user action

### AI Provider Strategy

**Primary:** OpenAI API (GPT-4o-mini or GPT-4o)
- Free tier: $5 credit for new accounts, then pay-per-use
- Alternative: Use a local model via Ollama (completely free, no API key needed)

**Fallback:** Anthropic Claude API
- Free tier: Limited but available

**Decision required:** Which provider to use. Document in `docs/decisions/human-decisions.md`.

**Standards followed:**
- OWASP API Security Top 10 — API key management
- ISO 27001 A.13.2.1 — Information transfer policies (API calls to external AI services)

---

## Free Tier Verification

| Tool/Service | Free Tier | Sufficient for MVP? | Notes |
|---|---|---|---|
| OpenAI API (GPT-4o-mini) | $5 initial credit | Yes | ~500K tokens at $0.01/1K |
| Ollama (local) | Completely free | Yes | Requires local install, no API key |
| Anthropic API | Limited free tier | Possibly | Rate-limited |
| Hugging Face Inference | Free tier available | Yes | Open models, rate-limited |

---

## Documents to Generate Automatically vs. Requiring Human Approval

| Document | Auto-generate? | Standard Reference |
|---|---|---|
| AI architecture diagram | Yes | ISO 27001 A.14.2.5 |
| API integration pattern | Yes | OWASP API Security |
| Privacy impact notes | Yes (draft), needs human review | DPTM, ISO 27001 A.18.1.4 |
| AI provider selection | No — requires human decision | ISO 9001 7.1.2 |
| Test cases for AI features | Yes | ISO 9001 8.5.1 |
| Prompt templates | Yes | N/A |

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.1.0 | 2026-06-08 | Initial AI feature plan — 6 features defined, MVP selection made |
