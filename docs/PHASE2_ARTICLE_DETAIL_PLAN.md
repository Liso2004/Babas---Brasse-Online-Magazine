# Phase 2 Article Detail Plan

Date: June 30, 2026
Phase: Phase 2 Article Discovery And Reading
Active slice: Article Detail reading page

## Purpose

The Article Detail page is the focused reading experience for a single published article. It must present editorial metadata, rich body content, author linking, related articles, SEO fields, and approved-only reader interaction.

## Reading Page Requirements

The first Article Detail implementation must include:

- Published article lookup by slug.
- Not-found state for missing or draft articles.
- Title, dek, category, author, publish date, featured image, and image alt text.
- Article body blocks.
- Related articles that exclude the current article and drafts.
- Approved-only comments.
- Approved-only reviews with rating data.
- SEO metadata block with title, description, Open Graph title, and Open Graph description.

## TDD Contract

Tests must prove:

- The Article Detail plan exists and names the reading page scope.
- The Article Detail renderer exists.
- The sample article `Send A Text Before You Knock` renders by slug.
- Metadata, author link, image alt text, and body content render.
- Related articles render from published fixtures.
- Pending comments and rejected reviews do not render publicly.
- Draft and missing article slugs return a not-found state.
- `src/pages/article-detail.html` reflects the renderer contract.

## Current Implementation Strategy

Use fixture-backed CommonJS render functions until the Next.js route scaffold is installed. The route later maps to `app/visceral-mag/[slug]/page.tsx` with the same public visibility, approved-only moderation, and SEO contract.
