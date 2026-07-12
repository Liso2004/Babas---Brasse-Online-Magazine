# Babas & Brasse Public API

This dependency-free Node service persists the launch-critical public submission flows used by the React app.

## Run locally

From the repository root:

```powershell
npm.cmd run dev:api
npm.cmd --prefix apps/web run dev
```

The API listens on `http://127.0.0.1:8787`. Vite proxies browser requests from `/api` to that service, keeping the frontend on one origin.

## Endpoints

- `GET /api/health`
- `POST /api/newsletter-signups`
- `POST /api/contact-submissions`
- `POST /api/articles/:slug/comments`

Every response is JSON. Invalid payloads return `422`; malformed JSON returns `400`; oversized bodies return `413`. New comments always enter `pending` moderation status.

## Persistence

By default, records are written atomically to `apps/api/data/submissions.json`. The file is runtime data and is ignored by Git.

Set `BABAS_API_DATA_PATH` to use another absolute or relative path:

```powershell
$env:BABAS_API_DATA_PATH='C:\secure-data\babas-submissions.json'
npm.cmd run dev:api
```

The store normalizes newsletter email addresses, deduplicates newsletter signups, and preserves records across process restarts.

## Current boundary

This is the first persistent backend slice, not the complete production security layer. Before public deployment, add:

- password hashing or an external identity provider for production admin credentials;
- rate limiting and stronger automated-abuse controls;
- newsletter confirmation email delivery;
- encrypted backups and deployment-managed persistent storage;
- structured request logging without message bodies or email addresses.

## Admin-only authentication

Only the administrator can sign in and edit or moderate the site. There are no contributor, author, editor, or public accounts and no registration endpoint.

```powershell
$env:BABAS_ADMIN_EMAIL='admin@example.com'
$env:BABAS_ADMIN_PASSWORD='<store-outside-git>'
npm.cmd run dev:api
```

Protected endpoints:

- `GET /api/admin/contact-submissions`
- `GET /api/admin/comments?status=pending`
- `PATCH /api/admin/contact-submissions/:id` with `new`, `read`, or `archived`
- `PATCH /api/admin/comments/:id` with `pending`, `approved`, or `rejected`

Browser login uses the login, session, and logout API routes with an HttpOnly, SameSite Strict cookie.

Bearer access is reserved for trusted server automation. Never store admin secrets in frontend code or Git.
