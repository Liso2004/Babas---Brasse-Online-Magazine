const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const apiRoot = path.join(root, "apps", "api");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

const seed = {
  categories: [{ id: "essays", label: "Essays", slug: "essays" }],
  profiles: [{ id: "writer", type: "contributor", name: "Writer", role: "Author", slug: "writer", shortBio: "Writes essays." }],
  mediaItems: [{ id: "cover", title: "Cover", type: "image", url: "/media/cover.jpg", altText: "Cover", caption: "Cover image", credit: "Editorial" }],
  articles: [{ id: "first", title: "First", slug: "first", dek: "First essay", status: "published", categoryId: "essays", authorProfileId: "writer", publishedAt: "2026-07-01", featuredImage: { id: "cover", altText: "Cover" }, bodyBlocks: ["Body"], seo: { title: "First", description: "First essay" } }],
  reviews: [{ id: "review-one", articleId: "first", name: "Reader", rating: 4, body: "Strong work.", status: "pending" }]
};

function target(name) {
  const dir = path.join(root, ".test-data", `editorial-${name}-${process.pid}-${Date.now()}`);
  fs.mkdirSync(dir, { recursive: true });
  return { dir, file: path.join(dir, "publication.json") };
}

function request(port, method, pathname, payload, token) {
  return new Promise((resolve, reject) => {
    const body = payload === undefined ? "" : JSON.stringify(payload);
    const headers = body ? { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(body) } : {};
    if (token) headers.Authorization = `Bearer ${token}`;
    const req = http.request({ hostname: "127.0.0.1", port, path: pathname, method, headers }, (res) => {
      let responseBody = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => { responseBody += chunk; });
      res.on("end", () => resolve({ status: res.statusCode, body: responseBody ? JSON.parse(responseBody) : null }));
    });
    req.on("error", reject);
    if (body) req.write(body);
    req.end();
  });
}

test("publication store seeds editorial collections and survives restart", () => {
  const { SubmissionStore } = require(path.join(apiRoot, "submissionStore.js"));
  const location = target("restart");
  try {
    const store = new SubmissionStore(location.file, { seed });
    assert.equal(store.listArticles().length, 1);
    assert.equal(store.listProfiles().length, 1);
    assert.equal(store.listMediaItems().length, 1);
    assert.equal(store.listReviews().length, 1);
    store.saveArticle({ ...seed.articles[0], title: "First revised" });
    const restarted = new SubmissionStore(location.file);
    assert.equal(restarted.listArticles()[0].title, "First revised");
  } finally {
    fs.rmSync(location.dir, { recursive: true, force: true });
  }
});

test("publication store validates and persists article profile media and review mutations", () => {
  const { SubmissionStore } = require(path.join(apiRoot, "submissionStore.js"));
  const location = target("mutations");
  try {
    const store = new SubmissionStore(location.file, { seed });
    assert.equal(store.saveArticle({ ...seed.articles[0], id: "draft", slug: "draft", title: "Draft", status: "draft" }).status, "draft");
    assert.equal(store.saveProfile({ ...seed.profiles[0], name: "Writer Revised" }).name, "Writer Revised");
    assert.equal(store.saveMediaItem({ ...seed.mediaItems[0], caption: "Revised caption" }).caption, "Revised caption");
    assert.equal(store.updateReviewStatus("review-one", "approved").status, "approved");
    assert.throws(() => store.saveArticle({ title: "Missing fields" }), /required/i);
  } finally {
    fs.rmSync(location.dir, { recursive: true, force: true });
  }
});

test("API exposes published content and protects editorial mutations", async () => {
  const { SubmissionStore } = require(path.join(apiRoot, "submissionStore.js"));
  const { createApiServer } = require(path.join(apiRoot, "server.js"));
  const location = target("api");
  const store = new SubmissionStore(location.file, { seed });
  const server = createApiServer({ store, adminToken: "editor-token" });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const port = server.address().port;
  try {
    const publicContent = await request(port, "GET", "/api/content");
    const submittedReview = await request(port, "POST", "/api/articles/first/reviews", { name: "New Reader", rating: 5, body: "A considered response." });
    const denied = await request(port, "POST", "/api/admin/articles", seed.articles[0]);
    const editorial = await request(port, "GET", "/api/admin/editorial", undefined, "editor-token");
    const saved = await request(port, "POST", "/api/admin/articles", { ...seed.articles[0], id: "second", slug: "second", title: "Second", status: "draft" }, "editor-token");
    const review = await request(port, "PATCH", "/api/admin/reviews/review-one", { status: "approved" }, "editor-token");
    assert.equal(publicContent.status, 200);
    assert.equal(submittedReview.status, 201);
    assert.equal(submittedReview.body.status, "pending");
    assert.deepEqual(publicContent.body.articles.map((item) => item.slug), ["first"]);
    assert.equal(denied.status, 401);
    assert.equal(editorial.body.articles.length, 1);
    assert.equal(saved.status, 201);
    assert.equal(review.body.status, "approved");
  } finally {
    await new Promise((resolve) => server.close(resolve));
    fs.rmSync(location.dir, { recursive: true, force: true });
  }
});

test("article and profile media screens use the protected editorial API", () => {
  const app = read("apps/web/src/App.jsx");
  const articles = read("apps/web/src/pages/ArticleManagementPage.jsx");
  const profiles = read("apps/web/src/pages/ProfileMediaManagementPage.jsx");
  const moderation = read("apps/web/src/pages/CommentsReviewsModerationPage.jsx");
  assert.match(app, /fetch\("\/api\/content"/);
  assert.match(app, /fixtures=\{fixtures\}/);
  assert.match(articles, /fetch\("\/api\/admin\/editorial"/);
  assert.match(articles, /fetch\("\/api\/admin\/articles"/);
  assert.match(articles, /method: "PATCH"/);
  assert.match(profiles, /fetch\("\/api\/admin\/editorial"/);
  assert.match(profiles, /\/api\/admin\/profiles/);
  assert.match(profiles, /\/api\/admin\/media/);
  assert.match(moderation, /fetch\("\/api\/admin\/reviews"/);
  assert.match(moderation, /method: "DELETE"/);
  assert.match(moderation, /\/api\/admin\/reviews\//);
});

test("version one submission data migrates without losing reader records", () => {
  const { SubmissionStore } = require(path.join(apiRoot, "submissionStore.js"));
  const location = target("migration");
  try {
    fs.writeFileSync(location.file, JSON.stringify({ version: 1, newsletterSignups: [{ id: "signup", email: "reader@example.com" }] }));
    const migrated = new SubmissionStore(location.file, { seed });
    assert.equal(migrated.snapshot().newsletterSignups.length, 1);
    assert.equal(migrated.listArticles().length, 1);
    assert.equal(migrated.snapshot().version, 2);
  } finally {
    fs.rmSync(location.dir, { recursive: true, force: true });
  }
});

test("editorial seed is packaged while mutable publication data stays ignored", () => {
  assert.ok(fs.existsSync(path.join(apiRoot, "data", "editorial-seed.json")));
  const ignore = read(".gitignore");
  assert.match(ignore, /apps\/api\/data\/\*\.json/);
  assert.match(ignore, /!apps\/api\/data\/editorial-seed\.json/);
});
