const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8").replace(/^\uFEFF/, "");

test("Stitch v4 refinement layer loads after the production editorial system", () => {
  const entry = read("apps/web/src/main.jsx");
  assert.match(entry, /import "\.\/stitch-refinement-v4\.css";/);
  assert.ok(entry.indexOf('import "./production-editorial.css";') < entry.indexOf('import "./stitch-refinement-v4.css";'));
});

test("public editorial routes declare their adopted Stitch references", () => {
  const references = new Map([
    ["apps/web/src/pages/ArticleDetailPage.jsx", "article-detail-v4"],
    ["apps/web/src/pages/CategoriesSearchPage.jsx", "search-archive-v4"],
    ["apps/web/src/pages/ContributorsPage.jsx", "contributors-directory-v4"],
    ["apps/web/src/pages/CreativeTeamPage.jsx", "creative-team-v4"],
    ["apps/web/src/pages/ProfileDetailPage.jsx", "profile-detail-v4"],
    ["apps/web/src/pages/FeaturedMediaPage.jsx", "featured-media-gallery-v4"]
  ]);

  for (const [file, reference] of references) {
    assert.match(read(file), new RegExp(`data-design-reference="${reference}"`), `${file} should name its visual source`);
  }
});

test("search and contributor discovery use one result set without duplicate cards", () => {
  const search = read("apps/web/src/pages/CategoriesSearchPage.jsx");
  const contributors = read("apps/web/src/pages/ContributorsPage.jsx");

  assert.match(search, /data-design-reference="search-archive-v4"/);
  assert.match(search, /data-result-index=\{index \+ 1\}/);
  assert.match(search, /title: "Search Archive"/);
  assert.equal((search.match(/sections\.results\.items\.map/g) || []).length, 1);
  assert.match(contributors, /stitch-contributor-directory/);
  assert.match(contributors, /stitch-directory-row/);
  assert.match(contributors, /import \{ ArrowRight \} from "lucide-react"/);
  assert.equal((contributors.match(/sections\.contributorsGrid\.items\.map/g) || []).length, 1);
});

test("private admin surfaces adopt the refinement without entering public navigation", () => {
  const layout = read("apps/web/src/layouts/AdminLayout.jsx");
  const articles = read("apps/web/src/pages/ArticleManagementPage.jsx");
  const media = read("apps/web/src/pages/ProfileMediaManagementPage.jsx");
  const publicLayout = read("apps/web/src/layouts/PublicLayout.jsx");

  assert.match(layout, /data-admin-design="stitch-private-workspace-v4"/);
  assert.match(articles, /data-design-reference="admin-editor-v4"/);
  assert.match(media, /data-design-reference="admin-media-library-v4"/);
  assert.match(media, /Binary uploads remain disabled/);
  assert.doesNotMatch(publicLayout, /to="\/admin|href="\/admin|Admin Login|Admin login/);
});

test("refinement CSS keeps the broadsheet contract responsive and accessible", () => {
  const css = read("apps/web/src/stitch-refinement-v4.css");

  assert.match(css, /--stitch-v4-accent:\s*#a43f2f/);
  assert.match(css, /\[data-design-reference="search-archive-v4"\]/);
  assert.match(css, /\.stitch-contributor-directory/);
  assert.match(css, /\.figma-contributors-page \[data-section="contributors-grid"\]/);
  assert.match(css, /\.figma-featured-page \.figma-media-gallery/);
  assert.match(css, /\.figma-profile-detail \.profile-detail-hero[^{]*\{[^}]*align-items:\s*stretch/s);
  assert.match(css, /\[data-admin-design="stitch-private-workspace-v4"\]/);
  for (const width of [1024, 768, 390, 360]) {
    assert.match(css, new RegExp("@media\\s*\\(max-width:\\s*" + width + "px\\)"));
  }
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.doesNotMatch(css, /font-size:\s*[^;]*vw/);
  assert.doesNotMatch(css, /letter-spacing:\s*-/);
});

test("Stitch v4 audit documents source mapping and preservation decisions", () => {
  const audit = read("docs/STITCH_V4_REFINEMENT_AUDIT_JULY_2026.md");
  assert.match(audit, /stitch_babas_brasse_design_contract \(4\)\.zip/);
  assert.match(audit, /Existing production navigation preserved/);
  assert.match(audit, /No duplicate content rendering/);
  assert.match(audit, /Binary upload remains disabled/);
  assert.match(audit, /Article detail/);
  assert.match(audit, /Featured \/ Media/);
});
