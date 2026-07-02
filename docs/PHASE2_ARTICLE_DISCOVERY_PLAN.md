# Phase 2 Article Discovery Plan

Date: June 30, 2026
Phase: Phase 2 Article Discovery And Reading
Active slice: Visceral Mag article listing

## Purpose

The Visceral Mag page is the public article archive. It should help readers scan published editorial content, enter search, and browse by category.

## Listing Requirements

The first article listing implementation must include:

- Public article listing from fixture data.
- Published-only reader-facing article cards.
- Category chips for the launch categories.
- Search entry for keyword lookup.
- Clear metadata for title, dek, category, author, and publish date.

## TDD Contract

Tests must prove:

- The Phase 2 plan exists and names the listing scope.
- The Visceral Mag renderer exists.
- Published articles appear in the listing.
- Draft articles do not appear in the public listing.
- Category chips exist for every launch category.
- A search entry exists with a search input.
- `src/pages/visceral-mag.html` reflects the renderer contract.

## Current Implementation Strategy

Use fixture-backed CommonJS render functions until the Next.js route scaffold is installed. The route later maps to `app/visceral-mag/page.tsx` with the same published-only and category/search contract.
