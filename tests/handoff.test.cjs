const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");
const { SubmissionStore } = require("../apps/api/submissionStore.js");
const { createApiServer } = require("../apps/api/server.js");

test("seed data initializes an empty store but deleted records stay deleted after restart", () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "babas-store-"));
  const dataPath = path.join(directory, "publication.json");
  const seed = {
    articles: [{ id: "seed-article", slug: "seed-article", title: "Seed article", status: "draft" }]
  };
  try {
    const first = new SubmissionStore(dataPath, { seed });
    assert.equal(first.listArticles().length, 1);
    first.deleteArticle("seed-article");
    const restarted = new SubmissionStore(dataPath, { seed });
    assert.equal(restarted.listArticles().length, 0);
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

test("the removed newsletter contract returns not found", async () => {
  const store = new SubmissionStore(null, {
    memory: true,
    seed: { articles: [{ id: "published", slug: "published-story", title: "Published", status: "published" }] }
  });
  const server = createApiServer({
    store,
    environment: { NODE_ENV: "test", BABAS_PUBLIC_SITE_URL: "https://magazine.example" }
  });
  await server.storeReady;
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  try {
    const { port } = server.address();
    const sitemap = await fetch(`http://127.0.0.1:${port}/sitemap.xml`);
    assert.equal(sitemap.status, 200);
    assert.match(await sitemap.text(), /https:\/\/magazine\.example\/visceral-mag\/published-story/);

    const response = await fetch(`http://127.0.0.1:${port}/api/newsletter-signups`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "reader@example.com" })
    });
    assert.equal(response.status, 404);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});

test("unfinished admin support routes are not in the production route contract", async () => {
  const routesModule = await import("../apps/web/src/routes.js");
  const paths = new Set(routesModule.routes.map((route) => route.path));
  assert.equal(paths.has("/admin/password-reset"), false);
  assert.equal(paths.has("/admin/media/upload"), false);
  assert.equal(paths.has("/admin/articles/editor-workflow"), false);
});
