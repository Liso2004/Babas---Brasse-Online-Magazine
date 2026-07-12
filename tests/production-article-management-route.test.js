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

async function loadArticleManagementModel() {
  const modulePath = filePath("apps/web/src/pages/articleManagementRouteModel.js");
  assert.ok(fs.existsSync(modulePath), "apps/web/src/pages/articleManagementRouteModel.js should exist");
  return import(pathToFileURL(modulePath).href);
}

function loadFixtures() {
  delete require.cache[require.resolve(filePath("src/content/fixtures.js"))];
  return require(filePath("src/content/fixtures.js"));
}

test("production Article Management route model preserves the protected editorial workflow", async () => {
  const { buildArticleManagementRouteModel } = await loadArticleManagementModel();
  const model = buildArticleManagementRouteModel(loadFixtures());

  assert.equal(model.pageId, "article-management");
  assert.equal(model.generatedFrom, "article-management-route-model");
  assert.equal(model.route.path, "/admin/articles");
  assert.equal(model.route.prototypeFile, "src/pages/admin/article-management.html");
  assert.equal(model.auth.required, true);
  assert.equal(model.auth.role, "admin");
  assert.match(model.hero.title, /Editorial publishing workflow/i);
});

test("production Article Management model includes all article rows including drafts", async () => {
  const { buildArticleManagementRouteModel, getArticleRows } = await loadArticleManagementModel();
  const fixtures = loadFixtures();
  const rows = getArticleRows(fixtures);
  const model = buildArticleManagementRouteModel(fixtures);

  assert.equal(rows.length, fixtures.articles.length);
  assert.deepEqual(rows.map((row) => row.title), ["Send A Text Before You Knock", "Culture Review Placeholder", "Artist Interview Placeholder"]);
  assert.deepEqual(model.sections.articleTable.columns, ["title", "status", "category", "author", "date", "seo-readiness", "row-actions"]);
  assert.ok(model.sections.articleTable.items.some((row) => row.status === "draft"));
  assert.ok(model.sections.articleTable.items.every((row) => row.editHref.startsWith("/admin/articles/")));
});

test("production Article Management model includes fixture-derived stats and toolbar filters", async () => {
  const { buildArticleManagementRouteModel, getArticleManagementStats } = await loadArticleManagementModel();
  const fixtures = loadFixtures();
  const stats = getArticleManagementStats(fixtures);
  const model = buildArticleManagementRouteModel(fixtures);

  assert.deepEqual(stats, {
    totalArticles: 3,
    publishedArticles: 2,
    draftArticles: 1,
    seoReadyArticles: 3
  });
  assert.deepEqual(model.sections.toolbar.metrics.map((metric) => metric.key), Object.keys(stats));
  assert.deepEqual(model.sections.toolbar.filters.map((filter) => filter.name), ["status", "category", "seo-readiness"]);
  assert.equal(model.sections.toolbar.search.name, "article-search");
  assert.equal(model.sections.toolbar.createHref, "/admin/articles/new");
});

test("production Article Management model includes required editor fields and row actions", async () => {
  const { buildArticleManagementRouteModel } = await loadArticleManagementModel();
  const model = buildArticleManagementRouteModel(loadFixtures());
  const rowActions = model.sections.articleTable.items.flatMap((row) => row.actions.map((action) => action.type));

  assert.deepEqual(model.sections.editor.fields.map((field) => field.name), ["title", "slug", "dek", "categoryId", "authorProfileId", "featuredImageId", "altText", "body", "seoTitle", "seoDescription", "ogTitle", "ogDescription"]);
  assert.deepEqual(model.sections.editor.actions.map((action) => action.action), ["autosave", "draft", "publish"]);
  assert.ok(rowActions.includes("edit"));
  assert.ok(rowActions.includes("preview"));
  assert.ok(rowActions.includes("publish"));
  assert.ok(rowActions.includes("unpublish"));
});

test("production Article Management model exposes publishing states", async () => {
  const { buildArticleManagementRouteModel } = await loadArticleManagementModel();
  const model = buildArticleManagementRouteModel(loadFixtures());

  assert.deepEqual(model.sections.states.notes, ["article-draft", "article-publish", "article-autosave", "article-validation", "article-failure"]);
  assert.deepEqual(model.sections.states.items, ["draft", "publish", "autosave", "validation", "failure"]);
  assert.match(model.sections.states.validationCopy, /missing required fields/i);
  assert.match(model.sections.states.failureCopy, /retry/i);
});

test("React-ready ArticleManagementPage component is scaffolded from the route model", () => {
  assert.ok(exists("apps/web/src/pages/ArticleManagementPage.jsx"), "ArticleManagementPage.jsx should exist");
  const component = read("apps/web/src/pages/ArticleManagementPage.jsx");
  const app = read("apps/web/src/App.jsx");

  assert.match(component, /export function ArticleManagementPage/);
  assert.match(component, /buildArticleManagementRouteModel/);
  assert.match(component, /data-page="article-management"/);
  assert.match(component, /data-section="article-management-intro"/);
  assert.match(component, /data-section="article-toolbar"/);
  assert.match(component, /data-section="article-table"/);
  assert.match(component, /data-section="article-editor"/);
  assert.match(component, /data-section="article-states"/);
  assert.match(app, /ArticleManagementPage/);
  assert.match(app, /route\.id === "article-management"/);
});

test("Article Management route migration handoff is documented and wired into scripts", () => {
  const rootPkg = JSON.parse(read("package.json"));
  const runTests = read("tests/run-tests.js");
  const readme = read("apps/web/README.md");
  const planStatus = read("docs/PLAN_STATUS.md");

  assert.ok(rootPkg.scripts["test:production-article-management"]);
  assert.match(runTests, /production-article-management-route\.test\.js/);
  assert.match(readme, /Article Management route migration/i);
  assert.match(planStatus, /Article Management route migration/i);
});
