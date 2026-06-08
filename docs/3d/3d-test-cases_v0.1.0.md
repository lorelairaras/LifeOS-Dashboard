# 3D Test Cases — LifeOS Portfolio Dashboard

**Version:** v0.1.0
**Date:** 2026-06-08
**Author:** Rory
**Status:** Planning (Phase 18)

---

## Test Strategy

3D features require:
1. **Unit tests (Vitest):** WebGL detection, reduced motion logic, Card3D component rendering
2. **E2E tests (Playwright):** Visual regression, fallback behavior, accessibility
3. **Manual tests:** FPS measurement, mobile performance, visual quality

---

## CSS 3D Card Test Cases

| ID | Test Case | Type | Priority |
|---|---|---|---|
| TC-3D-001 | Card3D renders children correctly | Unit | Must |
| TC-3D-002 | Card3D applies perspective transform on mouse move | Unit | Must |
| TC-3D-003 | Card3D resets transform on mouse leave | Unit | Must |
| TC-3D-004 | Card3D does not animate with prefers-reduced-motion | E2E | Must |
| TC-3D-005 | Project cards display 3D hover effect on desktop | E2E | Must |
| TC-3D-006 | Project cards work without 3D on mobile (touch devices) | E2E | Must |

---

## WebGL Scene Test Cases

| ID | Test Case | Type | Priority |
|---|---|---|---|
| TC-3D-010 | HeroScene loads within Suspense boundary | E2E | Must |
| TC-3D-011 | Static fallback shown when WebGL unavailable | E2E | Must |
| TC-3D-012 | Canvas has aria-hidden="true" | E2E | Must |
| TC-3D-013 | No information lost when 3D is disabled | E2E | Must |
| TC-3D-014 | Scene responds to mouse movement (parallax) | Manual | Should |
| TC-3D-015 | Scene pauses when tab is not visible | Unit | Should |

---

## Performance Test Cases

| ID | Test Case | Type | Priority |
|---|---|---|---|
| TC-3D-020 | 3D bundle adds < 160KB gzipped to build | Unit (build check) | Must |
| TC-3D-021 | Time to Interactive < 500ms increase vs. non-3D | Manual (Lighthouse) | Must |
| TC-3D-022 | Desktop FPS >= 60fps | Manual | Must |
| TC-3D-023 | Mobile FPS >= 30fps on mid-range device | Manual | Should |
| TC-3D-024 | Canvas memory < 50MB | Manual | Should |

---

## Accessibility Test Cases

| ID | Test Case | Type | Priority |
|---|---|---|---|
| TC-3D-030 | prefers-reduced-motion disables all 3D animations | E2E | Must |
| TC-3D-031 | All canvas elements have aria-hidden="true" | E2E | Must |
| TC-3D-032 | No rapid flashing in any 3D scene (WCAG 2.3.1) | Manual | Must |
| TC-3D-033 | All portfolio content accessible via keyboard without 3D | E2E | Must |
| TC-3D-034 | Screen reader reads all content correctly with 3D enabled | Manual | Must |

---

## Responsive Test Cases

| ID | Test Case | Type | Priority |
|---|---|---|---|
| TC-3D-040 | No horizontal overflow with 3D at 320px viewport | E2E | Must |
| TC-3D-041 | No horizontal overflow with 3D at 390px viewport | E2E | Must |
| TC-3D-042 | 3D canvas resizes correctly on viewport change | E2E | Should |
| TC-3D-043 | 3D disabled on devices with < 4 CPU cores | Unit | Should |

---

## Standards-Readiness Notes

- **ISO 9001 8.5.1:** All test cases have unique IDs for traceability.
- **WCAG 2.1 AA:** Accessibility tests cover contrast, flashing, reduced motion, and keyboard access.
- **ISO 27001 A.12.1.3:** Performance tests verify capacity management thresholds.

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.1.0 | 2026-06-08 | Initial 3D test cases — 25 test cases across 5 categories |
