const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

function filePath(relativePath) {
  return path.join(root, relativePath);
}

function exists(relativePath) {
  return fs.existsSync(filePath(relativePath));
}

function read(relativePath) {
  return fs.readFileSync(filePath(relativePath), "utf8");
}

function readJson(relativePath) {
  return JSON.parse(read(relativePath));
}

test("documentation captures the MVP, Open Design status, and TDD workflow", () => {
  const docs = [
    "docs/TDD_WORKFLOW.md",
    "docs/WIREFRAME_PLAN.md",
    "docs/SCREEN_SCOPE.md",
    "docs/OPEN_DESIGN_STATUS.md",
    "docs/TESTING_LOG.md"
  ];

  for (const doc of docs) {
    assert.ok(exists(doc), `${doc} should exist`);
  }

  assert.match(read("docs/TDD_WORKFLOW.md"), /test-driven development/i);
  assert.match(read("docs/WIREFRAME_PLAN.md"), /July 31, 2026/i);
  assert.match(read("docs/OPEN_DESIGN_STATUS.md"), /fetch failed/i);
});

test("wireframe specification lists every required public and admin screen", () => {
  const spec = readJson("wireframes/wireframe-spec.json");
  const publicIds = spec.publicScreens.map((screen) => screen.id);
  const adminIds = spec.adminScreens.map((screen) => screen.id);

  assert.deepEqual(publicIds, [
    "home",
    "about",
    "creative-team",
    "contributors",
    "visceral-mag",
    "article-detail",
    "categories-search",
    "featured-media",
    "contact"
  ]);

  assert.deepEqual(adminIds, [
    "admin-dashboard",
    "article-management",
    "profile-media-management",
    "comments-reviews-moderation",
    "contact-submissions"
  ]);

  assert.equal(spec.launchDeadline, "2026-07-31");
});

test("browser wireframe artifact exists and links its stylesheet", () => {
  assert.ok(exists("wireframes/index.html"), "wireframes/index.html should exist");
  assert.ok(exists("wireframes/styles.css"), "wireframes/styles.css should exist");

  const html = read("wireframes/index.html");
  assert.match(html, /<link rel="stylesheet" href="styles\.css">/);
  assert.match(html, /Babas &amp; Brasse Online Magazine MVP Wireframes/);
});

test("browser wireframe includes every screen from the specification", () => {
  const spec = readJson("wireframes/wireframe-spec.json");
  const html = read("wireframes/index.html");

  for (const screen of [...spec.publicScreens, ...spec.adminScreens]) {
    assert.match(
      html,
      new RegExp(`data-screen="${screen.id}"`),
      `${screen.label} should be represented with data-screen="${screen.id}"`
    );
    assert.match(html, new RegExp(screen.route.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("wireframe captures public navigation, admin navigation, and required states", () => {
  const spec = readJson("wireframes/wireframe-spec.json");
  const html = read("wireframes/index.html");

  assert.match(html, /data-nav="public"/);
  assert.match(html, /data-nav="admin"/);
  assert.match(html, /data-flow="reader-discovery"/);
  assert.match(html, /data-flow="admin-publishing"/);

  for (const state of spec.requiredStates) {
    assert.match(html, new RegExp(`data-state="${state}"`), `${state} state should be shown`);
  }
});
