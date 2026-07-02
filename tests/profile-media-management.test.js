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

test("Phase 4 Profile / Media Management plan documents the profile and media workflow", () => {
  const plan = read("docs/PHASE4_PROFILE_MEDIA_MANAGEMENT_PLAN.md");

  assert.match(plan, /Profile \/ Media Management/i);
  assert.match(plan, /role-protected access/i);
  assert.match(plan, /contributors/i);
  assert.match(plan, /Creative Team/i);
  assert.match(plan, /profile completeness/i);
  assert.match(plan, /media library/i);
  assert.match(plan, /alt text/i);
  assert.match(plan, /caption/i);
  assert.match(plan, /credit/i);
  assert.match(plan, /uploading/i);
  assert.match(plan, /permission/i);
});

test("Profile / Media renderer exports helpers and preserves the final wireframe contract", () => {
  const { renderProfileMediaManagementPage, getProfileRows, getMediaRows, getProfileMediaStats } = load("src/render/profile-media-management.js");
  const fixtures = load("src/content/fixtures.js");
  const html = renderProfileMediaManagementPage(fixtures);

  assert.equal(typeof renderProfileMediaManagementPage, "function");
  assert.equal(typeof getProfileRows, "function");
  assert.equal(typeof getMediaRows, "function");
  assert.equal(typeof getProfileMediaStats, "function");
  assert.match(html, /data-page="profile-media-management"/);
  assert.match(html, /data-route="\/admin\/profiles-media"/);
  assert.match(html, /data-area="admin"/);
  assert.match(html, /data-generated="profile-media-management-renderer"/);
  assert.match(html, /data-wireframe-source="profile-media-management.html"/);
  assert.match(html, /data-auth-required="editor"/);
});

test("Profile / Media profile rows include contributors and creative team with completeness", () => {
  const { getProfileRows, renderProfileMediaManagementPage } = load("src/render/profile-media-management.js");
  const fixtures = load("src/content/fixtures.js");
  const rows = getProfileRows(fixtures);
  const html = renderProfileMediaManagementPage(fixtures);

  assert.equal(rows.length, fixtures.profiles.length);
  assert.equal(rows.filter((row) => row.type === "creative_team").length, 2);
  assert.equal(rows.filter((row) => row.type === "contributor").length, 1);
  assert.ok(rows.every((row) => row.completeness === "Complete"));

  assert.match(html, /data-section="profile-management"/);
  assert.match(html, /data-group="contributors"/);
  assert.match(html, /data-group="creative-team"/);
  assert.match(html, /data-column="name"/);
  assert.match(html, /data-column="role"/);
  assert.match(html, /data-column="status"/);
  assert.match(html, /data-column="profile-completeness"/);
  assert.match(html, /Zubayr Charles/);
  assert.match(html, /Visceral Contributor/);
  assert.match(html, /href="\/admin\/profiles\/visceral-contributor\/edit"/);
});

test("Profile / Media media rows expose metadata, usage, and readiness", () => {
  const { getMediaRows, renderProfileMediaManagementPage } = load("src/render/profile-media-management.js");
  const fixtures = load("src/content/fixtures.js");
  const rows = getMediaRows(fixtures);
  const html = renderProfileMediaManagementPage(fixtures);

  assert.equal(rows.length, fixtures.mediaItems.length);
  assert.ok(rows.every((row) => row.publishReady === true));
  assert.ok(rows.every((row) => row.usageCount >= 1));

  assert.match(html, /data-section="media-library"/);
  assert.match(html, /data-column="image"/);
  assert.match(html, /data-column="alt-text"/);
  assert.match(html, /data-column="caption"/);
  assert.match(html, /data-column="credit"/);
  assert.match(html, /data-column="category"/);
  assert.match(html, /data-column="usage"/);
  assert.match(html, /data-column="publish-readiness"/);
  assert.match(html, /Opening Banner Placeholder/);
  assert.match(html, /Babas and Brasse opening banner placeholder/);
  assert.match(html, /Hero banner slot for the graphic designer asset/);
  assert.match(html, /Client \/ Designer/);
});

test("Profile / Media stats are fixture-derived", () => {
  const { getProfileMediaStats, renderProfileMediaManagementPage } = load("src/render/profile-media-management.js");
  const fixtures = load("src/content/fixtures.js");
  const stats = getProfileMediaStats(fixtures);
  const html = renderProfileMediaManagementPage(fixtures);

  assert.deepEqual(stats, {
    totalProfiles: 3,
    contributors: 1,
    creativeTeam: 2,
    mediaItems: 3,
    publishReadyMedia: 3,
    incompleteMedia: 0
  });

  for (const key of Object.keys(stats)) {
    assert.match(html, new RegExp(`data-metric="${key}"`));
    assert.match(html, new RegExp(`data-value="${stats[key]}"`));
  }
});

test("Profile / Media upload form collects file, metadata, credit, and category", () => {
  const { renderProfileMediaManagementPage } = load("src/render/profile-media-management.js");
  const fixtures = load("src/content/fixtures.js");
  const html = renderProfileMediaManagementPage(fixtures);

  assert.match(html, /data-section="upload-select"/);
  assert.match(html, /for="media-file"/);
  assert.match(html, /type="file"/);
  assert.match(html, /for="media-alt-text"/);
  assert.match(html, /for="media-caption"/);
  assert.match(html, /for="media-credit"/);
  assert.match(html, /for="media-category"/);
  assert.match(html, /data-dropzone="media-upload"/);
  assert.match(html, /keyboard file input fallback/i);
});

test("Profile / Media includes required states and permission handoff", () => {
  const { renderProfileMediaManagementPage } = load("src/render/profile-media-management.js");
  const fixtures = load("src/content/fixtures.js");
  const html = renderProfileMediaManagementPage(fixtures);

  assert.match(html, /data-section="profile-media-states"/);
  assert.match(html, /data-state-note="media-uploading"/);
  assert.match(html, /data-state-note="media-missing-metadata"/);
  assert.match(html, /data-state-note="media-file-error"/);
  assert.match(html, /data-state-note="media-empty-library"/);
  assert.match(html, /data-state-note="permission-denied"/);
  assert.match(html, /href="\/admin\/login"/);
});

test("Profile / Media Management page artifact is generated from the renderer contract", () => {
  const html = read("src/pages/admin/profile-media-management.html");

  assert.match(html, /data-page="profile-media-management"/);
  assert.match(html, /data-route="\/admin\/profiles-media"/);
  assert.match(html, /data-generated="profile-media-management-renderer"/);
  assert.match(html, /data-section="profile-management"/);
  assert.match(html, /data-section="media-library"/);
  assert.match(html, /data-section="upload-select"/);
  assert.match(html, /data-section="profile-media-states"/);
});
