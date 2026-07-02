function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getFeaturedMediaItems(fixtures) {
  return Array.isArray(fixtures.mediaItems) ? fixtures.mediaItems : [];
}

function getPublishedMediaArticles(fixtures) {
  return fixtures.articles.filter((article) => article.status === "published" && article.featuredImage);
}

function renderMediaCard(item) {
  return `<article class="media-card" data-media="${escapeHtml(item.id)}" data-media-type="${escapeHtml(item.type)}" data-credit="${escapeHtml(item.credit)}">
      <img src="${escapeHtml(item.url)}" alt="${escapeHtml(item.altText)}">
      <p class="eyebrow">${escapeHtml(item.type)}</p>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.caption)}</p>
      <p class="media-credit">Credit: ${escapeHtml(item.credit)}</p>
    </article>`;
}

function renderGallery(items) {
  if (items.length === 0) {
    return `<section data-section="media-gallery" data-state="no-media">
    <h2>No featured media is published yet</h2>
    <p>Check back for photography, artwork, and visual editorial features.</p>
    <a href="/contact">Contact the editors</a>
  </section>`;
  }

  return `<section data-section="media-gallery" data-state="ready">
    <h2>Featured media gallery</h2>
    ${items.map(renderMediaCard).join("\n    ")}
  </section>`;
}

function renderArticleMediaLink(article) {
  const image = article.featuredImage;

  return `<article class="article-media-link" data-article="${escapeHtml(article.slug)}" data-status="${escapeHtml(article.status)}" data-media="${escapeHtml(image.id)}">
      <img src="${escapeHtml(image.url)}" alt="${escapeHtml(image.altText)}">
      <h3><a href="/visceral-mag/${escapeHtml(article.slug)}">${escapeHtml(article.title)}</a></h3>
      <p>${escapeHtml(article.dek)}</p>
      <p class="media-credit">Image credit: ${escapeHtml(image.credit)}</p>
    </article>`;
}

function renderArticleLinks(articles) {
  return `<section data-section="article-media-links">
    <h2>Media in published stories</h2>
    ${articles.map(renderArticleMediaLink).join("\n    ")}
  </section>`;
}

function renderFeaturedMediaPage(fixtures) {
  const mediaItems = getFeaturedMediaItems(fixtures);
  const publishedArticles = getPublishedMediaArticles(fixtures);

  return `<section data-page="featured-media" data-route="/featured" data-generated="featured-media-renderer">
  <header data-section="media-intro">
    <p class="eyebrow">Featured / Media</p>
    <h1>Photography, artwork, and visual notes from Babas &amp; Brasse.</h1>
    <p>Browse launch media assets with captions, credits, and accessible alt text.</p>
  </header>

  ${renderGallery(mediaItems)}

  ${renderArticleLinks(publishedArticles)}
</section>`;
}

module.exports = {
  escapeHtml,
  getFeaturedMediaItems,
  getPublishedMediaArticles,
  renderFeaturedMediaPage
};
