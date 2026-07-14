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

test("production visual system defines editorial tokens and typography without viewport font hacks", () => {
  const css = read("apps/web/src/styles.css");

  assert.match(css, /--surface:/);
  assert.match(css, /--muted:/);
  assert.match(css, /--focus:/);
  assert.match(css, /--font-editorial:[^;]*Georgia/);
  assert.match(css, /font-family: var\(--font-editorial\)/);
  assert.match(css, /letter-spacing: 0/);
  assert.doesNotMatch(css, /font-size:\s*[^;]*vw/);
  assert.doesNotMatch(css, /letter-spacing:\s*-/);
});

test("production visual system styles route sections cards media and chips", () => {
  const css = read("apps/web/src/styles.css");

  assert.match(css, /\[data-page\]/);
  assert.match(css, /\[data-section\]/);
  assert.match(css, /\[data-section="latest-articles"\]/);
  assert.match(css, /\[data-section="media-preview"\]/);
  assert.match(css, /\.article-card/);
  assert.match(css, /\.category-chip/);
  assert.match(css, /img\s*\{/);
});

test("production visual system styles forms actions states and focus", () => {
  const css = read("apps/web/src/styles.css");

  assert.match(css, /input,\s*select,\s*textarea/);
  assert.match(css, /button,\s*\.button/);
  assert.match(css, /\[data-action\]/);
  assert.match(css, /\.figma-empty-state/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /min-height:\s*44px/);
});

test("production visual system covers admin support and mobile handoff surfaces", () => {
  const css = read("apps/web/src/styles.css");

  assert.match(css, /\.admin-layout/);
  assert.match(css, /\[data-auth-required="true"\]/);
  assert.match(css, /\[data-support-route\]/);
  assert.match(css, /\[data-page="mobile-wireframe-comps"\]/);
  assert.match(css, /\[data-section="mobile-admin-comps"\]/);
  assert.match(css, /\[data-section="mobile-a11y"\]/);
});

test("production visual system includes responsive layout rules", () => {
  const css = read("apps/web/src/styles.css");

  assert.match(css, /@media\s*\(max-width:\s*760px\)/);
  assert.match(css, /grid-template-columns:\s*1fr/);
  assert.match(css, /overflow-wrap:\s*anywhere/);
  assert.match(css, /touch-action:\s*manipulation/);
  assert.match(css, /\.figma-card-grid[\s\S]*grid-template-columns:\s*1fr/);
  assert.match(css, /overflow-x:\s*clip/);
});

test("visual system handoff is documented and wired into scripts", () => {
  const readme = read("apps/web/README.md");
  const planStatus = read("docs/PLAN_STATUS.md");
  const rootPkg = readJson("package.json");
  const runTests = read("tests/run-tests.js");

  assert.match(readme, /Production Visual System/i);
  assert.match(planStatus, /Production visual system/i);
  assert.ok(rootPkg.scripts["test:visual-system"]);
  assert.match(runTests, /production-visual-system\.test\.js/);
});
