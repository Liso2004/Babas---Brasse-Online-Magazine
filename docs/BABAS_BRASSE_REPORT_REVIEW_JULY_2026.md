# Babas & Brasse Report Review And Production Realignment

Date: July 13, 2026
Launch deadline: July 31, 2026
Report reviewed: `C:\Users\CASH\Downloads\BABAS & BRASSE REPORT FOR ROADMAP AND SPRINTPLAN (1).pdf`
Report length: 20 pages
Current release: `1.0.0-rc.1`

## Executive Finding

The report and the current product agree on the core publication: an image-rich cultural magazine with public discovery, contributor visibility, moderated conversation, SEO, and a private administrator workflow.

The current React/Vite and Node implementation is substantially beyond a wireframe. Its route coverage, public content hydration, administrator session, persisted editorial records, moderation, SEO files, and responsive Figma treatment are valid production foundations. Rebuilding in another stack would add risk without satisfying a report requirement.

The release is still NO-GO. The largest remaining risks are production infrastructure, provider-owned integrations, approved launch content, and final release evidence, not missing page shells.

## Decisions

- Keep the existing React, React Router, Tailwind, Vite, and Node stack.
- Keep the canonical route registry and query-driven category shortcuts.
- Keep Featured and Media combined at `/featured` for launch, with separate sections on the page.
- Do not restore repeated Browse by category modules. Global navigation and contextual links satisfy discovery without duplication.
- Use a stable lead story instead of a carousel until approved banner assets, controls, reduced-motion behavior, and performance evidence exist.
- Treat Sabon as required but blocked until a licensed webfont asset and usage rights are supplied.
- Treat local JSON persistence as development/staging-capable only. Public production requires deployment-managed storage and backup evidence.
- Keep admin access restricted to one administrator. The report explicitly excludes public registration.

## Requirement Traceability

| Report requirement | Current state | Gap or decision | Production action |
| --- | --- | --- | --- |
| Home, About, Creative Team, Contributors, Visceral Mag, Featured, Media, Contact | Implemented as public React routes | Featured and Media are combined by accepted scope | Preserve routes; visually separate Featured Stories and Media Gallery |
| Full-width image-rich Home | Lead story and editorial sections implemented | No approved opening banner; no carousel | Use lead story now; add banner only with approved asset and performance/accessibility checks |
| No excessive desktop side whitespace | Responsive full-width bands exist | Needs final 1440/1920 review with launch content | Add screenshot acceptance against `DESIGN.md` |
| Category access, search and filter | Query-driven shortcuts and `/search` implemented | Category taxonomy in report is broader than launch fixtures | Confirm launch taxonomy and seed approved categories |
| Social navigation | Profile links exist; site-wide icons are absent | Official URLs have not been supplied | Client supplies verified URLs; add accessible icons to header/footer |
| About mission, vision, organization | About route exists | Current text is launch copy, not confirmed Google Document copy | Import and approve client copy |
| Creative Team detail | Canonical profile detail, full biography, links, metadata, and authored work are implemented | Final approved biographies and portrait assets remain | Import and approve launch profile content |
| Contributor detail and published works | Canonical detail route and published-only authored work are implemented; all bylines link to it | Final approved biographies remain | Import and approve contributor content |
| Visceral listing, archive, featured, search | Implemented | Final content and taxonomy approval pending | Validate persisted launch content and empty/error behavior |
| Article title, image, author, date, category, related articles | Implemented | Editorial formatting and structured data need final verification | Preserve rich body blocks; add Article schema and visual QA |
| Comments, approved count, moderation | Public form and approved-only display implemented | Count label is functional; abuse controls are incomplete | Add rate limits and moderation audit logging |
| Reviews and one-to-five book rating | Public form, one-to-five book symbols, text alternative, approved count, persistence, and moderation are implemented | Abuse controls and final content review remain | Add rate limits and verify moderation operations on staging |
| Featured photography and art | Media gallery implemented | Launch assets and credits remain provisional | Replace generated placeholders with approved optimized media |
| Media expansion | Metadata model supports image/video/audio | No deployment binary image upload | Add object storage, validation, transforms, deletion, and backups |
| Contact name, surname, subject, message | Name, email, subject, message and honeypot implemented | Surname is not distinct; report omits email but delivery needs it | Decide combined full name vs surname field; document decision |
| Contact email delivery | Database submission works | Designated inbox email delivery is not implemented | Configure provider and verify end-to-end delivery/retry |
| Spam protection | Honeypot implemented | No public form rate limits | Add IP/accountless throttling and safe structured logs |
| Secure admin login | Single-admin session and hashed credentials implemented | Deployment secrets and TLS/proxy evidence remain | Configure secret manager, TLS, cookie/proxy verification |
| Dashboard statistics and activity | Dashboard model exists | Must be checked against live persisted records | Hydrate every metric/activity feed and verify totals |
| Article create/edit/draft/publish/category/author/image/feature | Live save/publish, functional search/filter, and confirmed delete are implemented | Feature control, binary upload, and some SEO depth remain | Add feature toggle, object upload, and focus keyword |
| Contributor and team management | Create/edit/delete, full biography, and social-link editing are implemented with reference-safe deletion | Binary portrait upload and audit records remain | Complete image upload after object storage; add audit records |
| Media management | Metadata create/update and guarded delete are implemented | Binary upload/replacement and object lifecycle remain | Complete object lifecycle after storage provider selection |
| Comment moderation search/filter/delete | Persisted server search/status/article filters, approve/reject, and confirmed delete are implemented | Rate limits and audit logs remain | Verify operations and audit evidence on staging |
| Review moderation search/filter/rating/delete | Persisted search/status/article/rating filters, approve/reject, and confirmed delete are implemented | Rate limits and audit logs remain | Verify operations and audit evidence on staging |
| Contact submission search/read | Persisted server-side search plus read/archive controls are implemented | Designated inbox delivery is still absent | Verify inbox operations and email delivery on staging |
| SEO titles, descriptions, Open Graph, sitemap | Route metadata, robots, sitemap, social tags implemented | Focus keyword, structured Article/Person data, final domain review pending | Add schema and verify canonical/social previews on staging |
| Sabon typography | Serif fallback currently uses Georgia | Licensed Sabon files are absent | Obtain license/files, load with `font-display: swap`, test metrics |
| Justified article formatting | Long-form body styling exists | Full justification and indentation contract is not formalized | Add safe justification and rich editorial block support |
| Featured image, responsive display, image SEO | Featured images and alt text are modeled | Responsive sources/object optimization are incomplete | Add object transforms, dimensions, lazy loading, credit checks |
| Favicon and social sharing | Favicon and Open Graph metadata exist | Final logo/social card must be approved | Verify production favicon variants and social card rendering |
| Domain `babasandbrasse.com` | Runtime fallback currently references another domain | Canonical domain ownership/config is unresolved | Confirm domain, update environment, sitemap, canonicals, and DNS |
| Google Workspace email | Not an application feature yet | Accounts/provider ownership not confirmed | Record owner, cost approval, DNS, and delivery tests |
| Hosting, SSL, performance, browser support | Build and local QA are green | Hosting, staging, TLS, monitoring, and cross-browser evidence missing | Complete Deployment Gate |
| Accessibility | Focus, labels, landmarks, alt text, mobile behavior exist | Final keyboard, screen reader, and Safari review pending | Run final accessibility/device test with approved content |
| No registration/subscriptions/e-commerce/mobile app | Correctly excluded | Newsletter signup is not a paid subscription | Preserve scope boundary |
| English-only launch | Current content is English | Future localization is out of scope | No launch change |

## Required Work By Priority

### P0: Launch Blocking

- Select hosting and staging ownership.
- Configure deployment-managed storage for editorial records.
- Configure object storage for images and media.
- Prove encrypted backup, restore, retention, and recovery.
- Add login and public form rate limiting.
- Add structured security and moderation audit logs.
- Configure TLS, reverse proxy, health checks, monitoring, and alerts.
- Confirm `babasandbrasse.com`, DNS, canonical URLs, and email DNS.
- Implement and test designated contact email delivery.
- Obtain approved launch content, images, credits, opening banner decision, social URLs, and legal copy.
- Obtain Sabon webfont license/files or record an explicit client-approved fallback.

### P1: Report Completion

- [x] Build profile detail and authored-work discovery.
- [x] Add public review submission with accessible one-to-five book rating and approved count.
- [x] Complete admin profile create/delete and guarded media delete flows.
- [x] Complete article delete.
- [x] Add admin search and filter behavior for comments, reviews, and contact submissions.
- [ ] Add article feature controls.
- [ ] Add binary image upload and replacement.
- Add Article and Person structured metadata.
- Resolve distinct surname field versus a documented full-name field.

### P2: Editorial Refinement

- Recompose Home into Lead, Latest, and a curated secondary collection.
- Confirm no duplicate story appears accidentally in one Home hierarchy.
- Complete 1280, 1440, 1920, 1024, 768, 390, and 360px visual checks.
- Review body justification, indentation, quotations, captions, and credits with real article copy.
- Consider a carousel only after launch-critical work is green.

## Compressed Schedule

### July 13-17: Design And Report Realignment

- Adopt root `DESIGN.md`.
- Lock route and source-of-truth decisions.
- Implement profile/review and high-confidence report gaps with tests.
- Obtain client-owned content, social, domain, email, and font inputs.
- Select deployment and storage providers.

### July 18-23: Production Infrastructure

- Staging deployment, durable data, object storage, secrets, TLS, rate limits, logs, backups, contact delivery, monitoring.
- Verify the completed admin search/filter/delete workflows on staging.
- Import approved content and assets.

### July 24-28: Release Verification

- Cross-browser/device QA.
- Accessibility and keyboard review.
- SEO, schema, canonical, sitemap, social card, performance, and email checks.
- Backup restore and rollback rehearsal.

### July 29-31: Freeze And Launch

- Content freeze.
- Client sign-off.
- Final production verification.
- Deploy, smoke test, monitor, and keep rollback ready.

## Evidence Rule

Every item moves to complete only with a passing automated test or dated manual evidence in `docs/TESTING_LOG.md`. A page that merely renders is not complete when its report workflow is missing.

## Launch Position

Current decision: NO-GO.

The release candidate is suitable for continued production hardening. It is not approved for public launch until deployment-managed storage, object storage, backups, abuse controls, contact email delivery, staging, final content, domain, font, social, and client sign-off gates are resolved or explicitly accepted as launch exceptions.
