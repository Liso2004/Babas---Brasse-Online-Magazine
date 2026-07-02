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

function isSeoReady(article) {
  return Boolean(
    article.seo &&
    article.seo.title &&
    article.seo.description &&
    article.featuredImage &&
    article.featuredImage.altText
  );
}

function getArticleRows(fixtures) {
  return fixtures.articles.map((article) => {
    const category = findById(fixtures.categories, article.categoryId);
    const author = findById(fixtures.profiles, article.authorProfileId);

    return {
      id: article.id,
      title: article.title,
      slug: article.slug,
      status: article.status,
      category: category ? category.label : "Uncategorised",
      author: author ? author.name : "Unknown author",
      date: article.publishedAt || "Draft",
      seoReady: isSeoReady(article),
      editHref: `/admin/articles/${article.slug}/edit`,
      previewHref: `/visceral-mag/${article.slug}`,
      publishAction: article.status === "published" ? "unpublish" : "publish"
    };
  });
}

function getArticleManagementStats(fixtures) {
  const rows = getArticleRows(fixtures);

  return {
    totalArticles: rows.length,
    publishedArticles: rows.filter((row) => row.status === "published").length,
    draftArticles: rows.filter((row) => row.status === "draft").length,
    seoReadyArticles: rows.filter((row) => row.seoReady).length
  };
}

function renderAdminNav() {
  const links = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/articles", label: "Articles", current: true },
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

function renderToolbar(fixtures, stats) {
  return `<section data-section="article-toolbar">
    <h2>Article controls</h2>
    <label>Search articles <input name="article-search" type="search" placeholder="Search by title, slug, author"></label>
    <label data-filter="status">Status
      <select name="status">
        <option value="all">All statuses</option>
        <option value="draft">Draft</option>
        <option value="published">Published</option>
      </select>
    </label>
    <label data-filter="category">Category
      <select name="category">
        <option value="all">All categories</option>
        ${fixtures.categories.map((category) => `<option value="${escapeHtml(category.slug)}">${escapeHtml(category.label)}</option>`).join("\n        ")}
      </select>
    </label>
    <label data-filter="seo-readiness">SEO readiness
      <select name="seo-readiness">
        <option value="all">All SEO states</option>
        <option value="ready">Ready</option>
        <option value="needs-work">Needs work</option>
      </select>
    </label>
    <a class="button" href="/admin/articles/new">Create article</a>
    <div class="article-metrics" aria-label="Article publishing metrics">
      ${renderMetric("Total", "totalArticles", stats.totalArticles)}
      ${renderMetric("Published", "publishedArticles", stats.publishedArticles)}
      ${renderMetric("Drafts", "draftArticles", stats.draftArticles)}
      ${renderMetric("SEO ready", "seoReadyArticles", stats.seoReadyArticles)}
    </div>
  </section>`;
}

function renderArticleTable(rows) {
  return `<section data-section="article-table">
    <h2>Editorial table</h2>
    <div class="article-table" role="table" aria-label="Article management table">
      <div role="row" class="table-header">
        <span role="columnheader" data-column="title">Title</span>
        <span role="columnheader" data-column="status">Status</span>
        <span role="columnheader" data-column="category">Category</span>
        <span role="columnheader" data-column="author">Author</span>
        <span role="columnheader" data-column="date">Date</span>
        <span role="columnheader" data-column="seo-readiness">SEO readiness</span>
        <span role="columnheader" data-column="row-actions">Actions</span>
      </div>
      ${rows.map((row) => `<div role="row" class="article-row" data-article-id="${escapeHtml(row.id)}" data-status="${escapeHtml(row.status)}" data-seo-ready="${escapeHtml(row.seoReady)}">
        <span role="cell"><strong>${escapeHtml(row.title)}</strong><small>${escapeHtml(row.slug)}</small></span>
        <span role="cell">${escapeHtml(row.status)}</span>
        <span role="cell">${escapeHtml(row.category)}</span>
        <span role="cell">${escapeHtml(row.author)}</span>
        <span role="cell">${escapeHtml(row.date)}</span>
        <span role="cell">${row.seoReady ? "Ready" : "Needs work"}</span>
        <span role="cell" class="row-actions">
          <a href="${escapeHtml(row.editHref)}">Edit</a>
          <a href="${escapeHtml(row.previewHref)}">Preview</a>
          <button type="button" data-action="${escapeHtml(row.publishAction)}">${row.publishAction === "publish" ? "Publish" : "Unpublish"}</button>
        </span>
      </div>`).join("\n      ")}
    </div>
  </section>`;
}

function renderArticleEditor(fixtures) {
  return `<section data-section="article-editor">
    <h2>Create / edit article</h2>
    <form data-form="article-editor" action="/admin/articles/save" method="post">
      <label for="article-title">Title</label>
      <input id="article-title" name="title" required>

      <label for="article-slug">Slug</label>
      <input id="article-slug" name="slug" required>

      <label for="article-dek">Dek</label>
      <textarea id="article-dek" name="dek" required></textarea>

      <label for="article-category">Category</label>
      <select id="article-category" name="categoryId" required>
        ${fixtures.categories.map((category) => `<option value="${escapeHtml(category.id)}">${escapeHtml(category.label)}</option>`).join("\n        ")}
      </select>

      <label for="article-author">Author</label>
      <select id="article-author" name="authorProfileId" required>
        ${fixtures.profiles.map((profile) => `<option value="${escapeHtml(profile.id)}">${escapeHtml(profile.name)}</option>`).join("\n        ")}
      </select>

      <label for="article-featured-image">Featured image</label>
      <select id="article-featured-image" name="featuredImageId" required>
        ${fixtures.mediaItems.map((media) => `<option value="${escapeHtml(media.id)}">${escapeHtml(media.title)}</option>`).join("\n        ")}
      </select>

      <label for="article-alt-text">Image alt text</label>
      <input id="article-alt-text" name="altText" required>

      <label for="article-body">Body editor</label>
      <textarea id="article-body" name="body" required></textarea>

      <label for="article-seo-title">SEO title</label>
      <input id="article-seo-title" name="seoTitle" required>

      <label for="article-seo-description">SEO description</label>
      <textarea id="article-seo-description" name="seoDescription" required></textarea>

      <label for="article-og-title">OG title</label>
      <input id="article-og-title" name="ogTitle">

      <label for="article-og-description">OG description</label>
      <textarea id="article-og-description" name="ogDescription"></textarea>

      <div class="editor-actions">
        <button type="button" data-action="autosave">Autosave draft</button>
        <button type="submit" data-action="draft">Save draft</button>
        <button type="submit" data-action="publish">Publish</button>
      </div>
    </form>
  </section>`;
}

function renderArticleStates() {
  return `<section data-section="article-states" data-state-note="article-draft" data-state-note="article-publish" data-state-note="article-autosave" data-state-note="article-validation" data-state-note="article-failure">
    <h2>Publishing states</h2>
    <article data-state="draft">Draft saved and visible only in admin.</article>
    <article data-state="publish">Publish action requires title, slug, category, author, body, SEO, and image alt text.</article>
    <article data-state="autosave">Autosave keeps editor progress without changing public status.</article>
    <article data-state="validation">Validation summary links editors to missing required fields.</article>
    <article data-state="failure">Failure state keeps content in the editor and offers retry.</article>
  </section>`;
}

function renderArticleManagementPage(fixtures) {
  const rows = getArticleRows(fixtures);
  const stats = getArticleManagementStats(fixtures);

  return `<section data-page="article-management" data-route="/admin/articles" data-area="admin" data-generated="article-management-renderer" data-wireframe-source="article-management.html" data-auth-required="editor" data-responsive="desktop-tablet-table mobile-card-rows">
  ${renderAdminNav()}

  <header data-section="article-management-intro">
    <p class="eyebrow">Article Management</p>
    <h1>Editorial publishing workflow.</h1>
    <p>Role-protected access for editors to search, draft, validate, preview, publish, and unpublish articles.</p>
  </header>

  ${renderToolbar(fixtures, stats)}

  ${renderArticleTable(rows)}

  ${renderArticleEditor(fixtures)}

  ${renderArticleStates()}
</section>`;
}

module.exports = {
  getArticleRows,
  getArticleManagementStats,
  renderArticleManagementPage
};
