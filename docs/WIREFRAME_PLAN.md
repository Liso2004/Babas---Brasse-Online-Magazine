# Wireframe Plan

This document starts the Babas & Brasse wireframe phase for a compressed MVP launch by July 31, 2026.

## Open Design Status

Open Design MCP tools are visible in Codex, but live calls to `get_active_context` and `list_projects` currently return `fetch failed`. Until the Open Design daemon is reachable, the working wireframes will live in `wireframes/index.html` with tests enforcing the required screen coverage.

When Open Design reconnects, use the local wireframe and `wireframes/wireframe-spec.json` as the source contract for the first OD project/artifact.

## Wireframe Goals

- Establish the public editorial structure.
- Prove the required MVP screens exist.
- Prove the admin dashboard has the right operational screens.
- Keep the layout low-fidelity enough to change quickly.
- Capture content, state, and workflow decisions before visual design polish.

## Required Public Screens

- Home
- About
- Creative Team
- Contributors
- Visceral Mag/articles
- Article detail
- Categories/search
- Featured/Media
- Contact

## Required Admin Screens

- Admin dashboard
- Article management
- Profile/media management
- Comments/reviews moderation
- Contact submissions

## First Wireframe Slice

The first slice is a single browser-viewable artifact with all required screens represented as low-fidelity panels. It should include:

- Global navigation and mobile navigation notes.
- Public content discovery flow.
- Article reading flow.
- Search/category browsing flow.
- Contact form flow.
- Admin operational flow.
- Moderation states.
- Contact submission states.

## Acceptance Criteria

- `npm.cmd test` passes.
- Every required screen from `wireframes/wireframe-spec.json` appears in the HTML.
- Every screen has a purpose, primary blocks, and state notes.
- Public and admin navigation are both represented.
- The artifact links to its stylesheet and remains browser-viewable without a dev server.
