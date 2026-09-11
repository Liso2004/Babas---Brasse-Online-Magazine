# Urban Anarchy: Connected Editorial Section Plan

## Scope

This plan implements the attached **Section Pages & Moodboard Content Linking** brief. The supplied Stitch archive is a visual reference only: preserve the existing React/Vite application, routing, and Urban Anarchy brutalist identity rather than copying its standalone HTML, remote image URLs, or CDN setup.

## Current findings

| Area | Current state | Planned correction |
| --- | --- | --- |
| Articles | `/visceral-mag` and `/visceral-mag/:slug` are fixture-backed; article detail currently selects generic related content. | Use relationship-based related dispatches and conditional visual-research links. |
| Contributors | `/contributors` and `/people/:slug` already exist. | Retain the masthead presentation and expose each person's selected work plus optional visual research. |
| Moodboard | `moodboard_items/` holds 33 images, but no data model or archive route exists. | Add metadata, relationship logic, index/detail pages, and production-safe public assets. |
| Navigation | Header/footer currently have no visual-archive destination. | Add one connected archive entry while retaining the existing navigation shell. |

## Plan

### 1. Create a visual-archive data model

1. Add a focused moodboard fixture module and expose it through the existing launch-fixture composition.
2. Give every image a stable `id`, `slug`, title, source URL, category, tags, issue, and alt text. Preserve all 33 files as individual artifacts, including numbered variants.
3. Add explicit article/contributor/item links only where supported by current content; never add links solely to fill a UI.
4. Place the supplied assets in a Vite public-media directory such as `apps/web/public/media/moodboard/`, retaining a central filename-to-URL mapping. Root-level assets are not a reliable production asset contract.

### 2. Implement reusable relationship matching

1. Add a dedicated content-relationship utility instead of component-local matching.
2. Normalize titles: lowercase, remove punctuation/hyphens and image-copy suffixes, tokenize, and ignore generic words when they are the only match.
3. Score explicit links first, then shared specific title tokens, non-generic tags, category/issue, and common article/contributor references. Require more than one weak signal so `urban` or `design` alone cannot connect content.
4. Return deterministic, de-duplicated, self-excluding, capped results. Unit-test title variants, numbered variants, generic-only false positives, tag matches, and explicit links.

### 3. Add archive routes and models

1. Extend `routes.js` using the current route matcher with `/moodboard` and `/moodboard/:slug`; do not replace routing.
2. Add archive index/detail route models with ready, empty, and not-found states.
3. Wire new pages through `App.jsx`, using React Router `Link` for every internal route.
4. Add breadcrumbs and a visual-archive navigation entry so no detail page is a dead end.

### 4. Build the visual research layer

1. Build `/moodboard` as an archive/pinboard of individual specimens, not a generic gallery. Show specimen number, title, category, issue, tags, and a detail destination.
2. Build `/moodboard/:slug` with `RELATED ARCHIVE MATERIAL`, rendered only when real connections exist: specimens, article, contributor, issue/category.
3. Use the existing hard rules, mono metadata, rectangular crops, red/inverted interactions, and editorial separators. Avoid carousels and rounded recommendation cards.

### 5. Connect existing editorial pages

1. Replace `articleDetailRouteModel.js`'s generic first-three related selection with category, tag/subject, issue, contributor, and archive-aware ranking.
2. Add a conditional `VISUAL RESEARCH` or `SOURCE ARCHIVE` section low in `ArticleDetailPage.jsx`; each item links to its archive detail.
3. Retain author links to `/people/:slug`; add `SELECTED DISPATCHES` and optional `VISUAL RESEARCH` to contributor profiles.
4. Keep the contributor directory's masthead treatment and link cards to real profile/work destinations.
5. Link home/feature elements to article or archive pages only when an underlying relationship exists.

### 6. Refine and validate

1. Add narrow, scoped CSS rules to the existing Urban Anarchy stylesheets. Keep the black/white/red palette, sharp borders, visible focus states, and responsive grid behavior.
2. Preserve `/api/content` fallback behavior; treat moodboard data as optional so empty API payloads never break routes.
3. Check image alt text, heading order, keyboard navigation, mobile vertical relationship lists, and desktop grids.

## Delivery order

1. Asset inventory and metadata.
2. Matching utility and tests.
3. Routes/models and empty states.
4. Archive index/detail UI.
5. Article, contributor, and navigation connections.
6. Responsive/accessibility pass and verification.

## Acceptance checks

- `npm.cmd --prefix apps/web run build` succeeds.
- Route smoke checks cover `/moodboard`, a valid item, an unknown item, article detail, contributors, and contributor detail.
- Blade Runner, Dune, Matrix, or Cyberpunk variants link as related artifacts without being merged.
- Generic-only title overlap creates no relationship.
- Empty related sections are absent, and all shown links have real destinations.
- Desktop, tablet, and mobile have no horizontal overflow, clipped text, or broken image crops.
- Supplied moodboard images load from the public asset path; no generated or remote replacements are introduced.

## Explicitly out of scope

- Replacing the current routing/API architecture or redesigning the entire site.
- Copying Stitch prototype HTML wholesale or adding its CDN dependencies.
- Linking unrelated content or merging distinct moodboard images.
- Editing the pre-existing `docs/design-reference/babas-brasse/Fixes.md` checkout/footer/creative-team ticket, which is unrelated and intentionally left untouched.
