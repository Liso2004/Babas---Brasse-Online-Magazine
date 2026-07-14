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

test("shared Figma support surface component exists", () => {
  const componentPath = "apps/web/src/components/FigmaSupportSurface.jsx";
  assert.ok(fs.existsSync(filePath(componentPath)), `${componentPath} should exist`);
  const component = read(componentPath);

  assert.match(component, /export function FigmaSupportPanel/);
  assert.match(component, /figma-support-panel/);
  assert.match(component, /export function FigmaSupportGrid/);
  assert.match(component, /figma-support-grid/);
});

test("auth routes use the production Stitch login and Figma reset support", () => {
  const login = read("apps/web/src/pages/AdminLoginPage.jsx");
  const reset = read("apps/web/src/pages/PasswordResetPage.jsx");

  assert.match(login, /data-design-reference="admin-login-v4"/);
  assert.match(login, /stitch-admin-login/);
  assert.match(login, /fetch\("\/api\/admin\/login"/);

  for (const page of [reset]) {
    assert.match(page, /import \{ FigmaSupportGrid, FigmaSupportPanel \}/);
    assert.match(page, /className="figma-support-page figma-auth-page/);
    assert.match(page, /className="figma-support-header"/);
    assert.match(page, /className="figma-support-form-panel"/);
    assert.match(page, /figma-support-state-grid/);
  }
});

test("error support routes use Figma recovery panels", () => {
  const notFound = read("apps/web/src/pages/NotFoundPage.jsx");
  const serverError = read("apps/web/src/pages/ServerErrorPage.jsx");
  const offline = read("apps/web/src/pages/OfflinePage.jsx");

  for (const page of [notFound, serverError, offline]) {
    assert.match(page, /import \{ FigmaSupportGrid, FigmaSupportPanel \}/);
    assert.match(page, /className="figma-support-page figma-error-page/);
    assert.match(page, /className="figma-support-hero"/);
    assert.match(page, /className="figma-support-route-grid"/);
    assert.match(page, /className="figma-support-state-grid"/);
  }
});

test("workflow and mobile support pages use Figma support layouts", () => {
  const mediaUpload = read("apps/web/src/pages/MediaUploadModalPage.jsx");
  const articleWorkflow = read("apps/web/src/pages/ArticleEditorWorkflowPage.jsx");
  const mobile = read("apps/web/src/pages/MobileWireframeCompsPage.jsx");

  assert.match(mediaUpload, /className="figma-support-page figma-workflow-page"/);
  assert.match(mediaUpload, /className="figma-support-modal"/);
  assert.match(mediaUpload, /className="figma-support-form-grid"/);

  assert.match(articleWorkflow, /className="figma-support-page figma-workflow-page"/);
  assert.match(articleWorkflow, /className="figma-workflow-shell"/);
  assert.match(articleWorkflow, /className="figma-support-form-grid"/);

  assert.match(mobile, /className="figma-support-page figma-mobile-handoff-page"/);
  assert.match(mobile, /className="figma-mobile-handoff-nav"/);
  assert.match(mobile, /className="figma-mobile-grid"/);
});

test("Figma support sprint is styled documented wired and keeps the production route contract", () => {
  const rootPkg = readJson("package.json");
  const runTests = read("tests/run-tests.js");
  const css = read("apps/web/src/styles.css");
  const testingLog = read("docs/TESTING_LOG.md");
  const sprintPlan = read("docs/SPRINT_PLAN_JULY_2026.md");
  const routes = read("apps/web/src/routes.js");

  assert.equal(rootPkg.scripts["test:production-figma-support-pages"], "node tests/production-figma-support-pages.test.js");
  assert.match(runTests, /production-figma-support-pages\.test\.js/);
  assert.match(css, /\.figma-support-page/);
  assert.match(css, /\.figma-support-form-panel/);
  assert.match(css, /\.figma-support-route-grid/);
  assert.match(css, /\.figma-workflow-shell/);
  assert.match(css, /\.figma-mobile-grid/);
  assert.match(testingLog, /Figma Support Pages Sprint/i);
  assert.match(sprintPlan, /Figma support pages sprint/i);
  assert.match(routes, /export const supportRoutes = \[/);
  assert.doesNotMatch(routes, /path: "\/login"/);
  assert.doesNotMatch(routes, /path: "\/reset-password"/);
  assert.doesNotMatch(routes, /path: "\/media-upload"/);
});