# Babas & Brasse Sprint Plan

Date: July 2, 2026
Launch deadline: July 31, 2026
Baseline: completed wireframe-backed prototype and Sprint 1 app shell and route smoke boundary, 214 passing tests after this slice.

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










