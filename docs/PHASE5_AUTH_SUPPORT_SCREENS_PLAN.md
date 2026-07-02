# Phase 5 Auth Support Screens Plan

Date: July 2, 2026
Source wireframes: `designs/open-design-wireframes/auth-login.html`, `designs/open-design-wireframes/password-reset.html`
Routes: `/admin/login`, `/admin/password-reset`

## Purpose

Auth Support Screens cover the non-public admin entry points needed before real admin authentication can be integrated into the Babas & Brasse MVP.

## Admin Login Contract

- Keep the route clearly branded as B&B Admin and separate from public navigation.
- Provide labelled email and password fields.
- Provide a sign-in action with pending/disabled state handoff.
- Provide visible invalid credential, locked account, loading, and successful redirect states.
- Link to Password Reset and the public site without exposing admin internals.
- Security handoff must include role check, session expiry, CSRF protection, and audit logging.
- Never reveal whether email exists.

## Password Reset Contract

- Provide a request step that collects an email address.
- Use neutral confirmation copy to avoid account enumeration.
- Provide a confirmation step with token validation, new password, confirm password, and password strength guidance.
- Cover email sent, expired token, password mismatch, and reset success states.
- Include a safe return to login path.
- Security handoff must include token expiry and rate limit behavior.

## TDD Scope

1. Write the red auth support screen contract test.
2. Implement `src/render/admin-auth.js` with login and password reset renderers.
3. Generate `src/pages/admin/login.html` and `src/pages/admin/password-reset.html` from the renderer.
4. Update coverage docs/tests so only the remaining support screens stay marked as gaps.
5. Run focused, syntax, and full-suite verification.
