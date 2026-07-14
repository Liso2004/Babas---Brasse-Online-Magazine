const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8").replace(/^\uFEFF/, "");

test("admin login adopts the private Stitch workspace without weakening auth", () => {
  const login = read("apps/web/src/pages/AdminLoginPage.jsx");
  const layout = read("apps/web/src/layouts/AuthLayout.jsx");

  assert.match(login, /data-design-reference="admin-login-v4"/);
  assert.match(login, /stitch-admin-login/);
  assert.match(login, /fetch\("\/api\/admin\/login"/);
  assert.match(login, /credentials: "include"/);
  assert.match(login, /aria-pressed=\{showPassword\}/);
  assert.doesNotMatch(login, /autoFocus|index\s*===/);
  assert.doesNotMatch(login, /localStorage|sessionStorage/);
  assert.match(layout, /data-auth-design="stitch-private-login-v4"/);
});

test("dashboard presents real operational content in a Stitch workspace", () => {
  const dashboard = read("apps/web/src/pages/AdminDashboardPage.jsx");
  const adminLayout = read("apps/web/src/layouts/AdminLayout.jsx");

  assert.match(dashboard, /data-design-reference="admin-dashboard-v4"/);
  assert.match(dashboard, /data-workspace="stitch-dashboard-workspace"/);
  assert.match(dashboard, /data-section="recent-activity"/);
  assert.match(dashboard, /data-section="quick-actions"/);
  assert.doesNotMatch(dashboard, />Dashboard states</);
  assert.doesNotMatch(dashboard, /sections\.states\.items\.map/);
  assert.match(adminLayout, /adminNavIcons/);
  assert.match(adminLayout, /aria-hidden="true"/);
});

test("Stitch admin styling is responsive, squared, and focus-visible", () => {
  const css = read("apps/web/src/stitch-admin-experience.css");

  assert.match(css, /\[data-auth-design="stitch-private-login-v4"\]/);
  assert.match(css, /\.stitch-admin-login/);
  assert.match(css, /\[data-workspace="stitch-dashboard-workspace"\]/);
  assert.match(css, /\.admin-nav-icon/);
  assert.match(css, /\[data-admin-design="stitch-private-workspace-v4"\]::before\{content:none;display:none\}/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /@media\s*\(max-width:\s*768px\)/);
  assert.doesNotMatch(css, /font-size:\s*[^;]*vw/);
  assert.doesNotMatch(css, /letter-spacing:\s*-/);
});

test("mobile admin navigation uses equal full-width rows", () => {
  const css = read("apps/web/src/stitch-admin-experience.css");

  assert.match(css, /@media\s*\(max-width:\s*768px\)[\s\S]*\.figma-admin-header nav\{display:grid;grid-template-columns:minmax\(0,1fr\);width:100%;gap:0;overflow:visible\}/);
  assert.match(css, /@media\s*\(max-width:\s*768px\)[\s\S]*\.figma-admin-header nav a\{width:100%;min-height:64px;grid-template-columns:minmax\(0,1fr\) 24px/);
});