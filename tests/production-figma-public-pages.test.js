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

async function loadSearchModel() {
  return import(pathToFileURL(filePath("apps/web/src/pages/categoriesSearchRouteModel.js")).href);
}

function loadFixtures() {
  delete require.cache[require.resolve(filePath("src/content/fixtures.js"))];
  return require(filePath("src/content/fixtures.js"));
}

test("shared Figma article card component exists for public editorial surfaces", () => {
  const componentPath = "apps/web/src/components/FigmaArticleCard.jsx";
  assert.ok(fs.existsSync(filePath(componentPath)), `${componentPath} should exist`);
  const component = read(componentPath);

  assert.match(component, /export function FigmaArticleCard/);
  assert.match(component, /article-card__media/);
  assert.match(component, /article-card__body/);
  assert.match(component, /article-card__meta/);
  assert.match(component, /article-card--compact/);
});

test("Visceral Mag and Search use the shared Figma article card layout", () => {
  const visceral = read("apps/web/src/pages/VisceralMagPage.jsx");
  const search = read("apps/web/src/pages/CategoriesSearchPage.jsx");

  assert.match(visceral, /import \{ FigmaArticleCard \}/);
  assert.match(visceral, /className="figma-public-page figma-archive-page"/);
  assert.match(visceral, /className="visceral-story-feed"/);
  assert.match(visceral, /<FigmaArticleCard/);

  assert.match(search, /import \{ FigmaArticleCard \}/);
  assert.match(search, /className="figma-public-page figma-search-page"/);
  assert.match(search, /className="figma-search-tools"/);
  assert.match(search, /data-section="figma-search-results"/);
  assert.match(search, /<FigmaArticleCard/);
});

test("Featured Media uses the React Bits image masonry and Article Detail keeps the editorial reading system", () => {
  const featured = read("apps/web/src/pages/FeaturedMediaPage.jsx");
  const detail = read("apps/web/src/pages/ArticleDetailPage.jsx");

  assert.match(featured, /import Masonry/);
  assert.match(featured, /className="figma-public-page figma-featured-page"/);
  assert.match(featured, /variant="overlay"/);
  assert.match(featured, /<Masonry/);
  assert.doesNotMatch(featured, /className="figma-media-gallery"|<FigmaArticleCard/);

  assert.match(detail, /className="figma-article-detail"/);
  assert.match(detail, /className="figma-article-hero"/);
  assert.match(detail, /className="figma-article-body"/);
  assert.match(detail, /className="figma-related-grid"/);
});

test("Search results retain featured image metadata for Figma cards", async () => {
  const { buildCategoriesSearchRouteModel } = await loadSearchModel();
  const model = buildCategoriesSearchRouteModel(loadFixtures());
  const result = model.sections.results.items[0];

  assert.ok(result.featuredImage, "search results should include image metadata");
  assert.match(result.featuredImage.url, /^\/media\//);
  assert.ok(result.featuredImage.altText);
});

test("Figma public pages sprint is styled documented and wired into the full suite", () => {
  const rootPkg = readJson("package.json");
  const runTests = read("tests/run-tests.js");
  const css = read("apps/web/src/styles.css");
  const testingLog = read("docs/TESTING_LOG.md");
  const sprintPlan = read("docs/SPRINT_PLAN_JULY_2026.md");

  assert.equal(rootPkg.scripts["test:production-figma-public-pages"], "node tests/production-figma-public-pages.test.js");
  assert.match(runTests, /production-figma-public-pages\.test\.js/);
  assert.match(css, /\.figma-public-page/);
  assert.match(css, /\.figma-article-hero/);
  assert.match(css, /\.figma-search-tools/);
  assert.match(css, /\.figma-media-gallery/);
  assert.match(testingLog, /Figma Public Pages Sprint/i);
  assert.match(sprintPlan, /Figma public pages sprint/i);
});
