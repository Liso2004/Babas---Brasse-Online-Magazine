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

function renderNotFound(slug) {
  return `<section data-page="article-detail" data-generated="article-detail-renderer" data-state="not-found" data-slug="${escapeHtml(slug)}">
  <h1>Article unavailable</h1>
  <p>This article is not published or does not exist.</p>
  <a href="/visceral-mag">Back to Visceral Mag</a>
</section>`;
}

function renderRelatedArticles(fixtures, currentArticle) {
  return fixtures.articles
    .filter((article) => article.status === "published" && article.slug !== currentArticle.slug)
    .slice(0, 3)
    .map((article) => `<article class="related-card" data-related="${escapeHtml(article.slug)}"><h3><a href="/visceral-mag/${escapeHtml(article.slug)}">${escapeHtml(article.title)}</a></h3><p>${escapeHtml(article.dek)}</p></article>`)
    .join("\n    ");
}

function renderArticleDetailPage(fixtures, slug) {
  const article = fixtures.articles.find((item) => item.slug === slug);

  if (!article || article.status !== "published") {
    return renderNotFound(slug);
  }

  const category = getCategory(fixtures.categories, article.categoryId);
  const author = getAuthor(fixtures.profiles, article.authorProfileId);
  const approvedComments = fixtures.comments.filter((comment) => comment.articleId === article.id && comment.status === "approved");
  const approvedReviews = fixtures.reviews.filter((review) => review.articleId === article.id && review.status === "approved");
  const relatedArticles = renderRelatedArticles(fixtures, article);

  return `<article data-page="article-detail" data-generated="article-detail-renderer" data-slug="${escapeHtml(article.slug)}">
  <header data-section="article-hero">
    <p data-route="/visceral-mag/${escapeHtml(article.slug)}">/visceral-mag/${escapeHtml(article.slug)}</p>
    <p class="eyebrow">${escapeHtml(category.label)}</p>
    <h1>${escapeHtml(article.title)}</h1>
    <p>${escapeHtml(article.dek)}</p>
    <img src="${escapeHtml(article.featuredImage.url)}" alt="${escapeHtml(article.featuredImage.altText)}">
  </header>

  <section data-section="article-meta">
    <span data-category="${escapeHtml(category.slug)}">${escapeHtml(category.label)}</span>
    <span>${escapeHtml(article.publishedAt)}</span>
    <a href="/contributors/${escapeHtml(author.slug)}">${escapeHtml(author.name)}</a>
  </section>

  <section data-section="article-body">
    ${article.bodyBlocks.map((block) => `<p>${escapeHtml(block)}</p>`).join("\n    ")}
  </section>

  <section data-section="related-articles">
    <h2>Related Articles</h2>
    ${relatedArticles}
  </section>

  <section data-section="comments">
    <h2>Comments</h2>
    ${approvedComments.map((comment) => `<article class="comment" data-comment="${escapeHtml(comment.id)}"><h3>${escapeHtml(comment.name)}</h3><p>${escapeHtml(comment.body)}</p></article>`).join("\n    ")}
  </section>

  <section data-section="reviews">
    <h2>Reviews</h2>
    ${approvedReviews.map((review) => `<article class="review" data-review="${escapeHtml(review.id)}" data-rating="${escapeHtml(review.rating)}"><h3>${escapeHtml(review.name)}</h3><p>${escapeHtml(review.body)}</p></article>`).join("\n    ")}
  </section>

  <section data-section="seo-metadata" hidden>
    <p data-seo="title">${escapeHtml(article.seo.title)}</p>
    <p data-seo="description">${escapeHtml(article.seo.description)}</p>
    <p data-seo="og-title">${escapeHtml(article.seo.ogTitle)}</p>
    <p data-seo="og-description">${escapeHtml(article.seo.ogDescription)}</p>
  </section>
</article>`;
}

module.exports = {
  renderArticleDetailPage
};


