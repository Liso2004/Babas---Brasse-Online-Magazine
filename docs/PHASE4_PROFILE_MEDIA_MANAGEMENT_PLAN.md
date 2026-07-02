# Phase 4 Profile / Media Management Plan

Date: July 2, 2026
Source wireframe: `designs/open-design-wireframes/profile-media-management.html`
Route: `/admin/profiles-media`

## Purpose

Profile / Media Management is the authenticated admin workspace for maintaining contributor profiles, Creative Team profiles, and media metadata used by public profile pages, article detail pages, and Featured / Media.

## Wireframe Contract

- Preserve role-protected access for editor/admin users.
- Keep the admin nav visible with Profile / Media highlighted.
- Show contributors and Creative Team management groups.
- Expose profile status, role, profile completeness, and edit action for each profile.
- Show a media library with image, alt text, caption, credit, category, usage, and publish readiness.
- Include an upload/select flow with keyboard file input fallback.
- Require alt text, caption, credit, and category metadata before media can be public.
- Represent uploading, missing metadata, file error, empty library, and permission states.

## MVP Implementation Notes

- Data is fixture-derived in this prototype so the admin contract can be tested without backend storage.
- Profiles are treated as active launch records when name, role, slug, and short bio exist.
- Media is publish-ready when it has alt text, caption, and credit.
- Media usage is calculated from article featured-image references, including admin-only draft usage.
- Upload controls are non-persistent placeholders until the backend/admin integration phase.

## TDD Scope

1. Write the red Profile / Media Management contract test.
2. Implement fixture helpers for profiles, media rows, readiness, and usage.
3. Generate the static admin page artifact from the renderer.
4. Run the focused test, syntax checks, and full suite.
