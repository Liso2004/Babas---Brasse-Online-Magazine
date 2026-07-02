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

function isProfileComplete(profile) {
  return Boolean(profile.name && profile.role && profile.slug && profile.shortBio);
}

function isMediaPublishReady(media) {
  return Boolean(media.altText && media.caption && media.credit);
}

function getProfileRows(fixtures) {
  return fixtures.profiles.map((profile) => ({
    id: profile.id,
    type: profile.type,
    name: profile.name,
    role: profile.role,
    slug: profile.slug,
    status: "Active",
    completeness: isProfileComplete(profile) ? "Complete" : "Needs work",
    editHref: `/admin/profiles/${profile.slug}/edit`
  }));
}

function getMediaRows(fixtures) {
  return fixtures.mediaItems.map((media) => {
    const usedByArticles = fixtures.articles.filter((article) => article.featuredImage && article.featuredImage.id === media.id);
    const firstArticle = usedByArticles[0] || null;
    const category = firstArticle ? findById(fixtures.categories, firstArticle.categoryId) : null;

    return {
      id: media.id,
      title: media.title,
      type: media.type,
      url: media.url,
      altText: media.altText,
      caption: media.caption,
      credit: media.credit,
      category: category ? category.label : "Media",
      usageCount: usedByArticles.length,
      publishReady: isMediaPublishReady(media),
      editHref: `/admin/media/${media.id}/edit`
    };
  });
}

function getProfileMediaStats(fixtures) {
  const profileRows = getProfileRows(fixtures);
  const mediaRows = getMediaRows(fixtures);

  return {
    totalProfiles: profileRows.length,
    contributors: profileRows.filter((profile) => profile.type === "contributor").length,
    creativeTeam: profileRows.filter((profile) => profile.type === "creative_team").length,
    mediaItems: mediaRows.length,
    publishReadyMedia: mediaRows.filter((media) => media.publishReady).length,
    incompleteMedia: mediaRows.filter((media) => !media.publishReady).length
  };
}

function renderAdminNav() {
  const links = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/articles", label: "Articles" },
    { href: "/admin/profiles-media", label: "Profiles / Media", current: true },
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

function renderStats(stats) {
  return `<section data-section="profile-media-stats">
    <h2>Profile and media health</h2>
    ${renderMetric("Profiles", "totalProfiles", stats.totalProfiles)}
    ${renderMetric("Contributors", "contributors", stats.contributors)}
    ${renderMetric("Creative Team", "creativeTeam", stats.creativeTeam)}
    ${renderMetric("Media items", "mediaItems", stats.mediaItems)}
    ${renderMetric("Publish ready", "publishReadyMedia", stats.publishReadyMedia)}
    ${renderMetric("Incomplete media", "incompleteMedia", stats.incompleteMedia)}
  </section>`;
}
function renderProfileGroup(label, groupKey, rows) {
  return `<article data-group="${escapeHtml(groupKey)}" class="profile-group">
    <h3>${escapeHtml(label)}</h3>
    <div class="profile-table" role="table" aria-label="${escapeHtml(label)} profile management">
      <div role="row" class="table-header">
        <span role="columnheader" data-column="name">Name</span>
        <span role="columnheader" data-column="role">Role</span>
        <span role="columnheader" data-column="status">Status</span>
        <span role="columnheader" data-column="profile-completeness">Profile completeness</span>
        <span role="columnheader" data-column="row-actions">Actions</span>
      </div>
      ${rows.map((row) => `<div role="row" class="profile-row" data-profile-id="${escapeHtml(row.id)}" data-profile-type="${escapeHtml(row.type)}" data-status="${escapeHtml(row.status.toLowerCase())}" data-completeness="${escapeHtml(row.completeness)}">
        <span role="cell"><strong>${escapeHtml(row.name)}</strong><small>${escapeHtml(row.slug)}</small></span>
        <span role="cell">${escapeHtml(row.role)}</span>
        <span role="cell">${escapeHtml(row.status)}</span>
        <span role="cell">${escapeHtml(row.completeness)}</span>
        <a role="cell" href="${escapeHtml(row.editHref)}">Edit profile</a>
      </div>`).join("\n      ")}
    </div>
  </article>`;
}

function renderProfileManagement(rows) {
  const contributorRows = rows.filter((row) => row.type === "contributor");
  const creativeTeamRows = rows.filter((row) => row.type === "creative_team");

  return `<section data-section="profile-management">
    <h2>Profile management</h2>
    ${renderProfileGroup("Contributors", "contributors", contributorRows)}
    ${renderProfileGroup("Creative Team", "creative-team", creativeTeamRows)}
  </section>`;
}

function renderMediaLibrary(rows) {
  return `<section data-section="media-library">
    <h2>Media library</h2>
    <div class="media-table" role="table" aria-label="Media library metadata">
      <div role="row" class="table-header">
        <span role="columnheader" data-column="image">Image</span>
        <span role="columnheader" data-column="alt-text">Alt text</span>
        <span role="columnheader" data-column="caption">Caption</span>
        <span role="columnheader" data-column="credit">Credit</span>
        <span role="columnheader" data-column="category">Category</span>
        <span role="columnheader" data-column="usage">Usage</span>
        <span role="columnheader" data-column="publish-readiness">Publish readiness</span>
      </div>
      ${rows.map((row) => `<div role="row" class="media-row" data-media-id="${escapeHtml(row.id)}" data-publish-ready="${escapeHtml(row.publishReady)}">
        <span role="cell"><strong>${escapeHtml(row.title)}</strong><small>${escapeHtml(row.url)}</small></span>
        <span role="cell">${escapeHtml(row.altText)}</span>
        <span role="cell">${escapeHtml(row.caption)}</span>
        <span role="cell">${escapeHtml(row.credit)}</span>
        <span role="cell">${escapeHtml(row.category)}</span>
        <span role="cell">${escapeHtml(row.usageCount)} article${row.usageCount === 1 ? "" : "s"}</span>
        <span role="cell">${row.publishReady ? "Ready" : "Missing metadata"}</span>
      </div>`).join("\n      ")}
    </div>
  </section>`;
}
function renderUploadSelect(fixtures) {
  return `<section data-section="upload-select">
    <h2>Upload / select media</h2>
    <form data-form="media-upload" action="/admin/media/upload" method="post" enctype="multipart/form-data">
      <div data-dropzone="media-upload" tabindex="0" role="button" aria-describedby="media-file-help">Drop image, photo, or artwork here</div>
      <p id="media-file-help">Keyboard file input fallback is available below.</p>

      <label for="media-file">File</label>
      <input id="media-file" name="file" type="file" accept="image/*" required>

      <label for="media-alt-text">Alt text</label>
      <input id="media-alt-text" name="altText" required>

      <label for="media-caption">Caption</label>
      <textarea id="media-caption" name="caption" required></textarea>

      <label for="media-credit">Credit</label>
      <input id="media-credit" name="credit" required>

      <label for="media-category">Category</label>
      <select id="media-category" name="categoryId" required>
        ${fixtures.categories.map((category) => `<option value="${escapeHtml(category.id)}">${escapeHtml(category.label)}</option>`).join("\n        ")}
      </select>

      <button type="submit" data-action="upload-media">Upload media</button>
    </form>
  </section>`;
}

function renderProfileMediaStates() {
  return `<section data-section="profile-media-states" data-state-note="media-uploading" data-state-note="media-missing-metadata" data-state-note="media-file-error" data-state-note="media-empty-library" data-state-note="permission-denied">
    <h2>Profile / media states</h2>
    <article data-state="uploading">Uploading media and preserving metadata fields.</article>
    <article data-state="missing-metadata">Missing metadata blocks public media use until alt text, caption, and credit are complete.</article>
    <article data-state="file-error">File error explains accepted type and size requirements.</article>
    <article data-state="empty-library">Empty library prompts the editor to upload the first media asset.</article>
    <article data-state="permission-denied">Permission denied. <a href="/admin/login">Sign in as editor</a>.</article>
  </section>`;
}

function renderProfileMediaManagementPage(fixtures) {
  const profileRows = getProfileRows(fixtures);
  const mediaRows = getMediaRows(fixtures);
  const stats = getProfileMediaStats(fixtures);

  return `<section data-page="profile-media-management" data-route="/admin/profiles-media" data-area="admin" data-generated="profile-media-management-renderer" data-wireframe-source="profile-media-management.html" data-auth-required="editor" data-responsive="desktop-two-column mobile-stacked">
  ${renderAdminNav()}

  <header data-section="profile-media-intro">
    <p class="eyebrow">Profile / Media Management</p>
    <h1>People and media publishing readiness.</h1>
    <p>Role-protected access for editors to keep contributors, Creative Team profiles, and public media metadata complete.</p>
  </header>

  ${renderStats(stats)}

  ${renderProfileManagement(profileRows)}

  ${renderMediaLibrary(mediaRows)}

  ${renderUploadSelect(fixtures)}

  ${renderProfileMediaStates()}
</section>`;
}

module.exports = {
  getProfileRows,
  getMediaRows,
  getProfileMediaStats,
  renderProfileMediaManagementPage
};
