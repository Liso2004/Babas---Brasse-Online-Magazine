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

test("live app media placeholders exist under Vite public assets", () => {
  const expectedAssets = [
    "apps/web/public/media/opening-banner-placeholder.jpg",
    "apps/web/public/media/photography-feature-placeholder.jpg",
    "apps/web/public/media/artwork-feature-placeholder.jpg",
    "apps/web/public/media/profile-placeholder.jpg",
    "apps/web/public/favicon.ico"
  ];

  for (const asset of expectedAssets) {
    assert.ok(fs.existsSync(filePath(asset)), `${asset} should exist for browser rendering`);
    const minSize = asset.endsWith(".ico") ? 64 : 1024;
    assert.ok(fs.statSync(filePath(asset)).size > minSize, `${asset} should not be an empty placeholder`);
  }
});

test("public newsletter email input includes browser autocomplete metadata", () => {
  const homePage = read("apps/web/src/pages/HomePage.jsx");
  const newsletter = read("apps/web/src/components/NewsletterSignup.jsx");

  assert.match(homePage, /NewsletterSignup/);
  assert.match(newsletter, /type="email"/);
  assert.match(newsletter, /autoComplete="email"/);
});

test("browser polish docs and scripts are registered", () => {
  const pkg = JSON.parse(read("package.json"));
  const runTests = read("tests/run-tests.js");
  const readme = read("apps/web/README.md");
  const testingLog = read("docs/TESTING_LOG.md");

  assert.equal(pkg.scripts["test:browser-polish"], "node tests/production-browser-polish.test.js");
  assert.match(runTests, /production-browser-polish\.test\.js/);
  assert.match(readme, /browser polish/i);
  assert.match(testingLog, /Browser Polish/i);
});