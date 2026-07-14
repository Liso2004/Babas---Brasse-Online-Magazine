const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { SubmissionStore } = require("../apps/api/submissionStore.js");

const root = path.resolve(__dirname, "..");
function read(relativePath) { return fs.readFileSync(path.join(root, relativePath), "utf8").replace(/^\uFEFF/, ""); }

function seed() {
  return {
    categories: [{ id: "essays", label: "Essays", slug: "essays" }],
    profiles: [{ id: "writer", type: "contributor", name: "Writer", role: "Essayist", slug: "writer", shortBio: "Writes essays." }],
    mediaItems: [{ id: "cover", title: "Cover", type: "image", url: "/cover.jpg", altText: "Cover", caption: "Cover", credit: "Studio" }],
    articles: [{ id: "story", slug: "story", title: "Story", status: "draft", authorProfileId: "writer", featuredImage: { id: "cover" } }],
    contactSubmissions: [], comments: [], reviews: []
  };
}

test("content deletion protects referenced profiles and media, then persists clean deletion", () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "babas-content-delete-"));
  try {
    const store = new SubmissionStore(path.join(directory, "data.json"), { seed: seed() });
    assert.throws(() => store.deleteProfile("writer"), /published work|article/i);
    assert.throws(() => store.deleteMediaItem("cover"), /article/i);
    assert.equal(store.deleteArticle("story").id, "story");
    assert.equal(store.deleteProfile("writer").id, "writer");
    assert.equal(store.deleteMediaItem("cover").id, "cover");
    assert.equal(store.listArticles().length, 0);
    assert.equal(store.listProfiles().length, 0);
    assert.equal(store.listMediaItems().length, 0);
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

test("protected API exposes profile create and confirmed content delete endpoints", () => {
  const server = read("apps/api/server.js");
  assert.match(server, /request\.method === "POST" && url\.pathname === "\/api\/admin\/profiles"/);
  assert.match(server, /request\.method === "DELETE" && articleMatch/);
  assert.match(server, /store\.deleteArticle/);
  assert.match(server, /request\.method === "DELETE" && profileMatch/);
  assert.match(server, /store\.deleteProfile/);
  assert.match(server, /request\.method === "DELETE" && mediaMatch/);
  assert.match(server, /store\.deleteMediaItem/);
});

test("article management uses functional search, filters, and confirmed delete", () => {
  const page = read("apps/web/src/pages/ArticleManagementPage.jsx");
  assert.match(page, /setSearchQuery/);
  assert.match(page, /filteredRows/);
  assert.match(page, /name="article-status"/);
  assert.match(page, /name="article-category"/);
  assert.match(page, /name="article-seo-readiness"/);
  assert.match(page, /method: "DELETE"/);
  assert.match(page, /Delete article/);
});

test("profile and media management supports profile create, social links, and guarded delete", () => {
  const page = read("apps/web/src/pages/ProfileMediaManagementPage.jsx");
  const store = read("apps/api/submissionStore.js");
  assert.match(page, /Create profile/);
  assert.match(page, /name="fullBio"/);
  assert.match(page, /name="socialLinksJson"/);
  assert.match(page, /deleteProfile/);
  assert.match(page, /deleteMedia/);
  assert.match(page, /method: "DELETE"/);
  assert.match(store, /fullBio:/);
});
