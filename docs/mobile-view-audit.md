# Mobile View Audit

Use this checklist before the final Baba's Brasse handoff whenever navigation, public-page layout, or content cards change.

## Viewports

Test at 375x812, 390x844, 430x844, 768x1024, 1024x900, 1280x900, and 1440x900.

## Navigation Flow

1. Open the public menu at widths up to 960px.
2. Confirm Home, About, Content, Photography, and Contact Us are visible without horizontal scrolling.
3. Open Home sections using the chevron button.
4. Confirm Theater, Essays, Short Stories, Literature, Interviews, and Opinion Pieces are visible and have comfortable tap targets.
5. Open Articles and confirm Fashion, Music, and Art are visible without covering or clipping other links.
6. Select a category and confirm the menu closes after navigation.
7. Reopen the menus and press Escape; the Home dropdown, Articles dropdown, and mobile navigation must all close.
8. Confirm focus outlines remain visible when navigating with Tab and Enter.

## Content Page

1. Open `/content` at every viewport.
2. Confirm the hero title does not clip or overlap the decorative INDEX word.
3. Confirm category cards render in three columns on desktop, two on tablet, and one on mobile.
4. Confirm card numbering, titles, recent-story links, and Browse actions remain readable.
5. Confirm no horizontal scrolling appears and hard shadows remain inside the viewport.
6. Open category links and confirm the search page receives the expected category query.

## Automated Checks

Start the frontend in one terminal:

```powershell
npm.cmd run dev:web
```

Run the navigation audit in another terminal:

```powershell
npm.cmd run qa:navigation
```

Run the compile and unit checks before handoff:

```powershell
npm.cmd --prefix apps/web test
npm.cmd --prefix apps/web run build
```

The navigation audit writes its results to `docs/design-reference/babas-brasse/navigation-audit.json`.

## Full Route Matrix

Audit these public routes at 375px, 390px, 430px, and 768px widths:

- `/`
- `/about`
- `/content`
- `/creative-team`
- `/contributors`
- `/people/visceral-contributor`
- `/visceral-mag`
- `/visceral-mag/send-a-text-before-you-knock`
- `/search`
- `/photography`
- `/featured`
- `/contact`
- `/404`
- `/500`
- `/offline`

Audit these private/support routes while signed out and signed in where applicable:

- `/admin/login`
- `/admin`
- `/admin/articles`
- `/admin/profiles-media`
- `/admin/moderation`
- `/admin/contact-submissions`

For every route confirm:

1. The document has no unintended horizontal scrolling.
2. Page headings wrap without clipping.
3. Images, cards, forms, and panels stay inside the viewport.
4. Inputs use at least 16px text and do not trigger iOS zoom.
5. Primary controls have at least 44px touch height.
6. Multi-column layouts collapse in a readable order.
7. Admin data tables scroll inside their own panel instead of widening the page.
8. Sticky or fixed navigation does not cover the first interactive element.
