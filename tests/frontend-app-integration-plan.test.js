const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

function filePath(relativePath) {
  return path.join(root, relativePath);
}

function read(relativePath) {
  return fs.readFileSync(filePath(relativePath), "utf8").replace(/^\uFEFF/, "");
}

test("frontend app integration plan defines the production stack boundary", () => {
  const plan = read("docs/FRONTEND_APP_INTEGRATION_PLAN.md");

  assert.match(plan, /Frontend App Integration Plan/i);
  assert.match(plan, /React/i);
  assert.match(plan, /do not create a new React app inside this prototype/i);
  assert.match(plan, /static renderer contracts/i);
  assert.match(plan, /production frontend/i);
  assert.match(plan, /July 31, 2026/i);
});

test("frontend app integration plan maps all public admin and support routes", () => {
  const plan = read("docs/FRONTEND_APP_INTEGRATION_PLAN.md");

  const routes = [
    "/",
    "/about",
    "/creative-team",
    "/contributors",
    "/visceral-mag",
    "/visceral-mag/:slug",
    "/search",
    "/featured",
    "/contact",
    "/admin",
    "/admin/articles",
    "/admin/profiles-media",
    "/admin/moderation",
    "/admin/contact-submissions",
    "/admin/login",
    "/admin/password-reset",
    "/404",
    "/500",
    "/offline",
    "/admin/media/upload",
    "/admin/articles/editor-workflow",
    "/mobile-wireframes"
  ];

  for (const route of routes) {
    assert.match(plan, new RegExp(route.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), `${route} should be mapped`);
  }
});

test("frontend app integration plan defines component and layout migration slices", () => {
  const plan = read("docs/FRONTEND_APP_INTEGRATION_PLAN.md");

  assert.match(plan, /App shell/i);
  assert.match(plan, /Public layout/i);
  assert.match(plan, /Admin layout/i);
  assert.match(plan, /Route registry/i);
  assert.match(plan, /Article cards/i);
  assert.match(plan, /Forms/i);
  assert.match(plan, /Tables/i);
  assert.match(plan, /Modals/i);
  assert.match(plan, /State panels/i);
  assert.match(plan, /Mobile breakpoint rules/i);
});

test("frontend app integration plan keeps API auth and persistence work explicit", () => {
  const plan = read("docs/FRONTEND_APP_INTEGRATION_PLAN.md");

  assert.match(plan, /Authentication integration/i);
  assert.match(plan, /Backend persistence/i);
  assert.match(plan, /articles/i);
  assert.match(plan, /profiles/i);
  assert.match(plan, /media/i);
  assert.match(plan, /comments/i);
  assert.match(plan, /reviews/i);
  assert.match(plan, /contact submissions/i);
  assert.match(plan, /newsletter/i);
  assert.match(plan, /mutation queue/i);
});

test("frontend app integration plan defines TDD and launch verification gates", () => {
  const plan = read("docs/FRONTEND_APP_INTEGRATION_PLAN.md");

  assert.match(plan, /TDD gates/i);
  assert.match(plan, /component tests/i);
  assert.match(plan, /route smoke tests/i);
  assert.match(plan, /accessibility/i);
  assert.match(plan, /SEO/i);
  assert.match(plan, /Playwright viewport checks/i);
  assert.match(plan, /deployment smoke/i);
  assert.match(plan, /rollback/i);
  assert.match(plan, /151 passing tests/i);
});
