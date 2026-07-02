# Wireframe Handoff

Current artifact: `wireframes/index.html`

Open it directly in a browser. It does not require a dev server.

## What Exists

- Low-fidelity public and admin wireframes in one browser-viewable page.
- Responsive CSS for desktop and smaller screens.
- Screen contract in `wireframes/wireframe-spec.json`.
- TDD contract tests in `tests/wireframes.test.js`.
- Documentation for scope, TDD workflow, Open Design status, and testing log.

## How To Test

Run:

```powershell
npm.cmd test
```

Expected result:

- 5 passing tests.

## First Completed Slice

Slice: MVP wireframe coverage.

Red step:

- Tests passed for docs/spec and failed because `wireframes/index.html` and `wireframes/styles.css` were missing.

Green step:

- Added `wireframes/index.html` and `wireframes/styles.css`.
- Updated `package.json` to avoid sandbox worker spawning from `node --test tests/*.test.js`.

## Next TDD Slices

1. Public route/component scaffold.
2. Article data model and fixtures.
3. Article listing and article detail rendering.
4. Search/category filtering.
5. Admin article management workflow.
6. Profile/media management workflow.
7. Comments/reviews moderation workflow.
8. Contact form and contact submissions workflow.
9. SEO metadata and sitemap checks.
10. Launch QA and deployment smoke checks.

## Open Design Sync

Open Design MCP is still unreachable from Codex. When it reconnects, use this wireframe and `wireframes/wireframe-spec.json` as the input contract for the OD project `Babas & Brasse Online Magazine MVP`.
