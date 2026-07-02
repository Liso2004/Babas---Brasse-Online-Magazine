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
  return fs.readFileSync(filePath(relativePath), "utf8");
}

function readJson(relativePath) {
  return JSON.parse(read(relativePath));
}

function load(relativePath) {
  delete require.cache[require.resolve(filePath(relativePath))];
  return require(filePath(relativePath));
}

test("Phase 0 frontend scaffold plan is documented", () => {
  assert.ok(exists("docs/FRONTEND_SCAFFOLD_PLAN.md"), "frontend scaffold plan should exist");
  const plan = read("docs/FRONTEND_SCAFFOLD_PLAN.md");

  assert.match(plan, /Phase 0/i);
  assert.match(plan, /dependency-light/i);
  assert.match(plan, /Next\.js/i);
  assert.match(plan, /route scaffold tests/i);
});

test("route map mirrors the wireframe public and admin routes", () => {
  const spec = readJson("wireframes/wireframe-spec.json");
  const { publicRoutes, adminRoutes, allRoutes } = load("src/routes.js");

  assert.deepEqual(publicRoutes.map((route) => route.id), spec.publicScreens.map((screen) => screen.id));
  assert.deepEqual(publicRoutes.map((route) => route.path), spec.publicScreens.map((screen) => screen.route));
  assert.deepEqual(adminRoutes.map((route) => route.id), spec.adminScreens.map((screen) => screen.id));
  assert.deepEqual(adminRoutes.map((route) => route.path), spec.adminScreens.map((screen) => screen.route));
  assert.equal(allRoutes.length, spec.publicScreens.length + spec.adminScreens.length);

  for (const route of allRoutes) {
    assert.ok(route.label, `${route.id} should have a label`);
    assert.ok(route.purpose, `${route.id} should have a purpose`);
    assert.ok(["public", "admin"].includes(route.area), `${route.id} should define an area`);
  }
});

test("page placeholders exist for every route in the scaffold", () => {
  const { allRoutes } = load("src/routes.js");

  for (const route of allRoutes) {
    assert.ok(route.file, `${route.id} should have a file path`);
    assert.ok(exists(route.file), `${route.file} should exist`);
    const content = read(route.file);
    assert.match(content, new RegExp(`data-page="${route.id}"`));
    assert.match(content, new RegExp(route.path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("fixture content covers MVP entities and required editorial states", () => {
  const fixtures = load("src/content/fixtures.js");

  assert.ok(fixtures.categories.length >= 4, "categories should include launch browsing options");
  assert.ok(fixtures.articles.length >= 3, "articles should include sample launch content");
  assert.ok(fixtures.profiles.some((profile) => profile.type === "creative_team"));
  assert.ok(fixtures.profiles.some((profile) => profile.type === "contributor"));
  assert.ok(fixtures.mediaItems.length >= 3, "media items should cover Featured/Media");
  assert.ok(fixtures.comments.some((comment) => comment.status === "pending"));
  assert.ok(fixtures.comments.some((comment) => comment.status === "approved"));
  assert.ok(fixtures.reviews.some((review) => review.status === "rejected"));
  assert.ok(fixtures.contactSubmissions.some((submission) => submission.status === "new"));

  const sample = fixtures.articles.find((article) => article.slug === "send-a-text-before-you-knock");
  assert.ok(sample, "sample article should exist");
  assert.equal(sample.status, "published");
  assert.ok(sample.seo.title);
  assert.ok(sample.seo.description);
  assert.ok(sample.featuredImage.altText);
});

test("app shell artifact includes public and admin navigation from route map", () => {
  assert.ok(exists("src/app-shell.html"), "app shell should exist");
  const { publicRoutes, adminRoutes } = load("src/routes.js");
  const html = read("src/app-shell.html");

  assert.match(html, /data-app="babas-brasse-mvp"/);
  assert.match(html, /data-nav="public"/);
  assert.match(html, /data-nav="admin"/);

  for (const route of [...publicRoutes, ...adminRoutes]) {
    assert.match(html, new RegExp(`href="${route.path}"`));
  }
});
