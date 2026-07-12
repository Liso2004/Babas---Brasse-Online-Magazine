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

async function loadHomeModel() {
  return import(pathToFileURL(filePath("apps/web/src/pages/homeRouteModel.js")).href);
}

function loadFixtures() {
  delete require.cache[require.resolve(filePath("src/content/fixtures.js"))];
  return require(filePath("src/content/fixtures.js"));
}

test("Home route model exposes the Figma final homepage composition", async () => {
  const { buildHomeRouteModel } = await loadHomeModel();
  const model = buildHomeRouteModel(loadFixtures());

  assert.equal(model.designSource, "figma-author-website-design");
  assert.equal(model.sections.featuredArticle.id, "send-a-text-before-you-knock");
  assert.ok(model.sections.recentArticles.every((article) => article.id !== model.sections.featuredArticle.id));
  assert.ok(model.sections.moreFromMagazine.items.length >= 3);
  assert.deepEqual(
    model.sections.sectionShortcuts.map((item) => item.label),
    ["Theatre Reviews", "Book Reviews", "Essays", "Opinion"]
  );
});

test("HomePage renders the Figma final editorial layout sections", () => {
  const component = read("apps/web/src/pages/HomePage.jsx");

  assert.match(component, /className="figma-final-home"/);
  assert.match(component, /data-section="figma-featured-article"/);
  assert.match(component, /FigmaArticleCard article={sections.featuredArticle} featured/);
  assert.match(component, /import { FigmaArticleCard }/);
  assert.match(component, /data-section="figma-recent-articles"/);
  assert.match(component, /data-section="figma-more-articles"/);
  assert.match(component, /data-section="figma-newsletter"/);
});

test("Public layout includes the Figma final footer without duplicate top-level routes", () => {
  const layout = read("apps/web/src/layouts/PublicLayout.jsx");

  assert.match(layout, /className="figma-footer"/);
  assert.match(layout, /A digital magazine celebrating South African literature, theatre, and culture/);
  assert.match(layout, /href: "\/search\?category=reviews&topic=theatre"/);
  assert.match(layout, /href: "\/search\?category=reviews&topic=books"/);
  assert.doesNotMatch(layout, /href="\/theatre"/);
  assert.doesNotMatch(layout, /href="\/books"/);
});

test("visual system carries the Figma final homepage and footer styles", () => {
  const css = read("apps/web/src/styles.css");

  assert.match(css, /\.figma-home/);
  assert.match(css, /\.article-card--featured/);
  assert.match(css, /\.article-card__meta/);
  assert.match(css, /\.figma-more-list/);
  assert.match(css, /\.figma-footer/);
});

test("Figma-centered homepage sprint is documented and wired into the full suite", () => {
  const rootPkg = readJson("package.json");
  const runTests = read("tests/run-tests.js");
  const testingLog = read("docs/TESTING_LOG.md");
  const sprintPlan = read("docs/SPRINT_PLAN_JULY_2026.md");

  assert.equal(rootPkg.scripts["test:production-figma-home"], "node tests/production-figma-centered-home.test.js");
  assert.match(runTests, /production-figma-centered-home\.test\.js/);
  assert.match(testingLog, /Figma-Centered Home Sprint/i);
  assert.match(sprintPlan, /Figma-centered frontend sprint/i);
});
