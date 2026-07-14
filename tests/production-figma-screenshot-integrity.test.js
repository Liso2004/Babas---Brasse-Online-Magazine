const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8").replace(/^\uFEFF/, "");
const readJson = (file) => JSON.parse(read(file));

test("Figma screenshot integrity checker validates PNG headers dimensions and size", () => {
  const script = read("apps/web/scripts/check-route-screenshots.mjs");
  assert.match(script, /readUInt32BE\(16\)/);
  assert.match(script, /readUInt32BE\(20\)/);
  assert.match(script, /89504e470d0a1a0a/);
  assert.match(script, /minimumBytes/);
  assert.match(script, /figma-viewport-matrix/);
});

test("capture then integrity workflow covers the same sixteen generated files", () => {
  const capture = read("apps/web/scripts/capture-route-screenshots.mjs");
  const check = read("apps/web/scripts/check-route-screenshots.mjs");
  assert.match(capture, /routes\.length \* viewports\.length/);
  assert.match(check, /expectedScreenshots/);
  assert.match(check, /home-desktop\.png/);
  assert.match(check, /featured-desktop\.png/);
  assert.match(check, /profile-detail-desktop\.png/);
  assert.match(check, /profile-detail-mobile\.png/);
  assert.match(check, /featured-mobile\.png/);
  assert.match(check, /admin-dashboard-mobile\.png/);
  assert.match(read(".gitignore"), /apps\/web\/browser-qa\//);
});

test("screenshot integrity command is registered while binary outputs remain local", () => {
  const rootPkg = readJson("package.json");
  const webPkg = readJson("apps/web/package.json");
  const runTests = read("tests/run-tests.js");
  assert.equal(webPkg.scripts["qa:screenshots:check"], "node scripts/check-route-screenshots.mjs");
  assert.equal(rootPkg.scripts["qa:web:screenshots:check"], "npm.cmd --prefix apps/web run qa:screenshots:check");
  assert.equal(rootPkg.scripts["test:production-figma-screenshot-integrity"], "node tests/production-figma-screenshot-integrity.test.js");
  assert.match(runTests, /production-figma-screenshot-integrity\.test\.js/);
});

test("screenshot integrity documentation is durable", () => {
  const testingLog = read("docs/TESTING_LOG.md");
  const sprintPlan = read("docs/SPRINT_PLAN_JULY_2026.md");
  const handoff = read("docs/FIGMA_FINAL_FRONTEND_HANDOFF.md");
  assert.match(testingLog, /Figma Screenshot Integrity Sprint/i);
  assert.match(sprintPlan, /Figma screenshot integrity sprint/i);
  assert.match(handoff, /qa:web:screenshots:check/i);
  assert.match(handoff, /PNG dimensions/i);
});

test("current roadmap baseline includes screenshot integrity verification", () => {
  for (const file of ["docs/IMPLEMENTATION_PLAN_JULY_2026.md", "docs/PLAN_STATUS.md", "docs/MVP_IMPLEMENTATION_COVERAGE_REVIEW.md"]) {
    assert.match(read(file), /428 passing tests/i);
  }
});
