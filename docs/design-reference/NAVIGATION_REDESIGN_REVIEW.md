# Production Navigation Redesign Review

Date: July 13, 2026  
Status: Implemented and browser-audited  
Reference: [Connect Everything Collective](https://ceconline.co.za/)

## Adapted Principles

The redesign uses CEC as a structural reference only. Babas & Brasse keeps its own logo, warm paper palette, deep green, editorial red, Sabon-first type direction, route names, content, and imagery.

Adapted ideas:

- A strong publication mark before utility controls.
- Fewer top-level choices with a clear editorial index.
- Generous spacing and rule-led hierarchy instead of a filled active-navigation pill.
- A wide desktop menu that makes categories and people easy to scan.
- One search control shared across responsive layouts.
- A full-height tablet/mobile navigation surface with large tap targets.
- Restrained hover and open-state motion with a reduced-motion fallback.

Not copied:

- CEC branding, yellow-and-black palette, written content, imagery, typography, or exact page composition.
- CEC category names or information architecture.
- CEC's exact dropdown dimensions, footer, hero, or card layouts.

## Navigation Contract

- Primary: Home, About, Visceral Mag, Featured / Media, Contact.
- Sections panel: Theatre Reviews, Book Reviews, Essays, Opinion, Creative Team, Contributors.
- Category shortcuts continue to use the canonical `/search` query route.
- There is no public Admin, Admin Login, Dashboard, CMS, or related link.
- `/admin` remains the intended manually entered administration path.
- Admin and auth surfaces use `noindex,nofollow` and are emitted as separate Vite chunks.

## Captures

CEC reference captures:

- `docs/design-reference/cec/home-desktop.png` at 1440 x 900.
- `docs/design-reference/cec/home-tablet.png` at 768 x 1024.
- `docs/design-reference/cec/home-mobile.png` at 390 x 844.
- `docs/design-reference/cec/navigation-expanded-desktop.png` with the Media hover state forced through Chrome DevTools Protocol.

Babas & Brasse comparison captures:

- Before: `docs/design-reference/babas-brasse/before/` for Home, Visceral Mag, Featured, and Contact at desktop/mobile.
- After: `docs/design-reference/babas-brasse/after/` for the same routes at desktop/tablet/mobile.
- Open states: `home-sections-desktop.png` and `home-navigation-mobile.png`.

## Browser Evidence

`npm run qa:navigation` audits the live React UI at 1440 x 900, 768 x 1024, and 390 x 844. The generated evidence is `docs/design-reference/babas-brasse/navigation-audit.json`.

Passing assertions:

- No horizontal overflow.
- No overlap among visible top-level header or navigation items.
- Exactly one header search form.
- No public admin links.
- No duplicated routes within navigation lists.
- The editorial panel opens and exposes six links.
- Escape closes the editorial panel and mobile menu.
- The active-page indicator resolves correctly on About.

## Commands

```powershell
npm run test:editorial-navigation
npm run qa:design-review
npm run qa:navigation
npm --prefix apps/web run build
```
