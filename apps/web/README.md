# Babas & Brasse Web

Status: Production Release Candidate. Active release gates: `docs/PRODUCTION_RELEASE_PLAN_JULY_2026.md`.

Production React application for the editorial platform.

This folder is the production web application boundary.

## Current State

- React-ready route registry, app shell, public layout, admin layout, and dependency-free route smoke contract are present.
- Runtime dependencies are declared for React and Vite.
- Install dependencies inside `apps/web` before running dev/build commands.
- The root prototype remains the acceptance contract.

## Commands

From the repository root, keep proving the acceptance contract with:

```powershell
npm.cmd test
```

Run the app shell route smoke gate with:

```powershell
npm.cmd run test:route-smoke
```
Verify the production release boundary with:

```powershell
npm.cmd run verify:production
```

After dependencies are installed inside `apps/web`, this app is prepared for:

```powershell
npm.cmd run dev
npm.cmd run build
```


## Home Route Migration

The first public route migration contract is scaffolded in `src/pages/HomePage.jsx` with a dependency-free model in `src/pages/homeRouteModel.js`. It preserves the prototype rules for lead story selection, published-only article slots, categories, media preview, people preview, and newsletter action.

Run the Home route migration gate with:

```powershell
npm.cmd run test:production-home
```
## About Route Migration

The About route migration contract is scaffolded in `src/pages/AboutPage.jsx` with a dependency-free model in `src/pages/aboutRouteModel.js`. It preserves mission, vision, organisation, editorial pillars, route cards, and newsletter states from the tested prototype.

Run the About route migration gate with:

```powershell
npm.cmd run test:production-about
```
## Visceral Mag Route Migration

The Visceral Mag route migration contract is scaffolded in `src/pages/VisceralMagPage.jsx` with a dependency-free model in `src/pages/visceralMagRouteModel.js`. It preserves the public archive intro, search entry, category filters, published-only article listing, category metadata, author metadata, and article links from the tested prototype.

Run the Visceral Mag route migration gate with:

```powershell
npm.cmd run test:production-visceral-mag
```
## Article Detail Route Migration

The Article Detail route migration contract is scaffolded in `src/pages/ArticleDetailPage.jsx` with a dependency-free model in `src/pages/articleDetailRouteModel.js`. It preserves published article lookup, draft/missing not-found protection, metadata, body blocks, related articles, approved-only comments, approved-only reviews, and SEO fields from the tested prototype.

Run the Article Detail route migration gate with:

```powershell
npm.cmd run test:production-article-detail
```
## Categories/Search Route Migration

The Categories/Search route migration contract is scaffolded in `src/pages/CategoriesSearchPage.jsx` with a dependency-free model in `src/pages/categoriesSearchRouteModel.js`. It preserves the search form, category chips, published-only filtering, keyword/category/combined filters, active filter summary, no-results state, and reset affordance from the tested prototype.

Run the Categories/Search route migration gate with:

```powershell
npm.cmd run test:production-categories-search
```
## Featured/Media Route Migration

The Featured/Media route migration contract is scaffolded in `src/pages/FeaturedMediaPage.jsx` with a dependency-free model in `src/pages/featuredMediaRouteModel.js`. It preserves the media gallery, captions, credits, alt text, published-only article media links, draft exclusion, and empty media state from the tested prototype.

Run the Featured/Media route migration gate with:

```powershell
npm.cmd run test:production-featured-media
```
## Creative Team Route Migration

The Creative Team route migration contract is scaffolded in `src/pages/CreativeTeamPage.jsx` with a dependency-free model in `src/pages/creativeTeamRouteModel.js`. It preserves creative-team-only profile filtering, profile card anatomy, editorial role notes, loading/empty/error hooks, social-link empty states, and footer paths from the tested prototype.

Run the Creative Team route migration gate with:

```powershell
npm.cmd run test:production-creative-team
```
## Contributors Route Migration

The Contributors route migration contract is scaffolded in `src/pages/ContributorsPage.jsx` with a dependency-free model in `src/pages/contributorsRouteModel.js`. It preserves contributor-only profile filtering, search/category controls, published-work links, draft exclusion, no-results/reset states, and loading/error hooks from the tested prototype.

Run the Contributors route migration gate with:

```powershell
npm.cmd run test:production-contributors
```

## Contact Route Migration

The Contact route migration contract is scaffolded in `src/pages/ContactPage.jsx` with a dependency-free model in `src/pages/contactRouteModel.js`. It preserves editorial query routing, contributor submissions, corrections, business inquiries, spam-protection placeholder, Contact Submissions admin target, validation/success/error/rate-limit/pending states, newsletter continuity, and footer paths from the tested prototype.

Run the Contact route migration gate with:

```powershell
npm.cmd run test:production-contact
```

## Admin Dashboard Route Migration

The Admin Dashboard route migration contract is scaffolded in `src/pages/AdminDashboardPage.jsx` with a dependency-free model in `src/pages/adminDashboardRouteModel.js`. It preserves editor-auth handoff metadata, fixture-derived publishing health metrics, recent activity, quick actions, loading/empty/error/permission states, and links into the core admin workflows from the tested prototype.

Run the Admin Dashboard route migration gate with:

```powershell
npm.cmd run test:production-admin-dashboard
```

## Article Management Route Migration

The Article Management route migration contract is scaffolded in `src/pages/ArticleManagementPage.jsx` with a dependency-free model in `src/pages/articleManagementRouteModel.js`. It preserves role-protected editorial workflow metadata, all article rows including drafts, search/status/category/SEO readiness controls, fixture-derived metrics, editor content/media/SEO fields, row actions, and publishing states from the tested prototype.

Run the Article Management route migration gate with:

```powershell
npm.cmd run test:production-article-management
```

## Profile / Media Management Route Migration

The Profile / Media Management route migration contract is scaffolded in `src/pages/ProfileMediaManagementPage.jsx` with a dependency-free model in `src/pages/profileMediaManagementRouteModel.js`. It preserves protected profile completeness, contributor and Creative Team groups, media metadata/readiness, fixture-derived stats, upload/select fields, keyboard fallback, and upload/permission states from the tested prototype.

Run the Profile / Media Management route migration gate with:

```powershell
npm.cmd run test:production-profile-media-management
```

## Comments / Reviews Moderation Route Migration

The Comments / Reviews Moderation route migration contract is scaffolded in `src/pages/CommentsReviewsModerationPage.jsx` with a dependency-free model in `src/pages/commentsReviewsModerationRouteModel.js`. It preserves protected queue review, combined comments/reviews, moderation stats, search and filters, selected item review, approve/reject/delete actions, undo/error/permission states, and approved-only public rendering from the tested prototype.

Run the Comments / Reviews Moderation route migration gate with:

```powershell
npm.cmd run test:production-comments-reviews-moderation
```

## Contact Submissions Route Migration

The Contact Submissions route migration contract is scaffolded in `src/pages/ContactSubmissionsPage.jsx` with a dependency-free model in `src/pages/contactSubmissionsRouteModel.js`. It preserves protected contact inbox triage, new/read/archive stats, filters, detail panel, reply path, status actions, and inbox states from the tested prototype.

Run the Contact Submissions route migration gate with:

```powershell
npm.cmd run test:production-contact-submissions
```

## Auth Support Route Migration

The Auth Support route migration contract is scaffolded with `src/pages/AdminLoginPage.jsx`, `src/pages/PasswordResetPage.jsx`, and the dependency-free `src/pages/adminAuthRouteModel.js`. It preserves admin login, password reset, recovery links, neutral reset copy, auth states, role/session/CSRF/audit notes, token expiry, and rate-limit handoff from the tested prototype.

Run the Auth Support route migration gate with:

```powershell
npm.cmd run test:production-auth-support
```
## Error Support Route Migration

The Error Support route migration contract is scaffolded with `src/pages/NotFoundPage.jsx`, `src/pages/ServerErrorPage.jsx`, `src/pages/OfflinePage.jsx`, and the dependency-free `src/pages/errorSupportRouteModel.js`. It preserves 404, 500, offline/maintenance, shared recovery routes, retry/search/refresh actions, state coverage, and minimal support footer handoff from the tested prototype.

Run the Error Support route migration gate with:

```powershell
npm.cmd run test:production-error-support
```
## Admin Workflow Support Route Migration

The Admin Workflow Support route migration contract is scaffolded with `src/pages/MediaUploadModalPage.jsx`, `src/pages/ArticleEditorWorkflowPage.jsx`, and the dependency-free `src/pages/adminWorkflowSupportRouteModel.js`. It preserves media upload modal accessibility, required metadata, upload states, editor workflow steps, readiness checklist, SEO review, publish states, and rollback handoff from the tested prototype.

Run the Admin Workflow Support route migration gate with:

```powershell
npm.cmd run test:production-admin-workflow-support
```
## Mobile Wireframe Comps Route Migration

The Mobile Wireframe Comps route migration contract is scaffolded with `src/pages/MobileWireframeCompsPage.jsx` and the dependency-free `src/pages/mobileWireframeCompsRouteModel.js`. It preserves compressed mobile navigation, public stacking rules, admin mobile card rules, 360/390/430/tablet breakpoints, touch targets, no-overlap checks, visible focus, readable type, and stable controls from the tested prototype.

Run the Mobile Wireframe Comps route migration gate with:

```powershell
npm.cmd run test:production-mobile-wireframes
```
## Runtime Dependency Install

The runnable React/Vite app metadata is now declared in `apps/web/package.json`, with `react`, `react-dom`, `vite`, and `@vitejs/plugin-react`. Install dependencies from `apps/web`, then verify the production shell with dev and build commands.

```powershell
cd apps\web
npm.cmd install
npm.cmd run dev
npm.cmd run build
```

The root runtime readiness gate is:

```powershell
npm.cmd run test:web-runtime
```
## Production Visual System

The production visual system is defined in `src/styles.css` and styles the migrated route contracts through stable `data-page`, `data-section`, `data-action`, and state attributes. It covers editorial typography, route section grids, media/cards/chips, forms, focus states, admin/support surfaces, and mobile breakpoints without viewport-width font sizing or negative letter spacing.

Run the visual-system gate with:

```powershell
npm.cmd run test:visual-system
```
## Live Route Smoke

The live route smoke command checks the running Vite app for every public, admin, and support route in the MVP surface. It expects each route to return the SPA document with the React root mount.

Start the dev server, then run:

```powershell
npm.cmd run smoke:web:routes
```

Use `WEB_BASE_URL` to point the check at preview or another deployed environment:

```powershell
$env:WEB_BASE_URL="http://127.0.0.1:4174"; npm.cmd run smoke:web:routes
```
## Browser Polish

The browser polish gate keeps the runnable MVP free of obvious live-browser warnings from missing public media assets, favicon requests, and incomplete form metadata.

```powershell
npm.cmd run test:browser-polish
```
Final design ZIP adoption includes the exported collapsible mobile navigation pattern. At widths up to 760px, use the 44px menu control to reveal the canonical public navigation and editorial search shortcuts.

Public form interaction: Home, About, and Contact use the shared newsletter component; Contact and Article Detail submit JSON to the documented API routes and expose accessible validation, pending, success, and retry states. Until backend endpoints are connected, the live app correctly reports a retryable service error instead of treating the SPA HTML fallback as a successful submission.
## Live admin queues

The protected Contact Submissions and Moderation routes now load records through the same-origin admin API using the HttpOnly session cookie. Contact records support read/archive changes; pending comments support approve/reject decisions. The authenticated shell also signs out through the server before returning to the admin login route. Reviews, article saves, and profile/media mutations remain backend work.
