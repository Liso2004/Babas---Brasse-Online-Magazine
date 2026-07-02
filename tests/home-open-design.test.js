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

test("Open Design remaining-wireframes prompt is saved for the user", () => {
  const prompt = read("docs/OPEN_DESIGN_PROMPT_REMAINING_WIREFRAMES.md");

  assert.match(prompt, /Create annotated low-fidelity wireframes/i);
  assert.match(prompt, /Required public screens/i);
  assert.match(prompt, /Required admin screens/i);
  assert.match(prompt, /Comments\/Reviews Moderation/i);
  assert.match(prompt, /Contact Submissions/i);
});

test("Home renderer implements the Open Design landing nav contract", () => {
  const { renderHomePage } = load("src/render/home.js");
  const fixtures = load("src/content/fixtures.js");
  const html = renderHomePage(fixtures);

  assert.match(html, /data-od-contract="landing-home"/);
  assert.match(html, /data-section="landing-nav"/);
  assert.match(html, /data-nav-height="76"/);
  assert.match(html, /B&amp;B/);
  assert.match(html, /data-nav-link="theatre"/);
  assert.match(html, /data-nav-link="books"/);
  assert.match(html, /data-nav-link="essays"/);
  assert.match(html, /data-nav-link="opinion"/);
  assert.match(html, /data-nav-link="culture"/);
  assert.match(html, /placeholder="Search articles"/);
  assert.match(html, /Subscribe/);
});

test("Home renderer implements the Open Design theatre hero and section rail", () => {
  const { renderHomePage } = load("src/render/home.js");
  const fixtures = load("src/content/fixtures.js");
  const html = renderHomePage(fixtures);

  assert.match(html, /data-section="lead-story"/);
  assert.match(html, /data-hero-topic="theatre"/);
  assert.match(html, /Mariska/);
  assert.match(html, /May 22 2026/);
  assert.match(html, /8-min read/);
  assert.match(html, /data-image-ratio="16:10"/);
  assert.match(html, /data-section="section-rail"/);

  for (const section of ["Theatre", "Books", "Essays", "Opinion", "Culture"]) {
    assert.match(html, new RegExp(`data-section-chip="${section.toLowerCase()}"`));
    assert.match(html, new RegExp(section));
  }
});

test("Home renderer implements recent article teasers and newsletter/footer contract", () => {
  const { renderHomePage } = load("src/render/home.js");
  const fixtures = load("src/content/fixtures.js");
  const html = renderHomePage(fixtures);

  assert.match(html, /data-section="recent-article-teasers"/);
  assert.match(html, /data-teaser-category="books"/);
  assert.match(html, /data-teaser-category="essays"/);
  assert.match(html, /data-teaser-category="opinion"/);
  assert.match(html, /data-section="newsletter-footer"/);
  assert.match(html, /Stay Connected/);
  assert.match(html, /type="email"/);
  assert.match(html, /placeholder="your@email.com"/);
  assert.match(html, /href="\/contact"/);
  assert.match(html, /href="\/submit-writing"/);
});

test("Home renderer documents Open Design responsive and state handoff notes", () => {
  const { renderHomePage } = load("src/render/home.js");
  const fixtures = load("src/content/fixtures.js");
  const html = renderHomePage(fixtures);

  assert.match(html, /data-responsive="desktop-3-up tablet-2-up mobile-1-up"/);
  assert.match(html, /data-overflow="section-rail-horizontal"/);
  assert.match(html, /data-state-note="search-loading"/);
  assert.match(html, /data-state-note="search-no-results"/);
  assert.match(html, /data-state-note="newsletter-invalid"/);
  assert.match(html, /data-state-note="newsletter-success"/);
  assert.match(html, /data-state-note="submit-error"/);
});

test("Home page artifact contains the Open Design landing implementation", () => {
  const html = read("src/pages/home.html");

  assert.match(html, /data-od-contract="landing-home"/);
  assert.match(html, /data-section="landing-nav"/);
  assert.match(html, /data-section="section-rail"/);
  assert.match(html, /data-section="recent-article-teasers"/);
  assert.match(html, /data-section="newsletter-footer"/);
});
