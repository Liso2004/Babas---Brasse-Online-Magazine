import fixturesModule from "../../../../src/content/fixtures.js";
import { buildArticleDetailRouteModel } from "./articleDetailRouteModel.js";

const launchFixtures = fixturesModule.default || fixturesModule;

export function ArticleDetailPage({ fixtures = launchFixtures, slug = "send-a-text-before-you-knock" }) {
  const model = buildArticleDetailRouteModel(fixtures, slug);

  if (model.state === "not-found") {
    return (
      <section data-page="article-detail" data-generated={model.generatedFrom} data-state="not-found" data-slug={model.slug}>
        <h1>Article unavailable</h1>
        <p>This article is not published or does not exist.</p>
        <a href={model.backHref}>Back to Visceral Mag</a>
      </section>
    );
  }

  const { article } = model;

  return (
    <article data-page="article-detail" data-generated={model.generatedFrom} data-slug={article.slug} data-prototype-file={model.route.prototypeFile}>
      <header data-section="article-hero">
        <p data-route={article.href}>{article.href}</p>
        <p className="eyebrow">{article.category.label}</p>
        <h1>{article.title}</h1>
        <p>{article.dek}</p>
        <img src={article.featuredImage.url} alt={article.featuredImage.altText} />
      </header>

      <section data-section="article-meta">
        <span data-category={article.category.slug}>{article.category.label}</span>
        <span>{article.publishedAt}</span>
        <a href={article.author.href}>{article.author.name}</a>
      </section>

      <section data-section="article-body">
        {article.bodyBlocks.map((block) => <p key={block}>{block}</p>)}
      </section>

      <section data-section="related-articles">
        <h2>Related Articles</h2>
        {model.relatedArticles.map((related) => (
          <article key={related.id} className="related-card" data-related={related.slug}>
            <h3><a href={related.href}>{related.title}</a></h3>
            <p>{related.dek}</p>
          </article>
        ))}
      </section>

      <section data-section="comments">
        <h2>Comments</h2>
        {model.comments.map((comment) => (
          <article key={comment.id} className="comment" data-comment={comment.id}>
            <h3>{comment.name}</h3>
            <p>{comment.body}</p>
          </article>
        ))}
      </section>

      <section data-section="reviews">
        <h2>Reviews</h2>
        {model.reviews.map((review) => (
          <article key={review.id} className="review" data-review={review.id} data-rating={review.rating}>
            <h3>{review.name}</h3>
            <p>{review.body}</p>
          </article>
        ))}
      </section>

      <section data-section="seo-metadata" hidden>
        <p data-seo="title">{model.seo.title}</p>
        <p data-seo="description">{model.seo.description}</p>
        <p data-seo="og-title">{model.seo.ogTitle}</p>
        <p data-seo="og-description">{model.seo.ogDescription}</p>
      </section>
    </article>
  );
}
