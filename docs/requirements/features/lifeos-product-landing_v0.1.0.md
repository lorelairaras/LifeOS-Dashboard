# LifeOS Product Landing & Services — Functional Specification

**Version:** v0.1.0
**Date:** 2026-06-13
**Author:** Rory
**Status:** DRAFT
**Supersedes:** none (new document)
**Related:** `features/portfolio_v0.1.0.md`, `docs/uiux/design-system_v0.1.0.md`, `docs/product/product-vision_v0.2.0.md`

> Purpose of this document: define the reframe of the public page from a personal
> portfolio into a **product landing page for LifeOS** (what it does, who it is for,
> how it helps), plus a **Services** offering. Written to Senior Business Systems
> Analyst standard so QA test cases can be derived directly from the scenarios.

---

## 1. Product Overview

| Section | Details |
|---|---|
| Target date | 2026-06-13 |
| Document status | DRAFT |
| Team members | Product/BSA: Rory · Developer: Rory (AI-assisted) · QA: Independent review agent |
| Quick links | Repo: github.com/lorelairaras/LifeOS-Dashboard · Live: TBD (Vercel) · Docs: `docs/` |

---

## 2. Overview

The public page at `/` is currently a personal **portfolio** (Hero → About → Skills → Projects → Case Studies → Resume → Contact). This specification reframes it as a **product landing page** whose subject is the LifeOS application itself — a *personal operating system* that combines a public showcase with a private productivity dashboard.

LifeOS (the **product**) is a single React application that unifies seven daily-use modules — Ritual Tasks, Prompt Grimoire, Career Pipeline, Budget Pulse, Project Reliquary, Habit Rituals, and Knowledge Vault — behind one themed interface ("Rose Obsidian"). The landing page must answer three visitor questions in order: **what it is**, **what it does**, and **how it helps**.

A secondary purpose is introduced: a **Services** section presenting the work Rory offers (web development, system development, graphic design, UI/UX, virtual assistance, plus new **Chatbots/AI**, **Business Systems Analysis**, and **Automation & Integrations**). LifeOS itself becomes the flagship proof-of-work referenced from Services.

The personal/resume framing is demoted, not deleted: a condensed "About / who built this" remains so the page still functions as a credibility signal and contact point.

---

## 3. Objective

This document defines how the public page:

- presents LifeOS as a product (value proposition, capabilities, module tour)
- explains how LifeOS helps a specific target user (the "who" and the "why")
- offers a defined set of services with benefit-led descriptions
- routes visitors to two primary actions: **try the dashboard demo** and **start a conversation** (contact)
- preserves accessibility, responsiveness, and the existing Rose Obsidian visual system
- keeps all demo data clearly fictional and free of real private information

This document serves as:

- reference for Product and Engineering implementation
- baseline for QA test cases (unit + Playwright E2E)
- source for standards-readiness validation (ISO 9001 / ISO 27001 / DPTM / SOC 2)

---

## 4. Success Metrics

| Goal | Metric |
|---|---|
| Message clarity | A first-time visitor can state what LifeOS is and who it is for within the hero + first scroll |
| Action conversion | Two primary CTAs ("Enter Dashboard", "Get in Touch") visible above the fold and reachable on mobile |
| Service legibility | All 8 services render with a one-line benefit + 3 capability points each |
| No regressions | Existing dashboard routes, auth flow, and demo data behave exactly as before |
| Quality gates | Lint = 0 warnings, typecheck = 0 errors, unit tests pass, production build succeeds |

---

## 5. Target Users

### Primary Users

| User Type | Description |
|---|---|
| Prospective client / recruiter | Lands on `/`, evaluates whether LifeOS (and its author) demonstrates the skill and rigor they need before contacting. |
| Curious peer / developer | Wants to see what LifeOS does and how it is built; may open the live dashboard demo and the source repo. |

### Secondary Users

| User Type | Description |
|---|---|
| Returning owner (Rory) | Uses the page as the front door to the private dashboard at `/dashboard`. |

Service names and scopes are not fixed; they can be edited in one data module (`servicesData.ts`) without touching layout code. See Section 15.

---

## 6. Scope

| Capability | Description |
|---|---|
| Product hero | Reframed hero that names the product, states the one-line value proposition, and exposes two CTAs. |
| What it does | A capabilities/module tour describing the seven LifeOS modules in product language. |
| How it helps | A benefits block translating features into outcomes for the target user. |
| Services | A new section listing 8 services, each with a benefit line and capability points. |
| Flagship proof | LifeOS retained as the lead case study, linked from Services. |
| Contact | Existing contact retained as the conversion endpoint. |

### Functional Scope Summary

**Landing (product)**
- Product-framed hero with value proposition and dual CTA
- "What LifeOS does" module tour (7 modules)
- "How it helps" outcomes block
- Condensed "Who built this" credibility note

**Services**
- 8 services rendered from a single typed data source
- Each service: title, benefit line, 3–4 capability points, icon
- Free-tier-aware scoping note for Chatbots/AI and Automation

**Out of scope (this version)**
- Live chatbot widget on the page (described as a service, not shipped on the landing)
- Backend contact form submission (contact remains mailto/links)
- Pricing tables

---

## 7. Domain Model (page composition)

- **Landing sections** (public, route `/`): Hero, WhatItDoes, HowItHelps, Services, CaseStudy (LifeOS), About (condensed), Contact
- **Service** (data entity): id, title, benefit, capabilities[], icon, tag
- **Module** (data entity, describes LifeOS itself): id, name, summary, route, icon
- Domain diagram: TBD

---

## 8. User Flow

Land on `/` → Read product hero (what + value) → Scroll: What it does (modules) → How it helps (outcomes) → Services → LifeOS case study → Contact → Action: Enter Dashboard demo OR Get in touch

---

## 9. Features and Functional Behaviour

The public page renders a product-led narrative using static, typed data modules and the existing Rose Obsidian component system.

- displays a product hero that names "LifeOS", states a one-line value proposition, and shows two CTAs ("Enter Dashboard", "Get in Touch")
- renders a "What it does" section listing the seven modules, each with a name, one-line summary, and icon, sourced from a typed `modules` array
- renders a "How it helps" section mapping capabilities to visitor outcomes
- renders a "Services" section from a typed `services` array; adding or editing a service requires only a data change, not a layout change
- marks the Chatbots/AI and Automation services with a free-tier scoping note so expectations are set honestly
- retains the LifeOS case study as the flagship reference and links to it from Services
- preserves the existing route map: `/` (public), `/dashboard/*` (protected), `/login`, `/signup`
- keeps all demo data attributed to the fictional persona "Lyra M." (hard rule — no real private data on the public demo)
- applies all interactive states (hover, focus-visible) and respects `prefers-reduced-motion` via the existing `Card3D` behaviour

The page does not embed a live chatbot, does not submit a server-side form, and does not display pricing in this version.

---

## 10. Module Structure / Sections

The landing page has the following sections, in order:

| Section | Purpose |
|---|---|
| Hero (product) | States what LifeOS is, the value proposition, and the two primary actions. |
| What it does | Lets the visitor understand the seven modules at a glance. |
| How it helps | Translates features into outcomes for the target user. |
| Services | Lets the visitor see what Rory offers and start a conversation. |
| Case study (LifeOS) | Provides depth/proof for the flagship product. |
| About (condensed) | Establishes who built it (credibility). |
| Contact | Conversion endpoint (email, GitHub, LinkedIn). |

Note: the private dashboard modules referenced in "What it does" continue to live under `/dashboard/*`; the landing section only *describes* them and links to the demo.

---

## 11. System Constraints and Business Rules

**Content rules**
- The hero must name the product ("LifeOS") and state a value proposition in one sentence.
- Every service must have a benefit line and at least three capability points.

**Data rules**
- Services and modules must come from typed data modules; no hardcoded service copy inside JSX layout.
- All demo/mock data must remain attributed to the fictional persona and contain no real personal data.

**Quality rules**
- TypeScript strict mode: no new `any` without an explanatory comment.
- Lint must pass with zero warnings; typecheck and production build must succeed before "done".
- No direct commits to `main`; changes land on a feature branch via PR.

**Accessibility rules**
- Each section has a labelled heading and landmark.
- Interactive elements expose `:focus-visible`; motion respects `prefers-reduced-motion`.

---

## 12. Standards-Readiness Check (built-in, not retrofitted)

| Standard | Relevant control | Readiness for this change | Action baked in |
|---|---|---|---|
| ISO 9001 (quality) | Documented, repeatable process; versioned artefacts | Strong | Versioned spec + changelog; QA gates defined before build |
| ISO 27001 (infosec) | A.8 data handling; no sensitive data exposure | Strong | Hard rule: public demo uses fictional persona only; no PII, no secrets in client bundle |
| DPTM (PDPA, data protection) | Lawful, minimal personal data | Watch | Contact uses mailto/links only; no form storage; if a contact form is added later it needs a consent + retention note (flagged) |
| SOC 2 (security/availability) | Change management, traceability | Strong | Feature branch + PR + QA log provide change trail; deploy via Vercel pipeline |

Rework flags for future versions: a real contact form, a live chatbot, or any analytics that sets cookies would introduce DPTM/SOC 2 obligations (consent banner, privacy notice update, data-retention statement). Build those in from the first draft of that feature, not at audit time.

---

## 13. Edge Cases and Observations

- LinkedIn URL and live demo URL are placeholders (`[YOUR_USERNAME]`, `#`) — confirmed gaps to fill before launch.
- No analytics/consent mechanism exists; required only if tracking is added later.
- The page is a SPA served with a catch-all rewrite; deep links rely on `vercel.json` rewrites (present) and the GitHub Pages SPA fallback.
- Chatbot service is described but not shipped on the page; scoping note prevents over-promising.

---

## 14. Future Enhancements

| Feature | Description |
|---|---|
| Live demo chatbot | An embedded FAQ/RAG chatbot on the landing as a working sample of the Chatbots/AI service. |
| Server-backed contact form | A form with spam protection and a privacy/retention notice (triggers DPTM controls). |
| Service detail pages | Per-service pages with case examples and a scoped intake questionnaire. |

---

## 15. Requirements (detailed)

### 1. Product-Led Hero

The hero's subject changes from "Hi, I'm Rory" (person) to "LifeOS" (product). Rory is credited as the builder, not the headline.

| Requirement | Details |
|---|---|
| User Story | As a prospective client, I want the first screen to tell me what LifeOS is and what it does, so that I can decide in seconds whether it is relevant to me. |
| Positive Scenarios | Scenario: Hero communicates the product<br>Given a first-time visitor lands on `/`<br>When the hero renders<br>Then the product name "LifeOS", a one-line value proposition, and two CTAs ("Enter Dashboard", "Get in Touch") are visible<br><br>Scenario: CTA navigation<br>Given the hero is visible<br>When the visitor activates "Enter Dashboard"<br>Then the app navigates to the dashboard demo route |
| Negative Scenarios | Scenario: Reduced motion<br>Given a visitor with `prefers-reduced-motion: reduce`<br>When interactive cards are present<br>Then no 3D tilt transform is applied<br><br>Scenario: Narrow viewport<br>Given a 320px-wide screen<br>When the hero renders<br>Then both CTAs remain visible and tappable without horizontal scroll |

### 2. "What It Does" Module Tour

| Requirement | Details |
|---|---|
| User Story | As a curious visitor, I want to see what the product actually contains, so that I understand its scope before trying it. |
| Positive Scenarios | Scenario: Modules listed<br>Given the landing page renders<br>When the "What it does" section is reached<br>Then all seven modules appear, each with a name and one-line summary<br><br>Scenario: Data-driven<br>Given a module is added to the `modules` data array<br>When the page re-renders<br>Then the new module appears without layout-code changes |
| Negative Scenarios | Scenario: Empty data guard<br>Given the `modules` array is empty<br>When the section renders<br>Then the section degrades gracefully (heading present, no crash)<br><br>Scenario: Missing icon<br>Given a module without an icon<br>When it renders<br>Then a default icon or no icon is shown without error |

### 3. Services Section

| Requirement | Details |
|---|---|
| User Story | As a potential client, I want to see the services offered with clear benefits, so that I can tell whether my need is covered and start a conversation. |
| Positive Scenarios | Scenario: All services render<br>Given the page renders<br>When the Services section is reached<br>Then all eight services display with a title, benefit line, and at least three capability points<br><br>Scenario: Contact handoff<br>Given the Services section is visible<br>When the visitor activates a service's contact action<br>Then the page scrolls/links to the Contact section |
| Negative Scenarios | Scenario: Over-promise guard<br>Given the Chatbots/AI or Automation service<br>When it renders<br>Then a free-tier/scoping note is shown so capabilities are not overstated<br><br>Scenario: Long content<br>Given a service with a long benefit line<br>When it renders on mobile<br>Then text wraps within the card without overflow |

---

## 16. Version History

| Version | Date | Author | Notes |
|---|---|---|---|
| v0.1.0 | 2026-06-13 | Rory | Initial documentation: reframed public page from personal portfolio to LifeOS product landing; defined Services (existing 5 improved + Chatbots/AI, BSA, Automation); added standards-readiness check and QA-derivable scenarios. |

---

## Changelog

- **v0.1.0 (2026-06-13):** Initial functional specification created.
