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

async function loadAdminDashboardModel() {
  const modulePath = filePath("apps/web/src/pages/adminDashboardRouteModel.js");
  assert.ok(fs.existsSync(modulePath), "apps/web/src/pages/adminDashboardRouteModel.js should exist");
  return import(pathToFileURL(modulePath).href);
}

function loadFixtures() {
  delete require.cache[require.resolve(filePath("src/content/fixtures.js"))];
  return require(filePath("src/content/fixtures.js"));
}

test("production Admin Dashboard route model preserves the protected admin surface", async () => {
  const { buildAdminDashboardRouteModel } = await loadAdminDashboardModel();
  const model = buildAdminDashboardRouteModel(loadFixtures());

  assert.equal(model.pageId, "admin-dashboard");
  assert.equal(model.generatedFrom, "admin-dashboard-route-model");
  assert.equal(model.route.path, "/admin");
  assert.equal(model.route.prototypeFile, "src/pages/admin/dashboard.html");
  assert.equal(model.auth.required, true);
  assert.equal(model.auth.role, "admin");
  assert.match(model.hero.title, /Editorial operations overview/i);
});

test("production Admin Dashboard metrics are derived from fixtures", async () => {
  const { buildAdminDashboardRouteModel, getDashboardMetrics } = await loadAdminDashboardModel();
  const fixtures = loadFixtures();
  const metrics = getDashboardMetrics(fixtures);
  const model = buildAdminDashboardRouteModel(fixtures);

  assert.deepEqual(metrics, {
    publishedArticles: 2,
    drafts: 1,
    pendingComments: 1,
    pendingReviews: 0,
    newContactSubmissions: 1
  });
  assert.deepEqual(model.sections.stats.items.map((item) => item.key), Object.keys(metrics));
  assert.deepEqual(model.sections.stats.items.map((item) => item.value), Object.values(metrics));
});

test("production Admin Dashboard model includes recent activity and quick actions", async () => {
  const { buildAdminDashboardRouteModel, getRecentActivity } = await loadAdminDashboardModel();
  const fixtures = loadFixtures();
  const activity = getRecentActivity(fixtures);
  const model = buildAdminDashboardRouteModel(fixtures);

  assert.ok(activity.length >= 3);
  assert.deepEqual(model.sections.recentActivity.columns, ["actor", "item", "status", "timestamp", "next-action"]);
  assert.match(JSON.stringify(model.sections.recentActivity.items), /Draft review placeholder/);
  assert.match(JSON.stringify(model.sections.recentActivity.items), /Pending comment placeholder/);
  assert.match(JSON.stringify(model.sections.recentActivity.items), /General inquiry/);
  assert.deepEqual(model.sections.quickActions.items.map((action) => action.href), ["/admin/articles", "/admin/moderation", "/admin/profiles-media", "/admin/contact-submissions"]);
});

test("production Admin Dashboard model exposes loading empty error and permission states", async () => {
  const { buildAdminDashboardRouteModel } = await loadAdminDashboardModel();
  const model = buildAdminDashboardRouteModel(loadFixtures());

  assert.deepEqual(model.sections.states.notes, ["dashboard-loading", "dashboard-empty", "dashboard-error", "permission-denied"]);
  assert.deepEqual(model.sections.states.items, ["loading", "empty", "error", "permission-denied"]);
  assert.equal(model.sections.states.permissionHref, "/admin/login");
  assert.match(model.sections.states.errorCopy, /retry/i);
});

test("React-ready AdminDashboardPage component is scaffolded from the route model", () => {
  assert.ok(exists("apps/web/src/pages/AdminDashboardPage.jsx"), "AdminDashboardPage.jsx should exist");
  const component = read("apps/web/src/pages/AdminDashboardPage.jsx");
  const app = read("apps/web/src/App.jsx");

  assert.match(component, /export function AdminDashboardPage/);
  assert.match(component, /buildAdminDashboardRouteModel/);
  assert.match(component, /data-page="admin-dashboard"/);
  assert.match(component, /data-section="admin-dashboard-intro"/);
  assert.match(component, /data-section="dashboard-stats"/);
  assert.match(component, /data-section="recent-activity"/);
  assert.match(component, /data-section="quick-actions"/);
  assert.match(component, /data-section="dashboard-states"/);
  assert.match(app, /AdminDashboardPage/);
  assert.match(app, /route\.id === "admin-dashboard"/);
});

test("Admin Dashboard route migration handoff is documented and wired into scripts", () => {
  const rootPkg = JSON.parse(read("package.json"));
  const runTests = read("tests/run-tests.js");
  const readme = read("apps/web/README.md");
  const planStatus = read("docs/PLAN_STATUS.md");

  assert.ok(rootPkg.scripts["test:production-admin-dashboard"]);
  assert.match(runTests, /production-admin-dashboard-route\.test\.js/);
  assert.match(readme, /Admin Dashboard route migration/i);
  assert.match(planStatus, /Admin Dashboard route migration/i);
});
