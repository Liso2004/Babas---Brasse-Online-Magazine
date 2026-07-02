function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getCategory(categories, categoryId) {
  return categories.find((category) => category.id === categoryId) || {
    label: categoryId,
    slug: categoryId
  };
}

function getAuthor(profiles, profileId) {
  return profiles.find((profile) => profile.id === profileId) || {
    name: "Babas & Brasse",
    slug: "babas-brasse"
  };
}

function renderArticleCard(article, fixtures) {
  const category = getCategory(fixtures.categories, article.categoryId);
  const author = getAuthor(fixtures.profiles, article.authorProfileId);

  return `
    <article class="article-card" data-article="${escapeHtml(article.slug)}" data-status="${escapeHtml(article.status)}" data-category="${escapeHtml(category.slug)}">
      <img src="${escapeHtml(article.featuredImage.url)}" alt="${escapeHtml(article.featuredImage.altText)}">
      <p class="eyebrow">${escapeHtml(category.label)}</p>
      <h3><a href="/visceral-mag/${escapeHtml(article.slug)}">${escapeHtml(article.title)}</a></h3>
      <p>${escapeHtml(article.dek)}</p>
      <p class="article-meta">By <a href="/contributors/${escapeHtml(author.slug)}">${escapeHtml(author.name)}</a>${article.publishedAt ? ` | ${escapeHtml(article.publishedAt)}` : ""}</p>
    </article>`;
}

function renderVisceralMagPage(fixtures) {
  const publishedArticles = fixtures.articles.filter((article) => article.status === "published");

  return `<section data-page="visceral-mag" data-generated="visceral-mag-renderer">
  <header data-section="archive-intro">
    <p class="eyebrow">Visceral Mag / Articles</p>
    <h1>Latest cultural writing from Babas &amp; Brasse.</h1>
    <p>Browse essays, reviews, interviews, photography, artwork, and launch editorial features.</p>
  </header>

  <section data-section="search-entry">
    <label for="article-search">Search articles</label>
    <input id="article-search" name="q" type="search" placeholder="Search articles">
  </section>

  <section data-section="category-filters">
    <h2>Browse by category</h2>
    ${fixtures.categories.map((category) => `<a class="category-chip" data-category="${escapeHtml(category.slug)}" href="/search?category=${escapeHtml(category.slug)}">${escapeHtml(category.label)}</a>`).join("\n    ")}
  </section>

  <section data-section="article-listing">
    <h2>Published Articles</h2>
    ${publishedArticles.map((article) => renderArticleCard(article, fixtures)).join("\n")}
  </section>
</section>`;
}

module.exports = {
  renderVisceralMagPage
};
