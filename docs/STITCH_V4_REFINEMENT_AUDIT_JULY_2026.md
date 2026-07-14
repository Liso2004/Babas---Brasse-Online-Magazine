# Stitch v4 Production Refinement Audit

Date: July 14, 2026  
Source: `C:\Users\CASH\Downloads\stitch_babas_brasse_design_contract (4).zip`

## Decision

The package is adopted as a composition and hierarchy reference, not as a replacement application. Existing production navigation preserved. Existing React routes, launch fixtures, API persistence, metadata, moderation forms, and admin-only session enforcement remain authoritative.

The implementation lives in `apps/web/src/stitch-refinement-v4.css`, loaded after `production-editorial.css`. Every adopted page declares a `data-design-reference` value so future changes can be traced to the relevant source screen.

## Screen Mapping

| Production surface | Stitch source | Adopted treatment | Preserved behavior |
| --- | --- | --- | --- |
| Article detail | `article_detail_babas_brasse` and mobile | Monumental headline, framed hero, metadata rail, lead paragraph, narrow reading measure | Canonical article content, author/category routes, related stories, comments, reviews, SEO |
| Search / categories | `search_results_babas_brasse` and mobile | Large archive introduction, hard-focus search, asymmetric result index | One search form, query-string routing, category/topic routes, empty state |
| Contributors | `contributors_directory_babas_brasse` | Table-like contributor directory with ID, role, and latest published work | Canonical profile links and only published work from the route model |
| Creative Team | `creative_team_babas_brasse` | Uneven portrait grid and stronger editorial framing | Team records, profile links, editorial role note |
| Profile detail | `profile_detail_mobile` | Image-led identity panel and high-contrast biography surface | Biography, social links, contact fallback, published work |
| Featured / Media | `featured_media_gallery_babas_brasse` | Twelve-column desktop collage, stable mobile stack, black story band | Each media item rendered once, credits, captions, article links, submission route |
| Admin dashboard/editor | `admin_dashboard_private` | Private sidebar workspace, dense tables, large editor hierarchy | Session enforcement, filters, preview, publish/unpublish, save, delete |
| Admin media library | `admin_media_library_private` | Asset-table hierarchy and dashed metadata registration panel | Metadata CRUD, usage protection, object-storage gate |

## Preservation Rules

- Existing production navigation preserved; the Stitch menu and fictional links were not copied.
- No duplicate content rendering. Search results use one map and contributors use one directory instead of a profile-card list followed by repeated published work.
- Existing article, people, category, media, contact, and admin routes remain unchanged.
- Existing content remains authoritative. Fictional Stitch names, dates, headlines, categories, and media were not imported.
- Admin remains absent from public navigation and remains protected by the existing server-backed session.
- Binary upload remains disabled until object storage, MIME validation, size limits, and deployment credentials are configured. The UI registers real metadata and states this limit plainly.

## Responsive Contract

- Desktop uses fixed grid tracks and explicit image heights to prevent overlap and reflow.
- At `1024px`, Featured / Media moves to balanced half-width tracks and admin changes from sidebar to a top workspace bar.
- At `768px`, article metadata becomes an inline row, directories and galleries become single-column, and admin forms collapse to one field track.
- `390px` and `360px` rules keep headings, search controls, media, and admin content inside the viewport.
- Reduced-motion preferences remove nonessential transitions and animation.

## Verification Gates

| Gate | Command | Expected |
| --- | --- | --- |
| Focused TDD contract | `npm.cmd run test:stitch-v4` | All Stitch v4 contracts pass |
| Full regression suite | `npm.cmd test` | All repository tests pass |
| Production build | `npm.cmd run build:production` | Vite build completes |
| Browser review | `npm.cmd run qa:design-review` | Desktop and mobile route review completes |

No ZIP files or generated Stitch HTML were copied into the repository, avoiding design-export duplication and Git bloat.


## Final Evidence

- Focused contract: 6 passed, 0 failed.
- Full regression: 457 passed, 0 failed.
- Production build: passed with 1,676 modules transformed.
- Public browser geometry: passed at 1440px and 360px for Article Detail, Search, Contributors, Profile Detail, and Featured / Media.
- Admin privacy: unauthenticated private route redirected to login with no public header and `noindex,nofollow`.
