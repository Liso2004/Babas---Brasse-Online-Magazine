const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const root = path.resolve(__dirname, "..");

function filePath(relativePath) {
  return path.join(root, relativePath);
}

function read(relativePath) {
  return fs.readFileSync(filePath(relativePath), "utf8").replace(/^\uFEFF/, "");
}

function exists(relativePath) {
  return fs.existsSync(filePath(relativePath));
}

async function loadContactModel() {
  const modulePath = filePath("apps/web/src/pages/contactRouteModel.js");
  assert.ok(fs.existsSync(modulePath), "apps/web/src/pages/contactRouteModel.js should exist");
  return import(pathToFileURL(modulePath).href);
}

function loadFixtures() {
  delete require.cache[require.resolve(filePath("src/content/fixtures.js"))];
  return require(filePath("src/content/fixtures.js"));
}

test("production Contact route model preserves the public contact surface", async () => {
  const { buildContactRouteModel, getContactSubjectOptions } = await loadContactModel();
  const model = buildContactRouteModel(loadFixtures());

  assert.equal(model.pageId, "contact");
  assert.equal(model.generatedFrom, "contact-route-model");
  assert.equal(model.route.path, "/contact");
  assert.equal(model.route.prototypeFile, "src/pages/contact.html");
  assert.match(model.hero.title, /Reach Babas & Brasse/i);
  assert.deepEqual(getContactSubjectOptions().map((subject) => subject.value), ["general", "submission", "correction", "business"]);
  assert.equal(model.form.adminTarget, "contact-submissions");
});

test("production Contact model includes required form fields and inquiry routing", async () => {
  const { buildContactRouteModel } = await loadContactModel();
  const model = buildContactRouteModel(loadFixtures());

  assert.deepEqual(model.form.fields.map((field) => field.name), ["name", "email", "subject", "message", "website"]);
  assert.ok(model.form.fields.filter((field) => field.required).map((field) => field.name).includes("name"));
  assert.ok(model.form.fields.filter((field) => field.required).map((field) => field.name).includes("email"));
  assert.ok(model.form.fields.filter((field) => field.required).map((field) => field.name).includes("subject"));
  assert.ok(model.form.fields.filter((field) => field.required).map((field) => field.name).includes("message"));
  assert.equal(model.form.fields.find((field) => field.name === "website").purpose, "spam-protection");
  assert.deepEqual(model.sections.inquiryTypes.items, ["editorial queries", "contributor submissions", "corrections", "business notes", "general contact"]);
});

test("production Contact model exposes validation, submission, and rate-limit states", async () => {
  const { buildContactRouteModel } = await loadContactModel();
  const model = buildContactRouteModel(loadFixtures());

  assert.deepEqual(model.sections.states.notes, ["contact-validation", "contact-success", "contact-submit-error", "contact-rate-limit", "contact-pending"]);
  assert.deepEqual(model.sections.states.items, ["validation", "success", "error", "rate-limit", "pending"]);
  assert.match(model.sections.states.recoveryCopy, /preserve message text/i);
  assert.match(model.sections.states.accessibilityCopy, /focus/i);
});

test("production Contact model includes newsletter without duplicate footer routes", async () => {
  const { buildContactRouteModel } = await loadContactModel();
  const model = buildContactRouteModel(loadFixtures());

  assert.equal(model.newsletter.id, "newsletter");
  assert.equal(model.newsletter.placeholder, "your@email.com");
  assert.equal(model.footerLinks, undefined);
});

test("React-ready ContactPage component is scaffolded from the route model", () => {
  assert.ok(exists("apps/web/src/pages/ContactPage.jsx"), "ContactPage.jsx should exist");
  const component = read("apps/web/src/pages/ContactPage.jsx");
  const app = read("apps/web/src/App.jsx");

  assert.match(component, /export function ContactPage/);
  assert.match(component, /buildContactRouteModel/);
  assert.match(component, /data-page="contact"/);
  assert.match(component, /data-section="contact-intro"/);
  assert.match(component, /data-section="contact-form"/);
  assert.match(component, /data-section="contact-states"/);
  assert.match(component, /data-section="newsletter-footer"/);
  assert.doesNotMatch(component, /Contact footer routes|footerLinks\.map/);
  assert.match(component, /data-admin-target=\{model\.form\.adminTarget\}/);
  assert.match(app, /ContactPage/);
  assert.match(app, /route\.id === "contact"/);
});

test("Contact route migration handoff is documented and wired into scripts", () => {
  const rootPkg = JSON.parse(read("package.json"));
  const runTests = read("tests/run-tests.js");
  const readme = read("apps/web/README.md");
  const planStatus = read("docs/PLAN_STATUS.md");

  assert.ok(rootPkg.scripts["test:production-contact"]);
  assert.match(runTests, /production-contact-route\.test\.js/);
  assert.match(readme, /Contact route migration/i);
  assert.match(planStatus, /Contact route migration/i);
});
