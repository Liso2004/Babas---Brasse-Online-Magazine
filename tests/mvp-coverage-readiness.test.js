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

const expectedGeneratedByRoute = {
  home: "home-renderer",
  about: "about-renderer",
  "creative-team": "creative-team-renderer",
  contributors: "contributors-renderer",
  "visceral-mag": "visceral-mag-renderer",
  "article-detail": "article-detail-renderer",
  "categories-search": "categories-search-renderer",
  "featured-media": "featured-media-renderer",
  contact: "contact-renderer",
  "admin-dashboard": "admin-dashboard-renderer",
  "article-management": "article-management-renderer",
  "profile-media-management": "profile-media-management-renderer",
  "comments-reviews-moderation": "comments-reviews-moderation-renderer",
  "contact-submissions": "contact-submissions-renderer"
};

test("MVP coverage review document summarizes implemented routes and remaining launch gaps", () => {
  const doc = read("docs/MVP_IMPLEMENTATION_COVERAGE_REVIEW.md");

  assert.match(doc, /MVP Implementation Coverage Review/i);
  assert.match(doc, /14 core route artifacts/i);
  assert.match(doc, /9 public routes/i);
  assert.match(doc, /5 admin routes/i);
  assert.match(doc, /391 passing tests/i);
  assert.match(doc, /8 implemented support routes/i);
  assert.match(doc, /frontend app integration/i);
  assert.match(doc, /authentication hardening/i);
  assert.match(doc, /backend persistence/i);
  assert.match(doc, /visual styling/i);
  assert.match(doc, /July 31, 2026/i);
});

test("every core route has a generated non-placeholder artifact", () => {
  const { allRoutes } = load("src/routes.js");

  assert.equal(allRoutes.length, 14);
  assert.deepEqual(allRoutes.map((route) => route.id), Object.keys(expectedGeneratedByRoute));

  for (const route of allRoutes) {
    assert.ok(exists(route.file), `${route.file} should exist`);
    const html = read(route.file);

    assert.doesNotMatch(html, /Phase 0 route placeholder/i, `${route.id} should no longer be a scaffold placeholder`);
    assert.match(html, new RegExp(`data-page="${route.id}"`));
    assert.match(html, new RegExp(`data-generated="${expectedGeneratedByRoute[route.id]}"`));
    assert.match(html, new RegExp(route.path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("all implemented route renderers and focused test scripts are registered", () => {
  const pkg = JSON.parse(read("package.json"));
  const runTests = read("tests/run-tests.js");

  for (const [routeId, generatedBy] of Object.entries(expectedGeneratedByRoute)) {
    const rendererFile = `src/render/${routeId === "admin-dashboard" ? "admin-dashboard" : routeId}.js`;
    assert.ok(exists(rendererFile), `${rendererFile} should exist for ${generatedBy}`);
  }

  const expectedScripts = [
    "test:home",
    "test:about",
    "test:creative-team",
    "test:contributors",
    "test:visceral-mag",
    "test:article-detail",
    "test:categories-search",
    "test:featured-media",
    "test:contact",
    "test:admin-dashboard",
    "test:article-management",
    "test:profile-media-management",
    "test:comments-reviews-moderation",
    "test:contact-submissions",
    "test:auth-support",
    "test:error-support",
    "test:admin-workflow-support",
    "test:mobile-wireframes",
    "test:frontend-plan",
    "test:roadmap-sprints",
    "test:app-shell",
    "test:route-smoke",
    "test:production-home",
    "test:production-about",
    "test:production-visceral-mag",
    "test:production-article-detail",
    "test:production-categories-search",
    "test:production-featured-media",
    "test:production-creative-team",
    "test:production-contributors",
    "test:production-contact",
    "test:production-admin-dashboard",
    "test:production-article-management",
    "test:production-profile-media-management",
    "test:production-comments-reviews-moderation",
    "test:production-contact-submissions",
    "test:production-auth-support",
    "test:production-error-support",
    "test:production-admin-workflow-support",
    "test:production-mobile-wireframes",
    "test:web-runtime",
    "test:visual-system"
  ];

  for (const script of expectedScripts) {
    assert.ok(pkg.scripts[script], `${script} should be registered`);
  }

  assert.match(runTests, /home\.test\.js/);
  assert.match(runTests, /contact-submissions\.test\.js/);
  assert.match(runTests, /comments-reviews-moderation\.test\.js/);
  assert.match(runTests, /auth-support\.test\.js/);
  assert.match(runTests, /error-support\.test\.js/);
  assert.match(runTests, /admin-workflow-support\.test\.js/);
  assert.match(runTests, /mobile-wireframe-comps\.test\.js/);
  assert.match(runTests, /frontend-app-integration-plan\.test\.js/);
  assert.match(runTests, /roadmap-sprint-docs\.test\.js/);
  assert.match(runTests, /production-app-shell\.test\.js/);
  assert.match(runTests, /production-route-smoke\.test\.js/);
  assert.match(runTests, /production-home-route\.test\.js/);
  assert.match(runTests, /production-about-route\.test\.js/);
  assert.match(runTests, /production-visceral-mag-route\.test\.js/);
  assert.match(runTests, /production-article-detail-route\.test\.js/);
  assert.match(runTests, /production-categories-search-route\.test\.js/);
  assert.match(runTests, /production-featured-media-route\.test\.js/);
  assert.match(runTests, /production-creative-team-route\.test\.js/);
  assert.match(runTests, /production-contributors-route\.test\.js/);
  assert.match(runTests, /production-contact-route\.test\.js/);
  assert.match(runTests, /production-admin-dashboard-route\.test\.js/);
  assert.match(runTests, /production-article-management-route\.test\.js/);
  assert.match(runTests, /production-profile-media-management-route\.test\.js/);
  assert.match(runTests, /production-comments-reviews-moderation-route\.test\.js/);
  assert.match(runTests, /production-contact-submissions-route\.test\.js/);
  assert.match(runTests, /production-auth-support-route\.test\.js/);
  assert.match(runTests, /production-error-support-route\.test\.js/);
  assert.match(runTests, /production-admin-workflow-support-route\.test\.js/);
  assert.match(runTests, /production-mobile-wireframe-comps-route\.test\.js/);
  assert.match(runTests, /production-web-runtime\.test\.js/);
  assert.match(runTests, /production-visual-system\.test\.js/);
});

test("all support wireframes are implemented as generated prototype contracts", () => {
  const supportWireframes = [
    "auth-login.html",
    "password-reset.html",
    "not-found.html",
    "server-error.html",
    "offline-maintenance.html",
    "media-upload-modal.html",
    "article-editor-workflow.html",
    "mobile-wireframes.html"
  ];

  for (const file of supportWireframes) {
    assert.ok(exists(`designs/open-design-wireframes/${file}`), `${file} should remain available as final support wireframe source`);
  }

  const loginHtml = read("src/pages/admin/login.html");
  const resetHtml = read("src/pages/admin/password-reset.html");

  assert.match(loginHtml, /data-page="admin-login"/);
  assert.match(loginHtml, /data-generated="admin-auth-renderer"/);
  assert.match(resetHtml, /data-page="password-reset"/);
  assert.match(resetHtml, /data-generated="admin-auth-renderer"/);

  const notFoundHtml = read("src/pages/not-found.html");
  const serverErrorHtml = read("src/pages/server-error.html");
  const offlineHtml = read("src/pages/offline-maintenance.html");

  assert.match(notFoundHtml, /data-page="not-found"/);
  assert.match(notFoundHtml, /data-generated="error-support-renderer"/);
  assert.match(serverErrorHtml, /data-page="server-error"/);
  assert.match(serverErrorHtml, /data-generated="error-support-renderer"/);
  assert.match(offlineHtml, /data-page="offline-maintenance"/);
  assert.match(offlineHtml, /data-generated="error-support-renderer"/);

  const mediaUploadHtml = read("src/pages/admin/media-upload-modal.html");
  const articleEditorHtml = read("src/pages/admin/article-editor-workflow.html");

  assert.match(mediaUploadHtml, /data-page="media-upload-modal"/);
  assert.match(mediaUploadHtml, /data-generated="admin-workflow-support-renderer"/);
  assert.match(articleEditorHtml, /data-page="article-editor-workflow"/);
  assert.match(articleEditorHtml, /data-generated="admin-workflow-support-renderer"/);

  const mobileHtml = read("src/pages/mobile-wireframes.html");
  assert.match(mobileHtml, /data-page="mobile-wireframe-comps"/);
  assert.match(mobileHtml, /data-generated="mobile-wireframe-comps-renderer"/);
});
