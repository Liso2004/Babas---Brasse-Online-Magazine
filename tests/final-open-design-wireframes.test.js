const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const designRoot = path.join(root, "designs", "open-design-wireframes");

const publicScreens = [
  "index.html",
  "about.html",
  "creative-team.html",
  "contributors.html",
  "visceral-mag-archive.html",
  "article-detail.html",
  "categories-search.html",
  "featured-media.html",
  "contact.html"
];

const adminScreens = [
  "admin-dashboard.html",
  "article-management.html",
  "profile-media-management.html",
  "comments-reviews-moderation.html",
  "contact-submissions.html"
];

const supportScreens = [
  "auth-login.html",
  "password-reset.html",
  "not-found.html",
  "server-error.html",
  "offline-maintenance.html",
  "media-upload-modal.html",
  "article-editor-workflow.html",
  "mobile-wireframes.html"
];

const allScreens = ["mvp-wireframes.html", ...publicScreens, ...adminScreens, ...supportScreens];

function filePath(relativePath) {
  return path.join(root, relativePath);
}

function designPath(relativePath) {
  return path.join(designRoot, relativePath);
}

function readDesign(relativePath) {
  return fs.readFileSync(designPath(relativePath), "utf8");
}

function existsDesign(relativePath) {
  assert.ok(fs.existsSync(designPath(relativePath)), `${relativePath} should exist in final design handoff`);
}

function count(text, pattern) {
  return (text.match(pattern) || []).length;
}

test("final Open Design wireframe handoff is documented in the Magazine project", () => {
  const doc = fs.readFileSync(filePath("docs/FINAL_OPEN_DESIGN_WIREFRAME_HANDOFF.md"), "utf8");

  assert.match(doc, /complete Open Design annotated wireframe set/i);
  assert.match(doc, /designs\/open-design-wireframes/i);
  assert.match(doc, /not final production UI/i);
  assert.match(doc, /published and approved content/i);
  assert.match(doc, /Support Wireframes/i);
});

test("final Open Design wireframe folder includes shared handoff and validation files", () => {
  for (const file of ["DESIGN.md", "README.md", "package.json", "critique.json", "wireframe-system.css", "wireframe-system.js", "scripts/validate-wireframes.js"]) {
    existsDesign(file);
  }
});

test("final Open Design wireframe folder includes all required public, admin, and support screens", () => {
  for (const file of allScreens) {
    existsDesign(file);
    const html = readDesign(file);

    assert.match(html, /<main class="workspace"/);
    assert.match(html, /spec-panel/);
    assert.ok(count(html, /class="pin/g) >= 5, `${file} should include annotation pins`);
    assert.ok(count(html, /class="spec-row/g) >= 5, `${file} should include annotation spec rows`);
    assert.ok(count(html, /data-od-id=/g) >= 8, `${file} should preserve Open Design identifiers`);
  }
});

test("final route overview links to every wireframe route", () => {
  const overview = readDesign("mvp-wireframes.html");

  for (const file of [...publicScreens, ...adminScreens, ...supportScreens]) {
    assert.match(overview, new RegExp(`href="${file}"`));
  }
});

test("final support wireframes cover auth, errors, admin subflows, and mobile comps", () => {
  const expectations = new Map([
    ["auth-login.html", /Admin Login|role check|invalid credentials/i],
    ["password-reset.html", /Password Reset|token|neutral/i],
    ["not-found.html", /404|Page not found|removed article/i],
    ["server-error.html", /500|Server problem|retry/i],
    ["offline-maintenance.html", /Offline|Maintenance|cached content/i],
    ["media-upload-modal.html", /Media Upload Modal|Alt text|focus return/i],
    ["article-editor-workflow.html", /Article Editor Workflow|SEO|Publish/i],
    ["mobile-wireframes.html", /Mobile Wireframe Comps|touch targets|360/i]
  ]);

  for (const [file, pattern] of expectations) {
    assert.match(readDesign(file), pattern);
  }
});

test("final Open Design artifacts are marked complete and critique remains passing", () => {
  for (const file of [...publicScreens, ...adminScreens, ...supportScreens, "mvp-wireframes.html"]) {
    const artifact = JSON.parse(readDesign(`${file}.artifact.json`));
    assert.equal(artifact.status, "complete");
    assert.equal(artifact.entry, file);
  }

  const critique = JSON.parse(readDesign("critique.json"));
  assert.equal(critique.score, 5);
  assert.equal(critique.axes.coverage.score, 5);
  assert.equal(critique.axes.states_and_accessibility.score, 5);
});
