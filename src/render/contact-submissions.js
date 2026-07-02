function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getReplyHref(submission) {
  return `mailto:${submission.email}?subject=${encodeURIComponent(`Re: ${submission.subject}`)}`;
}

function getSubmissionRows(fixtures) {
  return fixtures.contactSubmissions.map((submission) => ({
    id: submission.id,
    sender: submission.name,
    email: submission.email,
    subject: submission.subject,
    message: submission.message,
    status: submission.status,
    receivedDate: "Contact inbox",
    replyHref: getReplyHref(submission)
  }));
}

function getSubmissionStats(fixtures) {
  const rows = getSubmissionRows(fixtures);

  return {
    totalSubmissions: rows.length,
    newSubmissions: rows.filter((row) => row.status === "new").length,
    readSubmissions: rows.filter((row) => row.status === "read").length,
    archivedSubmissions: rows.filter((row) => row.status === "archived").length
  };
}

function renderMetric(label, key, value) {
  return `<article class="metric" data-metric="${escapeHtml(key)}" data-value="${escapeHtml(value)}">
      <p class="eyebrow">${escapeHtml(label)}</p>
      <strong>${escapeHtml(value)}</strong>
    </article>`;
}

function renderAdminNav(newCount) {
  const links = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/articles", label: "Articles" },
    { href: "/admin/profiles-media", label: "Profiles / Media" },
    { href: "/admin/moderation", label: "Moderation" },
    { href: "/admin/contact-submissions", label: "Contact", current: true, newCount }
  ];

  return `<nav data-section="admin-nav" aria-label="Admin navigation" data-new-count="${escapeHtml(newCount)}">
    <a class="brand-mark" href="/admin">B&amp;B Admin</a>
    <div class="admin-links">
      ${links.map((link) => `<a href="${escapeHtml(link.href)}"${link.current ? " aria-current=\"page\"" : ""}${link.newCount !== undefined ? ` data-new-count=\"${escapeHtml(link.newCount)}\"` : ""}>${escapeHtml(link.label)}</a>`).join("\n      ")}
    </div>
    <label>Search inbox <input name="admin-q" type="search" placeholder="Search inbox"></label>
    <a href="/admin/login">Editor access</a>
  </nav>`;
}

function renderStats(stats) {
  return `<section data-section="submissions-stats">
    <h2>Inbox health</h2>
    ${renderMetric("Total", "totalSubmissions", stats.totalSubmissions)}
    ${renderMetric("New", "newSubmissions", stats.newSubmissions)}
    ${renderMetric("Read", "readSubmissions", stats.readSubmissions)}
    ${renderMetric("Archived", "archivedSubmissions", stats.archivedSubmissions)}
  </section>`;
}
function renderSubmissionFilters() {
  return `<section data-section="submissions-filter">
    <h2>Inbox filters</h2>
    <label>Search submissions <input name="submission-search" type="search" placeholder="Search sender, subject, email, or message"></label>
    <label data-filter="status">Status
      <select name="status">
        <option value="all">All statuses</option>
        <option value="new">New</option>
        <option value="read">Read</option>
        <option value="archived">Archived</option>
      </select>
    </label>
    <label data-filter="subject">Subject <input name="subject" type="search" placeholder="Subject"></label>
    <label data-filter="sender-email">Sender email <input name="sender-email" type="email" placeholder="sender@example.com"></label>
    <label data-filter="received-date">Received date <input name="received-date" type="date"></label>
  </section>`;
}

function renderSubmissionsInbox(rows) {
  const selected = rows.find((row) => row.status === "new") || rows[0];

  return `<section data-section="submissions-inbox">
    <h2>Inbox</h2>
    <div class="submissions-table" role="table" aria-label="Contact submissions inbox">
      <div role="row" class="table-header">
        <span role="columnheader" data-column="sender">Sender</span>
        <span role="columnheader" data-column="email">Email</span>
        <span role="columnheader" data-column="subject">Subject</span>
        <span role="columnheader" data-column="status">Status</span>
        <span role="columnheader" data-column="received-date">Received date</span>
        <span role="columnheader" data-column="row-actions">Actions</span>
      </div>
      ${rows.map((row) => `<div role="row" class="submission-row" data-submission-id="${escapeHtml(row.id)}" data-status="${escapeHtml(row.status)}">
        <span role="cell">${escapeHtml(row.sender)}</span>
        <a role="cell" href="mailto:${escapeHtml(row.email)}">${escapeHtml(row.email)}</a>
        <span role="cell"><strong>${escapeHtml(row.subject)}</strong><small>${escapeHtml(row.message)}</small></span>
        <span role="cell">${escapeHtml(row.status)}</span>
        <span role="cell">${escapeHtml(row.receivedDate)}</span>
        <span role="cell"><a href="${escapeHtml(row.replyHref)}" data-action="reply">Reply</a></span>
      </div>`).join("\n      ")}
    </div>
    ${renderSubmissionDetail(selected)}
  </section>`;
}

function renderSubmissionDetail(row) {
  return `<article data-section="submission-detail" data-selected-submission-id="${escapeHtml(row.id)}">
    <h3>${escapeHtml(row.subject)}</h3>
    <p><strong>${escapeHtml(row.sender)}</strong> &lt;${escapeHtml(row.email)}&gt;</p>
    <p>${escapeHtml(row.message)}</p>
    <p>Status: ${escapeHtml(row.status)}. Received: ${escapeHtml(row.receivedDate)}.</p>
    <a href="${escapeHtml(row.replyHref)}" data-action="reply">Reply and preserve original message context</a>
  </article>`;
}
function renderSubmissionStatuses() {
  return `<section data-section="submission-statuses">
    <h2>Status actions</h2>
    <article data-status-card="new"><h3>New</h3><p>New messages need triage.</p></article>
    <article data-status-card="read"><h3>Read</h3><p>Read messages have been reviewed.</p></article>
    <article data-status-card="archived"><h3>Archived</h3><p>Archived messages leave the active inbox.</p></article>
    <article data-status-card="reply-path"><h3>Reply path</h3><p>Reply actions preserve original message context.</p></article>
    <button type="button" data-action="mark-read">Mark read</button>
    <button type="button" data-action="archive">Archive</button>
    <a href="mailto:reader@example.com" data-action="reply">Reply</a>
  </section>`;
}

function renderSubmissionStates() {
  return `<section data-section="submissions-states" data-state-note="submissions-loading" data-state-note="submissions-empty" data-state-note="submission-archive-success" data-state-note="submissions-error" data-state-note="permission-denied">
    <h2>Inbox states</h2>
    <article data-state="loading">Loading contact submissions.</article>
    <article data-state="empty">Empty inbox with no public contact messages.</article>
    <article data-state="archive-success">Archive success confirms the message left the active inbox.</article>
    <article data-state="error">Error state keeps the selected message visible and offers retry.</article>
    <article data-state="permission-denied">Permission denied. <a href="/admin/login">Sign in as editor</a>.</article>
  </section>`;
}

function renderContactSubmissionsPage(fixtures) {
  const rows = getSubmissionRows(fixtures);
  const stats = getSubmissionStats(fixtures);

  return `<section data-page="contact-submissions" data-route="/admin/contact-submissions" data-area="admin" data-generated="contact-submissions-renderer" data-wireframe-source="contact-submissions.html" data-auth-required="editor" data-responsive="desktop-split-inbox mobile-stacked-detail">
  ${renderAdminNav(stats.newSubmissions)}

  <header data-section="submissions-intro">
    <p class="eyebrow">Contact Submissions</p>
    <h1>Public contact inbox triage.</h1>
    <p>Role-protected access for editors to search, read, reply, and archive public contact messages.</p>
  </header>

  ${renderStats(stats)}

  ${renderSubmissionFilters()}

  ${renderSubmissionsInbox(rows)}

  ${renderSubmissionStatuses()}

  ${renderSubmissionStates()}
</section>`;
}

module.exports = {
  getSubmissionRows,
  getSubmissionStats,
  renderContactSubmissionsPage
};
