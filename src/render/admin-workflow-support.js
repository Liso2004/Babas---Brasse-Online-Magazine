function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getAdminWorkflowSupportRoutes() {
  return [
    {
      id: "media-upload-modal",
      path: "/admin/media/upload",
      file: "src/pages/admin/media-upload-modal.html",
      wireframe: "media-upload-modal.html"
    },
    {
      id: "article-editor-workflow",
      path: "/admin/articles/editor-workflow",
      file: "src/pages/admin/article-editor-workflow.html",
      wireframe: "article-editor-workflow.html"
    }
  ];
}

function getMediaUploadMetadataFields() {
  return [
    { id: "upload-file", label: "File", type: "file", required: true },
    { id: "upload-title", label: "Title", type: "text", required: true },
    { id: "upload-alt-text", label: "Alt text", type: "text", required: true },
    { id: "upload-caption", label: "Caption", type: "textarea", required: true },
    { id: "upload-credit", label: "Credit", type: "text", required: true },
    { id: "upload-category", label: "Category", type: "select", required: true },
    { id: "upload-usage", label: "Usage", type: "select", required: true },
    { id: "upload-publish-readiness", label: "Publish readiness", type: "select", required: true },
    { id: "upload-article-link", label: "Article link", type: "select", required: false },
    { id: "upload-rights-note", label: "Rights note", type: "textarea", required: true }
  ];
}

function getEditorWorkflowSteps() {
  return [
    { id: "draft", label: "Draft", description: "Title, slug, dek, and body are started." },
    { id: "media", label: "Media", description: "Featured media, alt text, credit, and caption are attached." },
    { id: "seo", label: "SEO", description: "Search and sharing metadata are reviewed." },
    { id: "review", label: "Review", description: "Editor checks content, preview, and readiness blockers." },
    { id: "publish", label: "Publish", description: "Schedule, publish, or roll back safely." }
  ];
}

function getEditorReadinessChecklist() {
  return [
    { id: "title-slug-body", label: "Title, slug, dek, and body complete" },
    { id: "category-author", label: "Category and author selected" },
    { id: "media-alt-credit", label: "Featured media has alt text, caption, and credit" },
    { id: "seo-preview", label: "SEO preview and social image reviewed" },
    { id: "publish-safety", label: "Preview, schedule, publish, and rollback path confirmed" }
  ];
}

function renderAdminNav(currentLabel) {
  const links = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/articles", label: "Articles", current: currentLabel === "Articles" },
    { href: "/admin/profiles-media", label: "Profiles / Media", current: currentLabel === "Profiles / Media" },
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

function renderCategoryOptions(fixtures) {
  return fixtures.categories.map((category) => `<option value="${escapeHtml(category.id)}">${escapeHtml(category.label)}</option>`).join("\n        ");
}

function renderArticleOptions(fixtures) {
  return fixtures.articles.map((article) => `<option value="${escapeHtml(article.id)}">${escapeHtml(article.title)}</option>`).join("\n        ");
}

function renderProfileOptions(fixtures) {
  return fixtures.profiles.map((profile) => `<option value="${escapeHtml(profile.id)}">${escapeHtml(profile.name)}</option>`).join("\n        ");
}

function renderMediaOptions(fixtures) {
  return fixtures.mediaItems.map((media) => `<option value="${escapeHtml(media.id)}">${escapeHtml(media.title)}</option>`).join("\n        ");
}

function renderMediaField(field, fixtures) {
  const required = field.required ? " required" : "";

  if (field.id === "upload-file") {
    return `<label for="upload-file">File</label>
      <input id="upload-file" name="file" type="file" accept="image/*"${required}>`;
  }

  if (field.id === "upload-caption" || field.id === "upload-rights-note") {
    return `<label for="${escapeHtml(field.id)}">${escapeHtml(field.label)}</label>
      <textarea id="${escapeHtml(field.id)}" name="${escapeHtml(field.id.replace("upload-", ""))}"${required}></textarea>`;
  }

  if (field.id === "upload-category") {
    return `<label for="upload-category">Category</label>
      <select id="upload-category" name="categoryId"${required}>
        ${renderCategoryOptions(fixtures)}
      </select>`;
  }

  if (field.id === "upload-usage") {
    return `<label for="upload-usage">Usage</label>
      <select id="upload-usage" name="usage"${required}>
        <option value="hero">Hero image</option>
        <option value="article-inline">Article inline</option>
        <option value="gallery">Featured / Media gallery</option>
        <option value="profile">Profile portrait</option>
      </select>`;
  }

  if (field.id === "upload-publish-readiness") {
    return `<label for="upload-publish-readiness">Publish readiness</label>
      <select id="upload-publish-readiness" name="publishReadiness"${required}>
        <option value="draft-metadata">Draft metadata</option>
        <option value="ready">Ready for public use</option>
        <option value="needs-review">Needs rights review</option>
      </select>`;
  }

  if (field.id === "upload-article-link") {
    return `<label for="upload-article-link">Article link</label>
      <select id="upload-article-link" name="articleId">
        <option value="">No article yet</option>
        ${renderArticleOptions(fixtures)}
      </select>`;
  }

  return `<label for="${escapeHtml(field.id)}">${escapeHtml(field.label)}</label>
      <input id="${escapeHtml(field.id)}" name="${escapeHtml(field.id.replace("upload-", ""))}"${required}>`;
}

function renderMediaUploadModalPage(fixtures) {
  const fields = getMediaUploadMetadataFields();

  return `<section data-page="media-upload-modal" data-route="/admin/media/upload" data-area="admin" data-generated="admin-workflow-support-renderer" data-wireframe-source="media-upload-modal.html" data-auth-required="editor" data-responsive="modal-desktop mobile-fullscreen">
  ${renderAdminNav("Profiles / Media")}

  <section data-section="media-upload-modal" role="dialog" aria-modal="true" aria-labelledby="media-upload-title" data-modal-focus-trap="true" data-keyboard-close="Escape" data-focus-return="media-upload-launcher">
    <header data-section="media-upload-intro">
      <p class="eyebrow">Media Upload Modal</p>
      <h1 id="media-upload-title">Upload media with publish-ready metadata.</h1>
      <p>Admin subflow launched from Profile / Media Management or the article editor.</p>
    </header>

    <form data-form="media-upload-modal" action="/admin/media/upload" method="post" enctype="multipart/form-data">
      <section data-section="media-dropzone" data-dropzone="media-upload" tabindex="0" role="button" aria-describedby="upload-file-help">
        <h2>Drop zone</h2>
        <p id="upload-file-help">Drop an image, photo, or artwork file here, or use the keyboard file input below.</p>
      </section>

      <section data-section="media-preview" aria-live="polite">
        <h2>File preview</h2>
        <figure data-preview="selected-media">
          <img src="/media/opening-banner-placeholder.jpg" alt="Preview placeholder for selected upload">
          <figcaption>Preview updates after file selection.</figcaption>
        </figure>
      </section>

      <section data-section="media-upload-fields">
        <h2>Required metadata</h2>
        ${fields.map((field) => renderMediaField(field, fixtures)).join("\n        ")}
      </section>

      <section data-section="media-upload-states">
        <h2>Upload states</h2>
        <article data-state-note="media-uploading">Uploading keeps the dialog open and announces progress.</article>
        <article data-state-note="media-missing-alt-text">Missing alt text blocks insert until the accessibility field is complete.</article>
        <article data-state-note="media-invalid-file">Invalid file explains accepted image type and size requirements.</article>
        <article data-state-note="media-upload-failure">Upload failure preserves entered metadata and offers retry.</article>
        <article data-state-note="media-upload-success">Success inserts the media or saves draft metadata.</article>
      </section>

      <footer data-section="media-upload-actions">
        <button type="button" data-action="save-draft-metadata">Save draft metadata</button>
        <button type="submit" data-action="insert-media">Insert media</button>
        <button type="button" data-action="cancel-upload">Cancel</button>
      </footer>
    </form>
  </section>
</section>`;
}

function renderEditorSteps() {
  const steps = getEditorWorkflowSteps();

  return `<section data-section="editor-steps" aria-label="Article editor workflow steps">
    <h2>Workflow steps</h2>
    ${steps.map((step, index) => `<article data-step="${escapeHtml(step.id)}" aria-current="${index === 0 ? "step" : "false"}">
      <strong>${index + 1}. ${escapeHtml(step.label)}</strong>
      <p>${escapeHtml(step.description)}</p>
    </article>`).join("\n    ")}
  </section>`;
}

function renderReadinessChecklist() {
  return `<section data-section="editor-readiness-checklist">
    <h2>Readiness checklist</h2>
    ${getEditorReadinessChecklist().map((item) => `<label data-checklist-item="${escapeHtml(item.id)}"><input type="checkbox" name="${escapeHtml(item.id)}"> ${escapeHtml(item.label)}</label>`).join("\n    ")}
  </section>`;
}

function renderArticleEditorWorkflowPage(fixtures) {
  return `<section data-page="article-editor-workflow" data-route="/admin/articles/editor-workflow" data-area="admin" data-generated="admin-workflow-support-renderer" data-wireframe-source="article-editor-workflow.html" data-auth-required="editor" data-responsive="desktop-editor mobile-stacked-workflow">
  ${renderAdminNav("Articles")}

  <header data-section="editor-workflow-intro">
    <p class="eyebrow">Article Editor Workflow</p>
    <h1>Draft, enrich, review, and publish with visible blockers.</h1>
    <p>Expanded admin subflow for article editing, media attachment, SEO review, preview, scheduling, publishing, and rollback.</p>
  </header>

  ${renderEditorSteps()}

  <form data-form="article-editor-workflow" action="/admin/articles/save" method="post">
    <section data-section="editor-workspace">
      <h2>Body editor</h2>
      <label for="workflow-title">Title</label>
      <input id="workflow-title" name="title" required>

      <label for="workflow-slug">Slug</label>
      <input id="workflow-slug" name="slug" required>

      <label for="workflow-body">Body editor</label>
      <textarea id="workflow-body" name="body" required></textarea>

      <label for="workflow-category">Category</label>
      <select id="workflow-category" name="categoryId" required>
        ${renderCategoryOptions(fixtures)}
      </select>

      <label for="workflow-author">Author</label>
      <select id="workflow-author" name="authorProfileId" required>
        ${renderProfileOptions(fixtures)}
      </select>

      <label for="workflow-featured-media">Featured media</label>
      <select id="workflow-featured-media" name="featuredMediaId" required>
        ${renderMediaOptions(fixtures)}
      </select>
    </section>

    ${renderReadinessChecklist()}

    <section data-section="editor-seo-review">
      <h2>SEO review</h2>
      <label for="workflow-seo-title">SEO title</label>
      <input id="workflow-seo-title" name="seoTitle" required>

      <label for="workflow-seo-description">SEO description</label>
      <textarea id="workflow-seo-description" name="seoDescription" required></textarea>

      <label for="workflow-canonical-url">Canonical URL</label>
      <input id="workflow-canonical-url" name="canonicalUrl" type="url">

      <label for="workflow-og-image">OG image</label>
      <select id="workflow-og-image" name="ogImageId" required>
        ${renderMediaOptions(fixtures)}
      </select>
    </section>

    <section data-section="editor-publish-states">
      <h2>Publish states</h2>
      <article data-state-note="editor-autosave">Autosave keeps progress while the editor continues working.</article>
      <article data-state-note="editor-validation">Validation summarizes missing content, media, SEO, and readiness fields.</article>
      <article data-state-note="editor-preview">Preview opens the public article view before publication.</article>
      <article data-state-note="editor-schedule-publish">Schedule/publish requires a clean checklist.</article>
      <article data-state-note="editor-rollback">Rollback path restores the last published version after a mistake.</article>
    </section>

    <footer data-section="editor-workflow-actions">
      <button type="button" data-action="autosave">Autosave</button>
      <button type="button" data-action="preview">Preview</button>
      <button type="submit" data-action="schedule-publish">Schedule / publish</button>
      <button type="button" data-action="rollback">Rollback</button>
    </footer>
  </form>
</section>`;
}

module.exports = {
  getAdminWorkflowSupportRoutes,
  getMediaUploadMetadataFields,
  getEditorWorkflowSteps,
  getEditorReadinessChecklist,
  renderMediaUploadModalPage,
  renderArticleEditorWorkflowPage
};
