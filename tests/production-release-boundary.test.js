const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

test("root package identifies the production release and exposes production commands", () => {
  const pkg = JSON.parse(read("package.json"));
  assert.doesNotMatch(pkg.description, /MVP|prototype/i);
  assert.equal(pkg.scripts["start:production"], "node apps/api/server.js");
  assert.equal(pkg.scripts["build:production"], "npm.cmd --prefix apps/web run build");
  assert.match(pkg.scripts["verify:production"], /production-release-boundary\.test\.js/);
  assert.match(pkg.scripts["verify:production"], /production-runtime-stack\.test\.js/);
  const ignore = read(".gitignore");
  assert.match(ignore, /^\.env$/m);
  assert.match(ignore, /!\.env\.production\.example/);
});

test("production configuration fails closed without hashed credentials and managed PostgreSQL", () => {
  const { validateProductionConfig } = require(path.join(root, "apps", "api", "productionConfig.js"));
  assert.throws(() => validateProductionConfig({ NODE_ENV: "production" }), /BABAS_ADMIN_EMAIL/);
  assert.throws(() => validateProductionConfig({
    NODE_ENV: "production",
    BABAS_ADMIN_EMAIL: "admin@example.test",
    BABAS_ADMIN_PASSWORD: "plaintext",
    DATABASE_URL: "postgresql://localhost/babas"
  }), /BABAS_ADMIN_PASSWORD_HASH/);
  assert.doesNotThrow(() => validateProductionConfig({
    NODE_ENV: "production",
    BABAS_ADMIN_EMAIL: "admin@example.test",
    BABAS_ADMIN_PASSWORD_HASH: "scrypt$test-salt$test-hash",
    DATABASE_URL: "postgresql://localhost/babas"
  }));
});

test("admin authentication supports scrypt hashes without storing a plaintext password", () => {
  const { AdminAuth, createPasswordHash, verifyPasswordHash } = require(path.join(root, "apps", "api", "adminAuth.js"));
  const hash = createPasswordHash("production-test-password");
  assert.match(hash, /^scrypt\$/);
  assert.equal(verifyPasswordHash("production-test-password", hash), true);
  assert.equal(verifyPasswordHash("wrong-password", hash), false);
  const auth = new AdminAuth({ email: "admin@example.test", passwordHash: hash });
  assert.equal(auth.password, "");
  assert.equal(auth.login("admin@example.test", "production-test-password").role, "admin");
});

test("API applies the production configuration gate and hardened response headers", () => {
  const server = read("apps/api/server.js");
  assert.match(server, /validateProductionConfig/);
  assert.match(server, /Content-Security-Policy/);
  assert.match(server, /Referrer-Policy/);
  assert.match(server, /Permissions-Policy/);
  assert.match(server, /X-Frame-Options/);
  assert.match(server, /const host = process\.env\.HOST \|\| "127\.0\.0\.1"/);
  assert.match(server, /server\.listen\(port, host/);
});

test("production release plan replaces MVP delivery language with release evidence gates", () => {
  const plan = read("docs/PRODUCTION_RELEASE_PLAN_JULY_2026.md");
  assert.match(plan, /Production Release Candidate/i);
  assert.match(plan, /July 31, 2026/);
  assert.match(plan, /Security gate/i);
  assert.match(plan, /Data gate/i);
  assert.match(plan, /Deployment gate/i);
  assert.match(plan, /Launch decision/i);
});
