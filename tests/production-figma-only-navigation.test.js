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

test("search route reads query category and topic from React Router", () => {
  const page = read("apps/web/src/pages/CategoriesSearchPage.jsx");
  assert.match(page, /useLocation/);
  assert.match(page, /useNavigate/);
  assert.match(page, /new URLSearchParams\(location\.search\)/);
  assert.match(page, /params\.get\("topic"\)/);
  assert.match(page, /navigate\(/);
  assert.match(page, /<Link/);
});

test("Theatre Books and Opinion navigation filters produce distinct results", async () => {
  const fixtures = await load("apps/web/src/data/launchFixtures.js");
  const { filterPublishedArticles } = await load("apps/web/src/pages/categoriesSearchRouteModel.js");
  const theatre = filterPublishedArticles(fixtures, { category: "reviews", topic: "theatre" });
  const books = filterPublishedArticles(fixtures, { category: "reviews", topic: "books" });
  const opinion = filterPublishedArticles(fixtures, { category: "essays", topic: "opinion" });

  assert.ok(theatre.length > 0);
  assert.ok(books.length > 0);
  assert.ok(opinion.length > 0);
  assert.notDeepEqual(theatre.map((item) => item.id), books.map((item) => item.id));
  assert.ok(theatre.every((item) => !books.some((book) => book.id === item.id)));
});

test("public navigation marks query routes independently without duplicate route records", () => {
  const layout = read("apps/web/src/layouts/PublicLayout.jsx");
  const routes = read("apps/web/src/routes.js");
  assert.match(layout, /useLocation/);
  assert.match(layout, /isSectionActive/);
  assert.match(layout, /new URLSearchParams\(location\.search\)/);
  assert.match(layout, /aria-current=\{isSectionActive\(item\)/);
  assert.doesNotMatch(routes, /path: "\/(theatre|books|essays|opinion)"/);
});

test("Figma runtime has no global MVP section cards or boxed main wrapper", () => {
  const css = read("apps/web/src/styles.css");
  assert.doesNotMatch(css, /^\[data-section\]\s*\{[^}]*box-shadow/ms);
  assert.doesNotMatch(css, /^\[data-section\]\s*\{[^}]*background:\s*var\(--surface\)/ms);
  assert.match(css, /main\s*\{\s*width:\s*100%/);
  assert.match(css, /\.figma-final-home[\s\S]*max-width:\s*1280px/);
  assert.match(css, /\.figma-public-page[\s\S]*max-width:\s*1280px/);
});
