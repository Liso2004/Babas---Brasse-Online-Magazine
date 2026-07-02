# Wireframe Annotated

Static Open Design wireframes for the Babas & Brasse online magazine MVP, including public routes, admin routes, and support screens.

This is not a React application. The files are reviewable HTML wireframes with shared CSS and annotation interactions.

## Preview

Open `mvp-wireframes.html` for the route overview, or open any individual HTML file directly in a browser.

Recommended local preview from this folder:

```powershell
python -m http.server 4173
```

Then visit:

```text
http://localhost:4173/mvp-wireframes.html
```

## Verify

```powershell
npm.cmd test
```

The verification script checks route coverage, shared assets, annotation pins/spec rows, route overview links, artifact metadata, and the final critique score.

## Files To Review First

1. `DESIGN.md`
2. `mvp-wireframes.html`
3. `index.html`
4. `wireframe-system.css`
5. `wireframe-system.js`
6. `critique.json`

## Status

Final wireframe handoff: complete. Current coverage is 23 screens: 9 public routes, 5 admin routes, and 8 support screens.

