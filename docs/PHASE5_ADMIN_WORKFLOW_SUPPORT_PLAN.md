# Phase 5 Admin Workflow Support Plan

## Scope

This slice implements the remaining admin support wireframes as generated HTML contracts:

- Media Upload Modal at `/admin/media/upload`.
- Article Editor Workflow at `/admin/articles/editor-workflow`.

These are subflows, not replacement pages. Media Upload Modal extends Profile / Media Management and the article editor. Article Editor Workflow expands Article Management into a clearer Draft, Media, SEO, Review, Publish sequence.

## Media Upload Modal Contract

- Preserve the Open Design Media Upload Modal wireframe source from `designs/open-design-wireframes/media-upload-modal.html`.
- Render an admin dialog with role-protected editor access.
- Include a focus trap, Escape close behavior, and return focus to the launcher after close.
- Collect file, title, alt text, caption, credit, category, usage, publish readiness, article link, and rights note.
- Include drop zone, file preview, save draft metadata, insert media, and cancel actions.
- Cover uploading, missing alt text, invalid file, upload failure, and successful insert states.

## Article Editor Workflow Contract

- Preserve the Open Design Article Editor Workflow wireframe source from `designs/open-design-wireframes/article-editor-workflow.html`.
- Render the Draft, Media, SEO, Review, Publish flow as explicit editor steps.
- Include title, slug, body, category, author, featured media, readiness checklist, SEO title, SEO description, canonical URL, and OG image controls.
- Include autosave, validation, preview, schedule/publish, and rollback states.
- Treat this as an implementation detail for Article Management until the real frontend router and backend persistence are connected.

## TDD Verification

- Red test: `node tests/admin-workflow-support.test.js` failed on missing plan, renderer, and artifacts.
- Green target: focused admin workflow support tests pass after generating both artifacts.
- Regression target: full suite stays green after coverage and documentation updates.
