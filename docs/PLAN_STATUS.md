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
