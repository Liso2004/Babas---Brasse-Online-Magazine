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

async function loadFeaturedMediaModel() {
  const modulePath = filePath("apps/web/src/pages/featuredMediaRouteModel.js");
  assert.ok(fs.existsSync(modulePath), "apps/web/src/pages/featuredMediaRouteModel.js should exist");
  return import(pathToFileURL(modulePath).href);
}

function loadFixtures() {
  delete require.cache[require.resolve(filePath("src/content/fixtures.js"))];
  return require(filePath("src/content/fixtures.js"));
}

test("production Featured/Media route model preserves the gallery surface", async () => {
  const { buildFeaturedMediaRouteModel } = await loadFeaturedMediaModel();
  const model = buildFeaturedMediaRouteModel(loadFixtures());

  assert.equal(model.pageId, "featured-media");
  assert.equal(model.generatedFrom, "featured-media-route-model");
  assert.equal(model.route.path, "/featured");
  assert.equal(model.route.prototypeFile, "src/pages/featured-media.html");
  assert.match(model.hero.title, /Photography, artwork, and visual notes/i);
  assert.equal(model.sections.mediaGallery.state, "ready");
});

test("production Featured/Media model renders every launch media asset with metadata", async () => {
  const { buildFeaturedMediaRouteModel, getFeaturedMediaItems } = await loadFeaturedMediaModel();
  const fixtures = loadFixtures();
  const model = buildFeaturedMediaRouteModel(fixtures);
  const mediaItems = getFeaturedMediaItems(fixtures);

  assert.deepEqual(mediaItems.map((item) => item.id), ["opening-banner", "photography-feature", "artwork-feature"]);
  assert.deepEqual(model.sections.mediaGallery.items.map((item) => item.id), ["opening-banner", "photography-feature", "artwork-feature"]);
  assert.ok(model.sections.mediaGallery.items.every((item) => item.altText));
  assert.ok(model.sections.mediaGallery.items.every((item) => item.caption));
  assert.ok(model.sections.mediaGallery.items.every((item) => item.credit));
  assert.ok(model.sections.mediaGallery.items.every((item) => item.type));
  assert.ok(model.sections.mediaGallery.items.every((item) => item.thumbnail && item.href && item.height));
});

test("production Featured/Media links published article media while excluding drafts", async () => {
  const { buildFeaturedMediaRouteModel, getPublishedMediaArticles } = await loadFeaturedMediaModel();
  const fixtures = loadFixtures();
  const model = buildFeaturedMediaRouteModel(fixtures);
  const articles = getPublishedMediaArticles(fixtures);
  const serialized = JSON.stringify(model);

  assert.deepEqual(articles.map((article) => article.slug), ["send-a-text-before-you-knock", "artist-interview-placeholder"]);
  assert.deepEqual(model.sections.articleMediaLinks.items.map((article) => article.slug), ["send-a-text-before-you-knock", "artist-interview-placeholder"]);
  assert.ok(model.sections.articleMediaLinks.items.every((article) => article.status === "published"));
  assert.ok(model.sections.articleMediaLinks.items.every((article) => article.href.startsWith("/visceral-mag/")));
  assert.ok(model.sections.articleMediaLinks.items.every((article) => article.category && article.author && article.publishedAt));
  assert.doesNotMatch(serialized, /Culture Review Placeholder/);
  assert.doesNotMatch(serialized, /"status":"draft"/);
});

test("production Featured/Media model exposes empty media state", async () => {
  const { buildFeaturedMediaRouteModel } = await loadFeaturedMediaModel();
  const fixtures = loadFixtures();
  const model = buildFeaturedMediaRouteModel({ ...fixtures, mediaItems: [] });

  assert.equal(model.sections.mediaGallery.state, "no-media");
  assert.equal(model.sections.mediaGallery.items.length, 0);
  assert.equal(model.sections.mediaGallery.heading, "No featured media is published yet");
  assert.equal(model.sections.mediaGallery.contactHref, "/contact");
});

test("React-ready FeaturedMediaPage component is scaffolded from the route model", () => {
  assert.ok(exists("apps/web/src/pages/FeaturedMediaPage.jsx"), "FeaturedMediaPage.jsx should exist");
  const component = read("apps/web/src/pages/FeaturedMediaPage.jsx");
  const app = read("apps/web/src/App.jsx");

  assert.match(component, /export function FeaturedMediaPage/);
  assert.match(component, /buildFeaturedMediaRouteModel/);
  assert.match(component, /data-page="featured-media"/);
  assert.match(component, /data-section="media-intro"/);
  assert.match(component, /data-section="media-gallery"/);
  assert.match(component, /import Masonry from "\.\.\/components\/Masonry\.jsx"/);
  assert.match(component, /<Masonry/);
  assert.match(component, /variant="overlay"/);
  assert.doesNotMatch(component, /figma-media-gallery|figma-published-story-feed|<FigmaArticleCard/);
  assert.match(component, /data-state="no-media"/);
  assert.match(app, /FeaturedMediaPage/);
  assert.match(app, /route\.id === "featured"/);
});

test("Featured/Media route migration handoff is documented and wired into scripts", () => {
  const rootPkg = JSON.parse(read("package.json"));
  const runTests = read("tests/run-tests.js");
  const readme = read("apps/web/README.md");
  const planStatus = read("docs/PLAN_STATUS.md");

  assert.ok(rootPkg.scripts["test:production-featured-media"]);
  assert.match(runTests, /production-featured-media-route\.test\.js/);
  assert.match(readme, /Featured\/Media route migration/i);
  assert.match(planStatus, /Featured\/Media route migration/i);
});
