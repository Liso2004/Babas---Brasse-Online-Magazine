---
name: frontend-ui
description: Build and refine the Babas & Brasse Magazine React/Vite frontend. Use for public or admin UI pages, components, styles, responsive behavior, accessibility, navigation, visual bugs, and frontend API integration under apps/web.
---

# Frontend UI

## Overview

Deliver polished, accessible UI changes while preserving the production route contracts and backend API boundaries.

## Workflow

1. Inspect the relevant page, component, route model, and `apps/web/src/styles.css` before editing.
2. Reuse the existing React, React Router, Tailwind, and Lucide patterns. Avoid adding dependencies unless clearly necessary.
3. Keep public pages and admin pages responsive at mobile, tablet, and desktop widths. Use semantic HTML, labels, keyboard support, visible focus states, and meaningful image alt text.
4. Treat `/api` as the backend contract. Do not change API routes, database code, or authentication behavior while completing a UI-only request.
5. Preserve route loading, empty, error, permission, and pending states when modifying data-driven views.

## Project Boundaries

- Work primarily in `apps/web/src`.
- Use `apps/web/src/pages` for route-level UI and route models for view-specific data logic.
- Keep the stable `data-page`, `data-section`, `data-action`, and state attributes used by the visual system.
- Follow the production route contracts documented in `apps/web/README.md`.

## Verification

Run the narrowest relevant check first. Use `npm.cmd --prefix apps/web run build` for compile confidence; use the provided route, navigation, or screenshot QA scripts when the change affects those areas. Start the Vite app only when a live-browser check is needed.