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

const expectedPublicPaths = ["/", "/about", "/creative-team", "/contributors", "/people/:slug", "/visceral-mag", "/visceral-mag/:slug", "/search", "/featured", "/contact"];
const expectedAdminPaths = ["/admin", "/admin/articles", "/admin/profiles-media", "/admin/moderation", "/admin/contact-submissions"];
const expectedSupportPaths = ["/admin/login", "/admin/password-reset", "/404", "/500", "/offline", "/admin/media/upload", "/admin/articles/editor-workflow"];

async function loadSmokeModule() {
  const modulePath = filePath("apps/web/src/routeSmoke.js");
  assert.ok(fs.existsSync(modulePath), "apps/web/src/routeSmoke.js should exist");
  return import(pathToFileURL(modulePath).href);
}

test("route smoke contract covers every app route without React dependencies", async () => {
  const smoke = await loadSmokeModule();
  const records = smoke.buildRouteSmokeRecords();

  assert.equal(records.length, 22);

  for (const routePath of [...expectedPublicPaths, ...expectedAdminPaths, ...expectedSupportPaths]) {
    const record = records.find((item) => item.path === routePath);
    assert.ok(record, `${routePath} should have a route smoke record`);
    assert.ok(record.id, `${routePath} should expose route id`);
    assert.ok(record.label, `${routePath} should expose route label`);
    assert.ok(record.prototypeFile, `${routePath} should map to a prototype file`);
    assert.ok(record.layout, `${routePath} should declare a layout`);
    assert.ok(record.mainLandmarkId, `${routePath} should declare main landmark id`);
    assert.ok(record.navigationLabel, `${routePath} should declare navigation label`);
  }
});

test("route smoke contract selects public admin and protected layouts correctly", async () => {
  const smoke = await loadSmokeModule();
  const records = smoke.buildRouteSmokeRecords();
  const byPath = new Map(records.map((record) => [record.path, record]));

  for (const routePath of expectedPublicPaths) {
    assert.equal(byPath.get(routePath).layout, "public", `${routePath} should use public layout`);
    assert.equal(byPath.get(routePath).authRequired, false, `${routePath} should not require auth`);
    assert.equal(byPath.get(routePath).navigationLabel, "Public navigation");
  }

  for (const routePath of expectedAdminPaths) {
    assert.equal(byPath.get(routePath).layout, "admin", `${routePath} should use admin layout`);
    assert.equal(byPath.get(routePath).authRequired, true, `${routePath} should require auth`);
    assert.equal(byPath.get(routePath).navigationLabel, "Admin navigation");
  }

  assert.equal(byPath.get("/admin/media/upload").layout, "admin");
  assert.equal(byPath.get("/admin/articles/editor-workflow").layout, "admin");
  assert.equal(byPath.get("/admin/login").layout, "public");
  assert.equal(byPath.get("/404").layout, "public");
});

test("route smoke contract resolves fallback and dynamic article paths", async () => {
  const smoke = await loadSmokeModule();

  assert.equal(smoke.resolveSmokeRoute("/visceral-mag/new-voices").id, "article-detail");
  assert.equal(smoke.resolveSmokeRoute("/people/visceral-contributor").id, "profile-detail");
  assert.equal(smoke.resolveSmokeRoute("/visceral-mag/new-voices").params.slug, "new-voices");
  assert.equal(smoke.resolveSmokeRoute("/missing-route").id, "not-found");
  assert.equal(smoke.resolveSmokeRoute("/missing-route").path, "/404");
});

test("app shell docs and scripts include the route smoke gate", () => {
  const rootPkg = JSON.parse(read("package.json"));
  const runTests = read("tests/run-tests.js");
  const readme = read("apps/web/README.md");
  const planStatus = read("docs/PLAN_STATUS.md");

  assert.ok(rootPkg.scripts["test:route-smoke"]);
  assert.match(runTests, /production-route-smoke\.test\.js/);
  assert.match(readme, /route smoke/i);
  assert.match(planStatus, /route smoke/i);
});
