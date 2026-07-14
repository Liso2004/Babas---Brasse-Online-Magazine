# Babas & Brasse Public API

This Node service runs the production API, serves the built React application, and persists the publication through PostgreSQL.

## Run locally

From the repository root:

```powershell
npm.cmd run start:production
npm.cmd --prefix apps/web run dev
```

The API listens on `http://127.0.0.1:8787`. Vite proxies browser requests from `/api` to that service, keeping the frontend on one origin.


## Production web runtime

Run the production stack from the repository root:

```powershell
npm.cmd run build:production
npm.cmd run start:production
```

The Node runtime serves the built React application and API on one origin. Public client routes use the Vite `index.html` fallback, missing `/api/*` routes remain JSON 404 responses, fingerprinted assets receive immutable one-year caching, and HTML is revalidated.

Set `BABAS_WEB_DIST_PATH` only when the Vite output is deployed outside `apps/web/dist`. Production startup fails closed when the build entry is missing.

## Abuse controls and security events

Admin login and all public submission routes have separate fixed-window client budgets. A rejected request returns `429`, `Retry-After`, and `RateLimit-*` headers. Defaults are five login attempts and twenty public submissions per fifteen minutes.

Set `BABAS_TRUST_PROXY=1` only behind a trusted reverse proxy that replaces `X-Forwarded-For`. Leaving it at `0` uses the direct socket address.

Production security events are written to stdout as newline-delimited JSON for the deployment log collector. Records include timestamp, request ID, method, route, event, and status. Submitted email addresses, passwords, contact messages, comments, reviews, tokens, and raw client addresses are never logged.

## Endpoints

- `GET /api/health`
- `POST /api/newsletter-signups`
- `POST /api/contact-submissions`
- `POST /api/articles/:slug/comments`
- `POST /api/articles/:slug/reviews`
- `GET /api/content` for published editorial content

Every response is JSON. Invalid payloads return `422`; malformed JSON returns `400`; oversized bodies return `413`. New comments always enter `pending` moderation status.

## Persistence

Production requires `DATABASE_URL` and uses PostgreSQL through `pg`. `npm.cmd run db:migrate` creates the singleton `publication_state` table and seeds it from `apps/api/data/editorial-seed.json` only when the database is empty.

Every production mutation runs inside a transaction, locks the publication row with `SELECT ... FOR UPDATE`, writes JSONB atomically, and rolls back on failure. This preserves the validated domain model and API while moving durable state out of the application filesystem.

Local development and automated tests keep the atomic JSON adapter at `apps/api/data/submissions.json`. `BABAS_API_DATA_PATH` may override that local-only path. Production ignores the JSON path and fails closed without PostgreSQL.

## Production release boundary

The API is in production release-candidate hardening. Before public deployment, complete:

- provision the managed PostgreSQL service and run the migration on staging;
- prove encrypted backup, restore, retention, and recovery;
- complete newsletter confirmation and contact email delivery;
- complete object storage and validated binary media uploads.

## Admin-only authentication

Only the administrator can sign in and edit or moderate the site. There is no registration endpoint. Production requires a scrypt hash and rejects BABAS_ADMIN_PASSWORD.

```powershell
$env:BABAS_ADMIN_EMAIL='admin@example.com'
$env:BABAS_ADMIN_PASSWORD_INPUT='<use-a-long-unique-password>'
$env:BABAS_ADMIN_PASSWORD_HASH=(node apps/api/hashPassword.js)
Remove-Item Env:BABAS_ADMIN_PASSWORD_INPUT
$env:DATABASE_URL='<from-the-deployment-secret-manager>'
$env:NODE_ENV='production'
$env:HOST='0.0.0.0'
npm.cmd run start:production
```

Protected endpoints:

- `GET /api/admin/contact-submissions`
- `GET /api/admin/comments?status=pending`
- `PATCH /api/admin/contact-submissions/:id` with `new`, `read`, or `archived`
- `PATCH /api/admin/comments/:id` with `pending`, `approved`, or `rejected`

Browser login uses the login, session, and logout API routes with an HttpOnly, SameSite Strict cookie.

Bearer access is reserved for trusted server automation. Never store admin secrets in frontend code or Git.

## Editorial persistence endpoints

Public: GET /api/content and POST /api/articles/:slug/reviews.

Admin only: GET /api/admin/editorial, GET/PATCH /api/admin/reviews, POST/PATCH /api/admin/articles, PUT /api/admin/profiles/:id, and POST/PUT /api/admin/media.
