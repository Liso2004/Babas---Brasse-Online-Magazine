# Production Handoff

This document is the acceptance record for transferring Baba's Brasse to its production owner. Do not place passwords, tokens, connection strings, or recovery codes in this file.

## Release Acceptance

- [ ] `npm ci` succeeds at the repository root.
- [ ] `npm ci --prefix apps/web` succeeds.
- [ ] `npm run verify:production` passes.
- [ ] GitHub Actions `Verify handoff` passes, including dependency audit.
- [ ] `npm run db:check` passes against a non-production Neon branch.
- [ ] The database acceptance procedure in `OPERATIONS.md` passes on that branch.
- [ ] Keyboard and responsive navigation QA passes with `npm run qa:navigation`.
- [ ] Final production screenshots have been approved by the editorial owner.
- [ ] Placeholder assets listed in `ASSET_REGISTER.md` have been replaced or explicitly approved.

## Ownership Transfer

Record names in the private organizational handoff system, not in the public repository.

| Responsibility | Required owner | Confirmed |
| --- | --- | --- |
| Source repository and branch protection | Engineering owner | [ ] |
| Hosting service and deployment credentials | Platform owner | [ ] |
| Production domain, DNS, and TLS renewal | Domain owner | [ ] |
| Neon organization, project, production branch, and billing | Database owner | [ ] |
| Runtime secrets and rotation schedule | Security owner | [ ] |
| Uptime, application logs, and database alerts | On-call owner | [ ] |
| Editorial publishing and moderation | Editorial owner | [ ] |
| Privacy requests and retention decisions | Data owner | [ ] |
| Photography, artwork, copy, and font rights | Rights owner | [ ] |

## Launch-Day Evidence

Attach or link the following in the private handoff ticket:

- Commit SHA and container image digest
- Production deployment URL
- CI run
- Database branch used for acceptance testing
- Migration and health-check output with secrets redacted
- Rollback test result
- Final visual/accessibility approval
- Named owners from the table above

The software handoff is complete only when every acceptance and ownership item is checked.
