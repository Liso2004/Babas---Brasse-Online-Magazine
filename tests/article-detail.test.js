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

test("Phase 2 article detail plan documents the reading page slice", () => {
  const plan = read("docs/PHASE2_ARTICLE_DETAIL_PLAN.md");

  assert.match(plan, /Article Detail/i);
  assert.match(plan, /metadata/i);
  assert.match(plan, /related articles/i);
  assert.match(plan, /approved-only/i);
  assert.match(plan, /SEO/i);
});

test("Article Detail renderer exports a render function and renders the sample article", () => {
  const { renderArticleDetailPage } = load("src/render/article-detail.js");
  const fixtures = load("src/content/fixtures.js");
  const html = renderArticleDetailPage(fixtures, "send-a-text-before-you-knock");

  assert.equal(typeof renderArticleDetailPage, "function");
  assert.match(html, /data-page="article-detail"/);
  assert.match(html, /data-slug="send-a-text-before-you-knock"/);
  assert.match(html, /Send A Text Before You Knock/);
  assert.match(html, /Launch sample article for proving the editorial reading flow/);
});

test("Article Detail renderer includes article metadata, image alt text, body, and author link", () => {
  const { renderArticleDetailPage } = load("src/render/article-detail.js");
  const fixtures = load("src/content/fixtures.js");
  const html = renderArticleDetailPage(fixtures, "send-a-text-before-you-knock");

  assert.match(html, /data-section="article-meta"/);
  assert.match(html, /Essays/);
  assert.match(html, /2026-07-01/);
  assert.match(html, /href="\/contributors\/visceral-contributor"/);
  assert.match(html, /Visceral Contributor/);
  assert.match(html, /alt="Babas and Brasse opening banner placeholder"/);
  assert.match(html, /data-section="article-body"/);
  assert.match(html, /Opening paragraph placeholder/);
  assert.match(html, /Body paragraph placeholder/);
});

test("Article Detail renderer includes related articles and SEO metadata", () => {
  const { renderArticleDetailPage } = load("src/render/article-detail.js");
  const fixtures = load("src/content/fixtures.js");
  const html = renderArticleDetailPage(fixtures, "send-a-text-before-you-knock");

  assert.match(html, /data-section="related-articles"/);
  assert.match(html, /Artist Interview Placeholder/);
  assert.match(html, /data-section="seo-metadata"/);
  assert.match(html, /Send A Text Before You Knock \| Babas &amp; Brasse/);
  assert.match(html, /A launch sample article for the Babas &amp; Brasse online magazine MVP/);
  assert.match(html, /Read the launch sample article on Babas &amp; Brasse/);
});

test("Article Detail renderer shows approved comments and reviews only", () => {
  const { renderArticleDetailPage } = load("src/render/article-detail.js");
  const fixtures = load("src/content/fixtures.js");
  const html = renderArticleDetailPage(fixtures, "send-a-text-before-you-knock");

  assert.match(html, /data-section="comments"/);
  assert.match(html, /Approved comment placeholder/);
  assert.doesNotMatch(html, /Pending comment placeholder/);
  assert.match(html, /data-section="reviews"/);
  assert.match(html, /Approved review placeholder/);
  assert.match(html, /data-rating="4"/);
  assert.doesNotMatch(html, /Rejected review placeholder/);
});

test("Article Detail renderer protects drafts and missing articles from public display", () => {
  const { renderArticleDetailPage } = load("src/render/article-detail.js");
  const fixtures = load("src/content/fixtures.js");
  const draftHtml = renderArticleDetailPage(fixtures, "culture-review-placeholder");
  const missingHtml = renderArticleDetailPage(fixtures, "missing-article");

  assert.match(draftHtml, /data-state="not-found"/);
  assert.doesNotMatch(draftHtml, /Culture Review Placeholder/);
  assert.match(missingHtml, /data-state="not-found"/);
});

test("Article Detail page artifact is generated from the renderer contract", () => {
  const html = read("src/pages/article-detail.html");

  assert.match(html, /data-page="article-detail"/);
  assert.match(html, /data-generated="article-detail-renderer"/);
  assert.match(html, /data-section="article-meta"/);
  assert.match(html, /data-section="article-body"/);
  assert.match(html, /data-section="related-articles"/);
  assert.match(html, /data-section="comments"/);
  assert.match(html, /data-section="reviews"/);
});
