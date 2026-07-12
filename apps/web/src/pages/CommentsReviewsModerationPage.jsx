import { useEffect, useMemo, useState } from "react";
import * as launchFixtures from "../data/launchFixtures.js";
import { buildCommentsReviewsModerationRouteModel } from "./commentsReviewsModerationRouteModel.js";

export function CommentsReviewsModerationPage({ fixtures = launchFixtures }) {
  const [comments, setComments] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [requestState, setRequestState] = useState("loading");

  useEffect(() => {
    let active = true;
    fetch("/api/admin/comments?status=pending", {
      credentials: "include",
      headers: { Accept: "application/json" }
    }).then(async (response) => {
      if (!response.ok) throw new Error("Unable to load queue");
      return response.json();
    }).then((payload) => {
      if (active) {
        setComments(Array.isArray(payload.items) ? payload.items : []);
        setRequestState("ready");
      }
    }).catch(() => {
      if (active) setRequestState("error");
    });
    return () => { active = false; };
  }, []);

  const liveFixtures = useMemo(() => ({
    ...fixtures,
    comments: (comments || []).map((comment) => ({
      ...comment,
      articleId: fixtures.articles.find((article) => article.slug === comment.articleSlug)?.id || comment.articleSlug
    })),
    reviews: []
  }), [comments, fixtures]);
  const model = buildCommentsReviewsModerationRouteModel(liveFixtures);
  const { hero, sections } = model;
  const selected = sections.workspace.items.find((item) => item.id === selectedId)
    || sections.workspace.selectedItem || null;

  async function updateStatus(status) {
    if (!selected) return;
    setRequestState("saving");
    try {
      const response = await fetch(`/api/admin/comments/${encodeURIComponent(selected.id)}`, {
        method: "PATCH",
        credentials: "include",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      if (!response.ok) throw new Error("Unable to update comment");
      await response.json();
      setComments((items) => items.filter((item) => item.id !== selected.id));
      setSelectedId(null);
      setRequestState("ready");
    } catch {
      setRequestState("error");
    }
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
      <section className="figma-admin-toolbar" data-section="moderation-queues">
        <h2>Pending comments</h2>
        <label>Search comments<input name={sections.queues.search.name} type="search" placeholder={sections.queues.search.placeholder} /></label>
      </section>
      <p className="public-form-status" data-form-status={requestState} aria-live="polite">
        {requestState === "loading" ? "Loading pending comments..." : requestState === "saving" ? "Saving moderation decision..." : requestState === "error" ? "The moderation queue could not be loaded or updated. Try again." : ""}
      </p>
      <section className="figma-admin-workspace" data-section="moderation-workspace">
        <h2>{sections.workspace.heading}</h2>
        {requestState === "ready" && sections.workspace.items.length === 0 ? <p>No comments are waiting for moderation.</p> : null}
        <div className="moderation-table figma-admin-table-panel" role="table" aria-label="Pending comments moderation queue">
          <div role="row" className="table-header">{sections.workspace.columns.map((column) => <span key={column} role="columnheader">{column}</span>)}</div>
          {sections.workspace.items.map((item) => <div key={item.id} role="row" className="moderation-row" data-item-id={item.id} data-status={item.status}>
            <span role="cell">{item.type}</span><span role="cell">{item.author}</span>
            <a role="cell" href={item.articleHref}>{item.articleTitle}</a><span role="cell">{item.status}</span>
            <span role="cell">{item.body}</span><span role="cell"><button type="button" onClick={() => setSelectedId(item.id)}>Review</button></span>
          </div>)}
        </div>
        {selected ? <article data-section="selected-item" data-selected-item-id={selected.id}>
          <h3>Selected comment</h3><p><strong>{selected.author}</strong> on <a href={selected.articleHref}>{selected.articleTitle}</a></p><p>{selected.body}</p>
        </article> : null}
      </section>
      <section className="figma-admin-section" data-section="moderation-actions">
        <h2>{sections.actions.heading}</h2>
        <button type="button" disabled={!selected || requestState === "saving"} onClick={() => updateStatus("approved")}>Approve</button>
        <button type="button" disabled={!selected || requestState === "saving"} onClick={() => updateStatus("rejected")}>Reject</button>
        <p>{sections.states.publicRuleCopy}</p>
      </section>
      <section className="figma-admin-state-grid" data-section="moderation-states" aria-live="polite">
        <h2>Queue status</h2><p>{requestState === "ready" ? `${sections.workspace.items.length} pending comments loaded.` : "Waiting for moderation data."}</p>
      </section>
    </section>
  );
}
