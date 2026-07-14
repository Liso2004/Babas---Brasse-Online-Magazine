const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const http = require("node:http");

const root = path.resolve(__dirname, "..");
const apiRoot = path.join(root, "apps", "api");

function request(port, method, pathname, payload) {
  return new Promise((resolve, reject) => {
    const body = payload === undefined ? "" : JSON.stringify(payload);
    const headers = body ? { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(body) } : {};
    const req = http.request({ hostname: "127.0.0.1", port, path: pathname, method, headers }, (res) => {
      let responseBody = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => { responseBody += chunk; });
      res.on("end", () => resolve({ status: res.statusCode, headers: res.headers, body: responseBody }));
    });
    req.on("error", reject);
    if (body) req.write(body);
    req.end();
  });
}

async function withRuntime(name, options, run) {
  const tempRoot = path.join(root, ".test-data", `runtime-${name}-${process.pid}-${Date.now()}`);
  const webRoot = path.join(tempRoot, "web");
  fs.mkdirSync(path.join(webRoot, "assets"), { recursive: true });
  fs.writeFileSync(path.join(webRoot, "index.html"), "<!doctype html><main id=\"root\">Production shell</main>");
  fs.writeFileSync(path.join(webRoot, "assets", "app-ABC123.js"), "console.log('production');");

  const { SubmissionStore } = require(path.join(apiRoot, "submissionStore.js"));
  const { createApiServer } = require(path.join(apiRoot, "server.js"));
  const store = new SubmissionStore(path.join(tempRoot, "data.json"));
  const server = createApiServer({ store, webRoot, ...options });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  try {
    await run({ port: server.address().port, webRoot });
  } finally {
    await new Promise((resolve) => server.close(resolve));
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
}

test("production runtime serves the Vite build and keeps API misses out of the SPA", async () => {
  await withRuntime("static", {}, async ({ port }) => {
    const home = await request(port, "GET", "/");
    const route = await request(port, "GET", "/visceral-mag/story-slug");
    const asset = await request(port, "GET", "/assets/app-ABC123.js");
    const apiMiss = await request(port, "GET", "/api/not-a-route");

    assert.equal(home.status, 200);
    assert.match(home.headers["content-type"], /text\/html/);
    assert.match(home.body, /Production shell/);
    assert.equal(route.status, 200);
    assert.match(route.body, /Production shell/);
    assert.equal(asset.status, 200);
    assert.match(asset.headers["cache-control"], /immutable/);
    assert.match(asset.headers["content-type"], /javascript/);
    assert.equal(apiMiss.status, 404);
    assert.match(apiMiss.headers["content-type"], /application\/json/);
  });
});

test("fixed-window limiter resets predictably", () => {
  const { FixedWindowRateLimiter } = require(path.join(apiRoot, "security.js"));
  let now = 1_000;
  const limiter = new FixedWindowRateLimiter({ limit: 2, windowMs: 60_000, now: () => now });

  assert.equal(limiter.consume("reader").allowed, true);
  assert.equal(limiter.consume("reader").allowed, true);
  const denied = limiter.consume("reader");
  assert.equal(denied.allowed, false);
  assert.equal(denied.retryAfterSeconds, 60);
  now += 60_001;
  assert.equal(limiter.consume("reader").allowed, true);
});

test("login attempts are rate limited and security logs exclude submitted credentials", async () => {
  const events = [];
  await withRuntime("login-limit", {
    adminEmail: "admin@example.test",
    adminPassword: "correct-password",
    loginRateLimit: { limit: 2, windowMs: 60_000 },
    securityLogger: (event) => events.push(event)
  }, async ({ port }) => {
    const payload = { email: "admin@example.test", password: "wrong-password" };
    assert.equal((await request(port, "POST", "/api/admin/login", payload)).status, 401);
    assert.equal((await request(port, "POST", "/api/admin/login", payload)).status, 401);
    const denied = await request(port, "POST", "/api/admin/login", payload);
    assert.equal(denied.status, 429);
    assert.equal(denied.headers["retry-after"], "60");
  });

  assert.ok(events.some((event) => event.event === "admin.login.failed"));
  assert.ok(events.some((event) => event.event === "admin.login.rate_limited"));
  const serialized = JSON.stringify(events);
  assert.doesNotMatch(serialized, /admin@example\.test|wrong-password/);
});

test("public submissions share a client abuse budget and return rate metadata", async () => {
  const events = [];
  await withRuntime("public-limit", {
    publicRateLimit: { limit: 1, windowMs: 30_000 },
    securityLogger: (event) => events.push(event)
  }, async ({ port }) => {
    const first = await request(port, "POST", "/api/contact-submissions", {
      name: "Reader",
      email: "reader@example.test",
      subject: "Pitch",
      message: "A production-ready editorial pitch."
    });
    const denied = await request(port, "POST", "/api/newsletter-signups", { email: "reader@example.test" });

    assert.equal(first.status, 201);
    assert.equal(denied.status, 429);
    assert.equal(denied.headers["ratelimit-limit"], "1");
    assert.equal(denied.headers["ratelimit-remaining"], "0");
  });

  assert.ok(events.some((event) => event.event === "public_submission.accepted"));
  assert.ok(events.some((event) => event.event === "public_submission.rate_limited"));
  assert.doesNotMatch(JSON.stringify(events), /reader@example\.test|editorial pitch/);
});

test("production runtime controls are configurable and documented", () => {
  const env = fs.readFileSync(path.join(root, ".env.production.example"), "utf8");
  const readme = fs.readFileSync(path.join(apiRoot, "README.md"), "utf8");
  const plan = fs.readFileSync(path.join(root, "docs", "PRODUCTION_RELEASE_PLAN_JULY_2026.md"), "utf8");

  for (const name of ["BABAS_WEB_DIST_PATH", "BABAS_LOGIN_RATE_LIMIT", "BABAS_PUBLIC_RATE_LIMIT", "BABAS_RATE_WINDOW_MS", "BABAS_TRUST_PROXY"]) {
    assert.match(env, new RegExp(`^${name}=`, "m"));
  }
  assert.match(readme, /serves the built React application and API on one origin/i);
  assert.match(readme, /newline-delimited JSON/i);
  assert.match(plan, /rate limiting and privacy-safe structured security logging are complete/i);
});
