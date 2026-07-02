# Final Open Design Wireframe Handoff

Date: July 1, 2026
Source project: `C:\Users\CASH\AppData\Roaming\Open Design\namespaces\release-stable-win\data\projects\2aab063e-bbdf-426b-ab5c-6baf53cd6a63`
Local copy: `designs/open-design-wireframes/`

## Status

The complete Open Design annotated wireframe set has been copied into this project. This is the current design source of truth for the Babas & Brasse MVP wireframes.

This is not final production UI. It is the finished annotated wireframe handoff used to guide the production frontend/admin implementation.

## Preview

Open the route overview:

```text
designs/open-design-wireframes/mvp-wireframes.html
```

Or serve it locally:

```powershell
cd C:\Users\CASH\Magazine\designs\open-design-wireframes
npm.cmd run preview
```

Then visit:

```text
http://localhost:4173/mvp-wireframes.html
```

## Verify

From the main project:

```powershell
npm.cmd test
```

From the wireframe folder only:

```powershell
cd C:\Users\CASH\Magazine\designs\open-design-wireframes
npm.cmd test
```

## Public Wireframe Routes

- Home / Landing: `index.html`
- About: `about.html`
- Creative Team: `creative-team.html`
- Contributors: `contributors.html`
- Visceral Mag Archive: `visceral-mag-archive.html`
- Article Detail: `article-detail.html`
- Categories / Search: `categories-search.html`
- Featured / Media: `featured-media.html`
- Contact: `contact.html`

## Admin Wireframe Routes

- Admin Dashboard: `admin-dashboard.html`
- Article Management: `article-management.html`
- Profile / Media Management: `profile-media-management.html`
- Comments / Reviews Moderation: `comments-reviews-moderation.html`
- Contact Submissions: `contact-submissions.html`


## Support Wireframes

- Admin Login: `auth-login.html`
- Password Reset: `password-reset.html`
- 404 Not Found: `not-found.html`
- 500 Server Error: `server-error.html`
- Offline / Maintenance: `offline-maintenance.html`
- Media Upload Modal: `media-upload-modal.html`
- Article Editor Workflow: `article-editor-workflow.html`
- Mobile Wireframe Comps: `mobile-wireframes.html`

## Build Guidance

- Preserve the shared B&B nav structure and annotation handoff decisions.
- Public routes must only surface published and approved content.
- Admin routes require role-gated access.
- Media records need title, caption, credit, alt text, usage, and publish readiness.
- Search/filter controls should sync to URL query params.
- Contact/admin forms need validation, loading, success, error, and retry states.
- Article pages need metadata, related articles, approved-only comments/reviews, and SEO handoff.

- Support routes cover auth, password reset, public errors, offline/maintenance, media upload, article editor substeps, and mobile-only responsive comps.

