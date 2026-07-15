import * as launchFixtures from "../data/launchFixtures.js";
import { buildAboutRouteModel } from "./aboutRouteModel.js";
import { NewsletterSignup } from "../components/NewsletterSignup.jsx";

export function AboutPage({ fixtures = launchFixtures }) {
  const model = buildAboutRouteModel(fixtures);
  const { hero, sections, newsletter } = model;

  return (
    <section className="figma-public-page figma-about-page" data-design-reference="about-brutalist-manifest" data-page="about" data-generated={model.generatedFrom} data-prototype-file={model.route.prototypeFile}>
      <header data-section="about-intro" className="figma-page-intro">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1>{hero.title}</h1>
        <p>{hero.dek}</p>
      </header>

      <section data-section="about-overview" className="figma-about-overview" data-state-note={sections.overview.stateNote}>
        <div className="figma-about-overview__copy">
          <article data-about-block="mission">
            <p className="eyebrow">Mission</p>
            <h2>Mission</h2>
            <p>{sections.overview.mission}</p>
          </article>
          <article data-about-block="vision">
            <p className="eyebrow">Vision</p>
            <h2>Vision</h2>
            <p>{sections.overview.vision}</p>
          </article>
        </div>
        <figure data-about-block="organisation">
          <img src={sections.overview.image.url} alt={sections.overview.image.altText} />
          <figcaption><strong>Organisation</strong> {sections.overview.organisation}</figcaption>
        </figure>
      </section>

      <section data-section="editorial-pillars" className="figma-content-section">
        <div className="section-heading-row">
          <h2>Editorial pillars</h2>
          <a href="/visceral-mag">Read Visceral Mag</a>
        </div>
        <div className="figma-info-grid">
          {sections.editorialPillars.map((pillar) => (
            <article key={pillar.slug} className="pillar-card" data-pillar={pillar.slug}>
              <p className="eyebrow">{pillar.label}</p>
              <h3>{pillar.label}</h3>
              <p>{pillar.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section data-section="about-route-cards" className="figma-content-section">
        <div className="section-heading-row">
          <h2>Continue through Babas & Brasse</h2>
        </div>
        <div className="figma-route-grid">
          {sections.routeCards.map((card) => (
            <article key={card.href} className="route-card">
              <h3>{card.label}</h3>
              <p>{card.body}</p>
              <a href={card.href}>Open {card.label}</a>
            </article>
          ))}
        </div>
      </section>

      <footer data-section="newsletter-footer" id={newsletter.id}>
        <div className="figma-newsletter-panel">
          <h2>Stay Connected</h2>
          <NewsletterSignup idPrefix="about-newsletter" />
        </div>
      </footer>
    </section>
  );
}