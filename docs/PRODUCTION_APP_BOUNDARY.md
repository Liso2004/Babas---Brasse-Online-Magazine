# Production App Boundary

Date: July 5, 2026
Sprint: Sprint 1
Decision: create the production React app scaffold in `apps/web` inside this repository.

## Boundary Decision

The production app will live at `apps/web`. This keeps the React production migration close to the existing prototype acceptance contract while keeping generated prototype artifacts isolated in `src/pages/`.

Target: React, with a Next.js-ready route and layout structure. The first scaffold is dependency-light and does not install packages yet.

## No Dependency Install Yet

This slice intentionally performs no dependency install. The scaffold records the app shell, route registry, layouts, and handoff commands first. Package installation can happen after this boundary is reviewed and approved.

## Prototype Acceptance Contract

The prototype remains the acceptance contract until production tests replace it:

- `src/routes.js`
- `src/pages/**/*.html`
- `designs/open-design-wireframes/`
- `tests/**/*.test.js`
- `npm.cmd run preview:mvp`

## Sprint 1 Scope

Sprint 1 starts with:

1. Boundary doc.
2. React-ready `apps/web` app shell.
3. Route registry for all public, admin, and support paths.
4. Public and admin layouts.
5. TDD coverage before dependency installation.
