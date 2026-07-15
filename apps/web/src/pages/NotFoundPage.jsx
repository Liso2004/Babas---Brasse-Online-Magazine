import { FigmaSupportGrid, FigmaSupportPanel } from "../components/FigmaSupportSurface.jsx";
import { buildNotFoundRouteModel } from "./errorSupportRouteModel.js";

function RecoveryRoutes({ routes }) {
  return (
    <FigmaSupportGrid className="figma-support-route-grid" data-section="recovery-routes">
      <h2>Helpful paths</h2>
      {routes.map((route) => (
        <a className="route-card" key={route.href} href={route.href}>
          <strong>{route.label}</strong>
          <span>{route.body}</span>
        </a>
      ))}
    </FigmaSupportGrid>
  );
}

export function NotFoundPage() {
  const model = buildNotFoundRouteModel();

  return (
    <section className="figma-support-page figma-error-page figma-not-found-page" data-page="not-found" data-route={model.route.path} data-generated={model.generatedFrom} data-prototype-file={model.route.prototypeFile} data-support-route="error" data-responsive={model.responsive}>
      <FigmaSupportPanel className="figma-support-hero" data-section="not-found-message">
        <p className="eyebrow">{model.message.eyebrow}</p>
        <h1>{model.message.title}</h1>
        <p>{model.message.copy}</p>
        <a href={model.primaryAction.href} data-action={model.primaryAction.id}>{model.primaryAction.label}</a>
      </FigmaSupportPanel>
      <RecoveryRoutes routes={model.recoveryRoutes} />
      <FigmaSupportGrid className="figma-support-state-grid" data-section="not-found-states" data-state-note={model.sections.states.notes.join(" ")}>
        <h2>State coverage</h2>
        {model.sections.states.items.map((state) => <article key={state.id} data-state={state.id}>{state.body}</article>)}
      </FigmaSupportGrid>
      <footer className="figma-support-footer" data-section="support-footer"><p>{model.sections.footer.body}</p></footer>
    </section>
  );
}