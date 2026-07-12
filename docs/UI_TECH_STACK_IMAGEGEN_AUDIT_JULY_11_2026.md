# UI, Technology Stack, Repository Hygiene, and ImageGen Audit

Date: July 11, 2026
Scope: runnable React frontend in `apps/web`
Route contract: 22 canonical public, admin, and support routes

## UI Alignment And Function Check

Chrome DevTools inspected all 22 routes at desktop 1440 x 1000 and mobile 390 x 844, for 44 live layout checks.

Results:
- 0 page-level horizontal overflow failures
- 0 duplicate DOM IDs
- 0 broken images
- 0 sticky-header/main-content overlaps
- 0 browser console warnings or errors
- Public and admin navigation retained all canonical destinations
- Mobile menu retained search, admin login, editorial shortcuts, and secondary pages
- Forms, links, buttons, article cards, tables, and media loaded in both viewport classes

Inline editorial links may use text-line height rather than button height by design. Command controls and navigation controls retain stable touch sizing.

## Approved Technology Stack

Runtime dependencies:
- React 18.3
- React DOM 18.3
- React Router DOM 7.18
- Lucide React
- Radix Slot
- class-variance-authority
- clsx
- tailwind-merge

Development dependencies:
- Vite 7.3
- Tailwind CSS 4.1
- Tailwind Vite plugin
- Vite React plugin

Every declared package is referenced by the runtime or build configuration. No MUI packages or unused components from the broad Figma export were installed.

## Repository Hygiene

Generated content is excluded through `.gitignore`:
- `node_modules`
- `dist`
- browser QA screenshots and Lighthouse reports
- local logs and PID files

Removed from the visible Git set:
- ten one-off browser screenshots
- two snapshot text dumps
- local Vite logs and PID state

The final Figma source export and historical wireframe contracts remain because they are design and acceptance sources, not generated build output.

## ImageGen Editorial Asset Set

Mode: built-in ImageGen.

Project assets:
- `/media/editorial/editorial-theatre.jpg`
- `/media/editorial/editorial-books.jpg`
- `/media/editorial/editorial-belonging.jpg`
- `/media/editorial/editorial-language.jpg`
- `/media/editorial/editorial-stagecraft.jpg`

The source generations were optimized from roughly 11 MB of PNG data to roughly 1.1 MB of high-quality JPEG data before integration.

Shared prompt direction:
- sophisticated South African documentary editorial photography
- landscape 4:3, magazine-card-safe compositions
- charcoal, ivory, muted brick red, and forest-green visual family
- realistic light and materials
- no branding, logos, readable text, watermark, UI mockups, or generic stock-photo staging

Theatre prompt: a contemporary black-box rehearsal with a young ensemble and warm stage lighting.
Books prompt: a reader turning pages at a tactile book-lined study table.
Belonging prompt: a respectful Cape Town neighborhood scene centered on community and home.
Language prompt: a multilingual writing workshop in candid collaboration.
Stagecraft prompt: a theatre designer working on a miniature stage model in a practical workshop.

These assets now drive Home, archive, search, article detail, Featured Media, About, Creative Team, Contributors, and admin media presentation.

## Figma-Only Runtime Follow-Up

The live public runtime no longer inherits the old MVP boxed section/card system. The Figma page classes own width, spacing, borders, and backgrounds. React Router now reads category/topic query parameters, and each final-design navigation item produces a distinct article set and active state without expanding the canonical route table.
