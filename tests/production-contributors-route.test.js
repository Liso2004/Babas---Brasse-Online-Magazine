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

async function loadContributorsModel() {
  const modulePath = filePath("apps/web/src/pages/contributorsRouteModel.js");
  assert.ok(fs.existsSync(modulePath), "apps/web/src/pages/contributorsRouteModel.js should exist");
  return import(pathToFileURL(modulePath).href);
}

function loadFixtures() {
  delete require.cache[require.resolve(filePath("src/content/fixtures.js"))];
  return require(filePath("src/content/fixtures.js"));
}

test("production Contributors route model preserves the contributor directory surface", async () => {
  const { buildContributorsRouteModel } = await loadContributorsModel();
  const model = buildContributorsRouteModel(loadFixtures());

  assert.equal(model.pageId, "contributors");
  assert.equal(model.generatedFrom, "contributors-route-model");
  assert.equal(model.route.path, "/contributors");
  assert.equal(model.route.prototypeFile, "src/pages/contributors.html");
  assert.match(model.hero.title, /Writers, reviewers, essayists/i);
  assert.equal(model.tools.search.placeholder, "Search contributors");
  assert.deepEqual(model.tools.filters.map((filter) => filter.slug), ["theatre", "books", "essays"]);
});

test("production Contributors model includes contributor profiles only", async () => {
  const { buildContributorsRouteModel, getContributorProfiles } = await loadContributorsModel();
  const fixtures = loadFixtures();
  const profiles = getContributorProfiles(fixtures);
  const model = buildContributorsRouteModel(fixtures);
  const serialized = JSON.stringify(model);

  assert.deepEqual(profiles.map((profile) => profile.slug), ["visceral-contributor"]);
  assert.deepEqual(model.sections.contributorsGrid.items.map((profile) => profile.slug), ["visceral-contributor"]);
  assert.ok(model.sections.contributorsGrid.items.every((profile) => profile.type === "contributor"));
  assert.doesNotMatch(serialized, /Zubayr Charles/);
  assert.doesNotMatch(serialized, /Zoe Petersen/);
  assert.doesNotMatch(serialized, /"type":"creative_team"/);
});

test("production Contributors model links published works and excludes drafts", async () => {
  const { buildContributorsRouteModel, getPublishedWorksForContributor } = await loadContributorsModel();
  const fixtures = loadFixtures();
  const works = getPublishedWorksForContributor(fixtures, "visceral-contributor");
  const model = buildContributorsRouteModel(fixtures);
  const serialized = JSON.stringify(model);

  assert.deepEqual(works.map((article) => article.slug), ["send-a-text-before-you-knock", "artist-interview-placeholder"]);
  assert.deepEqual(model.sections.publishedWorks.items.map((article) => article.slug), ["send-a-text-before-you-knock", "artist-interview-placeholder"]);
  assert.ok(model.sections.publishedWorks.items.every((article) => article.status === "published"));
  assert.ok(model.sections.publishedWorks.items.every((article) => article.href.startsWith("/visceral-mag/")));
  assert.doesNotMatch(serialized, /Culture Review Placeholder/);
  assert.doesNotMatch(serialized, /"status":"draft"/);
});

test("production Contributors model exposes no-results and reset states", async () => {
  const { buildContributorsRouteModel } = await loadContributorsModel();
  const fixtures = loadFixtures();
  const model = buildContributorsRouteModel({ ...fixtures, profiles: fixtures.profiles.filter((profile) => profile.type !== "contributor") });

  assert.equal(model.sections.contributorsGrid.state, "no-results");
  assert.equal(model.sections.contributorsGrid.items.length, 0);
  assert.equal(model.sections.contributorsGrid.heading, "No contributors match this view");
  assert.equal(model.sections.contributorsGrid.resetHref, "/contributors");
  assert.deepEqual(model.sections.states.notes, ["contributors-loading", "contributors-error"]);
  assert.deepEqual(model.sections.states.items, ["loading", "no-results", "reset-filter", "error"]);
});

test("React-ready ContributorsPage component is scaffolded from the route model", () => {
  assert.ok(exists("apps/web/src/pages/ContributorsPage.jsx"), "ContributorsPage.jsx should exist");
  const component = read("apps/web/src/pages/ContributorsPage.jsx");
  const app = read("apps/web/src/App.jsx");

  assert.match(component, /export function ContributorsPage/);
  assert.match(component, /buildContributorsRouteModel/);
  assert.match(component, /data-page="contributors"/);
  assert.match(component, /data-section="contributors-intro"/);
  assert.doesNotMatch(component, /data-section="contributors-tools"/);
  assert.match(component, /data-section="contributors-grid"/);
  assert.match(component, /data-section="published-works"/);
  assert.doesNotMatch(component, /data-section="contributors-states"/);
  assert.match(component, /data-action="reset-filter"/);
  assert.match(app, /ContributorsPage/);
  assert.match(app, /route\.id === "contributors"/);
});

test("Contributors route migration handoff is documented and wired into scripts", () => {
  const rootPkg = JSON.parse(read("package.json"));
  const runTests = read("tests/run-tests.js");
  const readme = read("apps/web/README.md");
  const planStatus = read("docs/PLAN_STATUS.md");

  assert.ok(rootPkg.scripts["test:production-contributors"]);
  assert.match(runTests, /production-contributors-route\.test\.js/);
  assert.match(readme, /Contributors route migration/i);
  assert.match(planStatus, /Contributors route migration/i);
});
