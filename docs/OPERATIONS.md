# Operations Runbook

## Runtime

Use Node.js 22 LTS. The deployment is one Node service serving the API and the built Vite application on the same origin. A multi-stage `Dockerfile` provides the portable production artifact.

Required secrets and configuration are listed in `.env.production.example`. Store them in the hosting provider's secret manager. Never commit `.env`.

## Deploy

1. Run `npm ci` and `npm ci --prefix apps/web`.
2. Run `npm run verify:production`.
3. Build and publish the container from the accepted commit.
4. Run `npm run db:migrate` once using the production `DATABASE_URL`.
5. Deploy the immutable image with `HOST=0.0.0.0`.
6. Confirm `GET /api/health` returns `status: ok` and `storage: postgresql`.
7. Confirm a public page, admin login, one reversible editorial update, and logout.

Only saved, immutable images should be promoted. Do not rebuild an older commit during rollback.

## Database Acceptance On A Neon Development Branch

Do not run destructive acceptance tests against production.

1. Point `DATABASE_URL` to an isolated Neon development branch.
2. Run `npm run db:migrate` and `npm run db:check`.
3. Start the production server with production-equivalent SSL settings.
4. Log in and create a draft article.
5. Restart the service and confirm the draft remains.
6. Delete the draft, restart again, and confirm it remains deleted.
7. Make two near-simultaneous editorial updates and confirm neither corrupts the JSON state.
8. Create a temporary Neon recovery branch from a known point and confirm the publication row can be read.
9. Delete the temporary test branch after evidence has been retained.

## Rollback

1. Keep the previous application image digest.
2. If no incompatible database migration was applied, redeploy the previous image.
3. If data restoration is required, create a Neon branch from the required point in history, validate it, then follow the organization's controlled branch/promotion procedure.
4. Confirm `/api/health`, public content, admin login, and the most recent expected editorial record.
5. Record the incident, chosen recovery point, and validation evidence.

The current migration is additive (`CREATE TABLE IF NOT EXISTS`). Never improvise destructive SQL during rollback.

## Password Recovery

There is intentionally no public reset endpoint.

1. Verify the administrator's identity through the private organizational process.
2. Generate a new hash with `npm run hash:admin-password` as documented in the root README.
3. Replace `BABAS_ADMIN_PASSWORD_HASH` in the secret manager.
4. Redeploy the service. Existing in-memory sessions are invalidated by the restart.
5. Confirm login and record the rotation without recording the password.

## Shutdown And Monitoring

The server handles `SIGTERM` and `SIGINT`, stops accepting connections, and closes the owned PostgreSQL pool.

Configure:

- HTTP uptime monitoring for `/api/health`
- Alerts for repeated 5xx responses and process restarts
- Database connection, storage, and compute alerts in Neon
- Log retention appropriate for security events
- A deployment timeout long enough for graceful shutdown

Security logs intentionally omit raw addresses, passwords, tokens, emails, and submission text.
