const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8").replace(/^\uFEFF/, "");

async function load(file) {
  return import(pathToFileURL(path.join(root, file)).href + `?cache=${Date.now()}`);
}

test("section routes do not duplicate the global search control", () => {
  const categories = read("apps/web/src/pages/CategoriesSearchPage.jsx");
  const visceral = read("apps/web/src/pages/VisceralMagPage.jsx");

  assert.match(categories, /showSearchTools/);
  assert.match(categories, /!activeCategory && !activeTopic/);
  assert.match(categories, /showSearchTools \? \(/);
  assert.doesNotMatch(visceral, /data-section="search-entry"/);
});

test("More pages no longer expose wireframe state labels as visible content", () => {
  const creative = read("apps/web/src/pages/CreativeTeamPage.jsx");
  const contributors = read("apps/web/src/pages/ContributorsPage.jsx");

  assert.doesNotMatch(creative, /data-section="team-states"/);
  assert.doesNotMatch(creative, />Profile states</);
  assert.doesNotMatch(contributors, /data-section="contributors-states"/);
  assert.doesNotMatch(contributors, />Contributor states</);
  assert.doesNotMatch(contributors, /data-section="contributors-tools"/);
});

test("live fixtures populate credible team and contributor content", async () => {
  const fixtures = await load("apps/web/src/data/launchFixtures.js");
  const team = fixtures.profiles.filter((profile) => profile.type === "creative_team");
  const contributors = fixtures.profiles.filter((profile) => profile.type === "contributor");

  assert.ok(team.length >= 4);
  assert.ok(contributors.length >= 4);
  assert.ok([...team, ...contributors].every((profile) => profile.name && profile.role && profile.shortBio));
  assert.ok([...team, ...contributors].every((profile) => Array.isArray(profile.socialLinks) && profile.socialLinks.length > 0));

  const publishedAuthors = new Set(fixtures.articles.filter((article) => article.status === "published").map((article) => article.authorProfileId));
  assert.ok(contributors.every((profile) => publishedAuthors.has(profile.id)));
});

test("profile cards render both published work and useful profile links", () => {
  const card = read("apps/web/src/components/FigmaProfileCard.jsx");
  assert.match(card, /Profile links for/);
  assert.match(card, /profile\.socialLinks/);
  assert.match(card, /Published works by/);
});
