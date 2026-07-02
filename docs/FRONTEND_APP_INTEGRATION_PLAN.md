# Frontend App Integration Plan

Date: July 2, 2026
Launch target: July 31, 2026
Current verification baseline: 156 passing tests before the roadmap/sprint refresh, then 161 passing tests after adding roadmap documentation tests.

## Stack Boundary

Target production frontend: React.

Important boundary: do not create a new React app inside this prototype yet. This repository currently holds static renderer contracts, generated HTML artifacts, fixtures, Open Design wireframes, and TDD documentation. The next production move is to migrate these tested contracts into the selected production frontend, not to bury the prototype under an unreviewed scaffold.

The React app should be created or selected as the production frontend only after the stack decision is confirmed. Until then, this prototype remains the source of truth for route scope, content shape, admin states, support flows, and responsive handoff.

## Route Migration Map

Public routes:

- `/` -> Home
- `/about` -> About
- `/creative-team` -> Creative Team
- `/contributors` -> Contributors
- `/visceral-mag` -> Article archive
- `/visceral-mag/:slug` -> Article detail
- `/search` -> Categories and search
- `/featured` -> Featured media
- `/contact` -> Contact

Admin routes:

- `/admin` -> Admin dashboard
- `/admin/articles` -> Article management
- `/admin/profiles-media` -> Profile and media management
- `/admin/moderation` -> Comments and reviews moderation
- `/admin/contact-submissions` -> Contact submissions inbox

Support routes and subflows:

- `/admin/login` -> Admin login
- `/admin/password-reset` -> Password reset
- `/404` -> Not found
- `/500` -> Server error
- `/offline` -> Offline / maintenance
- `/admin/media/upload` -> Media upload modal/subflow
- `/admin/articles/editor-workflow` -> Article editor workflow
- `/mobile-wireframes` -> Mobile responsive handoff reference

## Component Migration Slices

1. App shell
   - Route registry
   - Public layout
   - Admin layout
   - Shared skip link, page title, metadata, and footer handling

2. Public content components
   - Article cards
   - Profile cards
   - Category chips
   - Media figures
   - Newsletter and contact entry points

3. Admin workflow components
   - Forms
   - Tables
   - Modals
   - State panels
   - Queue/detail split views
   - Confirmation-aware actions

4. Responsive and mobile components
   - Mobile breakpoint rules
   - Compressed public nav
   - Admin card rows replacing dense tables
   - Touch-safe controls
   - No-overlap text and action layouts

## Data, Auth, And API Integration

Authentication integration:

- Real admin login and logout
- Session handling
- Route protection
- Password reset delivery
- Permission boundaries for editor/admin actions

Backend persistence:

- articles
- profiles
- media
- comments
- reviews
- contact submissions
- newsletter signups

API and mutation queue:

- Contact form submission
- Newsletter signup
- Article draft save, autosave, preview, publish, unpublish, schedule, rollback
- Media upload and metadata save
- Profile edits
- Moderation approve/reject/delete
- Contact submission read/archive/reply status

## TDD Gates

Keep the prototype tests as contract tests while adding production tests around the React implementation:

- Component tests for layouts, cards, forms, tables, modals, and state panels
- Route smoke tests for every public, admin, and support route
- Fixture-to-API adapter tests before replacing fixture data
- Auth boundary tests for protected admin routes
- Mutation tests for forms, moderation, media upload, and publishing flows
- Accessibility checks for labels, focus order, touch targets, and error messaging
- SEO checks for public routes, article detail metadata, canonical URLs, and Open Graph fields
- Playwright viewport checks for 360, 390, 430, tablet, and desktop widths

## Launch Verification Gates

Before the July 31, 2026 launch target, the production app needs:

- Full unit/component test pass
- Route smoke tests across public, admin, and support routes
- Accessibility QA
- SEO QA
- Playwright viewport checks
- Deployment smoke checks
- Backup and restore notes for persistent data
- Rollback steps for deployment and content changes

## Immediate Next Steps

1. Confirm whether the production frontend will be created in this repository or a separate app folder.
2. Create the React app only after that boundary is confirmed.
3. Port the route registry and app shell first.
4. Build public routes before admin mutations.
5. Add auth and persistence behind the existing tested admin contracts.
6. Keep every new production slice under TDD, using this prototype as the acceptance contract.


