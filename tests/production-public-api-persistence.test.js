const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const http = require("node:http");

const root = path.resolve(__dirname, "..");
const apiRoot = path.join(root, "apps", "api");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8").replace(/^\uFEFF/, "");

function tempStorePath(name) {
  const dir = path.join(root, ".test-data", `${name}-${process.pid}-${Date.now()}`);
  fs.mkdirSync(dir, { recursive: true });
  return { dir, file: path.join(dir, "submissions.json") };
}

function request(port, method, pathname, payload) {
  return new Promise((resolve, reject) => {
    const body = payload === undefined ? "" : JSON.stringify(payload);
    const req = http.request({
      hostname: "127.0.0.1",
      port,
      path: pathname,
      method,
      headers: body ? { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(body) } : {}
    }, (res) => {
      let responseBody = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => { responseBody += chunk; });
      res.on("end", () => resolve({
        status: res.statusCode,
        headers: res.headers,
        body: responseBody ? JSON.parse(responseBody) : null
      }));
    });
    req.on("error", reject);
    if (body) req.write(body);
    req.end();
  });
}

test("API package and Vite proxy define the local production boundary", () => {
  assert.ok(fs.existsSync(path.join(apiRoot, "server.js")));
  assert.ok(fs.existsSync(path.join(apiRoot, "submissionStore.js")));
  assert.match(read("apps/web/vite.config.js"), /proxy/);
  assert.match(read("apps/web/vite.config.js"), /127\.0\.0\.1:8787/);
  const pkg = JSON.parse(read("package.json"));
  assert.equal(pkg.scripts["dev:api"], "node apps/api/server.js");
  assert.equal(pkg.scripts["test:public-api-persistence"], "node tests/production-public-api-persistence.test.js");
});

test("submission store survives restart and keeps moderation defaults", () => {
  const { SubmissionStore } = require(path.join(apiRoot, "submissionStore.js"));
  const target = tempStorePath("restart");
  try {
    const first = new SubmissionStore(target.file);
    const newsletter = first.createNewsletterSignup({ email: " Reader@Example.COM " });
    const contact = first.createContactSubmission({ name: "Reader", email: "reader@example.com", subject: "Pitch", message: "A considered message." });
    const comment = first.createComment("send-a-text-before-you-knock", { name: "Reader", body: "A thoughtful response." });

    assert.equal(newsletter.email, "reader@example.com");
    assert.equal(contact.status, "new");
    assert.equal(comment.status, "pending");

    const restarted = new SubmissionStore(target.file);
    const snapshot = restarted.snapshot();
    assert.equal(snapshot.newsletterSignups.length, 1);
    assert.equal(snapshot.contactSubmissions.length, 1);
    assert.equal(snapshot.comments.length, 1);
    assert.equal(snapshot.comments[0].articleSlug, "send-a-text-before-you-knock");
  } finally {
    fs.rmSync(target.dir, { recursive: true, force: true });
  }
});

test("public API persists newsletter contact and comment submissions", async () => {
  const { SubmissionStore } = require(path.join(apiRoot, "submissionStore.js"));
  const { createApiServer } = require(path.join(apiRoot, "server.js"));
  const target = tempStorePath("http");
  const store = new SubmissionStore(target.file);
  const server = createApiServer({ store });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address();

  try {
    const health = await request(port, "GET", "/api/health");
    const newsletter = await request(port, "POST", "/api/newsletter-signups", { email: "reader@example.com" });
    const contact = await request(port, "POST", "/api/contact-submissions", { name: "Reader", email: "reader@example.com", subject: "Correction", message: "Please check the second paragraph." });
    const comment = await request(port, "POST", "/api/articles/send-a-text-before-you-knock/comments", { name: "Reader", body: "This stayed with me." });

    assert.equal(health.status, 200);
    assert.equal(newsletter.status, 201);
    assert.equal(contact.status, 201);
    assert.equal(contact.body.status, "new");
    assert.equal(comment.status, 201);
    assert.equal(comment.body.status, "pending");
    assert.equal(store.snapshot().comments.length, 1);
  } finally {
    await new Promise((resolve) => server.close(resolve));
    fs.rmSync(target.dir, { recursive: true, force: true });
  }
});

test("public API rejects malformed input and unknown routes without writing", async () => {
  const { SubmissionStore } = require(path.join(apiRoot, "submissionStore.js"));
  const { createApiServer } = require(path.join(apiRoot, "server.js"));
  const target = tempStorePath("validation");
  const store = new SubmissionStore(target.file);
  const server = createApiServer({ store });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address();

  try {
    const invalid = await request(port, "POST", "/api/newsletter-signups", { email: "not-an-email" });
    const unknown = await request(port, "POST", "/api/not-real", { value: true });
    assert.equal(invalid.status, 422);
    assert.equal(unknown.status, 404);
    assert.equal(store.snapshot().newsletterSignups.length, 0);
  } finally {
    await new Promise((resolve) => server.close(resolve));
    fs.rmSync(target.dir, { recursive: true, force: true });
  }
});
