const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const root = path.resolve(__dirname, "..");

function filePath(relativePath) {
  return path.join(root, relativePath);
}

function read(relativePath) {
  return fs.readFileSync(filePath(relativePath), "utf8").replace(/^\uFEFF/, "");
}

function readJson(relativePath) {
  return JSON.parse(read(relativePath));
}

async function loadRoutes() {
  return import(pathToFileURL(filePath("apps/web/src/routes.js")).href + `?cache=${Date.now()}`);
}

test("route registry keeps the 22-route MVP surface without duplicate paths or ids", async () => {
  const { routes } = await loadRoutes();
  const ids = routes.map((route) => route.id);
  const paths = routes.map((route) => route.path);

  assert.equal(routes.length, 22);
  assert.equal(new Set(ids).size, ids.length, "route ids should be unique");
  assert.equal(new Set(paths).size, paths.length, "route paths should be unique");
});

test("public navigation excludes dynamic article-detail while preserving route resolution", async () => {
  const { publicRoutes, publicNavigationRoutes, getRouteByPath } = await loadRoutes();

  assert.ok(publicRoutes.find((route) => route.id === "article-detail"), "article detail remains registered");
  assert.equal(getRouteByPath("/visceral-mag/send-a-text-before-you-knock").id, "article-detail");
  assert.ok(publicNavigationRoutes.every((route) => !route.path.includes(":")), "visible nav should not include dynamic placeholders");
  assert.equal(publicNavigationRoutes.some((route) => route.id === "article-detail"), false);
});

test("public navigation has no duplicate labels or hrefs", async () => {
  const { publicNavigationRoutes } = await loadRoutes();
  const labels = publicNavigationRoutes.map((route) => route.label);
  const hrefs = publicNavigationRoutes.map((route) => route.path);

  assert.equal(new Set(labels).size, labels.length, "visible public nav labels should be unique");
  assert.equal(new Set(hrefs).size, hrefs.length, "visible public nav hrefs should be unique");
});

test("Figma section shortcuts map into existing MVP routes instead of adding duplicate routes", () => {
  const layout = read("apps/web/src/layouts/PublicLayout.jsx");
  const routesSource = read("apps/web/src/routes.js");

  assert.match(layout, /finalDesignSections/);
  assert.match(layout, /href: "\/search\?category=reviews&topic=theatre"/);
  assert.match(layout, /href: "\/search\?category=reviews&topic=books"/);
  assert.match(layout, /href: "\/search\?category=essays"/);
  assert.match(layout, /href: "\/search\?category=essays&topic=opinion"/);
  assert.doesNotMatch(routesSource, /path: "\/theatre"/);
  assert.doesNotMatch(routesSource, /path: "\/books"/);
  assert.doesNotMatch(routesSource, /path: "\/essays"/);
  assert.doesNotMatch(routesSource, /path: "\/opinion"/);
});

test("route navigation consistency is documented and wired into the full suite", () => {
  const rootPkg = readJson("package.json");
  const runTests = read("tests/run-tests.js");
  const testingLog = read("docs/TESTING_LOG.md");
  const handoff = read("docs/FIGMA_FINAL_FRONTEND_HANDOFF.md");

  assert.equal(rootPkg.scripts["test:route-nav-consistency"], "node tests/route-navigation-consistency.test.js");
  assert.match(runTests, /route-navigation-consistency\.test\.js/);
  assert.match(testingLog, /Route Navigation Consistency/i);
  assert.match(handoff, /dynamic article detail route stays registered/i);
});