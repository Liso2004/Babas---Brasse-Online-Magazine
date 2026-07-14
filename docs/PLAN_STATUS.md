# Plan Status

Date: June 30, 2026

## Completed

- Decoded and summarized the Babas & Brasse roadmap PDF.
- Created compressed MVP design/build plan for July 31, 2026 launch.
- Confirmed Open Design MCP tools are visible but live daemon calls return `fetch failed`.
- Created TDD workflow documentation.
- Created MVP screen scope documentation.
- Created wireframe plan documentation.
- Created machine-readable wireframe screen specification.
- Wrote wireframe contract tests before implementation.
- Confirmed the intended red test state.
- Implemented first browser-viewable low-fidelity wireframe artifact.
- Reached green test state with `npm.cmd test`.

## Active Decision

Use the local tested wireframe artifact as the design source until Open Design reconnects.

## Next Action

Start the frontend implementation plan with TDD, beginning from public route/component scaffold tests and then the Home, article listing, and article detail slices.

## Phase 0 Progress - June 30, 2026

Completed:

- Added dependency-light frontend scaffold plan.
- Added route map matching the wireframe specification.
- Added fixture content for launch-shape MVP entities.
- Added app shell artifact with public and admin navigation.
- Added route placeholder files for all public and admin routes.
- Added scaffold tests.
- Full suite is green at 10 passing tests.

Next active slice:

- Phase 1 Home page behavior test and implementation.

## Phase 1 Home Slice - June 30, 2026

Completed:

- Added Phase 1 public shell plan.
- Added Home page behavior tests.
- Added Home renderer using launch fixture data.
- Updated Home page artifact with lead story, latest articles, category access, media preview, and people preview.
- Confirmed Home reader-facing sections exclude draft articles.
- Full suite is green at 14 passing tests.

Next active slice:

- Visceral Mag article listing behavior test and implementation.

## Phase 2 Visceral Mag Listing - June 30, 2026

Completed:

- Added Phase 2 article discovery plan.
- Added Visceral Mag listing behavior tests.
- Added Visceral Mag renderer using launch fixture data.
- Updated Visceral Mag page artifact with article listing, search entry, and category filters.
- Confirmed public archive excludes draft articles.
- Full suite is green at 19 passing tests.

Next active slice:

- Article detail behavior test and implementation.

## Phase 2 Article Detail - June 30, 2026

Completed:

- Added Phase 2 article detail plan.
- Added Article Detail behavior tests.
- Added Article Detail renderer using launch fixture data.
- Updated Article Detail page artifact with metadata, body, related articles, comments, reviews, and SEO fields.
- Confirmed draft and missing articles return a public not-found state.
- Confirmed comments/reviews are approved-only in public output.
- Full suite is green at 26 passing tests.

Next active slice:

- Categories/Search behavior test and implementation.

## Open Design Wireframe Import - July 1, 2026

Completed:

- Imported `C:\Users\CASH\Downloads\Wireframe-Annotated.zip` into `open-design-import/`.
- Confirmed the export contains one annotated landing/home wireframe screen.
- Added `docs/OPEN_DESIGN_WIREFRAME_IMPORT.md` to capture the OD visual contract.
- Added `tests/open-design-import.test.js` to verify the imported files, manifest, annotated HTML contract, and critique score.
- Full suite is green at 30 passing tests.

Implementation impact:

- Use the OD export as the Home/Landing visual contract.
- Keep the existing multi-route MVP scaffold as the functional route contract.
- Add Home visual refinement, newsletter/footer states, and search state tests before implementing those details.

## Home Open Design Implementation - July 1, 2026

Completed:

- Added `docs/OPEN_DESIGN_PROMPT_REMAINING_WIREFRAMES.md` for generating the remaining MVP wireframes in Open Design.
- Added `tests/home-open-design.test.js`.
- Updated Home renderer with the imported OD landing contract.
- Updated Home page artifact with sticky-nav contract, B&B mark, five editorial links, search, subscribe, theatre hero, section rail, recent article teasers, newsletter/footer, responsive notes, and state handoff notes.
- Full suite is green at 36 passing tests.

Next active slice:

- Categories/Search behavior test and implementation, unless a new Open Design export arrives for another screen first.

## Phase 2 Categories/Search - July 1, 2026

Completed:

- Added Phase 2 Categories/Search plan.
- Added Categories/Search behavior tests.
- Added Categories/Search renderer and filter helpers.
- Updated Categories/Search page artifact with search form, category filters, active filters, published-only results, no-results state, and reset affordance.
- Confirmed keyword search and category filtering exclude draft content.
- Full suite is green at 43 passing tests.

Next active slice:

- Featured / Media page behavior test and implementation, unless a new Open Design export arrives for another screen first.

## Phase 2 Featured/Media - July 1, 2026

Completed:

- Added Phase 2 Featured/Media plan.
- Added Featured/Media behavior tests.
- Added Featured/Media renderer and helper functions.
- Updated Featured/Media page artifact with gallery intro, media cards, captions, credits, alt text, published article media links, and empty media state.
- Confirmed draft articles are excluded from public media story links.
- Full suite is green at 49 passing tests.

Next active slice:

- About page behavior test and implementation, then Creative Team and Contributors profile pages.

## Final Open Design Wireframe Handoff - July 1, 2026

Completed:

- Copied the complete Open Design wireframe project into `designs/open-design-wireframes/`.
- Added `docs/FINAL_OPEN_DESIGN_WIREFRAME_HANDOFF.md` to map every wireframe file to the MVP route scope.
- Added final wireframe validation tests in `tests/final-open-design-wireframes.test.js`.
- Confirmed the copied wireframe folder validates itself: 15 screens, 9 public routes, 5 admin routes.
- Confirmed the main project suite is green at 54 passing tests.

Preview:

- Open `designs/open-design-wireframes/mvp-wireframes.html` directly, or run `npm.cmd run preview` inside `designs/open-design-wireframes/` and visit `http://localhost:4173/mvp-wireframes.html`.

Next active slice:

- Use the final wireframes as the design source for implementing About, Creative Team, Contributors, Contact, and then the admin dashboard screens in the production prototype.

## Phase 3 About - July 2, 2026

Completed:

- Added Phase 3 About plan from the final Open Design wireframe handoff.
- Added About behavior tests.
- Added About renderer and generated About page artifact.
- Preserved the wireframe sections: shared nav, Mission, Vision, Organisation, editorial pillars, route cards, and newsletter footer.
- Full suite is green at 60 passing tests.

Next active slice:

- Creative Team page behavior test and implementation from `designs/open-design-wireframes/creative-team.html`.

## Phase 3 Creative Team - July 2, 2026

Completed:

- Added Phase 3 Creative Team plan from the final Open Design wireframe handoff.
- Added Creative Team behavior tests.
- Added Creative Team renderer and generated Creative Team page artifact.
- Preserved the wireframe sections: shared nav, team intro, editorial role note, profile grid, state strip, and footer paths.
- Confirmed the route renders only `creative_team` profiles and keeps contributor profiles out of this public page.
- Full suite is green at 66 passing tests.

Next active slice:

- Contributors page behavior test and implementation from `designs/open-design-wireframes/contributors.html`.

## Support Wireframe Expansion - July 2, 2026

Completed:

- Added eight missing support wireframes before continuing production implementation: Admin Login, Password Reset, 404, 500, Offline/Maintenance, Media Upload Modal, Article Editor Workflow, and Mobile Wireframe Comps.
- Added matching artifact metadata for each support screen.
- Updated the final route overview to link all support screens.
- Updated final design handoff docs and validators.
- Confirmed the wireframe folder validates at 23 screens: 9 public routes, 5 admin routes, 8 support screens.
- Confirmed the main project suite is green at 67 passing tests.

Next active slice:

- Continue production prototype implementation from the final wireframes, starting with Contributors.

## Phase 3 Contributors - July 2, 2026

Completed:

- Added Phase 3 Contributors plan from the final Open Design wireframe handoff.
- Added Contributors behavior tests.
- Added Contributors renderer and generated Contributors page artifact.
- Preserved the wireframe sections: shared nav, search/filter toolbar, contributor grid, published works table, and state strip.
- Confirmed the route renders only contributor profiles and excludes creative team profiles.
- Confirmed published works exclude draft articles.
- Full suite is green at 74 passing tests.

Next active slice:

- Contact page behavior test and implementation from `designs/open-design-wireframes/contact.html`.

## Phase 3 Contact - July 2, 2026

Completed:

- Added Phase 3 Contact plan from the final Open Design wireframe handoff.
- Added Contact behavior tests.
- Added Contact renderer and generated Contact page artifact.
- Preserved the wireframe sections: shared nav, contact intro, social/info panel, public contact form, state strip, and footer/newsletter continuity.
- Confirmed form contract includes name, email, subject, message, spam protection placeholder, and Contact Submissions admin target.
- Confirmed validation, success, submit error, rate-limit, and pending duplicate-submit states are represented.
- Full suite is green at 81 passing tests.

Next active slice:

- Admin Dashboard behavior test and implementation from `designs/open-design-wireframes/admin-dashboard.html`.

## Phase 4 Admin Dashboard - July 2, 2026

Completed:

- Added Phase 4 Admin Dashboard plan from the final Open Design wireframe handoff.
- Added Admin Dashboard behavior tests.
- Added Admin Dashboard renderer and generated Admin Dashboard page artifact.
- Preserved the wireframe sections: admin nav, dashboard stats, recent activity, quick actions, and dashboard states.
- Confirmed dashboard metrics are fixture-derived: published articles, drafts, pending comments, pending reviews, and new contact submissions.
- Confirmed permission-denied state links to Admin Login.
- Full suite is green at 88 passing tests.

Next active slice:

- Article Management behavior test and implementation from `designs/open-design-wireframes/article-management.html`.

## Phase 4 Article Management - July 2, 2026

Completed:

- Added Phase 4 Article Management plan from the final Open Design wireframe handoff.
- Added Article Management behavior tests.
- Added Article Management renderer and generated Article Management page artifact.
- Preserved the wireframe sections: admin nav, article toolbar, article table, editor form, and publishing state strip.
- Confirmed admin includes all fixture articles, including drafts hidden from public reader pages.
- Confirmed toolbar coverage for search, status, category, SEO readiness, and create article action.
- Confirmed editor form includes content, media, alt text, SEO, and Open Graph fields.
- Full suite is green at 95 passing tests.

Next active slice:

- Profile / Media Management behavior test and implementation from `designs/open-design-wireframes/profile-media-management.html`.

## Phase 4 Profile / Media Management - July 2, 2026

Completed:

- Added Phase 4 Profile / Media Management plan from the final Open Design wireframe handoff.
- Added Profile / Media Management behavior tests.
- Added Profile / Media Management renderer and generated page artifact.
- Preserved the wireframe sections: admin nav, profile management, media library, upload/select flow, and profile/media state strip.
- Confirmed profile rows include contributors and Creative Team profiles with status, role, completeness, and edit actions.
- Confirmed media rows include image metadata, alt text, caption, credit, category, usage, and publish readiness.
- Confirmed upload/select form includes file input, keyboard fallback, alt text, caption, credit, and category fields.
- Full suite is green at 103 passing tests.

Next active slice:

- Comments / Reviews Moderation behavior test and implementation from `designs/open-design-wireframes/comments-reviews-moderation.html`.

## Phase 4 Comments / Reviews Moderation - July 2, 2026

Completed:

- Added Phase 4 Comments / Reviews Moderation plan from the final Open Design wireframe handoff.
- Added Comments / Reviews Moderation behavior tests.
- Added Comments / Reviews Moderation renderer and generated page artifact.
- Preserved the wireframe sections: admin nav, moderation queues, queue workspace, selected-item panel, moderation actions, and moderation states.
- Confirmed comments and reviews combine into one queue with article context, author, type, status, and body.
- Confirmed queue controls support search plus status, type, article, and date filters.
- Confirmed approve, reject, and confirmation-aware delete actions are represented.
- Confirmed approved-only public rendering, undo, error, pending, and permission states are documented in the screen contract.
- Full suite is green at 111 passing tests.

Next active slice:

- Contact Submissions behavior test and implementation from `designs/open-design-wireframes/contact-submissions.html`.

## Phase 4 Contact Submissions - July 2, 2026

Completed:

- Added Phase 4 Contact Submissions plan from the final Open Design wireframe handoff.
- Added Contact Submissions behavior tests.
- Added Contact Submissions renderer and generated page artifact.
- Preserved the wireframe sections: admin nav, submissions filter, inbox/detail split, status actions, and inbox states.
- Confirmed submission rows include sender, email, subject, message, status, received date, and reply path.
- Confirmed inbox controls support search plus status, subject, sender email, and received date filters.
- Confirmed new submission count, mark-read, archive, reply, loading, empty, archive success, error, and permission states are represented.
- Full suite is green at 119 passing tests.

Next active slice:

- Review admin/public implementation coverage, then start support screens or frontend app integration planning from the completed wireframe-backed prototype.

## MVP Implementation Coverage Review - July 2, 2026

Completed:

- Added MVP implementation coverage/readiness test.
- Added `docs/MVP_IMPLEMENTATION_COVERAGE_REVIEW.md`.
- Confirmed all 14 core route artifacts are generated and no longer Phase 0 placeholders.
- Confirmed the implemented route scope covers 9 public routes and 5 admin routes.
- Confirmed all core route renderers and focused test scripts are registered.
- Confirmed support wireframes remain available but are not silently claimed as production prototype pages.
- Full suite is green at 123 passing tests.

Next active slice:

- Start support screen implementation with TDD, beginning with Admin Login and Password Reset, or create the frontend app integration plan if the production stack decision comes first.

## Phase 5 Auth Support Screens - July 2, 2026

Completed:

- Added Phase 5 Auth Support Screens plan from the final Open Design support wireframes.
- Added Admin Login and Password Reset behavior tests.
- Added shared auth support renderer and generated support page artifacts.
- Implemented `/admin/login` with labelled email/password fields, sign-in action, forgot-password path, public return path, invalid/locked/loading/redirect states, and security handoff notes.
- Implemented `/admin/password-reset` with request step, neutral confirmation copy, token confirmation step, password strength guidance, return-to-login path, token expiry/rate limit notes, and reset states.
- Updated MVP coverage review so auth support routes are marked implemented while 404, 500, Offline/Maintenance, Media Upload Modal, Article Editor Workflow, and Mobile Wireframe Comps remain tracked gaps.
- Full suite is green at 130 passing tests.

Next active slice:

- Continue support screen implementation with TDD, starting with 404, 500, and Offline/Maintenance.

## Phase 5 Error Support Screens - July 2, 2026

Completed:

- Added Phase 5 Error Support Screens plan from the final Open Design support wireframes.
- Added 404, 500, and Offline/Maintenance behavior tests.
- Added shared error support renderer and generated support page artifacts.
- Implemented `/404`, `/500`, and `/offline` with shared public nav, recovery routes, plain-language copy, minimal footer, and required state notes.
- Updated MVP coverage review so 5 support routes are marked implemented while Media Upload Modal, Article Editor Workflow, and Mobile Wireframe Comps remain tracked gaps.
- Full suite is green at 137 passing tests.

Next active slice:

- Continue support screen implementation with TDD, starting with Media Upload Modal and Article Editor Workflow.

## Phase 5 Admin Workflow Support Screens - July 2, 2026

Completed:

- Added Phase 5 Admin Workflow Support plan from the final Open Design support wireframes.
- Added Media Upload Modal and Article Editor Workflow behavior tests.
- Added shared admin workflow support renderer and generated admin page artifacts.
- Implemented `/admin/media/upload` as a role-protected modal contract with drop zone, preview, required metadata, focus trap, Escape close, focus return, save draft metadata, insert media, cancel, and upload state notes.
- Implemented `/admin/articles/editor-workflow` as a role-protected editor workflow contract with Draft, Media, SEO, Review, Publish steps, body editor, featured media, readiness checklist, SEO review, preview, schedule/publish, autosave, validation, and rollback state notes.
- Updated MVP coverage review so 7 support routes are marked implemented while Mobile Wireframe Comps remain the only support-screen gap.
- Full suite is green at 144 passing tests.

Next active slice:

- Continue support screen implementation with TDD, starting with Mobile Wireframe Comps, then move into frontend app integration planning.

## Phase 5 Mobile Wireframe Comps - July 2, 2026

Completed:

- Added Phase 5 Mobile Wireframe Comps plan from the final Open Design support wireframe.
- Added Mobile Wireframe Comps behavior tests.
- Added mobile wireframe comps renderer and generated support page artifact.
- Implemented `/mobile-wireframes` with compressed mobile nav, public Home / Article / Search / Contact mobile comps, admin Dashboard / Editor / Moderate / Inbox mobile comps, 360 / 390 / 430 / tablet breakpoint handoff, and mobile accessibility checks.
- Updated MVP coverage review so all 8 support wireframes are now implemented as generated prototype contracts.
- Full suite is green at 151 passing tests.

Next active slice:

- Start frontend app integration planning from the completed wireframe-backed prototype contracts.

## Frontend App Integration Plan - July 2, 2026

Completed:

- Added frontend app integration plan from the completed wireframe-backed prototype contracts.
- Added focused frontend integration plan tests and registered `test:frontend-plan`.
- Captured the production stack boundary: React is the target, but this prototype should not be buried under a new React scaffold until the app folder/repo boundary is confirmed.
- Mapped all 9 public routes, 5 admin routes, and 8 support routes/subflows into the production migration plan.
- Defined component migration slices for app shell, public layout, admin layout, route registry, cards, forms, tables, modals, state panels, and mobile breakpoint rules.
- Documented API, authentication, backend persistence, mutation queue, TDD gates, accessibility, SEO, Playwright viewport checks, deployment smoke, and rollback requirements.
- Updated MVP coverage baseline to 156 passing tests.

Next active slice:

- Confirm the production React app boundary, then start the shared app shell / route registry / layout migration under TDD.

## Sprint Plan Refresh - July 2, 2026

Completed:

- Reviewed and refreshed `docs/IMPLEMENTATION_PLAN_JULY_2026.md` from the stale June 30 roadmap into the current production integration roadmap.
- Added `docs/SPRINT_PLAN_JULY_2026.md` with Sprint 0 complete and Sprint 1-5 windows through the July 31, 2026 launch target.
- Updated `docs/FRONTEND_SCAFFOLD_PLAN.md` to mark the prototype scaffold complete and point to React production migration.
- Updated `docs/OPEN_DESIGN_STATUS.md` to reflect the complete local Open Design wireframe handoff while preserving the historical `fetch failed` MCP note.
- Added `tests/roadmap-sprint-docs.test.js` and registered `test:roadmap-sprints`.
- Updated coverage baseline to 161 passing tests.

Next active slice:

- Confirm the production React app boundary, then start Sprint 1: shared app shell / route registry / layout migration under TDD.

Roadmap refresh verification:

- Focused roadmap/sprint docs test is green.
- Full suite is green at 161 passing tests, 0 failing tests.

## Sprint 1 App Shell Boundary - July 5, 2026

Completed:

- Added `docs/PRODUCTION_APP_BOUNDARY.md` documenting `apps/web` as the production React app boundary.
- Added focused app-shell contract tests in `tests/production-app-shell.test.js` and registered `test:app-shell`.
- Created the dependency-light React-ready scaffold under `apps/web` without installing packages.
- Added route registry coverage for all 22 public, admin, and support paths.
- Added public and admin layout shells with navigation, skip links, and auth-required handoff metadata.
- Updated roadmap, sprint plan, and coverage baseline to 214 passing tests.

Next active slice:

- Continue Sprint 1 by adding route smoke/component tests around the `apps/web` shell, then install dependencies only after approval.

## Sprint 1 Route Smoke Gate - July 5, 2026

Completed:

- Added `tests/production-route-smoke.test.js` and registered `test:route-smoke`.
- Added dependency-free route smoke records in `apps/web/src/routeSmoke.js`.
- Updated `apps/web/src/routes.js` so dynamic article paths resolve through the shell before a router dependency is installed.
- Updated app handoff docs and coverage baseline to 214 passing tests.

Next active slice:

- Add the first migrated public React route/component contract inside `apps/web`, then install dependencies only after approval.

## Sprint 2 Home Route Migration - July 5, 2026

Completed:

- Added `tests/production-home-route.test.js` and registered `test:production-home`.
- Added `apps/web/src/pages/homeRouteModel.js` to preserve the Home prototype acceptance contract without React dependencies.
- Added `apps/web/src/pages/HomePage.jsx` and wired the Home route through `AppShell`.
- Updated coverage baseline to 214 passing tests.

Next active slice:

- Continue public route migration with About or Visceral Mag, then install frontend dependencies only after approval.

## Sprint 2 About Route Migration - July 5, 2026

Completed:

- Added `tests/production-about-route.test.js` and registered `test:production-about`.
- Added `apps/web/src/pages/aboutRouteModel.js` to preserve the About prototype acceptance contract without React dependencies.
- Added `apps/web/src/pages/AboutPage.jsx` and wired the About route through `AppShell`.
- Updated coverage baseline to 214 passing tests.

Next active slice:

- Continue public route migration with Visceral Mag or Creative Team, then install frontend dependencies only after approval.

## Sprint 2 Visceral Mag Route Migration - July 5, 2026

Completed:

- Added `tests/production-visceral-mag-route.test.js` and registered `test:production-visceral-mag`.
- Added `apps/web/src/pages/visceralMagRouteModel.js` to preserve the public article archive contract without React dependencies.
- Added `apps/web/src/pages/VisceralMagPage.jsx` and wired the Visceral Mag route through `AppShell`.
- Updated coverage baseline to 214 passing tests.

Next active slice:

- Continue public route migration with Article Detail or Categories/Search, then install frontend dependencies only after approval.

## Sprint 2 Article Detail Route Migration - July 5, 2026

Completed:

- Added `tests/production-article-detail-route.test.js` and registered `test:production-article-detail`.
- Added `apps/web/src/pages/articleDetailRouteModel.js` to preserve the public reading page contract without React dependencies.
- Added `apps/web/src/pages/ArticleDetailPage.jsx` and wired the dynamic article detail route through `AppShell`.
- Updated coverage baseline to 214 passing tests.

Next active slice:

- Continue public route migration with Categories/Search or Featured/Media, then install frontend dependencies only after approval.

## Sprint 2 Categories/Search Route Migration - July 5, 2026

Completed:

- Added `tests/production-categories-search-route.test.js` and registered `test:production-categories-search`.
- Added `apps/web/src/pages/categoriesSearchRouteModel.js` to preserve the public discovery/filtering contract without React dependencies.
- Added `apps/web/src/pages/CategoriesSearchPage.jsx` and wired the Search route through `AppShell`.
- Updated coverage baseline to 214 passing tests.

Next active slice:

- Continue public route migration with Featured/Media or Creative Team, then install frontend dependencies only after approval.

## Sprint 2 Featured/Media Route Migration - July 5, 2026

Completed:

- Added `tests/production-featured-media-route.test.js` and registered `test:production-featured-media`.
- Added `apps/web/src/pages/featuredMediaRouteModel.js` to preserve the public media/gallery contract without React dependencies.
- Added `apps/web/src/pages/FeaturedMediaPage.jsx` and wired the Featured route through `AppShell`.
- Updated coverage baseline to 214 passing tests.

Next active slice:

- Continue public route migration with Creative Team, Contributors, or Contact, then install frontend dependencies only after approval.

## Sprint 2 Creative Team Route Migration - July 5, 2026

Completed:

- Added `tests/production-creative-team-route.test.js` and registered `test:production-creative-team`.
- Added `apps/web/src/pages/creativeTeamRouteModel.js` to preserve the public creative team profile contract without React dependencies.
- Added `apps/web/src/pages/CreativeTeamPage.jsx` and wired the Creative Team route through `AppShell`.
- Updated coverage baseline to 214 passing tests.

Next active slice:

- Continue public route migration with Contributors or Contact, then install frontend dependencies only after approval.

## Sprint 2 Contributors Route Migration - July 5, 2026

Completed:

- Added `tests/production-contributors-route.test.js` and registered `test:production-contributors`.
- Added `apps/web/src/pages/contributorsRouteModel.js` to preserve the public contributor discovery contract without React dependencies.
- Added `apps/web/src/pages/ContributorsPage.jsx` and wired the Contributors route through `AppShell`.
- Updated coverage baseline to 214 passing tests.

Next active slice:

- Finish public route migration with Contact, then install frontend dependencies only after approval.

## Sprint 2 Contact Route Migration - July 6, 2026

Completed:

- Added `tests/production-contact-route.test.js` and registered `test:production-contact`.
- Added `apps/web/src/pages/contactRouteModel.js` to preserve the public Contact form contract without React dependencies.
- Added `apps/web/src/pages/ContactPage.jsx` and wired the Contact route through `AppShell`.
- Completed the 9-route public migration set: Home, About, Creative Team, Contributors, Visceral Mag, Article Detail, Categories/Search, Featured/Media, and Contact.
- Full suite baseline was 256 passing tests after the public route migration slice.

Next active slice:

- Start the admin route migration with Admin Dashboard, then install frontend dependencies only after approval.

## Sprint 3 Admin Dashboard Route Migration - July 6, 2026

Completed:

- Added `tests/production-admin-dashboard-route.test.js` and registered `test:production-admin-dashboard`.
- Added `apps/web/src/pages/adminDashboardRouteModel.js` to preserve the protected admin dashboard contract without React dependencies.
- Added `apps/web/src/pages/AdminDashboardPage.jsx` and wired the Admin Dashboard route through `AppShell`.
- Started the 5-route admin migration set with fixture-derived dashboard metrics, recent activity, quick actions, and permission states.
- Full suite baseline was 256 passing tests after the admin dashboard route migration slice.

Next active slice:

- Continue admin route migration with Article Management, then install frontend dependencies only after approval.

## Sprint 3 Article Management Route Migration - July 6, 2026

Completed:

- Added `tests/production-article-management-route.test.js` and registered `test:production-article-management`.
- Added `apps/web/src/pages/articleManagementRouteModel.js` to preserve the protected Article Management contract without React dependencies.
- Added `apps/web/src/pages/ArticleManagementPage.jsx` and wired the Article Management route through `AppShell`.
- Continued the 5-route admin migration set with draft-inclusive article rows, toolbar filters, editor fields, row actions, and publishing states.
- Full suite baseline was 256 passing tests after the article management route migration slice.

Next active slice:

- Continue admin route migration with Profile / Media Management, then install frontend dependencies only after approval.

## Sprint 3 Profile / Media Management Route Migration - July 6, 2026

Completed:

- Added `tests/production-profile-media-management-route.test.js` and registered `test:production-profile-media-management`.
- Added `apps/web/src/pages/profileMediaManagementRouteModel.js` to preserve the protected Profile / Media Management contract without React dependencies.
- Added `apps/web/src/pages/ProfileMediaManagementPage.jsx` and wired the Profile / Media Management route through `AppShell`.
- Continued the 5-route admin migration set with profile completeness, media readiness, upload metadata, keyboard fallback, and permission states.
- Full suite baseline was 256 passing tests after the profile media management route migration slice.

Next active slice:

- Continue admin route migration with Comments / Reviews Moderation, then install frontend dependencies only after approval.

## Sprint 3 Comments / Reviews Moderation Route Migration - July 6, 2026

Completed:

- Added `tests/production-comments-reviews-moderation-route.test.js` and registered `test:production-comments-reviews-moderation`.
- Added `apps/web/src/pages/commentsReviewsModerationRouteModel.js` to preserve the protected Comments / Reviews Moderation contract without React dependencies.
- Added `apps/web/src/pages/CommentsReviewsModerationPage.jsx` and wired the Moderation route through `AppShell`.
- Continued the 5-route admin migration set with combined comments/reviews, moderation filters, selected item actions, and approved-only public rendering states.
- Full suite baseline was 256 passing tests after the comments reviews moderation route migration slice.

Next active slice:

- Finish admin route migration with Contact Submissions, then install frontend dependencies only after approval.

## Sprint 3 Contact Submissions Route Migration - July 6, 2026

Completed:

- Added `tests/production-contact-submissions-route.test.js` and registered `test:production-contact-submissions`.
- Added `apps/web/src/pages/contactSubmissionsRouteModel.js` to preserve the protected Contact Submissions contract without React dependencies.
- Added `apps/web/src/pages/ContactSubmissionsPage.jsx` and wired the Contact Submissions route through `AppShell`.
- Completed the 5-route admin migration set: Dashboard, Article Management, Profile / Media Management, Comments / Reviews Moderation, and Contact Submissions.
- Full suite baseline was 256 passing tests after completing the admin route migration set.

Next active slice:

- Install frontend dependencies only after approval, then run the real React dev/build verification path.

## Sprint 3 Auth Support Route Migration - July 6, 2026

Completed:

- Added `tests/production-auth-support-route.test.js` and registered `test:production-auth-support`.
- Added `apps/web/src/pages/adminAuthRouteModel.js` for the Admin Login and Password Reset support routes.
- Added `apps/web/src/pages/AdminLoginPage.jsx` and `apps/web/src/pages/PasswordResetPage.jsx` and wired both routes through `AppShell`.
- Started support route migration with admin auth, recovery links, neutral reset copy, auth states, and security handoff notes.
- Full suite baseline was 256 passing tests after auth support route migration.

Next active slice:

- Continue support route migration with 404, 500, and Offline screens, then install frontend dependencies only after approval.

## Sprint 3 Error Support Route Migration - July 6, 2026

Completed:

- Added `tests/production-error-support-route.test.js` and registered `test:production-error-support`.
- Added `apps/web/src/pages/errorSupportRouteModel.js` for 404, 500, and Offline / Maintenance support routes.
- Added `apps/web/src/pages/NotFoundPage.jsx`, `apps/web/src/pages/ServerErrorPage.jsx`, and `apps/web/src/pages/OfflinePage.jsx` and wired all three routes through `AppShell`.
- Continued support route migration with shared recovery routes, page-specific recovery actions, public-nav continuity, and state coverage notes.
- Full suite baseline is now 261 passing tests after error support route migration.

Next active slice:

- Continue support route migration with Media Upload and Article Editor workflow support, then install frontend dependencies only after approval.

## Sprint 3 Admin Workflow Support Route Migration - July 7, 2026

Completed:

- Added `tests/production-admin-workflow-support-route.test.js` and registered `test:production-admin-workflow-support`.
- Added `apps/web/src/pages/adminWorkflowSupportRouteModel.js` for Media Upload Modal and Article Editor Workflow support routes.
- Added `apps/web/src/pages/MediaUploadModalPage.jsx` and `apps/web/src/pages/ArticleEditorWorkflowPage.jsx` and wired both protected support routes through `AppShell`.
- Continued support route migration with modal accessibility, required media metadata, editor steps, readiness checklist, SEO review, publish states, and rollback handoff.
- Full suite baseline is now 266 passing tests after admin workflow support route migration.

Next active slice:

- Continue support route migration with Mobile Wireframe Comps, then install frontend dependencies only after approval.

## Sprint 3 Mobile Wireframe Comps Route Migration - July 7, 2026

Completed:

- Added `tests/production-mobile-wireframe-comps-route.test.js` and registered `test:production-mobile-wireframes`.
- Added `apps/web/src/pages/mobileWireframeCompsRouteModel.js` for the Mobile Wireframe Comps support route.
- Added `apps/web/src/pages/MobileWireframeCompsPage.jsx` and wired `/mobile-wireframes` through `AppShell`.
- Completed support route migration with compressed mobile nav, public/admin responsive comps, breakpoint rules, accessibility checks, and stable control handoff.
- Full suite baseline is now 271 passing tests after mobile wireframe comps route migration.

Next active slice:

- Install frontend dependencies only after approval, then run the real React dev/build verification path.
## Sprint 3 Runtime Dependency Install - July 7, 2026

Completed:

- Added `tests/production-web-runtime.test.js` and registered `test:web-runtime`.
- Added `apps/web/vite.config.js` for React/Vite dev, preview, and build configuration.
- Declared `react`, `react-dom`, `vite`, and `@vitejs/plugin-react` in `apps/web/package.json`.
- Updated the app shell boundary docs from dependency-free scaffold to runtime install readiness.
- Runtime install verification: `npm.cmd install --cache C:\tmp\npm-cache` completed, Vite was upgraded to 8.1.3 with `@vitejs/plugin-react` 6.0.3, `npm.cmd run build` passed, and `npm.cmd audit --audit-level=moderate` found 0 vulnerabilities.
- Full suite baseline is now 275 passing tests after runtime dependency install and build verification.

Next active slice:

- Begin production styling and component hardening now that the React/Vite app installs, builds, and audits cleanly.
## Sprint 3 Production Visual System - July 7, 2026

Completed:

- Added `tests/production-visual-system.test.js` and registered `test:visual-system`.
- Replaced the minimal app shell CSS with a production visual baseline for editorial typography, cards, media, chips, forms, actions, focus states, admin surfaces, support states, and mobile handoff screens.
- Added responsive rules for stacked mobile navigation, one-column route grids, stable controls, and text overflow protection.
- Full suite baseline was 281 passing tests after production visual system.

Next active slice:

- Continue with browser visual QA against the running app and route-by-route polish.
## Sprint 3 Live Route QA - July 7, 2026

Completed:

- Added `tests/production-live-route-qa.test.js` and registered `test:live-route-qa`.
- Added `apps/web/scripts/smoke-routes.mjs` for live Vite route checks across all public, admin, and support MVP routes.
- Registered `smoke:web:routes` at the repository root and `smoke:routes` inside `apps/web`.
- Documented the live route smoke command for local dev, preview, and deploy-target checks.
- Full suite baseline is now 284 passing tests after Live Route QA.

Next active slice:

- Use Chrome DevTools screenshots and DOM inspection for route-by-route visual polish against the running MVP.
## Sprint 3 Browser Polish - July 7, 2026

Completed:

- Added `tests/production-browser-polish.test.js` and registered `test:browser-polish`.
- Added Vite public media placeholders required by the Home, Featured/Media, article, profile, and upload-preview routes.
- Added browser autocomplete metadata to the Home newsletter email field.
- Full suite baseline was 287 passing tests after Browser Polish.

Next active slice:

- Re-run Chrome DevTools console/network inspection and capture route screenshots for visual QA.
Browser QA note:

- Chrome DevTools verification passed for Home at `http://127.0.0.1:5173/` after Browser Polish.
- Saved QA screenshot: `apps/web/browser-qa-home.png`.
## Figma Final Frontend Handoff - July 9, 2026

Completed:

- Imported `C:\Users\CASH\Downloads\Author Website Design.make` into `designs/figma-author-website-design/`.
- Reconstructed the embedded Figma Make source repo at `designs/figma-author-website-design/source/`.
- Restored packaged logo/PDF LFS assets from the local export.
- Added `docs/FIGMA_FINAL_FRONTEND_HANDOFF.md` to document the stack and 22-route MVP scope conflict.
- Adopted the final-design logo-led public header, search field, admin access, and Theatre Reviews / Book Reviews / Essays / Opinion section cues in the runnable app.
- Full suite baseline is now 396 passing tests after the public form interaction sprint.

Next active slice:

- Apply the final design article-card treatment to Home, Visceral Mag, Article Detail, Search, and Featured/Media, then capture desktop/mobile Chrome screenshots.

## Final design ZIP accepted - July 10, 2026

- Author Website Design.zip is now the final visual source of truth.
- Runnable archive entry/config files are preserved in the Figma source folder.
- The live public header includes the exported accessible mobile navigation behavior.
- The route registry remains at 22 unique routes with editorial section aliases handled by search.
- Verification passed: 396 tests, production build, 22 live routes, hydrated SEO metadata, and 14 refreshed screenshot integrity checks.
## Lighthouse launch audit complete - July 10, 2026

- Added valid robots.txt, sitemap.xml, and llms.txt public discovery assets.
- Corrected the public brand link to use visible text as its sole accessible name.
- Mobile Lighthouse final result: Accessibility 100, Best Practices 100, SEO 100, Agentic Browsing 100, 55 passed audits, 0 failures.
- Current regression baseline: 396 passing tests.
## Public form frontend interactions - July 11, 2026

- Home, About, and Contact share one accessible newsletter interaction.
- Contact preserves reader input across API failure and keeps the honeypot out of the accessibility tree.
- Article comments remain approved-only in public output; new comments submit to the pending moderation endpoint.
- Missing API endpoints produce honest retry states instead of treating the Vite SPA fallback as success.
- Current regression target is 396 passing tests.

## True Figma Stack And Home Parity - July 11, 2026

Completed:
- Installed React Router, Tailwind 4, Lucide, and focused shadcn-style primitives in the runnable React app.
- Preserved one canonical 22-route registry and removed no required public, admin, or support surface.
- Rebuilt the shared public/admin shell around Router links and the final Figma editorial navigation.
- Replaced the MVP-first Home composition with the final featured, recent, More, and newsletter structure.
- Added seven unique published preview stories so editorial grids match the final design without duplicate cards.
- Completed mobile logo/menu/search/admin polish and refreshed browser QA artifacts.
- Cleared production and development dependency audits with React Router 7.18.1 and Vite 7.3.6.

Verification baseline: 396 passing tests, production build green, 22-route smoke green, 12 screenshot integrity checks green, and mobile Lighthouse 100 across all audited categories.

Next implementation priority: connect public forms and admin mutations to the real backend/auth/persistence layer, then replace preview copy and placeholder media with approved launch content.


## UI Audit, Git Hygiene, And ImageGen Re-imaging - July 11, 2026

Completed:
- Audited all 22 routes at desktop and mobile widths.
- Confirmed the focused React 18, React Router 7, Tailwind 4, Lucide, Radix Slot, and Vite 7 technology stack.
- Added Git ignores for dependencies, builds, local browser evidence, logs, and runtime state.
- Removed redundant one-off screenshots, snapshot dumps, logs, and PID files.
- Generated and integrated five cohesive South African editorial images using built-in ImageGen.
- Optimized generated media to approximately 1.1 MB total.
- Replaced public React placeholder imagery across reader, information, profile, featured, and admin media surfaces.

Verification baseline: 396 passing tests, zero dependency vulnerabilities, production build green, 22 live routes green, 44 layout checks green, 12 screenshot integrity checks green, and mobile Lighthouse 100 across all audited categories.

Durable audit: `docs/UI_TECH_STACK_IMAGEGEN_AUDIT_JULY_11_2026.md`.

Remaining launch work is production hardening: credential hashing or managed identity, media storage, rate limiting, deployment storage, backups, audit logging, and final approved editorial copy.

## Figma-Only Runtime Repair

Figma-only runtime repair completed on July 11, 2026.

- Removed legacy MVP global card and boxed-main styling from the active React runtime.
- Kept the canonical 22-route registry; no duplicate Theatre, Books, Essays, or Opinion routes were introduced.
- Made the final-design section navigation query-aware and connected URL filters to the search route model.
- Current verification baseline: 396 passing tests, zero dependency vulnerabilities, production build green, and all 22 live routes green.

## Persistent Public API - First Backend Slice

Completed July 12, 2026:

- Public newsletter, contact, and article-comment endpoints now persist to an atomic local JSON store.
- Vite proxies same-origin `/api` requests to the Node service on port `8787`.
- New comments are moderation-safe and default to `pending`.
- Browser submissions and process-restart durability were verified.
- Current regression baseline: 396 passing tests.

Next backend priorities are credential hardening, rate limiting and abuse controls, newsletter confirmation delivery, deployment-managed storage, and encrypted backups.

## Authenticated Admin API - Complete

Completed July 12, 2026:

- Protected persisted contact and comment queues with a server-side bearer token.
- Added constant-time credential comparison and fail-closed unconfigured behavior.
- Added persisted moderation and inbox status mutations with strict allowlists.
- Kept public submission routes available without exposing admin data.
- Current regression baseline: 396 passing tests.

Next slice: connect protected admin screens to live records, then add production credential and abuse-control hardening.

## Admin-Only Browser Session - Complete

Completed July 12, 2026:

- Only the single administrator role can authenticate and reach editing or moderation routes.
- Added login, session, and logout API routes backed by an eight-hour HttpOnly, SameSite Strict cookie.
- Added a React AdminGate around every route marked authRequired.
- Removed editor-facing login language; there is no registration or contributor, author, editor, or public account flow.
- Kept bearer authentication only for trusted server automation.
- Current regression baseline: 396 passing tests, 0 failures.

Next priority: connect admin tables and mutations to live protected API data, then harden credentials, rate limits, audit logging, and deployment secrets.

## Live Admin Queues - Complete

Completed July 12, 2026:

- Contact Submissions now reads the protected API and supports live read/archive mutations.
- Moderation now reads pending comments and supports live approve/reject mutations.
- Both screens include real loading, empty, saving, and error feedback while preserving the Figma admin layout.
- The authenticated shell now provides server-backed sign out.
- Dashboard, articles, profiles/media, inbox, and moderation contracts now consistently require the admin role.
- Verification remains 396 passing tests with a successful production build.

Next priority: persist article/profile/media editing, add a reviews API, then harden credentials, rate limits, audit logging, and deployment storage.

## Live-View Editorial Polish - Complete

Completed July 12, 2026:

- Removed redundant Browse by category rails from Visceral Mag and Search while retaining global section navigation and URL filtering.
- Removed the unused category-filter model output from both routes.
- Replaced the raw article route with a readable breadcrumb and formatted publication date.
- Added mobile single-column card and related-content safeguards plus horizontal overflow protection.
- Added a dedicated minimal auth layout without public navigation or footer chrome.
- Rebalanced public and auth logo sizing from the live-view review.
- Regression baseline remains 396 passing tests.

## Reference-Led Archive and Newsletter Repair - Complete

Completed July 12, 2026:

- Rebuilt Visceral Mag as a lead story followed by a readable two-column editorial feed, informed by the Cape Creative Collective archive structure.
- Rebuilt Featured published stories as two-column horizontal story cards and retained a three-column media gallery on desktop.
- Added category, author, and publication-date metadata to Featured story records.
- Fixed the shared newsletter form so label/input and Subscribe align correctly on every page.
- Removed Contact's duplicate route links below the newsletter.
- Expanded screenshot QA to include Featured at desktop and mobile, for 14 captures total.
- Regression baseline remains 396 passing tests.

## Production Release Candidate - Active

Transitioned July 12, 2026:

- Closed the MVP and prototype delivery phases; archived their roadmap as historical evidence.
- Promoted the root and web packages to version 1.0.0-rc.1.
- Added the canonical production release plan with Security, Data, Frontend, Deployment, Content, and Launch Decision gates.
- Added scrypt-hashed admin credentials and rejected plaintext admin passwords in production.
- Added fail-fast production requirements for admin email, password hash, and external data path.
- Added restrictive API security headers and production operator templates.
- Added start:production, verify:production, and hash:admin-password commands.
- Current regression baseline: 396 passing tests.

Current launch decision: NO-GO until durable editorial storage, remaining admin persistence, rate limits, deployment infrastructure, backups, and final content approval are complete.

### Live release-candidate verification
- Frontend preview and API are running on the updated production-candidate code.
- Production build, 396-test regression suite, five release gates, dependency audit, and 14-image screenshot integrity gate pass.
- API bind configuration is tested and honors HOST; local development defaults to 127.0.0.1.

## Editorial Persistence - Complete (July 13, 2026)
- Articles, profiles, media metadata, and reviews now persist atomically across restarts.
- Article, profile/media, review moderation, contact, and comment admin workflows use protected APIs.
- Reader routes hydrate from persisted published content; drafts and unapproved conversation remain private.
- Verification baseline: 402 passing tests, 5 production release gates, green production build, and 0 dependency vulnerabilities.
- Next priority: rate limiting, structured security logs, inactive route removal, deployment-managed storage, backups, and staging infrastructure.


## Production Design And Report Alignment - July 13, 2026

Completed:

- Decoded and reviewed all 20 pages of the supplied client report.
- Reviewed `https://ceconline.co.za/` for editorial hierarchy and publication rhythm.
- Added root `DESIGN.md` as the production design contract.
- Added `docs/BABAS_BRASSE_REPORT_REVIEW_JULY_2026.md` with requirement traceability.
- Realigned the production release plan, compressed sprint, and implementation roadmap.
- Added the design/report contract test before the documents; the initial red run failed on the missing artifacts and plan gate as expected.

Current decision:

- Keep the current React/Vite and Node production architecture.
- Launch remains NO-GO pending the P0 infrastructure, content, email, domain, font, and client sign-off gates in the report review.

Next active slice:

- Implement the public book-rating review workflow and profile detail/authored-work discovery with TDD, while provider and client-owned launch inputs are being secured.


Verification:

- Design/report contract: 4 passed.
- Full regression: 406 passed, 0 failed.
- Production Vite build: passed.


## Report-Aligned Publication Navbar - July 13, 2026

- Promoted the report-required publication pages to the primary navigation.
- Consolidated category shortcuts under Sections without adding routes.
- Reduced More to Creative Team and Contributors.
- Preserved one search control per desktop/mobile context and one canonical route registry.


## Report Workflow Completion - July 13, 2026

Completed with TDD evidence:

- Added canonical `/people/:slug` profile detail with full biography, profile links, dynamic metadata, and published-only authored work.
- Added public one-to-five book rating submission, accessible text alternatives, approved review count, and pending-by-default moderation.
- Added persisted admin search for moderation and contact records, plus status, article, type, and review-rating filters.
- Added confirmed deletion for comments, reviews, and articles.
- Added profile creation, full biography and social-link editing, confirmed profile deletion, and guarded media metadata deletion.
- Protected profiles and media referenced by articles from accidental deletion.
- Expanded browser QA from 14 to 16 desktop/mobile captures to include profile detail.

Current evidence:

- Full regression: 428 passing tests, 0 failures.
- Production Vite build: passed with 1,673 modules transformed.
- Screenshot integrity: 16 of 16 PNGs passed at 1440x1200 and 390x1200.
- Live profile route returned HTTP 200.

Remaining launch blockers:

- Hosting/staging, deployment-managed editorial storage, encrypted backup/restore, object storage and binary uploads.
- Rate limiting, structured security/moderation logs, monitoring, TLS/proxy, and rollback evidence.
- Contact email delivery, final domain/DNS/canonicals, approved content/media/credits/social URLs/legal copy, and licensed Sabon files.
- Article feature control, binary media replacement, Article/Person structured data, final cross-browser/accessibility review, and dated client sign-off.

Launch decision remains NO-GO.

## Production Editorial Navigation - Completed July 13, 2026

- The public header now uses one responsive route list, one search form, and one expanded Sections panel.
- The desktop row now follows the approved reference composition: Babas & Brasse mark left, publication links with decorative `///` separators in the middle, Sections in the same rhythm, and search at the far right.
- Tablet and mobile keep the full-height menu while removing decorative separators and restoring large editorial link type.
- Creative Team and Contributors moved into Sections; the redundant More menu was removed.
- No public header, mobile menu, footer, sitemap, or public page exposes an admin link.
- The direct `/admin` path remains protected by server-backed session and role checks; logout returns to `/admin`.
- Admin and authentication metadata is `noindex,nofollow`, and private UI modules are route-split.
- CEC and matching Babas & Brasse screenshots are stored under `docs/design-reference/`.
- The live geometry/interaction audit is stored in `docs/design-reference/babas-brasse/navigation-audit.json`.

This closes the navigation redesign slice. It does not change the NO-GO launch decision or the external infrastructure, final-content, licensed-font, legal, and client-approval blockers listed below.

## Production Runtime Stack - Completed July 13, 2026

- One Node service now serves the Vite production build and API on the same origin.
- Admin login and public submissions have configurable rate limits and standard retry metadata.
- Production security events are structured, request-correlated, and exclude credentials, submitted content, and raw addresses.
- Deployment hosting, managed data, backups, TLS/proxy validation, monitoring, final content, and client sign-off remain launch blockers.
- Verification: 440/440 regressions, 10/10 combined production gates, 1,674-module build, production-mode same-origin smoke, and 0 dependency vulnerabilities.

## Production Styling Package - Implemented July 14, 2026

- Adopted the Visceral Brutalist Archive as the public visual foundation.
- Applied the approved Home, About v1, Contact Dispatch v2, Featured/Media, and Visceral Archive v2 references through one scoped shared stylesheet.
- Preserved the canonical route registry, all real content and form logic, the private administrator boundary, and existing admin presentation.
- Replaced the boxed public canvas with full-width editorial bands, sharp rules, monochrome media, one responsive navigation/search system, and a black publication footer.
- Fixed a live 390px expanded-menu clipping defect found during browser QA.
- Verified five mapped public routes at 1440, 1024, 768, 390, and 360 widths with no overflow, broken images, duplicated search, or exposed admin links.
- Lighthouse passed at 100 across all four reported categories on Home desktop and Contact mobile.
- Full regression is 446/446 passing.

Current gate:

- Source implementation and live browser QA are green.
- Production build verification is resolved: the escalated Vite build passed with 1,675 modules transformed.
- Launch remains NO-GO for the external infrastructure, final-content, licensed-font, legal, deployment, backup, email, and client-sign-off blockers already recorded.

## Managed PostgreSQL Production Stack - Implemented July 14, 2026

- Production persistence now uses a PostgreSQL adapter with an idempotent migration and transactional JSONB state.
- Development and test persistence remain on the atomic JSON adapter.
- API handlers await both adapters without changing route, payload, authentication, moderation, or public-content behavior.
- Production configuration requires `DATABASE_URL` instead of a local filesystem data path.
- Verification is green: 451/451 regressions, 15/15 production gates, 1,675-module build, and 0 root dependency vulnerabilities.

Current gate:

- Application implementation for managed editorial storage is complete.
- Launch remains NO-GO until staging PostgreSQL is provisioned and backup/restore evidence exists, and until object storage, email delivery, deployment, approved content, domain, font, legal, and client-sign-off gates are complete.
