const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8").replace(/^\uFEFF/, "");
const exists = (file) => fs.existsSync(path.join(root, file));

test("web runtime declares the focused Figma technology stack", () => {
  const pkg = JSON.parse(read("apps/web/package.json"));
  assert.match(pkg.dependencies.react, /18\./);
  assert.ok(pkg.dependencies["react-router-dom"]);
  assert.ok(pkg.dependencies["lucide-react"]);
  assert.ok(pkg.devDependencies.tailwindcss);
  assert.ok(pkg.devDependencies.vite);
});

test("Vite and the app entry load Tailwind without replacing the existing runtime", () => {
  const vite = read("apps/web/vite.config.js");
  const entry = read("apps/web/src/main.jsx");
  const tailwind = read("apps/web/src/tailwind.css");
  assert.match(vite, /defineConfig/);
  assert.match(entry, /tailwind\.css/);
  assert.match(entry, /styles\.css/);
  assert.match(tailwind, /@import "tailwindcss"/);
});

test("AppShell uses React Router while preserving injectable route resolution", () => {
  const app = read("apps/web/src/App.jsx");
  assert.match(app, /useLocation/);
  assert.match(app, /function RoutedShell/);
  assert.match(app, /getRouteByPath\(location\.pathname\)/);
});

test("public and admin shells use router links and Lucide controls", () => {
  const publicLayout = read("apps/web/src/layouts/PublicLayout.jsx");
  const adminLayout = read("apps/web/src/layouts/AdminLayout.jsx");

  assert.match(publicLayout, /import \{ Link, useLocation, useNavigate \} from "react-router-dom"/);
  assert.match(publicLayout, /import \{ Menu, Search, UserRound, X \} from "lucide-react"/);
  assert.match(publicLayout, /aria-current=\{isSectionActive\(item\)/);
  assert.match(publicLayout, /navigate\(`/);
  assert.match(adminLayout, /import \{ Link, NavLink, useNavigate \} from "react-router-dom"/);
  const css = read("apps/web/src/styles.css");
  assert.match(publicLayout, /className="mobile-navigation-tools"/);
  assert.match(publicLayout, /id="mobile-site-search"/);
  assert.match(css, /\.public-layout \.header-topline \.brand-mark/);
  assert.match(css, /\.mobile-navigation-tools/);
});

test("shadcn-style primitives exist for buttons inputs and class composition", () => {
  const button = read("apps/web/src/components/ui/button.jsx");
  const input = read("apps/web/src/components/ui/input.jsx");
  const utils = read("apps/web/src/components/ui/utils.js");

  assert.match(button, /class-variance-authority/);
  assert.match(button, /@radix-ui\/react-slot/);
  assert.match(button, /buttonVariants/);
  assert.match(input, /forwardRef/);
  assert.match(utils, /tailwind-merge/);
});

test("Home follows the final Figma composition instead of the MVP dashboard composition", () => {
  const home = read("apps/web/src/pages/HomePage.jsx");
  assert.match(home, /figma-final-home/);
  assert.match(home, /FigmaArticleCard/);
  assert.doesNotMatch(home, /route-card/);
});

test("Figma stack migration is documented and wired into the full suite", () => {
  const runner = read("tests/run-tests.js");
  assert.ok(exists("docs/UI_TECH_STACK_IMAGEGEN_AUDIT_JULY_11_2026.md"));
  assert.match(runner, /production-figma-tech-stack-migration\.test\.js/);
});
