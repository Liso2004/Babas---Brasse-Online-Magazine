import { useEffect, useMemo, useState } from "react";
import * as launchFixtures from "../data/launchFixtures.js";
import { buildArticleManagementRouteModel } from "./articleManagementRouteModel.js";

function EditorField({ field, defaultValue = "" }) {
  if (field.type === "select") {
    return <label htmlFor={field.id}>{field.label}<select id={field.id} name={field.name} required={field.required} defaultValue={defaultValue}>{field.options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>;
  }
  if (field.type === "textarea") {
    return <label htmlFor={field.id}>{field.label}<textarea id={field.id} name={field.name} required={field.required} defaultValue={defaultValue} /></label>;
  }
  return <label htmlFor={field.id}>{field.label}<input id={field.id} name={field.name} type={field.type} required={field.required} defaultValue={defaultValue} /></label>;
}

function articleFieldValues(article) {
  if (!article) return {};
  return {
    title: article.title,
    slug: article.slug,
    dek: article.dek,
    categoryId: article.categoryId,
    authorProfileId: article.authorProfileId,
    featuredImageId: article.featuredImage?.id,
    altText: article.featuredImage?.altText,
    body: article.bodyBlocks?.join("\n\n"),
    seoTitle: article.seo?.title,
    seoDescription: article.seo?.description,
    ogTitle: article.seo?.ogTitle,
    ogDescription: article.seo?.ogDescription
  };
}

export function ArticleManagementPage({ fixtures = launchFixtures }) {
  const [editorial, setEditorial] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [requestState, setRequestState] = useState("loading");
  const [statusMessage, setStatusMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [seoFilter, setSeoFilter] = useState("all");

  useEffect(() => {
    let active = true;
    fetch("/api/admin/editorial", { credentials: "include", headers: { Accept: "application/json" } })
      .then(async (response) => {
        if (!response.ok) throw new Error("Unable to load editorial content");
        return response.json();
      })
      .then((payload) => {
        if (active) {
          setEditorial(payload);
          setRequestState("ready");
        }
      })
      .catch(() => { if (active) setRequestState("error"); });
    return () => { active = false; };
  }, []);

  const liveFixtures = useMemo(() => editorial ? { ...fixtures, ...editorial } : fixtures, [editorial, fixtures]);
  const model = buildArticleManagementRouteModel(liveFixtures);
  const { hero, sections } = model;
  const selectedArticle = liveFixtures.articles.find((article) => article.id === selectedId) || null;
  const fieldValues = articleFieldValues(selectedArticle);
  const normalizedSearch = searchQuery.trim().toLowerCase();
  const filteredRows = sections.articleTable.items.filter((row) => {
    const matchesSearch = !normalizedSearch || [row.title, row.slug, row.author].some((value) => String(value || "").toLowerCase().includes(normalizedSearch));
    const matchesStatus = statusFilter === "all" || row.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || row.categoryId === categoryFilter;
    const matchesSeo = seoFilter === "all" || (seoFilter === "ready" ? row.seoReady : !row.seoReady);
    return matchesSearch && matchesStatus && matchesCategory && matchesSeo;
  });

  function mergeArticle(updated) {
    setEditorial((current) => ({
      ...current,
      articles: current.articles.some((item) => item.id === updated.id)
        ? current.articles.map((item) => item.id === updated.id ? updated : item)
        : [...current.articles, updated]
    }));
  }

  async function updateStatus(article, status) {
    setRequestState("saving");
    setStatusMessage("");
    try {
      const response = await fetch(`/api/admin/articles/${encodeURIComponent(article.id)}`, {
        method: "PATCH",
        credentials: "include",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      if (!response.ok) throw new Error("Unable to update article");
      mergeArticle(await response.json());
      setRequestState("ready");
      setStatusMessage(status === "published" ? "Article published." : "Article returned to draft.");
    } catch {
      setRequestState("error");
      setStatusMessage("The article status could not be updated.");
    }
  }

  async function deleteArticle(article) {
    if (!window.confirm(`Delete article "${article.title}" permanently? This cannot be undone.`)) return;
    setRequestState("saving");
    setStatusMessage("");
    try {
      const response = await fetch(`/api/admin/articles/${encodeURIComponent(article.id)}`, {
        method: "DELETE",
        credentials: "include",
        headers: { Accept: "application/json" }
      });
      if (!response.ok) throw new Error("Unable to delete article");
      setEditorial((current) => ({ ...current, articles: current.articles.filter((item) => item.id !== article.id) }));
      if (selectedId === article.id) setSelectedId(null);
      setRequestState("ready");
      setStatusMessage("Article deleted.");
    } catch {
      setRequestState("error");
      setStatusMessage("The article could not be deleted.");
    }
  }

  async function saveArticle(event) {
    event.preventDefault();
    setRequestState("saving");
    setStatusMessage("");
    const form = new FormData(event.currentTarget);
    const action = event.nativeEvent.submitter?.dataset.action || "draft";
    const payload = Object.fromEntries(form.entries());
    payload.id = selectedArticle?.id || payload.slug;
    payload.status = action === "publish" ? "published" : "draft";
    try {
      const response = await fetch("/api/admin/articles", {
        method: "POST",
        credentials: "include",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.error || "Unable to save article");
      }
      const saved = await response.json();
      mergeArticle(saved);
      setSelectedId(saved.id);
      setRequestState("ready");
      setStatusMessage(saved.status === "published" ? "Article saved and published." : "Draft saved.");
    } catch (error) {
      setRequestState("error");
      setStatusMessage(error.message);
    }
  }

  function clearFilters() {
    setSearchQuery("");
    setStatusFilter("all");
    setCategoryFilter("all");
    setSeoFilter("all");
  }

  return (
    <section className="figma-admin-page figma-article-management-page" data-page="article-management" data-design-reference="admin-editor-v4" data-route={model.route.path} data-generated={model.generatedFrom} data-prototype-file={model.route.prototypeFile} data-auth-required={model.auth.role}>
      <header className="figma-admin-page-intro" data-section="article-management-intro">
        <p className="eyebrow">{hero.eyebrow}</p><h1>{hero.title}</h1><p>{hero.dek}</p>
      </header>

      <section className="figma-admin-toolbar admin-filter-toolbar" data-section="article-toolbar">
        <h2>{sections.toolbar.heading}</h2>
        <label>{sections.toolbar.search.label}<input name={sections.toolbar.search.name} type="search" placeholder={sections.toolbar.search.placeholder} value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} /></label>
        <label>Status<select name="article-status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option value="all">All statuses</option><option value="draft">Draft</option><option value="published">Published</option></select></label>
        <label>Category<select name="article-category" value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}><option value="all">All categories</option>{liveFixtures.categories.map((category) => <option key={category.id} value={category.id}>{category.label}</option>)}</select></label>
        <label>SEO readiness<select name="article-seo-readiness" value={seoFilter} onChange={(event) => setSeoFilter(event.target.value)}><option value="all">All SEO states</option><option value="ready">Ready</option><option value="needs-work">Needs work</option></select></label>
        <button type="button" onClick={clearFilters}>Clear filters</button>
        <button type="button" onClick={() => setSelectedId(null)}>Create article</button>
        <div className="article-metrics" aria-label="Article publishing metrics">
          {sections.toolbar.metrics.map((metric) => <article key={metric.key} className="metric" data-metric={metric.key} data-value={metric.value}><p className="eyebrow">{metric.label}</p><strong>{metric.value}</strong></article>)}
        </div>
      </section>

      <p className="public-form-status" data-form-status={requestState} aria-live="polite">
        {requestState === "loading" ? "Loading editorial content..." : requestState === "saving" ? "Saving article..." : statusMessage}
      </p>

      <section className="figma-admin-table-panel" data-section="article-table">
        <h2>{sections.articleTable.heading}</h2>
        {requestState === "ready" && filteredRows.length === 0 ? <p>No articles match the current filters.</p> : null}
        <div className="article-table" role="table" aria-label="Article management table">
          <div role="row" className="table-header">{sections.articleTable.columns.map((column) => <span key={column} role="columnheader" data-column={column}>{column}</span>)}</div>
          {filteredRows.map((row) => {
            const article = liveFixtures.articles.find((item) => item.id === row.id);
            return (
              <div key={row.id} role="row" className="article-row" data-article-id={row.id} data-status={row.status} data-seo-ready={row.seoReady}>
                <span role="cell"><strong>{row.title}</strong><small>{row.slug}</small></span><span role="cell">{row.status}</span>
                <span role="cell">{row.category}</span><span role="cell">{row.author}</span><span role="cell">{row.date}</span>
                <span role="cell">{row.seoReady ? "Ready" : "Needs work"}</span>
                <span role="cell" className="row-actions">
                  <button type="button" onClick={() => setSelectedId(row.id)}>Edit</button>
                  <a href={row.previewHref}>Preview</a>
                  <button type="button" disabled={requestState === "saving"} onClick={() => updateStatus(article, row.status === "published" ? "draft" : "published")}>{row.status === "published" ? "Unpublish" : "Publish"}</button>
                  <button type="button" className="danger-button" disabled={requestState === "saving"} onClick={() => deleteArticle(article)}>Delete article</button>
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="figma-admin-editor-panel" data-section="article-editor">
        <h2>{selectedArticle ? `Edit: ${selectedArticle.title}` : sections.editor.heading}</h2>
        <form key={selectedArticle?.id || "new"} data-form="article-editor" onSubmit={saveArticle}>
          {sections.editor.fields.map((field) => <EditorField key={field.name} field={field} defaultValue={fieldValues[field.name]} />)}
          <div className="editor-actions">
            <button type="submit" data-action="draft" disabled={requestState === "saving"}>Save draft</button>
            <button type="submit" data-action="publish" disabled={requestState === "saving"}>Publish</button>
          </div>
        </form>
      </section>

      <section className="figma-admin-state-grid" data-section="article-states" data-state-note="article-draft" data-state-note-secondary="article-publish">
        <h2>Publishing states</h2>{sections.states.items.map((state) => <article key={state} data-state={state}>{state}</article>)}
        <p>{sections.states.validationCopy}</p><p>{sections.states.failureCopy}</p>
      </section>
    </section>
  );
}
