# Babas & Brasse Production Release Candidate Plan

Date: July 13, 2026
Launch deadline: July 31, 2026
Active delivery phase: Production Release Candidate
Production application: apps/web
Production API: apps/api

## Release Position

The wireframe and MVP phases are closed. Their files remain archived as design and regression evidence, but they no longer define current delivery work.

The React/Vite public application and Node API are the only active runtime boundaries. Production launch remains a no-go until every required gate below has evidence.

## Security Gate

Completed:

- Single administrator role with no public registration.
- HttpOnly, SameSite Strict browser sessions and production Secure cookies.
- Scrypt-hashed administrator password support.
- Production startup rejects plaintext administrator passwords.
- Production startup requires an explicit administrator email, password hash, and external data path.
- API responses include restrictive content security, framing, referrer, permissions, caching, and content-type headers.
- Login and public-form rate limiting and privacy-safe structured security logging are complete.

Required before launch:
- Complete password reset delivery or remove the inactive reset route.
- Confirm TLS termination and proxy header behavior in the deployment environment.
- Rotate and store production secrets in the deployment secret manager.

## Data Gate

Completed:

- Persistent newsletter, contact, and comment records.
- Moderation-safe pending comments.
- Protected contact and comment status mutations.
- Atomic local writes and restart persistence tests.
- Versioned persistence for articles, profiles, reviews, and media metadata.
- Protected article, profile, media, and review administration endpoints.
- Production-selectable PostgreSQL 16-compatible persistence with a versioned migration and transactional JSONB state.
- Public published-content reads reflect persisted editorial changes.
- Article and profile/media administration screens perform live API mutations.

Required before launch:

- Provision the selected managed PostgreSQL service, run the migration on staging, and record connection/retention ownership.
- Add encrypted backup, restore, retention, and recovery evidence.
- Complete media-object storage and upload validation.

## Frontend Gate

Completed:

- Public editorial routes, responsive Figma design, metadata, discovery files, forms, and error surfaces.
- Prototype-only mobile wireframe route retired from production; archived design evidence retained.
- Admin-only route gate, login, logout, contact inbox, and comment moderation.
- Desktop/mobile screenshot matrix including Featured.
- Production build and route smoke verification.
- Public pages hydrate from the persisted published-content API with an availability fallback.
- Article, profile, media metadata, contact, comment, and review admin mutations use protected APIs.

Required before launch:

- Remove prototype-only runtime routes.
- Replace all remaining fixture-backed admin mutations.
- Complete accessibility and keyboard review against final content.
- Run final device QA with approved launch content.

## Deployment Gate

Completed:

- The Node production runtime serves the built React SPA and API on one origin.
- Client routes, API 404 isolation, cache policy, request IDs, and static security headers have automated evidence.
- Production build and startup commands are documented and configurable.

Required evidence:

- Documented hosting target and environment ownership.
- Reproducible production build and startup commands.
- Health check, TLS, domain, caching, and reverse-proxy configuration.
- Deployment-managed secrets and data volume.
- Staging deployment smoke test.
- Rollback procedure tested against the previous release artifact.
- Monitoring, alerting, and backup checks assigned to named owners.

## Content Gate

Required evidence:

- Final articles, profiles, credits, alt text, contact details, and legal copy approved.
- Draft and placeholder records excluded from public output.
- SEO titles, descriptions, canonical URLs, sitemap, and social cards reviewed on staging.
- Newsletter confirmation and editorial contact workflows tested end to end.

## Verification Commands

```powershell
npm.cmd test
npm.cmd run verify:production
npm.cmd --prefix apps/web run build
npm.cmd run smoke:web:routes
npm.cmd --prefix apps/web run qa:screenshots:check
npm.cmd --prefix apps/web audit --audit-level=high
```

## Launch Decision

Launch is approved only when Security, Data, Frontend, Deployment, and Content gates are all green with dated evidence in the testing log.

Current decision: NO-GO for public production deployment. The application now has a managed PostgreSQL runtime adapter; provider provisioning, backup/restore evidence, object storage, email delivery, deployment infrastructure, and final content approval are still required.


## Editorial Design Gate

Added July 13, 2026 after reviewing the current 20-page client report and the editorial reference at `https://ceconline.co.za/`.

Source of truth:

- `DESIGN.md` defines the active production visual and interaction contract.
- `docs/BABAS_BRASSE_REPORT_REVIEW_JULY_2026.md` maps every report requirement to current evidence, gap, decision, and action.
- Figma remains the Babas & Brasse visual identity source.
- CEC supplies structural editorial lessons only; its identity, assets, copy, and composition must not be copied.

Completed:

- Reconciled the report with the current React/Vite and Node production boundary.
- Preserved one canonical route registry and the combined Featured/Media launch route.
- Preserved the decision to avoid duplicate category rails.
- Defined desktop, tablet, mobile, typography, media, component, admin, accessibility, and screenshot acceptance.
- Identified Sabon as the required typeface and recorded the licensed-asset blocker.

Required before launch:

- Profile detail, authored-work discovery, public book-rating reviews, persisted admin search/filter, confirmed delete, and social-link editing are complete.
- Add verified site-wide social navigation after official URLs are supplied.
- Complete designated contact email delivery.
- Complete article feature control, binary image upload/replacement, and structured data depth.
- Verify Article/Person structured metadata, final canonical domain, and social cards.
- Pass the `DESIGN.md` screenshot and content acceptance gates with approved launch material.

This gate does not replace Security, Data, Deployment, or Content gates. Launch remains NO-GO until all gates are green with dated evidence.


## Report Workflow Evidence - July 13, 2026

The following Editorial Design Gate items are now complete:

- Profile detail and authored-work discovery.
- Public review submission with accessible one-to-five book rating and approved count.
- Persisted moderation/contact search and moderation article/rating filters.
- Confirmed article, comment, review, profile, and guarded media deletion.
- Profile creation, full biography, and social-link editing.
- Sixteen desktop/mobile browser captures including profile detail.

Still required before launch:

- Article feature controls, binary upload/replacement, and structured Article/Person data.
- All Security, Data, Deployment, Content, and client sign-off gates already listed in this plan.

Evidence: 428 tests passed, Vite production build passed with 1,673 modules transformed, and 16/16 screenshot integrity checks passed. Launch remains NO-GO.

## Production Runtime Evidence - July 13, 2026

Completed:

- The built React/Vite application and Node API now run from one production service and origin.
- SPA route refresh, API-only 404 behavior, immutable fingerprinted assets, HTML revalidation, static CSP, and request IDs are verified.
- Admin login and public submission routes have independent configurable rate limits.
- Production security events use newline-delimited JSON and exclude credentials, submitted content, tokens, and raw client addresses.
- `verify:production` now runs both the release-boundary and runtime-stack suites.

Evidence:

- Full regression: 440 passed, 0 failed.
- Combined production verification: 10 passed, 0 failed.
- Vite production build: 1,674 modules transformed.
- Production-mode same-origin smoke: Home 200, About 200, health `ok`, unknown API 404, CSP present, request ID present.
- Frontend dependency audit: 0 vulnerabilities.

This clears the local runtime, rate-limit, and structured-log implementation items. Launch remains NO-GO pending managed hosting/storage, backup and restore, TLS/proxy validation, monitoring, object storage, email delivery, approved content, licensed font assets, and client sign-off.


## Production Styling Evidence - July 14, 2026

Completed:

- The supplied Visceral design package is translated into the existing React component architecture through a scoped production stylesheet.
- The five approved page references map to existing public routes only; no route, content, form, API, data, authentication, or admin behavior changed.
- Public navigation retains one search, one Sections panel, keyboard/Escape behavior, and no visible admin entry.
- Desktop and mobile browser review covers 1440, 1024, 768, 390, and 360 widths.
- A mobile menu clipping defect discovered at 390px was fixed and contract-tested.
- Full regression passes 446 of 446 tests.
- Home desktop and Contact mobile Lighthouse audits each scored 100 for accessibility, best practices, SEO, and agentic browsing.
- The live browser reported no console issues, no broken images, no horizontal overflow, and successful loading of the production stylesheet and content API.

Open evidence:

- Production build rerun passed after the required esbuild subprocess permission was granted: 1,675 modules transformed.

The styling source and production build are release-candidate quality. Launch remains NO-GO until the deployment, provider provisioning, backup, object storage, email, content, domain, font, legal, and client approval gates are green.