const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

function filePath(relativePath) {
  return path.join(root, relativePath);
}

function read(relativePath) {
  return fs.readFileSync(filePath(relativePath), "utf8");
}

function load(relativePath) {
  delete require.cache[require.resolve(filePath(relativePath))];
  return require(filePath(relativePath));
}

test("Phase 4 Admin Dashboard plan documents the operational admin overview", () => {
  const plan = read("docs/PHASE4_ADMIN_DASHBOARD_PLAN.md");

  assert.match(plan, /Admin Dashboard/i);
  assert.match(plan, /authenticated editor access/i);
  assert.match(plan, /published articles/i);
  assert.match(plan, /drafts/i);
  assert.match(plan, /pending comments/i);
  assert.match(plan, /pending reviews/i);
  assert.match(plan, /new contact submissions/i);
  assert.match(plan, /recent activity/i);
  assert.match(plan, /permission-denied/i);
});

test("Admin Dashboard renderer exports helpers and preserves the final wireframe contract", () => {
  const { renderAdminDashboardPage, getDashboardMetrics, getRecentActivity } = load("src/render/admin-dashboard.js");
  const fixtures = load("src/content/fixtures.js");
  const html = renderAdminDashboardPage(fixtures);

  assert.equal(typeof renderAdminDashboardPage, "function");
  assert.equal(typeof getDashboardMetrics, "function");
  assert.equal(typeof getRecentActivity, "function");
  assert.match(html, /data-page="admin-dashboard"/);
  assert.match(html, /data-route="\/admin"/);
  assert.match(html, /data-area="admin"/);
  assert.match(html, /data-generated="admin-dashboard-renderer"/);
  assert.match(html, /data-wireframe-source="admin-dashboard.html"/);
  assert.match(html, /data-auth-required="editor"/);
});

test("Admin Dashboard metrics are derived from fixtures", () => {
  const { getDashboardMetrics, renderAdminDashboardPage } = load("src/render/admin-dashboard.js");
  const fixtures = load("src/content/fixtures.js");
  const metrics = getDashboardMetrics(fixtures);
  const html = renderAdminDashboardPage(fixtures);

  assert.deepEqual(metrics, {
    publishedArticles: 2,
    drafts: 1,
    pendingComments: 1,
    pendingReviews: 0,
    newContactSubmissions: 1
  });

  for (const key of Object.keys(metrics)) {
    assert.match(html, new RegExp(`data-metric="${key}"`));
    assert.match(html, new RegExp(`data-value="${metrics[key]}"`));
  }
});

test("Admin Dashboard includes recent activity table with actor item status timestamp and action", () => {
  const { getRecentActivity, renderAdminDashboardPage } = load("src/render/admin-dashboard.js");
  const fixtures = load("src/content/fixtures.js");
  const activity = getRecentActivity(fixtures);
  const html = renderAdminDashboardPage(fixtures);

  assert.ok(activity.length >= 3);
  assert.match(html, /data-section="recent-activity"/);
  assert.match(html, /data-column="actor"/);
  assert.match(html, /data-column="item"/);
  assert.match(html, /data-column="status"/);
  assert.match(html, /data-column="timestamp"/);
  assert.match(html, /data-column="next-action"/);
  assert.match(html, /Draft review placeholder/i);
  assert.match(html, /Pending comment placeholder/i);
  assert.match(html, /General inquiry/i);
});

test("Admin Dashboard includes quick actions to core admin workflows", () => {
  const { renderAdminDashboardPage } = load("src/render/admin-dashboard.js");
  const fixtures = load("src/content/fixtures.js");
  const html = renderAdminDashboardPage(fixtures);

  assert.match(html, /data-section="quick-actions"/);
  assert.match(html, /href="\/admin\/articles"/);
  assert.match(html, /New article/);
  assert.match(html, /href="\/admin\/moderation"/);
  assert.match(html, /Moderate/);
  assert.match(html, /href="\/admin\/profiles-media"/);
  assert.match(html, /Upload media/);
  assert.match(html, /href="\/admin\/contact-submissions"/);
  assert.match(html, /Inbox/);
});

test("Admin Dashboard includes loading, empty, error, and permission states", () => {
  const { renderAdminDashboardPage } = load("src/render/admin-dashboard.js");
  const fixtures = load("src/content/fixtures.js");
  const html = renderAdminDashboardPage(fixtures);

  assert.match(html, /data-section="dashboard-states"/);
  assert.match(html, /data-state-note="dashboard-loading"/);
  assert.match(html, /data-state-note="dashboard-empty"/);
  assert.match(html, /data-state-note="dashboard-error"/);
  assert.match(html, /data-state-note="permission-denied"/);
  assert.match(html, /href="\/admin\/login"/);
  assert.match(html, /retry/i);
});

test("Admin Dashboard page artifact is generated from the renderer contract", () => {
  const html = read("src/pages/admin/dashboard.html");

  assert.match(html, /data-page="admin-dashboard"/);
  assert.match(html, /data-route="\/admin"/);
  assert.match(html, /data-generated="admin-dashboard-renderer"/);
  assert.match(html, /data-section="dashboard-stats"/);
  assert.match(html, /data-section="recent-activity"/);
  assert.match(html, /data-section="quick-actions"/);
  assert.match(html, /data-section="dashboard-states"/);
});
