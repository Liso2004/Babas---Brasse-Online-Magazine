import { useEffect, useMemo, useState } from "react";
import * as launchFixtures from "../data/launchFixtures.js";
import { buildContactSubmissionsRouteModel } from "./contactSubmissionsRouteModel.js";

export function ContactSubmissionsPage({ fixtures = launchFixtures }) {
  const [submissions, setSubmissions] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [requestState, setRequestState] = useState("loading");

  useEffect(() => {
    let active = true;
    fetch("/api/admin/contact-submissions", {
      credentials: "include",
      headers: { Accept: "application/json" }
    }).then(async (response) => {
      if (!response.ok) throw new Error("Unable to load inbox");
      return response.json();
    }).then((payload) => {
      if (active) {
        setSubmissions(Array.isArray(payload.items) ? payload.items : []);
        setRequestState("ready");
      }
    }).catch(() => {
      if (active) setRequestState("error");
    });
    return () => { active = false; };
  }, []);

  const liveFixtures = useMemo(
    () => ({ ...fixtures, contactSubmissions: submissions || [] }),
    [fixtures, submissions]
  );
  const model = buildContactSubmissionsRouteModel(liveFixtures);
  const { hero, sections } = model;
  const selected = sections.inbox.items.find((item) => item.id === selectedId)
    || sections.inbox.selectedSubmission || null;

  async function updateStatus(status) {
    if (!selected) return;
    setRequestState("saving");
    try {
      const response = await fetch(`/api/admin/contact-submissions/${encodeURIComponent(selected.id)}`, {
        method: "PATCH",
        credentials: "include",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      if (!response.ok) throw new Error("Unable to update submission");
      const updated = await response.json();
      setSubmissions((items) => items.map((item) => item.id === updated.id ? updated : item));
      setRequestState("ready");
    } catch {
      setRequestState("error");
    }
  }

  return (
    <section className="figma-admin-page figma-contact-submissions-page" data-page="contact-submissions" data-route={model.route.path} data-auth-required={model.auth.role}>
      <header className="figma-admin-page-intro" data-section="submissions-intro">
        <p className="eyebrow">{hero.eyebrow}</p><h1>{hero.title}</h1><p>{hero.dek}</p>
      </header>
      <section className="figma-admin-section" data-section="submissions-stats" data-new-count={model.nav.newCount}>
        <h2>{sections.stats.heading}</h2>
        {sections.stats.items.map((metric) => <article key={metric.key} className="metric"><p className="eyebrow">{metric.label}</p><strong>{metric.value}</strong></article>)}
      </section>
      <section className="figma-admin-toolbar" data-section="submissions-filter">
        <h2>{sections.filters.heading}</h2>
        <label>Search submissions<input name={sections.filters.search.name} type="search" placeholder={sections.filters.search.placeholder} /></label>
        <label>Status<select name="status">{sections.filters.filters[0].options.map((option) => <option key={option}>{option}</option>)}</select></label>
      </section>
      <p className="public-form-status" data-form-status={requestState} aria-live="polite">
        {requestState === "loading" ? "Loading contact submissions..." : requestState === "saving" ? "Saving status..." : requestState === "error" ? "The inbox could not be loaded or updated. Try again." : ""}
      </p>
      <section className="figma-admin-workspace" data-section="submissions-inbox">
        <h2>{sections.inbox.heading}</h2>
        {requestState === "ready" && sections.inbox.items.length === 0 ? <p>No contact submissions yet.</p> : null}
        <div className="submissions-table figma-admin-table-panel" role="table" aria-label="Contact submissions inbox">
          <div role="row" className="table-header">{sections.inbox.columns.map((column) => <span key={column} role="columnheader">{column}</span>)}</div>
          {sections.inbox.items.map((row) => <div key={row.id} role="row" className="submission-row" data-submission-id={row.id} data-status={row.status}>
            <span role="cell">{row.sender}</span><a role="cell" href={`mailto:${row.email}`}>{row.email}</a>
            <span role="cell"><strong>{row.subject}</strong><small>{row.message}</small></span>
            <span role="cell">{row.status}</span><span role="cell">{row.receivedDate}</span>
            <span role="cell"><button type="button" onClick={() => setSelectedId(row.id)}>Review</button></span>
          </div>)}
        </div>
        {selected ? <article data-section="submission-detail" data-selected-submission-id={selected.id}>
          <h3>{selected.subject}</h3><p><strong>{selected.sender}</strong> &lt;{selected.email}&gt;</p><p>{selected.message}</p>
          <a href={selected.replyHref} data-action="reply">Reply by email</a>
        </article> : null}
      </section>
      <section className="figma-admin-section" data-section="submission-statuses">
        <h2>{sections.statuses.heading}</h2>
        <button type="button" disabled={!selected || requestState === "saving"} onClick={() => updateStatus("read")}>Mark read</button>
        <button type="button" disabled={!selected || requestState === "saving"} onClick={() => updateStatus("archived")}>Archive</button>
      </section>
      <section className="figma-admin-state-grid" data-section="submissions-states" aria-live="polite">
        <h2>Inbox status</h2><p>{requestState === "ready" ? `${sections.inbox.items.length} submissions loaded.` : "Waiting for inbox data."}</p>
      </section>
    </section>
  );
}
