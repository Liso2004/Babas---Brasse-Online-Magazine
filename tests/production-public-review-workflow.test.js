const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const root = path.resolve(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8").replace(/^\uFEFF/, "");
}

async function loadClient() {
  return import(pathToFileURL(path.join(root, "apps/web/src/forms/publicFormClient.js")).href + `?cache=${Date.now()}`);
}

test("public form client resolves article review submissions", async () => {
  const { resolvePublicFormEndpoint } = await loadClient();

  assert.equal(
    resolvePublicFormEndpoint("review", { articleSlug: "send-a-text-before-you-knock" }),
    "/api/articles/send-a-text-before-you-knock/reviews"
  );
  assert.throws(() => resolvePublicFormEndpoint("review", {}), /article is required/i);
});

test("article detail exposes accessible book ratings and moderated review submission", () => {
  const page = read("apps/web/src/pages/ArticleDetailPage.jsx");

  assert.match(page, /import \{ BookOpen \} from "lucide-react"/);
  assert.match(page, /function BookRating/);
  assert.match(page, /out of 5 books/);
  assert.match(page, /handleReviewSubmit/);
  assert.match(page, /submitPublicForm\("review"/);
  assert.match(page, /name="rating"/);
  assert.match(page, /data-form="public-review"/);
  assert.match(page, /submitted for moderation/i);
  assert.match(page, /\{model\.reviews\.length\} approved/);
});

test("review display and controls have stable production styling", () => {
  const css = read("apps/web/src/styles.css");

  assert.match(css, /\.book-rating\s*\{/);
  assert.match(css, /\.book-rating-options\s*\{/);
  assert.match(css, /\.public-review-form\s*\{/);
  assert.match(css, /\.book-rating-option input:focus-visible/);
});

test("API keeps reader reviews pending and validates one-to-five ratings", () => {
  const server = read("apps/api/server.js");
  const store = read("apps/api/submissionStore.js");

  assert.match(server, /reviewSubmissionMatch/);
  assert.match(server, /store\.createReview/);
  assert.match(store, /rating < 1 \|\| rating > 5/);
  assert.match(store, /status: "pending"/);
});
