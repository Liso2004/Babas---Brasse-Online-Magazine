# Phase 2 Categories/Search Plan

Date: July 1, 2026

## Purpose

Build the Categories/Search public page for the Babas & Brasse MVP so readers can browse published editorial work by category and search by keyword before the full frontend framework is introduced.

## TDD Contract

Red first:

- Add `tests/categories-search.test.js` before implementation.
- Prove the plan, renderer, helpers, and page artifact are missing or incomplete.

Green target:

- Add `src/render/categories-search.js` with a renderer and filter helpers.
- Replace `src/pages/categories-search.html` with renderer-shaped output.
- Keep public results published-only.
- Support category filter behavior from category chips.
- Support keyword search across title, dek, body, category label, and author name.
- Render search loading and no-results state hooks for the future interactive UI.
- Provide a reset affordance that returns readers to `/search`.

## Required Reader States

- Default browse: show all published articles.
- Category filter: show only published articles in the selected category.
- Keyword search: show only published articles matching the query.
- Combined filter: support a query and category together.
- Search loading: expose a stable `data-state-note="search-loading"` hook for the eventual client-side fetch state.
- No-results: render `data-state="no-results"`, a clear message, and a reset link.

## Launch Notes

This slice stays intentionally dependency-light. It gives the future React/Vite or server-rendered implementation a tested behavior contract while the Open Design export for remaining screens is still pending.
