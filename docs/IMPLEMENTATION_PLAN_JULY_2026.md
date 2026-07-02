# Babas & Brasse MVP Implementation Plan

Date: June 30, 2026
Launch deadline: July 31, 2026
Current design source: local tested wireframes in `wireframes/index.html`

## 1. Final Open Design Test Result

Open Design was tested one more time before creating this plan.

Commands/actions checked:

- Open Design MCP tools loaded through Codex tool discovery.
- `get_active_context` was called.
- `list_projects` was called.
- `codex mcp list` was run.
- Local Open Design processes were checked.

Result:

- `get_active_context`: `fetch failed`
- `list_projects`: `fetch failed`
- `codex mcp list`: `open-design` is enabled and registered.
- Open Design app processes are running locally.

Conclusion:

Open Design is registered in Codex and the app is running, but the MCP daemon endpoint is still unreachable. This does not block local design/build work. Continue with the local tested wireframe artifact as the source of truth until Open Design reconnects.

Recovery decision:

- Another Codex reload is not needed to expose the Open Design tools; they are already exposed.
- A clean Open Design app restart, followed by a Codex reload, is likely needed to restore daemon reachability.
- Once `get_active_context` or `list_projects` stops returning `fetch failed`, create or sync the Open Design project `Babas & Brasse Online Magazine MVP`.

## 2. Current Baseline

Completed:

- PDF brief decoded and summarized.
- Compressed MVP scope created for July 31, 2026.
- MVP screen scope documented.
- TDD workflow documented.
- Wireframe spec created in `wireframes/wireframe-spec.json`.
- Low-fidelity wireframes created in `wireframes/index.html`.
- Wireframe tests created in `tests/wireframes.test.js`.
- Current verification: 5 tests pass.

Current source files:

- `Babas_and_Brasse_Compressed_MVP_Design_Plan.md`
- `docs/TDD_WORKFLOW.md`
- `docs/WIREFRAME_PLAN.md`
- `docs/SCREEN_SCOPE.md`
- `docs/OPEN_DESIGN_STATUS.md`
- `docs/PLAN_STATUS.md`
- `docs/TESTING_LOG.md`
- `wireframes/index.html`
- `wireframes/styles.css`
- `wireframes/wireframe-spec.json`
- `wireframes/README.md`
- `tests/wireframes.test.js`

## 3. MVP Delivery Rule

Every implementation slice must follow this order:

1. Update the relevant plan/scope doc if the behavior changes.
2. Write a failing test for the next screen, component, model, or workflow.
3. Implement the smallest useful change.
4. Run the test.
5. Record the result in `docs/TESTING_LOG.md`.
6. Only then refine styling or structure.

No feature is considered started unless it has a test target. No feature is considered complete unless its test is green and the docs are updated.

## 4. Technical Direction

Recommended stack from the brief:

- Next.js + TypeScript for the frontend and server-rendered editorial pages.
- Tailwind CSS for implementation styling after the visual direction is approved.
- Supabase/PostgreSQL for auth, content, moderation, and contact submissions.
- Supabase Storage or Cloudinary for media.
- TipTap or similar editor for admin article writing.
- React Hook Form + Zod for forms and validation.
- Turnstile or reCAPTCHA for public form protection.
- Resend, SendGrid, or SMTP for contact email delivery.

Compressed MVP decision:

Start with the frontend routes and local fixture data before wiring Supabase. This lets public UX, admin UX, and TDD coverage progress while external accounts/assets are still being confirmed.

## 5. Phase Plan

### Phase 0: Project Foundation

Target: immediately.

TDD targets:

- Test that required route/page files exist.
- Test that shared fixture data validates against expected content fields.
- Test that public/admin navigation includes the required routes.

Deliverables:

- App scaffold.
- Route map.
- Shared layout shell.
- Fixture content for articles, categories, profiles, media, comments, reviews, and submissions.
- Updated testing log.

Exit criteria:

- Route scaffold tests pass.
- The app can run locally.
- Home and admin shell have stable placeholders based on the wireframes.

### Phase 1: Public Editorial Shell

TDD targets:

- Home renders lead story, latest articles, categories, media preview, and people preview.
- Public nav links to Home, About, Creative Team, Contributors, Visceral Mag, Featured/Media, and Contact.
- Responsive shell has mobile navigation state coverage.

Deliverables:

- Public layout.
- Home page.
- About page shell.
- Shared article card, profile card, media card, and category chip components.

Exit criteria:

- Public shell tests pass.
- Wireframe intent is preserved.
- No required public route is missing.

### Phase 2: Article Discovery And Reading

TDD targets:

- Visceral Mag lists articles from fixtures.
- Article detail renders title, dek, author, date, category, featured image, body, related articles, comments/reviews placeholders, and SEO fields.
- Category filtering returns matching articles.
- Search returns matching articles and an empty state.

Deliverables:

- Visceral Mag listing.
- Article detail page.
- Categories/search page.
- Related articles logic.
- Sample article fixture: `Send A Text Before You Knock`.

Exit criteria:

- Article route tests pass.
- Search/category tests pass.
- Empty state tests pass.

### Phase 3: People And Media

TDD targets:

- Creative Team renders team profiles.
- Contributors renders contributor profiles and published works.
- Featured/Media renders media items with captions, credits, and alt text.
- Article pages link to author/contributor profiles.

Deliverables:

- Creative Team page.
- Contributors page.
- Profile detail pattern if content is ready.
- Featured/Media page.
- Media fixture model.

Exit criteria:

- Profile and media tests pass.
- Every media item has alt text.
- Contributor/article linking works.

### Phase 4: Admin Dashboard And Publishing Workflow

TDD targets:

- Admin routes are separate from public routes.
- Dashboard shows published count, draft count, pending moderation, contact submissions, and recent activity.
- Article management supports draft/published state in data tests.
- Article editor model includes SEO title, meta description, Open Graph title/description, slug, featured image, and alt text.

Deliverables:

- Admin dashboard shell.
- Article management table.
- Article editor form shell.
- Draft/publish workflow in local state or mocked service.

Exit criteria:

- Admin dashboard tests pass.
- Article management tests pass.
- Draft/publish state is represented and protected from accidental public display.

### Phase 5: Profile, Media, Moderation, And Contact Admin

TDD targets:

- Profile/media management can list contributors, team members, and media items.
- Moderation queue separates pending, approved, and rejected comments/reviews.
- Public article pages only display approved comments/reviews.
- Contact submissions support new, read, and archived states.

Deliverables:

- Profile/media management screen.
- Comments/reviews moderation screen.
- Contact submissions screen.
- Contact form validation states.

Exit criteria:

- Moderation tests pass.
- Contact tests pass.
- Hidden-until-approved rule is proven by tests.

### Phase 6: Supabase And Storage Integration

TDD targets:

- Data access functions are covered by unit tests with mocked Supabase responses.
- Auth guard denies admin access when no admin session exists.
- Media metadata requires alt text.
- Contact submission service validates required fields before send/store.

Deliverables:

- Supabase schema draft.
- Auth guard.
- Data access layer.
- Storage adapter.
- Contact submission adapter.

Exit criteria:

- Mocked integration tests pass.
- No secrets are committed.
- Environment variable names are documented without exposing values.

### Phase 7: SEO, QA, And Launch Readiness

TDD targets:

- Public pages expose title and description metadata.
- Article pages expose Open Graph fields.
- Sitemap includes public routes and published articles.
- Draft articles are excluded from sitemap and public listing.
- Core responsive smoke checks are documented.

Deliverables:

- SEO metadata.
- Sitemap/robots setup.
- Image optimization pass.
- Accessibility pass.
- Launch checklist.
- Handover notes.

Exit criteria:

- SEO tests pass.
- Launch checklist is complete.
- Production deploy has SSL, domain, contact delivery, and admin access verified.

## 6. Open Design Sync Plan

When Open Design reconnects:

1. Run `list_projects`.
2. If no matching project exists, create `Babas & Brasse Online Magazine MVP`.
3. Start a design run using the prompt in `Babas_and_Brasse_Compressed_MVP_Design_Plan.md`.
4. Pull the generated artifact with `get_artifact`.
5. Compare it against `wireframes/wireframe-spec.json`.
6. Keep any visual upgrades that preserve the tested route/screen contract.
7. Update `docs/OPEN_DESIGN_STATUS.md` and `docs/TESTING_LOG.md`.

Open Design must not replace the tested scope contract. It should refine visual direction and interaction details while preserving the MVP route, screen, and workflow requirements.

## 7. Immediate Next Work Order

Next implementation session should do this exact sequence:

1. Create a frontend scaffold plan and choose whether to install Next.js dependencies now.
2. Write route scaffold tests first.
3. Implement the app shell and route placeholders.
4. Run tests and record results.
5. Build Home page test first, then implementation.
6. Build Visceral Mag listing test first, then implementation.
7. Build Article Detail test first, then implementation.

## 8. Launch-Critical Risks

- Open Design MCP daemon still unreachable.
- Brand assets and opening banner still need confirmation.
- About copy, profile bios, social links, and launch articles need final content.
- Domain/DNS, hosting, SSL, and email provider need confirmation.
- Admin auth/storage decisions should be locked before dashboard build-out.
- July 31 deadline requires avoiding post-launch features until MVP is live.

## 9. Deferred Until After MVP Launch

- Newsletter campaigns.
- Public user accounts.
- Subscriptions or paid content.
- Likes, bookmarks, and personalized reader features.
- Advanced analytics dashboard.
- Large multimedia expansion.
- Mobile app.
