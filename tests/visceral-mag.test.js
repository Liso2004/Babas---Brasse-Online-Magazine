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

test("Phase 2 article discovery plan documents the Visceral Mag listing slice", () => {
  const plan = read("docs/PHASE2_ARTICLE_DISCOVERY_PLAN.md");

  assert.match(plan, /Visceral Mag/i);
  assert.match(plan, /article listing/i);
  assert.match(plan, /published-only/i);
  assert.match(plan, /category chips/i);
  assert.match(plan, /search entry/i);
});

test("Visceral Mag renderer exports a render function and uses published fixtures", () => {
  const { renderVisceralMagPage } = load("src/render/visceral-mag.js");
  const fixtures = load("src/content/fixtures.js");
  const html = renderVisceralMagPage(fixtures);

  assert.equal(typeof renderVisceralMagPage, "function");
  assert.match(html, /data-page="visceral-mag"/);
  assert.match(html, /data-section="article-listing"/);
  assert.match(html, /Send A Text Before You Knock/);
  assert.match(html, /Artist Interview Placeholder/);
});

test("Visceral Mag renderer excludes draft articles from public listing", () => {
  const { renderVisceralMagPage } = load("src/render/visceral-mag.js");
  const fixtures = load("src/content/fixtures.js");
  const html = renderVisceralMagPage(fixtures);

  assert.doesNotMatch(html, /Culture Review Placeholder/);
  assert.doesNotMatch(html, /data-status="draft"/);
  assert.match(html, /data-status="published"/);
});

test("Visceral Mag renderer includes category chips and search entry", () => {
  const { renderVisceralMagPage } = load("src/render/visceral-mag.js");
  const fixtures = load("src/content/fixtures.js");
  const html = renderVisceralMagPage(fixtures);

  for (const category of fixtures.categories) {
    assert.match(html, new RegExp(`data-category="${category.slug}"`));
    assert.match(html, new RegExp(category.label));
  }

  assert.match(html, /data-section="search-entry"/);
  assert.match(html, /type="search"/);
  assert.match(html, /placeholder="Search articles"/);
});

test("Visceral Mag page artifact is generated from the renderer contract", () => {
  const html = read("src/pages/visceral-mag.html");

  assert.match(html, /data-page="visceral-mag"/);
  assert.match(html, /data-generated="visceral-mag-renderer"/);
  assert.match(html, /data-section="article-listing"/);
  assert.match(html, /data-section="category-filters"/);
  assert.match(html, /data-section="search-entry"/);
});
