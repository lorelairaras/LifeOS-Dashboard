# CLAUDE.md — LifeOS Portfolio Dashboard

This file defines the working rules for Claude when assisting with this project. Read this before starting any task.

---

## Project Identity

- **Project name:** LifeOS Portfolio Dashboard
- **Author:** Rory
- **Purpose:** Public portfolio + private productivity dashboard
- **Stack:** React + Vite + TypeScript + Tailwind CSS
- **Current phase:** Documentation and planning

---

## Absolute Rules

1. Do not start coding before documentation is understood.
2. Do not push directly to `main`. Use branches and pull requests.
3. Do not fabricate test results, deployment confirmations, screenshots, or approvals.
4. Do not delete user files.
5. Do not add paid tools, paid APIs, or paid services without explicit user approval.
6. Do not add 3D, AI, payments, or complex backend features in MVP until the base product works.
7. Do not overbuild. Build the smallest version that works, then iterate.
8. Do not create numbered folder names (e.g. `01_docs`). Keep names clean and human-readable.

---

## Free Tools Rule

Before selecting any tool, library, or service, confirm it is available on a free tier for this use case. Document the assumption in `docs/architecture/tech-stack.md`. If a paid tool is needed in future, document it in `docs/decisions/human-decisions.md` and ask the user before proceeding.

---

## Skills Workflow

Use these skills when the task matches:

| Task | Skill |
|---|---|
| Product requirements, feature scope | `/product-management:product-brainstorming` or `/product-management:write-spec` |
| UI/accessibility check | `/design:accessibility-review` |
| Code review before merge | `/engineering:code-review` |
| Feature completeness check before PR | `/feature-review` |
| Documentation triage (what can be auto-generated) | `/autogenerate` |
| End of long session | `/sessioncheckpoint` |
| Testing plan | `/engineering:testing-strategy` |
| Deployment checklist | `/engineering:deploy-checklist` |

---

## Coding Standards

- Language: TypeScript (strict mode)
- Formatter: Prettier (run `npm run format` before commit)
- Linter: ESLint (run `npm run lint` before commit)
- No `any` types without a comment explaining why
- Component files: PascalCase (e.g. `TaskCard.tsx`)
- Hook files: camelCase with `use` prefix (e.g. `useTaskList.ts`)
- Utility files: camelCase (e.g. `formatDate.ts`)
- Style: Tailwind CSS utility classes only — no inline styles unless strictly necessary
- Imports: absolute paths via `@/` alias wherever possible

---

## Component Rules

- Generic, reusable components go in `src/components/`
- Feature-specific components go in `src/features/[feature-name]/`
- Do not put business logic inside generic components
- Reusable components must not import from feature folders
- Document reusable components in `docs/architecture/component-guide.md` when created

---

## Documentation Standards

- Every document must have a version number in its filename when edited (semantic versioning: MAJOR.MINOR.PATCH)
- Always create a new versioned file — do not overwrite the previous version
- Every document must have a changelog section at the bottom
- Every requirement must have a unique ID (e.g. `FR-001`, `US-001`, `AC-001`)
- Every test case must have a unique ID (e.g. `TC-001`)
- Document index (`docs/document-index.md`) must be kept current after every session
- Use plain language. Remove filler words. Write for developers and non-technical reviewers alike.

---

## QA Standards

- Do not hide failures by deleting tests or weakening assertions
- Do not mark tests as passing unless they actually passed
- Run lint and typecheck before reporting a phase as complete
- Run Playwright tests before marking deployment as ready
- Log all QA results in `docs/qa/qa-execution-log.md`
- Log all bugs found and fixed in `docs/qa/bug-fix-log.md`

### QA Self-Healing Loop
When a test fails:
1. Classify the failure (setup, logic, assertion, environment)
2. Fix the smallest verified root cause
3. Rerun the targeted test only
4. Confirm pass, then rerun broader suite
5. Update `qa-execution-log.md` and `bug-fix-log.md`

---

## Git and Branch Rules

- Branch naming: `feat/[feature]`, `fix/[bug]`, `docs/[doc-name]`, `chore/[task]`, `test/[scope]`
- Never commit directly to `main`
- Open a pull request for every merge
- All PRs must have a description of what changed and why
- Use Conventional Commits:

```
chore(repo): initialize LifeOS project
docs(product): add MVP scope and roadmap
feat(portfolio): add public homepage
feat(dashboard): add dashboard layout
feat(tasks): add task tracker
feat(prompts): add prompt library
test(playwright): add portfolio smoke tests
fix(nav): fix mobile menu overflow
docs(deployment): add Vercel deployment guide
```

---

## Verification Before Completion

Before marking any phase as complete, confirm:

- [ ] Documentation exists for the feature
- [ ] TypeScript compiles without errors (`npm run typecheck`)
- [ ] ESLint passes (`npm run lint`)
- [ ] Relevant tests pass (unit and/or E2E)
- [ ] Mobile responsiveness checked (320px, 390px, 768px, desktop)
- [ ] No `console.error` or unhandled promise rejections
- [ ] QA log updated
- [ ] PR created (not pushed directly to `main`)

---

## Session Checkpoint

Run `/sessioncheckpoint` when:
- The session has generated or modified more than 5 files
- A development phase is completing
- Before switching to a new major topic

The checkpoint must record: files completed, files updated, current app status, test status, deployment status, blockers, and the exact next prompt.

---

## Changelog (this file)

| Version | Date | Change |
|---|---|---|
| v0.1.0 | 2026-06-03 | Initial CLAUDE.md created |
