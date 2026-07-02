# Phase 5 Mobile Wireframe Comps Plan

## Scope

This slice implements the final Open Design support wireframe: Mobile Wireframe Comps. It is a responsive implementation handoff, not a substitute for final visual QA in the production frontend.

## Mobile Navigation Contract

- Preserve the compressed B&B mark from the Open Design comp.
- Document menu/search behavior for narrow widths.
- Keep navigation controls large enough for touch targets and visible focus.

## Public Mobile Comps

Public mobile comps cover Home, Article, Search, and Contact stacking order:

- Home: hero, rail, teasers, newsletter.
- Article: metadata, title, body, related content, comments/reviews.
- Search: search field, filter chips, results, no-results/reset state.
- Contact: intro, form, validation, footer.

## Admin Mobile Comps

Admin mobile comps cover Dashboard, Editor, Moderate, and Inbox workflows:

- Dashboard: metrics, activity, and quick actions become stacked panels.
- Editor: article workflow actions stay near the active record or step.
- Moderate: dense tables simplify into card rows.
- Inbox: submission details and status actions remain close to each message.

## Breakpoints And Accessibility

- Breakpoints cover 360, 390, 430, and tablet widths.
- Public layouts use one-column stacking at phone widths.
- Admin layouts use simplified card rows when tables would overflow.
- Accessibility handoff includes touch targets, no text overlap, visible focus, readable type, and stable controls.
- Final frontend implementation still needs Playwright viewport checks before launch.

## TDD Verification

- Red test: `node tests\mobile-wireframe-comps.test.js` failed on missing plan, renderer, and generated artifact.
- Green target: focused mobile wireframe comps tests pass after generating `src/pages/mobile-wireframes.html`.
- Regression target: full suite stays green after coverage and documentation updates.
