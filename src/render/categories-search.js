function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalize(value) {
  return String(value || "").trim().toLowerCase();
}

function getCategory(categories, categoryId) {
  return categories.find((category) => category.id === categoryId || category.slug === categoryId) || {
    id: categoryId,
    label: categoryId,
    slug: categoryId,
    description: ""
  };
}

function getAuthor(profiles, profileId) {
  return profiles.find((profile) => profile.id === profileId) || {
    name: "Babas & Brasse",
    slug: "babas-brasse"
  };
}

function getPublishedArticles(fixtures) {
  return fixtures.articles.filter((article) => article.status === "published");
}

function articleSearchText(article, fixtures) {
  const category = getCategory(fixtures.categories, article.categoryId);
  const author = getAuthor(fixtures.profiles, article.authorProfileId);
  const body = Array.isArray(article.bodyBlocks) ? article.bodyBlocks.join(" ") : "";

  return normalize([
    article.title,
    article.dek,
    body,
    category.label,
    category.slug,
    author.name
  ].join(" "));
}

function filterPublishedArticles(fixtures, options = {}) {
  const query = normalize(options.query);
  const categoryFilter = normalize(options.category);

  return getPublishedArticles(fixtures).filter((article) => {
    const category = getCategory(fixtures.categories, article.categoryId);
    const matchesCategory = !categoryFilter || normalize(category.slug) === categoryFilter || normalize(category.id) === categoryFilter;
    const matchesQuery = !query || articleSearchText(article, fixtures).includes(query);

    return matchesCategory && matchesQuery;
  });
}

function searchPublishedArticles(fixtures, query) {
  return filterPublishedArticles(fixtures, { query });
}

function renderCategoryFilters(fixtures, activeCategory) {
  return `<section data-section="category-filters">
    <h2>Browse by category</h2>
    <a class="category-chip" data-category="all" href="/search">All</a>
    ${fixtures.categories.map((category) => {
      const active = normalize(category.slug) === normalize(activeCategory) ? "true" : "false";
      return `<a class="category-chip" data-category="${escapeHtml(category.slug)}" data-active="${active}" href="/search?category=${escapeHtml(category.slug)}">${escapeHtml(category.label)}</a>`;
    }).join("\n    ")}
  </section>`;
}

function renderArticleResult(article, fixtures) {
  const category = getCategory(fixtures.categories, article.categoryId);
  const author = getAuthor(fixtures.profiles, article.authorProfileId);

  return `<article class="search-result-card" data-article="${escapeHtml(article.slug)}" data-status="${escapeHtml(article.status)}" data-category="${escapeHtml(category.slug)}">
      <p class="eyebrow">${escapeHtml(category.label)}</p>
      <h3><a href="/visceral-mag/${escapeHtml(article.slug)}">${escapeHtml(article.title)}</a></h3>
      <p>${escapeHtml(article.dek)}</p>
      <p class="article-meta">By <a href="/contributors/${escapeHtml(author.slug)}">${escapeHtml(author.name)}</a>${article.publishedAt ? ` | ${escapeHtml(article.publishedAt)}` : ""}</p>
    </article>`;
}

function renderResults(results, fixtures) {
  if (results.length === 0) {
    return `<section data-section="search-results" data-state="no-results">
    <h2>No articles found</h2>
    <p>Try another keyword or clear the selected category.</p>
    <a data-action="reset-search" href="/search">Reset search</a>
  </section>`;
  }

  return `<section data-section="search-results" data-state="results">
    <h2>Search results</h2>
    ${results.map((article) => renderArticleResult(article, fixtures)).join("\n    ")}
  </section>`;
}

function renderCategoriesSearchPage(fixtures, options = {}) {
  const query = options.query || "";
  const category = options.category || "";
  const results = filterPublishedArticles(fixtures, { query, category });
  const selectedCategory = category ? getCategory(fixtures.categories, category) : null;

  return `<section data-page="categories-search" data-route="/search" data-generated="categories-search-renderer" data-state-note="search-loading">
  <header data-section="search-intro">
    <p class="eyebrow">Categories / Search</p>
    <h1>Find essays, reviews, interviews, artwork, and culture notes.</h1>
    <p>Search the published Babas &amp; Brasse archive or browse by launch category.</p>
  </header>

  <form data-section="search-form" action="/search" method="get">
    <label for="article-search">Search articles</label>
    <input id="article-search" name="q" type="search" placeholder="Search articles" value="${escapeHtml(query)}">
    ${category ? `<input type="hidden" name="category" value="${escapeHtml(category)}">` : ""}
    <button type="submit">Search</button>
  </form>

  ${renderCategoryFilters(fixtures, category)}

  <section data-section="active-filters">
    <p data-active-query="${escapeHtml(query)}">${query ? `Query: ${escapeHtml(query)}` : "Showing all published articles"}</p>
    ${selectedCategory ? `<p data-active-category="${escapeHtml(selectedCategory.slug)}">Category: ${escapeHtml(selectedCategory.label)}</p>` : ""}
  </section>

  ${renderResults(results, fixtures)}
</section>`;
}

module.exports = {
  escapeHtml,
  getCategory,
  getAuthor,
  getPublishedArticles,
  filterPublishedArticles,
  searchPublishedArticles,
  renderCategoriesSearchPage
};
