# Phase 1 Public Shell Plan

Date: June 30, 2026
Phase: Phase 1 Public Editorial Shell
Active slice: Home page

## Purpose

The Home page is the public discovery hub for the Babas & Brasse MVP. It should route readers to the lead story, latest articles, category access, media preview, and people preview.

## Home Page Requirements

The first Home page implementation must include:

- Lead story from published launch content.
- Latest articles section that excludes drafts.
- Category access based on fixture categories.
- Media preview using image/media fixtures with alt text.
- People preview for Creative Team and Contributor profiles.

## TDD Contract

Tests must prove:

- The Home page render function exists.
- The Home render output includes the required sections.
- The sample article `Send A Text Before You Knock` can appear as the lead story.
- Draft articles are not promoted in reader-facing Home sections.
- The `src/pages/home.html` artifact reflects the Home renderer contract.

## Current Implementation Strategy

Use dependency-light CommonJS render functions for this slice. When the Next.js scaffold is installed, migrate this contract into `app/page.tsx` and keep the same section/data requirements.
