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

function load(relativePath) {
  delete require.cache[require.resolve(filePath(relativePath))];
  return require(filePath(relativePath));
}

test("Phase 3 Contact plan documents the public contact flow", () => {
  const plan = read("docs/PHASE3_CONTACT_PLAN.md");

  assert.match(plan, /Contact/i);
  assert.match(plan, /editorial queries/i);
  assert.match(plan, /contributor submissions/i);
  assert.match(plan, /corrections/i);
  assert.match(plan, /spam protection/i);
  assert.match(plan, /inline validation/i);
  assert.match(plan, /success confirmation/i);
  assert.match(plan, /rate-limit/i);
  assert.match(plan, /Contact Submissions/i);
});

test("Contact renderer exports helpers and preserves the final wireframe contract", () => {
  const { renderContactPage, getContactSubjectOptions } = load("src/render/contact.js");
  const fixtures = load("src/content/fixtures.js");
  const html = renderContactPage(fixtures);

  assert.equal(typeof renderContactPage, "function");
  assert.equal(typeof getContactSubjectOptions, "function");
  assert.match(html, /data-page="contact"/);
  assert.match(html, /data-route="\/contact"/);
  assert.match(html, /data-generated="contact-renderer"/);
  assert.match(html, /data-wireframe-source="contact.html"/);
  assert.match(html, /data-section="landing-nav"/);
});

test("Contact renderer includes intro copy for expected inquiry types", () => {
  const { renderContactPage } = load("src/render/contact.js");
  const fixtures = load("src/content/fixtures.js");
  const html = renderContactPage(fixtures);

  assert.match(html, /data-section="contact-intro"/);
  assert.match(html, /editorial queries/i);
  assert.match(html, /contributor submissions/i);
  assert.match(html, /corrections/i);
  assert.match(html, /general contact/i);
  assert.match(html, /data-section="contact-info"/);
});

test("Contact form includes required labelled fields and spam protection", () => {
  const { renderContactPage, getContactSubjectOptions } = load("src/render/contact.js");
  const fixtures = load("src/content/fixtures.js");
  const html = renderContactPage(fixtures);
  const subjects = getContactSubjectOptions();

  assert.deepEqual(subjects.map((subject) => subject.value), ["general", "submission", "correction", "business"]);
  assert.match(html, /data-section="contact-form"/);
  assert.match(html, /name="name"/);
  assert.match(html, /name="email"/);
  assert.match(html, /name="subject"/);
  assert.match(html, /name="message"/);
  assert.match(html, /name="website"/);
  assert.match(html, /data-field="spam-protection"/);
  assert.match(html, /data-admin-target="contact-submissions"/);
});

test("Contact renderer includes validation, success, error, rate-limit, and pending states", () => {
  const { renderContactPage } = load("src/render/contact.js");
  const fixtures = load("src/content/fixtures.js");
  const html = renderContactPage(fixtures);

  assert.match(html, /data-section="contact-states"/);
  assert.match(html, /data-state-note="contact-validation"/);
  assert.match(html, /data-state-note="contact-success"/);
  assert.match(html, /data-state-note="contact-submit-error"/);
  assert.match(html, /data-state-note="contact-rate-limit"/);
  assert.match(html, /data-state-note="contact-pending"/);
  assert.match(html, /preserve message text/i);
});

test("Contact renderer includes newsletter footer and social route continuity", () => {
  const { renderContactPage } = load("src/render/contact.js");
  const fixtures = load("src/content/fixtures.js");
  const html = renderContactPage(fixtures);

  assert.match(html, /data-section="contact-footer"/);
  assert.match(html, /data-section="newsletter-footer"/);
  assert.match(html, /your@email.com/);
  assert.match(html, /href="\/about"/);
  assert.match(html, /href="\/contributors"/);
  assert.match(html, /href="\/visceral-mag"/);
});

test("Contact page artifact is generated from the renderer contract", () => {
  const html = read("src/pages/contact.html");

  assert.match(html, /data-page="contact"/);
  assert.match(html, /data-route="\/contact"/);
  assert.match(html, /data-generated="contact-renderer"/);
  assert.match(html, /data-section="contact-intro"/);
  assert.match(html, /data-section="contact-form"/);
  assert.match(html, /data-section="contact-states"/);
  assert.match(html, /data-section="contact-footer"/);
});
