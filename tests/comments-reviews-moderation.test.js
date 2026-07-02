const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

function filePath(relativePath) {
  return path.join(root, relativePath);
}

function read(relativePath) {
  return fs.readFileSync(filePath(relativePath), "utf8");
}

function load(relativePath) {
  delete require.cache[require.resolve(filePath(relativePath))];
  return require(filePath(relativePath));
}

test("Phase 4 Comments / Reviews Moderation plan documents the moderation workflow", () => {
  const plan = read("docs/PHASE4_COMMENTS_REVIEWS_MODERATION_PLAN.md");

  assert.match(plan, /Comments \/ Reviews Moderation/i);
  assert.match(plan, /role-protected access/i);
  assert.match(plan, /pending/i);
  assert.match(plan, /approved/i);
  assert.match(plan, /rejected/i);
  assert.match(plan, /search/i);
  assert.match(plan, /filter/i);
  assert.match(plan, /approve/i);
  assert.match(plan, /reject/i);
  assert.match(plan, /delete/i);
  assert.match(plan, /undo/i);
  assert.match(plan, /approved-only public rendering/i);
});

test("Moderation renderer exports helpers and preserves the final wireframe contract", () => {
  const { renderCommentsReviewsModerationPage, getModerationItems, getModerationStats } = load("src/render/comments-reviews-moderation.js");
  const fixtures = load("src/content/fixtures.js");
  const html = renderCommentsReviewsModerationPage(fixtures);

  assert.equal(typeof renderCommentsReviewsModerationPage, "function");
  assert.equal(typeof getModerationItems, "function");
  assert.equal(typeof getModerationStats, "function");
  assert.match(html, /data-page="comments-reviews-moderation"/);
  assert.match(html, /data-route="\/admin\/moderation"/);
  assert.match(html, /data-area="admin"/);
  assert.match(html, /data-generated="comments-reviews-moderation-renderer"/);
  assert.match(html, /data-wireframe-source="comments-reviews-moderation.html"/);
  assert.match(html, /data-auth-required="editor"/);
});

test("Moderation items combine comments and reviews with article context", () => {
  const { getModerationItems, renderCommentsReviewsModerationPage } = load("src/render/comments-reviews-moderation.js");
  const fixtures = load("src/content/fixtures.js");
  const items = getModerationItems(fixtures);
  const html = renderCommentsReviewsModerationPage(fixtures);

  assert.equal(items.length, fixtures.comments.length + fixtures.reviews.length);
  assert.equal(items.filter((item) => item.type === "comment").length, 2);
  assert.equal(items.filter((item) => item.type === "review").length, 2);
  assert.ok(items.every((item) => item.articleTitle === "Send A Text Before You Knock"));

  assert.match(html, /data-section="moderation-workspace"/);
  assert.match(html, /data-column="type"/);
  assert.match(html, /data-column="author"/);
  assert.match(html, /data-column="article"/);
  assert.match(html, /data-column="status"/);
  assert.match(html, /data-column="body"/);
  assert.match(html, /Pending comment placeholder/);
  assert.match(html, /Approved review placeholder/);
  assert.match(html, /Rejected review placeholder/);
});

test("Moderation stats are fixture-derived and expose pending counts", () => {
  const { getModerationStats, renderCommentsReviewsModerationPage } = load("src/render/comments-reviews-moderation.js");
  const fixtures = load("src/content/fixtures.js");
  const stats = getModerationStats(fixtures);
  const html = renderCommentsReviewsModerationPage(fixtures);

  assert.deepEqual(stats, {
    totalItems: 4,
    pendingItems: 1,
    approvedItems: 2,
    rejectedItems: 1,
    comments: 2,
    reviews: 2
  });

  assert.match(html, /data-pending-count="1"/);
  for (const key of Object.keys(stats)) {
    assert.match(html, new RegExp(`data-metric="${key}"`));
    assert.match(html, new RegExp(`data-value="${stats[key]}"`));
  }
});

test("Moderation queues include search and filters across status, type, article, and date", () => {
  const { renderCommentsReviewsModerationPage } = load("src/render/comments-reviews-moderation.js");
  const fixtures = load("src/content/fixtures.js");
  const html = renderCommentsReviewsModerationPage(fixtures);

  assert.match(html, /data-section="moderation-queues"/);
  assert.match(html, /name="moderation-search"/);
  assert.match(html, /data-filter="status"/);
  assert.match(html, /value="pending"/);
  assert.match(html, /value="approved"/);
  assert.match(html, /value="rejected"/);
  assert.match(html, /data-filter="type"/);
  assert.match(html, /data-filter="article"/);
  assert.match(html, /data-filter="date"/);
});

test("Moderation selected item panel and actions are represented", () => {
  const { renderCommentsReviewsModerationPage } = load("src/render/comments-reviews-moderation.js");
  const fixtures = load("src/content/fixtures.js");
  const html = renderCommentsReviewsModerationPage(fixtures);

  assert.match(html, /data-section="selected-item"/);
  assert.match(html, /data-selected-item-id="comment-1"/);
  assert.match(html, /Reader/);
  assert.match(html, /Send A Text Before You Knock/);
  assert.match(html, /data-section="moderation-actions"/);
  assert.match(html, /data-action="approve"/);
  assert.match(html, /data-action="reject"/);
  assert.match(html, /data-action="delete"/);
  assert.match(html, /data-confirmation-required="true"/);
  assert.match(html, /keyboard reachable/i);
});

test("Moderation includes approved-only public rendering and failure states", () => {
  const { renderCommentsReviewsModerationPage } = load("src/render/comments-reviews-moderation.js");
  const fixtures = load("src/content/fixtures.js");
  const html = renderCommentsReviewsModerationPage(fixtures);

  assert.match(html, /data-section="moderation-states"/);
  assert.match(html, /data-state-note="moderation-pending"/);
  assert.match(html, /data-state-note="approved-only-public"/);
  assert.match(html, /data-state-note="moderation-undo"/);
  assert.match(html, /data-state-note="moderation-error"/);
  assert.match(html, /data-state-note="permission-denied"/);
  assert.match(html, /href="\/admin\/login"/);
});

test("Comments / Reviews Moderation page artifact is generated from the renderer contract", () => {
  const html = read("src/pages/admin/comments-reviews-moderation.html");

  assert.match(html, /data-page="comments-reviews-moderation"/);
  assert.match(html, /data-route="\/admin\/moderation"/);
  assert.match(html, /data-generated="comments-reviews-moderation-renderer"/);
  assert.match(html, /data-section="moderation-queues"/);
  assert.match(html, /data-section="moderation-workspace"/);
  assert.match(html, /data-section="moderation-actions"/);
  assert.match(html, /data-section="moderation-states"/);
});
