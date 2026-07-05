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

async function loadCreativeTeamModel() {
  const modulePath = filePath("apps/web/src/pages/creativeTeamRouteModel.js");
  assert.ok(fs.existsSync(modulePath), "apps/web/src/pages/creativeTeamRouteModel.js should exist");
  return import(pathToFileURL(modulePath).href);
}

function loadFixtures() {
  delete require.cache[require.resolve(filePath("src/content/fixtures.js"))];
  return require(filePath("src/content/fixtures.js"));
}

test("production Creative Team route model preserves the profile page surface", async () => {
  const { buildCreativeTeamRouteModel } = await loadCreativeTeamModel();
  const model = buildCreativeTeamRouteModel(loadFixtures());

  assert.equal(model.pageId, "creative-team");
  assert.equal(model.generatedFrom, "creative-team-route-model");
  assert.equal(model.route.path, "/creative-team");
  assert.equal(model.route.prototypeFile, "src/pages/creative-team.html");
  assert.match(model.hero.title, /people shaping Babas & Brasse/i);
  assert.match(model.editorialRoleNote.body, /public role, short bio, image alt text, and social-link labels/i);
});

test("production Creative Team model includes creative team profiles only", async () => {
  const { buildCreativeTeamRouteModel, getCreativeTeamProfiles } = await loadCreativeTeamModel();
  const fixtures = loadFixtures();
  const profiles = getCreativeTeamProfiles(fixtures);
  const model = buildCreativeTeamRouteModel(fixtures);
  const serialized = JSON.stringify(model);

  assert.deepEqual(profiles.map((profile) => profile.slug), ["zubayr-charles", "zoe-petersen"]);
  assert.deepEqual(model.sections.teamGrid.items.map((profile) => profile.slug), ["zubayr-charles", "zoe-petersen"]);
  assert.ok(model.sections.teamGrid.items.every((profile) => profile.type === "creative_team"));
  assert.doesNotMatch(serialized, /Visceral Contributor/);
  assert.doesNotMatch(serialized, /"type":"contributor"/);
});

test("production Creative Team profile cards include required anatomy and state hooks", async () => {
  const { buildCreativeTeamRouteModel } = await loadCreativeTeamModel();
  const model = buildCreativeTeamRouteModel(loadFixtures());
  const first = model.sections.teamGrid.items[0];

  assert.equal(first.name, "Zubayr Charles");
  assert.equal(first.role, "Client / Product Owner");
  assert.match(first.shortBio, /Approves scope/);
  assert.equal(first.image.url, "/media/profile-placeholder.jpg");
  assert.equal(first.image.altText, "Portrait placeholder for Zubayr Charles");
  assert.deepEqual(first.stateNotes, ["social-links-empty"]);
  assert.deepEqual(model.sections.states.notes, ["team-loading", "team-error"]);
});

test("production Creative Team model exposes empty state and footer paths", async () => {
  const { buildCreativeTeamRouteModel } = await loadCreativeTeamModel();
  const fixtures = loadFixtures();
  const model = buildCreativeTeamRouteModel({ ...fixtures, profiles: fixtures.profiles.filter((profile) => profile.type !== "creative_team") });

  assert.equal(model.sections.teamGrid.state, "empty-team");
  assert.equal(model.sections.teamGrid.items.length, 0);
  assert.equal(model.sections.teamGrid.heading, "No public creative team profiles are published yet");
  assert.deepEqual(model.footer.links.map((link) => link.href), ["/contributors", "/contact", "/about"]);
});

test("React-ready CreativeTeamPage component is scaffolded from the route model", () => {
  assert.ok(exists("apps/web/src/pages/CreativeTeamPage.jsx"), "CreativeTeamPage.jsx should exist");
  const component = read("apps/web/src/pages/CreativeTeamPage.jsx");
  const app = read("apps/web/src/App.jsx");

  assert.match(component, /export function CreativeTeamPage/);
  assert.match(component, /buildCreativeTeamRouteModel/);
  assert.match(component, /data-page="creative-team"/);
  assert.match(component, /data-section="team-intro"/);
  assert.match(component, /data-section="editorial-role-note"/);
  assert.match(component, /data-section="team-grid"/);
  assert.match(component, /data-section="team-states"/);
  assert.match(component, /data-section="team-footer"/);
  assert.match(component, /data-state="empty-team"/);
  assert.match(app, /CreativeTeamPage/);
  assert.match(app, /route\.id === "creative-team"/);
});

test("Creative Team route migration handoff is documented and wired into scripts", () => {
  const rootPkg = JSON.parse(read("package.json"));
  const runTests = read("tests/run-tests.js");
  const readme = read("apps/web/README.md");
  const planStatus = read("docs/PLAN_STATUS.md");

  assert.ok(rootPkg.scripts["test:production-creative-team"]);
  assert.match(runTests, /production-creative-team-route\.test\.js/);
  assert.match(readme, /Creative Team route migration/i);
  assert.match(planStatus, /Creative Team route migration/i);
});
