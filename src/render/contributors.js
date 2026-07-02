function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const navSections = ["Theatre", "Books", "Essays", "Opinion", "Culture"];
const contributorFilters = [
  { slug: "theatre", label: "Theatre" },
  { slug: "books", label: "Books" },
  { slug: "essays", label: "Essays" }
];

function getContributorProfiles(fixtures) {
  return fixtures.profiles.filter((profile) => profile.type === "contributor");
}

function getCategory(fixtures, categoryId) {
  return fixtures.categories.find((category) => category.id === categoryId || category.slug === categoryId) || {
    label: categoryId,
    slug: categoryId
  };
}

function getPublishedWorksForContributor(fixtures, contributorSlug) {
  const contributor = fixtures.profiles.find((profile) => profile.slug === contributorSlug || profile.id === contributorSlug);
  if (!contributor) {
    return [];
  }

  return fixtures.articles.filter((article) => article.status === "published" && article.authorProfileId === contributor.id);
}

function renderLandingNav() {
  return `<nav data-section="landing-nav" data-nav-height="76" aria-label="Primary editorial navigation">
    <a class="brand-mark" href="/" aria-label="Babas and Brasse home">B&amp;B</a>
    <div class="editorial-links">
      ${navSections.map((section) => `<a data-nav-link="${section.toLowerCase()}" href="/search?category=${section.toLowerCase()}">${section}</a>`).join("\n      ")}
    </div>
    <label class="search-entry">Search <input name="q" type="search" placeholder="Search articles"></label>
    <a class="subscribe-cta" href="/about#newsletter">Subscribe</a>
  </nav>`;
}

function renderContributorTools() {
  return `<section data-section="contributors-tools">
    <label for="contributor-search">Search contributors</label>
    <input id="contributor-search" name="q" type="search" placeholder="Search contributors">
    <div class="chip-row" aria-label="Contributor category filters">
      ${contributorFilters.map((filter) => `<button type="button" data-filter-category="${escapeHtml(filter.slug)}" aria-pressed="false">${escapeHtml(filter.label)}</button>`).join("\n      ")}
    </div>
  </section>`;
}

function renderContributorCard(fixtures, profile) {
  const works = getPublishedWorksForContributor(fixtures, profile.slug);

  return `<article class="profile-card" data-profile="${escapeHtml(profile.slug)}" data-profile-type="${escapeHtml(profile.type)}">
      <img src="/media/profile-placeholder.jpg" alt="Portrait placeholder for ${escapeHtml(profile.name)}">
      <div class="profile-copy">
        <p class="eyebrow">${escapeHtml(profile.role)}</p>
        <h3>${escapeHtml(profile.name)}</h3>
        <p>${escapeHtml(profile.shortBio)}</p>
        <p>${works.length} published work${works.length === 1 ? "" : "s"}</p>
        <nav aria-label="Published works by ${escapeHtml(profile.name)}">
          ${works.length ? works.map((article) => `<a href="/visceral-mag/${escapeHtml(article.slug)}">${escapeHtml(article.title)}</a>`).join("\n          ") : `<span data-state="no-published-works">No published works yet</span>`}
        </nav>
      </div>
    </article>`;
}

function renderContributorsGrid(fixtures, contributors) {
  if (contributors.length === 0) {
    return `<section data-section="contributors-grid" data-state="no-results">
    <h2>No contributors match this view</h2>
    <p>Clear the search or reset filters to browse all public contributor profiles.</p>
    <a data-action="reset-filter" href="/contributors">Reset filters</a>
  </section>`;
  }

  return `<section data-section="contributors-grid" data-state="ready">
    <h2>Contributor Profiles</h2>
    ${contributors.map((profile) => renderContributorCard(fixtures, profile)).join("\n    ")}
  </section>`;
}

function renderPublishedWorks(fixtures, contributors) {
  const contributorIds = new Set(contributors.map((profile) => profile.id));
  const works = fixtures.articles.filter((article) => article.status === "published" && contributorIds.has(article.authorProfileId));

  return `<section data-section="published-works">
    <h2>Published Works</h2>
    ${works.map((article) => {
      const author = contributors.find((profile) => profile.id === article.authorProfileId);
      const category = getCategory(fixtures, article.categoryId);
      return `<article class="published-work-row" data-article="${escapeHtml(article.slug)}" data-status="${escapeHtml(article.status)}" data-category="${escapeHtml(category.slug)}">
      <a href="/visceral-mag/${escapeHtml(article.slug)}">${escapeHtml(article.title)}</a>
      <span>${escapeHtml(category.label)}</span>
      <span>${escapeHtml(author ? author.name : "Contributor")}</span>
      <span>${escapeHtml(article.publishedAt || "Unscheduled")}</span>
    </article>`;
    }).join("\n    ")}
  </section>`;
}

function renderContributorStates() {
  return `<section data-section="contributors-states" data-state-note="contributors-loading" data-state-note="contributors-error">
    <h2>Contributor states</h2>
    <article data-state="loading">Loading contributors</article>
    <article data-state="no-results">No-results keeps entered query visible</article>
    <article data-state="reset-filter">Reset-filter action clears category filters</article>
    <article data-state="error">Fetch error includes retry</article>
  </section>`;
}

function renderContributorsPage(fixtures) {
  const contributors = getContributorProfiles(fixtures);

  return `<section data-page="contributors" data-route="/contributors" data-generated="contributors-renderer" data-wireframe-source="contributors.html" data-responsive="toolbar-stack mobile-one-column">
  ${renderLandingNav()}

  <header data-section="contributors-intro">
    <p class="eyebrow">Contributors</p>
    <h1>Writers, reviewers, essayists, and cultural voices.</h1>
    <p>Contributor discovery connects public profiles to published works while keeping drafts out of reader-facing pages.</p>
  </header>

  ${renderContributorTools()}

  ${renderContributorsGrid(fixtures, contributors)}

  ${renderPublishedWorks(fixtures, contributors)}

  ${renderContributorStates()}
</section>`;
}

module.exports = {
  getContributorProfiles,
  getPublishedWorksForContributor,
  renderContributorsPage
};
