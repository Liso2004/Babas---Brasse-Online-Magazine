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

test("final ZIP runnable entry files are preserved in the design source", () => {
  const sourceRoot = "designs/figma-author-website-design/source";
  const readme = read(`${sourceRoot}/README.md`);
  const index = read(`${sourceRoot}/index.html`);
  const main = read(`${sourceRoot}/src/main.tsx`);
  const packageJson = readJson(`${sourceRoot}/package.json`);
  const viteConfig = read(`${sourceRoot}/vite.config.ts`);

  assert.match(readme, /Author Website Design/);
  assert.match(readme, /figma\.com\/design\/XH8txrJVqtovNVnuFgyViq/);
  assert.match(index, /<div id="root"><\/div>/);
  assert.match(main, /createRoot/);
  assert.equal(packageJson.scripts.dev, "vite");
  assert.match(viteConfig, /figmaAssetResolver/);
});

test("live public header preserves the final design mobile menu interaction", () => {
  const layout = read("apps/web/src/layouts/PublicLayout.jsx");
  const css = read("apps/web/src/styles.css");

  assert.match(layout, /useState/);
  assert.match(layout, /className="final-design-menu-toggle"/);
  assert.match(layout, /aria-expanded=\{mobileMenuOpen\}/);
  assert.match(layout, /aria-controls="public-navigation"/);
  assert.match(layout, /id="public-navigation"/);
  assert.match(layout, /data-mobile-open=\{mobileMenuOpen \? "true" : "false"\}/);
  assert.match(css, /\.final-design-menu-toggle/);
  assert.match(css, /\[data-mobile-open="false"\]/);
});

test("final ZIP adoption keeps one canonical route registry", () => {
  const routes = read("apps/web/src/routes.js");
  const layout = read("apps/web/src/layouts/PublicLayout.jsx");

  assert.doesNotMatch(routes, /path: "\/(theatre|books|essays|opinion)"/);
  assert.match(layout, /\/search\?category=reviews&topic=theatre/);
  assert.match(layout, /\/search\?category=reviews&topic=books/);
  assert.match(layout, /\/search\?category=essays/);
  assert.match(layout, /\/search\?category=essays&topic=opinion/);
});

test("final ZIP adoption is documented and wired into the full suite", () => {
  const packageJson = readJson("package.json");
  const runner = read("tests/run-tests.js");
  const handoff = read("docs/FIGMA_FINAL_FRONTEND_HANDOFF.md");
  const testingLog = read("docs/TESTING_LOG.md");

  assert.equal(packageJson.scripts["test:final-design-zip"], "node tests/final-design-zip-adoption.test.js");
  assert.match(runner, /final-design-zip-adoption\.test\.js/);
  assert.match(handoff, /Author Website Design\.zip/);
  assert.match(handoff, /final visual source of truth/i);
  assert.match(testingLog, /Final Design ZIP Adoption/i);
});
