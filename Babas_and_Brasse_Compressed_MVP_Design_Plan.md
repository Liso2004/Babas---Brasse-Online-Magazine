# Babas & Brasse Compressed MVP Design Plan

Date prepared: June 30, 2026
Launch deadline: July 31, 2026
Source brief: `Babas_and_Brasse_Roadmap_Sprint_Plan_Report.pdf`, prepared June 23, 2026

## 1. Open Design MCP Status

Open Design MCP is partly available in this Codex session:

- Tool discovery found the Open Design tools, including `get_active_context`, `list_projects`, `get_artifact`, `create_project`, and `start_run`.
- `codex mcp list` shows `open-design` is enabled and points to `C:\Users\CASH\AppData\Local\Programs\Open Design release-stable-win\Open Design.exe`.
- Direct Open Design calls currently return `fetch failed` for both `get_active_context` and `list_projects`.
- Open Design was launched locally and multiple `Open Design.exe` processes are running, but MCP calls still return `fetch failed`.

Conclusion: the Codex config has loaded and the MCP entry is registered. The remaining issue appears to be Open Design app/daemon reachability, not missing tool registration. Another Codex reload is not required just to expose the tools, but a clean Open Design restart and then a Codex reload may be needed to reconnect the live MCP daemon.

When Open Design is reachable, create or reuse a project named:

`Babas & Brasse Online Magazine MVP`

Suggested first Open Design run prompt:

```text
Create a responsive editorial web app design for Babas & Brasse Online Magazine, a cultural online magazine and publication platform. The launch deadline is July 31, 2026, so design for a compressed MVP, not the full 10-12 week roadmap.

The design should feel editorial, cultural, sharp, readable, and media-forward. It must support public readers and a practical admin dashboard.

Required public screens:
- Home
- About
- Creative Team
- Contributors
- Visceral Mag article listing
- Article detail
- Categories and search
- Featured and Media
- Contact

Required admin screens:
- Admin dashboard overview
- Article management
- Profile and media management
- Comments and reviews moderation
- Contact submissions

Prioritize a complete launchable MVP: clean navigation, responsive article reading, profile discovery, category/search browsing, media presentation, secure admin workflow patterns, moderation queues, contact handling, SEO fields, and launch-ready mobile layouts.
```

## 2. Brief Summary

The original report recommends a 10-12 week delivery window for a professional editorial platform. It positions Babas & Brasse as an online magazine, digital publication platform, writer portfolio, and cultural content hub.

Core objectives from the brief:

- Establish Babas & Brasse as a recognized online publication and cultural content hub.
- Improve discoverability for Babas & Brasse, Zubayr Charles, contributors, and published articles.
- Publish articles, interviews, reviews, essays, photography, artwork, and media content.
- Provide a mobile-friendly reading experience with search and category filtering.
- Provide a secure admin dashboard for articles, contributors, creative team, media, comments, reviews, and contact submissions.
- Include SEO foundations: SEO-friendly URLs, Open Graph metadata, XML sitemap, image alt text, and social sharing metadata.

Recommended stack from the brief:

- Next.js and TypeScript
- Tailwind CSS
- Supabase and PostgreSQL
- Supabase Storage or Cloudinary
- TipTap or similar rich text editor
- React Hook Form and Zod
- Cloudflare Turnstile or reCAPTCHA
- Resend, SendGrid, or SMTP for contact delivery
- Vercel, Netlify, or Cloudflare Pages for hosting

Key dependencies:

- Logo and favicon
- Opening banner and imagery
- About page copy
- Social links
- Contributor and Creative Team profiles
- Launch-ready articles
- Admin dashboard reference
- Domain, hosting, SSL, Google Workspace, DNS access

## 3. Compressed MVP Scope For July 31, 2026

The original 10-12 week roadmap must be compressed into about 4.5 weeks. The MVP should keep the full editorial loop, but simplify polish, automation, and optional engagement.

Launch-critical:

- Public magazine site with clear editorial identity.
- Home, About, Creative Team, Contributors, Visceral Mag/articles, article detail, category/search, Featured/Media, and Contact.
- Admin authentication and dashboard shell.
- Article create, edit, draft, publish, delete, and SEO fields.
- Profile management for contributors and creative team.
- Media upload/selection with alt text.
- Moderated comments and moderated reviews.
- Contact form and contact submission inbox.
- SEO basics: slugs, meta title/description, Open Graph fields, sitemap, robots, image alt text.
- Responsive QA, browser smoke testing, staging, production deployment, SSL, DNS.

Defer until after launch:

- Newsletter signup and campaigns.
- Public user accounts.
- Subscriptions, e-commerce, memberships, bookmarks, likes.
- Popular articles, advanced archive filters, editor picks automation.
- Podcast/audio/video section depth beyond simple embeds or media cards.
- Advanced analytics dashboard.
- Complex contributor permissions.
- Mobile app.

MVP design principle:

The public site should feel like a real magazine on day one. The admin should feel like a focused publishing tool, not a decorative dashboard.

## 4. Compressed Timeline

### June 30 - July 5: Scope, IA, Design Direction, Scaffold

Deliverables:

- Confirm MVP cut line and launch content checklist.
- Finalize information architecture and route map.
- Establish visual direction in Open Design once MCP is reachable.
- Define content models and admin workflows.
- Scaffold frontend app, database, auth, storage, and deployment target.

### July 6 - July 12: Public Site Foundation

Deliverables:

- Responsive shell: header, mobile nav, category navigation, footer.
- Home, About, Creative Team, Contributors.
- Article card, profile card, media card, category chip, search input, empty states.
- Initial SEO metadata patterns.

### July 13 - July 19: Editorial Reading And Discovery

Deliverables:

- Visceral Mag article listing.
- Article detail template.
- Category pages and search results.
- Featured and Media sections.
- Author/contributor linking.
- Sample article seeded: "Send A Text Before You Knock".

### July 20 - July 26: Admin And Moderation

Deliverables:

- Admin login and protected dashboard layout.
- Article management with draft/publish workflow and SEO fields.
- Contributor, creative team, and media management.
- Comment and review queues with approve, reject, delete, search, and filter.
- Contact submissions inbox.

### July 27 - July 31: Launch Hardening

Deliverables:

- Content loading and final client copy/assets.
- Responsive QA across mobile and desktop.
- Accessibility pass for labels, keyboard flow, contrast, and alt text.
- Image optimization and performance pass.
- Sitemap, Open Graph previews, robots, Search Console readiness.
- Production deploy, domain, SSL, contact email delivery, admin handover.

## 5. Required Screens And Page Scope

### Home

Purpose: magazine front door and discovery hub.

MVP elements:

- Lead story or editorial hero.
- Latest articles.
- Featured categories.
- Featured/Media preview.
- Contributor or Creative Team highlight.
- Clear path to Visceral Mag and Contact.

Compressed decision: prefer one strong lead story module over a complex carousel unless assets and time are ready.

### About

Purpose: explain the publication, mission, vision, and organization.

MVP elements:

- Mission.
- Vision.
- Organizational overview.
- Link to Creative Team and Contributors.

### Creative Team

Purpose: present the core team behind the publication.

MVP elements:

- Profile cards with name, role, image, short bio, social links.
- Detail state or profile section if content is available.
- Related articles optional for launch if data is ready.

### Contributors

Purpose: present writers, photographers, artists, and cultural contributors.

MVP elements:

- Contributor grid/list.
- Profile detail with bio, social links, and published works.
- Author links from article detail pages.

### Visceral Mag / Articles

Purpose: main editorial archive.

MVP elements:

- Article listing.
- Category filters.
- Search entry point.
- Article cards with title, dek, category, author, date, image.
- Empty and loading states.

### Article Detail

Purpose: reading experience.

MVP elements:

- Title, dek, category, author, date, featured image, alt text.
- Rich body content.
- Author/contributor link.
- Related articles.
- Moderated comments.
- Moderated review/rating form where relevant.
- SEO and Open Graph metadata.

### Categories And Search

Purpose: help readers browse by topic and find content.

MVP elements:

- Category landing pages.
- Search results page.
- Basic filters by category and keyword.
- No-results state with route back to latest articles.

### Featured / Media

Purpose: visual culture, photography, artwork, and media-forward content.

MVP elements:

- Featured grid.
- Media cards with image, title, caption, category, link.
- Responsive image handling.
- Alt text required.

Compressed decision: one combined Featured/Media design system can power both pages, even if routes remain separate.

### Contact

Purpose: receive publication inquiries and general messages.

MVP elements:

- Contact form with validation.
- Spam protection.
- Success and error states.
- Email delivery.
- Admin submission capture.

### Admin Dashboard

Purpose: central control panel for publishing operations.

MVP elements:

- Protected login.
- Overview cards: published articles, drafts, pending comments, pending reviews, contact submissions.
- Recent activity.
- Fast links to common admin tasks.

### Article Management

Purpose: manage publication workflow.

MVP elements:

- Article table with search, status, category, author, date.
- Create/edit screen with title, slug, dek, body, category, author, featured image, alt text, SEO title, SEO description, Open Graph fields.
- Draft and publish states.
- Delete with confirmation.

### Profile And Media Management

Purpose: manage contributors, creative team, and visual assets.

MVP elements:

- Contributor CRUD.
- Creative Team CRUD.
- Media library with upload/select, alt text, caption, credit, category.
- Profile image handling.

### Comments And Reviews Moderation

Purpose: keep public interaction controlled.

MVP elements:

- Pending, approved, rejected views.
- Approve, reject, delete.
- Search and filter.
- Article association.
- Hidden until approved.

### Contact Submissions

Purpose: manage inbound messages.

MVP elements:

- Inbox table.
- Detail view.
- Status: new, read, archived.
- Search/filter.
- Spam-safe handling.

## 6. Suggested Data Models

Article:

- id, title, slug, dek, body, status, categoryId, authorProfileId, featuredImageId, publishedAt, createdAt, updatedAt
- seoTitle, seoDescription, focusKeyword, ogTitle, ogDescription, ogImageId

Category:

- id, name, slug, description, sortOrder

Profile:

- id, type, name, slug, role, shortBio, fullBio, imageId, socialLinks, active
- type values: creative_team, contributor

MediaItem:

- id, fileUrl, title, altText, caption, credit, mediaType, category, createdAt

Comment:

- id, articleId, name, emailHash, body, status, createdAt, moderatedAt

Review:

- id, articleId, name, emailHash, rating, body, status, createdAt, moderatedAt

ContactSubmission:

- id, name, email, subject, message, status, createdAt

## 7. Next-Step Plan

Design:

- Restore Open Design MCP connectivity.
- Create `Babas & Brasse Online Magazine MVP` project in Open Design.
- Generate first visual direction for public site and admin dashboard.
- Review Home, Article Detail, Article Listing, Admin Overview, and Article Editor first because these define most reusable components.

Frontend:

- Scaffold Next.js, TypeScript, Tailwind CSS, routing, and layout system.
- Build responsive public shell and reusable editorial components.
- Implement article listing/detail, profile pages, search/category routes, Featured/Media, and Contact.

Admin dashboard:

- Implement Supabase auth and protected admin routes.
- Build dashboard layout, article CRUD, profile CRUD, media library, moderation queues, and contact inbox.
- Keep admin visual design dense, practical, and table/form driven.

Launch readiness:

- Confirm domain and hosting provider early.
- Confirm Google Workspace/DNS access early.
- Seed launch content by July 24, 2026.
- Complete QA from July 27 to July 30, 2026.
- Deploy and verify production by July 31, 2026.

Immediate blockers:

- Open Design MCP daemon returns `fetch failed`.
- Brand assets, opening banner, About copy, profile content, launch articles, social links, domain/DNS access, and email delivery provider need confirmation.
