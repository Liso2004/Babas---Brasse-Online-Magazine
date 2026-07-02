# Phase 4 Comments / Reviews Moderation Plan

Date: July 2, 2026
Source wireframe: `designs/open-design-wireframes/comments-reviews-moderation.html`
Route: `/admin/moderation`

## Purpose

Comments / Reviews Moderation is the authenticated admin workspace for reviewing reader comments and article reviews before they appear on public article pages.

## Wireframe Contract

- Preserve role-protected access for editor/admin users.
- Keep the admin nav visible with Moderation highlighted and pending counts surfaced.
- Provide queues for pending, approved, and rejected items.
- Provide search plus filters across status, type, article, and date.
- Combine comments and reviews into one dense queue table.
- Show article context, author, type, status, and body for each moderation item.
- Provide a selected-item detail panel so editors can review context before acting.
- Expose approve, reject, and delete actions.
- Require confirmation for destructive delete actions.
- Represent pending, approved-only public rendering, undo, error, and permission states.

## MVP Implementation Notes

- Data is fixture-derived in this prototype so the moderation contract can be tested without backend storage.
- Public article pages must use approved-only public rendering: pending and rejected comments/reviews never render publicly.
- Delete is represented as a confirmation-aware action only until persistence exists.
- Optimistic moderation should support undo and server failure feedback in the later interactive implementation.

## TDD Scope

1. Write the red Comments / Reviews Moderation contract test.
2. Implement fixture helpers for combined moderation rows and queue stats.
3. Generate the static admin page artifact from the renderer.
4. Run the focused test, syntax checks, and full suite.
