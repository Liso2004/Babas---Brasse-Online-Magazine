const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8").replace(/^\uFEFF/, "");
}
function readJson(relativePath) {
  return JSON.parse(read(relativePath));
}
function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

test("apps web declares the React and Vite runtime dependencies", () => {
  const pkg = readJson("apps/web/package.json");

  assert.equal(pkg.type, "module");
  assert.equal(pkg.scripts.dev, "vite --host 127.0.0.1 --port 5173");
  assert.equal(pkg.scripts.build, "vite build");
  assert.match(pkg.scripts.preview, /vite preview/);
  assert.ok(pkg.dependencies.react, "React should be declared for the runnable app");
  assert.ok(pkg.dependencies["react-dom"], "React DOM should be declared for the runnable app");
  assert.ok(pkg.devDependencies.vite, "Vite should be declared for local dev/build");
  assert.ok(pkg.devDependencies["@vitejs/plugin-react"], "Vite React plugin should be declared for JSX transform");
});

test("apps web has Vite config and runnable entry files", () => {
  const viteConfig = read("apps/web/vite.config.js");
  const index = read("apps/web/index.html");
  const main = read("apps/web/src/main.jsx");

  assert.ok(exists("apps/web/vite.config.js"));
  assert.match(viteConfig, /@vitejs\/plugin-react/);
  assert.match(viteConfig, /react\(\)/);
  assert.match(index, /<div id="root"><\/div>/);
  assert.match(index, /src="\/src\/main\.jsx"/);
  assert.match(main, /createRoot/);
  assert.match(main, /<AppShell \/>/);
});

test("apps web pages use an ESM launch fixture module for bundling", () => {
  const pagesDir = path.join(root, "apps/web/src/pages");
  const pageFiles = fs.readdirSync(pagesDir).filter((file) => file.endsWith(".jsx"));

  assert.ok(exists("apps/web/src/data/launchFixtures.js"));

  for (const file of pageFiles) {
    const source = read(`apps/web/src/pages/${file}`);
    assert.doesNotMatch(source, /\.\.\/\.\.\/\.\.\/\.\.\/src\/content\/fixtures\.js/, `${file} should not import CommonJS prototype fixtures`);
  }
});
test("runtime install and verification commands are documented", () => {
  const readme = read("apps/web/README.md");
  const planStatus = read("docs/PLAN_STATUS.md");
  const rootPkg = readJson("package.json");
  const runTests = read("tests/run-tests.js");

  assert.match(readme, /Runtime Dependency Install/i);
  assert.match(readme, /npm.cmd install/i);
  assert.match(readme, /npm.cmd run dev/i);
  assert.match(readme, /npm.cmd run build/i);
  assert.match(planStatus, /Runtime dependency install/i);
  assert.ok(rootPkg.scripts["test:web-runtime"]);
  assert.match(runTests, /production-web-runtime\.test\.js/);
});

