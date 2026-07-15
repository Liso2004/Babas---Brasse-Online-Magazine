import { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import * as launchFixtures from "../data/launchFixtures.js";
import { submitPublicForm } from "../forms/publicFormClient.js";
import { buildArticleDetailRouteModel } from "./articleDetailRouteModel.js";

function formatArticleDate(value) {
  return new Intl.DateTimeFormat("en-ZA", { day: "numeric", month: "long", year: "numeric" }).format(new Date(value));
}

function BookRating({ value }) {
  const rating = Math.max(0, Math.min(5, Number(value) || 0));

  return (
    <span className="book-rating" role="img" aria-label={`${rating} out of 5 books`}>
      {Array.from({ length: rating }, (_, index) => (
        <BookOpen key={index} size={18} aria-hidden="true" />
      ))}
    </span>
  );
}
  
const commentMessages = {
  idle: "",
  validation: "Add your name, email, and comment before submitting.",
  submitting: "Submitting your comment...",
  success: "Your comment was submitted for moderation.",
  error: "We couldn't submit your comment. Your text is still here, so you can try again."
};

const reviewMessages = {
  idle: "",
  validation: "Add your name, review, and a book rating from one to five.",
  submitting: "Submitting your review...",
  success: "Your review was submitted for moderation.",
  error: "We couldn't submit your review. Your text is still here, so you can try again."
};

export function ArticleDetailPage({ fixtures = launchFixtures, slug = "send-a-text-before-you-knock" }) {
  const model = buildArticleDetailRouteModel(fixtures, slug);
  const [commentStatus, setCommentStatus] = useState("idle");
  const [reviewStatus, setReviewStatus] = useState("idle");

  if (model.state === "not-found") {
    return (
      <section className="figma-public-page figma-article-detail" data-page="article-detail" data-generated={model.generatedFrom} data-state="not-found" data-slug={model.slug}>
        <h1>Article unavailable</h1>
        <p>This article is not published or does not exist.</p>
        <Link to={model.backHref}>Back to Visceral Mag</Link>
      </section>
    );
  }

  const { article } = model;

  async function handleCommentSubmit(event) {
    event.preventDefault();
    const commentForm = event.currentTarget;
    const payload = Object.fromEntries(new FormData(commentForm).entries());
    const name = payload.name?.trim();
    const email = payload.email?.trim();
    const body = payload.body?.trim();

    if (!name || !email || !body) {
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

  async function handleReviewSubmit(event) {
    event.preventDefault();
    const reviewForm = event.currentTarget;
    const payload = Object.fromEntries(new FormData(reviewForm).entries());
    const name = payload.name?.trim();
    const body = payload.body?.trim();
    const rating = Number(payload.rating);

    if (!name || !body || !Number.isInteger(rating) || rating < 1 || rating > 5) {
      setReviewStatus("validation");
      return;
    }

    setReviewStatus("submitting");
    try {
      await submitPublicForm("review", {
        articleId: article.id,
        articleSlug: article.slug,
        name,
        body,
        rating
      });
      reviewForm.reset();
      setReviewStatus("success");
    } catch {
      setReviewStatus("error");
    }
  }

  return (
    <article className="figma-article-detail" data-page="article-detail" data-design-reference="article-detail-v4" data-generated={model.generatedFrom} data-slug={article.slug} data-prototype-file={model.route.prototypeFile}>
      <header data-section="article-hero" className="figma-article-hero">
        <nav className="figma-breadcrumb" aria-label="Breadcrumb"><Link to="/visceral-mag">Visceral Mag</Link><span aria-hidden="true">/</span><span>{article.category.label}</span></nav>
        <p className="eyebrow">{article.category.label}</p>
        <h1>{article.title}</h1>
        <p>{article.dek}</p>
        <img src={article.featuredImage.url} alt={article.featuredImage.altText} />
      </header>

      <section data-section="article-meta" className="figma-article-meta">
        <Link data-category={article.category.slug} to={article.category.href}>{article.category.label}</Link>
        <time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt)}</time>
        <Link to={article.author.href}>{article.author.name}</Link>
      </section>

      <section data-section="article-body" className="figma-article-body">
        {article.bodyBlocks.map((block, index) => <p key={block} className={index === 0 ? "article-standfirst" : undefined}>{block}</p>)}
      </section>

      <section data-section="related-articles" className="figma-content-section">
        <div className="section-heading-row">
          <h2>Related Articles</h2>
          <Link to="/visceral-mag">All articles</Link>
        </div>
        <div className="figma-related-grid">
          {model.relatedArticles.map((related) => (
            <article key={related.id} className="related-card" data-related={related.slug}>
              <h3><Link to={related.href}>{related.title}</Link></h3>
              <p>{related.dek}</p>
            </article>
          ))}
        </div>
      </section>

      <section data-section="comments" className="figma-conversation-section reader-section reader-section--comments" aria-labelledby="article-comments-heading">
        <div className="section-heading-row">
          <h2 id="article-comments-heading">Comments</h2>
          <span>{model.comments.length} approved {model.comments.length === 1 ? "comment" : "comments"}</span>
        </div>
        {model.comments.map((comment) => (
          <article key={comment.id} className="comment" data-comment={comment.id}>
            <header><h3>{comment.name}</h3>{comment.createdAt ? <time dateTime={comment.createdAt}>{formatArticleDate(comment.createdAt)}</time> : <span>Reader comment</span>}</header>
            <p>{comment.body}</p>
          </article>
        ))}
        {model.comments.length === 0 ? <p className="reader-empty-state">No approved comments yet. Start the conversation.</p> : null}
        <form className="public-comment-form reader-response-form" data-form-status={commentStatus} onSubmit={handleCommentSubmit} noValidate>
          <h3>Join the conversation</h3>
          <p className="public-form-status" data-form-status={commentStatus} aria-live="polite">
            {commentMessages[commentStatus]}
          </p>
          <label htmlFor="comment-name">Name</label>
          <input id="comment-name" name="name" type="text" autoComplete="name" required />
          <label htmlFor="comment-email">Email</label>
          <input id="comment-email" name="email" type="email" autoComplete="email" aria-describedby="comment-email-note" required />
          <p id="comment-email-note">Your email will not be displayed publicly.</p>
          <label htmlFor="comment-body">Comment</label>
          <textarea id="comment-body" name="body" rows="5" placeholder="Join the discussion..." required />
          <p>Comments appear only after editorial approval.</p>
          <button type="submit" disabled={commentStatus === "submitting"}>
            {commentStatus === "submitting" ? "Submitting..." : "Submit comment"}
          </button>
        </form>
      </section>

      <section data-section="reviews" className="figma-conversation-section reader-section reader-section--reviews" aria-labelledby="article-reviews-heading">
        <div className="section-heading-row">
          <h2 id="article-reviews-heading">Reader Reviews</h2>
          <span>{model.reviews.length} approved {model.reviews.length === 1 ? "review" : "reviews"}</span>
        </div>
        {model.reviews.length === 0 ? <p>No approved reviews yet. Be the first to respond.</p> : null}
        {model.reviews.map((review) => (
          <article key={review.id} className="review" data-review={review.id} data-rating={review.rating}>
            <header><h3>{review.name}</h3>{review.createdAt ? <time dateTime={review.createdAt}>{formatArticleDate(review.createdAt)}</time> : <span>Reader review</span>}</header>
            <BookRating value={review.rating} />
            <p>{review.body}</p>
          </article>
        ))}

        <form className="public-review-form reader-response-form" data-form="public-review" data-form-status={reviewStatus} onSubmit={handleReviewSubmit} noValidate>
          <h3>Submit a review</h3>
          <p className="public-form-status" data-form-status={reviewStatus} aria-live="polite">
            {reviewMessages[reviewStatus]}
          </p>
          <label htmlFor="review-name">Name</label>
          <input id="review-name" name="name" type="text" autoComplete="name" required />

          <fieldset>
            <legend>Book rating</legend>
            <div className="book-rating-options">
              {[1, 2, 3, 4, 5].map((rating) => (
                <label key={rating} className="book-rating-option">
                  <input type="radio" name="rating" value={rating} required />
                  <span className="book-rating-option__icons" aria-hidden="true">
                    {Array.from({ length: rating }, (_, index) => <BookOpen key={index} size={16} />)}
                  </span>
                  <span className="sr-only">{rating} out of 5 books</span>
                </label>
              ))}
            </div>
          </fieldset>

          <label htmlFor="review-body">Review</label>
          <textarea id="review-body" name="body" rows="5" placeholder="Your thoughts..." required />
          <p>Reviews appear only after editorial approval.</p>
          <button type="submit" disabled={reviewStatus === "submitting"}>
            {reviewStatus === "submitting" ? "Submitting..." : "Post review"}
          </button>
        </form>
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
