# Babas & Brasse Production Design Contract

Status: Active production source of truth
Date: July 13, 2026
Launch target: July 31, 2026
Runtime: React, React Router, Tailwind CSS, focused component primitives, Vite, and the Node editorial API

## Purpose

This document defines the production design system and page behavior for Babas & Brasse. It replaces MVP wireframes as the active design contract. Archived wireframes remain regression evidence only.

The governing principle is publication before product interface. A reader should encounter a confident cultural magazine first: stories, images, authorship, and editorial point of view. Application controls should remain quiet, predictable, and secondary.

## Approved July Styling Package

The Visceral Brutalist Archive package is the approved public visual foundation. It is translated into the existing React components as a sharp, high-contrast editorial system; reference HTML remains visual guidance and is not copied into the runtime.

Approved route mapping:

- Home / uses home_brutalist_broadsheet/code.html.
- About /about uses the spacious about_brutalist_manifest/code.html variant.
- Contact /contact uses contact_brutalist_dispatch_v2/code.html.
- Featured and Media /featured uses featured_media_brutalist_edit/code.html.
- Visceral Mag /visceral-mag uses visceral_mag_brutalist_archive_v2/code.html.
- Article detail, Search, Creative Team, Contributors, and profile detail extend the same shared public system without creating routes or replacing content.
- Admin, authentication, and support surfaces keep their existing operational presentation because the package provides no approved admin reference.

The Heritage Press package is secondary reference material only. It may inform readable spacing and form ergonomics but does not override the Visceral foundation. Existing content order, route behavior, navigation destinations, data, forms, and protected admin behavior remain unchanged.

No new font dependency was installed. The production layer uses the existing Georgia and Times editorial fallback with Arial and Helvetica for utility text. Licensed Sabon files remain the preferred report-aligned upgrade when supplied; Source Serif 4 and Inter were not added without a separate font approval.
## Inputs And Priority  

The contract is informed by:

1. The client report, `BABAS & BRASSE REPORT FOR ROADMAP AND SPRINTPLAN (1).pdf`.
2. The approved Figma Make export in `designs/figma-author-website-design/source/`.
3. The existing production React routes and tested interaction contracts.
4. The editorial structure of `https://ceconline.co.za/` as a reference for content hierarchy and publication rhythm.

When sources conflict, use this order:

1. Security, accessibility, and factual content integrity.
2. Explicit client requirements in the report.
3. Approved Babas & Brasse brand assets and Figma direction.
4. Structural lessons from the reference publication.
5. Legacy prototype behavior.

The CEC reference is inspiration, not a template. Do not copy its identity, copy, imagery, proprietary assets, or page composition. Babas & Brasse must remain visibly its own South African literary and cultural publication.

## Reference Lessons

The reference publication succeeds through a few reusable editorial ideas:

- A clear publication identity appears before utility controls.
- An image-first editorial hierarchy gives one story priority, then lets readers scan denser rows.
- Category, author, date, and excerpt metadata make story cards useful without opening them.
- Full-width editorial bands create rhythm without placing the whole publication inside a floating box.
- Repeated sections such as Latest, Most Read, and topic-led selections create intentional discovery.
- Long-form mission copy and practical footer navigation coexist without competing with current stories.

Babas & Brasse should translate those ideas into theatre, books, essays, opinion, interviews, photography, art, and cultural commentary.

## Brand Character

The experience should feel:

- Literary, observant, warm, rigorous, and independent.
- Image-rich without allowing photography to overpower the writing.
- Contemporary without using generic technology-product styling.
- South African through approved subject matter, voices, imagery, credits, and editorial language rather than decorative motifs.
- Calm enough for long reading sessions and dense enough for frequent return visits.

Avoid oversized marketing heroes, decorative gradients, nested cards, excessive rounded containers, duplicated search fields, repeated category rails, and placeholder state labels in normal reader views.

## Visual System

### Typography

- Primary editorial face: Sabon, as required by the report.
- Production stack: `"Sabon", "Sabon Next", "Sabon LT Std", Georgia, "Times New Roman", serif`.
- A licensed webfont file and usage rights must be supplied before Sabon can be considered complete. Until then, Georgia is the explicit fallback.
- Display headings use the editorial face with restrained line height.
- Navigation, controls, labels, metadata, and admin tables may use a neutral system sans serif for faster scanning.
- Article body text is 18 to 20px on desktop and 17 to 18px on mobile, with a 1.65 to 1.8 line height.
- Article copy is fully justified where it remains readable. Hyphenation and narrow mobile measures must be tested to prevent rivers and broken spacing.
- Letter spacing is 0. Font size does not scale directly with viewport width.

### Color

Use the current production palette as the Babas & Brasse base:

- Paper: `#f7f3ed`
- Surface: `#fffdfa`
- Ink: `#181716`
- Muted text: `#6f6961`
- Editorial red: `#a43f2f`
- Deep green: `#243837`
- Rule: `#d8d2ca`
- Focus blue: `#1c6dd0`

Color must communicate hierarchy and state, not decorate empty space. Text and controls must meet WCAG AA contrast.

### Layout

- Public pages use full-width bands with constrained inner content, never one global centered card.
- Desktop editorial content may reach 1280 to 1440px while article copy remains near 680 to 760px.
- Use 12-column thinking on desktop, 6 columns on tablet, and one primary flow on mobile.
- Repeated story grids use stable image ratios and fixed grid tracks so labels and loading states do not shift layout.
- Cards use square corners or a maximum 8px radius.
- Rules, spacing, image scale, and typography create hierarchy before shadows.
- No excessive empty margins at common desktop widths.

### Imagery

- Every published article requires a featured image, meaningful alt text, credit, and optimized responsive delivery.
- Lead stories use uncropped or carefully art-directed imagery that communicates the actual subject.
- Standard story cards use a consistent 4:3 or 3:2 ratio.
- Portrait/profile images use a consistent portrait ratio.
- Media galleries preserve the artwork or photograph's useful viewing area.
- Generated development images are temporary until editorial approval and complete credits.
- Binary image upload remains blocked until deployment object storage, validation, optimization, and backup are configured.

## Information Architecture

Keep one canonical route for each reader or admin job. Category shortcuts use query parameters and must not create duplicate pages.

Public routes:

- `/` - Home
- `/about` - About
- `/creative-team` - Creative Team
- `/contributors` - Contributors
- `/visceral-mag` - article archive
- `/visceral-mag/:slug` - article detail
- `/search` - search and category/topic results
- `/featured` - combined Featured and Media showcase
- `/contact` - contact and editorial enquiries

The report lists Featured and Media separately. They remain one `/featured` route for launch because the accepted project scope combines them, while the page must provide distinct Featured Stories and Media Gallery sections. Split them after launch only if content volume and analytics justify it.

### CEC-Adapted Editorial Navigation

The public header applies CEC's useful principles of strong publication identity, minimal top-level choices, generous spacing, and an expandable editorial index without copying its branding, wording, color treatment, or exact composition.

- Primary navigation contains Home, About, Visceral Mag, Featured/Media, and Contact.
- Desktop uses one reference-aligned row: publication mark on the left, the route cluster and Sections control through the middle, and the single search control on the far right.
- Restrained `///` separators establish editorial rhythm between desktop links. They are decorative, hidden from assistive technology, and removed from the stacked mobile menu.
- One Sections control opens a full-width desktop panel for Theatre Reviews, Book Reviews, Essays, Opinion, Creative Team, and Contributors.
- Category links keep the existing canonical `/search` query routes. People links keep their existing canonical public routes.
- Search is rendered once and adapts to desktop, tablet, and mobile instead of being duplicated in separate navigation bars.
- Active pages use an underline and color shift rather than a filled navigation pill.
- Escape closes open menus, outside pointer interaction closes the desktop panel, focus remains visible, and reduced-motion preferences disable menu animation.
- At 960px and below, one menu button opens a full-height, scrollable navigation surface with 44px or larger controls.
- The public header and footer contain no admin sign-in, CMS, dashboard, or admin-route link.

Admin routes remain private behind the single administrator session. The only intended entry is a manually entered `/admin` URL. Unauthenticated access resolves to the admin login flow, authenticated administrators reach the dashboard, logout returns to `/admin`, and every admin/auth route uses `noindex,nofollow`. Admin code is route-split from the public page bundle. No contributor, editor, public, or subscriber login is introduced.

## Public Page Contracts

### Home

Home is the main discovery surface:

- Lead with one strong published story or approved opening banner.
- Follow with Latest stories, then a secondary editorial selection such as Most Read or a curated topic.
- Give every story visible category, title, author, publication date, image, and useful excerpt where space permits.
- Category access belongs in global navigation and contextual section links, not a repeated Browse by category block.
- End with the shared newsletter and publication footer.
- A carousel is not required for launch unless the client supplies multiple approved campaigns and motion controls. A stable lead story is the accessible production substitute.

### About

- Use final client copy for mission, vision, and organizational overview.
- Keep the editorial story readable as a full-width narrative, not a series of promotional cards.
- Include the publication's relationship to Zubayr Charles accurately and without SEO keyword stuffing.

### Creative Team And Contributors

- Keep the two audiences distinct.
- Cards show image, name, role, short biography, social links, and authored-work count where relevant.
- Selecting a person must reveal a profile detail experience with full biography, social links, and all published works.
- Until dedicated profile routes are built, in-page anchors are an interim behavior, not report completion.
- Every article author link must reach the corresponding public profile experience.

### Visceral Mag And Search

- Visceral Mag is an editorial archive, not a generic card catalogue.
- Start with a lead story and follow with a dense, readable story feed.
- Search and category filtering share `/search`; results preserve URL state and support empty/error recovery.
- Do not repeat category browsing modules below the global navigation.
- Drafts never appear publicly.

### Article Detail

- Required visible anatomy: category, title, dek, featured image, author, date, body, related stories, approved comment count, comment form, approved comments, approved reviews, and review form.
- Preserve paragraph spacing, indentation, quotations, and editorial formatting.
- Review ratings use one to five book symbols with a text alternative such as `4 out of 5 books`.
- New comments and reviews enter moderation and never appear optimistically as approved.
- SEO fields include title, meta description, Open Graph title, Open Graph description, canonical URL, image alt text, and structured Article metadata.

### Featured And Media

- Featured Stories use a deliberate editorial list with stable landscape media and complete metadata.
- Media Gallery supports photography, art, illustration, and later multimedia.
- Credits, captions, alt text, and useful uncropped previews are mandatory.
- Desktop must not stretch story rows or leave ambiguous detached metadata.

### Contact And Newsletter

- Contact requires name, surname or clearly documented combined full name, email, subject, and message.
- Preserve text after failed submission.
- Spam controls include a honeypot now and rate limits before launch.
- A successful database write is not email delivery. The designated editorial inbox delivery must be tested end to end.
- Newsletter is one shared component with a compact horizontal desktop layout and single-column mobile layout. It must not pull unrelated route links underneath itself.

## Shared Components

### Header

- Brand/logo is the first signal.
- Desktop navigation is a single stable row or a deliberate two-level editorial header.
- Mobile uses one menu control and one search field.
- Search, menu, and admin access use familiar Lucide icons with accessible labels.
- Social icons use official URLs and external-link behavior only after client approval.
- Active category shortcuts must reflect URL query state.
- No route may render its own duplicate header search.

### Story Cards

All variants share one content model:

- image and alt text
- category
- title
- author
- date
- optional dek
- canonical article link

Use three hierarchy levels: lead, standard, and compact. Do not duplicate the same article in one page section set unless explicitly labelled as Most Read or another editorial collection.

### Newsletter

- Heading, short value statement, email label/input, submit command, and live status.
- The desktop form aligns label, input, and button without creating a large empty panel.
- Validation, submitting, success, and failure states do not shift surrounding content unexpectedly.

### Footer

- Brand statement, section links, About/Contact/Contributors, and verified social links.
- Do not repeat the full header.
- Legal copy and contact information require client approval.

## Responsive Behavior

Desktop acceptance widths: 1280, 1440, and 1920px.
Tablet acceptance widths: 768 and 1024px.
Mobile acceptance widths: 360 and 390px.

Desktop:

- Lead and archive compositions should use available width without stretching copy.
- Story rows keep image and text aligned.
- Header controls fit without wrapping into accidental rows.
- Newsletter controls align on one intentional baseline.

Mobile:

- Header collapses without horizontal scrolling.
- Story cards become one column.
- Images retain stable aspect ratios.
- Article text, tables, long names, and buttons fit their containers.
- More navigation does not create nested scrolling.
- Touch targets are at least 44px.

No element may overlap, clip a label, create page-level horizontal scrolling, or move because content changed length.

## Admin Design

The admin is an operational tool, not a visual copy of the public magazine.

- Use a quiet left sidebar, compact header, dense tables, clear form labels, and explicit status feedback.
- Only the administrator can enter any editing, media, inbox, or moderation screen.
- Dashboard metrics match real persisted records.
- Article management supports create, edit, draft, publish, category, author, image, feature, SEO, and eventually delete with confirmation.
- Profile management supports team/contributor separation, biographies, images, social links, published works, and delete with confirmation.
- Media management distinguishes binary upload from metadata registration.
- Comment and review moderation supports pending/approved/rejected, delete, search, article filter, and rating filter for reviews.
- Contact submissions support search, read, and archive.
- Destructive actions require confirmation and an audit record.
- Loading, empty, error, and saving states contain real guidance and recovery actions.

## Accessibility And Performance

- Semantic landmarks and one visible page heading.
- Keyboard access for navigation, menus, forms, moderation, and dialogs.
- Visible focus indicators.
- Descriptive image alt text; decorative images use empty alt text.
- Form errors are programmatically associated with fields and announced.
- Reduced-motion support for any future carousel or animation.
- Responsive image sources, lazy loading below the fold, explicit dimensions, and format optimization.
- Target no avoidable layout shift and no blocking oversized hero asset.
- Test Chrome, Firefox, Safari, and Edge before launch.

## Acceptance Gates

The design is launch-ready only when:

- Root `DESIGN.md` and the report traceability review agree with the active sprint.
- Every required public and admin route passes the route smoke test.
- Desktop and mobile screenshot matrices show no overlap, clipped content, boxed-page warping, duplicate navigation, or detached metadata.
- The Sabon licensing decision and production font files are recorded.
- Home, Visceral Mag, Featured/Media, Contact, and Article Detail pass visual review with approved content.
- Profile detail, public book-rating reviews, social navigation, and email delivery are either complete or explicitly accepted as launch exceptions by the client.
- Search/filter controls work against persisted content.
- All published media has alt text and credits.
- Accessibility, production build, full regression, dependency audit, and launch discovery checks are green.
- Staging verifies domain, TLS, persistent storage, object storage, backup/restore, rate limits, monitoring, contact delivery, and social cards.
- Final client sign-off is dated in the testing log.

## Immediate Realignment

Priority 0, release blockers:

1. Deployment-managed storage, encrypted backup/restore, object storage, rate limits, monitoring, staging, and contact email delivery.
2. Approved launch content, opening banner decision, social URLs, legal/contact copy, image credits, and Sabon font/license files.

Priority 1, report completion:

1. Completed: dedicated profile detail and authored-work discovery.
2. Completed: public review form with accessible book rating and approved review count.
3. Completed: admin delete actions for articles/conversation/profiles, guarded media deletion, social-link editing, persisted search, article filters, and review rating filters.
4. Remaining: article feature control, media binary upload/replacement, and structured Article/Person metadata plus final canonical/social card verification.

Priority 2, editorial polish:

1. Home sections realigned to Lead, Latest, and a curated secondary collection without duplicate articles.
2. Final desktop/mobile visual review against this contract.
3. Optional carousel only after approved assets, controls, reduced-motion behavior, and performance evidence exist.


## Stitch v4 Production Refinement - July 14, 2026

`stitch_babas_brasse_design_contract (4).zip` is the approved second-pass composition reference for Article Detail, Search, Contributors, Creative Team, Profile Detail, Featured / Media, and private Admin surfaces. It refines the existing Visceral Brutalist Archive system; it does not replace the production navigation, route registry, content model, API, or authentication boundary.

- `apps/web/src/stitch-refinement-v4.css` loads after the production editorial layer and is scoped by public or private design attributes.
- Article Detail uses a monumental heading, framed hero, metadata rail, lead paragraph, and a 760px reading measure.
- Search uses the literal `Search Archive` heading on the unfiltered route and one asymmetric result set.
- Contributors uses one full-width directory with canonical profile and latest-work links; the repeated card and published-work section is retired.
- Creative Team keeps portrait cards in an uneven twelve-column editorial grid.
- Profile Detail uses equal-height portrait and biography tracks on desktop and one stable stack on mobile.
- Featured / Media uses explicit twelve-column placements so each real asset appears once without empty accidental rows.
- Admin uses a private operational sidebar, dense tables, editor hierarchy, and honest media metadata registration. Binary upload is not presented as available.
- Fictional Stitch content, replacement menus, generated footer links, and exported HTML are not part of production.

Traceability and browser evidence are recorded in `docs/STITCH_V4_REFINEMENT_AUDIT_JULY_2026.md`.
