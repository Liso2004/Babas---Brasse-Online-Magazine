const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const root = path.resolve(__dirname, "..");
function filePath(relativePath) { return path.join(root, relativePath); }
function read(relativePath) { return fs.readFileSync(filePath(relativePath), "utf8").replace(/^\uFEFF/, ""); }
function exists(relativePath) { return fs.existsSync(filePath(relativePath)); }
async function loadMobileModel() {
  const modulePath = filePath("apps/web/src/pages/mobileWireframeCompsRouteModel.js");
  assert.ok(fs.existsSync(modulePath), "apps/web/src/pages/mobileWireframeCompsRouteModel.js should exist");
  return import(pathToFileURL(modulePath).href);
}

test("production mobile wireframe route model preserves route metadata", async () => {
  const { buildMobileWireframeCompsRouteModel } = await loadMobileModel();
  const model = buildMobileWireframeCompsRouteModel();

  assert.equal(model.pageId, "mobile-wireframe-comps");
  assert.equal(model.generatedFrom, "mobile-wireframe-comps-route-model");
  assert.equal(model.route.path, "/mobile-wireframes");
  assert.equal(model.route.prototypeFile, "src/pages/mobile-wireframes.html");
  assert.equal(model.responsive, "mobile-first-support-handoff");
});

test("production mobile model includes public and admin comps", async () => {
  const { buildMobileWireframeCompsRouteModel } = await loadMobileModel();
  const model = buildMobileWireframeCompsRouteModel();

  assert.deepEqual(model.publicComps.map((comp) => comp.id), ["home", "article", "search", "contact"]);
  assert.deepEqual(model.publicComps.map((comp) => comp.stackOrder), [
    "hero-rail-teasers-newsletter",
    "metadata-title-body-related-comments",
    "search-field-filter-chips-results",
    "intro-form-validation-footer"
  ]);
  assert.deepEqual(model.adminComps.map((comp) => comp.id), ["dashboard", "editor", "moderate", "inbox"]);
  assert.deepEqual([...new Set(model.adminComps.map((comp) => comp.rule))], ["stacked-panels", "actions-near-record", "simplified-tables"]);
});

test("production mobile model includes nav breakpoints and accessibility checks", async () => {
  const { buildMobileWireframeCompsRouteModel } = await loadMobileModel();
  const model = buildMobileWireframeCompsRouteModel();

  assert.equal(model.nav.behavior, "compressed-mark-menu-search");
  assert.deepEqual(model.breakpoints.map((breakpoint) => breakpoint.width), [360, 390, 430, 768]);
  assert.deepEqual(model.breakpoints.map((breakpoint) => breakpoint.layoutRule), ["one-column-public", "one-column-public", "one-column-public", "admin-card-rows"]);
  assert.deepEqual(model.a11y.minTouchTarget, 44);
  assert.deepEqual(model.a11y.checks.map((check) => check.id), ["touch-targets", "no-overlap", "visible-focus", "readable-type", "stable-controls"]);
});

test("React-ready Mobile Wireframe Comps page is scaffolded from the route model", () => {
  assert.ok(exists("apps/web/src/pages/MobileWireframeCompsPage.jsx"), "MobileWireframeCompsPage.jsx should exist");
  const component = read("apps/web/src/pages/MobileWireframeCompsPage.jsx");
  const app = read("apps/web/src/App.jsx");

  assert.match(component, /export function MobileWireframeCompsPage/);
  assert.match(component, /buildMobileWireframeCompsRouteModel/);
  assert.match(component, /data-page="mobile-wireframe-comps"/);
  assert.match(component, /data-section="mobile-nav"/);
  assert.match(component, /data-section="mobile-public-comps"/);
  assert.match(component, /data-section="mobile-admin-comps"/);
  assert.match(component, /data-section="mobile-breakpoints"/);
  assert.match(component, /data-section="mobile-a11y"/);
  assert.match(app, /MobileWireframeCompsPage/);
  assert.match(app, /route\.id === "mobile-wireframes"/);
});

test("Mobile Wireframe Comps route migration handoff is documented and wired into scripts", () => {
  const rootPkg = JSON.parse(read("package.json"));
  const runTests = read("tests/run-tests.js");
  const readme = read("apps/web/README.md");
  const planStatus = read("docs/PLAN_STATUS.md");

  assert.ok(rootPkg.scripts["test:production-mobile-wireframes"]);
  assert.match(runTests, /production-mobile-wireframe-comps-route\.test\.js/);
  assert.match(readme, /Mobile Wireframe Comps route migration/i);
  assert.match(planStatus, /Mobile Wireframe Comps route migration/i);
});
