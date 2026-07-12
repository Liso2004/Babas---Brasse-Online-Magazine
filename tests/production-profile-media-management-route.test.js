const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const root = path.resolve(__dirname, "..");

function filePath(relativePath) {
  return path.join(root, relativePath);
}

function read(relativePath) {
  return fs.readFileSync(filePath(relativePath), "utf8").replace(/^\uFEFF/, "");
}

function exists(relativePath) {
  return fs.existsSync(filePath(relativePath));
}

async function loadProfileMediaModel() {
  const modulePath = filePath("apps/web/src/pages/profileMediaManagementRouteModel.js");
  assert.ok(fs.existsSync(modulePath), "apps/web/src/pages/profileMediaManagementRouteModel.js should exist");
  return import(pathToFileURL(modulePath).href);
}

function loadFixtures() {
  delete require.cache[require.resolve(filePath("src/content/fixtures.js"))];
  return require(filePath("src/content/fixtures.js"));
}

test("production Profile Media route model preserves the protected people and media workflow", async () => {
  const { buildProfileMediaManagementRouteModel } = await loadProfileMediaModel();
  const model = buildProfileMediaManagementRouteModel(loadFixtures());

  assert.equal(model.pageId, "profile-media-management");
  assert.equal(model.generatedFrom, "profile-media-management-route-model");
  assert.equal(model.route.path, "/admin/profiles-media");
  assert.equal(model.route.prototypeFile, "src/pages/admin/profile-media-management.html");
  assert.equal(model.auth.required, true);
  assert.equal(model.auth.role, "admin");
  assert.match(model.hero.title, /People and media publishing readiness/i);
});

test("production Profile Media model includes contributor and creative team profile rows", async () => {
  const { buildProfileMediaManagementRouteModel, getProfileRows } = await loadProfileMediaModel();
  const fixtures = loadFixtures();
  const rows = getProfileRows(fixtures);
  const model = buildProfileMediaManagementRouteModel(fixtures);

  assert.equal(rows.length, fixtures.profiles.length);
  assert.equal(rows.filter((row) => row.type === "creative_team").length, 2);
  assert.equal(rows.filter((row) => row.type === "contributor").length, 1);
  assert.ok(rows.every((row) => row.completeness === "Complete"));
  assert.deepEqual(model.sections.profileManagement.groups.map((group) => group.key), ["contributors", "creative-team"]);
  assert.match(JSON.stringify(model.sections.profileManagement.groups), /Visceral Contributor/);
  assert.match(JSON.stringify(model.sections.profileManagement.groups), /Zubayr Charles/);
});

test("production Profile Media model includes media metadata usage and readiness", async () => {
  const { buildProfileMediaManagementRouteModel, getMediaRows } = await loadProfileMediaModel();
  const fixtures = loadFixtures();
  const rows = getMediaRows(fixtures);
  const model = buildProfileMediaManagementRouteModel(fixtures);

  assert.equal(rows.length, fixtures.mediaItems.length);
  assert.ok(rows.every((row) => row.publishReady === true));
  assert.ok(rows.every((row) => row.usageCount >= 1));
  assert.deepEqual(model.sections.mediaLibrary.columns, ["image", "alt-text", "caption", "credit", "category", "usage", "publish-readiness"]);
  assert.match(JSON.stringify(model.sections.mediaLibrary.items), /Opening Banner Placeholder/);
  assert.match(JSON.stringify(model.sections.mediaLibrary.items), /Babas and Brasse opening banner placeholder/);
});

test("production Profile Media model includes fixture-derived stats and upload form", async () => {
  const { buildProfileMediaManagementRouteModel, getProfileMediaStats } = await loadProfileMediaModel();
  const fixtures = loadFixtures();
  const stats = getProfileMediaStats(fixtures);
  const model = buildProfileMediaManagementRouteModel(fixtures);

  assert.deepEqual(stats, {
    totalProfiles: 3,
    contributors: 1,
    creativeTeam: 2,
    mediaItems: 3,
    publishReadyMedia: 3,
    incompleteMedia: 0
  });
  assert.deepEqual(model.sections.stats.items.map((metric) => metric.key), Object.keys(stats));
  assert.deepEqual(model.sections.upload.fields.map((field) => field.name), ["file", "altText", "caption", "credit", "categoryId"]);
  assert.equal(model.sections.upload.dropzone.id, "media-upload");
  assert.match(model.sections.upload.helpText, /keyboard file input fallback/i);
});

test("production Profile Media model exposes upload metadata and permission states", async () => {
  const { buildProfileMediaManagementRouteModel } = await loadProfileMediaModel();
  const model = buildProfileMediaManagementRouteModel(loadFixtures());

  assert.deepEqual(model.sections.states.notes, ["media-uploading", "media-missing-metadata", "media-file-error", "media-empty-library", "permission-denied"]);
  assert.deepEqual(model.sections.states.items, ["uploading", "missing-metadata", "file-error", "empty-library", "permission-denied"]);
  assert.equal(model.sections.states.permissionHref, "/admin/login");
  assert.match(model.sections.states.metadataCopy, /alt text, caption, and credit/i);
});

test("React-ready ProfileMediaManagementPage component is scaffolded from the route model", () => {
  assert.ok(exists("apps/web/src/pages/ProfileMediaManagementPage.jsx"), "ProfileMediaManagementPage.jsx should exist");
  const component = read("apps/web/src/pages/ProfileMediaManagementPage.jsx");
  const app = read("apps/web/src/App.jsx");

  assert.match(component, /export function ProfileMediaManagementPage/);
  assert.match(component, /buildProfileMediaManagementRouteModel/);
  assert.match(component, /data-page="profile-media-management"/);
  assert.match(component, /data-section="profile-media-intro"/);
  assert.match(component, /data-section="profile-media-stats"/);
  assert.match(component, /data-section="profile-management"/);
  assert.match(component, /data-section="media-library"/);
  assert.match(component, /data-section="upload-select"/);
  assert.match(component, /data-section="profile-media-states"/);
  assert.match(app, /ProfileMediaManagementPage/);
  assert.match(app, /route\.id === "profile-media-management"/);
});

test("Profile Media route migration handoff is documented and wired into scripts", () => {
  const rootPkg = JSON.parse(read("package.json"));
  const runTests = read("tests/run-tests.js");
  const readme = read("apps/web/README.md");
  const planStatus = read("docs/PLAN_STATUS.md");

  assert.ok(rootPkg.scripts["test:production-profile-media-management"]);
  assert.match(runTests, /production-profile-media-management-route\.test\.js/);
  assert.match(readme, /Profile \/ Media Management route migration/i);
  assert.match(planStatus, /Profile \/ Media Management route migration/i);
});
