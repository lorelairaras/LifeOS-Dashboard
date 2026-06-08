# Feature Spec: Job Application Tracker

**Version:** v0.1.0
**Date:** 2026-06-03
**Author:** Rory
**Status:** Draft

---

## Purpose

The job tracker prevents applications from falling through the cracks during a busy job search. It captures every application, tracks its current status, stores the job link and notes, and surfaces which ones need attention today — whether that is a follow-up, interview prep, or a decision.

## Scope

**In scope (MVP):** Create, read, edit, delete applications. Status tracking. Follow-up date highlighting. Job type field. External job link. Notes. Local state only.

**Out of scope (MVP):** Status change history, interview scheduling, automated follow-up reminders, integration with job boards, Supabase persistence.

---

## User Stories

| Story ID | Persona | User Story | Business Value | Priority | Status |
|---|---|---|---|---|---|
| US-JT-001 | Rory | As Rory, I want to log a job application with company, role, and status, so I never lose track of where I have applied. | Prevents losing applications | P1 | Planned |
| US-JT-002 | Rory | As Rory, I want to update the status of an application as it progresses, so my tracker reflects what is actually happening. | Keeps the search organised | P1 | Planned |
| US-JT-003 | Rory | As Rory, I want to see a follow-up date highlighted when it has arrived or passed, so I know exactly when to act. | Never miss a follow-up | P1 | Planned |
| US-JT-004 | Rory | As Rory, I want to open the original job posting from the tracker, so I can review the role before an interview. | One-click access to job details | P1 | Planned |
| US-JT-005 | Rory | As Rory, I want to record the job type (remote, hybrid, on-site), so I can assess what kind of search I am running. | Search strategy awareness | P2 | Planned |
| US-JT-006 | Rory | As Rory, I want to add private notes to each application, so I can track impressions, contacts, and prep points. | Captures context that fades from memory | P2 | Planned |
| US-JT-007 | Rory | As Rory, I want to filter applications by status, so I can focus on active applications rather than rejected ones. | Reduces noise | P2 | Planned |

---

## Functional Requirements

| Requirement ID | Requirement | Priority | MVP / Future | Notes |
|---|---|---|---|---|
| JOB-MVP-001 | User can create an application with company and role as required fields | P1 | MVP | — |
| JOB-MVP-002 | Optional fields: location, job type, status, job URL, date applied, follow-up date, notes | P1 | MVP | Status defaults to "Applied" |
| JOB-MVP-003 | Supported statuses: Saved, Applied, Phone Screen, Assessment, Interviewing, Offer, Rejected, Closed | P1 | MVP | — |
| JOB-MVP-004 | Supported job types: Remote, Hybrid, On-site, Flexible | P2 | MVP | — |
| JOB-MVP-005 | The application list must show: company, role, status badge, job type, and date applied | P1 | MVP | — |
| JOB-MVP-006 | If a job URL is saved, it must appear as a clickable icon link that opens in a new tab | P1 | MVP | — |
| JOB-MVP-007 | If a follow-up date is set and is today or earlier, the date must be visually highlighted | P1 | MVP | Amber/warning colour |
| JOB-MVP-008 | The user must be able to edit all fields of an application | P1 | MVP | Via modal |
| JOB-MVP-009 | The user must be able to delete an application with a confirmation step | P1 | MVP | — |
| JOB-MVP-010 | The list must show an empty state when no applications exist | P1 | MVP | — |
| JOB-MVP-011 | The user can filter applications by status | P2 | MVP | "All" is default |
| JOB-FUTURE-001 | Status change history timeline | — | Future | — |
| JOB-FUTURE-002 | Automated follow-up reminders | — | Future | Requires notification capability |
| JOB-FUTURE-003 | Import from LinkedIn or job board | — | Future | — |

---

## Acceptance Criteria

| AC ID | Scenario | Given | When | Then | Status |
|---|---|---|---|---|---|
| AC-JT-001 | Empty state | No applications logged | I open the job tracker | Empty state message and "Add Application" button visible | Not tested |
| AC-JT-002 | Create with required fields | I enter company and role, submit | Form closes | Application appears with status "Applied" | Not tested |
| AC-JT-003 | Status update | I edit an application and change status to "Interviewing" | Form closes | Application shows "Interviewing" badge | Not tested |
| AC-JT-004 | Overdue follow-up shown | Application has follow-up date of yesterday | I view the list | Follow-up date text is amber/warning coloured | Not tested |
| AC-JT-005 | Future follow-up not highlighted | Application has follow-up date of next week | I view the list | Follow-up date appears in normal text colour | Not tested |
| AC-JT-006 | Job link opens in new tab | Application has a job URL | I click the link icon | Job posting opens in a new browser tab | Not tested |
| AC-JT-007 | Edit form pre-fills | I click "Edit" on an application | Modal opens | All saved values are shown in the form | Not tested |
| AC-JT-008 | Delete with confirmation | I click "Delete" and confirm | — | Application removed from list | Not tested |
| AC-JT-009 | Status filter | I filter to "Interviewing" | — | Only Interviewing applications shown | Not tested |
| AC-JT-010 | Mobile layout | I open job tracker at 390px | — | List renders correctly; form accessible | Not tested |

---

## UI / UX Notes

**Layout:** List or card view. Page header with "Job Applications" title and "Add Application" button. Status filter row below header.

**JobCard:** Company name (bold), role (subtitle), status badge (colour-coded), job type chip, date applied, follow-up date (highlighted if overdue), external link icon, Edit and Delete buttons.

**Status badge colours:**
- Saved → grey
- Applied → blue
- Phone Screen → indigo
- Assessment → purple
- Interviewing → amber
- Offer → green
- Rejected → red
- Closed → grey (muted)

**Overdue follow-up:** Date text and/or a small "Follow up!" chip in amber.

**Form modal:** Fields: Company (text), Role (text), Location (text), Job Type (select), Status (select), Job URL (url input), Date Applied (date), Follow-up Date (date), Notes (textarea).

---

## Data Model

See `docs/architecture/data-model_v0.2.0.md` — `JobApplication` interface and `ApplicationStatus`, `JobType` types.

Key fields: `id`, `company`, `role`, `location`, `jobType`, `status`, `jobUrl`, `notes`, `dateApplied`, `followUpDate`, `createdAt`, `updatedAt`.

---

## QA Test Cases

| Test ID | Test Case | Steps | Expected Result | Status |
|---|---|---|---|---|
| TC-JT-001 | Empty state | Navigate to `/dashboard/jobs` with no applications | Empty state visible | Not run |
| TC-JT-002 | Create application | Click "Add Application", enter company and role, submit | Application appears in list | Not run |
| TC-JT-003 | Default status | Create without selecting status | Status badge shows "Applied" | Not run |
| TC-JT-004 | Update status | Edit application, change status to "Interviewing" | Badge updates | Not run |
| TC-JT-005 | Overdue follow-up | Add application with follow-up date yesterday | Follow-up date shows in warning colour | Not run |
| TC-JT-006 | Job URL link | Add application with job URL, click link | Opens new tab | Not run |
| TC-JT-007 | Status filter | Add applications with different statuses; apply "Offer" filter | Only Offer applications shown | Not run |
| TC-JT-008 | Delete — confirm | Click Delete, confirm | Application removed | Not run |
| TC-JT-009 | Mobile 390px | Open at 390px | Cards render correctly | Not run |

---

## Future Improvements

- Status change history / timeline per application
- Automated reminders for follow-up dates
- Import from LinkedIn saved jobs
- Export applications as CSV
- Interview notes section (separate from general notes)
- Stage-specific checklists (phone screen prep, interview prep, offer review)

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.1.0 | 2026-06-03 | Initial job tracker feature spec created |
