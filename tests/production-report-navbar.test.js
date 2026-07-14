const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8").replace(/^\uFEFF/, "");
}

test("report-aligned navbar puts publication pages in primary navigation", () => {
  const layout = read("apps/web/src/layouts/PublicLayout.jsx");

  assert.match(layout, /const primaryNavigation = \[/);
  for (const item of [
    '{ label: "Home", href: "/" }',
    '{ label: "About", href: "/about" }',
    '{ label: "Visceral Mag", href: "/visceral-mag" }',
    '{ label: "Featured / Media", href: "/featured" }',
    '{ label: "Contact", href: "/contact" }'
  ]) {
    assert.ok(layout.includes(item), `missing primary item: ${item}`);
  }

  assert.match(layout, /className="primary-public-navigation"/);
  assert.match(layout, /primaryNavigation\.map/);
});

test("category shortcuts live in one Sections panel without duplicate routes", () => {
  const layout = read("apps/web/src/layouts/PublicLayout.jsx");
  const routes = read("apps/web/src/routes.js");

  assert.match(layout, /const editorialNavigation = \[/);
  assert.match(layout, /aria-controls="editorial-navigation-panel"/);
  assert.match(layout, /aria-label="Editorial sections"/);
  assert.match(layout, /editorialNavigation\.map/);
  assert.match(layout, /href: "\/search\?category=reviews&topic=theatre"/);
  assert.match(layout, /href: "\/search\?category=reviews&topic=books"/);
  assert.match(layout, /href: "\/search\?category=essays"/);
  assert.match(layout, /href: "\/search\?category=essays&topic=opinion"/);
  assert.doesNotMatch(routes, /path: "\/(theatre|books|essays|opinion)"/);
});

test("people pages live in the editorial panel and responsive layout is explicit", () => {
  const layout = read("apps/web/src/layouts/PublicLayout.jsx");
  const css = read("apps/web/src/styles.css");

  assert.match(layout, /const peopleNavigation = \[[\s\S]*Creative Team[\s\S]*Contributors[\s\S]*\];/);
  assert.doesNotMatch(layout, /const peopleNavigation = \[[\s\S]*Visceral Mag[\s\S]*\];/);
  assert.match(css, /\.editorial-navigation-grid\s*\{[^}]*grid-template-columns:/is);
  assert.match(css, /@media\s*\(max-width:\s*960px\)[\s\S]*\.final-design-navigation\[data-mobile-open="true"\]/is);
});

test("navbar realignment is recorded in the production docs", () => {
  const design = read("DESIGN.md");
  const log = read("docs/TESTING_LOG.md");

  assert.match(design, /Primary navigation contains Home, About, Visceral Mag, Featured\/Media, and Contact/i);
  assert.match(log, /Report-Aligned Publication Navbar/i);
});
