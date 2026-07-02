# Frontend Scaffold Plan

Date: June 30, 2026
Phase: Phase 0 Project Foundation

## Decision

Start with a dependency-light scaffold before installing Next.js. This keeps the route contract, fixture data, and admin/public shell testable immediately while Open Design and final stack dependencies are still unsettled.

This does not replace the intended Next.js build. It creates a stable app contract that can be moved into Next.js routes and components in the next implementation slice.

## TDD Scope

The route scaffold tests must prove:

- Required public routes match `wireframes/wireframe-spec.json`.
- Required admin routes match `wireframes/wireframe-spec.json`.
- Every route has a placeholder page artifact.
- Fixture data includes articles, categories, profiles, media, comments, reviews, and contact submissions.
- The app shell includes public and admin navigation.

## Phase 0 Artifacts

- `src/routes.js`: public/admin route contract.
- `src/content/fixtures.js`: launch-shape fixture data.
- `src/app-shell.html`: browser-viewable public/admin shell.
- `src/pages/**/*.html`: route placeholders.
- `tests/scaffold.test.js`: route and fixture tests.

## Next.js Handoff

When dependencies are installed, convert this scaffold into:

- `app/page.tsx`
- `app/about/page.tsx`
- `app/creative-team/page.tsx`
- `app/contributors/page.tsx`
- `app/visceral-mag/page.tsx`
- `app/visceral-mag/[slug]/page.tsx`
- `app/search/page.tsx`
- `app/featured/page.tsx`
- `app/contact/page.tsx`
- `app/admin/**/page.tsx`

Keep `src/routes.js` or its TypeScript successor as the tested route source until Next.js route tests replace it.
