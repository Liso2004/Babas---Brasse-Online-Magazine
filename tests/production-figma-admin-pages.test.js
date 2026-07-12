const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

function filePath(relativePath) {
  return path.join(root, relativePath);
}

function read(relativePath) {
  return fs.readFileSync(filePath(relativePath), "utf8").replace(/^\uFEFF/, "");
}

function readJson(relativePath) {
  return JSON.parse(read(relativePath));
}

test("shared Figma admin surface component exists", () => {
  const componentPath = "apps/web/src/components/FigmaAdminSurface.jsx";
  assert.ok(fs.existsSync(filePath(componentPath)), `${componentPath} should exist`);
  const component = read(componentPath);

  assert.match(component, /export function FigmaAdminMetricGrid/);
  assert.match(component, /figma-admin-metrics/);
  assert.match(component, /export function FigmaAdminSection/);
  assert.match(component, /figma-admin-section/);
});

test("Admin layout and dashboard use quiet operational Figma classes", () => {
  const layout = read("apps/web/src/layouts/AdminLayout.jsx");
  const dashboard = read("apps/web/src/pages/AdminDashboardPage.jsx");

  assert.match(layout, /className="app-layout admin-layout figma-admin-shell"/);
  assert.match(layout, /className="admin-header figma-admin-header"/);
  assert.match(dashboard, /import \{ FigmaAdminMetricGrid, FigmaAdminSection \}/);
  assert.match(dashboard, /className="figma-admin-page figma-admin-dashboard-page"/);
  assert.match(dashboard, /className="figma-admin-table-panel"/);
  assert.match(dashboard, /className="figma-admin-action-grid"/);
});

test("Admin management pages use Figma toolbar table and editor panels", () => {
  const articles = read("apps/web/src/pages/ArticleManagementPage.jsx");
  const profiles = read("apps/web/src/pages/ProfileMediaManagementPage.jsx");
  const moderation = read("apps/web/src/pages/CommentsReviewsModerationPage.jsx");
  const submissions = read("apps/web/src/pages/ContactSubmissionsPage.jsx");

  for (const page of [articles, profiles, moderation, submissions]) {
    assert.match(page, /figma-admin-page/);
    assert.match(page, /figma-admin-table-panel/);
  }

  assert.match(articles, /className="figma-admin-toolbar"/);
  assert.match(articles, /className="figma-admin-editor-panel"/);
  assert.match(profiles, /className="figma-admin-upload-panel"/);
  assert.match(moderation, /className="figma-admin-workspace"/);
  assert.match(submissions, /className="figma-admin-workspace"/);
});

test("Figma admin sprint is styled documented and wired into the full suite", () => {
  const rootPkg = readJson("package.json");
  const runTests = read("tests/run-tests.js");
  const css = read("apps/web/src/styles.css");
  const testingLog = read("docs/TESTING_LOG.md");
  const sprintPlan = read("docs/SPRINT_PLAN_JULY_2026.md");

  assert.equal(rootPkg.scripts["test:production-figma-admin-pages"], "node tests/production-figma-admin-pages.test.js");
  assert.match(runTests, /production-figma-admin-pages\.test\.js/);
  assert.match(css, /\.figma-admin-shell/);
  assert.match(css, /\.figma-admin-metrics/);
  assert.match(css, /\.figma-admin-table-panel/);
  assert.match(css, /\.figma-admin-toolbar/);
  assert.match(css, /\.figma-admin-editor-panel/);
  assert.match(testingLog, /Figma Admin Pages Sprint/i);
  assert.match(sprintPlan, /Figma admin pages sprint/i);
});
