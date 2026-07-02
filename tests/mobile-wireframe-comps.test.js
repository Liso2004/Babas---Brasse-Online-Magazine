const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

function filePath(relativePath) {
  return path.join(root, relativePath);
}

function read(relativePath) {
  return fs.readFileSync(filePath(relativePath), "utf8").replace(/^\uFEFF/, "");
}

function load(relativePath) {
  delete require.cache[require.resolve(filePath(relativePath))];
  return require(filePath(relativePath));
}

test("Phase 5 Mobile Wireframe Comps plan documents responsive handoff", () => {
  const plan = read("docs/PHASE5_MOBILE_WIREFRAME_COMPS_PLAN.md");

  assert.match(plan, /Mobile Wireframe Comps/i);
  assert.match(plan, /compressed B&B mark/i);
  assert.match(plan, /menu\/search behavior/i);
  assert.match(plan, /Home, Article, Search, and Contact/i);
  assert.match(plan, /Dashboard, Editor, Moderate, and Inbox/i);
  assert.match(plan, /360, 390, 430, and tablet/i);
  assert.match(plan, /touch targets/i);
  assert.match(plan, /no text overlap/i);
  assert.match(plan, /visible focus/i);
  assert.match(plan, /Playwright viewport checks/i);
});

test("mobile wireframe renderer exports mobile comps and route metadata", () => {
  const {
    getMobileWireframeRoute,
    getMobilePublicComps,
    getMobileAdminComps,
    getMobileBreakpoints,
    getMobileA11yChecks,
    renderMobileWireframeCompsPage
  } = load("src/render/mobile-wireframe-comps.js");
  const html = renderMobileWireframeCompsPage();
  const route = getMobileWireframeRoute();

  assert.deepEqual(route, {
    id: "mobile-wireframe-comps",
    path: "/mobile-wireframes",
    file: "src/pages/mobile-wireframes.html",
    wireframe: "mobile-wireframes.html"
  });
  assert.equal(typeof getMobilePublicComps, "function");
  assert.equal(typeof getMobileAdminComps, "function");
  assert.equal(typeof getMobileBreakpoints, "function");
  assert.equal(typeof getMobileA11yChecks, "function");
  assert.match(html, /data-page="mobile-wireframe-comps"/);
  assert.match(html, /data-route="\/mobile-wireframes"/);
  assert.match(html, /data-area="support"/);
  assert.match(html, /data-generated="mobile-wireframe-comps-renderer"/);
  assert.match(html, /data-wireframe-source="mobile-wireframes.html"/);
});

test("mobile public comps cover required reader-facing screens and stacking rules", () => {
  const { getMobilePublicComps, renderMobileWireframeCompsPage } = load("src/render/mobile-wireframe-comps.js");
  const comps = getMobilePublicComps();
  const html = renderMobileWireframeCompsPage();

  assert.deepEqual(comps.map((comp) => comp.id), ["home", "article", "search", "contact"]);
  assert.match(html, /data-section="mobile-public-comps"/);
  assert.match(html, /data-mobile-comp="home"/);
  assert.match(html, /data-mobile-comp="article"/);
  assert.match(html, /data-mobile-comp="search"/);
  assert.match(html, /data-mobile-comp="contact"/);
  assert.match(html, /data-stack-order="hero-rail-teasers-newsletter"/);
  assert.match(html, /data-stack-order="metadata-title-body-related-comments"/);
  assert.match(html, /data-stack-order="search-field-filter-chips-results"/);
  assert.match(html, /data-stack-order="intro-form-validation-footer"/);
});

test("mobile admin comps cover required tools with local actions", () => {
  const { getMobileAdminComps, renderMobileWireframeCompsPage } = load("src/render/mobile-wireframe-comps.js");
  const comps = getMobileAdminComps();
  const html = renderMobileWireframeCompsPage();

  assert.deepEqual(comps.map((comp) => comp.id), ["dashboard", "editor", "moderate", "inbox"]);
  assert.match(html, /data-section="mobile-admin-comps"/);
  assert.match(html, /data-mobile-comp="dashboard"/);
  assert.match(html, /data-mobile-comp="editor"/);
  assert.match(html, /data-mobile-comp="moderate"/);
  assert.match(html, /data-mobile-comp="inbox"/);
  assert.match(html, /data-mobile-admin-rule="stacked-panels"/);
  assert.match(html, /data-mobile-admin-rule="actions-near-record"/);
  assert.match(html, /data-mobile-admin-rule="simplified-tables"/);
});

test("mobile breakpoint and navigation handoff are explicit", () => {
  const { getMobileBreakpoints, renderMobileWireframeCompsPage } = load("src/render/mobile-wireframe-comps.js");
  const breakpoints = getMobileBreakpoints();
  const html = renderMobileWireframeCompsPage();

  assert.deepEqual(breakpoints.map((breakpoint) => breakpoint.width), [360, 390, 430, 768]);
  assert.match(html, /data-section="mobile-nav"/);
  assert.match(html, /data-nav-behavior="compressed-mark-menu-search"/);
  assert.match(html, /data-breakpoint="360"/);
  assert.match(html, /data-breakpoint="390"/);
  assert.match(html, /data-breakpoint="430"/);
  assert.match(html, /data-breakpoint="768"/);
  assert.match(html, /data-layout-rule="one-column-public"/);
  assert.match(html, /data-layout-rule="admin-card-rows"/);
});

test("mobile accessibility handoff covers touch focus overlap and stable controls", () => {
  const { getMobileA11yChecks, renderMobileWireframeCompsPage } = load("src/render/mobile-wireframe-comps.js");
  const checks = getMobileA11yChecks();
  const html = renderMobileWireframeCompsPage();

  assert.deepEqual(checks.map((check) => check.id), ["touch-targets", "no-overlap", "visible-focus", "readable-type", "stable-controls"]);
  assert.match(html, /data-section="mobile-a11y"/);
  assert.match(html, /data-a11y-check="touch-targets"/);
  assert.match(html, /data-min-touch-target="44"/);
  assert.match(html, /data-a11y-check="no-overlap"/);
  assert.match(html, /data-a11y-check="visible-focus"/);
  assert.match(html, /data-a11y-check="readable-type"/);
  assert.match(html, /data-a11y-check="stable-controls"/);
});

test("mobile wireframe comps artifact is generated from the renderer contract", () => {
  const html = read("src/pages/mobile-wireframes.html");

  assert.match(html, /data-page="mobile-wireframe-comps"/);
  assert.match(html, /data-route="\/mobile-wireframes"/);
  assert.match(html, /data-generated="mobile-wireframe-comps-renderer"/);
  assert.match(html, /data-section="mobile-nav"/);
  assert.match(html, /data-section="mobile-public-comps"/);
  assert.match(html, /data-section="mobile-admin-comps"/);
  assert.match(html, /data-section="mobile-breakpoints"/);
  assert.match(html, /data-section="mobile-a11y"/);
});
