const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const root = path.resolve(__dirname, "..");
function filePath(relativePath) { return path.join(root, relativePath); }
function read(relativePath) { return fs.readFileSync(filePath(relativePath), "utf8").replace(/^\uFEFF/, ""); }
function exists(relativePath) { return fs.existsSync(filePath(relativePath)); }
async function loadErrorSupportModel() {
  const modulePath = filePath("apps/web/src/pages/errorSupportRouteModel.js");
  assert.ok(fs.existsSync(modulePath), "apps/web/src/pages/errorSupportRouteModel.js should exist");
  return import(pathToFileURL(modulePath).href);
}

test("production error support route model preserves 404 500 and offline routes", async () => {
  const { getErrorSupportRoutes, buildNotFoundRouteModel, buildServerErrorRouteModel, buildOfflineRouteModel } = await loadErrorSupportModel();
  const routes = getErrorSupportRoutes();
  const notFound = buildNotFoundRouteModel();
  const serverError = buildServerErrorRouteModel();
  const offline = buildOfflineRouteModel();

  assert.deepEqual(routes.map((route) => route.path), ["/404", "/500", "/offline"]);
  assert.equal(notFound.pageId, "not-found");
  assert.equal(notFound.generatedFrom, "error-support-route-model");
  assert.equal(notFound.route.prototypeFile, "src/pages/not-found.html");
  assert.equal(serverError.pageId, "server-error");
  assert.equal(serverError.route.prototypeFile, "src/pages/server-error.html");
  assert.equal(offline.pageId, "offline-maintenance");
  assert.equal(offline.route.prototypeFile, "src/pages/offline-maintenance.html");
});

test("production error support model includes shared recovery navigation", async () => {
  const { buildNotFoundRouteModel, buildServerErrorRouteModel, buildOfflineRouteModel } = await loadErrorSupportModel();
  const models = [buildNotFoundRouteModel(), buildServerErrorRouteModel(), buildOfflineRouteModel()];

  for (const model of models) {
    assert.deepEqual(model.recoveryRoutes.map((route) => route.href), ["/", "/visceral-mag", "/search", "/contact"]);
    assert.equal(model.sections.recovery.id, "recovery-routes");
    assert.equal(model.sections.footer.id, "support-footer");
    assert.equal(model.responsive, "desktop-centered mobile-stacked");
  }
});

test("production error support model exposes page-specific copy actions and states", async () => {
  const { buildNotFoundRouteModel, buildServerErrorRouteModel, buildOfflineRouteModel } = await loadErrorSupportModel();
  const notFound = buildNotFoundRouteModel();
  const serverError = buildServerErrorRouteModel();
  const offline = buildOfflineRouteModel();

  assert.equal(notFound.code, "404");
  assert.equal(notFound.primaryAction.id, "reset-to-search");
  assert.deepEqual(notFound.sections.states.notes, ["missing-public-page", "removed-article", "invalid-slug", "reset-to-search"]);
  assert.match(notFound.message.copy, /removed articles|mistyped URLs/i);

  assert.equal(serverError.code, "500");
  assert.equal(serverError.primaryAction.id, "retry");
  assert.deepEqual(serverError.sections.states.notes, ["failed-request", "retry", "contact-support", "safe-fallback-navigation"]);
  assert.match(serverError.message.copy, /failed request|temporary application fault/i);

  assert.equal(offline.code, "Offline");
  assert.equal(offline.primaryAction.id, "refresh");
  assert.deepEqual(offline.sections.states.notes, ["no-network", "maintenance-window", "refresh", "cached-content", "contact-fallback"]);
  assert.match(offline.message.copy, /maintenance window|cached content/i);
});

test("React-ready error support pages are scaffolded from the route models", () => {
  assert.ok(exists("apps/web/src/pages/NotFoundPage.jsx"), "NotFoundPage.jsx should exist");
  assert.ok(exists("apps/web/src/pages/ServerErrorPage.jsx"), "ServerErrorPage.jsx should exist");
  assert.ok(exists("apps/web/src/pages/OfflinePage.jsx"), "OfflinePage.jsx should exist");
  const notFoundComponent = read("apps/web/src/pages/NotFoundPage.jsx");
  const serverErrorComponent = read("apps/web/src/pages/ServerErrorPage.jsx");
  const offlineComponent = read("apps/web/src/pages/OfflinePage.jsx");
  const app = read("apps/web/src/App.jsx");

  assert.match(notFoundComponent, /export function NotFoundPage/);
  assert.match(notFoundComponent, /buildNotFoundRouteModel/);
  assert.match(notFoundComponent, /data-page="not-found"/);
  assert.match(notFoundComponent, /data-section="not-found-message"/);
  assert.match(serverErrorComponent, /export function ServerErrorPage/);
  assert.match(serverErrorComponent, /buildServerErrorRouteModel/);
  assert.match(serverErrorComponent, /data-page="server-error"/);
  assert.match(serverErrorComponent, /data-section="server-error-message"/);
  assert.match(offlineComponent, /export function OfflinePage/);
  assert.match(offlineComponent, /buildOfflineRouteModel/);
  assert.match(offlineComponent, /data-page="offline-maintenance"/);
  assert.match(offlineComponent, /data-section="offline-message"/);
  assert.match(app, /NotFoundPage/);
  assert.match(app, /route\.id === "not-found"/);
  assert.match(app, /ServerErrorPage/);
  assert.match(app, /route\.id === "server-error"/);
  assert.match(app, /OfflinePage/);
  assert.match(app, /route\.id === "offline"/);
});

test("Error support route migration handoff is documented and wired into scripts", () => {
  const rootPkg = JSON.parse(read("package.json"));
  const runTests = read("tests/run-tests.js");
  const readme = read("apps/web/README.md");
  const planStatus = read("docs/PLAN_STATUS.md");

  assert.ok(rootPkg.scripts["test:production-error-support"]);
  assert.match(runTests, /production-error-support-route\.test\.js/);
  assert.match(readme, /Error Support route migration/i);
  assert.match(planStatus, /Error Support route migration/i);
});
