const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

function filePath(relativePath) {
  return path.join(root, relativePath);
}

function read(relativePath) {
  return fs.readFileSync(filePath(relativePath), "utf8").replace(/^\uFEFF/, "");
}

const requiredPaths = [
  "/",
  "/about",
  "/creative-team",
  "/contributors",
  "/visceral-mag",
  "/visceral-mag/send-a-text-before-you-knock",
  "/search",
  "/featured",
  "/contact",
  "/admin",
  "/admin/articles",
  "/admin/profiles-media",
  "/admin/moderation",
  "/admin/contact-submissions",
  "/admin/login",
  "/admin/password-reset",
  "/404",
  "/500",
  "/offline",
  "/admin/media/upload",
  "/admin/articles/editor-workflow"
];

test("live route smoke script is registered for app and root execution", () => {
  const rootPkg = JSON.parse(read("package.json"));
  const webPkg = JSON.parse(read("apps/web/package.json"));
  const scriptPath = "apps/web/scripts/smoke-routes.mjs";

  assert.ok(fs.existsSync(filePath(scriptPath)), "apps/web/scripts/smoke-routes.mjs should exist");
  assert.equal(webPkg.scripts["smoke:routes"], "node scripts/smoke-routes.mjs");
  assert.equal(rootPkg.scripts["smoke:web:routes"], "npm.cmd --prefix apps/web run smoke:routes");
  assert.equal(rootPkg.scripts["test:live-route-qa"], "node tests/production-live-route-qa.test.js");
});

test("live route smoke script covers the complete production route surface", () => {
  const script = read("apps/web/scripts/smoke-routes.mjs");

  for (const routePath of requiredPaths) {
    assert.match(script, new RegExp(routePath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), `${routePath} should be smoke checked`);
  }

  assert.match(script, /WEB_BASE_URL/);
  assert.match(script, /fetch/);
  assert.match(script, /id="root"/);
  assert.match(script, /process\.exitCode = 1/);
});

test("live route QA is included in the full suite and docs", () => {
  const runTests = read("tests/run-tests.js");
  const readme = read("apps/web/README.md");
  const testingLog = read("docs/TESTING_LOG.md");
  const planStatus = read("docs/PLAN_STATUS.md");

  assert.match(runTests, /production-live-route-qa\.test\.js/);
  assert.match(readme, /live route smoke/i);
  assert.match(testingLog, /Live Route QA/i);
  assert.match(planStatus, /Live Route QA/i);
});
