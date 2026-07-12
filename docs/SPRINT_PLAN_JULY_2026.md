# Babas & Brasse Sprint Plan

Date: July 2, 2026
Launch deadline: July 31, 2026
Baseline: completed wireframe-backed prototype and Sprint 3 production visual system and Live Route QA boundary, 391 passing tests after the admin-only browser-session slice.

## Sprint 0: Complete - Prototype Contract

Status: Complete as of July 2, 2026.

Delivered:

- Brief summary and compressed MVP scope.
- Complete Open Design wireframe handoff copied to `designs/open-design-wireframes/`.
- 14 core route artifacts.
- 8 support route/subflow artifacts.
- Local preview server via `npm.cmd run preview:mvp`.
- Route index at `http://localhost:4173/__routes`.
- Frontend app integration plan.
- Production app boundary doc and React-ready `apps/web` shell scaffold.

Exit proof:

- Full suite was green at 156 passing tests before this sprint-plan refresh.

## Sprint 1: July 3-7 - React Boundary And App Shell

Goal: establish the production React app boundary and migrate the shared shell without losing the tested prototype contract.

Scope:

- Confirm whether the production React app lives in this repository or a separate folder.
- Create the app scaffold only after the boundary is confirmed.
- Port route registry, public layout, admin layout, skip link, page shell, and navigation.
- Add route smoke tests for every public, admin, and support route.

TDD gates:

- Failing app-shell tests first.
- Route registry test covers all 22 public/admin/support paths.
- Prototype `npm.cmd test` remains green.

Exit criteria:

- App shell runs locally.
- Route smoke tests pass.
- Preview and production app commands are documented.

## Sprint 2: July 8-12 - Public MVP Routes

Goal: migrate public reader pages into React components.

Scope:

- Home
- About
- Creative Team
- Contributors
- Visceral Mag archive
- Article detail
- Search/categories
- Featured/Media
- Contact

TDD gates:

- Public route component tests.
- Published-only article listing tests.
- Article SEO/metadata tests.
- Contact form validation state tests.
- Mobile stacking checks for public routes.

Exit criteria:

- Public routes render from the migrated data contract.
- Draft content is hidden from public pages.
- Public mobile layouts do not overlap.

## Sprint 3: July 13-17 - Admin MVP Routes

Goal: migrate admin operations screens and subflows.

Scope:

- Admin dashboard
- Article management
- Profile/media management
- Comments/reviews moderation
- Contact submissions
- Media upload modal
- Article editor workflow

TDD gates:

- Protected-route placeholder tests.
- Admin table/card-row tests.
- Draft/publish workflow tests.
- Moderation approved-only public rule tests.
- Contact inbox state tests.

Exit criteria:

- Admin pages render with role-gated shell.
- Actions are present with confirmation-aware state contracts.
- Dense admin screens have mobile-safe layouts.

## Sprint 4: July 18-23 - Auth Persistence And Mutations

Goal: replace fixtures with provider-backed persistence and wire real actions.

Scope:

- Authentication integration.
- Articles, profiles, media, comments, reviews, contact submissions, and newsletter data adapters.
- Contact/newsletter form submission.
- Article save/autosave/preview/publish/unpublish/schedule/rollback.
- Media upload and metadata save.
- Moderation approve/reject/delete.

TDD gates:

- Mocked data adapter tests.
- Auth guard tests.
- Mutation validation tests.
- No-secret documentation checks.

Exit criteria:

- Admin routes require authentication.
- Mutations validate before write/send.
- Environment variable names are documented without secret values.

## Sprint 5: July 24-31 - Launch Readiness

Goal: finish QA, deployment, content, and rollback for the July 31, 2026 launch target.

Scope:

- Final content import and editorial review.
- Visual styling polish against Open Design.
- Accessibility QA.
- SEO QA.
- Playwright viewport checks.
- Deployment smoke checks.
- Backup/restore notes.
- Rollback runbook.

TDD gates:

- Route smoke tests.
- Accessibility checks.
- SEO checks.
- Viewport checks.
- Deployment smoke checklist.

Exit criteria:

- Launch readiness checklist is complete.
- Public routes, admin access, contact delivery, domain, SSL, and rollback path are verified.
- Go/no-go decision is documented before launch.

## Operating Rules

- Keep TDD gates ahead of implementation.
- Do not widen scope beyond MVP before July 31, 2026.
- Preserve the prototype as acceptance-contract evidence until production tests fully replace it.
- Update `docs/PLAN_STATUS.md` and `docs/TESTING_LOG.md` after every green slice.























## Figma-centered frontend sprint update - July 9, 2026

Goal: move the runnable MVP frontend closer to the final Figma Make design while keeping the 22-route MVP scope and no-duplicate-route decision intact.

Completed in this slice:

- Home route model now records `figma-author-website-design` as the active design source for the production homepage composition.
- Home route now follows the final design structure: featured article, recent grid, section rail, more-from-magazine list, media strip, people strip, and newsletter band.
- Public layout now includes the final-design footer while routing Theatre Reviews, Book Reviews, Essays, and Opinion through `/search` query URLs.

Next frontend sprint target:

- Carry the same Figma-centered article-card and editorial spacing system into Visceral Mag, Article Detail, Search, and Featured/Media.
- Then apply the quieter admin visual system to dashboard and management routes without changing the route registry.
## Figma public pages sprint update - July 9, 2026

Goal: carry the final Figma Make editorial system beyond Home into the main public reading and discovery surfaces without adding duplicate routes.

Completed in this slice:

- Added a shared Figma article-card component for public editorial cards.
- Applied the card and spacing system to Visceral Mag, Categories/Search, and Featured/Media.
- Gave Article Detail a centered editorial reading layout with hero image, metadata row, narrow body, related cards, and conversation sections.
- Kept the 22-route MVP route registry intact and preserved existing `data-section` contract hooks.

Next frontend sprint target:

- Apply the same Figma polish to About, Creative Team, Contributors, and Contact.
- Then bring the admin dashboard and management screens closer to a quiet operational UI while keeping auth/persistence work explicit.
## Figma info pages sprint update - July 9, 2026

Goal: carry the final Figma-inspired editorial system into the remaining public information pages before moving to admin polish.

Completed in this slice:

- Added a shared Figma profile-card component for Creative Team and Contributors.
- Applied Figma public-page layout classes to About, Creative Team, Contributors, and Contact.
- Added editorial info grids, route grids, profile grids, contact panels, inquiry chips, state grids, and newsletter panels while preserving existing route and `data-section` contracts.

Next frontend sprint target:

- Bring Admin Dashboard, Article Management, Profile/Media, Moderation, and Contact Submissions closer to a quiet operational interface.
- Keep auth and persistence as explicit follow-up work, not hidden frontend-only behavior.
## Figma admin pages sprint update - July 10, 2026

Goal: carry the final-design editorial discipline into the protected admin dashboard and management screens without changing the 22-route MVP registry or adding duplicate public category routes.

Delivered scope:

- Added a shared Figma admin surface for dashboard metrics and framed operational panels.
- Applied the admin visual layer to Dashboard, Article Management, Profile / Media Management, Comments / Reviews Moderation, and Contact Submissions.
- Preserved existing admin routes: `/admin`, `/admin/articles`, `/admin/profiles-media`, `/admin/moderation`, and `/admin/contact-submissions`.
- Kept final-design public section shortcuts routed through existing MVP paths instead of adding duplicate top-level category pages.

Verification target: 391 passing tests, successful Vite build, and all 22 MVP public/admin/support routes returning 200 in the live route smoke check.

## Figma support pages sprint update - July 10, 2026

Goal: bring the MVP support and subflow routes into the same Figma-centered frontend system as the public and admin screens while preserving the exact 22-route contract.

Delivered scope:

- Added a shared Figma support surface for auth, recovery, workflow, and mobile handoff pages.
- Applied final-design support panels to `/admin/login`, `/admin/password-reset`, `/404`, `/500`, `/offline`, `/admin/media/upload`, `/admin/articles/editor-workflow`, and `/mobile-wireframes`.
- Preserved the existing support route paths and avoided duplicate shortcut routes such as `/login`, `/reset-password`, or `/media-upload`.
- Kept auth, recovery, accessibility, modal focus, editor workflow, and mobile handoff state contracts intact.

Verification target: 391 passing tests, successful Vite build, all 22 MVP public/admin/support routes returning 200, and browser QA for at least one converted support route.

## Figma browser QA matrix sprint update - July 10, 2026

Goal: turn the final frontend handoff's screenshot requirement into a reusable verification command and durable route/viewport evidence.

Delivered scope:

- Added a headless Chrome/Edge screenshot capture script for the critical Figma-centered route matrix.
- Covered Home, Visceral Mag, Article Detail, Search, Featured, Contact, and Admin Dashboard at desktop and mobile viewport sizes.
- Preserved the 22-route MVP registry and the no-duplicate public shortcut route decision.
- Recorded browser QA outputs under `apps/web/browser-qa/figma-viewport-matrix/`.

Verification target: 391 passing tests, successful Vite build, all 22 MVP routes returning 200, and 14 desktop/mobile screenshots captured from the running app.

## Figma screenshot integrity sprint update - July 10, 2026

Goal: make the desktop/mobile screenshot evidence verifiable instead of only checking that files exist.

Delivered scope:

- Added a dependency-free PNG integrity checker for `apps/web/browser-qa/figma-viewport-matrix/`.
- Validates PNG signatures, desktop/mobile dimensions, and minimum file sizes for all 12 Figma browser QA captures.
- Registered `qa:web:screenshots:check` so regenerated screenshots can be verified before frontend sign-off.
- Preserved the 22-route MVP registry and no-duplicate route decision.

Verification target: 391 passing tests, successful screenshot integrity check, successful Vite build, and all 22 MVP routes returning 200.

## Figma SEO metadata sprint update - July 10, 2026

Goal: make the Figma-centered frontend search/share-ready by adding route-level browser metadata without changing the 22-route MVP registry.

Delivered scope:

- Added a pure route metadata helper for public, admin, support, and dynamic article detail routes.
- Added a React head updater for document title, meta description, robots, canonical URL, Open Graph, and Twitter card tags.
- Preserved draft/private article safety with `noindex,follow` metadata for unavailable article slugs.
- Kept final-design section shortcuts mapped into existing MVP routes instead of creating duplicate category routes.

Verification target: 391 passing tests, successful Vite build, all 22 MVP routes returning 200, and screenshot integrity still passing.


## Final design ZIP adoption sprint update - July 10, 2026

Delivered scope:

- Accepted Author Website Design.zip as the final visual source of truth.
- Preserved the complete runnable design entry/config files under the Figma source archive.
- Confirmed the ZIP UI source is semantically identical to the reconstructed Figma component/page/theme source.
- Added the exported collapsible mobile navigation behavior to the live MVP.
- Preserved one canonical 22-route registry and search-based editorial aliases.

Verification target: 391 passing tests, successful Vite build, 22 live route responses, and refreshed desktop/mobile screenshot integrity.

## Launch discovery and Lighthouse sprint update - July 10, 2026

Delivered scope:

- Mobile Lighthouse audit against the live final-design Home route.
- Valid robots.txt and sitemap.xml discovery files.
- llms.txt magazine and canonical-reader-route discovery file.
- Brand-link accessible-name correction from the audit.
- Test target raised to 391 passing tests.
## Public form interaction sprint update - July 11, 2026

Delivered frontend scope:

- Shared API-ready public form client.
- Reusable newsletter interaction on Home, About, and Contact.
- Contact validation, pending, success, and retry feedback.
- Article comments submit into a pending moderation state and never render publicly before approval.
- Accessible live regions and disabled submitting controls.
- Current verification target: 391 passing tests, production build, live routes, browser form checks, and screenshot integrity.

Backend boundary:

- Production API endpoints still need server-side persistence, spam protection, email confirmation, rate limiting, and moderation storage.

## True Figma Parity Sprint Update - July 11, 2026

The frontend is now migrating against the final Figma export as the visual source of truth. React 18 remains the application runtime; Vite is aligned to patched 7.3.6 for Tailwind 4 plugin compatibility. React Router owns client navigation while `apps/web/src/routes.js` remains the single canonical route registry, preventing duplicate category routes.

Current implementation slice:
- Figma technology stack and shared primitives
- Figma editorial header, search, mobile navigation, and footer
- Final Figma Home composition
- Existing public, admin, and support page behavior preserved for progressive parity work

The next parity slices are discovery/article detail, information/contact pages, then admin/support surfaces. Each slice keeps focused red-green tests, build verification, 22-route smoke checks, screenshot refreshes, and accessibility review.


Security compatibility note:
- The final Figma export originally used Vite 6. The runnable app now uses patched Vite 7.3.6 because it remains compatible with Tailwind 4 and clears the July 2026 Vite development-server advisories.
- React Router is patched to 7.18.1. Current npm audit result: 0 vulnerabilities.

### Figma-Only Public Runtime Cleanup - Complete

- Replaced the boxed MVP canvas with page-scoped Figma containers.
- Removed global section and article card styling that warped nested Figma content.
- Connected section navigation to live query filters and independent active states.
- Preserved the route registry and avoided duplicate category routes.
- Verification target achieved: 391 tests, production build, zero audit findings, 22 route responses, and desktop/mobile browser geometry checks.

### Persistent Public API Slice - Complete

- Added the first real backend and persistent storage boundary.
- Connected newsletter, contact, and comment forms without changing their Figma interaction states.
- Preserved approved-only public comment rendering.
- Documented production security and deployment work that remains.
- Verification target achieved: 391 tests, live browser submissions, restart persistence, and moderation-safe comment status.
