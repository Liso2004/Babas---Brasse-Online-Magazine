# Babas & Brasse Wireframe Annotated Design Handoff

Project: Wireframe Annotated
Project ID: 2aab063e-bbdf-426b-ab5c-6baf53cd6a63
Target delivery: MVP launch planning for July 31, 2026
Format: Static Open Design HTML wireframes

## Intent

This project is the final annotated wireframe set for the Babas & Brasse online magazine MVP. It is not a React app and should remain a static Open Design handoff until the production build imports the layout decisions.

The wireframes define the public reader experience, the admin/editor experience, route boundaries, responsive notes, state coverage, accessibility expectations, and implementation handoff notes.

## Visual System

- Grayscale redline style with a restrained editorial layout.
- Shared browser frame, B&B mark, numbered annotation pins, and right-side spec panel.
- No decorative gradients, stock imagery, or finished visual styling.
- The design intentionally uses grey boxes, lines, chips, tables, and panels to describe structure without pretending to be final UI.

## Public Routes

- `index.html` - Home / Landing
- `about.html` - About
- `creative-team.html` - Creative Team
- `contributors.html` - Contributors
- `visceral-mag-archive.html` - Visceral Mag Archive
- `article-detail.html` - Article Detail
- `categories-search.html` - Categories / Search
- `featured-media.html` - Featured / Media
- `contact.html` - Contact

## Admin Routes

- `admin-dashboard.html` - Admin Dashboard
- `article-management.html` - Article Management
- `profile-media-management.html` - Profile / Media Management
- `comments-reviews-moderation.html` - Comments / Reviews Moderation
- `contact-submissions.html` - Contact Submissions


## Support Wireframes

- `auth-login.html` - Admin Login
- `password-reset.html` - Password Reset
- `not-found.html` - 404 Not Found
- `server-error.html` - 500 Server Error
- `offline-maintenance.html` - Offline / Maintenance
- `media-upload-modal.html` - Media Upload Modal
- `article-editor-workflow.html` - Article Editor Workflow
- `mobile-wireframes.html` - Mobile Wireframe Comps

## Shared Files

- `wireframe-system.css` - shared route wireframe system for all route pages except the original standalone landing file.
- `wireframe-system.js` - shared annotation pin interactions.
- `mvp-wireframes.html` - route overview launcher.
- `critique.json` - final design critique score and notes.

## Interaction Contract

- Annotation pins are real buttons.
- Pins update `aria-pressed` and focus the matching spec row.
- Arrow keys, Home, and End move between pins.
- Route overview links use normal anchors for review navigation.

## Implementation Notes

- Public routes must show published/approved content only.
- Admin routes require authentication and role checks.
- Media cannot publish without alt text, caption, and credit.
- Search/filter state should sync to URL parameters.
- Contact and admin form states must preserve user-entered data after validation or submit errors.
- Article detail must preserve SEO title, description, canonical URL, OG image, and structured data handoff.

## Do Not Change Without Review

- The route list.
- Public/admin access boundaries.
- Numbered annotation structure.
- Shared visual language across files.
- The distinction between rough wireframe and final production UI.

