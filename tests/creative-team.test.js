const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

function filePath(relativePath) {
  return path.join(root, relativePath);
}

function read(relativePath) {
  return fs.readFileSync(filePath(relativePath), "utf8");
}

function load(relativePath) {
  delete require.cache[require.resolve(filePath(relativePath))];
  return require(filePath(relativePath));
}

test("Phase 3 Creative Team plan documents the profile page slice", () => {
  const plan = read("docs/PHASE3_CREATIVE_TEAM_PLAN.md");

  assert.match(plan, /Creative Team/i);
  assert.match(plan, /profile card anatomy/i);
  assert.match(plan, /editorial role/i);
  assert.match(plan, /short bio/i);
  assert.match(plan, /social links/i);
  assert.match(plan, /active public team profiles/i);
  assert.match(plan, /loading/i);
  assert.match(plan, /empty/i);
  assert.match(plan, /error/i);
});

test("Creative Team renderer exports helpers and preserves the final wireframe contract", () => {
  const { renderCreativeTeamPage, getCreativeTeamProfiles } = load("src/render/creative-team.js");
  const fixtures = load("src/content/fixtures.js");
  const html = renderCreativeTeamPage(fixtures);

  assert.equal(typeof renderCreativeTeamPage, "function");
  assert.equal(typeof getCreativeTeamProfiles, "function");
  assert.match(html, /data-page="creative-team"/);
  assert.match(html, /data-route="\/creative-team"/);
  assert.match(html, /data-generated="creative-team-renderer"/);
  assert.match(html, /data-wireframe-source="creative-team.html"/);
  assert.match(html, /data-section="landing-nav"/);
  assert.match(html, /data-section="team-intro"/);
});

test("Creative Team renderer shows active public team profiles only", () => {
  const { renderCreativeTeamPage, getCreativeTeamProfiles } = load("src/render/creative-team.js");
  const fixtures = load("src/content/fixtures.js");
  const teamProfiles = getCreativeTeamProfiles(fixtures);
  const html = renderCreativeTeamPage(fixtures);

  assert.deepEqual(teamProfiles.map((profile) => profile.slug), ["zubayr-charles", "zoe-petersen"]);
  assert.match(html, /Zubayr Charles/);
  assert.match(html, /Zoe Petersen/);
  assert.doesNotMatch(html, /Visceral Contributor/);
  assert.doesNotMatch(html, /data-profile-type="contributor"/);
});

test("Creative Team profile cards include image, name, role, bio, and social state hooks", () => {
  const { renderCreativeTeamPage } = load("src/render/creative-team.js");
  const fixtures = load("src/content/fixtures.js");
  const html = renderCreativeTeamPage(fixtures);

  assert.match(html, /data-section="team-grid"/);
  assert.match(html, /data-profile="zubayr-charles"/);
  assert.match(html, /alt="Portrait placeholder for Zubayr Charles"/);
  assert.match(html, /Client \/ Product Owner/);
  assert.match(html, /Approves scope, content direction, and launch readiness/);
  assert.match(html, /data-state-note="social-links-empty"/);
});

test("Creative Team renderer includes required loading, empty, error, and footer paths", () => {
  const { renderCreativeTeamPage } = load("src/render/creative-team.js");
  const fixtures = load("src/content/fixtures.js");
  const emptyHtml = renderCreativeTeamPage({ ...fixtures, profiles: fixtures.profiles.filter((profile) => profile.type !== "creative_team") });
  const html = renderCreativeTeamPage(fixtures);

  assert.match(html, /data-section="team-states"/);
  assert.match(html, /data-state-note="team-loading"/);
  assert.match(html, /data-state-note="team-error"/);
  assert.match(emptyHtml, /data-state="empty-team"/);
  assert.match(emptyHtml, /No public creative team profiles are published yet/);
  assert.match(html, /data-section="team-footer"/);
  assert.match(html, /href="\/contributors"/);
  assert.match(html, /href="\/contact"/);
});

test("Creative Team page artifact is generated from the renderer contract", () => {
  const html = read("src/pages/creative-team.html");

  assert.match(html, /data-page="creative-team"/);
  assert.match(html, /data-route="\/creative-team"/);
  assert.match(html, /data-generated="creative-team-renderer"/);
  assert.match(html, /data-section="team-intro"/);
  assert.match(html, /data-section="team-grid"/);
  assert.match(html, /data-section="team-states"/);
  assert.match(html, /data-section="team-footer"/);
});
