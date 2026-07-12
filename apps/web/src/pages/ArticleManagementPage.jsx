import * as launchFixtures from "../data/launchFixtures.js";
import { buildArticleManagementRouteModel } from "./articleManagementRouteModel.js";

function EditorField({ field }) {
  if (field.type === "select") {
    return (
      <label htmlFor={field.id}>
        {field.label}
        <select id={field.id} name={field.name} required={field.required}>
          {field.options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
      </label>
    );
  }

  if (field.type === "textarea") {
    return (
      <label htmlFor={field.id}>
        {field.label}
        <textarea id={field.id} name={field.name} required={field.required} />
      </label>
    );
  }

  return (
    <label htmlFor={field.id}>
      {field.label}
      <input id={field.id} name={field.name} type={field.type} required={field.required} />
    </label>
  );
}

export function ArticleManagementPage({ fixtures = launchFixtures }) {
  const model = buildArticleManagementRouteModel(fixtures);
  const { hero, sections } = model;

  return (
    <section className="figma-admin-page figma-article-management-page" data-page="article-management" data-route={model.route.path} data-generated={model.generatedFrom} data-prototype-file={model.route.prototypeFile} data-auth-required={model.auth.role}>
      <header className="figma-admin-page-intro" data-section="article-management-intro">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1>{hero.title}</h1>
        <p>{hero.dek}</p>
      </header>

      <section className="figma-admin-toolbar" data-section="article-toolbar">
        <h2>{sections.toolbar.heading}</h2>
        <label>{sections.toolbar.search.label}<input name={sections.toolbar.search.name} type={sections.toolbar.search.type} placeholder={sections.toolbar.search.placeholder} /></label>
        {sections.toolbar.filters.map((filter) => (
          <label key={filter.name} data-filter={filter.name}>
            {filter.label}
            <select name={filter.name}>
              {filter.options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
          </label>
        ))}
        <a className="button" href={sections.toolbar.createHref}>Create article</a>
        <div className="article-metrics" aria-label="Article publishing metrics">
          {sections.toolbar.metrics.map((metric) => (
            <article key={metric.key} className="metric" data-metric={metric.key} data-value={metric.value}>
              <p className="eyebrow">{metric.label}</p>
              <strong>{metric.value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="figma-admin-table-panel" data-section="article-table">
        <h2>{sections.articleTable.heading}</h2>
        <div className="article-table" role="table" aria-label="Article management table">
          <div role="row" className="table-header">
            {sections.articleTable.columns.map((column) => <span key={column} role="columnheader" data-column={column}>{column}</span>)}
          </div>
          {sections.articleTable.items.map((row) => (
            <div key={row.id} role="row" className="article-row" data-article-id={row.id} data-status={row.status} data-seo-ready={row.seoReady}>
              <span role="cell"><strong>{row.title}</strong><small>{row.slug}</small></span>
              <span role="cell">{row.status}</span>
              <span role="cell">{row.category}</span>
              <span role="cell">{row.author}</span>
              <span role="cell">{row.date}</span>
              <span role="cell">{row.seoReady ? "Ready" : "Needs work"}</span>
              <span role="cell" className="row-actions">
                {row.actions.map((action) => action.href ? <a key={action.type} href={action.href}>{action.label}</a> : <button key={action.type} type="button" data-action={action.type}>{action.label}</button>)}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="figma-admin-editor-panel" data-section="article-editor">
        <h2>{sections.editor.heading}</h2>
        <form data-form="article-editor" action={sections.editor.action} method={sections.editor.method}>
          {sections.editor.fields.map((field) => <EditorField key={field.name} field={field} />)}
          <div className="editor-actions">
            {sections.editor.actions.map((action) => <button key={action.action} type={action.type} data-action={action.action}>{action.label}</button>)}
          </div>
        </form>
      </section>

      <section className="figma-admin-state-grid" data-section="article-states" data-state-note="article-draft" data-state-note-secondary="article-publish">
        <h2>Publishing states</h2>
        {sections.states.items.map((state) => <article key={state} data-state={state}>{state}</article>)}
        <p>{sections.states.validationCopy}</p>
        <p>{sections.states.failureCopy}</p>
      </section>
    </section>
  );
}
