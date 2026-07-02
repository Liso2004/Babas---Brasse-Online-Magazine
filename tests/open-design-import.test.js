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

function readJson(relativePath) {
  return JSON.parse(read(relativePath));
}

test("Open Design wireframe import is documented and extracted", () => {
  assert.ok(fs.existsSync(filePath("docs/OPEN_DESIGN_WIREFRAME_IMPORT.md")));
  assert.ok(fs.existsSync(filePath("open-design-import/index.html")));
  assert.ok(fs.existsSync(filePath("open-design-import/DESIGN-HANDOFF.md")));
  assert.ok(fs.existsSync(filePath("open-design-import/DESIGN-MANIFEST.json")));
  assert.ok(fs.existsSync(filePath("open-design-import/critique.json")));

  const doc = read("docs/OPEN_DESIGN_WIREFRAME_IMPORT.md");
  assert.match(doc, /annotated landing\/home wireframe/i);
  assert.match(doc, /sticky desktop nav/i);
  assert.match(doc, /Theatre, Books, Essays, Opinion, Culture/i);
  assert.match(doc, /Newsletter/i);
});

test("Open Design manifest identifies a single primary screen entry", () => {
  const manifest = readJson("open-design-import/DESIGN-MANIFEST.json");

  assert.equal(manifest.entryFile, "index.html");
  assert.equal(manifest.screens.length, 1);
  assert.equal(manifest.screenFilePolicy.entryFileRole, "primary-screen");
  assert.ok(manifest.responsiveViewports.length >= 9);
});

test("Open Design HTML preserves the annotated landing wireframe contract", () => {
  const html = read("open-design-import/index.html");

  assert.match(html, /Annotated Wireframe - Babas & Brasse Landing/);
  assert.match(html, /B&B/);
  assert.match(html, /Search articles/);
  assert.match(html, /Lead theatre story/);
  assert.match(html, /Theatre/);
  assert.match(html, /Books/);
  assert.match(html, /Essays/);
  assert.match(html, /Opinion/);
  assert.match(html, /Culture/);
  assert.match(html, /Stay Connected email capture/);
  assert.match(html, /submit-writing/);
});

test("Open Design critique is a passing annotated wireframe review", () => {
  const critique = readJson("open-design-import/critique.json");

  assert.equal(critique.kind, "critique-panel");
  assert.equal(critique.score, 5);
  assert.equal(critique.axes.accessibility.score, 5);
  assert.equal(critique.axes.state_coverage.score, 5);
});
