const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

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

async function loadModerationModel() {
  const modulePath = filePath("apps/web/src/pages/commentsReviewsModerationRouteModel.js");
  assert.ok(fs.existsSync(modulePath), "apps/web/src/pages/commentsReviewsModerationRouteModel.js should exist");
  return import(pathToFileURL(modulePath).href);
}

function loadFixtures() {
  delete require.cache[require.resolve(filePath("src/content/fixtures.js"))];
  return require(filePath("src/content/fixtures.js"));
}

test("production Moderation route model preserves the protected comments and reviews workflow", async () => {
  const { buildCommentsReviewsModerationRouteModel } = await loadModerationModel();
  const model = buildCommentsReviewsModerationRouteModel(loadFixtures());

  assert.equal(model.pageId, "comments-reviews-moderation");
  assert.equal(model.generatedFrom, "comments-reviews-moderation-route-model");
  assert.equal(model.route.path, "/admin/moderation");
  assert.equal(model.route.prototypeFile, "src/pages/admin/comments-reviews-moderation.html");
  assert.equal(model.auth.required, true);
  assert.equal(model.auth.role, "admin");
  assert.match(model.hero.title, /Queue-driven public conversation review/i);
});

test("production Moderation model combines comments and reviews with article context", async () => {
  const { buildCommentsReviewsModerationRouteModel, getModerationItems } = await loadModerationModel();
  const fixtures = loadFixtures();
  const items = getModerationItems(fixtures);
  const model = buildCommentsReviewsModerationRouteModel(fixtures);

  assert.equal(items.length, fixtures.comments.length + fixtures.reviews.length);
  assert.equal(items.filter((item) => item.type === "comment").length, 2);
  assert.equal(items.filter((item) => item.type === "review").length, 2);
  assert.deepEqual(model.sections.workspace.columns, ["type", "author", "article", "status", "body", "row-actions"]);
  assert.match(JSON.stringify(model.sections.workspace.items), /Pending comment placeholder/);
  assert.match(JSON.stringify(model.sections.workspace.items), /Approved review placeholder/);
});

test("production Moderation model includes stats pending counts and queue filters", async () => {
  const { buildCommentsReviewsModerationRouteModel, getModerationStats } = await loadModerationModel();
  const fixtures = loadFixtures();
  const stats = getModerationStats(fixtures);
  const model = buildCommentsReviewsModerationRouteModel(fixtures);

  assert.deepEqual(stats, { totalItems: 4, pendingItems: 1, approvedItems: 2, rejectedItems: 1, comments: 2, reviews: 2 });
  assert.equal(model.nav.pendingCount, 1);
  assert.deepEqual(model.sections.stats.items.map((metric) => metric.key), Object.keys(stats));
  assert.deepEqual(model.sections.queues.filters.map((filter) => filter.name), ["status", "type", "article", "date"]);
  assert.equal(model.sections.queues.search.name, "moderation-search");
});

test("production Moderation model exposes selected item actions and public rendering states", async () => {
  const { buildCommentsReviewsModerationRouteModel } = await loadModerationModel();
  const model = buildCommentsReviewsModerationRouteModel(loadFixtures());

  assert.equal(model.sections.workspace.selectedItem.id, "comment-1");
  assert.deepEqual(model.sections.actions.items.map((action) => action.action), ["approve", "reject", "delete"]);
  assert.equal(model.sections.actions.items.find((action) => action.action === "delete").confirmationRequired, true);
  assert.deepEqual(model.sections.states.notes, ["moderation-pending", "approved-only-public", "moderation-undo", "moderation-error", "permission-denied"]);
  assert.equal(model.sections.states.permissionHref, "/admin/login");
  assert.match(model.sections.states.publicRuleCopy, /Approved-only public rendering/i);
});

test("React-ready CommentsReviewsModerationPage component is scaffolded from the route model", () => {
  assert.ok(exists("apps/web/src/pages/CommentsReviewsModerationPage.jsx"), "CommentsReviewsModerationPage.jsx should exist");
  const component = read("apps/web/src/pages/CommentsReviewsModerationPage.jsx");
  const app = read("apps/web/src/App.jsx");

  assert.match(component, /export function CommentsReviewsModerationPage/);
  assert.match(component, /buildCommentsReviewsModerationRouteModel/);
  assert.match(component, /fetch\("\/api\/admin\/comments"/);
  assert.match(component, /name="moderation-article"/);
  assert.match(component, /name="moderation-rating"/);
  assert.match(component, /credentials: "include"/);
  assert.match(component, /method: "PATCH"/);
  assert.match(component, /data-page="comments-reviews-moderation"/);
  assert.match(component, /data-section="moderation-intro"/);
  assert.match(component, /data-section="moderation-stats"/);
  assert.match(component, /data-section="moderation-queues"/);
  assert.match(component, /data-section="moderation-workspace"/);
  assert.match(component, /data-section="moderation-actions"/);
  assert.match(component, /data-section="moderation-states"/);
  assert.match(app, /CommentsReviewsModerationPage/);
  assert.match(app, /route\.id === "moderation"/);
});

test("Comments Reviews Moderation route migration handoff is documented and wired into scripts", () => {
  const rootPkg = JSON.parse(read("package.json"));
  const runTests = read("tests/run-tests.js");
  const readme = read("apps/web/README.md");
  const planStatus = read("docs/PLAN_STATUS.md");

  assert.ok(rootPkg.scripts["test:production-comments-reviews-moderation"]);
  assert.match(runTests, /production-comments-reviews-moderation-route\.test\.js/);
  assert.match(readme, /Comments \/ Reviews Moderation route migration/i);
  assert.match(planStatus, /Comments \/ Reviews Moderation route migration/i);
});
