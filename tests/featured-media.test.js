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

test("Phase 2 Featured/Media plan documents the media gallery slice", () => {
  const plan = read("docs/PHASE2_FEATURED_MEDIA_PLAN.md");

  assert.match(plan, /Featured \/ Media/i);
  assert.match(plan, /photography/i);
  assert.match(plan, /artwork/i);
  assert.match(plan, /captions/i);
  assert.match(plan, /credits/i);
  assert.match(plan, /alt text/i);
  assert.match(plan, /published-only/i);
});

test("Featured/Media renderer exports helpers and renders the gallery surface", () => {
  const { renderFeaturedMediaPage, getFeaturedMediaItems, getPublishedMediaArticles } = load("src/render/featured-media.js");
  const fixtures = load("src/content/fixtures.js");
  const html = renderFeaturedMediaPage(fixtures);

  assert.equal(typeof renderFeaturedMediaPage, "function");
  assert.equal(typeof getFeaturedMediaItems, "function");
  assert.equal(typeof getPublishedMediaArticles, "function");
  assert.match(html, /data-page="featured-media"/);
  assert.match(html, /data-route="\/featured"/);
  assert.match(html, /data-generated="featured-media-renderer"/);
  assert.match(html, /data-section="media-gallery"/);
});

test("Featured/Media gallery renders every launch media asset with accessible metadata", () => {
  const { renderFeaturedMediaPage } = load("src/render/featured-media.js");
  const fixtures = load("src/content/fixtures.js");
  const html = renderFeaturedMediaPage(fixtures);

  for (const item of fixtures.mediaItems) {
    assert.match(html, new RegExp(`data-media="${item.id}"`));
    assert.match(html, new RegExp(item.title));
    assert.match(html, new RegExp(`alt="${item.altText}"`));
    assert.match(html, new RegExp(item.caption));
    assert.match(html, new RegExp(item.credit));
  }
});

test("Featured/Media links published article media while excluding draft articles", () => {
  const { renderFeaturedMediaPage, getPublishedMediaArticles } = load("src/render/featured-media.js");
  const fixtures = load("src/content/fixtures.js");
  const articles = getPublishedMediaArticles(fixtures);
  const html = renderFeaturedMediaPage(fixtures);

  assert.deepEqual(articles.map((article) => article.slug), ["send-a-text-before-you-knock", "artist-interview-placeholder"]);
  assert.match(html, /data-section="article-media-links"/);
  assert.match(html, /Send A Text Before You Knock/);
  assert.match(html, /Artist Interview Placeholder/);
  assert.doesNotMatch(html, /Culture Review Placeholder/);
  assert.doesNotMatch(html, /data-status="draft"/);
});

test("Featured/Media renderer supports an empty media state", () => {
  const { renderFeaturedMediaPage } = load("src/render/featured-media.js");
  const fixtures = load("src/content/fixtures.js");
  const html = renderFeaturedMediaPage({ ...fixtures, mediaItems: [] });

  assert.match(html, /data-state="no-media"/);
  assert.match(html, /No featured media is published yet/);
  assert.match(html, /href="\/contact"/);
});

test("Featured/Media page artifact is generated from the renderer contract", () => {
  const html = read("src/pages/featured-media.html");

  assert.match(html, /data-page="featured-media"/);
  assert.match(html, /data-route="\/featured"/);
  assert.match(html, /data-generated="featured-media-renderer"/);
  assert.match(html, /data-section="media-intro"/);
  assert.match(html, /data-section="media-gallery"/);
  assert.match(html, /data-section="article-media-links"/);
});
