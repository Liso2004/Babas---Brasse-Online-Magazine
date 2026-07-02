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

test("Phase 3 Contributors plan documents the contributor discovery slice", () => {
  const plan = read("docs/PHASE3_CONTRIBUTORS_PLAN.md");

  assert.match(plan, /Contributors/i);
  assert.match(plan, /Search\/filter/i);
  assert.match(plan, /profile card/i);
  assert.match(plan, /published works/i);
  assert.match(plan, /exclude drafts/i);
  assert.match(plan, /loading/i);
  assert.match(plan, /no-results/i);
  assert.match(plan, /reset-filter/i);
  assert.match(plan, /fetch error/i);
});

test("Contributors renderer exports helpers and preserves the final wireframe contract", () => {
  const { renderContributorsPage, getContributorProfiles, getPublishedWorksForContributor } = load("src/render/contributors.js");
  const fixtures = load("src/content/fixtures.js");
  const html = renderContributorsPage(fixtures);

  assert.equal(typeof renderContributorsPage, "function");
  assert.equal(typeof getContributorProfiles, "function");
  assert.equal(typeof getPublishedWorksForContributor, "function");
  assert.match(html, /data-page="contributors"/);
  assert.match(html, /data-route="\/contributors"/);
  assert.match(html, /data-generated="contributors-renderer"/);
  assert.match(html, /data-wireframe-source="contributors.html"/);
  assert.match(html, /data-section="landing-nav"/);
});

test("Contributors renderer shows contributor profiles only", () => {
  const { renderContributorsPage, getContributorProfiles } = load("src/render/contributors.js");
  const fixtures = load("src/content/fixtures.js");
  const contributorProfiles = getContributorProfiles(fixtures);
  const html = renderContributorsPage(fixtures);

  assert.deepEqual(contributorProfiles.map((profile) => profile.slug), ["visceral-contributor"]);
  assert.match(html, /Visceral Contributor/);
  assert.match(html, /data-profile-type="contributor"/);
  assert.doesNotMatch(html, /Zubayr Charles/);
  assert.doesNotMatch(html, /Zoe Petersen/);
  assert.doesNotMatch(html, /data-profile-type="creative_team"/);
});

test("Contributors renderer includes search and category filters from the wireframe", () => {
  const { renderContributorsPage } = load("src/render/contributors.js");
  const fixtures = load("src/content/fixtures.js");
  const html = renderContributorsPage(fixtures);

  assert.match(html, /data-section="contributors-tools"/);
  assert.match(html, /type="search"/);
  assert.match(html, /placeholder="Search contributors"/);
  assert.match(html, /data-filter-category="theatre"/);
  assert.match(html, /data-filter-category="books"/);
  assert.match(html, /data-filter-category="essays"/);
  assert.match(html, /aria-pressed="false"/);
});

test("Contributors renderer links published works and excludes drafts", () => {
  const { renderContributorsPage, getPublishedWorksForContributor } = load("src/render/contributors.js");
  const fixtures = load("src/content/fixtures.js");
  const works = getPublishedWorksForContributor(fixtures, "visceral-contributor");
  const html = renderContributorsPage(fixtures);

  assert.deepEqual(works.map((article) => article.slug), ["send-a-text-before-you-knock", "artist-interview-placeholder"]);
  assert.match(html, /data-section="published-works"/);
  assert.match(html, /Send A Text Before You Knock/);
  assert.match(html, /Artist Interview Placeholder/);
  assert.doesNotMatch(html, /Culture Review Placeholder/);
  assert.doesNotMatch(html, /data-status="draft"/);
});

test("Contributors renderer includes loading, no-results, reset-filter, and error states", () => {
  const { renderContributorsPage } = load("src/render/contributors.js");
  const fixtures = load("src/content/fixtures.js");
  const emptyHtml = renderContributorsPage({ ...fixtures, profiles: fixtures.profiles.filter((profile) => profile.type !== "contributor") });
  const html = renderContributorsPage(fixtures);

  assert.match(html, /data-section="contributors-states"/);
  assert.match(html, /data-state-note="contributors-loading"/);
  assert.match(html, /data-state-note="contributors-error"/);
  assert.match(emptyHtml, /data-state="no-results"/);
  assert.match(emptyHtml, /No contributors match this view/);
  assert.match(emptyHtml, /data-action="reset-filter"/);
  assert.match(emptyHtml, /href="\/contributors"/);
});

test("Contributors page artifact is generated from the renderer contract", () => {
  const html = read("src/pages/contributors.html");

  assert.match(html, /data-page="contributors"/);
  assert.match(html, /data-route="\/contributors"/);
  assert.match(html, /data-generated="contributors-renderer"/);
  assert.match(html, /data-section="contributors-tools"/);
  assert.match(html, /data-section="contributors-grid"/);
  assert.match(html, /data-section="published-works"/);
  assert.match(html, /data-section="contributors-states"/);
});
