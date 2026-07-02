# Phase 4 Article Management Plan

Date: July 2, 2026
Source wireframe: `designs/open-design-wireframes/article-management.html`
Route: `/admin/articles`

## Purpose

Article Management is the authenticated editorial workspace for creating, editing, previewing, publishing, and unpublishing magazine articles before the July 31, 2026 MVP launch.

## Wireframe Contract

- Preserve role-protected access for editor/admin users.
- Keep the admin nav visible with the Articles section highlighted.
- Provide article search plus status filter, category filter, SEO-readiness filter, and create article action.
- Show an article table with title, status, category, author, date, SEO readiness, and row actions.
- Include all article records in admin, including drafts that are hidden from public reader pages.
- Include an editor form anatomy for title, slug, dek, body, category, author, featured image, image alt text, SEO title, SEO description, OG title, and OG description.
- Represent draft, publish, autosave, validation, and failure states explicitly.

## MVP Implementation Notes

- Data is fixture-derived in this prototype so tests can prove the screen contract without a backend dependency.
- SEO readiness is true when an article has SEO title, SEO description, and featured image alt text.
- Public preview links point to `/visceral-mag/:slug` while edit links stay inside `/admin/articles/:slug/edit`.
- Publish controls are represented as stateful actions only; real persistence belongs to the later backend/admin integration slice.

## TDD Scope

1. Write the red Article Management contract test.
2. Implement the fixture helpers and renderer.
3. Generate the static admin page artifact from the renderer.
4. Run the focused test, syntax checks, and full suite.
