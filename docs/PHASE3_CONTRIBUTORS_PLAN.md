# Phase 3 Contributors Plan

Date: July 2, 2026
Wireframe source: `designs/open-design-wireframes/contributors.html`

## Purpose

Implement the Contributors page contract from the final Open Design wireframe so readers can discover contributor profiles and their published works.

## TDD Contract

Red first:

- Add `tests/contributors.test.js` before implementation.
- Prove the Contributors plan, renderer, helpers, and generated page artifact are missing or incomplete.

Green target:

- Add `src/render/contributors.js` with `renderContributorsPage`, `getContributorProfiles`, and `getPublishedWorksForContributor`.
- Replace `src/pages/contributors.html` with renderer-shaped output.
- Preserve the final wireframe structure: shared public nav, Search/filter toolbar, contributor profile card grid, published works table, and states.
- Render contributor profiles only; creative team records remain on Creative Team.
- Render published works per contributor and exclude drafts from public output.
- Include loading, no-results, reset-filter, and fetch error state hooks.

## Required Sections

- Shared public navigation.
- Contributor Search/filter toolbar with category filter controls.
- Contributor profile cards with image, name, contributor type, short bio, and published works links.
- Published works rows showing linked published articles.
- State strip covering loading, no-results, reset-filter, and fetch error.

## Implementation Notes

The initial MVP fixture only has one contributor, but the renderer and tests are written for a scalable contributor list.
