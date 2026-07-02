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

test("Phase 5 error support screen plan documents 404 500 and offline maintenance", () => {
  const plan = read("docs/PHASE5_ERROR_SUPPORT_SCREENS_PLAN.md");

  assert.match(plan, /Error Support Screens/i);
  assert.match(plan, /404/i);
  assert.match(plan, /500/i);
  assert.match(plan, /Offline/i);
  assert.match(plan, /Maintenance/i);
  assert.match(plan, /shared public nav/i);
  assert.match(plan, /plain language/i);
  assert.match(plan, /Home/i);
  assert.match(plan, /Articles/i);
  assert.match(plan, /Search/i);
  assert.match(plan, /Contact/i);
  assert.match(plan, /minimal footer/i);
});

test("error support renderer exports all three support pages and route metadata", () => {
  const { renderNotFoundPage, renderServerErrorPage, renderOfflineMaintenancePage, getErrorSupportRoutes } = load("src/render/error-support.js");
  const notFound = renderNotFoundPage();
  const serverError = renderServerErrorPage();
  const offline = renderOfflineMaintenancePage();
  const routes = getErrorSupportRoutes();

  assert.equal(typeof renderNotFoundPage, "function");
  assert.equal(typeof renderServerErrorPage, "function");
  assert.equal(typeof renderOfflineMaintenancePage, "function");
  assert.equal(typeof getErrorSupportRoutes, "function");
  assert.deepEqual(routes.map((route) => route.path), ["/404", "/500", "/offline"]);

  assert.match(notFound, /data-page="not-found"/);
  assert.match(notFound, /data-route="\/404"/);
  assert.match(notFound, /data-generated="error-support-renderer"/);
  assert.match(notFound, /data-wireframe-source="not-found.html"/);

  assert.match(serverError, /data-page="server-error"/);
  assert.match(serverError, /data-route="\/500"/);
  assert.match(serverError, /data-generated="error-support-renderer"/);
  assert.match(serverError, /data-wireframe-source="server-error.html"/);

  assert.match(offline, /data-page="offline-maintenance"/);
  assert.match(offline, /data-route="\/offline"/);
  assert.match(offline, /data-generated="error-support-renderer"/);
  assert.match(offline, /data-wireframe-source="offline-maintenance.html"/);
});

test("error support pages preserve shared public nav and recovery routes", () => {
  const { renderNotFoundPage, renderServerErrorPage, renderOfflineMaintenancePage } = load("src/render/error-support.js");
  const pages = [renderNotFoundPage(), renderServerErrorPage(), renderOfflineMaintenancePage()];

  for (const html of pages) {
    assert.match(html, /data-section="support-public-nav"/);
    assert.match(html, /B&amp;B/);
    assert.match(html, /href="\/"/);
    assert.match(html, /href="\/visceral-mag"/);
    assert.match(html, /href="\/search"/);
    assert.match(html, /href="\/contact"/);
    assert.match(html, /data-section="recovery-routes"/);
    assert.match(html, /Home/);
    assert.match(html, /Articles/);
    assert.match(html, /Search/);
    assert.match(html, /Contact/);
    assert.match(html, /data-section="support-footer"/);
    assert.match(html, /minimal footer/i);
  }
});

test("404 Not Found page explains missing pages and slug recovery", () => {
  const { renderNotFoundPage } = load("src/render/error-support.js");
  const html = renderNotFoundPage();

  assert.match(html, /data-section="not-found-message"/);
  assert.match(html, /404/);
  assert.match(html, /Page not found/i);
  assert.match(html, /broken links/i);
  assert.match(html, /removed articles/i);
  assert.match(html, /mistyped URLs/i);
  assert.match(html, /data-section="not-found-states"/);
  assert.match(html, /data-state-note="missing-public-page"/);
  assert.match(html, /data-state-note="removed-article"/);
  assert.match(html, /data-state-note="invalid-slug"/);
  assert.match(html, /data-state-note="reset-to-search"/);
});

test("500 Server Error page explains failure and retry recovery", () => {
  const { renderServerErrorPage } = load("src/render/error-support.js");
  const html = renderServerErrorPage();

  assert.match(html, /data-section="server-error-message"/);
  assert.match(html, /500/);
  assert.match(html, /Server problem/i);
  assert.match(html, /failed request/i);
  assert.match(html, /temporary application fault/i);
  assert.match(html, /data-action="retry"/);
  assert.match(html, /data-section="server-error-states"/);
  assert.match(html, /data-state-note="failed-request"/);
  assert.match(html, /data-state-note="retry"/);
  assert.match(html, /data-state-note="contact-support"/);
  assert.match(html, /data-state-note="safe-fallback-navigation"/);
});

test("Offline Maintenance page covers no-network maintenance and cached states", () => {
  const { renderOfflineMaintenancePage } = load("src/render/error-support.js");
  const html = renderOfflineMaintenancePage();

  assert.match(html, /data-section="offline-message"/);
  assert.match(html, /Offline/);
  assert.match(html, /Maintenance/);
  assert.match(html, /no network/i);
  assert.match(html, /maintenance window/i);
  assert.match(html, /cached content/i);
  assert.match(html, /data-action="refresh"/);
  assert.match(html, /data-section="offline-states"/);
  assert.match(html, /data-state-note="no-network"/);
  assert.match(html, /data-state-note="maintenance-window"/);
  assert.match(html, /data-state-note="refresh"/);
  assert.match(html, /data-state-note="cached-content"/);
  assert.match(html, /data-state-note="contact-fallback"/);
});

test("error support page artifacts are generated from the renderer contract", () => {
  const artifacts = [
    ["src/pages/not-found.html", "not-found", "/404"],
    ["src/pages/server-error.html", "server-error", "/500"],
    ["src/pages/offline-maintenance.html", "offline-maintenance", "/offline"]
  ];

  for (const [file, page, route] of artifacts) {
    assert.ok(exists(file), `${file} should exist`);
    const html = read(file);
    assert.match(html, new RegExp(`data-page="${page}"`));
    assert.match(html, new RegExp(`data-route="${route.replace("/", "\\/")}"`));
    assert.match(html, /data-generated="error-support-renderer"/);
    assert.match(html, /data-section="recovery-routes"/);
  }
});
