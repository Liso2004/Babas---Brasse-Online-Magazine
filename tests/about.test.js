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

test("Phase 3 About plan documents the wireframe-driven public info slice", () => {
  const plan = read("docs/PHASE3_ABOUT_PLAN.md");

  assert.match(plan, /About/i);
  assert.match(plan, /Mission/i);
  assert.match(plan, /Vision/i);
  assert.match(plan, /Organisation/i);
  assert.match(plan, /editorial pillars/i);
  assert.match(plan, /Creative Team/i);
  assert.match(plan, /Contributors/i);
  assert.match(plan, /Contact/i);
});

test("About renderer exports a render function and preserves the final wireframe contract", () => {
  const { renderAboutPage } = load("src/render/about.js");
  const fixtures = load("src/content/fixtures.js");
  const html = renderAboutPage(fixtures);

  assert.equal(typeof renderAboutPage, "function");
  assert.match(html, /data-page="about"/);
  assert.match(html, /data-route="\/about"/);
  assert.match(html, /data-generated="about-renderer"/);
  assert.match(html, /data-wireframe-source="about.html"/);
  assert.match(html, /data-section="landing-nav"/);
  assert.match(html, /B&amp;B/);
  assert.match(html, /Search articles/);
  assert.match(html, /Subscribe/);
});

test("About renderer includes mission, vision, and organisation overview", () => {
  const { renderAboutPage } = load("src/render/about.js");
  const fixtures = load("src/content/fixtures.js");
  const html = renderAboutPage(fixtures);

  assert.match(html, /data-section="about-overview"/);
  assert.match(html, /Mission/);
  assert.match(html, /Vision/);
  assert.match(html, /Organisation/);
  assert.match(html, /data-state-note="about-empty-stub"/);
  assert.match(html, /alt="Babas and Brasse publication image placeholder"/);
});

test("About renderer includes editorial pillars from launch categories", () => {
  const { renderAboutPage } = load("src/render/about.js");
  const fixtures = load("src/content/fixtures.js");
  const html = renderAboutPage(fixtures);

  assert.match(html, /data-section="editorial-pillars"/);
  assert.match(html, /Theatre/);
  assert.match(html, /Books/);
  assert.match(html, /Culture/);
  assert.match(html, /Essays/);
  assert.match(html, /Interviews/);
});

test("About renderer includes route cards and newsletter footer paths", () => {
  const { renderAboutPage } = load("src/render/about.js");
  const fixtures = load("src/content/fixtures.js");
  const html = renderAboutPage(fixtures);

  assert.match(html, /data-section="about-route-cards"/);
  assert.match(html, /href="\/creative-team"/);
  assert.match(html, /href="\/contributors"/);
  assert.match(html, /href="\/contact"/);
  assert.match(html, /data-section="newsletter-footer"/);
  assert.match(html, /your@email.com/);
  assert.match(html, /data-state-note="newsletter-invalid"/);
  assert.match(html, /data-state-note="newsletter-success"/);
});

test("About page artifact is generated from the renderer contract", () => {
  const html = read("src/pages/about.html");

  assert.match(html, /data-page="about"/);
  assert.match(html, /data-route="\/about"/);
  assert.match(html, /data-generated="about-renderer"/);
  assert.match(html, /data-section="about-overview"/);
  assert.match(html, /data-section="editorial-pillars"/);
  assert.match(html, /data-section="about-route-cards"/);
  assert.match(html, /data-section="newsletter-footer"/);
});
