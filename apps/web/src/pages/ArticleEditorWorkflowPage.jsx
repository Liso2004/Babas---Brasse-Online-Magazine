import { FigmaSupportGrid, FigmaSupportPanel } from "../components/FigmaSupportSurface.jsx";
import { buildArticleEditorWorkflowRouteModel } from "./adminWorkflowSupportRouteModel.js";

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

export function ArticleEditorWorkflowPage() {
  const model = buildArticleEditorWorkflowRouteModel();

  return (
    <section className="figma-support-page figma-workflow-page" data-page="article-editor-workflow" data-route={model.route.path} data-generated={model.generatedFrom} data-prototype-file={model.route.prototypeFile} data-auth-required={model.authRequired} data-responsive={model.responsive}>
      <header className="figma-support-hero" data-section="editor-workflow-intro">
        <p className="eyebrow">{model.intro.eyebrow}</p>
        <h1>{model.intro.title}</h1>
        <p>{model.intro.body}</p>
      </header>

      <FigmaSupportGrid className="figma-workflow-shell" data-section="editor-steps" aria-label="Article editor workflow steps">
        <h2>Workflow steps</h2>
        {model.steps.map((step, index) => <article key={step.id} data-step={step.id} aria-current={index === 0 ? "step" : "false"}><strong>{step.label}</strong><p>{step.description}</p></article>)}
      </FigmaSupportGrid>

      <form className="figma-support-form-grid" data-form={model.form.id} action={model.form.action} method={model.form.method}>
        <FigmaSupportPanel className="figma-support-form-panel" data-section="editor-workspace">
          <h2>Body editor</h2>
          {model.workspace.fields.map((field) => <FieldControl key={field.id} field={field} />)}
        </FigmaSupportPanel>

        <FigmaSupportGrid className="figma-support-state-grid" data-section="editor-readiness-checklist">
          <h2>Readiness checklist</h2>
          {model.checklist.map((item) => <label key={item.id} data-checklist-item={item.id}><input type="checkbox" name={item.id} /> {item.label}</label>)}
        </FigmaSupportGrid>

        <FigmaSupportPanel className="figma-support-form-panel" data-section="editor-seo-review">
          <h2>SEO review</h2>
          {model.seo.fields.map((field) => <FieldControl key={field.id} field={field} />)}
        </FigmaSupportPanel>

        <FigmaSupportGrid className="figma-support-state-grid" data-section="editor-publish-states" data-state-note={model.sections.publishStates.notes.join(" ")}>
          <h2>Publish states</h2>
          {model.sections.publishStates.notes.map((note) => <article key={note} data-state={note}>{note}</article>)}
        </FigmaSupportGrid>

        <footer className="figma-support-actions" data-section="editor-workflow-actions">
          {model.actions.map((action) => <button key={action.id} type={action.type} data-action={action.id}>{action.label}</button>)}
        </footer>
      </form>
    </section>
  );
}