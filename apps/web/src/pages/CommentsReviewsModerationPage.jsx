import { useEffect, useMemo, useState } from "react";
import * as launchFixtures from "../data/launchFixtures.js";
import { buildCommentsReviewsModerationRouteModel } from "./commentsReviewsModerationRouteModel.js";

export function CommentsReviewsModerationPage({ fixtures = launchFixtures }) {
  const [queues, setQueues] = useState({ comments: null, reviews: null });
  const [selectedId, setSelectedId] = useState(null);
  const [requestState, setRequestState] = useState("loading");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [articleFilter, setArticleFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");

  useEffect(() => {
    let active = true;
    Promise.all([
      fetch("/api/admin/comments", { credentials: "include", headers: { Accept: "application/json" } }),
      fetch("/api/admin/reviews", { credentials: "include", headers: { Accept: "application/json" } })
    ]).then(async ([commentsResponse, reviewsResponse]) => {
      if (!commentsResponse.ok || !reviewsResponse.ok) throw new Error("Unable to load moderation queue");
      return Promise.all([commentsResponse.json(), reviewsResponse.json()]);
    }).then(([commentsPayload, reviewsPayload]) => {
      if (active) {
        setQueues({
          comments: Array.isArray(commentsPayload.items) ? commentsPayload.items : [],
          reviews: Array.isArray(reviewsPayload.items) ? reviewsPayload.items : []
        });
        setRequestState("ready");
      }
    }).catch(() => {
      if (active) setRequestState("error");
    });
    return () => { active = false; };
  }, []);

  const liveFixtures = useMemo(() => ({
    ...fixtures,
    comments: (queues.comments || []).map((comment) => ({
      ...comment,
      articleId: fixtures.articles.find((article) => article.slug === comment.articleSlug)?.id || comment.articleSlug
    })),
    reviews: (queues.reviews || []).map((review) => ({
      ...review,
      articleId: fixtures.articles.find((article) => article.slug === review.articleId)?.id || review.articleId
    }))
  }), [queues, fixtures]);

  const model = buildCommentsReviewsModerationRouteModel(liveFixtures);
  const { hero, sections } = model;
  const normalizedSearch = searchQuery.trim().toLowerCase();
  const filteredItems = sections.workspace.items.filter((item) => {
    const matchesSearch = !normalizedSearch || [item.author, item.articleTitle, item.body]
      .some((value) => String(value || "").toLowerCase().includes(normalizedSearch));
    const matchesType = typeFilter === "all" || item.type === typeFilter;
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const matchesArticle = articleFilter === "all" || item.articleHref === `/visceral-mag/${articleFilter}`;
    const matchesRating = ratingFilter === "all" || String(item.rating) === ratingFilter;
    return matchesSearch && matchesType && matchesStatus && matchesArticle && matchesRating;
  });
  const selected = filteredItems.find((item) => item.id === selectedId) || null;

  function removeSelectedFromQueue() {
    setQueues((current) => selected.type === "review"
      ? { ...current, reviews: current.reviews.filter((item) => item.id !== selected.id) }
      : { ...current, comments: current.comments.filter((item) => item.id !== selected.id) });
    setSelectedId(null);
  }

  async function updateStatus(status) {
    if (!selected) return;
    setRequestState("saving");
    const endpoint = selected.type === "review"
      ? `/api/admin/reviews/${encodeURIComponent(selected.id)}`
      : `/api/admin/comments/${encodeURIComponent(selected.id)}`;
    try {
      const response = await fetch(endpoint, {
        method: "PATCH",
        credentials: "include",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      if (!response.ok) throw new Error("Unable to update moderation item");
      const updated = await response.json();
      setQueues((current) => selected.type === "review"
        ? { ...current, reviews: current.reviews.map((item) => item.id === updated.id ? updated : item) }
        : { ...current, comments: current.comments.map((item) => item.id === updated.id ? updated : item) });
      setSelectedId(null);
      setRequestState("ready");
    } catch {
      setRequestState("error");
    }
  }

  async function deleteSelected() {
    if (!selected || !window.confirm("Permanently delete this moderation item? This cannot be undone.")) return;
    setRequestState("saving");
    const endpoint = selected.type === "review"
      ? `/api/admin/reviews/${encodeURIComponent(selected.id)}`
      : `/api/admin/comments/${encodeURIComponent(selected.id)}`;
    try {
      const response = await fetch(endpoint, { method: "DELETE", credentials: "include", headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error("Unable to delete moderation item");
      removeSelectedFromQueue();
      setRequestState("ready");
    } catch {
      setRequestState("error");
    }
  }

  function clearFilters() {
    setSearchQuery("");
    setTypeFilter("all");
    setStatusFilter("all");
    setArticleFilter("all");
    setRatingFilter("all");
    setSelectedId(null);
  }

  return (
    <section className="figma-admin-page figma-comments-reviews-moderation-page" data-page="comments-reviews-moderation" data-route={model.route.path} data-auth-required={model.auth.role}>
      <header className="figma-admin-page-intro" data-section="moderation-intro">
        <p className="eyebrow">{hero.eyebrow}</p><h1>{hero.title}</h1><p>{hero.dek}</p>
      </header>
      <section className="figma-admin-section" data-section="moderation-stats" data-pending-count={model.nav.pendingCount}>
        <h2>{sections.stats.heading}</h2>
        {sections.stats.items.map((metric) => <article key={metric.key} className="metric"><p className="eyebrow">{metric.label}</p><strong>{metric.value}</strong></article>)}
      </section>
      <section className="figma-admin-toolbar admin-filter-toolbar" data-section="moderation-queues">
        <h2>Comments and reviews</h2>
        <label>Search queue<input name={sections.queues.search.name} type="search" placeholder={sections.queues.search.placeholder} value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} /></label>
        <label>Type<select name="moderation-type" value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}><option value="all">All types</option><option value="comment">Comments</option><option value="review">Reviews</option></select></label>
        <label>Status<select name="moderation-status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option value="all">All statuses</option><option value="pending">Pending</option><option value="approved">Approved</option><option value="rejected">Rejected</option></select></label>
        <label>Article<select name="moderation-article" value={articleFilter} onChange={(event) => setArticleFilter(event.target.value)}><option value="all">All articles</option>{fixtures.articles.filter((article) => article.status === "published").map((article) => <option key={article.id} value={article.slug}>{article.title}</option>)}</select></label>
        <label>Rating<select name="moderation-rating" value={ratingFilter} onChange={(event) => setRatingFilter(event.target.value)}><option value="all">All ratings</option>{[1, 2, 3, 4, 5].map((rating) => <option key={rating} value={rating}>{rating} books</option>)}</select></label>
        <button type="button" onClick={clearFilters}>Clear filters</button>
      </section>
      <p className="public-form-status" data-form-status={requestState} aria-live="polite">
        {requestState === "loading" ? "Loading comments and reviews..." : requestState === "saving" ? "Saving moderation decision..." : requestState === "error" ? "The moderation queue could not be loaded or updated. Try again." : ""}
      </p>
      <section className="figma-admin-workspace" data-section="moderation-workspace">
        <h2>{sections.workspace.heading}</h2>
        {requestState === "ready" && filteredItems.length === 0 ? <p>No moderation items match the current filters.</p> : null}
        <div className="moderation-table figma-admin-table-panel" role="table" aria-label="Comments and reviews moderation queue">
          <div role="row" className="table-header">{sections.workspace.columns.map((column) => <span key={column} role="columnheader">{column}</span>)}</div>
          {filteredItems.map((item) => <div key={item.id} role="row" className="moderation-row" data-item-id={item.id} data-status={item.status}>
            <span role="cell">{item.type}</span><span role="cell">{item.author}</span>
            <a role="cell" href={item.articleHref}>{item.articleTitle}</a><span role="cell">{item.status}</span>
            <span role="cell">{item.rating ? `${item.rating}/5 - ` : ""}{item.body}</span><span role="cell"><button type="button" onClick={() => setSelectedId(item.id)}>Review</button></span>
          </div>)}
        </div>
        {selected ? <article data-section="selected-item" data-selected-item-id={selected.id}>
          <h3>Selected {selected.type}</h3><p><strong>{selected.author}</strong> on <a href={selected.articleHref}>{selected.articleTitle}</a></p>
          {selected.rating ? <p>Rating: {selected.rating}/5</p> : null}<p>{selected.body}</p>
        </article> : null}
      </section>
      <section className="figma-admin-section" data-section="moderation-actions">
        <h2>{sections.actions.heading}</h2>
        <button type="button" disabled={!selected || requestState === "saving"} onClick={() => updateStatus("approved")}>Approve</button>
        <button type="button" disabled={!selected || requestState === "saving"} onClick={() => updateStatus("rejected")}>Reject</button>
        <button type="button" className="danger-button" disabled={!selected || requestState === "saving"} onClick={deleteSelected}>Delete selected</button>
        <p>{sections.states.publicRuleCopy}</p>
      </section>
      <section className="figma-admin-state-grid" data-section="moderation-states" aria-live="polite">
        <h2>Queue status</h2><p>{requestState === "ready" ? `${filteredItems.length} of ${sections.workspace.items.length} items shown.` : "Waiting for moderation data."}</p>
      </section>
    </section>
  );
}
