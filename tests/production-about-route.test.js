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

async function loadAboutModel() {
  const modulePath = filePath("apps/web/src/pages/aboutRouteModel.js");
  assert.ok(fs.existsSync(modulePath), "apps/web/src/pages/aboutRouteModel.js should exist");
  return import(pathToFileURL(modulePath).href);
}

function loadFixtures() {
  delete require.cache[require.resolve(filePath("src/content/fixtures.js"))];
  return require(filePath("src/content/fixtures.js"));
}

test("production About route model preserves the prototype acceptance contract", async () => {
  const { buildAboutRouteModel } = await loadAboutModel();
  const model = buildAboutRouteModel(loadFixtures());

  assert.equal(model.route.path, "/about");
  assert.equal(model.route.prototypeFile, "src/pages/about.html");
  assert.equal(model.pageId, "about");
  assert.equal(model.generatedFrom, "about-route-model");
  assert.equal(model.sections.overview.stateNote, "about-empty-stub");
  assert.match(model.sections.overview.mission, /cultural writing/i);
  assert.match(model.sections.overview.vision, /theatre, books, essays, opinion, and culture/i);
  assert.match(model.sections.overview.organisation, /independent South African publication/i);
  assert.equal(model.sections.overview.image.altText, "Neighbors in conversation on a Cape Town street");
});

test("production About route model includes editorial pillars and route cards", async () => {
  const { buildAboutRouteModel } = await loadAboutModel();
  const model = buildAboutRouteModel(loadFixtures());

  const pillarLabels = model.sections.editorialPillars.map((pillar) => pillar.label);
  assert.deepEqual(pillarLabels, ["Theatre", "Books", "Culture", "Essays", "Interviews"]);

  assert.deepEqual(model.sections.routeCards.map((card) => card.href), ["/creative-team", "/contributors", "/contact"]);
  assert.deepEqual(model.sections.routeCards.map((card) => card.label), ["Creative Team", "Contributors", "Contact"]);
  assert.equal(model.newsletter.action, "/subscribe");
  assert.deepEqual(model.newsletter.states, ["newsletter-invalid", "newsletter-success"]);
});

test("React-ready AboutPage component is scaffolded from the route model", () => {
  assert.ok(exists("apps/web/src/pages/AboutPage.jsx"), "AboutPage.jsx should exist");
  const component = read("apps/web/src/pages/AboutPage.jsx");
  const app = read("apps/web/src/App.jsx");

  assert.match(component, /export function AboutPage/);
  assert.match(component, /buildAboutRouteModel/);
  assert.match(component, /data-page="about"/);
  assert.match(component, /data-section="about-overview"/);
  assert.match(component, /data-section="editorial-pillars"/);
  assert.match(component, /data-section="about-route-cards"/);
  assert.match(component, /data-section="newsletter-footer"/);
  assert.match(app, /AboutPage/);
  assert.match(app, /route\.id === "about"/);
});

test("About route migration handoff is documented and wired into scripts", () => {
  const rootPkg = JSON.parse(read("package.json"));
  const runTests = read("tests/run-tests.js");
  const readme = read("apps/web/README.md");
  const planStatus = read("docs/PLAN_STATUS.md");

  assert.ok(rootPkg.scripts["test:production-about"]);
  assert.match(runTests, /production-about-route\.test\.js/);
  assert.match(readme, /About route migration/i);
  assert.match(planStatus, /About route migration/i);
});
