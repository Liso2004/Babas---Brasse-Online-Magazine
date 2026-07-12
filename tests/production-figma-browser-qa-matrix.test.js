const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8").replace(/^\uFEFF/, "");
const readJson = (file) => JSON.parse(read(file));

test("Figma browser QA screenshot script covers the required route and viewport matrix", () => {
  const script = read("apps/web/scripts/capture-route-screenshots.mjs");
  for (const route of ["/", "/visceral-mag", "/visceral-mag/send-a-text-before-you-knock", "/search", "/featured", "/contact", "/admin"]) {
    assert.match(script, new RegExp(route.replace(/[.*+?^$\{\}()|[\]\\]/g, "\\$&")));
  }
  assert.match(script, /desktop/);
  assert.match(script, /mobile/);
  assert.match(script, /--headless=new/);
  assert.match(script, /--window-size/);
});

test("Figma browser QA scripts are registered at app and root level", () => {
  const rootPkg = readJson("package.json");
  const webPkg = readJson("apps/web/package.json");
  const runTests = read("tests/run-tests.js");
  assert.equal(webPkg.scripts["qa:screenshots"], "node scripts/capture-route-screenshots.mjs");
  assert.equal(rootPkg.scripts["qa:web:screenshots"], "npm.cmd --prefix apps/web run qa:screenshots");
  assert.equal(rootPkg.scripts["test:production-figma-browser-qa"], "node tests/production-figma-browser-qa-matrix.test.js");
  assert.match(runTests, /production-figma-browser-qa-matrix\.test\.js/);
});

test("browser QA evidence is generated and git-ignored instead of committed", () => {
  const ignore = read(".gitignore");
  const capture = read("apps/web/scripts/capture-route-screenshots.mjs");
  assert.match(ignore, /apps\/web\/browser-qa\//);
  assert.match(ignore, /apps\/web\/browser-qa-\*\.png/);
  assert.match(capture, /browser-qa/);
  assert.match(capture, /figma-viewport-matrix/);
});

test("Figma browser QA documentation records the matrix and output paths", () => {
  const handoff = read("docs/FIGMA_FINAL_FRONTEND_HANDOFF.md");
  const sprintPlan = read("docs/SPRINT_PLAN_JULY_2026.md");
  const testingLog = read("docs/TESTING_LOG.md");
  assert.match(handoff, /Desktop\/mobile screenshot QA slice/i);
  assert.match(handoff, /Home, Visceral Mag, Article Detail, Search, Featured, Contact, and Admin Dashboard/i);
  assert.match(handoff, /browser-qa\/figma-viewport-matrix/i);
  assert.match(sprintPlan, /Figma browser QA matrix sprint/i);
  assert.match(testingLog, /Figma Browser QA Matrix Sprint/i);
});

test("Figma browser QA keeps route scope unchanged while documenting current verification", () => {
  const routes = read("apps/web/src/routes.js");
  const roadmap = read("docs/IMPLEMENTATION_PLAN_JULY_2026.md");
  const status = read("docs/PLAN_STATUS.md");
  assert.match(roadmap, /391 passing tests/i);
  assert.match(status, /391 passing tests/i);
  for (const path of ["/theatre", "/books", "/essays", "/opinion"]) {
    assert.doesNotMatch(routes, new RegExp('path: "' + path + '"'));
  }
});
