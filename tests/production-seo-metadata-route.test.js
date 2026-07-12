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

async function importFresh(relativePath) {
  return import(pathToFileURL(filePath(relativePath)).href + `?cache=${Date.now()}`);
}

test("route metadata helper exists with public route SEO defaults", async () => {
  const modulePath = "apps/web/src/seo/routeMetadata.js";
  assert.ok(fs.existsSync(filePath(modulePath)), `${modulePath} should exist`);
  const { buildRouteMetadata, publicSiteUrl } = await importFresh(modulePath);

  assert.equal(typeof buildRouteMetadata, "function");
  assert.match(publicSiteUrl, /^https?:\/\//);

  const home = buildRouteMetadata({ id: "home", path: "/", label: "Home" });
  assert.equal(home.title, "Babas & Brasse | South African arts, literature, and theatre");
  assert.match(home.description, /digital magazine/i);
  assert.equal(home.canonicalPath, "/");
  assert.equal(home.ogType, "website");
  assert.match(home.ogImage, /babas-brasse-logo\.jpeg/);

  const search = buildRouteMetadata({ id: "search", path: "/search", label: "Search" });
  assert.equal(search.canonicalPath, "/search");
  assert.match(search.title, /Search/i);
  assert.match(search.description, /reviews, essays, interviews/i);
});

test("article detail route metadata uses fixture SEO and canonical slug", async () => {
  const { buildRouteMetadata } = await importFresh("apps/web/src/seo/routeMetadata.js");
  const fixtures = await importFresh("apps/web/src/data/launchFixtures.js");

  const metadata = buildRouteMetadata(
    { id: "article-detail", path: "/visceral-mag/:slug", label: "Article Detail" },
    { slug: "send-a-text-before-you-knock", fixtures }
  );

  assert.equal(metadata.title, "Send A Text Before You Knock | Babas & Brasse");
  assert.equal(metadata.description, "An essay on privacy, hospitality, and the changing rituals of arrival.");
  assert.equal(metadata.ogTitle, "Send A Text Before You Knock");
  assert.equal(metadata.ogDescription, "Privacy, hospitality, and the changing rituals of arrival.");
  assert.equal(metadata.canonicalPath, "/visceral-mag/send-a-text-before-you-knock");
  assert.equal(metadata.ogType, "article");
  assert.match(metadata.ogImage, /\/media\//);
});

test("missing or draft article metadata stays safe and noindex", async () => {
  const { buildRouteMetadata } = await importFresh("apps/web/src/seo/routeMetadata.js");
  const fixtures = await importFresh("apps/web/src/data/launchFixtures.js");

  const metadata = buildRouteMetadata(
    { id: "article-detail", path: "/visceral-mag/:slug", label: "Article Detail" },
    { slug: "culture-review-placeholder", fixtures }
  );

  assert.match(metadata.title, /Article unavailable/i);
  assert.equal(metadata.robots, "noindex,follow");
  assert.equal(metadata.canonicalPath, "/visceral-mag");
});

test("RouteMetadata component updates title canonical and social meta tags", () => {
  const componentPath = "apps/web/src/seo/RouteMetadata.jsx";
  assert.ok(fs.existsSync(filePath(componentPath)), `${componentPath} should exist`);
  const component = read(componentPath);

  assert.match(component, /export function RouteMetadata/);
  assert.match(component, /useEffect/);
  assert.match(component, /document\.title/);
  assert.match(component, /name: "description"/);
  assert.match(component, /property: "og:title"/);
  assert.match(component, /property: "og:description"/);
  assert.match(component, /property: "og:url"/);
  assert.match(component, /name: "twitter:card"/);
  assert.match(component, /rel="canonical"/);
});

test("AppShell wires RouteMetadata for every resolved route without adding routes", () => {
  const app = read("apps/web/src/App.jsx");
  const routes = read("apps/web/src/routes.js");

  assert.match(app, /import \{ RouteMetadata \}/);
  assert.match(app, /<RouteMetadata route=\{route\}/);
  assert.match(app, /slug=\{route\.params\?\.slug\}/);
  assert.doesNotMatch(routes, /path: "\/theatre"/);
  assert.doesNotMatch(routes, /path: "\/books"/);
  assert.doesNotMatch(routes, /path: "\/essays"/);
  assert.doesNotMatch(routes, /path: "\/opinion"/);
});

test("SEO metadata sprint is documented and wired into the full suite", () => {
  const rootPkg = readJson("package.json");
  const runTests = read("tests/run-tests.js");
  const testingLog = read("docs/TESTING_LOG.md");
  const sprintPlan = read("docs/SPRINT_PLAN_JULY_2026.md");
  const roadmap = read("docs/IMPLEMENTATION_PLAN_JULY_2026.md");
  const coverage = read("docs/MVP_IMPLEMENTATION_COVERAGE_REVIEW.md");

  assert.equal(rootPkg.scripts["test:production-seo-metadata"], "node tests/production-seo-metadata-route.test.js");
  assert.match(runTests, /production-seo-metadata-route\.test\.js/);
  assert.match(testingLog, /Figma SEO Metadata Sprint/i);
  assert.match(sprintPlan, /Figma SEO metadata sprint/i);
  assert.match(roadmap, /391 passing tests/i);
  assert.match(coverage, /391 passing tests/i);
});


