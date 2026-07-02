# Frontend Scaffold Plan

Date: July 2, 2026
Phase: Phase 0 Project Foundation complete; pending React production migration.

## Current Status

Current status: completed prototype scaffold.

The dependency-light scaffold has done its job. The original route scaffold tests are now part of the long-lived acceptance contract. It now contains tested route contracts, fixture data, generated HTML artifacts, Open Design handoff references, support subflows, and a local preview server.

Use this scaffold as the acceptance-contract source for the React production migration. Do not create a new React app inside this prototype until the production app boundary is confirmed.

## Completed Prototype Artifacts

- `src/routes.js`: tested public/admin route contract.
- `src/content/fixtures.js`: launch-shape fixture data.
- `src/render/**/*.js`: renderer contracts for public, admin, and support screens.
- `src/pages/**/*.html`: generated prototype route artifacts.
- `designs/open-design-wireframes/`: complete local Open Design wireframe handoff.
- `scripts/preview-mvp.js`: local route-aware MVP preview server.
- `tests/**/*.test.js`: contract tests for the prototype.

Preview command:

```powershell
npm.cmd run preview:mvp
```

Route index:

```text
http://localhost:4173/__routes
```

## React Production Migration

The next scaffold is the production React app. Next.js remains the recommended React framework if server-rendered editorial SEO is required. The first decision is whether that app lives in this repository or a separate app folder.

Once the boundary is confirmed, migrate in this order:

1. Route registry.
2. App shell.
3. Public layout.
4. Admin layout.
5. Public route components.
6. Admin route components.
7. Auth, persistence, and mutations.
8. QA, deployment, and rollback gates.

## TDD Handoff

Production tests should be written before each migration slice:

- Route smoke tests for all public/admin/support paths.
- Component tests for cards, forms, tables, modals, and state panels.
- Auth boundary tests.
- Data adapter tests.
- Mutation validation tests.
- Accessibility, SEO, and viewport checks.

Keep `src/routes.js` or its TypeScript successor as the tested route source until production route tests replace it.



