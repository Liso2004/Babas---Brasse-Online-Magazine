const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const root = path.resolve(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8").replace(/^\uFEFF/, "");
}

async function load(relativePath) {
  return import(pathToFileURL(path.join(root, relativePath)).href + `?cache=${Date.now()}`);
}

test("profile detail route resolves without entering public navigation", async () => {
  const { getRouteByPath, publicNavigationRoutes } = await load("apps/web/src/routes.js");
  const route = getRouteByPath("/people/visceral-contributor");

  assert.equal(route.id, "profile-detail");
  assert.equal(route.params.slug, "visceral-contributor");
  assert.equal(publicNavigationRoutes.some((item) => item.id === "profile-detail"), false);
});

test("profile detail model exposes biography, links, image, and published work only", async () => {
  const fixtures = await load("apps/web/src/data/launchFixtures.js");
  const { buildProfileDetailRouteModel } = await load("apps/web/src/pages/profileDetailRouteModel.js");
  const draft = {
    ...fixtures.articles[0],
    id: "draft-profile-work",
    slug: "draft-profile-work",
    title: "Draft profile work",
    status: "draft"
  };
  const model = buildProfileDetailRouteModel({ ...fixtures, articles: [...fixtures.articles, draft] }, "visceral-contributor");

  assert.equal(model.state, "ready");
  assert.equal(model.profile.name, "Lerato Mokoena");
  assert.ok(model.profile.fullBio);
  assert.match(model.profile.image.url, /^\/media\//);
  assert.ok(Array.isArray(model.profile.socialLinks));
  assert.ok(model.publishedWorks.length > 0);
  assert.equal(model.publishedWorks.some((article) => article.status !== "published"), false);
  assert.equal(model.publishedWorks.some((article) => article.slug === "draft-profile-work"), false);
});

test("profile detail model returns an intentional not-found state", async () => {
  const fixtures = await load("apps/web/src/data/launchFixtures.js");
  const { buildProfileDetailRouteModel } = await load("apps/web/src/pages/profileDetailRouteModel.js");
  const model = buildProfileDetailRouteModel(fixtures, "missing-person");

  assert.equal(model.state, "not-found");
  assert.equal(model.profile, null);
  assert.equal(model.backHref, "/contributors");
});

test("profile cards and article bylines use canonical people routes", () => {
  const card = read("apps/web/src/components/FigmaProfileCard.jsx");
  const articleModel = read("apps/web/src/pages/articleDetailRouteModel.js");
  const app = read("apps/web/src/App.jsx");
  const page = read("apps/web/src/pages/ProfileDetailPage.jsx");

  assert.match(card, /\/people\/\$\{profile\.slug\}/);
  assert.match(articleModel, /\/people\/\$\{author\.slug\}/);
  assert.match(app, /ProfileDetailPage/);
  assert.match(page, /data-page="profile-detail"/);
  assert.match(page, /FigmaArticleCard/);
});

test("profile detail metadata uses the public profile identity", async () => {
  const fixtures = await load("apps/web/src/data/launchFixtures.js");
  const { buildRouteMetadata } = await load("apps/web/src/seo/routeMetadata.js");
  const route = { id: "profile-detail", label: "Profile", path: "/people/:slug" };
  const metadata = buildRouteMetadata(route, { slug: "visceral-contributor", fixtures });

  assert.match(metadata.title, /Lerato Mokoena/);
  assert.equal(metadata.canonicalPath, "/people/visceral-contributor");
  assert.match(metadata.description, /cultural essays/i);
});
