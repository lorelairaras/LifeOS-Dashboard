# Human Decisions Log — LifeOS Portfolio Dashboard

**Version:** v0.1.0  
**Date:** 2026-06-03  
**Author:** Rory  
**Status:** Active — updated when decisions requiring human approval arise

---

## Purpose

This log records decisions that cannot be made autonomously — they require the explicit input, approval, or direction of Rory as the product owner.

These include:
- Decisions to add paid tools or services
- Decisions to add AI API integrations
- Decisions to expose personal information publicly
- Decisions to significantly change the project scope
- Decisions to deviate from the free-tools rule
- Any decision marked "awaiting approval" in the decision log

Technical decisions made within the established rules are logged in `docs/product/decision-log.md`, not here.

---

## Open Decisions (Awaiting Input)

None at this time.

---

## Closed Decisions

### HD-001 — Framework Choice

**Date raised:** 2026-06-03  
**Question:** React + Vite or Next.js?  
**Decision:** React + Vite  
**Decided by:** Rory (via project setup conversation)  
**Date resolved:** 2026-06-03

---

### HD-002 — Portfolio Personalisation

**Date raised:** 2026-06-03  
**Question:** Should the portfolio use Rory's real name and email, or placeholder content?  
**Decision:** Personalised to Rory  
**Decided by:** Rory (via project setup conversation)  
**Date resolved:** 2026-06-03

---

### HD-003 — Project Location

**Date raised:** 2026-06-03  
**Question:** Create the project in the current workspace root or a subfolder?  
**Decision:** New subfolder `Sample/lifeos-portfolio`  
**Decided by:** Rory (via project setup conversation)  
**Date resolved:** 2026-06-03

---

## Decisions Pending in Future Phases

The following decisions will need to be raised with Rory before the relevant phase begins:

| Phase | Decision needed |
|---|---|
| Phase 7 | Confirm Supabase free tier is acceptable; confirm region/data location |
| Phase 7 | Confirm whether Supabase Auth should be added in Phase 7 or deferred |
| Post-MVP | Approve any AI API integration and confirm cost model |
| Post-MVP | Approve 3D landing page scope and timeline |
| Post-MVP | Decide on custom domain and DNS setup |
| Post-MVP | Decide on analytics tool (Plausible, Umami, or none) |

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.1.0 | 2026-06-03 | Human decisions log created with HD-001 through HD-003 |
