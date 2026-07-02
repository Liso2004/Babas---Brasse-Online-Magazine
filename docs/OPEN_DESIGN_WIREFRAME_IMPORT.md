# Open Design Wireframe Import

Date imported: July 1, 2026
Source archive: `C:\Users\CASH\Downloads\Wireframe-Annotated.zip`
Workspace location: `open-design-import/`
Entry file: `open-design-import/index.html`

## Import Result

The uploaded Open Design archive is accessible and extracted successfully.

Files imported:

- `open-design-import/index.html`
- `open-design-import/DESIGN-HANDOFF.md`
- `open-design-import/DESIGN-MANIFEST.json`
- `open-design-import/critique.json`

The export contains one annotated landing/home wireframe screen, not the full multi-route MVP app.

## What The Open Design Wireframe Shows

The artifact is an annotated redline for a Babas & Brasse landing/editorial shell.

Visible layout regions:

- Browser-frame presentation with annotation panel.
- Sticky desktop nav at 76px height.
- B&B mark on the left.
- Five editorial nav links.
- Article search field.
- Subscribe CTA on the right.
- Lead theatre story hero with category, headline/dek, byline/date/read-time metadata, CTA pair, and 16:10 lead image.
- Section rail close to the hero: Theatre, Books, Essays, Opinion, Culture.
- Recent article teasers for Books, Essays, and Opinion with thumbnail slot, title, dek, and byline/date/read-time metadata.
- Footer with Stay Connected email capture, section links, about/contact/submit-writing links, publication blurb, and legal row.

## Interaction Notes

The annotated export includes interactive review pins:

- Canvas pins are native buttons.
- Active pin updates `aria-pressed`.
- Active spec row updates `aria-current`.
- Keyboard navigation supports arrow keys, Home, and End.
- Focus-visible outlines are present.
- Reduced-motion handling is present.

Implementation states called out by the handoff:

- Search loading.
- Search no-results.
- Newsletter invalid email.
- Newsletter success.
- Submit error.

## Visual Tokens From Export

Use these as the first visual token source when polishing the frontend:

- `--page: #d6d6d6`
- `--panel: #eeeeee`
- `--panel-2: #dedede`
- `--panel-3: #c9c9c9`
- `--line: #767676`
- `--line-soft: #aaaaaa`
- `--ink: #202020`
- `--muted: #5e5e5e`
- `--accent: #e0523f`
- `--font-ui: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif`
- `--font-mono: "IBM Plex Mono", "SFMono-Regular", Consolas, monospace`

The wireframe is intentionally grayscale/redline rather than final brand art. Preserve its layout hierarchy and component behavior, then layer final editorial styling later.

## Contract Compared To Current Local MVP

Current local tested scaffold already covers:

- Home.
- About.
- Creative Team.
- Contributors.
- Visceral Mag listing.
- Article detail.
- Categories/search placeholder.
- Featured/Media placeholder.
- Contact placeholder.
- Admin placeholders.

The OD export adds stronger Home/Landing specificity:

- Navigation geometry and search/subscribe placement.
- Theatre-led hero pattern.
- Section rail categories: Theatre, Books, Essays, Opinion, Culture.
- Newsletter/footer requirements.
- Annotation accessibility behavior.
- Responsive expectation: desktop 3-up, tablet 2-up, mobile 1-up with horizontal section rail overflow.

## Implementation Decision

Do not replace the existing multi-route scaffold with the single OD `index.html`.

Instead:

1. Treat the OD export as the visual contract for the Home/Landing screen.
2. Keep the current route and data tests as the MVP functional contract.
3. Add the OD Home/Landing details into the next Home refinement slice.
4. Add newsletter/footer/search-state tests before implementing those states.
5. Keep admin and non-home routes governed by the existing MVP wireframe/spec until Open Design provides those screens too.

## Next TDD Impact

Recommended next slices after Categories/Search:

1. Home visual-contract refinement from OD export.
2. Newsletter/footer state tests.
3. Search loading/no-results state tests.
4. Responsive layout tests or screenshot checks once a browser test harness is added.
