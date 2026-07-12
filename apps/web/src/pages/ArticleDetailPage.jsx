import { useState } from "react";
import { Link } from "react-router-dom";
import * as launchFixtures from "../data/launchFixtures.js";
import { submitPublicForm } from "../forms/publicFormClient.js";
import { buildArticleDetailRouteModel } from "./articleDetailRouteModel.js";

function formatArticleDate(value) {
  return new Intl.DateTimeFormat("en-ZA", { day: "numeric", month: "long", year: "numeric" }).format(new Date(value));
}

const commentMessages = {
  idle: "",
  validation: "Add your name and comment before submitting.",
  submitting: "Submitting your comment...",
  success: "Your comment was submitted for moderation.",
  error: "We couldn't submit your comment. Your text is still here, so you can try again."
};

export function ArticleDetailPage({ fixtures = launchFixtures, slug = "send-a-text-before-you-knock" }) {
  const model = buildArticleDetailRouteModel(fixtures, slug);
  const [commentStatus, setCommentStatus] = useState("idle");

  if (model.state === "not-found") {
    return (
      <section className="figma-public-page figma-article-detail" data-page="article-detail" data-generated={model.generatedFrom} data-state="not-found" data-slug={model.slug}>
        <h1>Article unavailable</h1>
        <p>This article is not published or does not exist.</p>
        <a href={model.backHref}>Back to Visceral Mag</a>
      </section>
    );
  }

  const { article } = model;

  async function handleCommentSubmit(event) {
    event.preventDefault();
    const commentForm = event.currentTarget;
    const payload = Object.fromEntries(new FormData(commentForm).entries());
    const name = payload.name?.trim();
    const body = payload.body?.trim();

    if (!name || !body) {
      setCommentStatus("validation");
      return;
    }

    setCommentStatus("submitting");
    try {
      await submitPublicForm("comment", {
        articleId: article.id,
        articleSlug: article.slug,
        name,
        body
      });
      commentForm.reset();
      setCommentStatus("success");
    } catch {
      setCommentStatus("error");
    }
  }

  return (
    <article className="figma-article-detail" data-page="article-detail" data-generated={model.generatedFrom} data-slug={article.slug} data-prototype-file={model.route.prototypeFile}>
      <header data-section="article-hero" className="figma-article-hero">
        <nav className="figma-breadcrumb" aria-label="Breadcrumb"><Link to="/visceral-mag">Visceral Mag</Link><span aria-hidden="true">/</span><span>{article.category.label}</span></nav>
        <p className="eyebrow">{article.category.label}</p>
        <h1>{article.title}</h1>
        <p>{article.dek}</p>
        <img src={article.featuredImage.url} alt={article.featuredImage.altText} />
      </header>

      <section data-section="article-meta" className="figma-article-meta">
        <a data-category={article.category.slug} href={article.category.href}>{article.category.label}</a>
        <time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt)}</time>
        <a href={article.author.href}>{article.author.name}</a>
      </section>

      <section data-section="article-body" className="figma-article-body">
        {article.bodyBlocks.map((block) => <p key={block}>{block}</p>)}
      </section>

      <section data-section="related-articles" className="figma-content-section">
        <div className="section-heading-row">
          <h2>Related Articles</h2>
          <a href="/visceral-mag">All articles</a>
        </div>
        <div className="figma-related-grid">
          {model.relatedArticles.map((related) => (
            <article key={related.id} className="related-card" data-related={related.slug}>
              <h3><a href={related.href}>{related.title}</a></h3>
              <p>{related.dek}</p>
            </article>
          ))}
        </div>
      </section>

      <section data-section="comments" className="figma-conversation-section">
        <div className="section-heading-row">
          <h2>Comments</h2>
          <span>{model.comments.length} approved</span>
        </div>
        {model.comments.map((comment) => (
          <article key={comment.id} className="comment" data-comment={comment.id}>
            <h3>{comment.name}</h3>
            <p>{comment.body}</p>
          </article>
        ))}
        <form className="public-comment-form" data-form-status={commentStatus} onSubmit={handleCommentSubmit} noValidate>
          <h3>Join the conversation</h3>
          <label htmlFor="comment-name">Name</label>
          <input id="comment-name" name="name" type="text" autoComplete="name" required />
          <label htmlFor="comment-body">Comment</label>
          <textarea id="comment-body" name="body" rows="5" required />
          <p>Comments appear only after editorial approval.</p>
          <button type="submit" disabled={commentStatus === "submitting"}>
            {commentStatus === "submitting" ? "Submitting..." : "Submit comment"}
          </button>
          <p className="public-form-status" data-form-status={commentStatus} aria-live="polite">
            {commentMessages[commentStatus]}
          </p>
        </form>
      </section>

      <section data-section="reviews" className="figma-conversation-section">
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
