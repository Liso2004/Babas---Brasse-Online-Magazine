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

test("shared Figma profile card component exists for team and contributor pages", () => {
  const componentPath = "apps/web/src/components/FigmaProfileCard.jsx";
  assert.ok(fs.existsSync(filePath(componentPath)), `${componentPath} should exist`);
  const component = read(componentPath);

  assert.match(component, /export function FigmaProfileCard/);
  assert.match(component, /profile-card figma-profile-card/);
  assert.match(component, /figma-profile-card__media/);
  assert.match(component, /figma-profile-card__links/);
  assert.match(component, /publishedWorks/);
});

test("About page uses the Figma public info layout", () => {
  const about = read("apps/web/src/pages/AboutPage.jsx");

  assert.match(about, /className="figma-public-page figma-about-page"/);
  assert.match(about, /className="figma-page-intro"/);
  assert.match(about, /className="figma-about-overview"/);
  assert.match(about, /className="figma-info-grid"/);
  assert.match(about, /className="figma-route-grid"/);
  assert.match(about, /className="figma-newsletter-panel"/);
});

test("Creative Team uses profile cards and Contributors uses the Stitch directory", () => {
  const team = read("apps/web/src/pages/CreativeTeamPage.jsx");
  const contributors = read("apps/web/src/pages/ContributorsPage.jsx");

  assert.match(team, /import \{ FigmaProfileCard \}/);
  assert.match(team, /className="figma-public-page figma-team-page"/);
  assert.match(team, /className="figma-editorial-note"/);
  assert.match(team, /className="figma-profile-grid"/);
  assert.match(team, /<FigmaProfileCard/);

  assert.doesNotMatch(contributors, /import \{ FigmaProfileCard \}/);
  assert.match(contributors, /className="figma-public-page figma-contributors-page"/);
  assert.doesNotMatch(contributors, /className="figma-search-tools"/);
  assert.match(contributors, /className="stitch-contributor-directory"/);
  assert.match(contributors, /className="stitch-directory-row"/);
});

test("Contact page uses the Figma contact and newsletter layout", () => {
  const contact = read("apps/web/src/pages/ContactPage.jsx");
  const newsletter = read("apps/web/src/components/NewsletterSignup.jsx");

  assert.match(contact, /className="figma-public-page figma-contact-page"/);
  assert.match(contact, /className="figma-contact-layout"/);
  assert.match(contact, /className="figma-contact-info-panel"/);
  assert.match(contact, /className="figma-contact-form-panel"/);
  assert.match(contact, /className="figma-state-grid"/);
  assert.match(contact, /className="figma-newsletter-panel"/);
  assert.match(contact, /autoComplete=\{field\.autocomplete \|\| "off"\}/);
  assert.match(contact, /<NewsletterSignup/);
  assert.match(newsletter, /autoComplete="email"/);
});

test("Figma info pages sprint is styled documented and wired into the full suite", () => {
  const rootPkg = readJson("package.json");
  const runTests = read("tests/run-tests.js");
  const css = read("apps/web/src/styles.css");
  const testingLog = read("docs/TESTING_LOG.md");
  const sprintPlan = read("docs/SPRINT_PLAN_JULY_2026.md");

  assert.equal(rootPkg.scripts["test:production-figma-info-pages"], "node tests/production-figma-info-pages.test.js");
  assert.match(runTests, /production-figma-info-pages\.test\.js/);
  assert.match(css, /\.figma-profile-card/);
  assert.match(css, /\.figma-about-overview/);
  assert.match(css, /\.figma-route-grid/);
  assert.match(css, /\.figma-contact-layout/);
  assert.match(css, /\.figma-contact-form-panel/);
  assert.match(testingLog, /Figma Info Pages Sprint/i);
  assert.match(sprintPlan, /Figma info pages sprint/i);
});
