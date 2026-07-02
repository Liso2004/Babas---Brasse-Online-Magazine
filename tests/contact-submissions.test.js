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

test("Phase 4 Contact Submissions plan documents the admin inbox workflow", () => {
  const plan = read("docs/PHASE4_CONTACT_SUBMISSIONS_PLAN.md");

  assert.match(plan, /Contact Submissions/i);
  assert.match(plan, /role-protected access/i);
  assert.match(plan, /new submission count/i);
  assert.match(plan, /search/i);
  assert.match(plan, /status/i);
  assert.match(plan, /subject/i);
  assert.match(plan, /sender email/i);
  assert.match(plan, /received date/i);
  assert.match(plan, /detail panel/i);
  assert.match(plan, /reply path/i);
  assert.match(plan, /archive/i);
  assert.match(plan, /error/i);
});

test("Contact Submissions renderer exports helpers and preserves the final wireframe contract", () => {
  const { renderContactSubmissionsPage, getSubmissionRows, getSubmissionStats } = load("src/render/contact-submissions.js");
  const fixtures = load("src/content/fixtures.js");
  const html = renderContactSubmissionsPage(fixtures);

  assert.equal(typeof renderContactSubmissionsPage, "function");
  assert.equal(typeof getSubmissionRows, "function");
  assert.equal(typeof getSubmissionStats, "function");
  assert.match(html, /data-page="contact-submissions"/);
  assert.match(html, /data-route="\/admin\/contact-submissions"/);
  assert.match(html, /data-area="admin"/);
  assert.match(html, /data-generated="contact-submissions-renderer"/);
  assert.match(html, /data-wireframe-source="contact-submissions.html"/);
  assert.match(html, /data-auth-required="editor"/);
});

test("Contact Submissions rows include sender, email, subject, message, status, and reply path", () => {
  const { getSubmissionRows, renderContactSubmissionsPage } = load("src/render/contact-submissions.js");
  const fixtures = load("src/content/fixtures.js");
  const rows = getSubmissionRows(fixtures);
  const html = renderContactSubmissionsPage(fixtures);

  assert.equal(rows.length, fixtures.contactSubmissions.length);
  assert.deepEqual(rows.map((row) => row.subject), ["General inquiry", "Submission"]);
  assert.equal(rows[0].replyHref, "mailto:reader@example.com?subject=Re%3A%20General%20inquiry");

  assert.match(html, /data-section="submissions-inbox"/);
  assert.match(html, /data-column="sender"/);
  assert.match(html, /data-column="email"/);
  assert.match(html, /data-column="subject"/);
  assert.match(html, /data-column="status"/);
  assert.match(html, /data-column="received-date"/);
  assert.match(html, /data-column="row-actions"/);
  assert.match(html, /Reader/);
  assert.match(html, /reader@example.com/);
  assert.match(html, /General inquiry/);
  assert.match(html, /Contact placeholder/);
  assert.match(html, /href="mailto:reader@example.com\?subject=Re%3A%20General%20inquiry"/);
});

test("Contact Submissions stats are fixture-derived and expose new count", () => {
  const { getSubmissionStats, renderContactSubmissionsPage } = load("src/render/contact-submissions.js");
  const fixtures = load("src/content/fixtures.js");
  const stats = getSubmissionStats(fixtures);
  const html = renderContactSubmissionsPage(fixtures);

  assert.deepEqual(stats, {
    totalSubmissions: 2,
    newSubmissions: 1,
    readSubmissions: 0,
    archivedSubmissions: 1
  });

  assert.match(html, /data-new-count="1"/);
  for (const key of Object.keys(stats)) {
    assert.match(html, new RegExp(`data-metric="${key}"`));
    assert.match(html, new RegExp(`data-value="${stats[key]}"`));
  }
});

test("Contact Submissions filters cover status, subject, sender email, and received date", () => {
  const { renderContactSubmissionsPage } = load("src/render/contact-submissions.js");
  const fixtures = load("src/content/fixtures.js");
  const html = renderContactSubmissionsPage(fixtures);

  assert.match(html, /data-section="submissions-filter"/);
  assert.match(html, /name="submission-search"/);
  assert.match(html, /data-filter="status"/);
  assert.match(html, /value="new"/);
  assert.match(html, /value="read"/);
  assert.match(html, /value="archived"/);
  assert.match(html, /data-filter="subject"/);
  assert.match(html, /data-filter="sender-email"/);
  assert.match(html, /data-filter="received-date"/);
});

test("Contact Submissions detail panel and status actions are represented", () => {
  const { renderContactSubmissionsPage } = load("src/render/contact-submissions.js");
  const fixtures = load("src/content/fixtures.js");
  const html = renderContactSubmissionsPage(fixtures);

  assert.match(html, /data-section="submission-detail"/);
  assert.match(html, /data-selected-submission-id="submission-1"/);
  assert.match(html, /data-section="submission-statuses"/);
  assert.match(html, /data-action="mark-read"/);
  assert.match(html, /data-action="archive"/);
  assert.match(html, /data-action="reply"/);
  assert.match(html, /preserve original message context/i);
});

test("Contact Submissions includes loading, empty, archive success, error, and permission states", () => {
  const { renderContactSubmissionsPage } = load("src/render/contact-submissions.js");
  const fixtures = load("src/content/fixtures.js");
  const html = renderContactSubmissionsPage(fixtures);

  assert.match(html, /data-section="submissions-states"/);
  assert.match(html, /data-state-note="submissions-loading"/);
  assert.match(html, /data-state-note="submissions-empty"/);
  assert.match(html, /data-state-note="submission-archive-success"/);
  assert.match(html, /data-state-note="submissions-error"/);
  assert.match(html, /data-state-note="permission-denied"/);
  assert.match(html, /href="\/admin\/login"/);
});

test("Contact Submissions page artifact is generated from the renderer contract", () => {
  const html = read("src/pages/admin/contact-submissions.html");

  assert.match(html, /data-page="contact-submissions"/);
  assert.match(html, /data-route="\/admin\/contact-submissions"/);
  assert.match(html, /data-generated="contact-submissions-renderer"/);
  assert.match(html, /data-section="submissions-filter"/);
  assert.match(html, /data-section="submissions-inbox"/);
  assert.match(html, /data-section="submission-statuses"/);
  assert.match(html, /data-section="submissions-states"/);
});
