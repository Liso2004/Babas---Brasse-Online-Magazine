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

async function loadHomeModel() {
  const modulePath = filePath("apps/web/src/pages/homeRouteModel.js");
  assert.ok(fs.existsSync(modulePath), "apps/web/src/pages/homeRouteModel.js should exist");
  return import(pathToFileURL(modulePath).href);
}

function loadFixtures() {
  delete require.cache[require.resolve(filePath("src/content/fixtures.js"))];
  return require(filePath("src/content/fixtures.js"));
}

test("production Home route model preserves the prototype acceptance contract", async () => {
  const { buildHomeRouteModel } = await loadHomeModel();
  const fixtures = loadFixtures();
  const model = buildHomeRouteModel(fixtures);

  assert.equal(model.route.path, "/");
  assert.equal(model.route.prototypeFile, "src/pages/home.html");
  assert.equal(model.pageId, "home");
  assert.equal(model.generatedFrom, "home-route-model");
  assert.equal(model.sections.leadStory.id, "send-a-text-before-you-knock");
  assert.equal(model.sections.latestArticles.length, 2);
  assert.ok(model.sections.latestArticles.every((article) => article.status === "published"));
  assert.deepEqual(model.sections.categoryAccess.map((category) => category.slug), ["essays", "reviews", "interviews", "artwork"]);
  assert.equal(model.sections.mediaPreview.length, 3);
  assert.equal(model.sections.peoplePreview.length, 3);
  assert.equal(model.newsletter.action, "/subscribe");
});

test("production Home route model excludes draft articles from reader-facing slots", async () => {
  const { buildHomeRouteModel } = await loadHomeModel();
  const model = buildHomeRouteModel(loadFixtures());
  const serialized = JSON.stringify(model);

  assert.match(serialized, /Send A Text Before You Knock/);
  assert.match(serialized, /Artist Interview Placeholder/);
  assert.doesNotMatch(serialized, /Culture Review Placeholder/);
  assert.doesNotMatch(serialized, /"status":"draft"/);
});

test("React-ready HomePage component is scaffolded from the route model", () => {
  assert.ok(exists("apps/web/src/pages/HomePage.jsx"), "HomePage.jsx should exist");
  const component = read("apps/web/src/pages/HomePage.jsx");

  assert.match(component, /export function HomePage/);
  assert.match(component, /buildHomeRouteModel/);
  assert.match(component, /data-page="home"/);
  assert.match(component, /data-section="lead-story"/);
  assert.match(component, /data-section="latest-articles"/);
  assert.match(component, /data-section="category-access"/);
  assert.match(component, /data-section="media-preview"/);
  assert.match(component, /data-section="people-preview"/);
  assert.match(component, /newsletter/);
});

test("Home route migration handoff is documented and wired into scripts", () => {
  const rootPkg = JSON.parse(read("package.json"));
  const runTests = read("tests/run-tests.js");
  const readme = read("apps/web/README.md");
  const planStatus = read("docs/PLAN_STATUS.md");

  assert.ok(rootPkg.scripts["test:production-home"]);
  assert.match(runTests, /production-home-route\.test\.js/);
  assert.match(readme, /Home route migration/i);
  assert.match(planStatus, /Home route migration/i);
});
