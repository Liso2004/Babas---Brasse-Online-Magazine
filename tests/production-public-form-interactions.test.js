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

function readJson(relativePath) {
  return JSON.parse(read(relativePath));
}

async function loadClient() {
  return import(pathToFileURL(filePath("apps/web/src/forms/publicFormClient.js")).href + `?cache=${Date.now()}`);
}

test("public form client validates and normalizes reader email addresses", async () => {
  const { normalizeEmail, validateEmail } = await loadClient();

  assert.equal(normalizeEmail("  Reader@Example.COM "), "reader@example.com");
  assert.equal(validateEmail("reader@example.com"), true);
  assert.equal(validateEmail("reader@"), false);
  assert.equal(validateEmail(""), false);
});

test("public form client posts JSON and accepts JSON success responses", async () => {
  const { submitPublicForm } = await loadClient();
  const calls = [];
  const fetchImpl = async (url, options) => {
    calls.push({ url, options });
    return {
      ok: true,
      status: 201,
      headers: { get: () => "application/json" },
      json: async () => ({ id: "submission-1", status: "pending" })
    };
  };

  const result = await submitPublicForm("contact", { email: "reader@example.com" }, { endpoint: "/test/contact", fetchImpl });

  assert.deepEqual(result, { id: "submission-1", status: "pending" });
  assert.equal(calls[0].url, "/test/contact");
  assert.equal(calls[0].options.method, "POST");
  assert.equal(calls[0].options.headers["Content-Type"], "application/json");
});

test("public form client rejects SPA HTML fallbacks as unavailable APIs", async () => {
  const { submitPublicForm } = await loadClient();
  const fetchImpl = async () => ({
    ok: true,
    status: 200,
    headers: { get: () => "text/html" },
    text: async () => "<!doctype html>"
  });

  await assert.rejects(
    () => submitPublicForm("newsletter", { email: "reader@example.com" }, { fetchImpl }),
    /submission service is unavailable/i
  );
});

test("newsletter component exposes accessible validation submission and retry states", () => {
  const component = read("apps/web/src/components/NewsletterSignup.jsx");

  assert.match(component, /useState/);
  assert.match(component, /className="newsletter-form"/);
  assert.match(component, /className="newsletter-field"/);
  assert.match(component, /submitPublicForm\("newsletter"/);
  assert.match(component, /validateEmail/);
  assert.match(component, /aria-live="polite"/);
  assert.match(component, /data-form-status=\{status\}/);
  assert.match(component, /disabled=\{status === "submitting"\}/);
});

test("public pages use shared newsletter contact and pending comment interactions", () => {
  const home = read("apps/web/src/pages/HomePage.jsx");
  const about = read("apps/web/src/pages/AboutPage.jsx");
  const contact = read("apps/web/src/pages/ContactPage.jsx");
  const article = read("apps/web/src/pages/ArticleDetailPage.jsx");

  assert.match(home, /<NewsletterSignup/);
  assert.match(about, /<NewsletterSignup/);
  assert.match(contact, /<NewsletterSignup/);
  assert.match(contact, /handleContactSubmit/);
  assert.match(contact, /submitPublicForm\("contact"/);
  assert.match(contact, /aria-live="polite"/);
  assert.match(contact, /field\.purpose === "spam-protection"/);
  assert.match(contact, /hidden aria-hidden="true"/);
  assert.match(contact, /noValidate/);
  assert.match(article, /handleCommentSubmit/);
  assert.match(article, /submitPublicForm\("comment"/);
  assert.match(article, /submitted for moderation/i);
  assert.match(article, /noValidate/);
});

test("public interaction sprint is styled documented and wired into the suite", () => {
  const css = read("apps/web/src/styles.css");
  const packageJson = readJson("package.json");
  const runner = read("tests/run-tests.js");
  const log = read("docs/TESTING_LOG.md");
  const sprint = read("docs/SPRINT_PLAN_JULY_2026.md");

  assert.match(css, /\.public-form-status/);
  assert.match(css, /\.newsletter-form/);
  assert.match(css, /\.newsletter-field/);
  assert.match(css, /\[data-form-status="error"\]/);
  assert.match(css, /\[data-form-status="success"\]/);
  assert.equal(packageJson.scripts["test:public-form-interactions"], "node tests/production-public-form-interactions.test.js");
  assert.match(runner, /production-public-form-interactions\.test\.js/);
  assert.match(log, /Public Form Interaction Sprint/i);
  assert.match(sprint, /Public form interaction sprint update/i);
});
