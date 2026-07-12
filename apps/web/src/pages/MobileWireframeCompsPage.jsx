import { FigmaSupportGrid, FigmaSupportPanel } from "../components/FigmaSupportSurface.jsx";
import { buildMobileWireframeCompsRouteModel } from "./mobileWireframeCompsRouteModel.js";

export function MobileWireframeCompsPage() {
  const model = buildMobileWireframeCompsRouteModel();
  const adminRules = [...new Set(model.adminComps.map((comp) => comp.rule))];

  return (
    <section className="figma-support-page figma-mobile-handoff-page" data-page="mobile-wireframe-comps" data-route={model.route.path} data-generated={model.generatedFrom} data-prototype-file={model.route.prototypeFile} data-responsive={model.responsive}>
      <header className="figma-mobile-handoff-nav" data-section="mobile-nav" data-nav-behavior={model.nav.behavior}>
        <a className="brand-mark" href={model.nav.brandHref} aria-label={model.nav.brandLabel}>B&amp;B</a>
        <button type="button" data-action={model.nav.menuAction} aria-expanded="false">Menu</button>
        <label>Search <input name="mobile-search" type="search" placeholder="Search" /></label>
      </header>

      <FigmaSupportPanel className="figma-support-hero" data-section="mobile-wireframe-intro">
        <p className="eyebrow">{model.intro.eyebrow}</p>
        <h1>{model.intro.title}</h1>
        <p>{model.intro.body}</p>
      </FigmaSupportPanel>

      <FigmaSupportGrid className="figma-mobile-grid" data-section="mobile-public-comps" aria-label="Public mobile wireframe comps">
        <h2>Public mobile comps</h2>
        {model.publicComps.map((comp) => <article key={comp.id} data-mobile-comp={comp.id} data-route={comp.route} data-stack-order={comp.stackOrder}><h3>{comp.label}</h3><p>{comp.note}</p></article>)}
      </FigmaSupportGrid>

      <FigmaSupportGrid className="figma-mobile-grid" data-section="mobile-admin-comps" aria-label="Admin mobile wireframe comps">
        <h2>Admin mobile comps</h2>
        {adminRules.map((rule) => <span key={rule} data-mobile-admin-rule={rule}>{rule}</span>)}
        {model.adminComps.map((comp) => <article key={comp.id} data-mobile-comp={comp.id} data-route={comp.route} data-mobile-admin-rule-ref={comp.rule}><h3>{comp.label}</h3><p>{comp.note}</p></article>)}
      </FigmaSupportGrid>

      <FigmaSupportGrid className="figma-mobile-grid" data-section="mobile-breakpoints" aria-label="Mobile breakpoint handoff">
        <h2>Breakpoints</h2>
        {model.breakpoints.map((breakpoint) => <article key={breakpoint.width} data-breakpoint={breakpoint.width} data-layout-rule={breakpoint.layoutRule}><strong>{breakpoint.width}px</strong><p>{breakpoint.label}</p></article>)}
      </FigmaSupportGrid>

      <FigmaSupportGrid className="figma-mobile-grid figma-support-state-grid" data-section="mobile-a11y" data-min-touch-target={model.a11y.minTouchTarget} aria-label="Mobile accessibility handoff">
        <h2>Accessibility handoff</h2>
        {model.a11y.checks.map((check) => <article key={check.id} data-a11y-check={check.id}><h3>{check.label}</h3><p>{check.detail}</p></article>)}
      </FigmaSupportGrid>
    </section>
  );
}