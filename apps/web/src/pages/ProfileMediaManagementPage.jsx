import * as launchFixtures from "../data/launchFixtures.js";
import { buildProfileMediaManagementRouteModel } from "./profileMediaManagementRouteModel.js";

function UploadField({ field }) {
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
      <input id={field.id} name={field.name} type={field.type} accept={field.accept} required={field.required} />
    </label>
  );
}

export function ProfileMediaManagementPage({ fixtures = launchFixtures }) {
  const model = buildProfileMediaManagementRouteModel(fixtures);
  const { hero, sections } = model;

  return (
    <section className="figma-admin-page figma-profile-media-management-page" data-page="profile-media-management" data-route={model.route.path} data-generated={model.generatedFrom} data-prototype-file={model.route.prototypeFile} data-auth-required={model.auth.role}>
      <header className="figma-admin-page-intro" data-section="profile-media-intro">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1>{hero.title}</h1>
        <p>{hero.dek}</p>
      </header>

      <section className="figma-admin-section" data-section="profile-media-stats">
        <h2>{sections.stats.heading}</h2>
        {sections.stats.items.map((metric) => (
          <article key={metric.key} className="metric" data-metric={metric.key} data-value={metric.value}>
            <p className="eyebrow">{metric.label}</p>
            <strong>{metric.value}</strong>
          </article>
        ))}
      </section>

      <section className="figma-admin-table-panel" data-section="profile-management">
        <h2>{sections.profileManagement.heading}</h2>
        {sections.profileManagement.groups.map((group) => (
          <article key={group.key} data-group={group.key} className="profile-group">
            <h3>{group.label}</h3>
            <div className="profile-table" role="table" aria-label={`${group.label} profile management`}>
              <div role="row" className="table-header">
                {sections.profileManagement.columns.map((column) => <span key={column} role="columnheader" data-column={column}>{column}</span>)}
              </div>
              {group.rows.map((row) => (
                <div key={row.id} role="row" className="profile-row" data-profile-id={row.id} data-profile-type={row.type} data-status={row.status.toLowerCase()} data-completeness={row.completeness}>
                  <span role="cell"><strong>{row.name}</strong><small>{row.slug}</small></span>
                  <span role="cell">{row.role}</span>
                  <span role="cell">{row.status}</span>
                  <span role="cell">{row.completeness}</span>
                  <a role="cell" href={row.editHref}>Edit profile</a>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="figma-admin-table-panel" data-section="media-library">
        <h2>{sections.mediaLibrary.heading}</h2>
        <div className="media-table" role="table" aria-label="Media library metadata">
          <div role="row" className="table-header">
            {sections.mediaLibrary.columns.map((column) => <span key={column} role="columnheader" data-column={column}>{column}</span>)}
          </div>
          {sections.mediaLibrary.items.map((row) => (
            <div key={row.id} role="row" className="media-row" data-media-id={row.id} data-publish-ready={row.publishReady}>
              <span role="cell"><strong>{row.title}</strong><small>{row.url}</small></span>
              <span role="cell">{row.altText}</span>
              <span role="cell">{row.caption}</span>
              <span role="cell">{row.credit}</span>
              <span role="cell">{row.category}</span>
              <span role="cell">{row.usageCount} article{row.usageCount === 1 ? "" : "s"}</span>
              <span role="cell">{row.publishReady ? "Ready" : "Missing metadata"}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="figma-admin-upload-panel" data-section="upload-select">
        <h2>{sections.upload.heading}</h2>
        <form data-form="media-upload" action={sections.upload.action} method={sections.upload.method} encType={sections.upload.enctype}>
          <div data-dropzone={sections.upload.dropzone.id} tabIndex="0" role="button" aria-describedby="media-file-help">{sections.upload.dropzone.label}</div>
          <p id="media-file-help">{sections.upload.helpText}</p>
          {sections.upload.fields.map((field) => <UploadField key={field.name} field={field} />)}
          <button type="submit" data-action="upload-media">{sections.upload.submitLabel}</button>
        </form>
      </section>

      <section className="figma-admin-state-grid" data-section="profile-media-states" data-state-note="media-uploading" data-state-note-secondary="media-missing-metadata">
        <h2>Profile / media states</h2>
        {sections.states.items.map((state) => <article key={state} data-state={state}>{state}</article>)}
        <p>{sections.states.metadataCopy}</p>
        <a href={sections.states.permissionHref}>Return to admin login</a>
      </section>
    </section>
  );
}
