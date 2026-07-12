const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

function filePath(relativePath) {
  return path.join(root, relativePath);
}

function exists(relativePath) {
  return fs.existsSync(filePath(relativePath));
}

function read(relativePath) {
  return fs.readFileSync(filePath(relativePath), "utf8").replace(/^\uFEFF/, "");
}

function readJson(relativePath) {
  return JSON.parse(read(relativePath));
}

const expectedPaths = [
  "/",
  "/about",
  "/creative-team",
  "/contributors",
  "/visceral-mag",
  "/visceral-mag/:slug",
  "/search",
  "/featured",
  "/contact",
  "/admin",
  "/admin/articles",
  "/admin/profiles-media",
  "/admin/moderation",
  "/admin/contact-submissions",
  "/admin/login",
  "/admin/password-reset",
  "/404",
  "/500",
  "/offline",
  "/admin/media/upload",
  "/admin/articles/editor-workflow",
  "/mobile-wireframes"
];

test("production app boundary is documented before scaffolding", () => {
  const doc = read("docs/PRODUCTION_APP_BOUNDARY.md");

  assert.match(doc, /Production App Boundary/i);
  assert.match(doc, /apps\/web/i);
  assert.match(doc, /React/i);
  assert.match(doc, /Next\.js-ready/i);
  assert.match(doc, /no dependency install/i);
  assert.match(doc, /prototype acceptance contract/i);
  assert.match(doc, /Sprint 1/i);
});

test("React-ready app shell scaffold exists under apps web", () => {
  const requiredFiles = [
    "apps/web/package.json",
    "apps/web/index.html",
    "apps/web/src/main.jsx",
    "apps/web/src/App.jsx",
    "apps/web/src/routes.js",
    "apps/web/src/layouts/PublicLayout.jsx",
    "apps/web/src/layouts/AdminLayout.jsx",
    "apps/web/src/styles.css",
    "apps/web/README.md"
  ];

  for (const file of requiredFiles) {
    assert.ok(exists(file), `${file} should exist`);
  }

  const pkg = readJson("apps/web/package.json");
  assert.equal(pkg.private, true);
  assert.match(pkg.name, /babas-brasse-web/);
  assert.ok(pkg.scripts.dev);
  assert.ok(pkg.scripts.build);
  assert.ok(pkg.scripts.test);
  assert.ok(pkg.dependencies.react, "React should be declared after runtime install approval");
  assert.ok(pkg.dependencies["react-dom"], "React DOM should be declared after runtime install approval");
});

test("production route registry maps all public admin and support paths", () => {
  const routesSource = read("apps/web/src/routes.js");

  for (const routePath of expectedPaths) {
    assert.match(routesSource, new RegExp(routePath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), `${routePath} should be in the app route registry`);
  }

  assert.match(routesSource, /area: "public"/);
  assert.match(routesSource, /area: "admin"/);
  assert.match(routesSource, /area: "support"/);
  assert.match(routesSource, /authRequired: true/);
  assert.match(routesSource, /prototypeFile:/);
});

test("app shell includes public and admin layouts with route navigation", () => {
  const app = read("apps/web/src/App.jsx");
  const publicLayout = read("apps/web/src/layouts/PublicLayout.jsx");
  const adminLayout = read("apps/web/src/layouts/AdminLayout.jsx");
  assert.ok(exists("apps/web/src/layouts/AuthLayout.jsx"));
  const authLayout = read("apps/web/src/layouts/AuthLayout.jsx");

  assert.match(app, /function AppShell/);
  assert.match(app, /getRouteByPath/);
  assert.match(app, /PublicLayout/);
  assert.match(app, /AdminLayout/);
  assert.match(app, /AuthLayout/);
  assert.match(app, /data-app-shell="babas-brasse-web"/);
  assert.match(publicLayout, /aria-label="Public navigation"/);
  assert.match(publicLayout, /Babas & Brasse/);
  assert.match(publicLayout, /skip-link/);
  assert.match(adminLayout, /aria-label="Admin navigation"/);
  assert.match(adminLayout, /authRequired/);
  assert.match(adminLayout, /Sign out/);
  assert.match(authLayout, /Back to magazine/);
});

test("app shell handoff docs preserve TDD and preview commands", () => {
  const readme = read("apps/web/README.md");
  const rootPkg = readJson("package.json");
  const runTests = read("tests/run-tests.js");

  assert.match(readme, /Sprint 1 app shell/i);
  assert.match(readme, /npm.cmd test/i);
  assert.match(readme, /npm.cmd run preview:mvp/i);
  assert.match(readme, /Runtime Dependency Install/i);
  assert.ok(rootPkg.scripts["test:app-shell"]);
  assert.match(runTests, /production-app-shell\.test\.js/);
});
