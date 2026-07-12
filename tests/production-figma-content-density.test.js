const test = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const root = path.resolve(__dirname, "..");

async function load(relativePath) {
  return import(pathToFileURL(path.join(root, relativePath)).href + `?cache=${Date.now()}`);
}

test("live Figma preview has seven unique published editorial stories", async () => {
  const fixtures = await load("apps/web/src/data/launchFixtures.js");
  const published = fixtures.articles.filter((article) => article.status === "published");
  assert.ok(published.length >= 7);
  assert.equal(new Set(published.map((article) => article.id)).size, published.length);
  assert.equal(new Set(published.map((article) => article.slug)).size, published.length);
});

test("Home fills final Figma featured recent and more slots without repeats", async () => {
  const fixtures = await load("apps/web/src/data/launchFixtures.js");
  const { buildHomeRouteModel } = await load("apps/web/src/pages/homeRouteModel.js");
  const model = buildHomeRouteModel(fixtures);
  const featured = model.sections.featuredArticle;
  const recent = model.sections.recentArticles;
  const more = model.sections.moreFromMagazine.items;
  const ids = [featured.id, ...recent.map((item) => item.id), ...more.map((item) => item.id)];

  assert.equal(recent.length, 3);
  assert.ok(more.length >= 3);
  assert.equal(new Set(ids).size, ids.length);
  assert.ok(more.every((item) => item.featuredImage && item.href));
});

test("Home renders More as editorial article cards", async () => {
  const fs = require("node:fs");
  const home = fs.readFileSync(path.join(root, "apps/web/src/pages/HomePage.jsx"), "utf8");
  assert.match(home, /moreFromMagazine\.items\.map/);
  assert.match(home, /FigmaArticleCard key=\{article\.id\} article=\{article\} compact/);
});
