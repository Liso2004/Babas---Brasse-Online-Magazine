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

async function loadArticleDetailModel() {
  const modulePath = filePath("apps/web/src/pages/articleDetailRouteModel.js");
  assert.ok(fs.existsSync(modulePath), "apps/web/src/pages/articleDetailRouteModel.js should exist");
  return import(pathToFileURL(modulePath).href);
}

function loadFixtures() {
  delete require.cache[require.resolve(filePath("src/content/fixtures.js"))];
  return require(filePath("src/content/fixtures.js"));
}

test("production Article Detail route model renders the published sample article", async () => {
  const { buildArticleDetailRouteModel } = await loadArticleDetailModel();
  const model = buildArticleDetailRouteModel(loadFixtures(), "send-a-text-before-you-knock");

  assert.equal(model.pageId, "article-detail");
  assert.equal(model.generatedFrom, "article-detail-route-model");
  assert.equal(model.route.path, "/visceral-mag/:slug");
  assert.equal(model.route.prototypeFile, "src/pages/article-detail.html");
  assert.equal(model.state, "published");
  assert.equal(model.article.slug, "send-a-text-before-you-knock");
  assert.equal(model.article.title, "Send A Text Before You Knock");
  assert.equal(model.article.href, "/visceral-mag/send-a-text-before-you-knock");
  assert.equal(model.article.category.label, "Essays");
  assert.equal(model.article.author.name, "Visceral Contributor");
  assert.equal(model.article.featuredImage.altText, "Babas and Brasse opening banner placeholder");
  assert.deepEqual(model.article.bodyBlocks, ["Opening paragraph placeholder.", "Body paragraph placeholder."]);
});

test("production Article Detail model includes related articles and SEO metadata", async () => {
  const { buildArticleDetailRouteModel } = await loadArticleDetailModel();
  const model = buildArticleDetailRouteModel(loadFixtures(), "send-a-text-before-you-knock");

  assert.deepEqual(model.relatedArticles.map((article) => article.slug), ["artist-interview-placeholder"]);
  assert.equal(model.seo.title, "Send A Text Before You Knock | Babas & Brasse");
  assert.equal(model.seo.description, "A launch sample article for the Babas & Brasse online magazine MVP.");
  assert.equal(model.seo.ogTitle, "Send A Text Before You Knock");
  assert.equal(model.seo.ogDescription, "Read the launch sample article on Babas & Brasse.");
});

test("production Article Detail model exposes approved comments and reviews only", async () => {
  const { buildArticleDetailRouteModel } = await loadArticleDetailModel();
  const model = buildArticleDetailRouteModel(loadFixtures(), "send-a-text-before-you-knock");
  const serialized = JSON.stringify(model);

  assert.deepEqual(model.comments.map((comment) => comment.body), ["Approved comment placeholder."]);
  assert.deepEqual(model.reviews.map((review) => review.body), ["Approved review placeholder."]);
  assert.deepEqual(model.reviews.map((review) => review.rating), [4]);
  assert.doesNotMatch(serialized, /Pending comment placeholder/);
  assert.doesNotMatch(serialized, /Rejected review placeholder/);
});

test("production Article Detail model protects draft and missing slugs", async () => {
  const { buildArticleDetailRouteModel } = await loadArticleDetailModel();
  const draft = buildArticleDetailRouteModel(loadFixtures(), "culture-review-placeholder");
  const missing = buildArticleDetailRouteModel(loadFixtures(), "missing-article");

  assert.equal(draft.state, "not-found");
  assert.equal(draft.slug, "culture-review-placeholder");
  assert.equal(draft.article, null);
  assert.equal(missing.state, "not-found");
  assert.equal(missing.slug, "missing-article");
  assert.equal(missing.backHref, "/visceral-mag");
});

test("React-ready ArticleDetailPage component is scaffolded from the route model", () => {
  assert.ok(exists("apps/web/src/pages/ArticleDetailPage.jsx"), "ArticleDetailPage.jsx should exist");
  const component = read("apps/web/src/pages/ArticleDetailPage.jsx");
  const app = read("apps/web/src/App.jsx");

  assert.match(component, /export function ArticleDetailPage/);
  assert.match(component, /buildArticleDetailRouteModel/);
  assert.match(component, /data-page="article-detail"/);
  assert.match(component, /data-section="article-hero"/);
  assert.match(component, /data-section="article-meta"/);
  assert.match(component, /data-section="article-body"/);
  assert.match(component, /data-section="related-articles"/);
  assert.match(component, /data-section="comments"/);
  assert.match(component, /data-section="reviews"/);
  assert.match(component, /data-section="seo-metadata"/);
  assert.match(app, /ArticleDetailPage/);
  assert.match(app, /route\.id === "article-detail"/);
});

test("Article Detail route migration handoff is documented and wired into scripts", () => {
  const rootPkg = JSON.parse(read("package.json"));
  const runTests = read("tests/run-tests.js");
  const readme = read("apps/web/README.md");
  const planStatus = read("docs/PLAN_STATUS.md");

  assert.ok(rootPkg.scripts["test:production-article-detail"]);
  assert.match(runTests, /production-article-detail-route\.test\.js/);
  assert.match(readme, /Article Detail route migration/i);
  assert.match(planStatus, /Article Detail route migration/i);
});
