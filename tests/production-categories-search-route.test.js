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

async function loadSearchModel() {
  const modulePath = filePath("apps/web/src/pages/categoriesSearchRouteModel.js");
  assert.ok(fs.existsSync(modulePath), "apps/web/src/pages/categoriesSearchRouteModel.js should exist");
  return import(pathToFileURL(modulePath).href);
}

function loadFixtures() {
  delete require.cache[require.resolve(filePath("src/content/fixtures.js"))];
  return require(filePath("src/content/fixtures.js"));
}

test("production Categories/Search route model preserves the search surface contract", async () => {
  const { buildCategoriesSearchRouteModel } = await loadSearchModel();
  const model = buildCategoriesSearchRouteModel(loadFixtures());

  assert.equal(model.pageId, "categories-search");
  assert.equal(model.generatedFrom, "categories-search-route-model");
  assert.equal(model.route.path, "/search");
  assert.equal(model.route.prototypeFile, "src/pages/categories-search.html");
  assert.equal(model.search.name, "q");
  assert.equal(model.search.placeholder, "Search articles");
  assert.equal(model.stateNote, "search-loading");
  assert.deepEqual(model.activeFilters, { query: "", category: "" });
});

test("production Categories/Search model includes every launch category chip", async () => {
  const { buildCategoriesSearchRouteModel } = await loadSearchModel();
  const model = buildCategoriesSearchRouteModel(loadFixtures());

  assert.deepEqual(model.sections.categoryFilters.map((category) => category.slug), ["all", "essays", "reviews", "interviews", "artwork"]);
  assert.deepEqual(model.sections.categoryFilters.map((category) => category.href), [
    "/search",
    "/search?category=essays",
    "/search?category=reviews",
    "/search?category=interviews",
    "/search?category=artwork"
  ]);
});

test("production Categories/Search filtering defaults to published-only results", async () => {
  const { buildCategoriesSearchRouteModel, filterPublishedArticles } = await loadSearchModel();
  const fixtures = loadFixtures();
  const model = buildCategoriesSearchRouteModel(fixtures);
  const filtered = filterPublishedArticles(fixtures);
  const serialized = JSON.stringify(model);

  assert.deepEqual(filtered.map((article) => article.slug), ["send-a-text-before-you-knock", "artist-interview-placeholder"]);
  assert.deepEqual(model.sections.results.items.map((article) => article.slug), ["send-a-text-before-you-knock", "artist-interview-placeholder"]);
  assert.equal(model.sections.results.state, "results");
  assert.doesNotMatch(serialized, /Culture Review Placeholder/);
  assert.doesNotMatch(serialized, /"status":"draft"/);
});

test("production Categories/Search model filters by keyword category and combined options", async () => {
  const { buildCategoriesSearchRouteModel, filterPublishedArticles, searchPublishedArticles } = await loadSearchModel();
  const fixtures = loadFixtures();

  assert.deepEqual(searchPublishedArticles(fixtures, "artist").map((article) => article.slug), ["artist-interview-placeholder"]);
  assert.deepEqual(filterPublishedArticles(fixtures, { category: "essays" }).map((article) => article.slug), ["send-a-text-before-you-knock"]);
  assert.deepEqual(filterPublishedArticles(fixtures, { query: "artist", category: "interviews" }).map((article) => article.slug), ["artist-interview-placeholder"]);
  assert.deepEqual(filterPublishedArticles(fixtures, { query: "artist", category: "essays" }).map((article) => article.slug), []);

  const artistModel = buildCategoriesSearchRouteModel(fixtures, { query: "artist" });
  const essaysModel = buildCategoriesSearchRouteModel(fixtures, { category: "essays" });

  assert.deepEqual(artistModel.sections.results.items.map((article) => article.slug), ["artist-interview-placeholder"]);
  assert.deepEqual(essaysModel.sections.results.items.map((article) => article.slug), ["send-a-text-before-you-knock"]);
});

test("production Categories/Search model exposes no-results and reset affordance", async () => {
  const { buildCategoriesSearchRouteModel } = await loadSearchModel();
  const model = buildCategoriesSearchRouteModel(loadFixtures(), { query: "missing topic" });

  assert.equal(model.sections.results.state, "no-results");
  assert.equal(model.sections.results.items.length, 0);
  assert.equal(model.sections.results.message, "No articles found");
  assert.equal(model.sections.results.resetHref, "/search");
});

test("React-ready CategoriesSearchPage component is scaffolded from the route model", () => {
  assert.ok(exists("apps/web/src/pages/CategoriesSearchPage.jsx"), "CategoriesSearchPage.jsx should exist");
  const component = read("apps/web/src/pages/CategoriesSearchPage.jsx");
  const app = read("apps/web/src/App.jsx");

  assert.match(component, /export function CategoriesSearchPage/);
  assert.match(component, /buildCategoriesSearchRouteModel/);
  assert.match(component, /data-page="categories-search"/);
  assert.match(component, /data-section="search-form"/);
  assert.match(component, /data-section="category-filters"/);
  assert.match(component, /data-section="active-filters"/);
  assert.match(component, /data-section="search-results"/);
  assert.match(component, /data-action="reset-search"/);
  assert.match(app, /CategoriesSearchPage/);
  assert.match(app, /route\.id === "search"/);
});

test("Categories/Search route migration handoff is documented and wired into scripts", () => {
  const rootPkg = JSON.parse(read("package.json"));
  const runTests = read("tests/run-tests.js");
  const readme = read("apps/web/README.md");
  const planStatus = read("docs/PLAN_STATUS.md");

  assert.ok(rootPkg.scripts["test:production-categories-search"]);
  assert.match(runTests, /production-categories-search-route\.test\.js/);
  assert.match(readme, /Categories\/Search route migration/i);
  assert.match(planStatus, /Categories\/Search route migration/i);
});
