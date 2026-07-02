# Phase 4 Admin Dashboard Plan

Date: July 2, 2026
Wireframe source: `designs/open-design-wireframes/admin-dashboard.html`

## Purpose

Implement the Admin Dashboard contract from the final Open Design wireframe so editors have an operational overview before the deeper admin tools are implemented.

## TDD Contract

Red first:

- Add `tests/admin-dashboard.test.js` before implementation.
- Prove the Admin Dashboard plan, renderer, helpers, and generated page artifact are missing or incomplete.

Green target:

- Add `src/render/admin-dashboard.js` with `renderAdminDashboardPage`, `getDashboardMetrics`, and `getRecentActivity`.
- Replace `src/pages/admin/dashboard.html` with renderer-shaped output.
- Preserve the final wireframe structure: admin nav, overview metrics, recent activity table, quick actions, and admin states.
- Require authenticated editor access and expose permission-denied handoff.
- Derive dashboard numbers from fixtures: published articles, drafts, pending comments, pending reviews, and new contact submissions.
- Include recent activity table columns: actor, item, status, timestamp, and next action.

## Required Sections

- Admin navigation separate from public navigation.
- Dashboard stats for published articles, drafts, pending comments, pending reviews, and new contact submissions.
- Recent activity table for editorial operations.
- Quick actions for new article, moderation, media upload, and inbox.
- Loading, empty, error, and permission-denied states with retry or sign-in route.

## Security Notes

The dashboard requires authenticated editor access. Public routes must never expose unpublished articles, pending comments, rejected reviews, or contact submissions.
