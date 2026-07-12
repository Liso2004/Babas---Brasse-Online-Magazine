const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8").replace(/^\uFEFF/, "");

test("Git ignores generated frontend dependencies builds reports and runtime logs", () => {
  const ignore = read(".gitignore");
  for (const pattern of ["node_modules/", "dist/", "browser-qa/", "*.log", "*.pid"]) {
    assert.match(ignore, new RegExp(pattern.replace(/[.*+?^$\{\}()|[\]\\]/g, "\\$&")));
  }
});

test("web runtime keeps a focused approved dependency set", () => {
  const pkg = JSON.parse(read("apps/web/package.json"));
  assert.deepEqual(Object.keys(pkg.dependencies).sort(), [
    "@radix-ui/react-slot",
    "class-variance-authority",
    "clsx",
    "lucide-react",
    "react",
    "react-dom",
    "react-router-dom",
    "tailwind-merge"
  ].sort());
  assert.deepEqual(Object.keys(pkg.devDependencies).sort(), [
    "@tailwindcss/vite",
    "@vitejs/plugin-react",
    "tailwindcss",
    "vite"
  ].sort());
});

test("committed tests validate screenshot tooling without requiring generated PNG files", () => {
  const matrix = read("tests/production-figma-browser-qa-matrix.test.js");
  const integrity = read("tests/production-figma-screenshot-integrity.test.js");
  assert.doesNotMatch(matrix, /screenshots exist for desktop and mobile/);
  assert.doesNotMatch(integrity, /all Figma browser QA screenshots have valid dimensions/);
  assert.match(matrix, /generated and git-ignored/i);
  assert.match(integrity, /capture then integrity/i);
});
