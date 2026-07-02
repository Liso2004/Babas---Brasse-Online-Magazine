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

test("Phase 4 Article Management plan documents the editorial workflow", () => {
  const plan = read("docs/PHASE4_ARTICLE_MANAGEMENT_PLAN.md");

  assert.match(plan, /Article Management/i);
  assert.match(plan, /role-protected access/i);
  assert.match(plan, /search/i);
  assert.match(plan, /status filter/i);
  assert.match(plan, /category filter/i);
  assert.match(plan, /SEO-readiness filter/i);
  assert.match(plan, /create article/i);
  assert.match(plan, /autosave/i);
  assert.match(plan, /validation/i);
  assert.match(plan, /failure/i);
});

test("Article Management renderer exports helpers and preserves the final wireframe contract", () => {
  const { renderArticleManagementPage, getArticleRows, getArticleManagementStats } = load("src/render/article-management.js");
  const fixtures = load("src/content/fixtures.js");
  const html = renderArticleManagementPage(fixtures);

  assert.equal(typeof renderArticleManagementPage, "function");
  assert.equal(typeof getArticleRows, "function");
  assert.equal(typeof getArticleManagementStats, "function");
  assert.match(html, /data-page="article-management"/);
  assert.match(html, /data-route="\/admin\/articles"/);
  assert.match(html, /data-area="admin"/);
  assert.match(html, /data-generated="article-management-renderer"/);
  assert.match(html, /data-wireframe-source="article-management.html"/);
  assert.match(html, /data-auth-required="editor"/);
});

test("Article Management table includes every fixture article including drafts", () => {
  const { getArticleRows, renderArticleManagementPage } = load("src/render/article-management.js");
  const fixtures = load("src/content/fixtures.js");
  const rows = getArticleRows(fixtures);
  const html = renderArticleManagementPage(fixtures);

  assert.equal(rows.length, fixtures.articles.length);
  assert.deepEqual(rows.map((row) => row.title), [
    "Send A Text Before You Knock",
    "Culture Review Placeholder",
    "Artist Interview Placeholder"
  ]);

  assert.match(html, /data-section="article-table"/);
  assert.match(html, /data-column="title"/);
  assert.match(html, /data-column="status"/);
  assert.match(html, /data-column="category"/);
  assert.match(html, /data-column="author"/);
  assert.match(html, /data-column="date"/);
  assert.match(html, /data-column="seo-readiness"/);
  assert.match(html, /data-column="row-actions"/);
  assert.match(html, /Culture Review Placeholder/);
  assert.match(html, /data-status="draft"/);
});

test("Article Management stats and toolbar are fixture-derived", () => {
  const { getArticleManagementStats, renderArticleManagementPage } = load("src/render/article-management.js");
  const fixtures = load("src/content/fixtures.js");
  const stats = getArticleManagementStats(fixtures);
  const html = renderArticleManagementPage(fixtures);

  assert.deepEqual(stats, {
    totalArticles: 3,
    publishedArticles: 2,
    draftArticles: 1,
    seoReadyArticles: 3
  });

  assert.match(html, /data-section="article-toolbar"/);
  assert.match(html, /name="article-search"/);
  assert.match(html, /data-filter="status"/);
  assert.match(html, /data-filter="category"/);
  assert.match(html, /data-filter="seo-readiness"/);
  assert.match(html, /href="\/admin\/articles\/new"/);
  assert.match(html, /Create article/);

  for (const key of Object.keys(stats)) {
    assert.match(html, new RegExp(`data-metric="${key}"`));
    assert.match(html, new RegExp(`data-value="${stats[key]}"`));
  }
});

test("Article Management editor form includes required content, media, and SEO fields", () => {
  const { renderArticleManagementPage } = load("src/render/article-management.js");
  const fixtures = load("src/content/fixtures.js");
  const html = renderArticleManagementPage(fixtures);

  assert.match(html, /data-section="article-editor"/);
  assert.match(html, /for="article-title"/);
  assert.match(html, /for="article-slug"/);
  assert.match(html, /for="article-dek"/);
  assert.match(html, /for="article-body"/);
  assert.match(html, /for="article-category"/);
  assert.match(html, /for="article-author"/);
  assert.match(html, /for="article-featured-image"/);
  assert.match(html, /for="article-alt-text"/);
  assert.match(html, /for="article-seo-title"/);
  assert.match(html, /for="article-seo-description"/);
  assert.match(html, /for="article-og-title"/);
  assert.match(html, /for="article-og-description"/);
});

test("Article Management includes row actions and publishing states", () => {
  const { renderArticleManagementPage } = load("src/render/article-management.js");
  const fixtures = load("src/content/fixtures.js");
  const html = renderArticleManagementPage(fixtures);

  assert.match(html, /href="\/admin\/articles\/send-a-text-before-you-knock\/edit"/);
  assert.match(html, /href="\/visceral-mag\/send-a-text-before-you-knock"/);
  assert.match(html, /data-action="publish"/);
  assert.match(html, /data-action="unpublish"/);
  assert.match(html, /data-section="article-states"/);
  assert.match(html, /data-state-note="article-draft"/);
  assert.match(html, /data-state-note="article-publish"/);
  assert.match(html, /data-state-note="article-autosave"/);
  assert.match(html, /data-state-note="article-validation"/);
  assert.match(html, /data-state-note="article-failure"/);
});

test("Article Management page artifact is generated from the renderer contract", () => {
  const html = read("src/pages/admin/article-management.html");

  assert.match(html, /data-page="article-management"/);
  assert.match(html, /data-route="\/admin\/articles"/);
  assert.match(html, /data-generated="article-management-renderer"/);
  assert.match(html, /data-section="article-toolbar"/);
  assert.match(html, /data-section="article-table"/);
  assert.match(html, /data-section="article-editor"/);
  assert.match(html, /data-section="article-states"/);
});
