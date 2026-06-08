# Feature Spec: Prompt Library

**Version:** v0.1.0
**Date:** 2026-06-03
**Author:** Rory
**Status:** Draft

---

## Purpose

The prompt library is a personal database of reusable AI prompts — for writing code, documenting features, planning products, preparing for interviews, and running daily work. Instead of rewriting or hunting through chat history, every valuable prompt is saved, categorised, and one click away.

## Scope

**In scope (MVP):** Create, read, edit, delete prompts. Category filter. Copy-to-clipboard with feedback. Tags. Use case field. Local state only.

**Out of scope (MVP):** Prompt versioning, prompt rating/favourites, sharing prompts publicly, search by text, AI-assisted prompt improvement, import/export.

---

## User Stories

| Story ID | Persona | User Story | Business Value | Priority | Status |
|---|---|---|---|---|---|
| US-PL-001 | Rory | As Rory, I want to save a reusable prompt with a title, category, and body, so I never rewrite the same prompt twice. | Reduces repetitive work | P1 | Planned |
| US-PL-002 | Rory | As Rory, I want to copy a prompt to my clipboard in one click, so I can paste it immediately into a chat interface. | Minimises workflow friction | P1 | Planned |
| US-PL-003 | Rory | As Rory, I want to filter my prompts by category, so I can find the right type of prompt quickly. | Reduces time to find a prompt | P1 | Planned |
| US-PL-004 | Rory | As Rory, I want to tag prompts with keywords, so I can describe them more precisely than a category alone allows. | Finer-grained organisation | P2 | Planned |
| US-PL-005 | Rory | As Rory, I want to edit a saved prompt when I find a better version, so my library always reflects my best current workflow. | Library stays valuable over time | P1 | Planned |
| US-PL-006 | Rory | As Rory, I want to see when a prompt was last used, so I know which prompts I rely on most. | Usage awareness | P2 | Planned |

---

## Functional Requirements

| Requirement ID | Requirement | Priority | MVP / Future | Notes |
|---|---|---|---|---|
| PROMPT-MVP-001 | The user can create a prompt with title and body as required fields | P1 | MVP | — |
| PROMPT-MVP-002 | Optional fields: category, use case, tags | P1 | MVP | Category defaults to "Other" |
| PROMPT-MVP-003 | The prompt list shows title, category badge, tags, and copy button on each card | P1 | MVP | — |
| PROMPT-MVP-004 | Each prompt card has a "Copy" button that copies the body to the clipboard | P1 | MVP | — |
| PROMPT-MVP-005 | The copy button must show "Copied!" feedback for at least 1.5 seconds | P1 | MVP | Visual confirmation |
| PROMPT-MVP-006 | Copying a prompt must update its `lastUsedAt` timestamp | P2 | MVP | For recency display |
| PROMPT-MVP-007 | The user can filter by category; "All" is the default | P1 | MVP | — |
| PROMPT-MVP-008 | Supported categories: Frontend Development, QA Testing, Documentation, Business Analysis, Product Planning, Resume & Cover Letter, Daily Planning, Other | P1 | MVP | — |
| PROMPT-MVP-009 | The user can edit all fields of an existing prompt | P1 | MVP | Via modal |
| PROMPT-MVP-010 | The user can delete a prompt with a confirmation step | P1 | MVP | — |
| PROMPT-MVP-011 | Empty state shown when no prompts exist | P1 | MVP | — |
| PROMPT-FUTURE-001 | Search prompts by title, body, or tag text | — | Future | — |
| PROMPT-FUTURE-002 | Star / favourite prompts | — | Future | — |
| PROMPT-FUTURE-003 | AI-assisted prompt improvement | — | Future | Requires AI API approval |

---

## Acceptance Criteria

| AC ID | Scenario | Given | When | Then | Status |
|---|---|---|---|---|---|
| AC-PL-001 | Empty state | No prompts exist | I open the prompt library | Empty state message and "Add Prompt" button are visible | Not tested |
| AC-PL-002 | Create prompt | I click "Add Prompt", fill title and body, submit | Form closes | Prompt card appears in the library | Not tested |
| AC-PL-003 | Category filter | I have prompts in different categories, select "QA Testing" | Filter applies | Only QA Testing prompts are shown | Not tested |
| AC-PL-004 | "All" filter resets | I select a category filter, then select "All" | Filter applies | All prompts are shown | Not tested |
| AC-PL-005 | Copy button works | I click "Copy" on a prompt | — | "Copied!" appears on the button for at least 1.5 seconds | Not tested |
| AC-PL-006 | Clipboard content correct | I click "Copy" on a prompt | — | Pasting elsewhere produces the exact prompt body | Not tested |
| AC-PL-007 | Edit pre-fills form | I click "Edit" on a prompt | Modal opens | All current values are shown in the form fields | Not tested |
| AC-PL-008 | Delete with confirmation | I click "Delete" on a prompt and confirm | — | Prompt is removed from the library | Not tested |
| AC-PL-009 | Mobile layout | I open prompt library on 390px viewport | — | Prompt cards render correctly; copy button is accessible | Not tested |

---

## UI / UX Notes

**Layout:** Card grid (2 columns on desktop, 1 column on mobile). Category filter pills at the top. "Add Prompt" button in page header.

**PromptCard:** Title (bold), category badge (colour-coded), tags as small chips, "Copy" button (top right), brief body preview (3 lines truncated), "Edit" and "Delete" icon buttons.

**Copy feedback:** Button text changes from "Copy" to "Copied! ✓" for 1.5 seconds, then reverts. Button stays accessible during feedback state.

**Form modal:** Fields: Title, Category (select), Use Case (text), Prompt Body (large textarea — monospace font), Tags (comma-separated text input or tag chips).

**Category colour map:**
- Frontend Development → blue
- QA Testing → purple
- Documentation → teal
- Business Analysis → amber
- Product Planning → indigo
- Resume & Cover Letter → green
- Daily Planning → orange
- Other → grey

---

## Data Model

See `docs/architecture/data-model_v0.2.0.md` — `Prompt` interface and `PromptCategory` enum.

Key fields: `id`, `title`, `body`, `category`, `useCase`, `tags`, `lastUsedAt`, `createdAt`, `updatedAt`.

---

## QA Test Cases

| Test ID | Test Case | Steps | Expected Result | Status |
|---|---|---|---|---|
| TC-PL-001 | Empty state | Navigate to `/dashboard/prompts` with no prompts | Empty state and "Add Prompt" button visible | Not run |
| TC-PL-002 | Create prompt | Click "Add Prompt", enter title and body, submit | Prompt card appears in library | Not run |
| TC-PL-003 | Copy button feedback | Click "Copy" on any prompt card | Button text shows "Copied!" for ≥1.5 seconds | Not run |
| TC-PL-004 | Category filter | Add prompts in 2+ categories; select one category | Only matching prompts shown | Not run |
| TC-PL-005 | "All" filter | Select a category, then select "All" | All prompts shown | Not run |
| TC-PL-006 | Edit form pre-fills | Click "Edit" on a prompt | All current values in form fields | Not run |
| TC-PL-007 | Delete — confirm | Click Delete, confirm | Prompt removed | Not run |
| TC-PL-008 | Tags displayed | Create prompt with tags "react, typescript" | Both tags shown as chips on card | Not run |
| TC-PL-009 | Mobile 390px | Open at 390px | Cards render; copy button tappable | Not run |

---

## Future Improvements

- Full-text search across title, body, and tags
- Favourite / star prompts
- Prompt version history (track how a prompt evolved)
- AI-assisted prompt improvement (post-MVP, requires API)
- Export prompts as JSON or Markdown
- Import prompts from a shared library

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.1.0 | 2026-06-03 | Initial prompt library feature spec created |
