const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

function filePath(relativePath) {
  return path.join(root, relativePath);
}

function read(relativePath) {
  return fs.readFileSync(filePath(relativePath), "utf8");
}

function load(relativePath) {
  delete require.cache[require.resolve(filePath(relativePath))];
  return require(filePath(relativePath));
}

test("Phase 2 categories/search plan documents the browse and search slice", () => {
  const plan = read("docs/PHASE2_CATEGORIES_SEARCH_PLAN.md");

  assert.match(plan, /Categories\/Search/i);
  assert.match(plan, /published-only/i);
  assert.match(plan, /category filter/i);
  assert.match(plan, /search loading/i);
  assert.match(plan, /no-results/i);
  assert.match(plan, /reset/i);
});

test("Categories/Search renderer exports filtering helpers and renders the search surface", () => {
  const { renderCategoriesSearchPage, filterPublishedArticles, searchPublishedArticles } = load("src/render/categories-search.js");
  const fixtures = load("src/content/fixtures.js");
  const html = renderCategoriesSearchPage(fixtures);

  assert.equal(typeof renderCategoriesSearchPage, "function");
  assert.equal(typeof filterPublishedArticles, "function");
  assert.equal(typeof searchPublishedArticles, "function");
  assert.match(html, /data-page="categories-search"/);
  assert.match(html, /data-generated="categories-search-renderer"/);
  assert.match(html, /data-section="search-form"/);
  assert.match(html, /type="search"/);
  assert.match(html, /placeholder="Search articles"/);
});

test("Categories/Search renderer includes every launch category as a filter chip", () => {
  const { renderCategoriesSearchPage } = load("src/render/categories-search.js");
  const fixtures = load("src/content/fixtures.js");
  const html = renderCategoriesSearchPage(fixtures);

  assert.match(html, /data-section="category-filters"/);

  for (const category of fixtures.categories) {
    assert.match(html, new RegExp(`data-category="${category.slug}"`));
    assert.match(html, new RegExp(category.label));
  }
});

test("Categories/Search defaults to published-only results", () => {
  const { renderCategoriesSearchPage, filterPublishedArticles } = load("src/render/categories-search.js");
  const fixtures = load("src/content/fixtures.js");
  const articles = filterPublishedArticles(fixtures);
  const html = renderCategoriesSearchPage(fixtures);

  assert.equal(articles.length, 2);
  assert.ok(articles.every((article) => article.status === "published"));
  assert.match(html, /Send A Text Before You Knock/);
  assert.match(html, /Artist Interview Placeholder/);
  assert.doesNotMatch(html, /Culture Review Placeholder/);
  assert.doesNotMatch(html, /data-status="draft"/);
});

test("Categories/Search filters by keyword and category", () => {
  const { filterPublishedArticles, searchPublishedArticles, renderCategoriesSearchPage } = load("src/render/categories-search.js");
  const fixtures = load("src/content/fixtures.js");
  const artistResults = searchPublishedArticles(fixtures, "artist");
  const essaysResults = filterPublishedArticles(fixtures, { category: "essays" });
  const artistHtml = renderCategoriesSearchPage(fixtures, { query: "artist" });
  const essaysHtml = renderCategoriesSearchPage(fixtures, { category: "essays" });

  assert.deepEqual(artistResults.map((article) => article.slug), ["artist-interview-placeholder"]);
  assert.deepEqual(essaysResults.map((article) => article.slug), ["send-a-text-before-you-knock"]);
  assert.match(artistHtml, /Artist Interview Placeholder/);
  assert.doesNotMatch(artistHtml, /Send A Text Before You Knock/);
  assert.match(essaysHtml, /Send A Text Before You Knock/);
  assert.doesNotMatch(essaysHtml, /Artist Interview Placeholder/);
});

test("Categories/Search renders a no-results state with reset affordance", () => {
  const { renderCategoriesSearchPage } = load("src/render/categories-search.js");
  const fixtures = load("src/content/fixtures.js");
  const html = renderCategoriesSearchPage(fixtures, { query: "missing topic" });

  assert.match(html, /data-state="no-results"/);
  assert.match(html, /No articles found/);
  assert.match(html, /data-action="reset-search"/);
  assert.match(html, /href="\/search"/);
});

test("Categories/Search page artifact is generated from the renderer contract", () => {
  const html = read("src/pages/categories-search.html");

  assert.match(html, /data-page="categories-search"/);
  assert.match(html, /data-route="\/search"/);
  assert.match(html, /data-generated="categories-search-renderer"/);
  assert.match(html, /data-section="search-form"/);
  assert.match(html, /data-section="category-filters"/);
  assert.match(html, /data-section="search-results"/);
});
