const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8").replace(/^\uFEFF/, "");

test("profile cards link to canonical page anchors instead of unregistered detail routes", () => {
  const card = read("apps/web/src/components/FigmaProfileCard.jsx");
  assert.match(card, /profileRoute/);
  assert.match(card, /id=\{profile\.slug\}/);
  assert.match(card, /\#\$\{profile\.slug\}/);
  assert.doesNotMatch(card, /`\/contributors\/\$\{profile\.slug\}`/);
});

test("public article models use contributor anchors for bylines", () => {
  for (const file of [
    "apps/web/src/pages/categoriesSearchRouteModel.js",
    "apps/web/src/pages/articleDetailRouteModel.js",
    "apps/web/src/pages/visceralMagRouteModel.js"
  ]) {
    const source = read(file);
    assert.match(source, /`\/contributors\#\$\{author\.slug\}`/);
    assert.doesNotMatch(source, /`\/contributors\/\$\{author\.slug\}`/);
  }
});

test("canonical contributor and team pages render matching profile anchor targets", () => {
  const card = read("apps/web/src/components/FigmaProfileCard.jsx");
  const team = read("apps/web/src/pages/CreativeTeamPage.jsx");
  const contributors = read("apps/web/src/pages/ContributorsPage.jsx");
  assert.match(card, /profile\.type === "creative_team" \? "\/creative-team" : "\/contributors"/);
  assert.match(team, /FigmaProfileCard/);
  assert.match(contributors, /FigmaProfileCard/);
});
