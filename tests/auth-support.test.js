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

function exists(relativePath) {
  return fs.existsSync(filePath(relativePath));
}

function load(relativePath) {
  delete require.cache[require.resolve(filePath(relativePath))];
  return require(filePath(relativePath));
}

test("Phase 5 auth support screen plan documents login and password reset", () => {
  const plan = read("docs/PHASE5_AUTH_SUPPORT_SCREENS_PLAN.md");

  assert.match(plan, /Auth Support Screens/i);
  assert.match(plan, /Admin Login/i);
  assert.match(plan, /Password Reset/i);
  assert.match(plan, /role check/i);
  assert.match(plan, /session expiry/i);
  assert.match(plan, /CSRF/i);
  assert.match(plan, /audit logging/i);
  assert.match(plan, /neutral confirmation copy/i);
  assert.match(plan, /token expiry/i);
  assert.match(plan, /rate limit/i);
});

test("auth support renderer exports login and password reset pages", () => {
  const { renderAdminLoginPage, renderPasswordResetPage, getAuthSupportRoutes } = load("src/render/admin-auth.js");
  const loginHtml = renderAdminLoginPage();
  const resetHtml = renderPasswordResetPage();
  const routes = getAuthSupportRoutes();

  assert.equal(typeof renderAdminLoginPage, "function");
  assert.equal(typeof renderPasswordResetPage, "function");
  assert.equal(typeof getAuthSupportRoutes, "function");
  assert.deepEqual(routes.map((route) => route.path), ["/admin/login", "/admin/password-reset"]);

  assert.match(loginHtml, /data-page="admin-login"/);
  assert.match(loginHtml, /data-route="\/admin\/login"/);
  assert.match(loginHtml, /data-generated="admin-auth-renderer"/);
  assert.match(loginHtml, /data-wireframe-source="auth-login.html"/);
  assert.match(loginHtml, /data-support-route="auth"/);

  assert.match(resetHtml, /data-page="password-reset"/);
  assert.match(resetHtml, /data-route="\/admin\/password-reset"/);
  assert.match(resetHtml, /data-generated="admin-auth-renderer"/);
  assert.match(resetHtml, /data-wireframe-source="password-reset.html"/);
  assert.match(resetHtml, /data-support-route="auth"/);
});

test("Admin Login page includes labelled form fields, recovery paths, and secure copy", () => {
  const { renderAdminLoginPage } = load("src/render/admin-auth.js");
  const html = renderAdminLoginPage();

  assert.match(html, /data-section="login-form-shell"/);
  assert.match(html, /B&amp;B Admin/);
  assert.match(html, /for="login-email"/);
  assert.match(html, /id="login-email"/);
  assert.match(html, /type="email"/);
  assert.match(html, /for="login-password"/);
  assert.match(html, /id="login-password"/);
  assert.match(html, /type="password"/);
  assert.match(html, /data-action="sign-in"/);
  assert.match(html, /href="\/admin\/password-reset"/);
  assert.match(html, /Forgot password/);
  assert.match(html, /href="\/"/);
  assert.match(html, /Return to public site/);
  assert.match(html, /Never reveal whether email exists/i);
});

test("Admin Login page exposes authentication and security states", () => {
  const { renderAdminLoginPage } = load("src/render/admin-auth.js");
  const html = renderAdminLoginPage();

  assert.match(html, /data-section="login-states"/);
  assert.match(html, /data-state-note="login-invalid"/);
  assert.match(html, /data-state-note="login-locked"/);
  assert.match(html, /data-state-note="login-loading"/);
  assert.match(html, /data-state-note="login-redirect"/);
  assert.match(html, /href="\/admin"/);
  assert.match(html, /data-section="login-security"/);
  assert.match(html, /data-security-note="role-check"/);
  assert.match(html, /data-security-note="session-expiry"/);
  assert.match(html, /data-security-note="csrf-protection"/);
  assert.match(html, /data-security-note="audit-logging"/);
});

test("Password Reset page includes request, confirmation, and return paths", () => {
  const { renderPasswordResetPage } = load("src/render/admin-auth.js");
  const html = renderPasswordResetPage();

  assert.match(html, /data-section="reset-request"/);
  assert.match(html, /for="reset-email"/);
  assert.match(html, /id="reset-email"/);
  assert.match(html, /type="email"/);
  assert.match(html, /neutral confirmation copy/i);
  assert.match(html, /data-section="reset-confirm"/);
  assert.match(html, /for="reset-token"/);
  assert.match(html, /for="reset-password"/);
  assert.match(html, /for="reset-password-confirm"/);
  assert.match(html, /password strength/i);
  assert.match(html, /href="\/admin\/login"/);
  assert.match(html, /Back to login/);
});

test("Password Reset page exposes token, validation, and success states", () => {
  const { renderPasswordResetPage } = load("src/render/admin-auth.js");
  const html = renderPasswordResetPage();

  assert.match(html, /data-section="reset-states"/);
  assert.match(html, /data-state-note="reset-email-sent"/);
  assert.match(html, /data-state-note="reset-token-expired"/);
  assert.match(html, /data-state-note="reset-password-mismatch"/);
  assert.match(html, /data-state-note="reset-success"/);
  assert.match(html, /data-security-note="token-expiry"/);
  assert.match(html, /data-security-note="rate-limit"/);
});

test("auth support page artifacts are generated from the renderer contract", () => {
  assert.ok(exists("src/pages/admin/login.html"));
  assert.ok(exists("src/pages/admin/password-reset.html"));

  const loginHtml = read("src/pages/admin/login.html");
  const resetHtml = read("src/pages/admin/password-reset.html");

  assert.match(loginHtml, /data-page="admin-login"/);
  assert.match(loginHtml, /data-route="\/admin\/login"/);
  assert.match(loginHtml, /data-generated="admin-auth-renderer"/);
  assert.match(loginHtml, /data-section="login-form-shell"/);

  assert.match(resetHtml, /data-page="password-reset"/);
  assert.match(resetHtml, /data-route="\/admin\/password-reset"/);
  assert.match(resetHtml, /data-generated="admin-auth-renderer"/);
  assert.match(resetHtml, /data-section="reset-request"/);
});
