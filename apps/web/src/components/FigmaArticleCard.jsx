function formatDate(value) {
  if (!value) {
    return "Launch preview";
  }

  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

export function FigmaArticleCard({ article, featured = false, compact = false, showCredit = false }) {
  if (!article) {
    return null;
  }

  const image = article.featuredImage;
  const category = article.category?.label || article.categoryId || "Babas & Brasse";
  const categorySlug = article.category?.slug || article.categoryId || "article";
  const author = article.author?.name || "Babas & Brasse";
  const authorHref = article.author?.href;
  const classes = ["article-card", featured ? "article-card--featured" : "", compact ? "article-card--compact" : ""].filter(Boolean).join(" ");

  return (
    <article className={classes} data-article={article.slug} data-status={article.status} data-category={categorySlug}>
      {image ? (
        <a className="article-card__media" href={article.href} aria-label={`Read ${article.title}`}>
          <img src={image.url} alt={image.altText || article.title} />
        </a>
      ) : null}
      <div className="article-card__body">
        <p className="eyebrow">{category}</p>
        {featured ? <h2><a href={article.href}>{article.title}</a></h2> : <h3><a href={article.href}>{article.title}</a></h3>}
        {article.dek ? <p>{article.dek}</p> : null}
        <p className="article-card__meta">
          {authorHref ? <a href={authorHref}>{author}</a> : <span>{author}</span>}
          <span aria-hidden="true">/</span>
          <span>{formatDate(article.publishedAt)}</span>
        </p>
        {showCredit && image?.credit ? <p className="media-credit">Image credit: {image.credit}</p> : null}
      </div>
    </article>
  );
}
