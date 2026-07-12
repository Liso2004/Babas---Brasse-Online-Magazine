const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const http = require("node:http");

const root = path.resolve(__dirname, "..");
const apiRoot = path.join(root, "apps", "api");

function tempStorePath(name) {
  const dir = path.join(root, ".test-data", `admin-${name}-${process.pid}-${Date.now()}`);
  fs.mkdirSync(dir, { recursive: true });
  return { dir, file: path.join(dir, "submissions.json") };
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

async function withServer(name, options, run) {
  const { SubmissionStore } = require(path.join(apiRoot, "submissionStore.js"));
  const { createApiServer } = require(path.join(apiRoot, "server.js"));
  const target = tempStorePath(name);
  const store = new SubmissionStore(target.file);
  const server = createApiServer({ store, ...options });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  try {
    await run({ port: server.address().port, store, target });
  } finally {
    await new Promise((resolve) => server.close(resolve));
    fs.rmSync(target.dir, { recursive: true, force: true });
  }
}

test("admin endpoints are unavailable when no admin token is configured", async () => {
  await withServer("unconfigured", { adminToken: "" }, async ({ port }) => {
    const response = await request(port, "GET", "/api/admin/contact-submissions", undefined, "anything");
    assert.equal(response.status, 503);
  });
});

test("admin reads reject missing and incorrect bearer tokens", async () => {
  await withServer("unauthorized", { adminToken: "correct-test-token" }, async ({ port }) => {
    assert.equal((await request(port, "GET", "/api/admin/contact-submissions")).status, 401);
    assert.equal((await request(port, "GET", "/api/admin/contact-submissions", undefined, "wrong-token")).status, 401);
  });
});

test("authorized admin reads persisted contact and moderation queues", async () => {
  await withServer("reads", { adminToken: "correct-test-token" }, async ({ port, store }) => {
    store.createContactSubmission({ name: "Reader", email: "reader@example.com", subject: "Pitch", message: "A new essay proposal." });
    store.createComment("send-a-text-before-you-knock", { name: "Reader", body: "A thoughtful response." });

    const contacts = await request(port, "GET", "/api/admin/contact-submissions", undefined, "correct-test-token");
    const comments = await request(port, "GET", "/api/admin/comments?status=pending", undefined, "correct-test-token");

    assert.equal(contacts.status, 200);
    assert.equal(contacts.body.items.length, 1);
    assert.equal(comments.status, 200);
    assert.equal(comments.body.items.length, 1);
    assert.equal(comments.body.items[0].status, "pending");
  });
});

test("authorized moderation mutations persist across store restart", async () => {
  await withServer("mutations", { adminToken: "correct-test-token" }, async ({ port, store, target }) => {
    const contact = store.createContactSubmission({ name: "Reader", email: "reader@example.com", subject: "Correction", message: "Please check the second paragraph." });
    const comment = store.createComment("send-a-text-before-you-knock", { name: "Reader", body: "A thoughtful response." });

    const contactUpdate = await request(port, "PATCH", `/api/admin/contact-submissions/${contact.id}`, { status: "archived" }, "correct-test-token");
    const commentUpdate = await request(port, "PATCH", `/api/admin/comments/${comment.id}`, { status: "approved" }, "correct-test-token");

    assert.equal(contactUpdate.status, 200);
    assert.equal(commentUpdate.status, 200);

    const { SubmissionStore } = require(path.join(apiRoot, "submissionStore.js"));
    const restarted = new SubmissionStore(target.file);
    assert.equal(restarted.snapshot().contactSubmissions[0].status, "archived");
    assert.equal(restarted.snapshot().comments[0].status, "approved");
  });
});
