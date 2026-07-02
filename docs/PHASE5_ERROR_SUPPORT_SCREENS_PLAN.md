# Phase 5 Error Support Screens Plan

Date: July 2, 2026
Source wireframes: `designs/open-design-wireframes/not-found.html`, `designs/open-design-wireframes/server-error.html`, `designs/open-design-wireframes/offline-maintenance.html`
Routes: `/404`, `/500`, `/offline`

## Purpose

Error Support Screens provide reader-safe recovery pages for missing content, server failures, and offline or maintenance states before the Babas & Brasse launch.

## Shared Contract

- Keep shared public nav available on each support screen.
- Use plain language and avoid blame.
- Provide recovery routes to Home, Articles, Search, and Contact.
- Keep a minimal footer on error states.
- Avoid promotional or distracting content while the reader is trying to recover.

## Screen Contracts

- 404 Not Found: explain broken links, removed articles, mistyped URLs, invalid slugs, and reset-to-search recovery.
- 500 Server Error: explain failed request, temporary application fault, retry, contact support, and safe fallback navigation.
- Offline / Maintenance: explain no network, maintenance window, refresh, cached content, and contact fallback.

## TDD Scope

1. Write the red error support screen contract test.
2. Implement `src/render/error-support.js` with shared recovery layout and all three page renderers.
3. Generate `src/pages/not-found.html`, `src/pages/server-error.html`, and `src/pages/offline-maintenance.html`.
4. Update coverage docs/tests so these support routes are marked implemented while remaining support gaps stay explicit.
5. Run focused, syntax, and full-suite verification.
