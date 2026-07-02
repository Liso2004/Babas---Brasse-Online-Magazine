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

test("Phase 1 public shell plan documents the Home page slice", () => {
  const plan = read("docs/PHASE1_PUBLIC_SHELL_PLAN.md");

  assert.match(plan, /Home page/i);
  assert.match(plan, /lead story/i);
  assert.match(plan, /latest articles/i);
  assert.match(plan, /category access/i);
  assert.match(plan, /media preview/i);
  assert.match(plan, /people preview/i);
});

test("Home renderer exports a render function and uses launch fixtures", () => {
  const { renderHomePage } = load("src/render/home.js");
  const fixtures = load("src/content/fixtures.js");
  const html = renderHomePage(fixtures);

  assert.equal(typeof renderHomePage, "function");
  assert.match(html, /data-page="home"/);
  assert.match(html, /data-section="lead-story"/);
  assert.match(html, /Send A Text Before You Knock/);
  assert.match(html, /data-section="latest-articles"/);
  assert.match(html, /data-section="category-access"/);
  assert.match(html, /data-section="media-preview"/);
  assert.match(html, /data-section="people-preview"/);
});

test("Home renderer only promotes published articles in reader-facing sections", () => {
  const { renderHomePage } = load("src/render/home.js");
  const fixtures = load("src/content/fixtures.js");
  const html = renderHomePage(fixtures);

  assert.match(html, /Send A Text Before You Knock/);
  assert.match(html, /Artist Interview Placeholder/);
  assert.doesNotMatch(html, /Culture Review Placeholder/);
  assert.doesNotMatch(html, /data-status="draft"/);
});

test("Home page artifact is generated from the renderer contract", () => {
  const html = read("src/pages/home.html");

  assert.match(html, /data-page="home"/);
  assert.match(html, /data-generated="home-renderer"/);
  assert.match(html, /data-section="lead-story"/);
  assert.match(html, /data-section="latest-articles"/);
  assert.match(html, /data-section="category-access"/);
  assert.match(html, /data-section="media-preview"/);
  assert.match(html, /data-section="people-preview"/);
});
