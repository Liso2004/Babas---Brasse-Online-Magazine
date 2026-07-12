const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8").replace(/^\uFEFF/, "");
}

function readJson(relativePath) {
  return JSON.parse(read(relativePath));
}

test("production robots file allows crawling and points to the sitemap", () => {
  const robots = read("apps/web/public/robots.txt");
  const sitemap = read("apps/web/public/sitemap.xml");

  assert.match(robots, /^User-agent: \*/m);
  assert.match(robots, /^Allow: \/$/m);
  assert.match(robots, /^Sitemap: https:\/\/babasandbrasse\.co\.za\/sitemap\.xml$/m);
  assert.doesNotMatch(robots, /<html/i);
  assert.match(sitemap, /<loc>https:\/\/babasandbrasse\.co\.za\/<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/babasandbrasse\.co\.za\/visceral-mag<\/loc>/);
});

test("llms discovery file identifies the magazine and canonical reader routes", () => {
  const llms = read("apps/web/public/llms.txt");

  assert.match(llms, /^# Babas & Brasse$/m);
  assert.match(llms, /https:\/\/babasandbrasse\.co\.za\/visceral-mag/);
  assert.match(llms, /https:\/\/babasandbrasse\.co\.za\/about/);
  assert.match(llms, /https:\/\/babasandbrasse\.co\.za\/contact/);
});

test("logo link has a direct accessible brand name", () => {
  const layout = read("apps/web/src/layouts/PublicLayout.jsx");

  assert.match(layout, /className="brand-mark" to="\/"/);
  assert.doesNotMatch(layout, /className="brand-mark" href="\/" aria-label=/);
  assert.match(layout, /className="brand-logo"[^>]+alt="Babas and Brasse"/);
});

test("launch discovery checks are documented and wired into the full suite", () => {
  const packageJson = readJson("package.json");
  const runner = read("tests/run-tests.js");
  const log = read("docs/TESTING_LOG.md");

  assert.equal(packageJson.scripts["test:launch-discovery"], "node tests/production-launch-discovery-files.test.js");
  assert.match(runner, /production-launch-discovery-files\.test\.js/);
  assert.match(log, /Launch Discovery and Lighthouse/i);
});
