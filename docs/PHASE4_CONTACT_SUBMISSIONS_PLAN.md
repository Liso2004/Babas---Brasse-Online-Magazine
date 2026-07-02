# Phase 4 Contact Submissions Plan

Date: July 2, 2026
Source wireframe: `designs/open-design-wireframes/contact-submissions.html`
Route: `/admin/contact-submissions`

## Purpose

Contact Submissions is the authenticated admin inbox for messages sent through the public Contact page.

## Wireframe Contract

- Preserve role-protected access for editor/admin users.
- Keep the admin nav visible with Contact highlighted and new submission count surfaced.
- Provide search and filters by status, subject, sender email, and received date.
- Show statuses for new, read, and archived submissions.
- Pair the inbox table with a detail panel to avoid route churn while triaging messages.
- Show sender name, sender email, subject, message, status, and received date.
- Provide a reply path that preserves original message context.
- Provide mark-read and archive actions.
- Represent loading, empty inbox, archive success, error, and permission states.

## MVP Implementation Notes

- Data is fixture-derived in this prototype so the inbox contract can be tested without backend storage.
- Reply paths use `mailto:` links for the MVP prototype and should become managed outbound workflow later.
- Archive/read changes are represented as actions only until persistence exists.
- Failed archive/read changes must show recoverable error feedback in the later interactive implementation.

## TDD Scope

1. Write the red Contact Submissions contract test.
2. Implement fixture helpers for inbox rows, reply links, and submission stats.
3. Generate the static admin page artifact from the renderer.
4. Run the focused test, syntax checks, and full suite.
