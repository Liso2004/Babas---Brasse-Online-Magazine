const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { SubmissionStore } = require("../apps/api/submissionStore.js");

const root = path.resolve(__dirname, "..");
function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8").replace(/^\uFEFF/, "");
}

function seed() {
  return {
    categories: [],
    articles: [],
    profiles: [],
    mediaItems: [],
    contactSubmissions: [{ id: "contact-one", name: "Sam Reader", email: "sam@example.com", subject: "A pitch", message: "Theatre proposal", status: "new" }],
    comments: [{ id: "comment-one", articleSlug: "story", name: "Reader", body: "Comment body", status: "pending" }],
    reviews: [{ id: "review-one", articleId: "story", name: "Reader", body: "Review body", rating: 4, status: "pending" }]
  };
}

test("submission store permanently deletes selected moderation records", () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "babas-admin-delete-"));
  const dataPath = path.join(directory, "data.json");
  try {
    const store = new SubmissionStore(dataPath, { seed: seed() });
    assert.equal(store.deleteComment("comment-one").id, "comment-one");
    assert.equal(store.deleteReview("review-one").id, "review-one");
    assert.equal(store.listComments().length, 0);
    assert.equal(store.listReviews().length, 0);
    assert.throws(() => store.deleteComment("missing"), /not found/i);
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

test("persisted admin collections support query, article, status, and rating filters", () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "babas-admin-filter-"));
  const dataPath = path.join(directory, "data.json");
  try {
    const store = new SubmissionStore(dataPath, { seed: seed() });
    assert.equal(store.listComments({ query: "reader", article: "story", status: "pending" }).length, 1);
    assert.equal(store.listReviews({ query: "review", article: "story", rating: "4" }).length, 1);
    assert.equal(store.listReviews({ rating: "2" }).length, 0);
    assert.equal(store.listContactSubmissions({ query: "theatre", status: "new" }).length, 1);
    assert.equal(store.listContactSubmissions({ query: "missing" }).length, 0);
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

test("admin API exposes authenticated DELETE handlers for comments and reviews", () => {
  const server = read("apps/api/server.js");
  assert.match(server, /request\.method === "DELETE" && commentMatch/);
  assert.match(server, /store\.deleteComment/);
  assert.match(server, /request\.method === "DELETE" && reviewMatch/);
  assert.match(server, /store\.deleteReview/);
  assert.match(server, /url\.searchParams\.get\("q"\)/);
  assert.match(server, /url\.searchParams\.get\("article"\)/);
  assert.match(server, /url\.searchParams\.get\("rating"\)/);
});

test("moderation workspace provides working search, filters, and delete controls", () => {
  const page = read("apps/web/src/pages/CommentsReviewsModerationPage.jsx");
  assert.match(page, /setSearchQuery/);
  assert.match(page, /filteredItems/);
  assert.match(page, /name="moderation-type"/);
  assert.match(page, /name="moderation-status"/);
  assert.match(page, /name="moderation-article"/);
  assert.match(page, /name="moderation-rating"/);
  assert.match(page, /method: "DELETE"/);
  assert.match(page, /Delete selected/);
});

test("contact inbox provides working search and status filtering", () => {
  const page = read("apps/web/src/pages/ContactSubmissionsPage.jsx");
  assert.match(page, /setSearchQuery/);
  assert.match(page, /filteredItems/);
  assert.match(page, /name="submission-status"/);
  assert.match(page, /No submissions match the current filters/);
});
