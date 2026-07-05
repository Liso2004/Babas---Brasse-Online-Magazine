# Babas & Brasse Web

Sprint 1 app shell scaffold for the production React migration.

This folder is the selected production app boundary: `apps/web`.

## Current State

- React-ready route registry, app shell, public layout, admin layout, and dependency-free route smoke contract are present.
- No dependencies have been installed yet.
- Install dependencies only after approval and after the boundary has been reviewed.
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
Preview the generated prototype with:

```powershell
npm.cmd run preview:mvp
```

After dependencies are approved and installed inside `apps/web`, this app is prepared for:

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
