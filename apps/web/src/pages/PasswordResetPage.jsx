import { FigmaSupportGrid, FigmaSupportPanel } from "../components/FigmaSupportSurface.jsx";
import { buildPasswordResetRouteModel } from "./adminAuthRouteModel.js";

export function PasswordResetPage() {
  const model = buildPasswordResetRouteModel();

  return (
    <section className="figma-support-page figma-auth-page figma-password-reset-page" data-page="password-reset" data-route={model.route.path} data-generated={model.generatedFrom} data-prototype-file={model.route.prototypeFile} data-support-route="auth">
      <header className="figma-support-header" data-section="auth-support-header">
        <a className="brand-mark" href={model.header.href}>{model.header.brand}</a>
        <p>{model.header.label}</p>
      </header>

      <section className="figma-auth-shell" data-section="reset-request">
        <FigmaSupportPanel as="div" className="figma-support-form-panel">
          <p className="eyebrow">{model.hero.eyebrow}</p>
          <h1>{model.hero.title}</h1>
          <form action={model.request.action} method={model.request.method} data-form="password-reset-request">
            {model.request.fields.map((field) => (
              <label key={field.name} htmlFor={field.id}>
                {field.label}
                <input id={field.id} name={field.name} type={field.type} autoComplete={field.autocomplete} required={field.required} />
              </label>
            ))}
            <button type="submit" data-action={model.request.submitAction}>{model.request.submitLabel}</button>
          </form>
          <p>{model.request.neutralCopy}</p>
        </FigmaSupportPanel>
      </section>

      <FigmaSupportPanel className="figma-support-form-panel" data-section="reset-confirm" data-security-note="token-expiry" data-security-note-secondary="rate-limit">
        <h2>Confirm reset</h2>
        <form action={model.confirm.action} method={model.confirm.method} data-form="password-reset-confirm">
          {model.confirm.fields.map((field) => (
            <label key={field.name} htmlFor={field.id}>
              {field.label}
              <input id={field.id} name={field.name} type={field.type} autoComplete={field.autocomplete} required={field.required} />
            </label>
          ))}
          <p>{model.confirm.strengthCopy}</p>
          <button type="submit" data-action={model.confirm.submitAction}>{model.confirm.submitLabel}</button>
        </form>
      </FigmaSupportPanel>

      <FigmaSupportGrid className="figma-support-state-grid" data-section="reset-states" data-state-note="reset-email-sent" data-state-note-secondary="reset-token-expired">
        <h2>Password reset states</h2>
        {model.sections.states.items.map((state) => <article key={state} data-state={state}>{state}</article>)}
        <a href={model.returnLink.href}>Admin Login</a>
      </FigmaSupportGrid>

      <FigmaSupportPanel className="figma-support-copy-panel" data-section="reset-return">
        <h2>Return path</h2>
        <a href={model.returnLink.href}>{model.returnLink.label}</a>
        <p>Support note keeps editors from getting trapped in the auth flow.</p>
      </FigmaSupportPanel>
    </section>
  );
}