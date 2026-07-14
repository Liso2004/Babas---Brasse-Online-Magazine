# Testing Log

## 2026-06-30

Planned checks:

- `npm.cmd test`

Expected first result:

- Failing, because the test contract is written before the first wireframe HTML implementation.

Next risk to watch:

- Open Design MCP is visible but not reachable, so the local wireframe artifact is the active design source until daemon calls succeed.

Green implementation attempt:

- Files added: `wireframes/index.html`, `wireframes/styles.css`.
- Package script updated to run the test file directly because `node --test tests/*.test.js` hit sandbox worker spawning error `EPERM`.
- Next command: `npm.cmd test`.

Green result:

- Command: `npm.cmd test`
- Result: passed.
- Tests: 5 passed, 0 failed.
- Covered: documentation, screen spec, HTML/CSS artifact, all required screens, public/admin navigation, reader/admin flows, required states.

Documentation follow-up:

- Added `wireframes/README.md`.
- Added `docs/PLAN_STATUS.md`.

Final verification:

- Command: `node tests\wireframes.test.js`
- Result: passed.
- Tests: 5 passed, 0 failed.
- Note: `npm.cmd test` produced the same green test output, but one parallel wrapper call timed out after output was printed. The standalone Node test command exited cleanly.

Open Design final retest:

- `get_active_context`: `fetch failed`
- `list_projects`: `fetch failed`
- `codex mcp list`: `open-design` enabled and registered
- Decision: proceed with local tested wireframes and TDD implementation plan.

Plan artifact:

- Added `docs/IMPLEMENTATION_PLAN_JULY_2026.md`.

Phase 0 red setup:

- Added `tests/scaffold.test.js`.
- Added `tests/run-tests.js`.
- Updated `package.json` so `npm.cmd test` runs wireframe and scaffold tests without Node's worker-spawning test runner mode.
- Expected next result: failing scaffold tests because the Phase 0 scaffold has not been implemented yet.

Phase 0 red result:

- Command: `node tests\scaffold.test.js`
- Result: failed as expected.
- Tests: 0 passed, 5 failed.
- Failure reason: scaffold plan, route map, fixtures, page placeholders, and app shell did not exist.

Phase 0 implementation attempt:

- Added `docs/FRONTEND_SCAFFOLD_PLAN.md`.
- Added `src/routes.js`.
- Added `src/content/fixtures.js`.
- Added `src/app-shell.html`.
- Added `src/pages/**/*.html` placeholders.

Phase 0 green result:

- Command: `node tests\scaffold.test.js`
- Result: passed.
- Tests: 5 passed, 0 failed.
- Covered: scaffold plan, route map, route placeholder files, fixture entities, app shell navigation.

Full suite after Phase 0:

- Command: `npm.cmd test`
- Result: passed.
- Tests: 10 passed, 0 failed.
- Covered: wireframe contract plus Phase 0 scaffold contract.

Phase 1 Home red setup:

- Added `tests/home.test.js`.
- Updated `tests/run-tests.js`.
- Updated `package.json` with `test:home`.
- Expected next result: failing Home tests because the Home plan, renderer, and generated page content do not exist yet.

Phase 1 Home red result:

- Command: `node tests\home.test.js`
- Result: failed as expected.
- Tests: 0 passed, 4 failed.
- Failure reason: public shell plan, Home renderer, and generated Home content were missing.

Phase 1 Home implementation attempt:

- Added `docs/PHASE1_PUBLIC_SHELL_PLAN.md`.
- Added `src/render/home.js`.
- Replaced `src/pages/home.html` placeholder with Home renderer-shaped content.

Phase 1 Home green result:

- Command: `node tests\home.test.js`
- Result: passed.
- Tests: 4 passed, 0 failed.
- Covered: public shell plan, Home renderer, published-only reader promotion, generated Home artifact sections.

Full suite after Phase 1 Home:

- Command: `npm.cmd test`
- Result: passed.
- Tests: 14 passed, 0 failed.
- Covered: wireframes, Phase 0 scaffold, and Phase 1 Home page behavior.

Phase 2 Visceral Mag red setup:

- Added `tests/visceral-mag.test.js`.
- Updated `tests/run-tests.js`.
- Updated `package.json` with `test:visceral-mag`.
- Expected next result: failing Visceral Mag tests because the article discovery plan, renderer, and generated page content do not exist yet.

Phase 2 Visceral Mag red result:

- Command: `node tests\visceral-mag.test.js`
- Result: failed as expected.
- Tests: 0 passed, 5 failed.
- Failure reason: article discovery plan, Visceral Mag renderer, and generated listing content were missing.

Phase 2 Visceral Mag implementation attempt:

- Added `docs/PHASE2_ARTICLE_DISCOVERY_PLAN.md`.
- Added `src/render/visceral-mag.js`.
- Replaced `src/pages/visceral-mag.html` placeholder with renderer-shaped listing content.

Phase 2 Visceral Mag green result:

- Command: `node tests\visceral-mag.test.js`
- Result: passed.
- Tests: 5 passed, 0 failed.
- Covered: article discovery plan, Visceral Mag renderer, published-only public listing, category chips, search entry, generated listing artifact.

Full suite after Phase 2 Visceral Mag:

- Command: `npm.cmd test`
- Result: passed.
- Tests: 19 passed, 0 failed.
- Covered: wireframes, Phase 0 scaffold, Phase 1 Home, and Phase 2 Visceral Mag listing behavior.

Phase 2 Article Detail red setup:

- Added `tests/article-detail.test.js`.
- Updated `tests/run-tests.js`.
- Updated `package.json` with `test:article-detail`.
- Expected next result: failing Article Detail tests because the reading page plan, renderer, and generated page content do not exist yet.

Phase 2 Article Detail red result:

- Command: `node tests\article-detail.test.js`
- Result: failed as expected.
- Tests: 0 passed, 7 failed.
- Failure reason: article detail plan, renderer, and generated reading page content were missing.

Phase 2 Article Detail implementation attempt:

- Added `docs/PHASE2_ARTICLE_DETAIL_PLAN.md`.
- Added `src/render/article-detail.js`.
- Replaced `src/pages/article-detail.html` placeholder with renderer-shaped reading page content.

Phase 2 Article Detail integration fix:

- Full suite found one scaffold contract mismatch: `src/pages/article-detail.html` did not expose its route path after replacing the Phase 0 placeholder.
- Added `data-route="/visceral-mag/send-a-text-before-you-knock"` to the Article Detail renderer/page artifact.

Phase 2 Article Detail syntax fix:

- Corrected literal PowerShell backtick newline text in `src/render/article-detail.js` and `src/pages/article-detail.html` after adding route metadata.

Phase 2 Article Detail green result:

- Command: `node tests\article-detail.test.js`
- Result: passed.
- Tests: 7 passed, 0 failed.
- Covered: article detail plan, renderer, sample article render, metadata, image alt text, body blocks, related articles, SEO metadata, approved-only comments/reviews, draft/missing article protection, generated page artifact.

Full suite after Phase 2 Article Detail:

- Command: `npm.cmd test`
- Result: passed.
- Tests: 26 passed, 0 failed.
- Covered: wireframes, Phase 0 scaffold, Phase 1 Home, Phase 2 Visceral Mag listing, and Phase 2 Article Detail behavior.

Open Design zip import:

- Source: `C:\Users\CASH\Downloads\Wireframe-Annotated.zip`
- Extracted to: `open-design-import/`
- Entry: `open-design-import/index.html`
- Added import notes: `docs/OPEN_DESIGN_WIREFRAME_IMPORT.md`
- Added verification tests: `tests/open-design-import.test.js`

Open Design import verification:

- Command: `node tests\open-design-import.test.js`
- Result: passed.
- Tests: 4 passed, 0 failed.
- Covered: extracted OD files, manifest entry, annotated landing wireframe HTML contract, critique score.

Full suite after Open Design import:

- Command: `npm.cmd test`
- Result: passed.
- Tests: 30 passed, 0 failed.
- Covered: wireframes, Phase 0 scaffold, Phase 1 Home, Phase 2 listing/detail, and Open Design import contract.

Open Design prompt for remaining wireframes:

- Added `docs/OPEN_DESIGN_PROMPT_REMAINING_WIREFRAMES.md`.

Home Open Design implementation red setup:

- Added `tests/home-open-design.test.js`.
- Updated `tests/run-tests.js`.
- Updated `package.json` with `test:home-open-design`.
- Expected next result: failing Home OD tests because the current Home renderer does not yet include the imported landing visual contract.

Home Open Design red result:

- Command: `node tests\home-open-design.test.js`
- Result: failed as expected.
- Tests: 1 passed, 5 failed.
- Failure reason: remaining-wireframes prompt existed, but Home did not yet include the imported OD landing visual contract.

Home Open Design implementation attempt:

- Updated `src/render/home.js` with OD landing nav, theatre hero metadata, section rail, recent teasers, newsletter/footer, and state/responsive notes.
- Updated `src/pages/home.html` to match the renderer-shaped OD landing contract.

Home Open Design state note fix:

- Aligned search no-results state with the test contract by exposing `data-state-note="search-no-results"` directly on the Home root.

Home Open Design state note fix:

- Aligned search no-results state with the test contract by exposing `data-state-note="search-no-results"` directly on the Home root.

Home Open Design newsletter state fix:

- Normalized newsletter success to `data-state-note="newsletter-success"`.

Home Open Design green result:

- Command: `node tests\home-open-design.test.js`
- Result: passed.
- Tests: 6 passed, 0 failed.
- Covered: remaining-wireframes prompt, OD landing nav, B&B mark, five editorial links, search, subscribe, theatre hero, section rail, recent teasers, newsletter/footer, responsive notes, and state handoff notes.

Full suite after Home Open Design implementation:

- Command: `npm.cmd test`
- Result: passed.
- Tests: 36 passed, 0 failed.
- Covered: wireframes, Phase 0 scaffold, Phase 1 Home, Phase 2 listing/detail, OD import contract, and Home OD landing implementation.

Phase 2 Categories/Search red setup:

- Added `tests/categories-search.test.js`.
- Updated `tests/run-tests.js`.
- Updated `package.json` with `test:categories-search`.
- Expected next result: failing Categories/Search tests because the plan, renderer, helpers, and generated page content did not exist yet.

Phase 2 Categories/Search red result:

- Command: `node tests\categories-search.test.js`
- Result: failed as expected.
- Tests: 0 passed, 7 failed.
- Failure reason: categories/search plan and renderer were missing, and the page was still a Phase 0 placeholder.

Phase 2 Categories/Search implementation attempt:

- Added `docs/PHASE2_CATEGORIES_SEARCH_PLAN.md`.
- Added `src/render/categories-search.js`.
- Replaced `src/pages/categories-search.html` placeholder with renderer-shaped search and category content.

Phase 2 Categories/Search green result:

- Command: `node tests\categories-search.test.js`
- Result: passed.
- Tests: 7 passed, 0 failed.
- Covered: categories/search plan, renderer exports, published-only filtering, category chips, keyword search, category filtering, no-results state, reset affordance, and generated page artifact.

Full suite after Phase 2 Categories/Search:

- Command: `npm.cmd test`
- Result: passed.
- Tests: 43 passed, 0 failed.
- Covered: wireframes, Phase 0 scaffold, Phase 1 Home, Phase 2 listing/detail/search, OD import contract, and Home OD landing implementation.

Phase 2 Featured/Media red setup:

- Added `tests/featured-media.test.js`.
- Updated `tests/run-tests.js`.
- Updated `package.json` with `test:featured-media`.
- Expected next result: failing Featured/Media tests because the plan, renderer, helpers, and generated page content did not exist yet.

Phase 2 Featured/Media red result:

- Command: `node tests\featured-media.test.js`
- Result: failed as expected.
- Tests: 0 passed, 6 failed.
- Failure reason: Featured/Media plan and renderer were missing, and the page was still a Phase 0 placeholder.

Phase 2 Featured/Media implementation attempt:

- Added `docs/PHASE2_FEATURED_MEDIA_PLAN.md`.
- Added `src/render/featured-media.js`.
- Replaced `src/pages/featured-media.html` placeholder with renderer-shaped media gallery content.

Phase 2 Featured/Media green result:

- Command: `node tests\featured-media.test.js`
- Result: passed.
- Tests: 6 passed, 0 failed.
- Covered: Featured/Media plan, renderer exports, media gallery metadata, alt text, captions, credits, published-only article media links, empty media state, and generated page artifact.

Full suite after Phase 2 Featured/Media:

- Command: `npm.cmd test`
- Result: passed.
- Tests: 49 passed, 0 failed.
- Covered: wireframes, Phase 0 scaffold, Phase 1 Home, Phase 2 listing/detail/search/media, OD import contract, and Home OD landing implementation.

Final Open Design wireframe handoff import:

- Source: `C:\Users\CASH\AppData\Roaming\Open Design\namespaces\release-stable-win\data\projects\2aab063e-bbdf-426b-ab5c-6baf53cd6a63`
- Local copy: `designs/open-design-wireframes/`
- Added `docs/FINAL_OPEN_DESIGN_WIREFRAME_HANDOFF.md`.
- Added `tests/final-open-design-wireframes.test.js`.
- Updated `tests/run-tests.js`.
- Updated `package.json` with `test:final-wireframes`.

Final Open Design wireframe focused verification:

- Command: `node tests\final-open-design-wireframes.test.js`
- Result: passed.
- Tests: 5 passed, 0 failed.
- Covered: project handoff doc, shared OD files, all public/admin screens, annotation pins/spec rows, route overview links, complete artifact metadata, and passing critique score.

Copied wireframe folder self-verification:

- Command: `npm.cmd test`
- Working directory: `designs/open-design-wireframes`
- Result: passed.
- Output: `Wireframe validation passed: 15 screens, 9 public routes, 5 admin routes.`

Full suite after final Open Design wireframe handoff:

- Command: `npm.cmd test`
- Result: passed.
- Tests: 54 passed, 0 failed.
- Covered: rough wireframe contract, scaffold, public page renderers, single OD import, final complete OD wireframe handoff, and all current TDD prototype behavior.

Phase 3 About red setup:

- Added `tests/about.test.js`.
- Updated `tests/run-tests.js`.
- Updated `package.json` with `test:about`.
- Expected next result: failing About tests because the plan, renderer, and generated page content did not exist yet.

Phase 3 About red result:

- Command: `node tests\about.test.js`
- Result: failed as expected.
- Tests: 0 passed, 6 failed.
- Failure reason: About plan and renderer were missing, and the page was still a Phase 0 placeholder.

Phase 3 About implementation attempt:

- Added `docs/PHASE3_ABOUT_PLAN.md`.
- Added `src/render/about.js`.
- Replaced `src/pages/about.html` placeholder with renderer-shaped About content from the final Open Design wireframe contract.

Phase 3 About green result:

- Command: `node tests\about.test.js`
- Result: passed.
- Tests: 6 passed, 0 failed.
- Covered: About plan, shared public nav, Mission, Vision, Organisation, editorial pillars, route cards, newsletter states, and generated page artifact.

Full suite after Phase 3 About:

- Command: `npm.cmd test`
- Result: passed.
- Tests: 60 passed, 0 failed.

Phase 3 Creative Team red setup:

- Added `tests/creative-team.test.js`.
- Updated `tests/run-tests.js`.
- Updated `package.json` with `test:creative-team`.
- Expected next result: failing Creative Team tests because the plan, renderer, helper, and generated page content did not exist yet.

Phase 3 Creative Team red result:

- Command: `node tests\creative-team.test.js`
- Result: failed as expected.
- Tests: 0 passed, 6 failed.
- Failure reason: Creative Team plan and renderer were missing, and the page was still a Phase 0 placeholder.

Phase 3 Creative Team implementation attempt:

- Added `docs/PHASE3_CREATIVE_TEAM_PLAN.md`.
- Added `src/render/creative-team.js`.
- Replaced `src/pages/creative-team.html` placeholder with renderer-shaped Creative Team content from the final Open Design wireframe contract.

Phase 3 Creative Team green result:

- Command: `node tests\creative-team.test.js`
- Result: passed.
- Tests: 6 passed, 0 failed.
- Covered: Creative Team plan, shared public nav, intro, public-only creative team profiles, profile card anatomy, social-link empty state, loading/empty/error state hooks, footer paths, and generated page artifact.

Full suite after Phase 3 Creative Team:

- Command: `npm.cmd test`
- Result: passed.
- Tests: 66 passed, 0 failed.

Support wireframe expansion before next implementation step:

- Added `auth-login.html`.
- Added `password-reset.html`.
- Added `not-found.html`.
- Added `server-error.html`.
- Added `offline-maintenance.html`.
- Added `media-upload-modal.html`.
- Added `article-editor-workflow.html`.
- Added `mobile-wireframes.html`.
- Added matching `.artifact.json` files for each support screen.
- Updated `designs/open-design-wireframes/mvp-wireframes.html` to link support screens.
- Updated `designs/open-design-wireframes/scripts/validate-wireframes.js`.
- Updated `tests/final-open-design-wireframes.test.js`.
- Updated `docs/FINAL_OPEN_DESIGN_WIREFRAME_HANDOFF.md`, `designs/open-design-wireframes/DESIGN.md`, `README.md`, and `critique.json`.

Support wireframe focused verification:

- Command: `npm.cmd test`
- Working directory: `designs/open-design-wireframes`
- Result: passed.
- Output: `Wireframe validation passed: 23 screens, 9 public routes, 5 admin routes, 8 support screens.`

Magazine final wireframe test verification:

- Command: `node tests\final-open-design-wireframes.test.js`
- Result: passed.
- Tests: 6 passed, 0 failed.

Full suite after support wireframe expansion:

- Command: `npm.cmd test`
- Result: passed.
- Tests: 67 passed, 0 failed.

Phase 3 Contributors red setup:

- Added `tests/contributors.test.js`.
- Updated `tests/run-tests.js`.
- Updated `package.json` with `test:contributors`.
- Expected next result: failing Contributors tests because the plan, renderer, helper functions, and generated page content did not exist yet.

Phase 3 Contributors red result:

- Command: `node tests\contributors.test.js`
- Result: failed as expected.
- Tests: 0 passed, 7 failed.
- Failure reason: Contributors plan and renderer were missing, and the page was still a Phase 0 placeholder.

Phase 3 Contributors implementation attempt:

- Added `docs/PHASE3_CONTRIBUTORS_PLAN.md`.
- Added `src/render/contributors.js`.
- Replaced `src/pages/contributors.html` placeholder with renderer-shaped Contributors content from the final Open Design wireframe contract.

Phase 3 Contributors green result:

- Command: `node tests\contributors.test.js`
- Result: passed.
- Tests: 7 passed, 0 failed.
- Covered: Contributors plan, shared public nav, search/filter toolbar, contributor-only profile filtering, contributor card anatomy, published works, draft exclusion, no-results/reset/error states, and generated page artifact.

Full suite after Phase 3 Contributors:

- Command: `npm.cmd test`
- Result: passed.
- Tests: 74 passed, 0 failed.

Phase 3 Contact red setup:

- Added `tests/contact.test.js`.
- Updated `tests/run-tests.js`.
- Updated `package.json` with `test:contact`.
- Expected next result: failing Contact tests because the plan, renderer, helper, and generated page content did not exist yet.

Phase 3 Contact red result:

- Command: `node tests\contact.test.js`
- Result: failed as expected.
- Tests: 0 passed, 7 failed.
- Failure reason: Contact plan and renderer were missing, and the page was still a Phase 0 placeholder.

Phase 3 Contact implementation attempt:

- Added `docs/PHASE3_CONTACT_PLAN.md`.
- Added `src/render/contact.js`.
- Replaced `src/pages/contact.html` placeholder with renderer-shaped Contact content from the final Open Design wireframe contract.

Phase 3 Contact green result:

- Command: `node tests\contact.test.js`
- Result: passed.
- Tests: 7 passed, 0 failed.
- Covered: Contact plan, shared public nav, contact intro, contact info, labelled form fields, subject options, spam protection placeholder, admin handoff target, validation/success/error/rate-limit/pending states, footer/newsletter continuity, and generated page artifact.

Full suite after Phase 3 Contact:

- Command: `npm.cmd test`
- Result: passed.
- Tests: 81 passed, 0 failed.

Phase 4 Admin Dashboard red setup:

- Added `tests/admin-dashboard.test.js`.
- Updated `tests/run-tests.js`.
- Updated `package.json` with `test:admin-dashboard`.
- Expected next result: failing Admin Dashboard tests because the plan, renderer, helper functions, and generated page content did not exist yet.

Phase 4 Admin Dashboard red result:

- Command: `node tests\admin-dashboard.test.js`
- Result: failed as expected.
- Tests: 0 passed, 7 failed.
- Failure reason: Admin Dashboard plan and renderer were missing, and the page was still a Phase 0 placeholder.

Phase 4 Admin Dashboard implementation attempt:

- Added `docs/PHASE4_ADMIN_DASHBOARD_PLAN.md`.
- Added `src/render/admin-dashboard.js`.
- Replaced `src/pages/admin/dashboard.html` placeholder with renderer-shaped Admin Dashboard content from the final Open Design wireframe contract.

Phase 4 Admin Dashboard focused fix:

- Adjusted recent activity to show the draft article dek as the visible item text so editors see the draft work type immediately.

Phase 4 Admin Dashboard green result:

- Command: `node tests\admin-dashboard.test.js`
- Result: passed.
- Tests: 7 passed, 0 failed.
- Covered: Admin Dashboard plan, authenticated editor route contract, admin nav, fixture-derived metrics, recent activity table, quick actions, loading/empty/error/permission-denied states, and generated page artifact.

Full suite after Phase 4 Admin Dashboard:

- Command: `npm.cmd test`
- Result: passed.
- Tests: 88 passed, 0 failed.

Phase 4 Article Management red setup:

- Added `tests/article-management.test.js`.
- Updated `tests/run-tests.js`.
- Updated `package.json` with `test:article-management`.
- Expected next result: failing Article Management tests because the plan, renderer, and generated page content did not exist yet.

Phase 4 Article Management red result:

- Command: `node tests\article-management.test.js`
- Result: failed as expected.
- Tests: 0 passed, 7 failed.
- Failure reason: Article Management plan and renderer were missing, and the page was still a Phase 0 placeholder.

Phase 4 Article Management implementation attempt:

- Added `docs/PHASE4_ARTICLE_MANAGEMENT_PLAN.md`.
- Added `src/render/article-management.js`.
- Replaced `src/pages/admin/article-management.html` placeholder with renderer-shaped Article Management content from the final Open Design wireframe contract.

Phase 4 Article Management green result:

- Command: `node tests\article-management.test.js`
- Result: passed.
- Tests: 7 passed, 0 failed.
- Covered: Article Management plan, authenticated editor route contract, article toolbar, fixture-derived stats, all article rows including drafts, editor form fields, row actions, and publishing states.

Phase 4 Article Management syntax verification:

- Command: `node --check .\src\render\article-management.js`
- Result: passed.
- Command: `node --check .\tests\article-management.test.js`
- Result: passed.

Full suite after Phase 4 Article Management:

- Command: `npm.cmd test`
- Result: passed.
- Tests: 95 passed, 0 failed.

Phase 4 Profile / Media Management red setup:

- Added `tests/profile-media-management.test.js`.
- Updated `tests/run-tests.js`.
- Updated `package.json` with `test:profile-media-management`.
- Expected next result: failing Profile / Media Management tests because the plan, renderer, and generated page content did not exist yet.

Phase 4 Profile / Media Management red result:

- Command: `node tests\profile-media-management.test.js`
- Result: failed as expected.
- Tests: 0 passed, 8 failed.
- Failure reason: Profile / Media Management plan and renderer were missing, and the page was still a Phase 0 placeholder.

Phase 4 Profile / Media Management implementation attempt:

- Added `docs/PHASE4_PROFILE_MEDIA_MANAGEMENT_PLAN.md`.
- Added `src/render/profile-media-management.js`.
- Replaced `src/pages/admin/profile-media-management.html` placeholder with renderer-shaped Profile / Media Management content from the final Open Design wireframe contract.

Phase 4 Profile / Media Management green result:

- Command: `node tests\profile-media-management.test.js`
- Result: passed.
- Tests: 8 passed, 0 failed.
- Covered: Profile / Media Management plan, authenticated editor route contract, profile grouping, profile completeness, media metadata, media usage, publish readiness, upload/select metadata form, and required states.

Phase 4 Profile / Media Management syntax verification:

- Command: `node --check .\src\render\profile-media-management.js`
- Result: passed.
- Command: `node --check .\tests\profile-media-management.test.js`
- Result: passed.

Full suite after Phase 4 Profile / Media Management:

- Command: `npm.cmd test`
- Result: passed.
- Tests: 103 passed, 0 failed.

Phase 4 Comments / Reviews Moderation red setup:

- Added `tests/comments-reviews-moderation.test.js`.
- Updated `tests/run-tests.js`.
- Updated `package.json` with `test:comments-reviews-moderation`.
- Expected next result: failing Comments / Reviews Moderation tests because the plan, renderer, and generated page content did not exist yet.

Phase 4 Comments / Reviews Moderation red result:

- Command: `node tests\comments-reviews-moderation.test.js`
- Result: failed as expected.
- Tests: 0 passed, 8 failed.
- Failure reason: Comments / Reviews Moderation plan and renderer were missing, and the page was still a Phase 0 placeholder.

Phase 4 Comments / Reviews Moderation implementation attempt:

- Added `docs/PHASE4_COMMENTS_REVIEWS_MODERATION_PLAN.md`.
- Added `src/render/comments-reviews-moderation.js`.
- Replaced `src/pages/admin/comments-reviews-moderation.html` placeholder with renderer-shaped Comments / Reviews Moderation content from the final Open Design wireframe contract.

Phase 4 Comments / Reviews Moderation green result:

- Command: `node tests\comments-reviews-moderation.test.js`
- Result: passed.
- Tests: 8 passed, 0 failed.
- Covered: moderation plan, authenticated editor route contract, combined comments/reviews queue, fixture-derived stats, pending counts, search and filters, selected-item panel, approve/reject/delete actions, approved-only public rendering, undo, error, and permission states.

Phase 4 Comments / Reviews Moderation syntax verification:

- Command: `node --check .\src\render\comments-reviews-moderation.js`
- Result: passed.
- Command: `node --check .\tests\comments-reviews-moderation.test.js`
- Result: passed.

Full suite after Phase 4 Comments / Reviews Moderation:

- Command: `npm.cmd test`
- Result: passed.
- Tests: 111 passed, 0 failed.

Phase 4 Contact Submissions red setup:

- Added `tests/contact-submissions.test.js`.
- Updated `tests/run-tests.js`.
- Updated `package.json` with `test:contact-submissions`.
- Expected next result: failing Contact Submissions tests because the plan, renderer, and generated page content did not exist yet.

Phase 4 Contact Submissions red result:

- Command: `node tests\contact-submissions.test.js`
- Result: failed as expected.
- Tests: 0 passed, 8 failed.
- Failure reason: Contact Submissions plan and renderer were missing, and the page was still a Phase 0 placeholder.

Phase 4 Contact Submissions implementation attempt:

- Added `docs/PHASE4_CONTACT_SUBMISSIONS_PLAN.md`.
- Added `src/render/contact-submissions.js`.
- Replaced `src/pages/admin/contact-submissions.html` placeholder with renderer-shaped Contact Submissions content from the final Open Design wireframe contract.

Phase 4 Contact Submissions green result:

- Command: `node tests\contact-submissions.test.js`
- Result: passed.
- Tests: 8 passed, 0 failed.
- Covered: Contact Submissions plan, authenticated editor route contract, fixture-derived submission rows, new count stats, search and filters, inbox/detail split, mark-read/archive/reply actions, and loading/empty/archive-success/error/permission states.

Phase 4 Contact Submissions syntax verification:

- Command: `node --check .\src\render\contact-submissions.js`
- Result: passed.
- Command: `node --check .\tests\contact-submissions.test.js`
- Result: passed.

Full suite after Phase 4 Contact Submissions:

- Command: `npm.cmd test`
- Result: passed.
- Tests: 119 passed, 0 failed.

MVP implementation coverage review red setup:

- Added `tests/mvp-coverage-readiness.test.js`.
- Updated `tests/run-tests.js`.
- Updated `package.json` with `test:mvp-coverage`.
- Expected next result: failing coverage test because the MVP implementation coverage review doc did not exist yet.

MVP implementation coverage review red result:

- Command: `node tests\mvp-coverage-readiness.test.js`
- Result: failed as expected after tightening BOM handling.
- Tests: 3 passed, 1 failed.
- Failure reason: `docs/MVP_IMPLEMENTATION_COVERAGE_REVIEW.md` was missing.

MVP implementation coverage review implementation attempt:

- Added `docs/MVP_IMPLEMENTATION_COVERAGE_REVIEW.md`.
- Documented 14 core route artifacts, 9 public routes, 5 admin routes, remaining support screens, frontend app integration, authentication, backend persistence, visual styling, forms/mutations, and launch readiness gaps.

MVP implementation coverage review green result:

- Command: `node tests\mvp-coverage-readiness.test.js`
- Result: passed.
- Tests: 4 passed, 0 failed.
- Covered: readiness doc, generated non-placeholder route artifacts, renderer/script registration, and explicit support-screen gap tracking.

MVP implementation coverage review syntax verification:

- Command: `node --check .\tests\mvp-coverage-readiness.test.js`
- Result: passed.

Full suite after MVP implementation coverage review:

- Command: `npm.cmd test`
- Result: passed.
- Tests: 123 passed, 0 failed.

Phase 5 Auth Support Screens red setup:

- Added `tests/auth-support.test.js`.
- Updated `tests/run-tests.js`.
- Updated `package.json` with `test:auth-support`.
- Expected next result: failing Auth Support tests because the plan, renderer, and generated page content did not exist yet.

Phase 5 Auth Support Screens red result:

- Command: `node tests\auth-support.test.js`
- Result: failed as expected.
- Tests: 0 passed, 7 failed.
- Failure reason: Auth Support plan and renderer were missing, and Admin Login / Password Reset page artifacts did not exist yet.

Phase 5 Auth Support Screens implementation attempt:

- Added `docs/PHASE5_AUTH_SUPPORT_SCREENS_PLAN.md`.
- Added `src/render/admin-auth.js`.
- Generated `src/pages/admin/login.html` and `src/pages/admin/password-reset.html` from the auth renderer.
- Updated `tests/mvp-coverage-readiness.test.js` and `docs/MVP_IMPLEMENTATION_COVERAGE_REVIEW.md` so auth support routes are now implemented and remaining support gaps stay explicit.

Phase 5 Auth Support Screens green result:

- Command: `node tests\auth-support.test.js`
- Result: passed.
- Tests: 7 passed, 0 failed.
- Covered: Admin Login contract, Password Reset contract, labelled fields, recovery paths, neutral copy, auth/security states, token/rate-limit notes, and generated artifacts.

MVP coverage update after auth support:

- Command: `node tests\mvp-coverage-readiness.test.js`
- Result: passed.
- Tests: 4 passed, 0 failed.

Phase 5 Auth Support syntax verification:

- Command: `node --check .\src\render\admin-auth.js`
- Result: passed.
- Command: `node --check .\tests\auth-support.test.js`
- Result: passed.
- Command: `node --check .\tests\mvp-coverage-readiness.test.js`
- Result: passed.

Full suite after Phase 5 Auth Support Screens:

- Command: `npm.cmd test`
- Result: passed.
- Tests: 130 passed, 0 failed.

Phase 5 Error Support Screens red setup:

- Added `tests/error-support.test.js`.
- Updated `tests/run-tests.js`.
- Updated `package.json` with `test:error-support`.
- Expected next result: failing Error Support tests because the plan, renderer, and generated page content did not exist yet.

Phase 5 Error Support Screens red result:

- Command: `node tests\error-support.test.js`
- Result: failed as expected.
- Tests: 0 passed, 7 failed.
- Failure reason: Error Support plan and renderer were missing, and 404 / 500 / Offline page artifacts did not exist yet.

Phase 5 Error Support Screens implementation attempt:

- Added `docs/PHASE5_ERROR_SUPPORT_SCREENS_PLAN.md`.
- Added `src/render/error-support.js`.
- Generated `src/pages/not-found.html`, `src/pages/server-error.html`, and `src/pages/offline-maintenance.html` from the error support renderer.
- Updated `tests/mvp-coverage-readiness.test.js` and `docs/MVP_IMPLEMENTATION_COVERAGE_REVIEW.md` so 404, 500, and Offline/Maintenance support routes are now implemented and remaining support gaps stay explicit.

Phase 5 Error Support Screens green result:

- Command: `node tests\error-support.test.js`
- Result: passed.
- Tests: 7 passed, 0 failed.
- Covered: 404, 500, Offline/Maintenance contracts, shared public nav, recovery routes, plain-language copy, retry/refresh actions, state notes, and generated artifacts.

MVP coverage update after error support:

- Command: `node tests\mvp-coverage-readiness.test.js`
- Result: passed.
- Tests: 4 passed, 0 failed.

Phase 5 Error Support syntax verification:

- Command: `node --check .\src\render\error-support.js`
- Result: passed.
- Command: `node --check .\tests\error-support.test.js`
- Result: passed.
- Command: `node --check .\tests\mvp-coverage-readiness.test.js`
- Result: passed.

Full suite after Phase 5 Error Support Screens:

- Command: `npm.cmd test`
- Result: passed.
- Tests: 137 passed, 0 failed.

Phase 5 Admin Workflow Support Screens red setup:

- Added `tests/admin-workflow-support.test.js`.
- Updated `tests/run-tests.js`.
- Updated `package.json` with `test:admin-workflow-support`.
- Expected next result: failing Admin Workflow Support tests because the plan, renderer, and generated page content did not exist yet.

Phase 5 Admin Workflow Support Screens red result:

- Command: `node tests\admin-workflow-support.test.js`
- Result: failed as expected.
- Tests: 0 passed, 7 failed.
- Failure reason: Admin Workflow Support plan and renderer were missing, and Media Upload Modal / Article Editor Workflow page artifacts did not exist yet.

Phase 5 Admin Workflow Support Screens implementation attempt:

- Added `docs/PHASE5_ADMIN_WORKFLOW_SUPPORT_PLAN.md`.
- Added `src/render/admin-workflow-support.js`.
- Generated `src/pages/admin/media-upload-modal.html` and `src/pages/admin/article-editor-workflow.html` from the admin workflow support renderer.
- Updated `tests/mvp-coverage-readiness.test.js` and `docs/MVP_IMPLEMENTATION_COVERAGE_REVIEW.md` so Media Upload Modal and Article Editor Workflow are now implemented and Mobile Wireframe Comps remain tracked.

Phase 5 Admin Workflow Support Screens green result:

- Command: `node tests\admin-workflow-support.test.js`
- Result: passed.
- Tests: 7 passed, 0 failed.
- Covered: media upload modal metadata, focus trap, Escape close, focus return, upload states/actions, article editor workflow steps, readiness checklist, SEO review, publish states, rollback path, and generated artifacts.

MVP coverage update after admin workflow support:

- Command: `node tests\mvp-coverage-readiness.test.js`
- Result: passed.
- Tests: 4 passed, 0 failed.

Phase 5 Admin Workflow Support syntax verification:

- Command: `node --check .\src\render\admin-workflow-support.js`
- Result: passed.
- Command: `node --check .\tests\admin-workflow-support.test.js`
- Result: passed.
- Command: `node --check .\tests\mvp-coverage-readiness.test.js`
- Result: passed.

Full suite after Phase 5 Admin Workflow Support Screens:

- Command: `npm.cmd test`
- Result: passed.
- Tests: 144 passed, 0 failed.

Phase 5 Mobile Wireframe Comps red setup:

- Added `tests/mobile-wireframe-comps.test.js`.
- Updated `tests/run-tests.js`.
- Updated `package.json` with `test:mobile-wireframes`.
- Expected next result: failing Mobile Wireframe Comps tests because the plan, renderer, and generated page content did not exist yet.

Phase 5 Mobile Wireframe Comps red result:

- Command: `node tests\mobile-wireframe-comps.test.js`
- Result: failed as expected.
- Tests: 0 passed, 7 failed.
- Failure reason: Mobile Wireframe Comps plan and renderer were missing, and `src/pages/mobile-wireframes.html` did not exist yet.

Phase 5 Mobile Wireframe Comps implementation attempt:

- Added `docs/PHASE5_MOBILE_WIREFRAME_COMPS_PLAN.md`.
- Added `src/render/mobile-wireframe-comps.js`.
- Generated `src/pages/mobile-wireframes.html` from the mobile wireframe comps renderer.
- Updated `tests/mvp-coverage-readiness.test.js` and `docs/MVP_IMPLEMENTATION_COVERAGE_REVIEW.md` so all support wireframes are now implemented as generated prototype contracts.

Phase 5 Mobile Wireframe Comps green result:

- Command: `node tests\mobile-wireframe-comps.test.js`
- Result: passed.
- Tests: 7 passed, 0 failed.
- Covered: compressed mobile nav, Home / Article / Search / Contact mobile comps, Dashboard / Editor / Moderate / Inbox admin comps, 360 / 390 / 430 / tablet breakpoints, touch targets, no overlap, visible focus, readable type, stable controls, and generated artifact.

MVP coverage update after mobile wireframe comps:

- Command: `node tests\mvp-coverage-readiness.test.js`
- Result: passed.
- Tests: 4 passed, 0 failed.

Phase 5 Mobile Wireframe Comps syntax verification:

- Command: `node --check .\src\render\mobile-wireframe-comps.js`
- Result: passed.
- Command: `node --check .\tests\mobile-wireframe-comps.test.js`
- Result: passed.
- Command: `node --check .\tests\mvp-coverage-readiness.test.js`
- Result: passed.

Full suite after Phase 5 Mobile Wireframe Comps:

- Command: `npm.cmd test`
- Result: passed.
- Tests: 151 passed, 0 failed.

Frontend App Integration Plan red setup:

- Added `tests/frontend-app-integration-plan.test.js`.
- Updated `tests/run-tests.js`.
- Updated `package.json` with `test:frontend-plan`.
- Expected next result: failing Frontend App Integration Plan tests because `docs/FRONTEND_APP_INTEGRATION_PLAN.md` did not exist yet.

Frontend App Integration Plan red result:

- Command: `node tests\frontend-app-integration-plan.test.js`
- Result: failed as expected.
- Tests: 0 passed, 5 failed.
- Failure reason: frontend integration plan document was missing.

Frontend App Integration Plan implementation attempt:

- Added `docs/FRONTEND_APP_INTEGRATION_PLAN.md`.
- Documented React as the production target while preserving the no-new-React-app-inside-this-prototype boundary until the production app location is confirmed.
- Mapped all public, admin, and support routes.
- Documented component migration slices, API/auth/persistence work, mutation queue, TDD gates, and launch verification gates.
- Updated `tests/mvp-coverage-readiness.test.js` and `docs/MVP_IMPLEMENTATION_COVERAGE_REVIEW.md` to expect 156 passing tests and the registered frontend-plan script.

Frontend App Integration Plan green result:

- Command: `node tests\frontend-app-integration-plan.test.js`
- Result: passed.
- Tests: 5 passed, 0 failed.

MVP coverage update after frontend app integration plan:

- Command: `node tests\mvp-coverage-readiness.test.js`
- Result: passed.
- Tests: 4 passed, 0 failed.

Frontend App Integration Plan syntax verification:

- Command: `node --check .\tests\frontend-app-integration-plan.test.js`
- Result: passed.

Roadmap and Sprint Plan refresh red setup:

- Added `tests/roadmap-sprint-docs.test.js`.
- Updated `tests/run-tests.js`.
- Updated `package.json` with `test:roadmap-sprints`.
- Expected next result: failing roadmap/sprint doc tests because the June 30 roadmap and scaffold docs were stale and `docs/SPRINT_PLAN_JULY_2026.md` did not exist yet.

Roadmap and Sprint Plan refresh red result:

- Command: `node tests\roadmap-sprint-docs.test.js`
- Result: failed as expected.
- Tests: 0 passed, 5 failed.
- Failure reason: roadmap date/current status was stale, sprint plan was missing, scaffold/Open Design docs were stale, and plan status did not point to the refreshed sprint plan.

Roadmap and Sprint Plan refresh implementation attempt:

- Replaced `docs/IMPLEMENTATION_PLAN_JULY_2026.md` with the July 2 production integration roadmap.
- Added `docs/SPRINT_PLAN_JULY_2026.md` with Sprint 0 complete and Sprint 1-5 launch windows.
- Updated `docs/FRONTEND_SCAFFOLD_PLAN.md` and `docs/OPEN_DESIGN_STATUS.md` for the completed wireframe-backed prototype and React migration handoff.
- Updated `docs/MVP_IMPLEMENTATION_COVERAGE_REVIEW.md`, `docs/FRONTEND_APP_INTEGRATION_PLAN.md`, and coverage tests for the new 161-test baseline.

Roadmap and Sprint Plan refresh first full-suite result:

- Command: `npm.cmd test`
- Result: failed.
- Tests: 159 passed, 2 failed.
- Failure reason: older scaffold/frontend-plan assertions still expected the previous Phase 0 wording and 151-test baseline.
- Fix: updated `docs/FRONTEND_SCAFFOLD_PLAN.md` to keep Phase 0 completion wording and updated `tests/frontend-app-integration-plan.test.js` to expect the 161-test refreshed baseline.

Roadmap and Sprint Plan refresh focused rerun:

- Command: `node tests\scaffold.test.js`, `node tests\frontend-app-integration-plan.test.js`, `node tests\roadmap-sprint-docs.test.js`, `node tests\mvp-coverage-readiness.test.js`
- Result: roadmap and coverage tests passed; scaffold and frontend-plan tests still had wording mismatches.
- Fix: restored explicit Next.js handoff wording in `docs/FRONTEND_SCAFFOLD_PLAN.md` and changed the frontend plan baseline wording to the exact `161 passing tests` phrase.

Roadmap and Sprint Plan refresh wording fix:

- Restored the exact route scaffold tests phrase in docs/FRONTEND_SCAFFOLD_PLAN.md for the existing scaffold contract test.


Roadmap and Sprint Plan refresh green result:

- Command: `npm.cmd test`
- Result: passed.
- Tests: 161 passed, 0 failed.
- Covered: updated roadmap, compressed sprint plan, completed prototype scaffold handoff, Open Design local handoff status, production React boundary, and current coverage baseline.

Sprint 1 App Shell Boundary red setup:

- Added `tests/production-app-shell.test.js`.
- Updated `tests/run-tests.js`.
- Updated `package.json` with `test:app-shell`.
- Expected next result: failing app-shell tests because `docs/PRODUCTION_APP_BOUNDARY.md` and `apps/web` did not exist yet.

Sprint 1 App Shell Boundary red result:

- Command: `node tests\production-app-shell.test.js`
- Result: failed as expected.
- Tests: 0 passed, 5 failed.
- Failure reason: production boundary doc, app shell scaffold, route registry, layouts, and app handoff docs were missing.

Sprint 1 App Shell Boundary implementation attempt:

- Added `docs/PRODUCTION_APP_BOUNDARY.md`.
- Added `apps/web/package.json`, `index.html`, `src/main.jsx`, `src/App.jsx`, `src/routes.js`, layout shells, styles, and README.
- Kept this slice dependency-light with no dependency install.

Sprint 1 App Shell Boundary green result:

- Command: `node tests\production-app-shell.test.js`
- Result: passed.
- Tests: 5 passed, 0 failed.
Sprint 1 App Shell Boundary full-suite result:

- Command: `npm.cmd test`
- Result: passed.
- Tests: 166 passed, 0 failed.
- Covered: production app boundary doc, React-ready `apps/web` shell scaffold, shared route registry, public/admin layouts, roadmap/sprint docs, and all existing MVP wireframe contracts.
Sprint 1 Route Smoke Gate red result:

- Command: `node tests\production-route-smoke.test.js`
- Result: failed as expected.
- Tests: 0 passed, 4 failed.
- Failure reason: `apps/web/src/routeSmoke.js` and route smoke documentation were missing.

Sprint 1 Route Smoke Gate implementation attempt:

- Added `apps/web/src/routeSmoke.js`.
- Updated `apps/web/src/routes.js` with dynamic article route matching.
- Registered `test:route-smoke` and wired `tests/production-route-smoke.test.js` into the full suite.
- Updated README, roadmap, sprint plan, plan status, and coverage baseline to the 170-test slice.
Sprint 1 Route Smoke Gate focused green result:

- Command: `node tests\production-route-smoke.test.js`
- Result: passed.
- Tests: 4 passed, 0 failed.
- Covered: all 22 route smoke records, public/admin layout selection, protected route metadata, dynamic article slug resolution, 404 fallback, script registration, and README/plan status handoff.
Sprint 1 Route Smoke Gate full-suite result:

- Command: `npm.cmd test`
- Result: passed.
- Tests: 170 passed, 0 failed.
- Covered: all previous MVP wireframe contracts plus production app shell and dependency-free route smoke gate.
Sprint 2 Home Route Migration red result:

- Command: `node tests\production-home-route.test.js`
- Result: failed as expected.
- Tests: 0 passed, 4 failed.
- Failure reason: Home route model, HomePage component, and Home migration docs were missing.

Sprint 2 Home Route Migration implementation attempt:

- Added `apps/web/src/pages/homeRouteModel.js`.
- Added `apps/web/src/pages/HomePage.jsx`.
- Wired the Home route through `apps/web/src/App.jsx`.
- Registered `test:production-home` and wired `tests/production-home-route.test.js` into the full suite.
- Updated README, plan status, roadmap, sprint plan, and coverage baseline to the 174-test slice.
Sprint 2 Home Route Migration focused green result:

- Command: `node tests\production-home-route.test.js`
- Result: passed.
- Tests: 4 passed, 0 failed.
- Covered: Home route model, published-only article slots, lead story selection, category/media/people previews, newsletter action, HomePage scaffold, script registration, and handoff docs.
Sprint 2 Home Route Migration full-suite result:

- Command: `npm.cmd test`
- Result: passed.
- Tests: 174 passed, 0 failed.
- Covered: all MVP wireframe contracts, production app shell, route smoke gate, and first production Home route migration contract.
Sprint 2 About Route Migration red result:

- Command: `node tests\production-about-route.test.js`
- Result: failed as expected.
- Tests: 0 passed, 4 failed.
- Failure reason: About route model, AboutPage component, and About migration docs were missing.

Sprint 2 About Route Migration implementation attempt:

- Added `apps/web/src/pages/aboutRouteModel.js`.
- Added `apps/web/src/pages/AboutPage.jsx`.
- Wired the About route through `apps/web/src/App.jsx`.
- Registered `test:production-about` and wired `tests/production-about-route.test.js` into the full suite.
- Updated README, plan status, roadmap, sprint plan, and coverage baseline to the 178-test slice.
Sprint 2 About Route Migration focused green result:

- Command: `node tests\production-about-route.test.js`
- Result: passed.
- Tests: 4 passed, 0 failed.
- Covered: About route model, mission/vision/organisation overview, editorial pillars, route cards, newsletter states, AboutPage scaffold, AppShell wiring, script registration, and handoff docs.
Sprint 2 About Route Migration full-suite result:

- Command: `npm.cmd test`
- Result: passed.
- Tests: 178 passed, 0 failed.
- Covered: all MVP wireframe contracts, production app shell, route smoke gate, Home migration, and About migration.
Sprint 2 Visceral Mag Route Migration red result:

- Command: `node tests\production-visceral-mag-route.test.js`
- Result: failed as expected.
- Tests: 0 passed, 5 failed.
- Failure reason: Visceral Mag route model, VisceralMagPage component, and Visceral Mag migration docs were missing.

Sprint 2 Visceral Mag Route Migration implementation attempt:

- Added `apps/web/src/pages/visceralMagRouteModel.js`.
- Added `apps/web/src/pages/VisceralMagPage.jsx`.
- Wired the Visceral Mag route through `apps/web/src/App.jsx`.
- Registered `test:production-visceral-mag` and wired `tests/production-visceral-mag-route.test.js` into the full suite.
- Updated README, plan status, roadmap, sprint plan, and coverage baseline to the 183-test slice.
Sprint 2 Visceral Mag Route Migration focused green result:

- Command: `node tests\production-visceral-mag-route.test.js`
- Result: passed.
- Tests: 5 passed, 0 failed.
- Covered: Visceral Mag archive model, search entry, category filters, published-only article listing, category metadata, author metadata, VisceralMagPage scaffold, AppShell wiring, script registration, and handoff docs.
Sprint 2 Visceral Mag Route Migration full-suite result:

- Command: `npm.cmd test`
- Result: passed.
- Tests: 183 passed, 0 failed.
- Covered: all MVP wireframe contracts, production app shell, route smoke gate, Home migration, About migration, and Visceral Mag migration.
Sprint 2 Article Detail Route Migration red result:

- Command: `node tests\production-article-detail-route.test.js`
- Result: failed as expected.
- Tests: 0 passed, 6 failed.
- Failure reason: Article Detail route model, ArticleDetailPage component, and Article Detail migration docs were missing.

Sprint 2 Article Detail Route Migration implementation attempt:

- Added `apps/web/src/pages/articleDetailRouteModel.js`.
- Added `apps/web/src/pages/ArticleDetailPage.jsx`.
- Wired the dynamic Article Detail route through `apps/web/src/App.jsx`.
- Registered `test:production-article-detail` and wired `tests/production-article-detail-route.test.js` into the full suite.
- Updated README, plan status, roadmap, sprint plan, and coverage baseline to the 189-test slice.
Sprint 2 Article Detail Route Migration focused green result:

- Command: `node tests\production-article-detail-route.test.js`
- Result: passed.
- Tests: 6 passed, 0 failed.
- Covered: published article lookup, dynamic route metadata, draft/missing not-found state, body blocks, related articles, SEO metadata, approved-only comments/reviews, ArticleDetailPage scaffold, AppShell wiring, script registration, and handoff docs.
Sprint 2 Article Detail Route Migration full-suite result:

- Command: `npm.cmd test`
- Result: passed.
- Tests: 189 passed, 0 failed.
- Covered: all MVP wireframe contracts, production app shell, route smoke gate, Home migration, About migration, Visceral Mag migration, and Article Detail migration.
Sprint 2 Categories/Search Route Migration red result:

- Command: `node tests\production-categories-search-route.test.js`
- Result: failed as expected.
- Tests: 0 passed, 7 failed.
- Failure reason: Categories/Search route model, CategoriesSearchPage component, and Categories/Search migration docs were missing.

Sprint 2 Categories/Search Route Migration implementation attempt:

- Added `apps/web/src/pages/categoriesSearchRouteModel.js`.
- Added `apps/web/src/pages/CategoriesSearchPage.jsx`.
- Wired the Search route through `apps/web/src/App.jsx`.
- Registered `test:production-categories-search` and wired `tests/production-categories-search-route.test.js` into the full suite.
- Updated README, plan status, roadmap, sprint plan, and coverage baseline to the 196-test slice.
Sprint 2 Categories/Search Route Migration focused green result:

- Command: `node tests\production-categories-search-route.test.js`
- Result: passed.
- Tests: 7 passed, 0 failed.
- Covered: search surface model, launch category chips, published-only filtering, keyword/category/combined filters, no-results/reset state, CategoriesSearchPage scaffold, AppShell wiring, script registration, and handoff docs.
Sprint 2 Categories/Search Route Migration full-suite result:

- Command: `npm.cmd test`
- Result: passed.
- Tests: 196 passed, 0 failed.
- Covered: all MVP wireframe contracts, production app shell, route smoke gate, Home, About, Visceral Mag, Article Detail, and Categories/Search migrations.
Sprint 2 Featured/Media Route Migration red result:

- Command: `node tests\production-featured-media-route.test.js`
- Result: failed as expected.
- Tests: 0 passed, 6 failed.
- Failure reason: Featured/Media route model, FeaturedMediaPage component, and Featured/Media migration docs were missing.

Sprint 2 Featured/Media Route Migration implementation attempt:

- Added `apps/web/src/pages/featuredMediaRouteModel.js`.
- Added `apps/web/src/pages/FeaturedMediaPage.jsx`.
- Wired the Featured route through `apps/web/src/App.jsx`.
- Registered `test:production-featured-media` and wired `tests/production-featured-media-route.test.js` into the full suite.
- Updated README, plan status, roadmap, sprint plan, and coverage baseline to the 202-test slice.
Sprint 2 Featured/Media Route Migration focused green result:

- Command: `node tests\production-featured-media-route.test.js`
- Result: passed.
- Tests: 6 passed, 0 failed.
- Covered: Featured/Media gallery model, media metadata, published-only article media links, draft exclusion, empty media state, FeaturedMediaPage scaffold, AppShell wiring, script registration, and handoff docs.
Sprint 2 Featured/Media Route Migration full-suite result:

- Command: `npm.cmd test`
- Result: passed.
- Tests: 202 passed, 0 failed.
- Covered: all MVP wireframe contracts, production app shell, route smoke gate, Home, About, Visceral Mag, Article Detail, Categories/Search, and Featured/Media migrations.
Sprint 2 Creative Team Route Migration red result:

- Command: `node tests\production-creative-team-route.test.js`
- Result: failed as expected.
- Tests: 0 passed, 6 failed.
- Failure reason: Creative Team route model, CreativeTeamPage component, and Creative Team migration docs were missing.

Sprint 2 Creative Team Route Migration implementation attempt:

- Added `apps/web/src/pages/creativeTeamRouteModel.js`.
- Added `apps/web/src/pages/CreativeTeamPage.jsx`.
- Wired the Creative Team route through `apps/web/src/App.jsx`.
- Registered `test:production-creative-team` and wired `tests/production-creative-team-route.test.js` into the full suite.
- Updated README, plan status, roadmap, sprint plan, and coverage baseline to the 208-test slice.
Sprint 2 Creative Team Route Migration focused green result:

- Command: `node tests\production-creative-team-route.test.js`
- Result: passed.
- Tests: 6 passed, 0 failed.
- Covered: Creative Team route model, creative-team-only profile filtering, profile card anatomy, editorial role note, social-link empty state, loading/error hooks, empty team state, footer paths, CreativeTeamPage scaffold, AppShell wiring, script registration, and handoff docs.
Sprint 2 Creative Team Route Migration full-suite result:

- Command: `npm.cmd test`
- Result: passed.
- Tests: 208 passed, 0 failed.
- Covered: all MVP wireframe contracts, production app shell, route smoke gate, Home, About, Visceral Mag, Article Detail, Categories/Search, Featured/Media, and Creative Team migrations.
Sprint 2 Contributors Route Migration red result:

- Command: `node tests\production-contributors-route.test.js`
- Result: failed as expected.
- Tests: 0 passed, 6 failed.
- Failure reason: Contributors route model, ContributorsPage component, and Contributors migration docs were missing.

Sprint 2 Contributors Route Migration implementation attempt:

- Added `apps/web/src/pages/contributorsRouteModel.js`.
- Added `apps/web/src/pages/ContributorsPage.jsx`.
- Wired the Contributors route through `apps/web/src/App.jsx`.
- Registered `test:production-contributors` and wired `tests/production-contributors-route.test.js` into the full suite.
- Updated README, plan status, roadmap, sprint plan, and coverage baseline to the 214-test slice.
Sprint 2 Contributors Route Migration focused green result:

- Command: `node tests\production-contributors-route.test.js`
- Result: passed.
- Tests: 6 passed, 0 failed.
- Covered: Contributors route model, contributor-only filtering, search/category controls, published-work links, draft exclusion, no-results/reset state, loading/error hooks, ContributorsPage scaffold, AppShell wiring, script registration, and handoff docs.
Sprint 2 Contributors Route Migration full-suite result:

- Command: `npm.cmd test`
- Result: passed.
- Tests: 214 passed, 0 failed.
- Covered: all MVP wireframe contracts, production app shell, route smoke gate, Home, About, Visceral Mag, Article Detail, Categories/Search, Featured/Media, Creative Team, and Contributors migrations.
Sprint 2 Contact Route Migration red result:

- Command: `node tests\production-contact-route.test.js`
- Result: failed as expected.
- Tests: 0 passed, 6 failed.
- Failure reason: Contact route model, ContactPage component, and Contact migration docs were missing.

Sprint 2 Contact Route Migration implementation attempt:

- Added `apps/web/src/pages/contactRouteModel.js`.
- Added `apps/web/src/pages/ContactPage.jsx`.
- Wired the Contact route through `apps/web/src/App.jsx`.
- Registered `test:production-contact` and wired `tests/production-contact-route.test.js` into the full suite.
- Updated README, plan status, roadmap, sprint plan, and coverage baseline to the 220-test slice.
Sprint 2 Contact Route Migration focused green result:

- Command: `npm.cmd run test:production-contact`
- Result: passed.
- Tests: 6 passed, 0 failed.
- Covered: Contact route model, subject options, required form fields, spam-protection placeholder, Contact Submissions target, validation/success/error/rate-limit/pending states, newsletter continuity, footer route continuity, ContactPage scaffold, AppShell wiring, script registration, and handoff docs.
Sprint 2 Contact Route Migration full-suite result:

- Command: `npm.cmd test`
- Result: passed.
- Tests: 220 passed, 0 failed.
- Covered: all MVP wireframe contracts, production app shell, route smoke gate, all 9 public React-ready route migrations, support routes, roadmap/sprint docs, and coverage readiness.
Sprint 3 Admin Dashboard Route Migration red result:

- Command: `node tests\production-admin-dashboard-route.test.js`
- Result: failed as expected.
- Tests: 0 passed, 6 failed.
- Failure reason: Admin Dashboard route model, AdminDashboardPage component, and migration docs were missing.

Sprint 3 Admin Dashboard Route Migration implementation attempt:

- Added `apps/web/src/pages/adminDashboardRouteModel.js`.
- Added `apps/web/src/pages/AdminDashboardPage.jsx`.
- Wired the Admin Dashboard route through `apps/web/src/App.jsx`.
- Registered `test:production-admin-dashboard` and wired `tests/production-admin-dashboard-route.test.js` into the full suite.
- Updated README, plan status, roadmap, sprint plan, and coverage baseline to the 226-test slice.
Sprint 3 Admin Dashboard Route Migration focused green result:

- Command: `npm.cmd run test:production-admin-dashboard`
- Result: passed.
- Tests: 6 passed, 0 failed.
- Covered: protected admin route model, editor auth handoff, fixture-derived metrics, recent activity, quick actions, loading/empty/error/permission states, AdminDashboardPage scaffold, AppShell wiring, script registration, and handoff docs.
Sprint 3 Admin Dashboard Route Migration full-suite result:

- Command: `npm.cmd test`
- Result: passed.
- Tests: 226 passed, 0 failed.
- Covered: all MVP wireframe contracts, production app shell, route smoke gate, all public React-ready route migrations, Admin Dashboard route migration, support routes, roadmap/sprint docs, and coverage readiness.
Sprint 3 Article Management Route Migration red result:

- Command: `node tests\production-article-management-route.test.js`
- Result: failed as expected.
- Tests: 0 passed, 7 failed.
- Failure reason: Article Management route model, ArticleManagementPage component, and migration docs were missing.

Sprint 3 Article Management Route Migration implementation attempt:

- Added `apps/web/src/pages/articleManagementRouteModel.js`.
- Added `apps/web/src/pages/ArticleManagementPage.jsx`.
- Wired the Article Management route through `apps/web/src/App.jsx`.
- Registered `test:production-article-management` and wired `tests/production-article-management-route.test.js` into the full suite.
- Updated README, plan status, roadmap, sprint plan, and coverage baseline to the 233-test slice.
Sprint 3 Article Management Route Migration focused green result:

- Command: `npm.cmd run test:production-article-management`
- Result: passed.
- Tests: 7 passed, 0 failed.
- Covered: protected editorial workflow model, draft-inclusive article rows, fixture-derived stats, toolbar filters, editor fields, row actions, publishing states, ArticleManagementPage scaffold, AppShell wiring, script registration, and handoff docs.
Sprint 3 Article Management Route Migration full-suite result:

- Command: `npm.cmd test`
- Result: passed.
- Tests: 233 passed, 0 failed.
- Covered: all MVP wireframe contracts, production app shell, route smoke gate, all public React-ready route migrations, Admin Dashboard and Article Management route migrations, support routes, roadmap/sprint docs, and coverage readiness.
Sprint 3 Profile / Media Management Route Migration red result:

- Command: `node tests\production-profile-media-management-route.test.js`
- Result: failed as expected.
- Tests: 0 passed, 7 failed.
- Failure reason: Profile / Media Management route model, ProfileMediaManagementPage component, and migration docs were missing.

Sprint 3 Profile / Media Management Route Migration implementation attempt:

- Added `apps/web/src/pages/profileMediaManagementRouteModel.js`.
- Added `apps/web/src/pages/ProfileMediaManagementPage.jsx`.
- Wired the Profile / Media Management route through `apps/web/src/App.jsx`.
- Registered `test:production-profile-media-management` and wired `tests/production-profile-media-management-route.test.js` into the full suite.
- Updated README, plan status, roadmap, sprint plan, and coverage baseline to the 240-test slice.
Sprint 3 Profile / Media Management Route Migration focused green result:

- Command: `npm.cmd run test:production-profile-media-management`
- Result: passed.
- Tests: 7 passed, 0 failed.
- Covered: protected people/media workflow model, contributor and Creative Team groups, media metadata/readiness, fixture-derived stats, upload/select form, keyboard fallback, upload/permission states, ProfileMediaManagementPage scaffold, AppShell wiring, script registration, and handoff docs.
Sprint 3 Profile / Media Management Route Migration full-suite result:

- Command: `npm.cmd test`
- Result: passed.
- Tests: 240 passed, 0 failed.
- Covered: all MVP wireframe contracts, production app shell, route smoke gate, all public React-ready route migrations, Admin Dashboard, Article Management, and Profile / Media Management route migrations, support routes, roadmap/sprint docs, and coverage readiness.
Sprint 3 Comments / Reviews Moderation Route Migration red result:

- Command: `node tests\production-comments-reviews-moderation-route.test.js`
- Result: failed as expected.
- Tests: 0 passed, 6 failed.
- Failure reason: Comments / Reviews Moderation route model, CommentsReviewsModerationPage component, and migration docs were missing.

Sprint 3 Comments / Reviews Moderation Route Migration implementation attempt:

- Added `apps/web/src/pages/commentsReviewsModerationRouteModel.js`.
- Added `apps/web/src/pages/CommentsReviewsModerationPage.jsx`.
- Wired the Moderation route through `apps/web/src/App.jsx`.
- Registered `test:production-comments-reviews-moderation` and wired `tests/production-comments-reviews-moderation-route.test.js` into the full suite.
- Updated README, plan status, roadmap, sprint plan, and coverage baseline to the 246-test slice.
Sprint 3 Comments / Reviews Moderation Route Migration focused green result:

- Command: `npm.cmd run test:production-comments-reviews-moderation`
- Result: passed.
- Tests: 6 passed, 0 failed.
- Covered: protected moderation workflow model, combined comments/reviews, article context, stats, queue filters, selected item actions, approved-only public rendering, CommentsReviewsModerationPage scaffold, AppShell wiring, script registration, and handoff docs.
Sprint 3 Comments / Reviews Moderation Route Migration full-suite result:

- Command: `npm.cmd test`
- Result: passed.
- Tests: 246 passed, 0 failed.
- Covered: all MVP wireframe contracts, production app shell, route smoke gate, all public React-ready route migrations, Admin Dashboard, Article Management, Profile / Media Management, and Comments / Reviews Moderation route migrations, support routes, roadmap/sprint docs, and coverage readiness.
Sprint 3 Contact Submissions Route Migration red result:

- Command: `node tests\production-contact-submissions-route.test.js`
- Result: failed as expected.
- Tests: 0 passed, 5 failed.
- Failure reason: Contact Submissions route model, ContactSubmissionsPage component, and migration docs were missing.

Sprint 3 Contact Submissions Route Migration implementation attempt:

- Added `apps/web/src/pages/contactSubmissionsRouteModel.js`.
- Added `apps/web/src/pages/ContactSubmissionsPage.jsx`.
- Wired the Contact Submissions route through `apps/web/src/App.jsx`.
- Registered `test:production-contact-submissions` and wired `tests/production-contact-submissions-route.test.js` into the full suite.
- Updated README, plan status, roadmap, sprint plan, and coverage baseline to the 251-test slice.
Sprint 3 Contact Submissions Route Migration focused green result:

- Command: `npm.cmd run test:production-contact-submissions`
- Result: passed.
- Tests: 5 passed, 0 failed.
- Covered: protected inbox workflow model, submission rows, stats, filters, detail panel, status actions, inbox states, ContactSubmissionsPage scaffold, AppShell wiring, script registration, and handoff docs.
Sprint 3 Contact Submissions Route Migration full-suite result:

- Command: `npm.cmd test`
- Result: passed.
- Tests: 251 passed, 0 failed.
- Covered: all MVP wireframe contracts, production app shell, route smoke gate, all 9 public React-ready route migrations, all 5 admin React-ready route migrations, support routes, roadmap/sprint docs, and coverage readiness.
Sprint 3 Auth Support Route Migration red result:

- Command: `node tests\production-auth-support-route.test.js`
- Result: failed as expected.
- Tests: 0 passed, 5 failed.
- Failure reason: Auth support route model, AdminLoginPage, PasswordResetPage, and migration docs were missing.

Sprint 3 Auth Support Route Migration implementation attempt:

- Added `apps/web/src/pages/adminAuthRouteModel.js`.
- Added `apps/web/src/pages/AdminLoginPage.jsx` and `apps/web/src/pages/PasswordResetPage.jsx`.
- Wired Admin Login and Password Reset through `apps/web/src/App.jsx`.
- Registered `test:production-auth-support` and wired `tests/production-auth-support-route.test.js` into the full suite.
- Updated README, plan status, roadmap, sprint plan, and coverage baseline to the 256-test slice.
Sprint 3 Auth Support Route Migration focused green result:

- Command: `npm.cmd run test:production-auth-support`
- Result: passed.
- Tests: 5 passed, 0 failed.
- Covered: admin login model, password reset model, recovery links, neutral reset copy, auth/security states, AdminLoginPage scaffold, PasswordResetPage scaffold, AppShell wiring, script registration, and handoff docs.
Sprint 3 Auth Support Route Migration full-suite result:

- Command: `npm.cmd test`
- Result: passed.
- Tests: 256 passed, 0 failed.
- Covered: all MVP wireframe contracts, production app shell, route smoke gate, all public/admin React-ready route migrations, auth support route migration, support route contracts, roadmap/sprint docs, and coverage readiness.
Sprint 3 Error Support Route Migration red result:

- Command: `node tests\production-error-support-route.test.js`
- Result: 5 failed, 0 passed.
- Failure reason: production error support model, React-ready 404/500/offline pages, AppShell routing, script registration, and handoff docs did not exist yet.

Sprint 3 Error Support Route Migration focused green result:

- Command: `npm.cmd run test:production-error-support`
- Result: 5 passed, 0 failed.
- Covered: 404, 500, and offline route metadata, shared recovery paths, page-specific action/state models, React-ready page scaffolds, AppShell routing, script registration, and handoff docs.
Sprint 3 Error Support Route Migration full-suite result:

- Command: `npm.cmd test`
- Result: 261 passed, 0 failed.
- Tests: 261 passed, 0 failed.
Sprint 3 Admin Workflow Support Route Migration red result:

- Command: `node tests\production-admin-workflow-support-route.test.js`
- Result: 5 failed, 0 passed.
- Failure reason: production admin workflow support model, Media Upload Modal page, Article Editor Workflow page, AppShell routing, script registration, and handoff docs did not exist yet.

Sprint 3 Admin Workflow Support Route Migration focused green result:

- Command: `npm.cmd run test:production-admin-workflow-support`
- Result: 5 passed, 0 failed.
- Covered: Media Upload Modal route metadata, modal accessibility, required media metadata, upload states/actions, Article Editor Workflow steps, checklist, SEO review, publish states/actions, React-ready pages, AppShell routing, script registration, and handoff docs.
Sprint 3 Admin Workflow Support Route Migration full-suite result:

- Command: `npm.cmd test`
- Result: 266 passed, 0 failed.
- Tests: 266 passed, 0 failed.
Sprint 3 Mobile Wireframe Comps Route Migration red result:

- Command: `node tests\production-mobile-wireframe-comps-route.test.js`
- Result: 5 failed, 0 passed.
- Failure reason: production mobile wireframe route model, Mobile Wireframe Comps page, AppShell routing, script registration, and handoff docs did not exist yet.

Sprint 3 Mobile Wireframe Comps Route Migration focused green result:

- Command: `npm.cmd run test:production-mobile-wireframes`
- Result: 5 passed, 0 failed.
- Covered: mobile route metadata, compressed nav, public/admin mobile comps, breakpoint rules, accessibility checks, React-ready page, AppShell routing, script registration, and handoff docs.
Sprint 3 Mobile Wireframe Comps Route Migration full-suite result:

- Command: `npm.cmd test`
- Result: 271 passed, 0 failed.
- Tests: 271 passed, 0 failed.
Sprint 3 Runtime Dependency Install red result:

- Command: `node tests\production-web-runtime.test.js`
- Result: 3 failed, 0 passed.
- Failure reason: runtime dependencies, preview script, Vite config, runtime docs, and script registration were not declared yet.

Sprint 3 Runtime Dependency Install focused green result:

- Command: `npm.cmd run test:web-runtime`
- Result: 3 passed, 0 failed before install.
- Covered: React/Vite package metadata, Vite config, runnable entry files, runtime commands, and docs wiring.

Sprint 3 Runtime Dependency Install attempt:

- Command: `npm.cmd install --cache C:\tmp\npm-cache`
- Result: install completed after the first default install attempt timed out.
- npm initially reported 2 vulnerabilities through Vite/esbuild.

Sprint 3 Runtime build failure and fix:

- Command: `npm.cmd run build`
- First sandbox result: failed with Windows `spawn EPERM` while esbuild tried to spawn.
- Escalated build result after BOM cleanup: failed because React pages imported prototype CommonJS fixtures from `src/content/fixtures.js`.
- Fix: added `apps/web/src/data/launchFixtures.js`, repointed React pages to ESM launch fixtures, and expanded `tests/production-web-runtime.test.js` to prevent CommonJS prototype fixture imports.

Sprint 3 Runtime Dependency Install audit/build result:

- Command: `npm.cmd install vite@^8.1.3 @vitejs/plugin-react@^6.0.3 --save-dev --cache C:\tmp\npm-cache`
- Result: upgraded Vite and React plugin; npm reported 0 vulnerabilities.
- Command: `npm.cmd run build`
- Result: Vite 8.1.3 production build passed.
- Command: `npm.cmd audit --audit-level=moderate --cache C:\tmp\npm-cache`
- Result: found 0 vulnerabilities.
Sprint 3 Runtime Dependency Install full-suite and dev-server result:

- Command: `npm.cmd test`
- Result: 275 passed, 0 failed.
- Command: `npm.cmd run dev` from `apps/web`
- Result: Vite 8.1.3 dev server started on `http://127.0.0.1:5173/` and returned HTTP 200.
- PID file: `apps/web/vite-dev.pid`.
Sprint 3 Production Visual System red result:

- Command: `node tests\production-visual-system.test.js`
- Result: 6 failed, 0 passed.
- Failure reason: production CSS tokens, route-section styling, form/action/focus styling, admin/support/mobile rules, responsive rules, script registration, and handoff docs were not present yet.

Sprint 3 Production Visual System focused green result:

- Command: `npm.cmd run test:visual-system`
- Result: 6 passed, 0 failed.
- Covered: editorial tokens, Georgia-based typography, no viewport-width font sizing, no negative letter spacing, route grids, cards, media, chips, forms, actions, state/focus styles, admin/support/mobile surfaces, and responsive layout rules.
Sprint 3 Production Visual System full-suite and build result:

- Command: `npm.cmd test`
- Result: 281 passed, 0 failed.
- Command: `npm.cmd run build` from `apps/web`
- First result: failed because PowerShell rewrote package JSON with a BOM and Vite/PostCSS rejected the JSON parse.
- Fix: rewrote `package.json`, `apps/web/package.json`, and `apps/web/package-lock.json` as UTF-8 without BOM.
- Final build result: Vite 8.1.3 production build passed with the production CSS bundle.
Sprint 3 Live Route QA red result:

- Command: `node tests\production-live-route-qa.test.js`
- Result: 3 failed, 0 passed.
- Failure reason: live route smoke script, npm script registration, full-suite registration, and docs were not present yet.

Sprint 3 Live Route QA implementation attempt:

- Added `apps/web/scripts/smoke-routes.mjs` to fetch all 22 MVP public/admin/support routes from the running Vite app.
- Added `test:live-route-qa`, `smoke:web:routes`, and app-level `smoke:routes` commands.
- Registered `tests/production-live-route-qa.test.js` in the full test runner.
- Updated app README and plan status docs with the live route smoke workflow.
Sprint 3 Browser Polish red result:

- Command: `node tests\production-browser-polish.test.js`
- Result: 3 failed, 0 passed.
- Failure reason: Vite public media files, newsletter email autocomplete metadata, and browser-polish docs/scripts were missing.

Sprint 3 Browser Polish implementation attempt:

- Added local Vite public media placeholders for the opening banner, photography feature, artwork feature, and profile image.
- Added newsletter `autoComplete="email"` metadata to the Home route.
- Registered `test:browser-polish` and included the gate in the full suite.

Browser Polish favicon follow-up:

- Chrome DevTools showed media assets returning 200 and a remaining /favicon.ico 404.
- Added pps/web/public/favicon.ico to the browser-polish asset contract.
Sprint 3 Browser Polish focused green result:

- Command: `npm.cmd run test:browser-polish`
- Result: 3 passed, 0 failed.
- Covered: Vite public media placeholders, favicon, Home newsletter autocomplete metadata, script registration, and browser-polish docs.

Sprint 3 Browser Polish full-suite and build result:

- Command: `npm.cmd test`
- Result: 287 passed, 0 failed.
- Command: `npm.cmd run build` from `apps/web`
- Result: Vite 8.1.3 production build passed.
- Note: sandboxed build hit Windows `spawn EPERM`; escalated build completed successfully.

Sprint 3 Browser Polish live verification:

- Command: `npm.cmd run smoke:web:routes`
- Result: all 22 MVP public/admin/support routes returned 200 from `http://127.0.0.1:5173`.
- Chrome DevTools result: Home route console shows only normal Vite/React dev messages; media requests return 200/304 and no favicon/media 404 remains.
- Screenshot: `apps/web/browser-qa-home.png`.
Figma Final Frontend Handoff red result:

- Command: `node tests\figma-final-frontend-handoff.test.js`
- Result: 2 passed, 3 failed.
- Failure reason: Figma source import was present, but handoff docs, runnable-app adoption, and script registration were not implemented yet.

Figma Final Frontend Handoff implementation attempt:

- Extracted `Author Website Design.make` into `designs/figma-author-website-design/`.
- Reconstructed the embedded Figma Make source repo from Git pack files at `designs/figma-author-website-design/source/`.
- Restored packaged LFS assets for the final logo image and PDF source asset.
- Added the Figma final frontend handoff doc.
- Adopted the logo-led header, search field, admin access, and Theatre Reviews / Book Reviews / Essays / Opinion section cues into the current runnable app without dropping the 22-route MVP contract.
Figma Final Frontend Handoff focused green result:

- Command: `npm.cmd run test:figma-final-frontend`
- Result: 5 passed, 0 failed.
- Covered: local Figma Make export preservation, reconstructed source repo, restored LFS assets, handoff documentation, current-app header adoption, and script/full-suite registration.

Figma Final Frontend Handoff full-suite and build result:

- Command: `npm.cmd test`
- Result: 292 passed, 0 failed.
- Command: `npm.cmd run build` from `apps/web`
- Result: Vite 8.1.3 production build passed.

Figma Final Frontend Handoff live verification:

- Command: `npm.cmd run smoke:web:routes`
- Result: all 22 MVP public/admin/support routes returned 200 from `http://127.0.0.1:5173`.
- Chrome DevTools result: Home route renders the final-design logo header, search field, Admin link, Theatre Reviews / Book Reviews / Essays / Opinion section shortcuts, and has no console errors beyond normal Vite/React dev messages.
- Screenshot: `apps/web/browser-qa-home-figma-final-header.png`.
Route Navigation Consistency red result:

- Command: `node tests\route-navigation-consistency.test.js`
- Result: 2 passed, 3 failed.
- Failure reason: route registry uniqueness passed, but visible public navigation did not yet expose a filtered route list and docs/scripts were not registered.

Route Navigation Consistency implementation attempt:

- Added `publicNavigationRoutes` to keep the full 22-route registry while excluding dynamic placeholder routes from visible navigation.
- Marked `article-detail` with `navVisible: false` while preserving dynamic route resolution for `/visceral-mag/:slug`.
- Updated `PublicLayout` to render `publicNavigationRoutes` instead of all public routes.
- Documented the decision that final-design Theatre Reviews, Book Reviews, Essays, and Opinion shortcuts resolve through `/search` query URLs instead of duplicate top-level routes.
Route Navigation Consistency focused green result:

- Command: `npm.cmd run test:route-nav-consistency`
- Result: 5 passed, 0 failed.
- Covered: unique 22-route registry, hidden dynamic article-detail route in visible nav, dynamic slug resolution, no duplicate public nav labels/hrefs, final-design section shortcuts mapped into `/search`, script registration, and handoff docs.

Route Navigation Consistency full-suite and build result:

- Command: `npm.cmd test`
- Result: 297 passed, 0 failed.
- Command: `npm.cmd run build` from `apps/web`
- Result: Vite 8.1.3 production build passed.

Route Navigation Consistency live verification:

- Command: `npm.cmd run smoke:web:routes`
- Result: all 22 MVP public/admin/support routes returned 200 from `http://127.0.0.1:5173`.
- Chrome DevTools result: Home public navigation no longer shows the dynamic `Article Detail` placeholder; final-design shortcuts point to `/search` query URLs; console shows only normal Vite/React dev messages.
- Screenshot: `apps/web/browser-qa-home-route-consistency.png`.
Figma-Centered Home Sprint red result:

- Command: `node tests\production-figma-centered-home.test.js`
- Result: 0 passed, 5 failed.
- Failure reason: the current app had the Figma final header cues, but the Home model, Home layout, footer, visual styles, scripts, and docs did not yet carry the final Figma magazine composition.

Figma-Centered Home Sprint implementation attempt:

- Added Figma final composition metadata to the Home route model while preserving the published-only MVP article contract.
- Reworked the runnable Home route toward the final Figma export: featured article, recent article grid, section rail, more-from-magazine list, media strip, people strip, and newsletter band.
- Added the Figma-style public footer with existing MVP routes only; Theatre Reviews, Book Reviews, Essays, and Opinion remain `/search` query links rather than duplicate top-level routes.
- Added the Figma-centered homepage visual-system styles and registered the focused test gate.
Figma-Centered Home Sprint focused green result:

- Command: `npm.cmd run test:production-figma-home`
- Result: 5 passed, 0 failed.
- Covered: Figma final home model composition, featured/recent/more/newsletter layout, Figma-style footer, no duplicate `/theatre` or `/books` top-level links, CSS adoption, script registration, and sprint/testing docs.

Figma-Centered Home Sprint full-suite result:

- Command: `npm.cmd test`
- Result: 302 passed, 0 failed.
Figma-Centered Home Sprint build and live route result:

- Command: `npm.cmd run build` from `apps/web`
- Result: Vite 8.1.3 production build passed after rerunning outside the Windows sandbox because the sandbox blocked helper process spawn with `EPERM`.
- Command: `npm.cmd run smoke:web:routes`
- Result: all 22 MVP public/admin/support routes returned 200 from `http://127.0.0.1:5173`.
Figma Public Pages Sprint red result:

- Command: `node tests\production-figma-public-pages.test.js`
- Result: 0 passed, 5 failed.
- Failure reason: public archive/search/media/article detail pages still used older scaffold markup, Search results did not expose featured image metadata, and the shared Figma public-page test gate was not registered.

Figma Public Pages Sprint implementation attempt:

- Added a reusable `FigmaArticleCard` component for public editorial cards.
- Updated Visceral Mag, Categories/Search, and Featured/Media to use the shared article-card anatomy and Figma public-page layout classes.
- Updated Article Detail with a centered Figma reading hero, metadata row, narrow article body, related grid, and conversation sections.
- Added featured image metadata to Search results so cards can render real media.
- Added Figma public-page CSS and registered the focused test gate.
Figma Public Pages Sprint focused green result:

- Command: `npm.cmd run test:production-figma-public-pages`
- Result: 5 passed, 0 failed.
- Covered: shared Figma article card, Visceral Mag/Search usage, Featured/Media usage, Article Detail reading layout, Search featured image metadata, styles, docs, and script/full-suite registration.

Figma Public Pages Sprint full-suite result:

- Command: `npm.cmd test`
- Result: 307 passed, 0 failed.
Figma Public Pages Sprint build, route smoke, and browser result:

- Command: `npm.cmd run build` from `apps/web`
- Result: Vite 8.1.3 production build passed after rerunning outside the Windows sandbox because the sandbox blocked helper process spawn with `EPERM`.
- Command: `npm.cmd run smoke:web:routes`
- Result: all 22 MVP public/admin/support routes returned 200 from `http://127.0.0.1:5173`.
- Chrome DevTools result: Search route renders Figma-style article cards with images, metadata, final-design header shortcuts, and footer links mapped through existing MVP routes.
- Screenshot: `apps/web/browser-qa-search-figma-public-pages.png`.
Figma Info Pages Sprint red result:

- Command: `node tests\production-figma-info-pages.test.js`
- Result: 0 passed, 5 failed.
- Failure reason: About, Creative Team, Contributors, and Contact still used older scaffold layouts; there was no shared Figma profile-card component, focused script, CSS, or docs for this public info page slice.

Figma Info Pages Sprint implementation attempt:

- Added reusable `FigmaProfileCard` for Creative Team and Contributors.
- Updated About with Figma public-page shell, overview split, editorial pillar grid, route grid, and newsletter panel.
- Updated Creative Team and Contributors with shared profile grids while preserving existing state and route hooks.
- Updated Contact with a Figma public-page shell, inquiry chips, two-column contact/info layout, refined form panel, state grid, and newsletter panel.
- Added Figma info/profile/contact CSS and registered the focused test gate.
Figma Info Pages Sprint focused green result:

- Command: `npm.cmd run test:production-figma-info-pages`
- Result: 5 passed, 0 failed.
- Covered: shared Figma profile card, About info layout, Creative Team and Contributors profile grids, Contact layout, CSS, docs, and script/full-suite registration.

Figma Info Pages Sprint full-suite result:

- Command: `npm.cmd test`
- Result: 312 passed, 0 failed.
Figma Info Pages Sprint build, route smoke, and browser result:

- Command: `npm.cmd run build` from `apps/web`
- Result: Vite 8.1.3 production build passed after rerunning outside the Windows sandbox because the sandbox blocked helper process spawn with `EPERM`.
- Command: `npm.cmd run smoke:web:routes`
- Result: all 22 MVP public/admin/support routes returned 200 from `http://127.0.0.1:5173`.
- Chrome DevTools result: Contact route renders Figma info-page layout, contact form panel, newsletter panel, and no console issues beyond normal Vite/React dev messages after adding autocomplete metadata.
- Screenshots: `apps/web/browser-qa-contact-figma-info-pages.png`, `apps/web/browser-qa-contact-figma-info-pages-autocomplete.png`.
## Figma Admin Pages Sprint - July 10, 2026

Red setup:

- Added `tests/production-figma-admin-pages.test.js` to require the shared admin surface component, admin layout classes, management-page Figma panels, docs, and full-suite wiring.
- Expected first result: failing until admin UI classes and sprint docs were implemented.

Red result:

- Command: `node tests\production-figma-admin-pages.test.js`
- Result: failed as expected.
- Tests: 3 passed, 1 failed.
- Failure reason: admin code classes were present, but the Figma Admin Pages Sprint documentation was not yet recorded.

Implementation attempt:

- Added `apps/web/src/components/FigmaAdminSurface.jsx`.
- Updated the admin layout, dashboard, article management, profile/media management, moderation, and contact submissions pages with Figma admin classes.
- Added the Figma admin CSS layer for shell, metrics, toolbar, table, editor, upload, workspace, action, and state panels.
- Wired `test:production-figma-admin-pages` into `package.json` and the full test runner.
- Updated roadmap/sprint/status coverage language to the 316-test baseline.

Green focused result:

- Command: `node tests\production-figma-admin-pages.test.js`
- Result: passed.
- Tests: 4 passed, 0 failed.
- Covered: shared Figma admin surface, admin shell classes, dashboard panels, management page panels, CSS, docs, and full-suite wiring.

Full suite after Figma Admin Pages Sprint:

- Command: `npm.cmd test`
- Result: passed.
- Tests: 316 passed, 0 failed.
- Covered: all MVP wireframe contracts, production app shell, route smoke contracts, route navigation consistency, public Figma pages, info/contact Figma pages, and protected admin Figma pages.

Runtime verification:

- Command: `npm.cmd run build` from `apps/web`
- Initial result: sandbox-only `spawn EPERM` while Vite loaded config.
- Elevated rerun result: passed; Vite built `dist/index.html`, CSS, and JS assets.
- Command: `npm.cmd run smoke:web:routes`
- Result: all 22 MVP public/admin/support routes returned 200 from `http://127.0.0.1:5173`.
- Route consistency: visible final-design shortcuts continue using existing MVP routes; no duplicate top-level Theatre, Books, Essays, or Opinion routes were added.

Browser QA:

- URL: `http://127.0.0.1:5173/admin`
- Screenshot: `apps/web/browser-qa-admin-figma-admin-pages.png`
- Accessibility snapshot: `apps/web/browser-qa-admin-figma-admin-pages.snapshot.txt`
- Console result: normal Vite connect/connected and React DevTools info messages only.

## Figma Support Pages Sprint - July 10, 2026

Red setup:

- Added `tests/production-figma-support-pages.test.js` to require the shared support surface component, auth support forms, error recovery panels, protected workflow layouts, mobile handoff layout, docs, suite wiring, and no duplicate support routes.
- Expected first result: failing until support UI classes, docs, and scripts were implemented.

Red result:

- Command: `node tests\production-figma-support-pages.test.js`
- Result: failed as expected.
- Tests: 0 passed, 5 failed.
- Failure reason: shared support component, Figma support classes, scripts, CSS, and docs were not yet implemented.

Implementation attempt:

- Added `apps/web/src/components/FigmaSupportSurface.jsx`.
- Updated Admin Login, Password Reset, 404, 500, Offline, Media Upload, Article Editor Workflow, and Mobile Wireframe Comps pages with Figma support classes.
- Added the Figma support CSS layer for auth forms, recovery route grids, state grids, workflow forms, modal framing, and mobile handoff grids.
- Wired `test:production-figma-support-pages` into `package.json` and the full test runner.
- Updated roadmap/sprint/status coverage language to the 321-test baseline.

Green focused result:

- Command: `node tests\production-figma-support-pages.test.js`
- Result: passed.
- Tests: 5 passed, 0 failed.
- Covered: shared Figma support surface, auth support forms, error recovery panels, workflow layouts, mobile handoff layout, CSS, docs, full-suite wiring, and no duplicate support routes.

Full suite after Figma Support Pages Sprint:

- Command: `npm.cmd test`
- Result: passed.
- Tests: 321 passed, 0 failed.
- Covered: all MVP wireframe contracts, production app shell, route smoke contracts, route navigation consistency, public Figma pages, info/contact Figma pages, protected admin Figma pages, and support/subflow Figma pages.

Runtime verification:

- Command: `npm.cmd run build` from `apps/web`
- Initial result: sandbox-only `spawn EPERM` while Vite loaded config.
- Elevated rerun result: passed; Vite built `dist/index.html`, CSS, and JS assets.
- Command: `npm.cmd run smoke:web:routes`
- Result: all 22 MVP public/admin/support routes returned 200 from `http://127.0.0.1:5173`.
- Route consistency: support routes remain `/admin/login`, `/admin/password-reset`, `/404`, `/500`, `/offline`, `/admin/media/upload`, `/admin/articles/editor-workflow`, and `/mobile-wireframes`; no duplicate `/login`, `/reset-password`, or `/media-upload` routes were added.

Browser QA:

- URL: `http://127.0.0.1:5173/admin/login`
- Screenshot: `apps/web/browser-qa-admin-login-figma-support-pages.png`
- Accessibility snapshot: `apps/web/browser-qa-admin-login-figma-support-pages.snapshot.txt`
- Console result: normal Vite connect/connected and React DevTools info messages only.

## Figma Browser QA Matrix Sprint - July 10, 2026

Red setup:

- Added `tests/production-figma-browser-qa-matrix.test.js` to require the screenshot capture script, app/root commands, 12 desktop/mobile screenshots, Figma handoff documentation, sprint documentation, and unchanged route scope.
- Expected first result: failing until the script, screenshots, scripts, and docs were implemented.

Red result:

- Command: `node tests\production-figma-browser-qa-matrix.test.js`
- Result: failed as expected.
- Tests: 0 passed, 5 failed.
- Failure reason: screenshot script, registered commands, screenshot files, documentation, and 326-test baseline did not exist yet.

Implementation attempt:

- Added `apps/web/scripts/capture-route-screenshots.mjs`.
- Added app script `qa:screenshots` and root script `qa:web:screenshots`.
- Added `test:production-figma-browser-qa` and wired the focused QA matrix test into the full suite.
- Updated Figma handoff, sprint plan, implementation roadmap, coverage review, status doc, and roadmap tests to the 326-test baseline.

Screenshot capture result:

- Command: `npm.cmd run qa:web:screenshots`
- Initial result: sandbox-only headless Chrome process launch failed before the first capture.
- Elevated rerun result: passed.
- Captured: 12 screenshots for Home, Visceral Mag, Article Detail, Search, Contact, and Admin Dashboard across desktop and mobile viewport sizes.
- Output folder: `apps/web/browser-qa/figma-viewport-matrix/`.

Green focused result:

- Command: `node tests\production-figma-browser-qa-matrix.test.js`
- Result: passed.
- Tests: 5 passed, 0 failed.
- Covered: screenshot capture script, root/app command wiring, 12 screenshot files, Figma handoff docs, sprint docs, 326-test baseline, and no duplicate final-design shortcut routes.

Full suite after Figma Browser QA Matrix Sprint:

- Command: `npm.cmd test`
- Result: passed.
- Tests: 326 passed, 0 failed.
- Covered: all MVP wireframe contracts, production app shell, route smoke contracts, route navigation consistency, Figma public/info/admin/support page slices, and desktop/mobile browser screenshot matrix evidence.

Runtime verification:

- Command: `npm.cmd run build` from `apps/web`
- Initial result: sandbox-only `spawn EPERM` while Vite loaded config.
- Elevated rerun result: passed; Vite built `dist/index.html`, CSS, and JS assets.
- Command: `npm.cmd run smoke:web:routes`
- Result: all 22 MVP public/admin/support routes returned 200 from `http://127.0.0.1:5173`.

## Figma Screenshot Integrity Sprint - July 10, 2026

Red setup:

- Added `tests/production-figma-screenshot-integrity.test.js` to require a PNG integrity checker, registered commands, full-suite wiring, durable docs, and a 331-test baseline.
- Expected first result: failing until the checker, commands, docs, and baseline were implemented.

Red result:

- Command: `node tests\production-figma-screenshot-integrity.test.js`
- Result: failed as expected.
- Tests: 1 passed, 4 failed.
- Failure reason: the existing screenshots already had valid PNG dimensions, but the reusable checker, command wiring, docs, and 331-test baseline were missing.

Implementation attempt:

- Added `apps/web/scripts/check-route-screenshots.mjs`.
- Added app script `qa:screenshots:check` and root script `qa:web:screenshots:check`.
- Added `test:production-figma-screenshot-integrity` and wired the focused integrity test into the full suite.
- Updated Figma handoff, sprint plan, implementation roadmap, coverage review, status doc, and roadmap tests to the 331-test baseline.

Green focused result:

- Command: `node tests\production-figma-screenshot-integrity.test.js`
- Result: passed.
- Tests: 5 passed, 0 failed.
- Covered: PNG header parsing, expected desktop/mobile dimensions, non-trivial screenshot sizes, checker scripts, docs, and current 331-test baseline.

Screenshot integrity command:

- Command: `npm.cmd run qa:web:screenshots:check`
- Result: passed.
- Checked: 12 PNG captures in `apps/web/browser-qa/figma-viewport-matrix/`.
- Dimensions verified: desktop `1440x1200`, mobile `390x1200`.

Full suite after Figma Screenshot Integrity Sprint:

- Command: `npm.cmd test`
- Result: passed.
- Tests: 331 passed, 0 failed.
- Covered: all MVP wireframe contracts, production app shell, route smoke contracts, route navigation consistency, Figma page slices, desktop/mobile browser screenshot matrix, and screenshot PNG integrity.

Runtime verification:

- Command: `npm.cmd run build` from `apps/web`
- Initial result: sandbox-only `spawn EPERM` while Vite loaded config.
- Elevated rerun result: passed; Vite built `dist/index.html`, CSS, and JS assets.
- Command: `npm.cmd run smoke:web:routes`
- Result: all 22 MVP public/admin/support routes returned 200 from `http://127.0.0.1:5173`.

## Figma SEO Metadata Sprint - July 10, 2026

Red setup:

- Added `tests/production-seo-metadata-route.test.js` to require route metadata helpers, dynamic article SEO, safe draft/missing article metadata, React head wiring, AppShell integration, docs, scripts, and a 337-test baseline.
- Expected first result: failing until metadata modules, shell wiring, docs, and scripts were implemented.

Red result:

- Command: `node tests\production-seo-metadata-route.test.js`
- Result: failed as expected.
- Tests: 0 passed, 6 failed.
- Failure reason: route metadata helper, React head updater, AppShell wiring, script registration, docs, and 337-test baseline were missing.

Implementation attempt:

- Added `apps/web/src/seo/routeMetadata.js` for pure route metadata construction.
- Added `apps/web/src/seo/RouteMetadata.jsx` for browser title, canonical, robots, Open Graph, Twitter card, and description updates.
- Wired `RouteMetadata` into `apps/web/src/App.jsx` for every resolved route.
- Added static default title, description, and Open Graph tags to `apps/web/index.html`.
- Added `test:production-seo-metadata` and wired the focused SEO metadata test into the full suite.
- Updated sprint, roadmap, coverage, and status docs to the 337-test baseline.

## Final Design ZIP Adoption - July 10, 2026

Red setup:

- Added tests/final-design-zip-adoption.test.js for final archive entry files, accessible mobile navigation, canonical route mapping, docs, and full-suite wiring.

Red result:

- Command: node tests\final-design-zip-adoption.test.js
- Result: failed as expected.
- Tests: 1 passed, 3 failed.
- Failure reason: the complete ZIP entry files, mobile menu interaction, script wiring, and final-source documentation were missing.

Implementation attempt:

- Preserved the ZIP README, HTML/React entry points, package scripts, and Figma asset resolver in the imported design source.
- Added the final-design mobile navigation toggle to the live public header.
- Kept the existing 22-route registry and the four editorial search aliases without duplicate routes.
- Registered the focused test and updated the current full-suite target to 341 tests.

Green final-design ZIP result:

- Command: node tests\final-design-zip-adoption.test.js
- Result: passed, 4 tests and 0 failures.
- Full suite: npm.cmd test passed, 341 tests and 0 failures.
- Production build: npm.cmd run build passed with 65 transformed modules.
- Live route smoke: all 22 public, admin, and support routes returned HTTP 200.
- Browser metadata: article title, description, canonical URL, Open Graph type, and Twitter card matched the published article fixture.
- Mobile browser QA: the navigation is absent from the accessibility tree while collapsed, then appears after the toggle reports expanded.
- Screenshot QA: 12 refreshed PNGs passed at 1440x1200 desktop and 390x1200 mobile.
## Launch Discovery and Lighthouse - July 10, 2026

Audit baseline:

- Mobile Lighthouse navigation audit on the live Home route.
- Scores before fixes: Accessibility 100, Best Practices 100, SEO 92, Agentic Browsing 67.
- Failed findings: brand visible-label mismatch, invalid robots.txt SPA fallback, and missing llms.txt structure.

Red result:

- Added tests/production-launch-discovery-files.test.js.
- Command: node tests\production-launch-discovery-files.test.js
- Result: failed as expected, 0 passed and 4 failed.
- Failure reason: robots.txt, sitemap.xml, llms.txt, corrected brand accessible name, script wiring, and docs were missing.

Implementation attempt:

- Added a crawlable robots.txt and public sitemap.xml.
- Added llms.txt with an H1, magazine summary, canonical reader links, and public-content boundary.
- Aligned the brand link accessible name with its visible Babas & Brasse text.
- Registered the focused test and updated the full-suite target to 345 tests.
Lighthouse label refinement:

- The first accessible-name correction retained a duplicate image/text contribution in the raw audit.
- Tightened the TDD contract to require decorative logo semantics: empty image alt text and visible Babas & Brasse text as the link name.
- The refined test failed first, then the public header implementation was corrected.
Final Lighthouse result:

- Mobile navigation audit on http://127.0.0.1:5173/.
- Accessibility: 100.
- Best Practices: 100.
- SEO: 100.
- Agentic Browsing: 100.
- Audit summary: 55 passed and 0 failed.
- Full regression suite: 345 passed and 0 failed.
- Live discovery responses: robots.txt 200 text/plain, llms.txt 200 text/plain, sitemap.xml 200 text/xml.
## Public Form Interaction Sprint - July 11, 2026

Red setup:

- Added tests/production-public-form-interactions.test.js for email validation, JSON submission handling, SPA fallback rejection, shared newsletter states, contact feedback, pending-only comment submission, styles, docs, and script wiring.

Red result:

- Command: node tests\production-public-form-interactions.test.js
- Result: failed as expected, 0 passed and 6 failed.
- Failure reason: the public form client, newsletter component, page handlers, status styles, docs, and suite wiring did not exist.

Implementation attempt:

- Added an API-ready JSON public form client with newsletter, contact, and article comment endpoints.
- Added reusable newsletter validation, submitting, success, and retry states to Home, About, and Contact.
- Added Contact submission handling that preserves reader text on API failure.
- Added article comment submission with pending moderation feedback; unapproved comments are never added to the public list.
- Hid Contact's implementation-state reference strip while preserving its tested wireframe contract.
- Registered the focused tests and updated the full-suite target to 396 tests.
Green public form result:

- Focused suite: 6 passed and 0 failed.
- Home newsletter empty submission exposes an invalid email state through its polite live region.
- Home newsletter unavailable-service state preserves reader@example.com and offers retry feedback.
- Contact unavailable-service state preserves name, email, subject, and message text.
- Contact honeypot and implementation-state strip are absent from the accessibility tree.
- Article comment validation uses a polite live region.
- Article unavailable-service state preserves the name and comment while the approved public comment count remains unchanged.
- Refreshed all 12 Figma desktop/mobile screenshots after the interaction changes.
Final public interaction verification:

- Production Vite build passed with 67 transformed modules.
- Full suite passed: 396 tests and 0 failures.
- Live route smoke passed: all 22 routes returned HTTP 200.
- Refreshed screenshot integrity passed for all 12 desktop/mobile PNGs.
- Mobile Lighthouse remained Accessibility 100, Best Practices 100, SEO 100, Agentic Browsing 100, with 55 passed audits and 0 failures.

## Figma Technology Stack Migration - July 11, 2026

Red gate:
- Added `production-figma-tech-stack-migration.test.js` before implementation.
- Initial result: 0 passed, 7 failed, proving the React Router, Tailwind, Lucide, shadcn-style primitive, final Home composition, and documentation contracts were absent.

Implementation:
- Began from the final Figma export's Vite 6.3.5 runtime, then moved to patched Vite 7.3.6 while retaining Tailwind 4.1.12 compatibility.
- Added React Router, Lucide, class-variance-authority, clsx, tailwind-merge, and Radix Slot.
- Preserved the canonical 22-route registry while moving browser navigation to Router links.
- Replaced the MVP-first Home composition with featured, recent, more, and newsletter sections from the final design.
- Added shared Button and Input primitives and a responsive editorial shell.


## Figma Editorial Content Density - July 11, 2026

Red gate:
- Added three tests for seven unique published preview stories, three non-repeating recent cards, and article-based More rows.
- Initial result: 0 passed, 3 failed.

Green implementation:
- Added five unique local editorial preview stories based on the final Figma content direction.
- Home now fills featured, recent, and More sections without repeating an article.
- More rows use the shared compact Figma article card instead of MVP category summaries.


Figma stack migration final verification:
- Upgraded React Router from 7.13.0 to patched 7.18.1.
- Upgraded the Figma-compatible runtime from Vite 6.3.5 to patched Vite 7.3.6 while retaining Tailwind 4 compatibility.
- Full dependency audit: 0 vulnerabilities.
- Full suite: 396 passed, 0 failed.
- Production build: passed with Vite 7.3.6.
- Live route smoke: 22 canonical routes targeted.
- Mobile Lighthouse: Accessibility 100, Best Practices 100, SEO 100, Agentic Browsing 100; 51 passed and 0 failed.
- Refreshed 12 desktop/mobile route screenshots after final content and mobile-header polish.


## UI, Stack, Git Hygiene, And ImageGen Pass - July 11, 2026

Red gates:
- Repository hygiene: 1 passed, 2 failed before `.gitignore` and generated-evidence test cleanup.
- ImageGen assets: 0 passed, 3 failed before asset generation and integration.

Implementation:
- Added a root `.gitignore` for dependencies, builds, browser evidence, logs, PIDs, and OS noise.
- Removed redundant one-off browser captures, snapshot dumps, and Vite runtime files.
- Kept the focused React/Router/Tailwind/Lucide/Radix stack; all declared packages have direct use.
- Generated five distinct South African editorial images with built-in ImageGen.
- Optimized raw generated PNGs into high-quality JPEGs, reducing project media weight from roughly 11 MB to roughly 1.1 MB.
- Replaced public React placeholder imagery across editorial, information, profile, featured, and admin-media surfaces.
- Ran 44 live layout checks across all 22 routes at desktop and mobile widths.

Green focused results:
- Repository hygiene: 3 passed, 0 failed.
- ImageGen asset integration: 3 passed, 0 failed.
- Live layout: no body overflow, duplicate IDs, broken images, header overlap, console warnings, or console errors.


Final UI/stack/ImageGen verification:
- Full suite: 396 passed, 0 failed.
- Production build: passed with Vite 7.3.6.
- npm audit: 0 vulnerabilities.
- Live route smoke: 22 of 22 routes returned HTTP 200.
- Live DOM alignment audit: 44 desktop/mobile route checks; 0 body overflow, duplicate IDs, broken images, header overlaps, console warnings, or console errors.
- Screenshot capture: 12 refreshed local PNGs.
- Screenshot integrity: 12 passed.
- Mobile Lighthouse: Accessibility 100, Best Practices 100, SEO 100, Agentic Browsing 100; 51 passed and 0 failed.
- Git hygiene confirmed `node_modules`, `dist`, browser QA output, logs, and PIDs are ignored.

## Figma-Only Layout And Navigation Repair - July 11, 2026

### Red
- Added `tests/production-figma-only-navigation.test.js`.
- Initial result: 0 passed, 4 failed.
- Failures proved that search query parameters were ignored, topic links returned duplicate content, active navigation was path-only, and the global MVP section card wrapped Figma pages.

### Green
- `CategoriesSearchPage` now reads and writes `q`, `category`, and `topic` through React Router.
- Theatre Reviews, Book Reviews, Essays, and Opinion now return distinct filtered article sets.
- Public navigation computes one query-aware active state without adding duplicate routes.
- Removed the global MVP main wrapper, section card, article card, and state stripe from the live stylesheet. Figma page classes now own the public canvas.

### Verification
- Focused regression: 4 passed, 0 failed.
- Full suite: 396 passed, 0 failed.
- Production build: passed with Vite 7.3.6.
- Dependency audit: 0 vulnerabilities.
- Live route smoke: all 22 canonical routes returned 200.
- Desktop browser: 1280px Figma canvas at 1536px viewport, no overflow, no broken images, and no section border or shadow.
- Mobile browser: 390px viewport, 358px page canvas, no horizontal overflow, no broken images, and the collapsible navigation exposed all five Figma section links.

## Desktop Content And More-Menu Polish - July 11, 2026

### Red
- Added `tests/production-desktop-content-polish.test.js`.
- Initial result: 0 passed, 4 failed.
- The failures captured duplicated page-level search controls, visible wireframe state labels, sparse profile fixtures, and profile cards without useful links.

### Green
- Section routes now use the global header search only. The full archive form remains available on the bare `/search` route.
- Visceral Mag links to archive search instead of rendering a second search input.
- Creative Team and Contributors no longer display loading, empty, error, social, or reset state labels as page content.
- Live fixtures now include four creative-team profiles and four contributors with roles, biographies, useful links, unique imagery, and distributed published bylines.
- Profile cards render published work and useful profile links together.

### Verification
- Focused desktop-content suite: 4 passed, 0 failed.
- Full suite: 396 passed, 0 failed.
- Production build: passed with Vite 7.3.6.
- Dependency audit: 0 vulnerabilities.
- Live route smoke: all 22 canonical routes returned 200.
- Desktop browser at 1440px: 1280px page canvas, one visible header search on section and More pages, four team profiles, four contributors, seven published-work links, no prototype-state words, no overflow, and no broken images.
- Mobile browser at 390px: 358px content canvas, search appears only inside the opened menu, four stacked contributor profiles, no overflow, and no broken images.

## Public Link Integrity - July 12, 2026

### Red
- Added `tests/production-public-link-integrity.test.js`.
- Initial result: 0 passed, 3 failed.
- Profile cards and article bylines generated unregistered `/contributors/{slug}` URLs.

### Green
- Contributor bylines now use `/contributors#{slug}`.
- Creative-team cards use `/creative-team#{slug}`.
- Every profile card exposes a matching stable `id` target with sticky-header scroll margin.

### Verification
- Focused link-integrity suite: 3 passed, 0 failed.
- Full public browser crawl: 350 internal links across 9 public routes, 0 invalid canonical destinations.
- Article byline resolved to `/contributors#visceral-contributor` and found the Lerato Mokoena card.
- Mobile deep link to `/contributors#thando-jacobs` scrolled to the matching card.
- Regression baseline: 396 passed, 0 failed.

## Persistent Public API Slice - July 12, 2026

### Red
- Added `tests/production-public-api-persistence.test.js`.
- Initial result: 0 passed, 4 failed because no API package, persistence store, or Vite proxy existed.

### Green
- Added a dependency-free Node API under `apps/api/`.
- Added atomic JSON persistence for newsletter signups, contact submissions, and article comments.
- Newsletter email addresses are normalized and deduplicated.
- Contact submissions enter `new`; article comments enter `pending` and remain hidden until moderation.
- Added JSON validation, body-size limits, safe error responses, a health endpoint, and Vite `/api` proxying.
- Added `apps/api/README.md` with run commands, endpoint contracts, persistence configuration, and production security boundaries.

### Verification
- Focused API suite: 4 passed, 0 failed.
- Restart persistence: one newsletter signup, one contact submission, and one pending comment remained after the API process was restarted.
- Live browser: Contact, Newsletter, and Comment forms each displayed their success state through the Vite proxy.
- Regression baseline: 396 passed, 0 failed.

## Authenticated Admin API Slice - July 12, 2026

### Red
- Added `tests/production-admin-api-auth.test.js`.
- Initial result: 0 passed, 4 failed because protected endpoints and status mutations did not exist.

### Green
- Added fail-closed bearer-token protection with constant-time comparison.
- No default token is embedded; unconfigured admin endpoints return `503`.
- Added protected contact-submission and comment queue reads.
- Added narrowly allowed contact and comment status mutations.
- Approved, rejected, read, and archived states persist through store restart.

### Verification
- Focused admin API suite: 4 passed, 0 failed.
- Public API regression suite: 4 passed, 0 failed.
- Regression baseline: 396 passed, 0 failed.

## Admin-Only Browser Session - July 12, 2026

### Red
- Added the admin-only session contract; initial result was 0 passed and 5 failed.

### Green
- Added one-role administrator authentication with no registration route.
- Added login, session, logout, secure cookie attributes, and fail-closed configuration.
- Added React route gating for all edit and moderation routes.
- Updated stale editor and wireframe-state assertions to the functional login contract.

### Verification
- Admin-only session suite: 5 passed, 0 failed.
- Admin bearer API suite: 4 passed, 0 failed.
- Public persistence suite: 4 passed, 0 failed.
- Full regression suite: 396 passed, 0 failed.

## Live Admin Queues and Logout - July 12, 2026

### Red
- Contact and moderation suites failed on obsolete editor roles and missing authenticated GET/PATCH behavior.
- Admin session suite failed on the missing logout control.

### Green
- Connected Contact Submissions and pending-comment moderation to protected session APIs.
- Added live status mutations, loading, empty, saving, and error feedback.
- Added server-backed logout and normalized every admin model to the admin role.

### Verification
- Focused contact, moderation, and admin-session suites passed.
- Full regression suite: 396 passed, 0 failed.
- Vite production build passed with 1,672 modules transformed.

## Live-View Editorial Polish - July 12, 2026

### Red
- Updated route, article, shell, and responsive contracts failed on redundant category rails, raw article paths, the public auth shell, and missing mobile grid safeguards.

### Green
- Removed page-level category rails and their unused model data.
- Added article breadcrumb/date formatting, dedicated auth layout, responsive grid constraints, and header balance refinements.

### Verification
- Focused Visceral Mag, Search, Article Detail, App Shell, and Visual System suites passed.
- Full regression suite: 396 passed, 0 failed.
- Production build passed with 1,673 modules transformed.

## Reference-Led Archive and Newsletter Repair - July 12, 2026

### Red
- Focused tests failed on the shared newsletter structure, duplicate Contact links, Featured story layout/metadata, and the old Visceral grid.

### Green
- Added a shared newsletter field wrapper and stable desktop/mobile form grid.
- Removed Contact-only footer routes.
- Added a Visceral lead story and two-column story feed.
- Added a two-column Featured published-story feed with complete card metadata.
- Expanded browser QA from 12 to 14 screenshots by adding Featured desktop/mobile.

### Verification
- Focused newsletter, Contact, Featured, and Visceral suites passed.
- Full regression suite: 396 passed, 0 failed.
- Production build passed with 1,673 modules transformed.
- Tall desktop captures confirmed the newsletter and Featured story layouts.

## Production Release Boundary - July 12, 2026

### Red
- Added five release-boundary tests; initial result was 0 passed and 5 failed.

### Green
- Promoted packages to 1.0.0-rc.1 and activated production commands.
- Added production fail-fast configuration validation.
- Added scrypt password hashing and verification for the sole administrator.
- Added restrictive API security headers.
- Added production environment and password-hash operator tooling.
- Added the canonical production release-candidate plan and archived the old MVP roadmap.

### Verification
- Production release gate: 5 passed, 0 failed.
- Admin API suite: 4 passed, 0 failed.
- Public persistence suite: 4 passed, 0 failed.
- Full regression suite: 396 passed, 0 failed.

### Final runtime verification
- Full regression suite: 396 passed, 0 failed.
- Production build: 1,671 modules transformed successfully.
- Dependency audit: 0 vulnerabilities.
- Screenshot integrity: 14 desktop/mobile captures passed.
- Live API: health 200, hardened headers present, and unconfigured admin login failed closed with 503.
- API startup honors HOST with a 127.0.0.1 local default; the defect was reproduced red before the fix passed.

## Editorial Persistence - July 13, 2026
- Red: four new contracts began at 0 passed and 4 failed.
- Green: versioned article, profile, media metadata, and review persistence plus protected admin APIs and public content hydration are implemented.
- Verification: 402 regression tests, 5 release gates, production build, and zero-vulnerability audit pass.


## Production Design And Report Alignment - July 13, 2026

Inputs reviewed:

- 20-page `BABAS & BRASSE REPORT FOR ROADMAP AND SPRINTPLAN (1).pdf`.
- Live editorial reference: `https://ceconline.co.za/`.
- Current React/Vite reader routes, Node API, production release plan, sprint plan, and persisted editorial workflows.

TDD red evidence:

- Command: `node tests/production-design-report-alignment.test.js`
- Result: 3 failed, 0 passed as expected.
- Missing contracts: root `DESIGN.md`, report review document, Editorial Design Gate, and sprint realignment.

Artifacts added:

- `DESIGN.md`
- `docs/BABAS_BRASSE_REPORT_REVIEW_JULY_2026.md`
- `tests/production-design-report-alignment.test.js`

Plans realigned:

- `docs/PRODUCTION_RELEASE_PLAN_JULY_2026.md`
- `docs/SPRINT_PLAN_JULY_2026.md`
- `docs/IMPLEMENTATION_PLAN_JULY_2026.md`
- `docs/PLAN_STATUS.md`


Green evidence:

- Focused command: `npm.cmd run test:design-report-alignment`
- Focused result: 4 passed, 0 failed.
- Full command: `npm.cmd test`
- Full result: 406 passed, 0 failed.
- Build command: `npm.cmd --prefix apps/web run build`
- Build result: passed with Vite 7.3.6; 1,671 modules transformed.
- Production changes verified: Sabon-first licensed-font fallback stack, justified long-form body copy, and Home `Latest Articles` wording.


## Report-Aligned Publication Navbar - July 13, 2026

TDD red evidence:

- Command: `node tests/production-report-navbar.test.js`
- Result: 0 passed, 4 failed as expected.
- Missing behavior: report-first primary links, one Sections menu, people-only More menu, responsive three-part desktop layout, and documentation evidence.

Implemented:

- Primary navigation now exposes Home, About, Visceral Mag, Featured / Media, and Contact.
- Theatre Reviews, Book Reviews, Essays, and Opinion remain query-backed shortcuts in one Sections menu.
- More now contains only Creative Team and Contributors.
- No duplicate routes were added.
- Official social navigation remains intentionally pending until verified client URLs are supplied.


Green evidence:

- Focused navbar contract: 4 passed, 0 failed.
- Full regression: 410 passed, 0 failed.
- Production Vite build: passed; 1,671 modules transformed.
- Browser QA: 14 desktop/mobile screenshots refreshed from `http://127.0.0.1:5173`.
- Screenshot integrity: 14 passed at 1440x1200 and 390x1200.


## Report Workflow Completion TDD - July 13, 2026

Red evidence:

- `production-public-review-workflow.test.js`: 0 passed, 4 failed before implementation.
- `production-profile-detail-route.test.js`: 0 passed, 5 failed before implementation.
- `production-admin-discovery-delete.test.js`: 0 passed, 4 failed, then 2 passed/3 failed after the contract was strengthened for persisted server filters and article filtering.
- `production-admin-content-crud.test.js`: 0 passed, 4 failed before implementation.
- Browser QA profile-route contract failed before the profile capture was added.

Green evidence:

- Public review workflow: 4 passed.
- Profile detail route: 5 passed.
- Admin discovery/delete: 5 passed.
- Admin content CRUD: 4 passed.
- Full regression: 428 passed, 0 failed.
- Production build: Vite 7.3.6, 1,673 modules transformed.
- Browser capture: 16 desktop/mobile screenshots captured across 8 routes from `http://127.0.0.1:5173`.
- Screenshot integrity: 16 passed with valid PNG signatures, expected dimensions, and minimum-size checks.
- Live route smoke: 22 of 22 routes returned HTTP 200.
- API health: `ok`; unauthenticated admin session request: HTTP 401 (configured and fail-closed).

Manual visual inspection remains unclaimed because the local image viewer was blocked by the Windows split-root sandbox. Automated capture and pixel-file integrity passed.

## CEC-Adapted Production Navigation TDD - July 13, 2026

Red evidence:

- `production-editorial-navigation-redesign.test.js`: 0 passed, 4 failed before implementation.
- Failures covered the missing expanded menu, public admin exposure, non-private metadata/default bundle loading, and missing visual-reference workflow.

Implemented:

- Replaced Sections and More dropdowns with one accessible editorial panel.
- Kept five primary publication routes and six unique panel destinations.
- Reduced the header to one responsive search form.
- Removed desktop and mobile public admin links.
- Added Escape, outside-pointer, active-route, focus, and reduced-motion behavior.
- Added full-height tablet/mobile navigation at 960px and below.
- Marked every admin/auth surface `noindex,nofollow`.
- Route-split admin layouts, auth, dashboard, management, moderation, and workflow pages.
- Changed logout return to the direct `/admin` entry.
- Added repeatable CEC/reference and Babas & Brasse comparison captures.

Green evidence:

- Focused contract: 5 passed, 0 failed.
- Chromium navigation geometry audit: desktop, tablet, and mobile passed with no overflow, no item overlap, one search, six panel links, no public admin links, no duplicate navigation routes, working Escape, and correct About active state.
- Design-review captures: 4 CEC references, 8 saved before captures, and 14 after/open-state captures.
- Production Vite build: passed; 1,674 modules transformed with separate admin chunks.
- Full regression: 434 passed, 0 failed.
- Live route smoke: 22 of 22 public, support, and protected route entries returned HTTP 200.
- Direct admin browser state: unauthenticated `/admin` retained the URL, rendered the login screen, omitted the public header, and exposed `noindex,nofollow` at all three audit widths.

## Reference-Row Navigation Refinement - July 13, 2026

TDD red evidence:

- Added the desktop composition contract to `production-editorial-navigation-redesign.test.js`.
- Initial focused result: 6 passed, 1 failed because the link cluster and decorative separators did not yet exist.

Implemented:

- Reordered the desktop header to publication mark, editorial route cluster, Sections, and one far-right search control.
- Added visible `///` separators without adding routes or accessible-name noise.
- Preserved the existing Sections panel, active-page state, Escape behavior, and private admin boundary.
- Kept tablet/mobile controls stacked and removed decorative separators below 960px.

Green evidence:

- Focused navigation contract: 7 passed, 0 failed.
- Full regression: 435 passed, 0 failed.
- Production Vite build: passed; 1,674 modules transformed with separate admin chunks.
- Chromium navigation audit: desktop, tablet, and mobile passed with no overflow, overlap, duplicate destinations, or public admin links.
- Design review: 4 CEC reference captures and 14 Babas & Brasse current/open-state captures refreshed.

## Production Runtime Stack TDD - July 13, 2026

Red evidence:

- Added five production runtime contracts.
- Initial focused result: 0 passed, 5 failed because the API did not serve the React build, no limiter existed, routes were unprotected, and runtime configuration was undocumented.

Implemented:

- The Node service now serves the built Vite SPA and API from one origin.
- Client-side routes fall back to `index.html`; API and missing asset paths never receive the SPA fallback.
- Fingerprinted assets use immutable caching, HTML revalidates, and static responses include production security headers.
- Admin login and public submission routes use independent configurable fixed-window limits.
- Rejected requests return `429`, `Retry-After`, `RateLimit-Limit`, `RateLimit-Remaining`, and `RateLimit-Reset`.
- Production emits newline-delimited, privacy-safe security events with request IDs and no submitted content or credentials.

Focused green evidence:

- Runtime stack contract: 5 passed, 0 failed.
- Live HTTP coverage includes SPA fallback, API isolation, immutable asset caching, login limiting, public submission limiting, and log redaction.
- Full regression: 440 passed, 0 failed.
- Combined `verify:production`: 10 passed, 0 failed.
- Production Vite build: passed with 1,674 modules transformed.
- Production-mode same-origin smoke: Home 200, About 200, health `ok`, unknown API 404, CSP present, and request ID present.
- Frontend dependency audit: 0 vulnerabilities.

## Stitch Production Styling Integration TDD - July 14, 2026

Approved mapping:

- Visceral Brutalist Archive is the shared public foundation.
- Home uses home_brutalist_broadsheet.
- About uses about_brutalist_manifest v1.
- Contact uses contact_brutalist_dispatch_v2.
- Featured/Media uses featured_media_brutalist_edit.
- Visceral Mag uses visceral_mag_brutalist_archive_v2.
- Existing Georgia/Times and Arial/Helvetica fallbacks remain; no font package was installed.

Red evidence:

- The first styling contract failed because the public shell did not declare the approved design system.
- Live 390px inspection then found the open mobile menu inheriting the desktop two-column grid, clipping route labels off the left edge.
- A focused mobile-navigation contract was added before the breakpoint repair.

Implemented:

- Added a scoped production editorial stylesheet with black, white, and editorial-red tokens.
- Replaced the centered runtime canvas with full-width editorial bands and a 1320px inner measure.
- Restyled the shared header, Sections panel, search, cards, archive, media grid, About manifesto, Contact dispatch, newsletter, forms, article pages, profiles, and footer.
- Applied non-destructive grayscale image treatment with colour restoration on interactive cards.
- Preserved all routes, content, data, API calls, form logic, validation, admin authentication, and admin visibility rules.
- Repaired the mobile header so its open navigation uses one full-width grid at 960px and below.

Green evidence:

- Focused styling contract: 4 passed, 0 failed.
- Full regression: 446 passed, 0 failed.
- Live route geometry: Home, About, Visceral Mag, Featured/Media, and Contact passed at 1440, 1024, 768, 390, and 360 widths with no horizontal overflow, no out-of-viewport elements, no broken images, one search form, and no public admin links.
- Expanded 390px menu: all five primary labels occupied the full available width; search remained singular; Escape closed both menu layers.
- Visual captures reviewed: Home, About, Visceral Mag, Featured/Media, and Contact desktop; Home, Visceral Mag, Contact, and expanded navigation mobile.
- Lighthouse Home desktop: Accessibility 100, Best Practices 100, SEO 100, Agentic Browsing 100; 54 passed, 0 failed.
- Lighthouse Contact mobile: Accessibility 100, Best Practices 100, SEO 100, Agentic Browsing 100; 54 passed, 0 failed.
- Browser console: no warnings, errors, or issues.
- Home network pass: 68 observed requests returned successfully, including production-editorial.css and the content API.

Pending verification:

- Vite production build attempted after the styling change but esbuild could not spawn inside the restricted sandbox (EPERM).
- The initial escalation was unavailable because the approval service reported its usage quota exhausted; a later approved rerun succeeded.
- Resolved: the production build passed with 1,675 modules transformed after subprocess permission became available.

## Managed PostgreSQL Production Stack TDD - July 14, 2026

Red evidence:

- Added four production managed-storage contracts.
- Initial focused result: 0 passed, 4 failed because production still required a local JSON path, no PostgreSQL adapter or migration existed, and HTTP handlers were synchronous.

Implemented:

- Added `pg` and a production-only PostgreSQL publication store.
- Added an idempotent schema migration, seed-on-empty initialization, transactional row locking, atomic JSONB updates, rollback handling, and a health check.
- Preserved the current validated publication model and every public/admin API route.
- Kept the existing atomic JSON adapter for development and tests.
- Production now fails closed without `DATABASE_URL` and starts with configurable database TLS verification.

Green evidence:

- Managed-storage contract: 4 passed, 0 failed.
- Full regression: 451 passed, 0 failed.
- Combined production verification: 15 passed, 0 failed.
- Production Vite build: passed with 1,675 modules transformed.
- Root dependency install/audit: 0 vulnerabilities.
- Startup-readiness contract: initial 0/1 red, then 1/1 green after the process was changed to await database initialization before listening.

External evidence still required: a provisioned managed PostgreSQL instance, successful staging migration, encrypted backup/restore rehearsal, retention policy, monitoring, and named operational owner.


## Stitch v4 Production Refinement TDD - July 14, 2026

Source: `stitch_babas_brasse_design_contract (4).zip`

Red evidence:

- Initial focused contract: 0 passed, 6 failed before the refinement stylesheet, route references, directory composition, admin scope, and audit existed.
- Full regression first exposed four legacy assertions that required the retired contributor card and duplicate published-work composition.
- Desktop browser QA exposed a 13-column Featured / Media row, a squeezed two-column contributor section, and a profile copy panel that did not stretch to portrait height.
- Mobile QA exposed a wrapping text arrow in contributor rows.
- The search route's long descriptive heading pushed the primary search control below the first desktop viewport.

Implemented:

- Added the scoped Stitch v4 layer after the existing production editorial stylesheet.
- Added traceable design references to Article Detail, Search, Contributors, Creative Team, Profile Detail, Featured / Media, Admin Dashboard, Article Management, and Profile / Media Management.
- Replaced repeated contributor cards and published-work output with one semantic directory using canonical profile and latest-work links.
- Added asymmetric search results, a literal Search Archive heading, article metadata rail, equal-height profile hero, balanced media collage, and Lucide directory actions.
- Added the private admin workspace treatment without exposing admin in public navigation or enabling unconfigured binary upload.

Green evidence:

- Focused Stitch v4 contract: 6 passed, 0 failed.
- Full regression: 457 passed, 0 failed.
- Production Vite build: passed with 1,676 modules transformed.
- 1440px browser geometry: Article Detail metadata and 760px body did not overlap; Featured / Media filled explicit 8/4 and 7/4 rows; contributor directory occupied the 1320px editorial measure; profile portrait and biography both measured 712px high.
- 360px browser geometry: Article, Search, Contributors, and Featured / Media reported no horizontal overflow; directory rows measured 320px, search/media results measured 320px, and media images held a stable 330px height.
- Private-route check: direct `/admin/articles` access without a session redirected to `/admin/login`, rendered no public header, and retained `noindex,nofollow`.

Remaining live evidence: authenticated admin screenshots should be captured during staging sign-off with the real administrator session; credentials were not bypassed for this review.


## Stitch Admin Login and Dashboard TDD - July 14, 2026

Red evidence:

- The focused contract began at 0 passed and 3 failed: the login still used the older support-panel composition, dashboard prototype states were visible, and admin navigation lacked the Stitch icon hierarchy.
- The first full regression found one stale Figma support assertion after the login moved to its dedicated production treatment.
- Authenticated browser QA found the legacy protected-workflow pseudo-element occupying the first grid track and displacing the sidebar.

Implemented:

- Added a dedicated private login with squared controls, password visibility control, session feedback, strong editorial identity, and no client-side credential storage.
- Refined the protected layout with Lucide navigation, administrator status, real publishing metrics, recent activity, quick actions, and an operational footer.
- Removed visible dashboard design-state placeholders while retaining route-model state contracts.
- Added a scoped stitch-admin-experience.css layer and suppressed the obsolete grid pseudo-element.
- Preserved the existing admin login, session, logout, rate-limit, cookie, and route behavior.

Green evidence:

- Focused Stitch admin contract: 3 passed, 0 failed.
- Full regression: 460 passed, 0 failed.
- Production Vite build: passed with 1,677 modules transformed.
- Authenticated browser QA: desktop 1440/1440 and mobile 390/390 viewport-to-scroll widths, with the real dashboard present.
- Temporary local screenshots were generated for visual review and removed after verification to avoid repository bloat.

## Screenshot-Based UI Audit - July 14, 2026

Red evidence:

- The 16-route viewport capture exposed a blank unauthenticated /admin screen. Runtime inspection traced it to a stale autofocus index reference after the login field map no longer declared index.
- The live navigation geometry audit exposed the opened tablet/mobile menu beginning at 76px while the production logo still used its 178 by 72 desktop dimensions, causing the menu layer to cross the bottom of the brand area.

Implemented:

- Removed the stale login autofocus/index reference and added a regression assertion that prevents the undeclared variable from returning.
- Restored compact 112 by 52 mobile brand geometry and a 52px logo in the production editorial breakpoint.
- Added a focused navigation regression test for the mobile brand dimensions.

Green evidence:

- Fresh browser matrix: Home, Visceral Mag, Article Detail, Profile Detail, Search, Featured / Media, Contact, and Admin Login at 1440 by 1200 and 390 by 1200.
- Screenshot integrity: 16 of 16 PNGs passed signature, dimension, and non-trivial-size checks.
- Visual review: no clipping, malformed grids, duplicate search controls, broken public routes, or desktop/mobile content drift remained in the captured routes.
- Navigation interaction audit: passed at 1440 by 900, 768 by 1024, and 390 by 844, including expanded Sections, Escape closure, active route state, one search form, and private admin entry.
- Focused editorial-navigation contract: 8 passed, 0 failed.
- Focused Stitch admin contract: 3 passed, 0 failed.
- Full regression: 461 passed, 0 failed.
- Production Vite build: passed with 1,677 modules transformed.
- Generated PNGs were removed after inspection; the reproducible commands and JSON navigation evidence remain in the repository.
## Mobile Admin Navigation Alignment - July 14, 2026

Red evidence:

- The authenticated 390px admin sidebar rendered navigation links at label-driven widths, so Dashboard, Articles, Profiles / Media, Moderation, and Contact Submissions did not share one visual size.

Implemented:

- Added a final 768px admin breakpoint with one full-width navigation grid.
- Standardized every link to a 64px minimum row, square corners, identical padding, left-aligned labels, and a fixed 24px icon column.
- Added a focused regression contract for equal full-width mobile navigation rows.

Green evidence:

- Focused Stitch admin contract: 4 passed, 0 failed.
- Authenticated 390px browser geometry: all five links reported equal widths and equal heights; viewport and document width both measured 390px.
- Full regression: 462 passed, 0 failed.
- Production Vite build: passed with 1,677 modules transformed.

## Homepage Carousel, Masonry, and Social Footer TDD - July 14, 2026

Source: supplied `carrosole4.jpg` and the React Bits Masonry integration brief.

Red evidence:

- The focused production contract began at 0 passed and 4 failed before the carousel model, React components, GSAP dependency, social footer records, optimized assets, styles, and documentation existed.
- The first full regression reported two stale assumptions: an exact four-icon Lucide import and a dependency allowlist that predated the requested GSAP integration.
- Visual QA captured the optional Masonry blur while content was entering; the homepage now disables that blur while retaining position and hover motion.
- A final accessibility regression verified that inactive carousel links leave the keyboard tab order.

Implemented:

- Added a three-slide responsive homepage carousel with the supplied collage, two project-specific generated collages, stable 1920 by 1080 WebP assets, HTML copy, controls, indicators, swipe, pause behavior, lazy loading, and reduced-motion handling.
- Adapted React Bits Masonry to existing editorial fixtures with React Router links, GSAP layout motion, responsive 3/2/1-column geometry at tested widths, accessible metadata, and no demo globals.
- Added Instagram, Facebook, TikTok, YouTube, and LinkedIn footer records as explicit placeholders with accessible labels and safe external-link attributes.
- Kept all routes, API behavior, admin authentication, and public admin privacy unchanged.
- Recorded exact generated-image prompts and launch replacement requirements in `docs/HOME_MEDIA_EXPERIENCE_JULY_2026.md`.

Green evidence:

- Focused home media contract: 4 passed, 0 failed.
- Full regression: 466 passed, 0 failed.
- Production Vite build: passed with 1,683 modules transformed.
- Route matrix: 16 desktop/mobile screenshots captured successfully.
- Browser interaction and geometry audit: no horizontal overflow at 1440, 768, or 390 pixels; five non-overlapping Masonry items; working next and swipe transitions; three 1920 by 1080 carousel images; five valid external social records; no public admin links; no console errors.
- Temporary conversion files and browser screenshots were removed after visual review.

Launch follow-up:

- Replace all five platform-homepage placeholders with verified Babas & Brasse social profile URLs before production release.

## Carousel and Featured Media Refinement - July 14, 2026

Red evidence:

- The focused contract initially failed because carousel controls shared one control cluster, slide media was not a navigation target, the footer social treatment retained visible chrome, and Featured / Media still used the older card gallery.
- Browser QA then exposed a throttled-animation failure: React Bits-style Masonry links had correct geometry but GSAP could leave their computed opacity near zero, producing a blank image wall.

Implemented:

- Positioned previous and next controls on opposite image edges and linked each active slide through React Router while suppressing accidental navigation after a swipe.
- Removed social icon borders, shadows, and backgrounds while preserving 44 by 44 pixel accessible targets.
- Replaced the Featured / Media card feed with the shared GSAP Masonry and linked all five launch media records to their published article routes.
- Added desktop hover and keyboard-focus overlays, always-readable mobile overlays, and immediate full-opacity card paint with motion limited to position and blur.

Green evidence:

- Focused contracts: Home media 4 passed, Featured / Media 6 passed, and Figma public pages 5 passed.
- Full regression: 466 passed, 0 failed.
- Production Vite build: passed with 1,683 modules transformed.
- Browser geometry at 1440 and 390 pixels: no horizontal overflow, opposite-side carousel controls, five non-overlapping Masonry cards, and no old Featured card feed.
- Browser interaction: active carousel image reached `/visceral-mag`; every Featured tile had a published article destination; desktop keyboard focus revealed metadata; mobile metadata was visible without hover.
- Browser paint: all five cards computed to opacity `1`; footer social links computed to `border: 0px` and transparent backgrounds; no runtime errors were reported.

Launch follow-up:

- Replace the five platform-homepage social placeholders with verified Babas & Brasse profile URLs before production release.
