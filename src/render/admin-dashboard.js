function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getDashboardMetrics(fixtures) {
  return {
    publishedArticles: fixtures.articles.filter((article) => article.status === "published").length,
    drafts: fixtures.articles.filter((article) => article.status === "draft").length,
    pendingComments: fixtures.comments.filter((comment) => comment.status === "pending").length,
    pendingReviews: fixtures.reviews.filter((review) => review.status === "pending").length,
    newContactSubmissions: fixtures.contactSubmissions.filter((submission) => submission.status === "new").length
  };
}

function getRecentActivity(fixtures) {
  const draftActivities = fixtures.articles
    .filter((article) => article.status === "draft")
    .map((article) => ({
      actor: "Editor",
      item: article.dek,
      status: "Draft",
      timestamp: "Unscheduled",
      nextAction: "Continue editing",
      href: "/admin/articles"
    }));

  const commentActivities = fixtures.comments
    .filter((comment) => comment.status === "pending")
    .map((comment) => ({
      actor: comment.name,
      item: comment.body,
      status: "Pending comment",
      timestamp: "Moderation queue",
      nextAction: "Review comment",
      href: "/admin/moderation"
    }));

  const contactActivities = fixtures.contactSubmissions
    .filter((submission) => submission.status === "new")
    .map((submission) => ({
      actor: submission.name,
      item: submission.subject,
      status: "New contact submission",
      timestamp: submission.email,
      nextAction: "Open inbox",
      href: "/admin/contact-submissions"
    }));

  return [...draftActivities, ...commentActivities, ...contactActivities];
}

function renderAdminNav() {
  const links = [
    { href: "/admin", label: "Dashboard", current: true },
    { href: "/admin/articles", label: "Articles" },
    { href: "/admin/profiles-media", label: "Profiles / Media" },
    { href: "/admin/moderation", label: "Moderation" },
    { href: "/admin/contact-submissions", label: "Contact" }
  ];

  return `<nav data-section="admin-nav" aria-label="Admin navigation">
    <a class="brand-mark" href="/admin">B&amp;B Admin</a>
    <div class="admin-links">
      ${links.map((link) => `<a href="${escapeHtml(link.href)}"${link.current ? " aria-current=\"page\"" : ""}>${escapeHtml(link.label)}</a>`).join("\n      ")}
    </div>
    <label>Admin search <input name="admin-q" type="search" placeholder="Admin search"></label>
    <a href="/admin/login">Editor access</a>
  </nav>`;
}

function renderMetric(label, key, value) {
  return `<article class="metric" data-metric="${escapeHtml(key)}" data-value="${escapeHtml(value)}">
      <p class="eyebrow">${escapeHtml(label)}</p>
      <strong>${escapeHtml(value)}</strong>
    </article>`;
}

function renderDashboardStats(metrics) {
  return `<section data-section="dashboard-stats">
    <h2>Publishing health</h2>
    ${renderMetric("Published", "publishedArticles", metrics.publishedArticles)}
    ${renderMetric("Drafts", "drafts", metrics.drafts)}
    ${renderMetric("Comments", "pendingComments", metrics.pendingComments)}
    ${renderMetric("Reviews", "pendingReviews", metrics.pendingReviews)}
    ${renderMetric("Contact", "newContactSubmissions", metrics.newContactSubmissions)}
  </section>`;
}

function renderRecentActivity(activity) {
  return `<section data-section="recent-activity">
    <h2>Recent activity</h2>
    <div class="activity-table" role="table" aria-label="Recent admin activity">
      <div role="row" class="table-header">
        <span data-column="actor" role="columnheader">Actor</span>
        <span data-column="item" role="columnheader">Item</span>
        <span data-column="status" role="columnheader">Status</span>
        <span data-column="timestamp" role="columnheader">Timestamp</span>
        <span data-column="next-action" role="columnheader">Next action</span>
      </div>
      ${activity.map((item) => `<div role="row" class="activity-row" data-status="${escapeHtml(item.status)}">
        <span role="cell">${escapeHtml(item.actor)}</span>
        <span role="cell">${escapeHtml(item.item)}</span>
        <span role="cell">${escapeHtml(item.status)}</span>
        <span role="cell">${escapeHtml(item.timestamp)}</span>
        <a role="cell" href="${escapeHtml(item.href)}">${escapeHtml(item.nextAction)}</a>
      </div>`).join("\n      ")}
    </div>
  </section>`;
}

function renderQuickActions() {
  const actions = [
    { href: "/admin/articles", label: "New article", body: "Create or continue editorial drafts." },
    { href: "/admin/moderation", label: "Moderate", body: "Review pending comments and reviews." },
    { href: "/admin/profiles-media", label: "Upload media", body: "Manage images, captions, credits, and alt text." },
    { href: "/admin/contact-submissions", label: "Inbox", body: "Review new reader and contributor messages." }
  ];

  return `<section data-section="quick-actions">
    <h2>Quick actions</h2>
    ${actions.map((action) => `<article class="quick-action-card">
      <h3>${escapeHtml(action.label)}</h3>
      <p>${escapeHtml(action.body)}</p>
      <a href="${escapeHtml(action.href)}">${escapeHtml(action.label)}</a>
    </article>`).join("\n    ")}
  </section>`;
}

function renderDashboardStates() {
  return `<section data-section="dashboard-states" data-state-note="dashboard-loading" data-state-note="dashboard-empty" data-state-note="dashboard-error" data-state-note="permission-denied">
    <h2>Dashboard states</h2>
    <article data-state="loading">Loading dashboard data</article>
    <article data-state="empty">No recent editorial activity</article>
    <article data-state="error">Dashboard failed to load; retry the request.</article>
    <article data-state="permission-denied">Permission denied. <a href="/admin/login">Sign in as editor</a>.</article>
  </section>`;
}

function renderAdminDashboardPage(fixtures) {
  const metrics = getDashboardMetrics(fixtures);
  const activity = getRecentActivity(fixtures);

  return `<section data-page="admin-dashboard" data-route="/admin" data-area="admin" data-generated="admin-dashboard-renderer" data-wireframe-source="admin-dashboard.html" data-auth-required="editor" data-responsive="desktop-dense tablet-two-column mobile-stacked">
  ${renderAdminNav()}

  <header data-section="admin-dashboard-intro">
    <p class="eyebrow">Admin Dashboard</p>
    <h1>Editorial operations overview.</h1>
    <p>Authenticated editor access is required before publishing, moderation, media, or contact data is shown.</p>
  </header>

  ${renderDashboardStats(metrics)}

  ${renderRecentActivity(activity)}

  ${renderQuickActions()}

  ${renderDashboardStates()}
</section>`;
}

module.exports = {
  getDashboardMetrics,
  getRecentActivity,
  renderAdminDashboardPage
};

