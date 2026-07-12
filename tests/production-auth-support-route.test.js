const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const root = path.resolve(__dirname, "..");
function filePath(relativePath) { return path.join(root, relativePath); }
function read(relativePath) { return fs.readFileSync(filePath(relativePath), "utf8").replace(/^\uFEFF/, ""); }
function exists(relativePath) { return fs.existsSync(filePath(relativePath)); }
async function loadAuthModel() {
  const modulePath = filePath("apps/web/src/pages/adminAuthRouteModel.js");
  assert.ok(fs.existsSync(modulePath), "apps/web/src/pages/adminAuthRouteModel.js should exist");
  return import(pathToFileURL(modulePath).href);
}

test("production auth support route model preserves login and reset routes", async () => {
  const { getAuthSupportRoutes, buildAdminLoginRouteModel, buildPasswordResetRouteModel } = await loadAuthModel();
  const routes = getAuthSupportRoutes();
  const login = buildAdminLoginRouteModel();
  const reset = buildPasswordResetRouteModel();

  assert.deepEqual(routes.map((route) => route.path), ["/admin/login", "/admin/password-reset"]);
  assert.equal(login.pageId, "admin-login");
  assert.equal(login.generatedFrom, "admin-auth-route-model");
  assert.equal(login.route.prototypeFile, "src/pages/admin/login.html");
  assert.equal(reset.pageId, "password-reset");
  assert.equal(reset.generatedFrom, "admin-auth-route-model");
  assert.equal(reset.route.prototypeFile, "src/pages/admin/password-reset.html");
});

test("production Admin Login model includes fields recovery links states and security notes", async () => {
  const { buildAdminLoginRouteModel } = await loadAuthModel();
  const model = buildAdminLoginRouteModel();

  assert.deepEqual(model.form.fields.map((field) => field.name), ["email", "password"]);
  assert.equal(model.form.action, "/admin/login");
  assert.deepEqual(model.recoveryLinks.map((link) => link.href), ["/admin/password-reset", "/"]);
  assert.deepEqual(model.sections.states.notes, ["login-invalid", "login-locked", "login-loading", "login-redirect"]);
  assert.deepEqual(model.sections.security.notes, ["role-check", "session-expiry", "csrf-protection", "audit-logging"]);
  assert.match(model.accessCopy.body, /only the .* administrator can sign in/i);
});

test("production Password Reset model includes request confirm return states and security notes", async () => {
  const { buildPasswordResetRouteModel } = await loadAuthModel();
  const model = buildPasswordResetRouteModel();

  assert.deepEqual(model.request.fields.map((field) => field.name), ["email"]);
  assert.deepEqual(model.confirm.fields.map((field) => field.name), ["token", "password", "passwordConfirm"]);
  assert.match(model.request.neutralCopy, /Neutral confirmation copy/i);
  assert.match(model.confirm.strengthCopy, /Password strength/i);
  assert.equal(model.returnLink.href, "/admin/login");
  assert.deepEqual(model.sections.states.notes, ["reset-email-sent", "reset-token-expired", "reset-password-mismatch", "reset-success"]);
  assert.deepEqual(model.sections.security.notes, ["token-expiry", "rate-limit"]);
});

test("React-ready auth support pages are scaffolded from the route models", () => {
  assert.ok(exists("apps/web/src/pages/AdminLoginPage.jsx"), "AdminLoginPage.jsx should exist");
  assert.ok(exists("apps/web/src/pages/PasswordResetPage.jsx"), "PasswordResetPage.jsx should exist");
  const loginComponent = read("apps/web/src/pages/AdminLoginPage.jsx");
  const resetComponent = read("apps/web/src/pages/PasswordResetPage.jsx");
  const app = read("apps/web/src/App.jsx");

  assert.match(loginComponent, /export function AdminLoginPage/);
  assert.match(loginComponent, /buildAdminLoginRouteModel/);
  assert.match(loginComponent, /data-page="admin-login"/);
  assert.match(loginComponent, /fetch\("\/api\/admin\/login"/);
  assert.match(loginComponent, /credentials: "include"/);
  assert.match(loginComponent, /session\.role !== "admin"/);
  assert.match(resetComponent, /export function PasswordResetPage/);
  assert.match(resetComponent, /buildPasswordResetRouteModel/);
  assert.match(resetComponent, /data-page="password-reset"/);
  assert.match(resetComponent, /data-section="reset-request"/);
  assert.match(resetComponent, /data-section="reset-confirm"/);
  assert.match(resetComponent, /data-section="reset-states"/);
  assert.match(app, /AdminLoginPage/);
  assert.match(app, /route\.id === "admin-login"/);
  assert.match(app, /PasswordResetPage/);
  assert.match(app, /route\.id === "password-reset"/);
});

test("Auth support route migration handoff is documented and wired into scripts", () => {
  const rootPkg = JSON.parse(read("package.json"));
  const runTests = read("tests/run-tests.js");
  const readme = read("apps/web/README.md");
  const planStatus = read("docs/PLAN_STATUS.md");

  assert.ok(rootPkg.scripts["test:production-auth-support"]);
  assert.match(runTests, /production-auth-support-route\.test\.js/);
  assert.match(readme, /Auth Support route migration/i);
  assert.match(planStatus, /Auth Support route migration/i);
});
