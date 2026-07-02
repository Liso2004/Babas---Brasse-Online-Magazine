function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function findById(items, id) {
  return items.find((item) => item.id === id) || null;
}

function getArticleContext(fixtures, articleId) {
  const article = findById(fixtures.articles, articleId);

  if (!article) {
    return {
      title: "Unknown article",
      href: "/admin/articles"
    };
  }

  return {
    title: article.title,
    href: `/visceral-mag/${article.slug}`
  };
}

function getModerationItems(fixtures) {
  const commentItems = fixtures.comments.map((comment) => {
    const article = getArticleContext(fixtures, comment.articleId);

    return {
      id: comment.id,
      type: "comment",
      author: comment.name,
      body: comment.body,
      status: comment.status,
      articleTitle: article.title,
      articleHref: article.href,
      date: "Moderation queue",
      rating: null
    };
  });

  const reviewItems = fixtures.reviews.map((review) => {
    const article = getArticleContext(fixtures, review.articleId);

    return {
      id: review.id,
      type: "review",
      author: review.name,
      body: review.body,
      status: review.status,
      articleTitle: article.title,
      articleHref: article.href,
      date: "Moderation queue",
      rating: review.rating
    };
  });

  return [...commentItems, ...reviewItems];
}

function getModerationStats(fixtures) {
  const items = getModerationItems(fixtures);

  return {
    totalItems: items.length,
    pendingItems: items.filter((item) => item.status === "pending").length,
    approvedItems: items.filter((item) => item.status === "approved").length,
    rejectedItems: items.filter((item) => item.status === "rejected").length,
    comments: items.filter((item) => item.type === "comment").length,
    reviews: items.filter((item) => item.type === "review").length
  };
}

function renderMetric(label, key, value) {
  return `<article class="metric" data-metric="${escapeHtml(key)}" data-value="${escapeHtml(value)}">
      <p class="eyebrow">${escapeHtml(label)}</p>
      <strong>${escapeHtml(value)}</strong>
    </article>`;
}

function renderAdminNav(pendingCount) {
  const links = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/articles", label: "Articles" },
    { href: "/admin/profiles-media", label: "Profiles / Media" },
    { href: "/admin/moderation", label: "Moderation", current: true, pendingCount },
    { href: "/admin/contact-submissions", label: "Contact" }
  ];

  return `<nav data-section="admin-nav" aria-label="Admin navigation" data-pending-count="${escapeHtml(pendingCount)}">
    <a class="brand-mark" href="/admin">B&amp;B Admin</a>
    <div class="admin-links">
      ${links.map((link) => `<a href="${escapeHtml(link.href)}"${link.current ? " aria-current=\"page\"" : ""}${link.pendingCount !== undefined ? ` data-pending-count=\"${escapeHtml(link.pendingCount)}\"` : ""}>${escapeHtml(link.label)}</a>`).join("\n      ")}
    </div>
    <label>Search moderation <input name="admin-q" type="search" placeholder="Search moderation"></label>
    <a href="/admin/login">Editor access</a>
  </nav>`;
}
function renderStats(stats) {
  return `<section data-section="moderation-stats">
    <h2>Moderation health</h2>
    ${renderMetric("Total", "totalItems", stats.totalItems)}
    ${renderMetric("Pending", "pendingItems", stats.pendingItems)}
    ${renderMetric("Approved", "approvedItems", stats.approvedItems)}
    ${renderMetric("Rejected", "rejectedItems", stats.rejectedItems)}
    ${renderMetric("Comments", "comments", stats.comments)}
    ${renderMetric("Reviews", "reviews", stats.reviews)}
  </section>`;
}

function renderQueueControls(fixtures) {
  const articleOptions = fixtures.articles.map((article) => `<option value="${escapeHtml(article.slug)}">${escapeHtml(article.title)}</option>`).join("\n        ");

  return `<section data-section="moderation-queues">
    <h2>Moderation queues</h2>
    <label>Search comments/reviews <input name="moderation-search" type="search" placeholder="Search by author, article, or text"></label>
    <label data-filter="status">Status
      <select name="status">
        <option value="all">All statuses</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>
    </label>
    <label data-filter="type">Type
      <select name="type">
        <option value="all">Comments and reviews</option>
        <option value="comment">Comments</option>
        <option value="review">Reviews</option>
      </select>
    </label>
    <label data-filter="article">Article
      <select name="article">
        <option value="all">All articles</option>
        ${articleOptions}
      </select>
    </label>
    <label data-filter="date">Date
      <input name="date" type="date">
    </label>
  </section>`;
}

function renderModerationWorkspace(items) {
  const selected = items.find((item) => item.status === "pending") || items[0];

  return `<section data-section="moderation-workspace">
    <h2>Queue workspace</h2>
    <div class="moderation-table" role="table" aria-label="Comments and reviews moderation queue">
      <div role="row" class="table-header">
        <span role="columnheader" data-column="type">Type</span>
        <span role="columnheader" data-column="author">Author</span>
        <span role="columnheader" data-column="article">Article</span>
        <span role="columnheader" data-column="status">Status</span>
        <span role="columnheader" data-column="body">Body</span>
        <span role="columnheader" data-column="row-actions">Actions</span>
      </div>
      ${items.map((item) => `<div role="row" class="moderation-row" data-item-id="${escapeHtml(item.id)}" data-type="${escapeHtml(item.type)}" data-status="${escapeHtml(item.status)}">
        <span role="cell">${escapeHtml(item.type)}${item.rating ? ` ${escapeHtml(item.rating)} stars` : ""}</span>
        <span role="cell">${escapeHtml(item.author)}</span>
        <a role="cell" href="${escapeHtml(item.articleHref)}">${escapeHtml(item.articleTitle)}</a>
        <span role="cell">${escapeHtml(item.status)}</span>
        <span role="cell">${escapeHtml(item.body)}</span>
        <span role="cell"><button type="button" data-action="select" data-item-id="${escapeHtml(item.id)}">Review</button></span>
      </div>`).join("\n      ")}
    </div>
    ${renderSelectedItem(selected)}
  </section>`;
}

function renderSelectedItem(item) {
  return `<article data-section="selected-item" data-selected-item-id="${escapeHtml(item.id)}">
    <h3>Selected item</h3>
    <p><strong>${escapeHtml(item.author)}</strong> on <a href="${escapeHtml(item.articleHref)}">${escapeHtml(item.articleTitle)}</a></p>
    <p>${escapeHtml(item.body)}</p>
    <p>Status: ${escapeHtml(item.status)}. Type: ${escapeHtml(item.type)}.</p>
  </article>`;
}
function renderModerationActions() {
  return `<section data-section="moderation-actions">
    <h2>Moderation actions</h2>
    <button type="button" data-action="approve" aria-label="Approve selected moderation item">Approve</button>
    <button type="button" data-action="reject" aria-label="Reject selected moderation item">Reject</button>
    <button type="button" data-action="delete" data-confirmation-required="true" aria-label="Delete selected moderation item with confirmation">Delete</button>
    <p>Approve, reject, delete, search, and filter controls are keyboard reachable and confirmation-aware for delete.</p>
  </section>`;
}

function renderModerationStates() {
  return `<section data-section="moderation-states" data-state-note="moderation-pending" data-state-note="approved-only-public" data-state-note="moderation-undo" data-state-note="moderation-error" data-state-note="permission-denied">
    <h2>Moderation states</h2>
    <article data-state="pending">Pending items require editor review before they can appear publicly.</article>
    <article data-state="approved-only-public">Approved-only public rendering keeps pending and rejected comments/reviews off article pages.</article>
    <article data-state="undo">Undo is available after optimistic approve, reject, or delete actions.</article>
    <article data-state="error">Server failure feedback preserves the selected item and offers retry.</article>
    <article data-state="permission-denied">Permission denied. <a href="/admin/login">Sign in as editor</a>.</article>
  </section>`;
}

function renderCommentsReviewsModerationPage(fixtures) {
  const items = getModerationItems(fixtures);
  const stats = getModerationStats(fixtures);

  return `<section data-page="comments-reviews-moderation" data-route="/admin/moderation" data-area="admin" data-generated="comments-reviews-moderation-renderer" data-wireframe-source="comments-reviews-moderation.html" data-auth-required="editor" data-responsive="desktop-split-queue mobile-stacked-detail">
  ${renderAdminNav(stats.pendingItems)}

  <header data-section="moderation-intro">
    <p class="eyebrow">Comments / Reviews Moderation</p>
    <h1>Queue-driven public conversation review.</h1>
    <p>Role-protected access for editors to search, filter, approve, reject, delete, and undo moderation decisions.</p>
  </header>

  ${renderStats(stats)}

  ${renderQueueControls(fixtures)}

  ${renderModerationWorkspace(items)}

  ${renderModerationActions()}

  ${renderModerationStates()}
</section>`;
}

module.exports = {
  getModerationItems,
  getModerationStats,
  renderCommentsReviewsModerationPage
};
