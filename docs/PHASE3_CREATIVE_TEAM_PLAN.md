# Phase 3 Creative Team Plan

Date: July 2, 2026
Wireframe source: `designs/open-design-wireframes/creative-team.html`

## Purpose

Implement the Creative Team page contract from the final Open Design wireframe so the production prototype exposes active public team profiles instead of the Phase 0 placeholder.

## TDD Contract

Red first:

- Add `tests/creative-team.test.js` before implementation.
- Prove the Creative Team plan, renderer, helpers, and generated page artifact are missing or incomplete.

Green target:

- Add `src/render/creative-team.js` with `renderCreativeTeamPage` and `getCreativeTeamProfiles`.
- Replace `src/pages/creative-team.html` with renderer-shaped output.
- Preserve the final wireframe structure: shared public nav, team intro, editorial role note, profile grid, states, and footer paths.
- Render profile card anatomy: image, name, editorial role, short bio, and social links.
- Render active public team profiles only; contributor records remain on the Contributors route.
- Include loading, empty, error, and social-link state hooks.

## Required Sections

- Shared public navigation.
- Creative Team intro and editorial role taxonomy.
- Profile grid with public creative team records.
- State strip for loading, empty, error, and social link coverage.
- Footer paths to Contributors and Contact.
