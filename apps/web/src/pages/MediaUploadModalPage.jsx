import { FigmaSupportGrid, FigmaSupportPanel } from "../components/FigmaSupportSurface.jsx";
import { buildMediaUploadRouteModel } from "./adminWorkflowSupportRouteModel.js";

function FieldControl({ field }) {
  if (field.type === "textarea") {
    return (
      <label htmlFor={field.id}>
        {field.label}
        <textarea id={field.id} name={field.name} required={field.required} />
      </label>
    );
  }

  if (field.type === "select") {
    return (
      <label htmlFor={field.id}>
        {field.label}
        <select id={field.id} name={field.name} required={field.required}>
          <option value="">Select {field.label.toLowerCase()}</option>
        </select>
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

export function MediaUploadModalPage() {
  const model = buildMediaUploadRouteModel();

  return (
    <section className="figma-support-page figma-workflow-page" data-page="media-upload-modal" data-route={model.route.path} data-generated={model.generatedFrom} data-prototype-file={model.route.prototypeFile} data-auth-required={model.authRequired} data-responsive={model.responsive}>
      <section className="figma-support-modal" data-section="media-upload-modal" role={model.modal.role} aria-modal={model.modal.ariaModal} aria-labelledby={model.modal.labelledBy} data-modal-focus-trap={model.modal.focusTrap} data-keyboard-close={model.modal.keyboardClose} data-focus-return={model.modal.focusReturn}>
        <header className="figma-support-hero" data-section="media-upload-intro">
          <p className="eyebrow">{model.intro.eyebrow}</p>
          <h1 id={model.modal.labelledBy}>{model.intro.title}</h1>
          <p>{model.intro.body}</p>
        </header>

        <form className="figma-support-form-grid" data-form={model.form.id} action={model.form.action} method={model.form.method} encType={model.form.enctype}>
          <FigmaSupportPanel className="figma-upload-dropzone" data-section="media-dropzone" data-dropzone={model.dropzone.id} tabIndex="0" role="button" aria-describedby={model.dropzone.helpId}>
            <h2>Drop zone</h2>
            <p id={model.dropzone.helpId}>{model.dropzone.helpText}</p>
          </FigmaSupportPanel>

          <FigmaSupportPanel data-section="media-preview" aria-live="polite">
            <h2>File preview</h2>
            <figure data-preview="selected-media"><img src={model.preview.src} alt={model.preview.alt} /><figcaption>{model.preview.caption}</figcaption></figure>
          </FigmaSupportPanel>

          <FigmaSupportPanel className="figma-support-form-panel" data-section="media-upload-fields">
            <h2>Required metadata</h2>
            {model.fields.map((field) => <FieldControl key={field.id} field={field} />)}
          </FigmaSupportPanel>

          <FigmaSupportGrid className="figma-support-state-grid" data-section="media-upload-states" data-state-note={model.sections.states.notes.join(" ")}>
            <h2>Upload states</h2>
            {model.sections.states.notes.map((note) => <article key={note} data-state={note}>{note}</article>)}
          </FigmaSupportGrid>

          <footer className="figma-support-actions" data-section="media-upload-actions">
            {model.actions.map((action) => <button key={action.id} type={action.type} data-action={action.id}>{action.label}</button>)}
          </footer>
        </form>
      </section>
    </section>
  );
}