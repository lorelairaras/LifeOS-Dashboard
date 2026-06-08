# Acceptance Criteria — LifeOS Portfolio Dashboard

**Version:** v0.1.0  
**Date:** 2026-06-03  
**Author:** Rory  
**Status:** Draft

---

## Format

Each acceptance criterion uses the Given-When-Then format:

```
AC-[ID]
Given: [precondition]
When: [action]
Then: [expected result]
Related user story: US-[ID]
Related requirement: FR-[ID]
```

---

## Public Portfolio Acceptance Criteria

**AC-PF-001**  
Given: I visit the homepage  
When: the page loads  
Then: I see the developer's name, a short title or tagline, and two visible call-to-action links  
Related: US-PF-001, FR-PF-001

**AC-PF-002**  
Given: I visit the about section  
When: the section loads  
Then: I see at least two paragraphs of bio text and the developer's areas of focus  
Related: US-PF-002, FR-PF-002

**AC-PF-003**  
Given: I visit the skills section  
When: the section loads  
Then: I see skill tags in at least three categories, each visually distinct  
Related: US-PF-003, FR-PF-003

**AC-PF-004**  
Given: I visit the projects section  
When: the section loads  
Then: I see at least two project cards, each with a title, description, at least one tech tag, and a clickable link  
Related: US-PF-004, FR-PF-004

**AC-PF-005**  
Given: I visit the contact section  
When: I click the email link  
Then: my email client opens with the developer's email pre-filled  
Related: US-PF-005, FR-PF-005

**AC-PF-006**  
Given: I visit any external link (GitHub, LinkedIn, project URL)  
When: I click the link  
Then: it opens in a new browser tab  
Related: FR-PF-008

**AC-PF-007**  
Given: I view the portfolio on a 390px wide mobile viewport  
When: I scroll through all sections  
Then: no content overflows horizontally, all text is readable, and all buttons are at least 44px tall  
Related: US-PF-006, FR-PF-007

**AC-PF-008**  
Given: I view the portfolio on a 768px tablet viewport  
When: I scroll through all sections  
Then: layout adapts to the viewport width, no horizontal overflow, navigation is accessible  
Related: FR-PF-007

**AC-PF-009**  
Given: I am a keyboard-only user  
When: I tab through the navigation  
Then: each link has a visible focus ring and is reachable in logical order  
Related: FR-PF-006

---

## Dashboard Acceptance Criteria

**AC-DB-001**  
Given: I navigate to `/dashboard`  
When: the page loads  
Then: I see a dashboard home page with at least four stat cards  
Related: US-DB-001, FR-DB-002

**AC-DB-002**  
Given: I am on any dashboard page  
When: I look at the navigation  
Then: I see links to: Home, Tasks, Prompts, Jobs, Budget, Settings  
Related: US-DB-002, FR-DB-001

**AC-DB-003**  
Given: I open the dashboard for the first time  
When: the page loads  
Then: I see a non-blocking notice that data is not saved between sessions  
Related: US-DB-003, FR-DB-004

**AC-DB-004**  
Given: I dismiss the data-loss notice  
When: I navigate away and return within the same session  
Then: the notice does not reappear  
Related: FR-DB-004

---

## Task Tracker Acceptance Criteria

**AC-TK-001**  
Given: I am on the task tracker page with no tasks  
When: the page loads  
Then: I see an empty state message and a button to create a task  
Related: FR-TK-007

**AC-TK-002**  
Given: I click "Create task"  
When: I fill in a title and submit the form  
Then: a new task appears in the list with status "To Do" and priority "Medium"  
Related: US-TK-001, FR-TK-002

**AC-TK-003**  
Given: I have at least one task in the list  
When: I click to edit a task  
Then: a form opens pre-filled with the task's current values  
Related: US-TK-003, FR-TK-003

**AC-TK-004**  
Given: I edit a task and submit  
When: the form closes  
Then: the task list shows the updated values  
Related: FR-TK-003

**AC-TK-005**  
Given: I click "Delete" on a task  
When: a confirmation prompt appears and I confirm  
Then: the task is removed from the list  
Related: US-TK-004, FR-TK-004

**AC-TK-006**  
Given: I click "Delete" on a task  
When: a confirmation prompt appears and I cancel  
Then: the task remains in the list unchanged  
Related: FR-TK-004

---

## Prompt Library Acceptance Criteria

**AC-PL-001**  
Given: I am on the prompt library with no prompts  
When: the page loads  
Then: I see an empty state message and a button to create a prompt  
Related: FR-PL-008

**AC-PL-002**  
Given: I create a new prompt with a title and body  
When: I submit the form  
Then: the prompt appears in the list with the correct title and category  
Related: US-PL-001, FR-PL-002

**AC-PL-003**  
Given: I have a prompt in the library  
When: I click "Copy"  
Then: the prompt body is copied to my clipboard and the button shows "Copied!" for at least 1.5 seconds  
Related: US-PL-002, FR-PL-005

**AC-PL-004**  
Given: I have prompts in multiple categories  
When: I select a category from the filter  
Then: only prompts in that category are shown  
Related: US-PL-003, FR-PL-007

**AC-PL-005**  
Given: I select "All" from the category filter  
When: the filter applies  
Then: all prompts are shown  
Related: FR-PL-007

---

## Job Tracker Acceptance Criteria

**AC-JT-001**  
Given: I am on the job tracker with no applications  
When: the page loads  
Then: I see an empty state message and a button to create an application  
Related: FR-JT-008

**AC-JT-002**  
Given: I create a new application with company and role  
When: I submit the form  
Then: the application appears in the list with status "Applied"  
Related: US-JT-001, FR-JT-002

**AC-JT-003**  
Given: I have an application in the tracker  
When: I change its status to "Interviewing"  
Then: the status updates in the list  
Related: US-JT-002, FR-JT-005

**AC-JT-004**  
Given: I have an application with a follow-up date that is today or earlier  
When: I view the application list  
Then: the follow-up date is visually highlighted (e.g. orange or red text/badge)  
Related: US-JT-003, FR-JT-007

**AC-JT-005**  
Given: I have an application with a job posting URL  
When: I click the link  
Then: the posting opens in a new browser tab  
Related: US-JT-004, FR-JT-006

---

## Budget Tracker Acceptance Criteria

**AC-BT-001**  
Given: I am on the budget tracker with no entries  
When: the page loads  
Then: I see an empty state message and a button to add an entry  
Related: FR-BT-008

**AC-BT-002**  
Given: I add an income entry of 5000 and an expense entry of 2000  
When: I view the totals  
Then: income shows 5000.00, expenses show 2000.00, balance shows 3000.00  
Related: US-BT-002, FR-BT-004

**AC-BT-003**  
Given: I have entries in multiple categories  
When: I view the category summary  
Then: each category shows its total  
Related: US-BT-003, FR-BT-005

**AC-BT-004**  
Given: I select "Expense" from the type filter  
When: the filter applies  
Then: only expense entries are shown in the list  
Related: US-BT-004, FR-BT-006

**AC-BT-005**  
Given: I click "Delete" on a budget entry and confirm  
When: the deletion completes  
Then: the entry is removed from the list and totals update immediately  
Related: FR-BT-003

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.1.0 | 2026-06-03 | Initial acceptance criteria created |
