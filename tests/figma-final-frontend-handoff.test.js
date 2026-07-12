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

function readJson(relativePath) {
  return JSON.parse(read(relativePath));
}

test("Figma Make final frontend export is preserved as a source artifact", () => {
  const meta = readJson("designs/figma-author-website-design/meta.json");
  const makeRepos = readJson("designs/figma-author-website-design/make_repos.json");

  assert.equal(meta.file_name, "Author Website Design");
  assert.match(meta.exported_at, /^2026-07-09/);
  assert.equal(makeRepos.entries[0].status, "ok");
  assert.equal(makeRepos.entries[0].archive_path, "make_repos/ej32hp.zip");

  const requiredSourceFiles = [
    "designs/figma-author-website-design/source/package.json",
    "designs/figma-author-website-design/source/src/app/App.tsx",
    "designs/figma-author-website-design/source/src/app/components/Layout.tsx",
    "designs/figma-author-website-design/source/src/app/components/ArticleCard.tsx",
    "designs/figma-author-website-design/source/src/app/pages/HomePage.tsx",
    "designs/figma-author-website-design/source/src/app/pages/AdminDashboard.tsx",
    "designs/figma-author-website-design/source/src/app/data/mockData.ts",
    "designs/figma-author-website-design/source/src/styles/theme.css"
  ];

  for (const file of requiredSourceFiles) {
    assert.ok(fs.existsSync(filePath(file)), `${file} should exist`);
  }
});

test("Figma source assets are restored from the packaged LFS objects", () => {
  const logo = filePath("designs/figma-author-website-design/source/src/imports/Babas_Brasse.jpeg");
  const brief = filePath("designs/figma-author-website-design/source/src/imports/Zubayre_Charles_Online_Magazine.pdf");

  assert.ok(fs.existsSync(logo), "Babas_Brasse.jpeg should exist");
  assert.ok(fs.statSync(logo).size > 50000, "Babas_Brasse.jpeg should be restored binary data, not an LFS pointer");
  assert.ok(fs.existsSync(brief), "Zubayre_Charles_Online_Magazine.pdf should exist");
  assert.ok(fs.statSync(brief).size > 50000, "design PDF should be restored binary data, not an LFS pointer");
});

test("final frontend handoff documents the stack and route-scope conflict", () => {
  const doc = read("docs/FIGMA_FINAL_FRONTEND_HANDOFF.md");

  assert.match(doc, /Figma Make Final Frontend Handoff/i);
  assert.match(doc, /Author Website Design/i);
  assert.match(doc, /React\/TypeScript/i);
  assert.match(doc, /react-router/i);
  assert.match(doc, /Vite 6/i);
  assert.match(doc, /current app uses React\/Vite/i);
  assert.match(doc, /22 MVP routes/i);
  assert.match(doc, /Theatre Reviews/i);
  assert.match(doc, /Book Reviews/i);
  assert.match(doc, /Essays/i);
  assert.match(doc, /Opinion/i);
});

test("runnable app adopts the final design header logo search and section cues", () => {
  const logo = filePath("apps/web/public/media/babas-brasse-logo.jpeg");
  const publicLayout = read("apps/web/src/layouts/PublicLayout.jsx");
  const css = read("apps/web/src/styles.css");

  assert.ok(fs.existsSync(logo), "final design logo should be available to the Vite app");
  assert.ok(fs.statSync(logo).size > 50000, "final design logo should be the restored Figma binary asset");
  assert.match(publicLayout, /\/media\/babas-brasse-logo\.jpeg/);
  assert.match(publicLayout, /Search articles\.\.\./);
  assert.match(publicLayout, /Theatre Reviews/);
  assert.match(publicLayout, /Book Reviews/);
  assert.match(publicLayout, /Essays/);
  assert.match(publicLayout, /Opinion/);
  assert.match(css, /\.brand-logo/);
  assert.match(css, /\.header-search/);
  assert.match(css, /\.final-design-section-nav/);
});

test("Figma final frontend handoff is registered in scripts and full suite", () => {
  const rootPkg = readJson("package.json");
  const runTests = read("tests/run-tests.js");
  const testingLog = read("docs/TESTING_LOG.md");

  assert.equal(rootPkg.scripts["test:figma-final-frontend"], "node tests/figma-final-frontend-handoff.test.js");
  assert.match(runTests, /figma-final-frontend-handoff\.test\.js/);
  assert.match(testingLog, /Figma Final Frontend Handoff/i);
});