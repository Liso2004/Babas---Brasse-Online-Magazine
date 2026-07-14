const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8").replace(/^\uFEFF/, "");

test("public shell uses the Visceral production system without exposing admin", () => {
  const layout = read("apps/web/src/layouts/PublicLayout.jsx");
  assert.match(layout, /data-public-design="visceral-brutalist-archive"/);
  assert.match(layout, /production-editorial-header/);
  assert.equal((layout.match(/role="search"/g) || []).length, 1);
  assert.doesNotMatch(layout, /to="\/admin|href="\/admin|Admin Login|Admin login/);
});

test("production CSS defines the approved high-contrast tokens and breakpoints", () => {
  const css = read("apps/web/src/production-editorial.css");
  assert.match(css, /--production-paper:\s*#ffffff/);
  assert.match(css, /--production-ink:\s*#0b0b0b/);
  assert.match(css, /--production-signal:\s*#d92d20/);
  assert.match(css, /\[data-public-design="visceral-brutalist-archive"\]/);
  for (const width of [1024, 768, 390, 360]) {
    assert.match(css, new RegExp("@media\\s*\\(max-width:\\s*" + width + "px\\)"));
  }
  assert.doesNotMatch(css, /font-size:\s*[^;]*vw/);
  assert.doesNotMatch(css, /letter-spacing:\s*-/);
});

test("design contract records selected variants and the existing font fallback", () => {
  const design = read("DESIGN.md");
  assert.match(design, /Visceral Brutalist Archive package is the approved public visual foundation/);
  assert.match(design, /about_brutalist_manifest\/code\.html/);
  assert.match(design, /contact_brutalist_dispatch_v2\/code\.html/);
  assert.match(design, /visceral_mag_brutalist_archive_v2\/code\.html/);
  assert.match(design, /No new font dependency was installed/);
});
test("mobile production header replaces the desktop grid without clipped links", () => {
  const css = read("apps/web/src/production-editorial.css");
  assert.match(css, /Mobile navigation must fully replace the desktop two-column header grid/);
  assert.ok(css.includes("@media (max-width: 960px)"));
  assert.ok(css.includes("grid-template-columns: minmax(0, 1fr);"));
  assert.ok(css.includes("justify-content: stretch;"));
});
test("production editorial layer loads after the base visual system", () => {
  const entry = read("apps/web/src/main.jsx");
  assert.ok(entry.indexOf('import "./styles.css";') < entry.indexOf('import "./production-editorial.css";'));
});
test("completion audit records preservation evidence and the closed build gate", () => {
  const audit = read("docs/STYLING_INTEGRATION_AUDIT_JULY_2026.md");
  assert.ok(audit.includes("| Preserve routes |"));
  assert.ok(audit.includes("| Keep Admin private |"));
  assert.ok(audit.includes("| Production build |"));
  assert.ok(audit.includes("| Pass |"));
  assert.match(audit, /1,675 modules transformed/);
});