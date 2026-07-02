const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");

const root = path.resolve(__dirname, "..");

const publicRoutes = [
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

const adminRoutes = [
  "admin-dashboard.html",
  "article-management.html",
  "profile-media-management.html",
  "comments-reviews-moderation.html",
  "contact-submissions.html"
];

const supportRoutes = [
  "auth-login.html",
  "password-reset.html",
  "not-found.html",
  "server-error.html",
  "offline-maintenance.html",
  "media-upload-modal.html",
  "article-editor-workflow.html",
  "mobile-wireframes.html"
];

const allScreens = ["mvp-wireframes.html", ...publicRoutes, ...adminRoutes, ...supportRoutes];
const sharedScreens = allScreens.filter((file) => file !== "index.html");

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function exists(file) {
  assert.ok(fs.existsSync(path.join(root, file)), `${file} should exist`);
}

function countMatches(text, pattern) {
  return (text.match(pattern) || []).length;
}

function assertIncludes(text, expected, label) {
  assert.ok(text.includes(expected), `${label} should include ${expected}`);
}

exists("DESIGN.md");
exists("README.md");
exists("wireframe-system.css");
exists("wireframe-system.js");
exists("critique.json");
exists("package.json");

for (const file of allScreens) {
  exists(file);
  const html = read(file);
  assertIncludes(html, "<!doctype html>", file);
  assertIncludes(html, "<main class=\"workspace\"", file);
  assertIncludes(html, "spec-panel", file);
  assert.ok(countMatches(html, /class="pin/g) >= 5, `${file} should include at least five annotation pins`);
  assert.ok(countMatches(html, /class="spec-row/g) >= 5, `${file} should include at least five spec rows`);
  assert.ok(countMatches(html, /data-od-id=/g) >= 8, `${file} should preserve Open Design ids`);
}

for (const file of sharedScreens) {
  const html = read(file);
  assertIncludes(html, "wireframe-system.css", file);
  assertIncludes(html, "wireframe-system.js", file);
}

const overview = read("mvp-wireframes.html");
for (const route of [...publicRoutes, ...adminRoutes, ...supportRoutes]) {
  assertIncludes(overview, `href="${route}"`, `mvp-wireframes.html route link`);
  exists(`${route}.artifact.json`);
  const artifact = JSON.parse(read(`${route}.artifact.json`));
  assert.equal(artifact.status, "complete", `${route}.artifact.json should be complete`);
  assert.equal(artifact.entry, route, `${route}.artifact.json entry should match`);
}

const critique = JSON.parse(read("critique.json"));
assert.equal(critique.score, 5, "critique score should remain 5");
assert.equal(critique.axes.coverage.score, 5, "coverage score should remain 5");
assert.equal(critique.axes.states_and_accessibility.score, 5, "states and accessibility score should remain 5");

const css = read("wireframe-system.css");
assertIncludes(css, "@media (max-width: 1120px)", "wireframe-system.css");
assertIncludes(css, "prefers-reduced-motion", "wireframe-system.css");

const js = read("wireframe-system.js");
assertIncludes(js, "activateSpec", "wireframe-system.js");
assertIncludes(js, "ArrowRight", "wireframe-system.js");
assertIncludes(js, "aria-pressed", "wireframe-system.js");

console.log(`Wireframe validation passed: ${allScreens.length} screens, ${publicRoutes.length} public routes, ${adminRoutes.length} admin routes, ${supportRoutes.length} support screens.`);
