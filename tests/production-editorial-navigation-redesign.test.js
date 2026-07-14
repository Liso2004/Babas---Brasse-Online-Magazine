const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8").replace(/^\uFEFF/, "");
}

test("public navigation uses one accessible editorial menu and no public admin entry", () => {
  const layout = read("apps/web/src/layouts/PublicLayout.jsx");

  assert.match(layout, /aria-controls="editorial-navigation-panel"/);
  assert.match(layout, /aria-expanded=\{editorialMenuOpen\}/);
  assert.match(layout, /data-open=\{editorialMenuOpen \? "true" : "false"\}/);
  assert.match(layout, /addEventListener\("keydown"/);
  assert.match(layout, /event\.key === "Escape"/);
  assert.match(layout, /const editorialNavigation = \[[\s\S]*Theatre Reviews[\s\S]*Book Reviews[\s\S]*Essays[\s\S]*Opinion[\s\S]*\];/);
  assert.match(layout, /const peopleNavigation = \[[\s\S]*Creative Team[\s\S]*Contributors[\s\S]*\];/);
  assert.doesNotMatch(layout, /UserRound|Admin login|Admin Login|to="\/admin/);
  assert.equal((layout.match(/role="search"/g) || []).length, 1, "the header should render one global search form");
});

test("desktop navigation follows the logo links sections search editorial row", () => {
  const layout = read("apps/web/src/layouts/PublicLayout.jsx");
  const css = read("apps/web/src/styles.css");

  assert.match(layout, /className="primary-navigation-cluster"/);
  assert.match(layout, /className="primary-nav-separator" aria-hidden="true">\/\/\/<\/span>/);
  assert.match(layout, /className="primary-nav-separator primary-nav-separator--sections" aria-hidden="true">\/\/\/<\/span>/);
  assert.ok(
    layout.indexOf('className="primary-navigation-cluster"') < layout.indexOf('className="header-search"'),
    "the editorial link cluster should appear before search in the desktop row"
  );
  assert.match(css, /\.public-layout \.primary-navigation-cluster\s*\{[\s\S]*display:\s*flex/);
  assert.match(css, /\.public-layout \.final-design-navigation\s*\{[\s\S]*grid-template-columns:\s*minmax\(0,\s*1fr\)\s+minmax\(210px,\s*240px\)/);
  assert.match(css, /@media\s*\(max-width:\s*960px\)[\s\S]*\.primary-nav-separator\s*\{[\s\S]*display:\s*none/);
});

test("navigation CSS provides premium desktop panel and full-height tablet/mobile menu", () => {
  const css = read("apps/web/src/styles.css");

  assert.match(css, /\.editorial-navigation-panel\s*\{/);
  assert.match(css, /\.editorial-navigation-panel\[data-open="true"\]/);
  assert.match(css, /\.editorial-navigation-grid\s*\{/);
  assert.match(css, /@media\s*\(max-width:\s*960px\)[\s\S]*\.final-design-navigation\[data-mobile-open="true"\]/);
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.match(css, /\.public-layout nav a\[aria-current="page"\]/);
});

test("all admin surfaces are noindex nofollow and are loaded outside the public bundle", () => {
  const app = read("apps/web/src/App.jsx");
  const metadata = read("apps/web/src/seo/routeMetadata.js");
  const layout = read("apps/web/src/layouts/AdminLayout.jsx");
  const sitemap = read("apps/web/public/sitemap.xml");

  assert.match(app, /lazy\(\(\) => import\("\.\/pages\/AdminDashboardPage\.jsx"\)/);
  assert.match(app, /<Suspense/);
  assert.match(metadata, /route\?\.area === "admin"/);
  assert.match(metadata, /route\?\.id === "admin-login"/);
  assert.match(metadata, /robots:\s*"noindex,nofollow"/);
  assert.match(layout, /navigate\("\/admin", \{ replace: true \}\)/);
  assert.doesNotMatch(sitemap, /<loc>[^<]*\/admin/);
});

test("design-reference and comparison capture workflow is documented and scriptable", () => {
  const script = read("apps/web/scripts/capture-design-review.mjs");
  const design = read("DESIGN.md");

  for (const viewport of ["desktop", "tablet", "mobile"]) {
    assert.match(script, new RegExp(`id: "${viewport}"`));
  }
  assert.match(script, /docs[\s\S]*design-reference[\s\S]*cec/);
  assert.match(script, /babas-brasse[\s\S]*before|babas-brasse[\s\S]*after/);
  assert.match(script, /editorial-navigation-panel/);
  assert.match(design, /CEC-adapted editorial navigation/i);
});

test("browser navigation audit checks overflow interaction active state and public privacy", () => {
  const audit = read("apps/web/scripts/audit-navigation.mjs");

  assert.match(audit, /horizontalOverflow/);
  assert.match(audit, /navigationItemOverlap/);
  assert.match(audit, /duplicateHrefs/);
  assert.match(audit, /publicAdminLinks/);
  assert.match(audit, /adminEntry\.pathname !== "\/admin"/);
  assert.match(audit, /KeyboardEvent\("keydown", \{ key: "Escape"/);
  assert.match(audit, /currentLinks\.includes\("About"\)/);
  assert.match(audit, /navigation-audit\.json/);
});

test("direct admin entry owns login and dashboard states without changing the entry URL", () => {
  const app = read("apps/web/src/App.jsx");
  const gate = read("apps/web/src/auth/AdminGate.jsx");
  const login = read("apps/web/src/pages/AdminLoginPage.jsx");
  const adminLayout = read("apps/web/src/layouts/AdminLayout.jsx");

  assert.match(app, /route\.id === "admin-dashboard"/);
  assert.match(app, /denied=\{<AuthLayout/);
  assert.match(gate, /export function AdminGate\(\{ children, denied = null \}\)/);
  assert.match(gate, /babas-admin-session-changed/);
  assert.match(login, /dispatchEvent\(new Event\("babas-admin-session-changed"\)\)/);
  assert.match(adminLayout, /dispatchEvent\(new Event\("babas-admin-session-changed"\)\)/);
  assert.match(adminLayout, /navigate\("\/admin", \{ replace: true \}\)/);
});

test("mobile production header keeps the menu below the compact brand", () => {
  const css = read("apps/web/src/production-editorial.css");

  assert.match(css, /@media\s*\(max-width:\s*960px\)[\s\S]*\.header-topline \.brand-mark\s*\{[\s\S]*width:\s*112px;[\s\S]*height:\s*52px;/);
  assert.match(css, /@media\s*\(max-width:\s*960px\)[\s\S]*\.header-topline \.brand-logo\s*\{[\s\S]*width:\s*52px;[\s\S]*height:\s*52px;/);
});
