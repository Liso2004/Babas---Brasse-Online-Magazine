# Archived Babas & Brasse MVP Implementation Roadmap

Date: July 2, 2026
Launch deadline: July 31, 2026
Current design source: complete Open Design wireframe handoff in `designs/open-design-wireframes/`
Current prototype source: generated route artifacts in `src/pages/`
Current verification: 428 passing tests, production Vite build green, and 16 desktop/mobile screenshot integrity checks green as of July 13, 2026.

## Current MVP Status

The compressed MVP planning and wireframe contract phase is complete.

Completed as of July 2, 2026:

- 14 core route artifacts are generated and tested.
- 9 public routes are covered: `/`, `/about`, `/creative-team`, `/contributors`, `/visceral-mag`, `/visceral-mag/:slug`, `/search`, `/featured`, `/contact`.
- 5 admin routes are covered: `/admin`, `/admin/articles`, `/admin/profiles-media`, `/admin/moderation`, `/admin/contact-submissions`.
- 8 support routes and subflows are covered: `/admin/login`, `/admin/password-reset`, `/404`, `/500`, `/offline`, `/admin/media/upload`, `/admin/articles/editor-workflow`, `/mobile-wireframes`.
- Open Design wireframes are copied locally and validated at 23 screens.
- The local MVP preview runs with `npm.cmd run preview:mvp`.
- Preview route index: `http://localhost:4173/__routes`.
- Frontend app integration planning is documented in `docs/FRONTEND_APP_INTEGRATION_PLAN.md`.
- Production app boundary is documented in `docs/PRODUCTION_APP_BOUNDARY.md` and scaffolded at `apps/web`.

This is still not the final production app. It is the tested implementation contract for building the production React app quickly and safely.

## Delivery Rule

Every implementation slice still follows the same TDD loop:

1. Update the relevant plan or roadmap document.
2. Write the failing test first.
3. Implement the smallest useful change.
4. Run focused tests.
5. Run the full suite.
6. Record the result in `docs/TESTING_LOG.md` and `docs/PLAN_STATUS.md`.

## Stack Direction

Target production frontend: React.

React production app boundary must be confirmed before scaffolding. The next decision is whether the production app lives in this repository or in a separate app folder. Do not create a new React app inside this prototype until that boundary is confirmed.

Recommended production stack remains:

- React frontend, ideally Next.js + TypeScript if server-rendered editorial SEO is required.
- Component tests and route smoke tests from the existing prototype contracts.
- Backend persistence for articles, profiles, media, comments, reviews, contact submissions, and newsletter signups.
- Auth-protected admin routes.
- Media storage with required title, caption, credit, alt text, usage, and publish-readiness metadata.
- Email/spam protection for contact/newsletter flows.

## Updated Production Roadmap

### Phase A: Boundary And App Shell

Target window: Sprint 1, July 3-7.

TDD targets:

- Production app folder/repo boundary is documented.
- Route registry maps all public, admin, and support routes.
- Public layout and admin layout render navigation and shell landmarks.
- Existing generated prototype remains runnable during migration.

Deliverables:

- Production React scaffold in the confirmed location.
- Shared route registry.
- App shell, public layout, admin layout.
- Preview/development commands documented.

Exit criteria:

- Route smoke tests pass.
- App shell renders locally.
- `npm.cmd test` in this prototype remains green.

### Phase B: Public React Routes

Target window: Sprint 2, July 8-12.

TDD targets:

- Home, About, Creative Team, Contributors, Visceral Mag, Article Detail, Search, Featured/Media, and Contact render from the migrated data contract.
- Published-only rules are preserved.
- Article SEO metadata is represented.
- Contact form states are covered before API wiring.

Deliverables:

- Public route components.
- Article cards, profile cards, media figures, category chips, state panels, public forms.
- Mobile stacking rules from `/mobile-wireframes`.

Exit criteria:

- Public route tests pass.
- Public route smoke checks pass on desktop and mobile widths.

### Phase C: Admin React Routes

Target window: Sprint 3, July 13-17.

TDD targets:

- Admin dashboard, article management, profile/media management, moderation, and contact submissions render behind an auth boundary placeholder.
- Admin tables collapse to mobile-safe card rows.
- Media upload modal and article editor workflow remain reachable as subflows.

Deliverables:

- Admin route components.
- Tables, forms, modals, queue/detail split views, confirmation-aware actions.
- Admin state panels for loading, empty, error, permission denied, and mutation states.

Exit criteria:

- Admin route tests pass.
- Draft content remains hidden from public output.
- Approved-only public comments/reviews rule is preserved.

### Phase D: Auth Persistence And Mutations

Target window: Sprint 4, July 18-23.

TDD targets:

- Auth guard denies protected admin routes without an editor session.
- Data access adapters cover articles, profiles, media, comments, reviews, contact submissions, and newsletter signups.
- Mutations validate data before write/send.
- Media metadata requires alt text before public use.

Deliverables:

- Auth integration.
- Persistence adapter.
- Contact/newsletter submission handlers.
- Article save/autosave/preview/publish/unpublish/schedule/rollback actions.
- Media upload/metadata save actions.
- Moderation approve/reject/delete actions.

Exit criteria:

- Mocked API and mutation tests pass.
- No secrets are committed.
- Required environment variable names are documented without values.

### Phase E: QA Launch And Rollback

Target window: Sprint 5, July 24-31.

TDD and QA targets:

- SEO metadata and Open Graph fields pass checks.
- Accessibility checks cover labels, focus order, touch targets, error messaging, and no text overlap.
- Playwright viewport checks cover 360, 390, 430, tablet, and desktop widths.
- Deployment smoke checks pass.
- Rollback steps are documented.

Deliverables:

- Launch checklist.
- Sitemap/robots if using Next.js or equivalent route metadata.
- Deployment smoke script or checklist.
- Backup/restore notes.
- Rollback runbook.
- Final content QA pass.

Exit criteria:

- Production preview passes smoke checks.
- Domain, SSL, admin access, contact delivery, and critical public routes are verified.
- Launch go/no-go is documented before July 31, 2026.

## Current Risks

- The React/Vite and Node production boundary is implemented, but a managed hosting target and environment owner are not confirmed.
- Durable managed editorial storage, object storage, encrypted backup/restore, monitoring, and rollback still need deployment evidence.
- Brand assets, final launch articles, profile bios, production media, social URLs, legal copy, and licensed Sabon files still need client approval.
- Domain, DNS, TLS termination, trusted-proxy behavior, and contact email delivery are not yet proven on staging.
- In-memory rate limits are appropriate for the current single-service runtime; horizontal scaling requires a shared limiter store.
- The deadline leaves little room for post-launch features.

## Deferred Until After MVP Launch

- Public user accounts.
- Paid subscriptions or gated content.
- Likes/bookmarks/personalization.
- Newsletter campaign tooling beyond signup capture.
- Advanced analytics dashboards.
- Native mobile app.
- Large multimedia expansion.


## Production Report Realignment - July 13, 2026

The active production roadmap is now `docs/PRODUCTION_RELEASE_PLAN_JULY_2026.md`, governed by root `DESIGN.md` and `docs/BABAS_BRASSE_REPORT_REVIEW_JULY_2026.md`.

The report review confirms the current React/Vite and Node stack. No framework rewrite is required. Remaining roadmap work is:

1. Preserve the completed profile, public book-rating review, and admin search/filter/delete workflows; finish article feature control, verified social navigation, binary image upload, email delivery, and structured metadata.
2. Preserve the completed one-origin runtime, rate limits, and structured logs; complete deployment-managed storage, object storage, backups, TLS, staging, monitoring, and rollback evidence.
3. Replace provisional content and imagery with approved launch material, including credits, social URLs, canonical domain, legal/contact copy, and licensed Sabon.
4. Pass the production design, accessibility, cross-browser, content, security, data, and deployment gates by July 31, 2026.
