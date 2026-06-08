# Feature Spec: Public Portfolio

**Version:** v0.1.0
**Date:** 2026-06-03
**Author:** Rory
**Status:** Draft

---

## Purpose

The public portfolio is the employer-facing side of LifeOS. It shows who Rory is, what has been built, what skills exist, and how to get in touch. It is publicly accessible via the live Vercel URL and is the primary asset shared in job applications.

## Scope

**In scope (MVP):**
Hero section, About section, Skills section, Projects section, Case Studies section, Resume/Experience section, Contact section, responsive navigation, mobile layout.

**Out of scope (MVP):**
Server-side contact form, blog, dark/light mode toggle, animations beyond CSS transitions, downloadable PDF generated dynamically.

---

## User Stories

| Story ID | Persona | User Story | Business Value | Priority | Status |
|---|---|---|---|---|---|
| US-PF-001 | Employer / Recruiter | As an employer, I want to immediately understand who Rory is and what they do when I land on the page, so I can decide within 10 seconds whether to keep reading. | First impression and bounce prevention | P1 | Planned |
| US-PF-002 | Employer | As an employer, I want to read about Rory's background and focus areas, so I can assess fit for a role without emailing. | Replaces cold recruiter conversations | P1 | Planned |
| US-PF-003 | Employer | As an employer, I want to see skills organised by category, so I can quickly check for the technologies our team uses. | Skills alignment check | P1 | Planned |
| US-PF-004 | Employer | As an employer, I want to see real project examples with descriptions and links, so I can verify the quality of work. | Evidence of delivery capability | P1 | Planned |
| US-PF-005 | Employer | As an employer, I want to read a deeper write-up on at least one project, so I can understand how Rory thinks through problems. | Evidence of product thinking | P2 | Planned |
| US-PF-006 | Employer | As an employer, I want to see a career timeline and experience summary, so I can understand Rory's history without downloading a resume. | Reduces friction in evaluation | P2 | Planned |
| US-PF-007 | Employer / Collaborator | As a visitor, I want clear contact links (email, GitHub, LinkedIn), so I can reach Rory or verify public work without hunting. | Reduces contact friction | P1 | Planned |
| US-PF-008 | Mobile user | As a mobile visitor, I want the site to work on my phone, so I can review it during a commute or between meetings. | Mobile traffic from recruiters | P1 | Planned |

---

## Functional Requirements

| Requirement ID | Requirement | Priority | MVP / Future | Notes |
|---|---|---|---|---|
| FR-PF-001 | The hero section must display Rory's name, a short title/tagline, and two CTA buttons (View Projects, Contact) | P1 | MVP | — |
| FR-PF-002 | The about section must include a bio of 2–4 paragraphs and list focus areas | P1 | MVP | — |
| FR-PF-003 | The skills section must display categorised skill tags in at least 3 categories | P1 | MVP | Categories: Frontend, Tools, Business & Product |
| FR-PF-004 | The projects section must display at least 2 project cards with title, description, tech tags, and links | P1 | MVP | Links: GitHub and/or live demo |
| FR-PF-005 | The case studies section must display at least 1 in-depth project write-up | P2 | MVP | Fields: problem, solution, tech, lessons learned |
| FR-PF-006 | The resume section must display a career timeline with at least 2 entries and an optional PDF download link | P2 | MVP | PDF can be a static file in /public/assets/ |
| FR-PF-007 | The contact section must include email (mailto), GitHub, and LinkedIn links | P1 | MVP | No server-side form |
| FR-PF-008 | All external links must open in a new tab with rel="noopener noreferrer" | P1 | MVP | Security requirement |
| FR-PF-009 | Navigation must be persistent (sticky header) and include links to all sections | P1 | MVP | Anchor-linked |
| FR-PF-010 | Navigation must collapse to a hamburger menu on mobile | P1 | MVP | — |
| FR-PF-011 | The page must be responsive at 320px, 390px, 768px, and 1280px with no horizontal overflow | P1 | MVP | — |
| FR-PF-012 | A skip-to-main-content link must be present at the top of the page for keyboard users | P1 | MVP | WCAG 2.4.1 |

---

## Acceptance Criteria

| AC ID | Scenario | Given | When | Then | Status |
|---|---|---|---|---|---|
| AC-PF-001 | Hero renders correctly | I visit `/` | The page loads | I see Rory's name, a tagline, and two CTA buttons | Not tested |
| AC-PF-002 | About section has content | I visit `/` | I scroll to the about section | I see at least two paragraphs of bio text | Not tested |
| AC-PF-003 | Skills show in categories | I visit `/` | I scroll to the skills section | Skill tags are visible in at least 3 labelled categories | Not tested |
| AC-PF-004 | Projects section has cards | I visit `/` | I scroll to the projects section | At least 2 project cards are visible with title, description, and a clickable link | Not tested |
| AC-PF-005 | Case study renders | I visit `/` | I scroll to the case studies section | At least 1 case study is visible with a problem and solution description | Not tested |
| AC-PF-006 | Contact links present | I visit `/` | I scroll to the contact section | Email, GitHub, and LinkedIn links are all visible | Not tested |
| AC-PF-007 | External links open safely | I click any external link | The link opens | A new tab opens; the original tab is unchanged | Not tested |
| AC-PF-008 | Mobile layout (390px) | I set viewport to 390px | I scroll through all sections | No horizontal overflow; all content readable; buttons tappable | Not tested |
| AC-PF-009 | Hamburger menu works | I set viewport to 390px and click the menu button | The drawer opens | All nav links are visible; clicking one closes the drawer and scrolls to the section | Not tested |
| AC-PF-010 | Skip link present | I tab once from the top of the page | I see focus on the skip link | Pressing Enter jumps focus to the main content area | Not tested |

---

## UI / UX Notes

**Layout:** Single scrollable page. All sections stacked vertically. Navigation sticky at top.

**Hero:** Full-width section. Dark background. Large name heading (`text-4xl font-bold`). Tagline below. Two buttons side by side: primary (accent colour) for "View Projects", ghost for "Contact". On mobile, buttons stack vertically.

**Skills:** Tag cloud layout with colour-coded categories. No interaction required — display only.

**Projects:** 2-column card grid on desktop, 1-column on mobile. Each card: title, 2-sentence description, tech stack chips, GitHub icon link, live demo icon link (if available).

**Case Studies:** Larger cards with more content. Each card expands inline or links to an anchor section. In MVP, content is hardcoded — no CMS.

**Resume:** Timeline layout (vertical line, entries on either side on desktop; single column on mobile). Each entry: role title, company, dates, 2–3 bullet points. Download link button at the bottom.

**Contact:** Centered section. Three large icon+text links. Email copies to clipboard on click (alternative to mailto opening email client). Social links open in new tab.

**Empty state:** The Projects section should not show an empty state — content is hardcoded. If no case studies are written, the section is hidden.

---

## Data Model

The public portfolio uses no dynamic data in MVP. All content (bio, skills, projects, case studies, experience) is hardcoded as TypeScript constants in the source files.

Suggested file: `src/features/portfolio/data/portfolioData.ts`

```typescript
export const skills: SkillCategory[] = [...];
export const projects: ProjectCard[] = [...];
export const caseStudies: CaseStudy[] = [...];
export const experience: ExperienceItem[] = [...];
```

In Phase 7, projects will be sourced from the Supabase `projects` table where `visibility = 'public'`.

---

## QA Test Cases

| Test ID | Test Case | Steps | Expected Result | Status |
|---|---|---|---|---|
| TC-PF-001 | Homepage loads | Navigate to `/` | Page loads, title contains "Rory", no console errors | Not run |
| TC-PF-002 | Navigation links visible | Load homepage | At least 5 nav links visible in header | Not run |
| TC-PF-003 | Hero CTA buttons | Load homepage, inspect hero section | Two buttons visible with correct labels | Not run |
| TC-PF-004 | External links safe | Inspect all `<a href="http*">` elements | All have `target="_blank"` and `rel` containing `noopener` | Not run |
| TC-PF-005 | Projects section count | Load homepage, scroll to projects | At least 2 project cards rendered | Not run |
| TC-PF-006 | Contact links present | Load homepage, scroll to contact | Email, GitHub, LinkedIn links visible | Not run |
| TC-PF-007 | Mobile 390px no overflow | Set viewport 390px, scroll all sections | No horizontal scrollbar at any point | Not run |
| TC-PF-008 | Hamburger menu | Set viewport 390px, click menu button | Drawer opens; all nav links visible | Not run |
| TC-PF-009 | Skip link reachable | Tab once from page top | Skip link receives focus | Not run |
| TC-PF-010 | 404 page loads | Navigate to `/nonexistent` | 404 page renders with link back to home | Not run |

---

## Future Improvements

- CMS-driven project and case study content (Contentful, Sanity, or Notion API)
- Animated hero section (GSAP or Framer Motion)
- Light/dark mode toggle
- Resume auto-generated from projects data
- Blog / writing section
- Language localisation

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.1.0 | 2026-06-03 | Initial portfolio feature spec created |
