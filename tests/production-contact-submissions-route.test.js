const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const root = path.resolve(__dirname, "..");
function filePath(relativePath) { return path.join(root, relativePath); }
function read(relativePath) { return fs.readFileSync(filePath(relativePath), "utf8").replace(/^\uFEFF/, ""); }
function exists(relativePath) { return fs.existsSync(filePath(relativePath)); }
async function loadContactSubmissionsModel() {
  const modulePath = filePath("apps/web/src/pages/contactSubmissionsRouteModel.js");
  assert.ok(fs.existsSync(modulePath), "apps/web/src/pages/contactSubmissionsRouteModel.js should exist");
  return import(pathToFileURL(modulePath).href);
}
function loadFixtures() { delete require.cache[require.resolve(filePath("src/content/fixtures.js"))]; return require(filePath("src/content/fixtures.js")); }

test("production Contact Submissions route model preserves the protected inbox workflow", async () => {
  const { buildContactSubmissionsRouteModel } = await loadContactSubmissionsModel();
  const model = buildContactSubmissionsRouteModel(loadFixtures());
  assert.equal(model.pageId, "contact-submissions");
  assert.equal(model.generatedFrom, "contact-submissions-route-model");
  assert.equal(model.route.path, "/admin/contact-submissions");
  assert.equal(model.route.prototypeFile, "src/pages/admin/contact-submissions.html");
  assert.equal(model.auth.required, true);
  assert.equal(model.auth.role, "admin");
  assert.match(model.hero.title, /Public contact inbox triage/i);
});

test("production Contact Submissions model includes submission rows stats and filters", async () => {
  const { buildContactSubmissionsRouteModel, getSubmissionRows, getSubmissionStats } = await loadContactSubmissionsModel();
  const fixtures = loadFixtures();
  const rows = getSubmissionRows(fixtures);
  const stats = getSubmissionStats(fixtures);
  const model = buildContactSubmissionsRouteModel(fixtures);
  assert.deepEqual(rows.map((row) => row.subject), ["General inquiry", "Submission"]);
  assert.equal(rows[0].replyHref, "mailto:reader@example.com?subject=Re%3A%20General%20inquiry");
  assert.deepEqual(stats, { totalSubmissions: 2, newSubmissions: 1, readSubmissions: 0, archivedSubmissions: 1 });
  assert.equal(model.nav.newCount, 1);
  assert.deepEqual(model.sections.filters.filters.map((filter) => filter.name), ["status", "subject", "sender-email", "received-date"]);
});

test("production Contact Submissions model includes inbox detail actions and states", async () => {
  const { buildContactSubmissionsRouteModel } = await loadContactSubmissionsModel();
  const model = buildContactSubmissionsRouteModel(loadFixtures());
  assert.deepEqual(model.sections.inbox.columns, ["sender", "email", "subject", "status", "received-date", "row-actions"]);
  assert.equal(model.sections.inbox.selectedSubmission.id, "submission-1");
  assert.deepEqual(model.sections.statuses.actions.map((action) => action.action), ["mark-read", "archive", "reply"]);
  assert.deepEqual(model.sections.states.notes, ["submissions-loading", "submissions-empty", "submission-archive-success", "submissions-error", "permission-denied"]);
  assert.equal(model.sections.states.permissionHref, "/admin/login");
});

test("React-ready ContactSubmissionsPage component is scaffolded from the route model", () => {
  assert.ok(exists("apps/web/src/pages/ContactSubmissionsPage.jsx"), "ContactSubmissionsPage.jsx should exist");
  const component = read("apps/web/src/pages/ContactSubmissionsPage.jsx");
  const app = read("apps/web/src/App.jsx");
  assert.match(component, /export function ContactSubmissionsPage/);
  assert.match(component, /buildContactSubmissionsRouteModel/);
  assert.match(component, /fetch\("\/api\/admin\/contact-submissions"/);
  assert.match(component, /credentials: "include"/);
  assert.match(component, /method: "PATCH"/);
  assert.match(component, /data-page="contact-submissions"/);
  assert.match(component, /data-section="submissions-intro"/);
  assert.match(component, /data-section="submissions-stats"/);
  assert.match(component, /data-section="submissions-filter"/);
  assert.match(component, /data-section="submissions-inbox"/);
  assert.match(component, /data-section="submission-statuses"/);
  assert.match(component, /data-section="submissions-states"/);
  assert.match(app, /ContactSubmissionsPage/);
  assert.match(app, /route\.id === "contact-submissions"/);
});

test("Contact Submissions route migration handoff is documented and wired into scripts", () => {
  const rootPkg = JSON.parse(read("package.json"));
  const runTests = read("tests/run-tests.js");
  const readme = read("apps/web/README.md");
  const planStatus = read("docs/PLAN_STATUS.md");
  assert.ok(rootPkg.scripts["test:production-contact-submissions"]);
  assert.match(runTests, /production-contact-submissions-route\.test\.js/);
  assert.match(readme, /Contact Submissions route migration/i);
  assert.match(planStatus, /Contact Submissions route migration/i);
});
