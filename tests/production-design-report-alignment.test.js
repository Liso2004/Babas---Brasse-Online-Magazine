const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8").replace(/^\uFEFF/, "");
}

test("production design contract is grounded in the report and editorial reference", () => {
  const design = read("DESIGN.md");

  assert.match(design, /ceconline\.co\.za/i);
  assert.match(design, /BABAS & BRASSE REPORT FOR ROADMAP AND SPRINTPLAN \(1\)\.pdf/i);
  assert.match(design, /publication before product interface/i);
  assert.match(design, /Sabon/i);
  assert.match(design, /image-first editorial hierarchy/i);
  assert.match(design, /do not copy/i);
  assert.match(design, /desktop/i);
  assert.match(design, /mobile/i);
  assert.match(design, /admin/i);
  assert.match(design, /acceptance gates/i);
});

test("report review traces required production gaps and decisions", () => {
  const review = read("docs/BABAS_BRASSE_REPORT_REVIEW_JULY_2026.md");

  for (const requirement of [
    "social navigation",
    "profile detail",
    "book rating",
    "email delivery",
    "image upload",
    "search and filter",
    "deployment-managed storage",
    "July 31, 2026"
  ]) {
    assert.match(review, new RegExp(requirement, "i"));
  }
});

test("active release and sprint plans include the design realignment gate", () => {
  const release = read("docs/PRODUCTION_RELEASE_PLAN_JULY_2026.md");
  const sprint = read("docs/SPRINT_PLAN_JULY_2026.md");

  assert.match(release, /Editorial Design Gate/i);
  assert.match(release, /DESIGN\.md/i);
  assert.match(sprint, /Report And Design Realignment/i);
  assert.match(sprint, /July 13, 2026/i);
});


test("production CSS adopts the report typography and article formatting contract", () => {
  const css = read("apps/web/src/styles.css");
  const home = read("apps/web/src/pages/HomePage.jsx");

  assert.match(css, /--font-editorial:\s*"Sabon"/i);
  assert.match(css, /font-family:\s*var\(--font-editorial\)/i);
  assert.match(css, /\.figma-article-body p\s*\{[^}]*text-align:\s*justify/is);
  assert.match(home, />Latest Articles</i);
});
