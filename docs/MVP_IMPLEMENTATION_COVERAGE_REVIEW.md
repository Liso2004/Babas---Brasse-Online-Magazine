# MVP Implementation Coverage Review

Date: July 2, 2026
Deadline target: July 31, 2026
Verification baseline: `npm.cmd test` at 119 passing tests before this review slice.

## Summary

The Babas & Brasse wireframe-backed prototype now covers 14 core route artifacts: 9 public routes and 5 admin routes. Each core route has a generated HTML artifact, a renderer contract, fixture-backed behavior, and a focused test file wired into the full suite.

This is not the final production app yet. It is the tested implementation contract for the MVP: the screen scope, data shape, route behavior, accessibility hooks, public/admin state requirements, and admin workflows are now explicit enough to move into frontend app integration.

## Implemented Public Routes

- `/` Home
- `/about` About
- `/creative-team` Creative Team
- `/contributors` Contributors
- `/visceral-mag` Visceral Mag / Articles
- `/visceral-mag/send-a-text-before-you-knock` Article Detail
- `/search` Categories / Search
- `/featured` Featured / Media
- `/contact` Contact

Public coverage includes published-only article listing, article detail SEO and public moderation rules, search/category filtering, media metadata, people/profile pages, contact form contract, newsletter/footer continuity, loading/empty/error states where required, and final Open Design wireframe handoff references.

## Implemented Admin Routes

- `/admin` Admin Dashboard
- `/admin/articles` Article Management
- `/admin/profiles-media` Profile / Media Management
- `/admin/moderation` Comments / Reviews Moderation
- `/admin/contact-submissions` Contact Submissions

Admin coverage includes authenticated route contracts, dashboard health metrics, article draft/publish workflow, profile and media readiness, comments/reviews moderation, approved-only public rendering policy, contact inbox triage, destructive/confirmation-aware actions, and permission-denied states.

## Verified Test Coverage

Current full-suite expectation after the admin-only browser-session slice: 391 passing tests, 0 failing tests.

Coverage is organized as:

- Wireframe and Open Design import contracts
- Route scaffold and fixture contracts
- Focused public route behavior tests
- Focused admin route behavior tests
- MVP implementation coverage/readiness tests

## Implemented Support Routes

The prototype now includes 8 implemented support routes:

- `/admin/login` Admin Login
- `/admin/password-reset` Password Reset
- `/404` 404 Not Found
- `/500` 500 Server Error
- `/offline` Offline / Maintenance
- `/admin/media/upload` Media Upload Modal
- `/admin/articles/editor-workflow` Article Editor Workflow
- `/mobile-wireframes` Mobile Wireframe Comps

Support coverage includes labelled auth forms, recovery paths, neutral password-reset copy, invalid/locked/loading/redirect states, token/password validation states, role check, session expiry, CSRF, audit logging, token expiry, rate limit handoff notes, shared public recovery nav, plain-language error messages, retry/refresh actions, minimal error-state footers, media upload focus-trap and metadata requirements, article editor draft/media/SEO/review/publish workflow states, and mobile public/admin responsive handoff rules.

## Remaining Launch Gaps
The following items are not complete production behavior yet and must be handled before the July 31, 2026 launch target:

- Frontend app integration: move the tested static renderer contracts into the selected frontend stack, with routing, shared layout, reusable components, and responsive styling.
- Authentication hardening: the admin login, cookie session, and route protection are live; add password reset delivery, credential hashing or managed identity, rate limits, and audit logging.
- Backend persistence: replace fixture data with durable storage for articles, profiles, media, comments, reviews, and contact submissions.
- Visual styling: translate the Open Design visual system into production CSS/components instead of leaving the prototype as contract-first HTML.
- React/Vite runtime: dependencies now install and the app builds, but live route smoke is available while browser visual QA remains in progress.
- Forms and mutations: public newsletter, contact, and comment forms now have API-ready frontend states; connect their endpoints plus article saves, media uploads, moderation actions, and archive/read status changes to persistent services.
- Launch readiness: add deployment, backups, content import, analytics, accessibility QA, SEO QA, smoke tests, and rollback notes.

## Recommended Next Phase

1. Confirm whether the production React app lives in this repository or a separate app folder.
2. Build shared layout/navigation/components from the tested route contracts.
3. Add authentication and persistence behind the admin flows.
4. Run visual QA against the Open Design wireframes and production responsive breakpoints.
