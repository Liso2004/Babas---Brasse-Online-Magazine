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

function exists(relativePath) {
  return fs.existsSync(filePath(relativePath));
}

async function loadVisceralMagModel() {
  const modulePath = filePath("apps/web/src/pages/visceralMagRouteModel.js");
  assert.ok(fs.existsSync(modulePath), "apps/web/src/pages/visceralMagRouteModel.js should exist");
  return import(pathToFileURL(modulePath).href);
}

function loadFixtures() {
  delete require.cache[require.resolve(filePath("src/content/fixtures.js"))];
  return require(filePath("src/content/fixtures.js"));
}

test("production Visceral Mag route model preserves archive contract", async () => {
  const { buildVisceralMagRouteModel } = await loadVisceralMagModel();
  const model = buildVisceralMagRouteModel(loadFixtures());

  assert.equal(model.route.path, "/visceral-mag");
  assert.equal(model.route.prototypeFile, "src/pages/visceral-mag.html");
  assert.equal(model.pageId, "visceral-mag");
  assert.equal(model.generatedFrom, "visceral-mag-route-model");
  assert.match(model.hero.title, /Latest cultural writing/i);
  assert.equal(model.search.name, "q");
  assert.equal(model.search.placeholder, "Search articles");
});

test("production Visceral Mag model lists published articles only with metadata", async () => {
  const { buildVisceralMagRouteModel } = await loadVisceralMagModel();
  const model = buildVisceralMagRouteModel(loadFixtures());
  const titles = model.sections.articleListing.map((article) => article.title);
  const serialized = JSON.stringify(model);

  assert.deepEqual(titles, ["Send A Text Before You Knock", "Artist Interview Placeholder"]);
  assert.ok(model.sections.articleListing.every((article) => article.status === "published"));
  assert.ok(model.sections.articleListing.every((article) => article.href.startsWith("/visceral-mag/")));
  assert.ok(model.sections.articleListing.every((article) => article.category.label));
  assert.ok(model.sections.articleListing.every((article) => article.author.name));
  assert.doesNotMatch(serialized, /Culture Review Placeholder/);
  assert.doesNotMatch(serialized, /"status":"draft"/);
});

test("production Visceral Mag model omits redundant category controls", async () => {
  const { buildVisceralMagRouteModel } = await loadVisceralMagModel();
  const model = buildVisceralMagRouteModel(loadFixtures());
  assert.equal(model.sections.categoryFilters, undefined);
});

test("React-ready VisceralMagPage component is scaffolded from the route model", () => {
  assert.ok(exists("apps/web/src/pages/VisceralMagPage.jsx"), "VisceralMagPage.jsx should exist");
  const component = read("apps/web/src/pages/VisceralMagPage.jsx");
  const app = read("apps/web/src/App.jsx");

  assert.match(component, /export function VisceralMagPage/);
  assert.match(component, /buildVisceralMagRouteModel/);
  assert.match(component, /data-page="visceral-mag"/);
  assert.match(component, /data-section="archive-intro"/);
  assert.doesNotMatch(component, /data-section="search-entry"/);
  assert.doesNotMatch(component, /data-section="category-filters"|Browse by category/);
  assert.match(component, /data-section="article-listing"/);
  assert.match(component, /<FigmaArticleCard article=\{leadStory\} featured/);
  assert.match(component, /className="visceral-story-feed"/);
  assert.match(app, /VisceralMagPage/);
  assert.match(app, /route\.id === "visceral-mag"/);
});

test("Visceral Mag route migration handoff is documented and wired into scripts", () => {
  const rootPkg = JSON.parse(read("package.json"));
  const runTests = read("tests/run-tests.js");
  const readme = read("apps/web/README.md");
  const planStatus = read("docs/PLAN_STATUS.md");

  assert.ok(rootPkg.scripts["test:production-visceral-mag"]);
  assert.match(runTests, /production-visceral-mag-route\.test\.js/);
  assert.match(readme, /Visceral Mag route migration/i);
  assert.match(planStatus, /Visceral Mag route migration/i);
});
