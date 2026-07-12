const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8").replace(/^\uFEFF/, "");

const assets = [
  "editorial-theatre.jpg",
  "editorial-books.jpg",
  "editorial-belonging.jpg",
  "editorial-language.jpg",
  "editorial-stagecraft.jpg"
];

test("ImageGen editorial asset set exists and is non-trivial", () => {
  for (const name of assets) {
    const file = path.join(root, "apps/web/public/media/editorial", name);
    assert.ok(fs.existsSync(file), name + " should exist");
    assert.ok(fs.statSync(file).size > 100000, name + " should be a substantial generated image");
  }
});

test("live public fixtures use unique ImageGen assets instead of placeholder media", () => {
  const fixtures = read("apps/web/src/data/launchFixtures.js");
  for (const name of assets) assert.match(fixtures, new RegExp("/media/editorial/" + name.replace(".", "\\.")));
  assert.doesNotMatch(fixtures, /featuredImage: mediaItems\[/);
  assert.doesNotMatch(fixtures, /Opening Banner Placeholder|Photography Feature Placeholder|Artwork Feature Placeholder/);
});

test("public information and profile models no longer expose placeholder imagery", () => {
  const sources = [
    read("apps/web/src/pages/aboutRouteModel.js"),
    read("apps/web/src/pages/creativeTeamRouteModel.js"),
    read("apps/web/src/pages/contributorsRouteModel.js")
  ].join("\n");
  assert.doesNotMatch(sources, /media\/[^"\n]*placeholder|Portrait placeholder|publication image placeholder/i);
  assert.match(sources, /\/media\/editorial\//);
});
