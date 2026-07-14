const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

test("admin auth exposes login session and logout but no registration", () => {
  const server = read("apps/api/server.js");
  assert.match(server, /\/api\/admin\/login/);
  assert.match(server, /\/api\/admin\/session/);
  assert.match(server, /\/api\/admin\/logout/);
  assert.doesNotMatch(server, /\/api\/admin\/(?:register|signup)/i);
});

test("admin sessions use secure cookie attributes and one admin role", () => {
  const auth = read("apps/api/adminAuth.js");
  assert.match(auth, /HttpOnly/);
  assert.match(auth, /SameSite=Strict/);
  assert.match(auth, /role: "admin"/);
  assert.doesNotMatch(auth, /contributor|reader|editor/);
});

test("React login submits credentials without storing secrets", () => {
  const login = read("apps/web/src/pages/AdminLoginPage.jsx");
  assert.match(login, /fetch\("\/api\/admin\/login"/);
  assert.match(login, /credentials: "include"/);
  assert.match(login, /navigate\("\/admin"/);
  assert.doesNotMatch(login, /localStorage|sessionStorage/);
});

test("protected app routes use an admin-only session gate", () => {
  const gate = read("apps/web/src/auth/AdminGate.jsx");
  const app = read("apps/web/src/App.jsx");
  const layout = read("apps/web/src/layouts/AdminLayout.jsx");

  assert.match(gate, /\/api\/admin\/session/);
  assert.match(gate, /credentials: "include"/);
  assert.match(gate, /role !== "admin"/);
  assert.match(app, /<AdminGate>/);
  assert.match(layout, /\/api\/admin\/logout/);
  assert.match(layout, /credentials: "include"/);
  assert.match(layout, /navigate\("\/admin"/);
});

test("public navigation does not expose the private admin entry", () => {
  const layout = read("apps/web/src/layouts/PublicLayout.jsx");
  const login = read("apps/web/src/pages/adminAuthRouteModel.js");

  assert.doesNotMatch(layout, /Editor access|Admin login|UserRound/i);
  assert.equal(layout.includes('to="/admin'), false);
  assert.doesNotMatch(login, /Editor login|editors/i);
  assert.match(login, /Admin login/);
});
