const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8").replace(/^\uFEFF/, "");

test("profile cards link to the registered canonical profile detail route", () => {
  const card = read("apps/web/src/components/FigmaProfileCard.jsx");
  const routes = read("apps/web/src/routes.js");
  assert.match(card, /`\/people\/\$\{profile\.slug\}`/);
  assert.match(card, /id=\{profile\.slug\}/);
  assert.match(routes, /path: "\/people\/:slug"/);
  assert.doesNotMatch(card, /\#\$\{profile\.slug\}/);
});

test("public article models use canonical people routes for bylines", () => {
  for (const file of [
    "apps/web/src/pages/categoriesSearchRouteModel.js",
    "apps/web/src/pages/articleDetailRouteModel.js",
    "apps/web/src/pages/visceralMagRouteModel.js"
  ]) {
    const source = read(file);
    assert.match(source, /`\/people\/\$\{author\.slug\}`/);
    assert.doesNotMatch(source, /\/contributors#/);
  }
});

test("team cards and contributor directory rows enter profile detail", () => {
  const card = read("apps/web/src/components/FigmaProfileCard.jsx");
  const team = read("apps/web/src/pages/CreativeTeamPage.jsx");
  const contributors = read("apps/web/src/pages/ContributorsPage.jsx");
  assert.match(card, /`\/people\/\$\{profile\.slug\}`/);
  assert.match(team, /FigmaProfileCard/);
  assert.match(contributors, /const profileHref/);
  assert.match(contributors, /href=\{profileHref\}/);
});
