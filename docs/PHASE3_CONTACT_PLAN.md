# Phase 3 Contact Plan

Date: July 2, 2026
Wireframe source: `designs/open-design-wireframes/contact.html`

## Purpose

Implement the public Contact page contract from the final Open Design wireframe so readers, contributors, and partners have a tested route for inquiries before the backend form handling is built.

## TDD Contract

Red first:

- Add `tests/contact.test.js` before implementation.
- Prove the Contact plan, renderer, helpers, and generated page artifact are missing or incomplete.

Green target:

- Add `src/render/contact.js` with `renderContactPage` and `getContactSubjectOptions`.
- Replace `src/pages/contact.html` with renderer-shaped output.
- Preserve the final wireframe structure: shared public nav, intro, social/info panel, form, states, and footer.
- Include expected inquiry types: editorial queries, contributor submissions, corrections, and general contact.
- Include form fields for name, email, subject, message, spam protection placeholder, and submit button.
- Include inline validation, success confirmation, submit error, rate-limit, and pending states.
- Mark submitted data as destined for the Admin Contact Submissions workflow.

## Required Sections

- Shared public navigation.
- Contact intro and social/info panel.
- Public contact form with accessible labels.
- State strip for validation, success, error, rate-limit, and pending duplicate-submit prevention.
- Newsletter/footer route continuity.

## Implementation Notes

This slice does not send real email or write to a database yet. It defines the HTML contract that the backend/admin Contact Submissions slice will later consume.
