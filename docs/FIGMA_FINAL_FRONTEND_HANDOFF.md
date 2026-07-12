# Figma Make Final Frontend Handoff

Date: July 9, 2026

Source: `C:\Users\CASH\Downloads\Author Website Design.make`

Imported project: `designs/figma-author-website-design/`

Figma file name: Author Website Design

Export state:

- The `.make` file is a ZIP-style Figma Make export.
- The exported source repo has been reconstructed at `designs/figma-author-website-design/source/`.
- Packaged LFS assets were restored locally: `Babas_Brasse.jpeg` and `Zubayre_Charles_Online_Magazine.pdf`.
- The online Figma link is treated as external reference; the local `.make` export is the durable implementation source.

## Exported Stack

The Figma Make generated source is React/TypeScript with `react-router`, Vite 6, Tailwind 4, Radix UI, MUI, lucide-react, and many generated shadcn-style UI components.

The current app uses React/Vite under `apps/web`, currently with a much smaller dependency surface and a tested 22 MVP routes contract. It does not currently include `react-router`, Tailwind, MUI, or the generated Radix UI layer.

## Scope Conflict

The Figma final frontend design covers an author/editorial site shape with these reader routes:

- Home
- Theatre Reviews
- Book Reviews
- Essays
- Opinion
- Article detail
- Admin

The Babas & Brasse MVP contract still requires 22 MVP routes across public, admin, and support workflows. Therefore the adoption path is not a blind replacement. The Figma design is the visual/frontend source for header, logo, article-card treatment, editorial section language, newsletter style, and admin dashboard mood, while the current app remains responsible for complete MVP route coverage.

## First Adoption Slice

Implemented in the runnable app:

- Copied the final design logo into `apps/web/public/media/babas-brasse-logo.jpeg`.
- Updated the public layout with a logo-led header, search box using `Search articles...`, admin access, and section shortcuts for Theatre Reviews, Book Reviews, Essays, and Opinion.
- Added CSS hooks for `.brand-logo`, `.header-search`, and `.final-design-section-nav`.

## Next Adoption Slices

1. Map final article-card visual treatment onto Home, Visceral Mag, Categories/Search, and Featured/Media without losing current route IDs.
2. Translate final article categories into MVP categories/search aliases.
3. Compare Figma Admin Dashboard with existing admin workflows and adopt layout density where it improves editorial operations.
4. Clean mojibake in generated Figma copy before reusing any long text.
5. Run desktop/mobile Chrome screenshots for Home, Visceral Mag, Article Detail, Search, Featured, Contact, and Admin Dashboard.
## Route Consistency Decision

The dynamic article detail route stays registered as `/visceral-mag/:slug` so direct article links keep resolving, but it is hidden from the visible public navigation. The final-design Theatre Reviews, Book Reviews, Essays, and Opinion shortcuts map into the existing `/search` MVP route with query parameters instead of adding duplicate top-level `/theatre`, `/books`, `/essays`, or `/opinion` routes.
## Desktop/mobile screenshot QA slice

Completed on July 10, 2026 for Home, Visceral Mag, Article Detail, Search, Featured, Contact, and Admin Dashboard.

The reusable capture command is:

```powershell
npm.cmd run qa:web:screenshots
```

The output folder is `apps/web/browser-qa/figma-viewport-matrix/` and includes desktop and mobile screenshots for:

- `home-desktop.png` and `home-mobile.png`
- `visceral-mag-desktop.png` and `visceral-mag-mobile.png`
- `article-detail-desktop.png` and `article-detail-mobile.png`
- `search-desktop.png` and `search-mobile.png`
- `contact-desktop.png` and `contact-mobile.png`
- `admin-dashboard-desktop.png` and `admin-dashboard-mobile.png`

This completes the earlier adoption-slice requirement to run desktop/mobile Chrome screenshots for Home, Visceral Mag, Article Detail, Search, Featured, Contact, and Admin Dashboard while keeping all final-design shortcuts mapped into the existing MVP route registry.

Screenshot integrity check:

```powershell
npm.cmd run qa:web:screenshots:check
```

This validates the browser QA PNG dimensions and file integrity for the desktop/mobile matrix. It checks PNG signatures, expected viewport dimensions, and non-trivial file sizes before the screenshots can count as frontend evidence.

## SEO metadata adoption slice

Completed on July 10, 2026.

The runnable app now adds browser metadata for resolved routes:

- Document title
- Meta description
- Robots policy
- Canonical URL
- Open Graph title, description, type, URL, and image
- Twitter card metadata

Dynamic article detail metadata uses the article SEO fixture for published articles and falls back to safe `noindex,follow` metadata for missing, draft, or unavailable article slugs.

## Final design ZIP authority - July 10, 2026

C:\Users\CASH\Downloads\Author Website Design.zip is the final visual source of truth for the frontend. Its runnable README, HTML entry, React entry, package scripts, and Figma asset resolver are preserved under designs/figma-author-website-design/source/.

A normalized source comparison confirmed the component, page, data, route, and theme files are semantically identical to the earlier reconstructed Figma source. The ZIP adds the complete runnable entry/config layer. The live MVP keeps its 22-route registry and maps Theatre Reviews, Book Reviews, Essays, and Opinion into /search query routes to avoid duplicate pages.

The exported mobile menu behavior is adopted in the live public header with an accessible toggle, aria-expanded, aria-controls, and a stable 44px touch target.

## Final ZIP verification result

The imported final design and live adoption passed the focused four-test contract, the 341-test full suite, the Vite production build, all 22 live route checks, browser metadata inspection, mobile menu interaction inspection, and the refreshed 12-image desktop/mobile screenshot integrity gate.
## Launch discovery verification

The final-design Home route passes the mobile Lighthouse audit at 100 for Accessibility, Best Practices, SEO, and Agentic Browsing, with 55 passed audits and 0 failures. Public robots.txt, sitemap.xml, and llms.txt files are included in the Vite build and return the expected content types.
## Public interaction adoption - July 11, 2026

The final-design public forms now behave as frontend MVP surfaces. Newsletter validation is shared across Home, About, and Contact. Contact and article comments submit JSON to API-ready endpoints, preserve reader input on failure, announce state changes through polite live regions, and keep comments out of public output until moderation approval. The Vite SPA fallback is explicitly rejected as a false API success.