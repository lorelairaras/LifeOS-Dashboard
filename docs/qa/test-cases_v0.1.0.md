# Test Cases — LifeOS Portfolio Dashboard

**Version:** v0.1.0  
**Date:** 2026-06-03  
**Author:** Rory  
**Status:** Draft

---

## Format

```
TC-[ID]
Phase: [phase number]
Type: Playwright | Vitest | Manual
Priority: P1 (smoke) | P2 (core flow) | P3 (edge case)
Given: [precondition]
When: [action]
Then: [expected result]
Status: Not run | Pass | Fail
Notes: —
```

---

## Public Portfolio Test Cases

**TC-PF-001**  
Phase: 1 | Type: Playwright | Priority: P1  
Given: The application is running  
When: I navigate to `/`  
Then: The page returns HTTP 200 and the document title contains "Rory"  
Status: Not run

**TC-PF-002**  
Phase: 1 | Type: Playwright | Priority: P1  
Given: I am on the homepage  
When: The page loads  
Then: A navigation element is present with links to About, Skills, Projects, and Contact  
Status: Not run

**TC-PF-003**  
Phase: 1 | Type: Playwright | Priority: P1  
Given: I am on the homepage  
When: The hero section is visible  
Then: Text matching the developer's name is present and at least two CTA buttons are visible  
Status: Not run

**TC-PF-004**  
Phase: 1 | Type: Playwright | Priority: P2  
Given: I am on the homepage  
When: I scroll to the About section  
Then: The section contains at least one paragraph of text  
Status: Not run

**TC-PF-005**  
Phase: 1 | Type: Playwright | Priority: P2  
Given: I am on the homepage  
When: I scroll to the Skills section  
Then: At least six skill tags are visible  
Status: Not run

**TC-PF-006**  
Phase: 1 | Type: Playwright | Priority: P1  
Given: I am on the homepage  
When: I scroll to the Projects section  
Then: At least two project cards are visible, each with a title and a link  
Status: Not run

**TC-PF-007**  
Phase: 1 | Type: Playwright | Priority: P2  
Given: I am on the homepage  
When: I inspect each external link  
Then: Every `<a>` with `href` starting with `http` has `target="_blank"` and `rel` containing `noopener`  
Status: Not run

**TC-PF-008**  
Phase: 1 | Type: Playwright | Priority: P2  
Given: I am on the homepage  
When: I scroll to the Contact section  
Then: An email link, a GitHub link, and a LinkedIn link are all present  
Status: Not run

**TC-PF-009**  
Phase: 1 | Type: Manual | Priority: P2  
Given: I open the site in browser devtools at 390px width  
When: I scroll through all sections  
Then: No horizontal scrollbar appears; all text is readable  
Status: Not run

**TC-PF-010**  
Phase: 1 | Type: Manual | Priority: P2  
Given: I open the site at 320px width  
When: I scroll through all sections  
Then: No content overflows horizontally  
Status: Not run

**TC-PF-011**  
Phase: 1 | Type: Playwright | Priority: P2  
Given: I am on the homepage at 390px viewport  
When: I click the hamburger/menu button  
Then: The mobile navigation opens and shows all section links  
Status: Not run

---

## Dashboard Test Cases

**TC-DB-001**  
Phase: 2 | Type: Playwright | Priority: P1  
Given: The application is running  
When: I navigate to `/dashboard`  
Then: The dashboard home page loads and four stat cards are visible  
Status: Not run

**TC-DB-002**  
Phase: 2 | Type: Playwright | Priority: P1  
Given: I am on `/dashboard`  
When: I look at the navigation  
Then: Links to Tasks, Prompts, Jobs, Budget, and Settings are all present  
Status: Not run

**TC-DB-003**  
Phase: 2 | Type: Playwright | Priority: P1  
Given: I am on `/dashboard`  
When: I click the "Tasks" link  
Then: The URL changes to `/dashboard/tasks` and the task tracker heading is visible  
Status: Not run

**TC-DB-004**  
Phase: 2 | Type: Playwright | Priority: P2  
Given: I am on any dashboard page  
When: The page first loads  
Then: A data-loss notice is visible on the page  
Status: Not run

**TC-DB-005**  
Phase: 2 | Type: Playwright | Priority: P2  
Given: The data-loss notice is visible  
When: I click the dismiss button  
Then: The notice disappears  
Status: Not run

---

## Task Tracker Test Cases

**TC-TK-001**  
Phase: 3 | Type: Playwright | Priority: P1  
Given: The task tracker has no tasks  
When: I navigate to `/dashboard/tasks`  
Then: An empty state message is visible and a "Create Task" or "Add Task" button is present  
Status: Not run

**TC-TK-002**  
Phase: 3 | Type: Playwright | Priority: P1  
Given: I am on the task tracker  
When: I click "Add Task", fill in a title, and submit  
Then: The new task appears in the task list  
Status: Not run

**TC-TK-003**  
Phase: 3 | Type: Playwright | Priority: P2  
Given: I created a task without setting status  
When: The task appears in the list  
Then: The status badge shows "To Do"  
Status: Not run

**TC-TK-004**  
Phase: 3 | Type: Playwright | Priority: P2  
Given: I have a task in the list  
When: I click the edit button and change the status to "Done"  
Then: The task list shows "Done" for that task  
Status: Not run

**TC-TK-005**  
Phase: 3 | Type: Playwright | Priority: P1  
Given: I have a task in the list  
When: I click "Delete" and confirm the deletion  
Then: The task is no longer visible in the list  
Status: Not run

**TC-TK-006**  
Phase: 3 | Type: Playwright | Priority: P2  
Given: I have a task in the list  
When: I click "Delete" and then cancel the confirmation  
Then: The task remains in the list  
Status: Not run

---

## Budget Calculator Unit Test Cases

**TC-BT-UNIT-001**  
Phase: 6 | Type: Vitest | Priority: P1  
Given: A list of entries: income 5000, income 2000, expense 1500, expense 3000  
When: `calculateTotals(entries)` is called  
Then: Returns `{ income: 7000, expenses: 4500, balance: 2500 }`  
Status: Not run

**TC-BT-UNIT-002**  
Phase: 6 | Type: Vitest | Priority: P2  
Given: An empty list of entries  
When: `calculateTotals([])` is called  
Then: Returns `{ income: 0, expenses: 0, balance: 0 }`  
Status: Not run

**TC-BT-UNIT-003**  
Phase: 6 | Type: Vitest | Priority: P2  
Given: A date string representing yesterday  
When: `isOverdue(dateString)` is called  
Then: Returns `true`  
Status: Not run

**TC-BT-UNIT-004**  
Phase: 6 | Type: Vitest | Priority: P2  
Given: A date string representing tomorrow  
When: `isOverdue(dateString)` is called  
Then: Returns `false`  
Status: Not run

---

## Accessibility Test Cases

**TC-A11Y-001**  
Phase: 8 | Type: Manual | Priority: P1  
Given: I am on the homepage  
When: I press Tab repeatedly from the top of the page  
Then: Every interactive element (links, buttons) receives a visible focus ring in logical order  
Status: Not run

**TC-A11Y-002**  
Phase: 8 | Type: Playwright | Priority: P1  
Given: I am on any form in the dashboard  
When: I inspect all `<input>` and `<textarea>` elements  
Then: Every input has an associated `<label>` or `aria-label`  
Status: Not run

**TC-A11Y-003**  
Phase: 8 | Type: Playwright | Priority: P2  
Given: A modal is open  
When: I press Tab repeatedly  
Then: Focus does not leave the modal  
Status: Not run

**TC-A11Y-004**  
Phase: 8 | Type: Playwright | Priority: P2  
Given: A modal is open  
When: I press Escape  
Then: The modal closes  
Status: Not run

---

## Deployment Smoke Test Cases

**TC-DEP-001**  
Phase: 8 | Type: Manual | Priority: P1  
Given: The live Vercel URL is available  
When: I open the URL in a browser  
Then: The portfolio homepage loads correctly  
Status: Not run

**TC-DEP-002**  
Phase: 8 | Type: Manual | Priority: P1  
Given: The live Vercel URL is available  
When: I navigate to `[url]/dashboard`  
Then: The dashboard loads correctly  
Status: Not run

**TC-DEP-003**  
Phase: 8 | Type: Manual | Priority: P1  
Given: The live URL is loaded  
When: I check the browser address bar  
Then: The URL uses HTTPS  
Status: Not run

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.1.0 | 2026-06-03 | Initial test cases created |
