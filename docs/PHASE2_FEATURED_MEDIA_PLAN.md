# Phase 2 Featured / Media Plan

Date: July 1, 2026

## Purpose

Build the Featured / Media public page for the Babas & Brasse MVP so readers can browse photography, artwork, and editorial image features with complete accessibility and attribution metadata.

## TDD Contract

Red first:

- Add `tests/featured-media.test.js` before implementation.
- Prove the plan, renderer, helpers, and generated page artifact are missing or incomplete.

Green target:

- Add `src/render/featured-media.js` with media gallery helpers and a page renderer.
- Replace `src/pages/featured-media.html` with renderer-shaped output.
- Render every launch media item with captions, credits, and alt text.
- Link media-backed editorial entries using published-only article data.
- Exclude draft articles from all public media links.
- Render an empty media state for future CMS integration.

## Required Reader States

- Default gallery: show launch photography, artwork, and media feature placeholders.
- Article media links: connect images to published article detail pages.
- Empty gallery: expose `data-state="no-media"`, a clear message, and a contact link for submissions or editorial follow-up.

## Launch Notes

This page is intentionally static-rendered for the MVP contract. The future admin media library can replace the fixture source as long as it preserves alt text, captions, credits, media type, and published-only article visibility.
