# Baba's Brasse Web App

`apps/web` is the React/Vite frontend for the Baba's Brasse online magazine. It contains the public magazine pages, admin UI pages, route models, SEO metadata, styling, and browser QA scripts.

The app is designed to run with the API on the same origin. During local development, Vite proxies `/api` requests to the Node server at `http://127.0.0.1:8787`.

## Local Development

From the repository root, install dependencies once:

```powershell
npm.cmd install
npm.cmd --prefix apps/web install
```

Start the API when testing live content, admin pages, or form submissions:

```powershell
npm.cmd run dev:api
```

Start the frontend:

```powershell
npm.cmd run dev:web
```

The Vite app runs at `http://127.0.0.1:5173`.

## Build

From the repository root:

```powershell
npm.cmd run build:production
```

Or from `apps/web`:

```powershell
npm.cmd run build
```

The build output is `apps/web/dist`.

## Preview

After building:

```powershell
npm.cmd --prefix apps/web run preview
```

The preview server runs at `http://127.0.0.1:4174`.

## Environment Variables

No `VITE_*` frontend runtime variables are currently required.

Frontend tooling can use:

- `WEB_BASE_URL` - target URL for route smoke and screenshot QA scripts; defaults to `http://127.0.0.1:5173`.
- `CHROME_BIN` - optional Chrome/Chromium executable path for screenshot and navigation QA scripts.

API and production variables are documented in the root `README.md` and `apps/api/README.md`.

## Routes And Pages

Public routes are defined in `src/routes.js`:

- `/` - homepage with featured content, categories, media, profiles, and newsletter prompts.
- `/about` - magazine mission, editorial pillars, structure, and submission links.
- `/content` - temporary content directory that groups published articles by magazine section.
- `/photography` - photography/media gallery.
- `/featured` - alternate media gallery route.
- `/visceral-mag` - article archive.
- `/visceral-mag/:slug` - article detail page with approved comments/reviews and public response forms.
- `/people/:slug` - profile detail page for contributors or creative-team members.
- `/creative-team` - creative team listing.
- `/contributors` - contributor listing and search/filter surface.
- `/search` - category and keyword search.
- `/media/:mediaId` - media detail route.
- `/contact` - public contact and submission form.

Admin/support routes include:

- `/admin/login` - admin sign-in.
- `/admin` - admin dashboard.
- `/admin/articles` - article management.
- `/admin/profiles-media` - profile and media metadata management.
- `/admin/moderation` - comment and review moderation.
- `/admin/contact-submissions` - contact inbox review.
- `/admin/media/upload` - media upload workflow support.
- `/admin/articles/editor-workflow` - article editor workflow support.
- `/admin/password-reset`, `/404`, `/500`, `/offline` - support states.

Admin routes use `AdminGate` and require a valid same-origin API session cookie.

## Data Flow

`src/App.jsx` requests `GET /api/content` on startup. If the API is unavailable, the UI falls back to `src/data/launchFixtures.js` so public route development remains possible.

Public form submissions use `src/forms/publicFormClient.js`:

- contact form -> `POST /api/contact-submissions`;
- article comments -> `POST /api/articles/:slug/comments`;
- article reviews -> `POST /api/articles/:slug/reviews`.

The frontend expects JSON API responses. If the API is not running, form submissions show a retryable error instead of treating the Vite SPA fallback as success.

## Deployment Assumptions

The current production path is a single Node deployment:

1. Build the frontend into `apps/web/dist`.
2. Start `node apps/api/server.js` through `npm.cmd run start:production`.
3. Let the API serve both `/api/*` and the built React app.

Static-only deployment is possible for public preview pages, but contact forms, comments/reviews, admin login, admin queues, and live editorial persistence require the API.

## Checks

From the repository root:

```powershell
npm.cmd test
npm.cmd run smoke:web:routes
npm.cmd run test:public-form-interactions
```

From `apps/web`:

```powershell
npm.cmd run build
npm.cmd run smoke:routes
```
