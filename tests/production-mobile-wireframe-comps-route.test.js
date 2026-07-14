const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));

test("mobile wireframe sources remain archived as design evidence", () => {
  assert.ok(exists("apps/web/src/pages/mobileWireframeCompsRouteModel.js"));
  assert.ok(exists("apps/web/src/pages/MobileWireframeCompsPage.jsx"));
  assert.ok(exists("src/pages/mobile-wireframes.html"));
});

test("archived mobile model preserves public and admin responsive decisions", () => {
  const model = read("apps/web/src/pages/mobileWireframeCompsRouteModel.js");
  assert.match(model, /home/);
  assert.match(model, /article/);
  assert.match(model, /dashboard/);
  assert.match(model, /moderate/);
  assert.match(model, /simplified-tables/);
});

test("archived mobile model preserves breakpoint and accessibility evidence", () => {
  const model = read("apps/web/src/pages/mobileWireframeCompsRouteModel.js");
  for (const width of ["360", "390", "430", "768"]) assert.match(model, new RegExp(width));
  assert.match(model, /touch-targets/);
  assert.match(model, /no-overlap/);
  assert.match(model, /visible-focus/);
  assert.match(model, /stable-controls/);
});

test("production router and app shell exclude the mobile wireframe route", () => {
  const routes = read("apps/web/src/routes.js");
  const app = read("apps/web/src/App.jsx");
  const smoke = read("apps/web/scripts/smoke-routes.mjs");
  assert.doesNotMatch(routes, /mobile-wireframes/);
  assert.doesNotMatch(app, /MobileWireframeCompsPage|mobile-wireframes/);
  assert.doesNotMatch(smoke, /mobile-wireframes/);
});

test("production release plan records prototype-only route retirement", () => {
  const plan = read("docs/PRODUCTION_RELEASE_PLAN_JULY_2026.md");
  assert.match(plan, /prototype-only runtime routes/i);
  assert.match(plan, /archived design|archived as design/i);
});
