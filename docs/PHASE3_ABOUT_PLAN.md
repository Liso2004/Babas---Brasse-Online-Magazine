# Phase 3 About Plan

Date: July 2, 2026
Wireframe source: `designs/open-design-wireframes/about.html`

## Purpose

Implement the About page contract from the final Open Design wireframe so the production prototype has a real public information page instead of the Phase 0 placeholder.

## TDD Contract

Red first:

- Add `tests/about.test.js` before implementation.
- Prove the About plan, renderer, and generated page artifact are missing or incomplete.

Green target:

- Add `src/render/about.js` with `renderAboutPage`.
- Replace `src/pages/about.html` with renderer-shaped output.
- Preserve the final wireframe structure: shared public nav, Mission, Vision, Organisation, editorial pillars, route cards, and newsletter footer.
- Keep route cards to Creative Team, Contributors, and Contact.
- Include state hooks for missing overview content and newsletter validation/success.

## Required Sections

- Shared public navigation with B&B mark, editorial links, search, and Subscribe CTA.
- About overview with Mission, Vision, and Organisation content.
- Editorial pillars explaining the magazine focus without generic marketing blocks.
- Route cards for Creative Team, Contributors, and Contact.
- Newsletter footer matching the Home handoff.

## Implementation Notes

The final brand copy is still pending, so this slice uses launch-safe editorial copy that can be swapped later without changing the route structure or tests.
