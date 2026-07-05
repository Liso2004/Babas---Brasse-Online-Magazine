import fixturesModule from "../../../../src/content/fixtures.js";
import { buildAboutRouteModel } from "./aboutRouteModel.js";

const launchFixtures = fixturesModule.default || fixturesModule;

export function AboutPage({ fixtures = launchFixtures }) {
  const model = buildAboutRouteModel(fixtures);
  const { hero, sections, newsletter } = model;

  return (
    <section data-page="about" data-generated={model.generatedFrom} data-prototype-file={model.route.prototypeFile}>
      <header data-section="about-intro">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1>{hero.title}</h1>
        <p>{hero.dek}</p>
      </header>

      <section data-section="about-overview" data-state-note={sections.overview.stateNote}>
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
        <figure data-about-block="organisation">
          <img src={sections.overview.image.url} alt={sections.overview.image.altText} />
          <figcaption><strong>Organisation</strong> {sections.overview.organisation}</figcaption>
        </figure>
      </section>

      <section data-section="editorial-pillars">
        <h2>Editorial pillars</h2>
        {sections.editorialPillars.map((pillar) => (
          <article key={pillar.slug} className="pillar-card" data-pillar={pillar.slug}>
            <p className="eyebrow">{pillar.label}</p>
            <h3>{pillar.label}</h3>
            <p>{pillar.description}</p>
          </article>
        ))}
      </section>

      <section data-section="about-route-cards">
        <h2>Continue through Babas & Brasse</h2>
        {sections.routeCards.map((card) => (
          <article key={card.href} className="route-card">
            <h3>{card.label}</h3>
            <p>{card.body}</p>
            <a href={card.href}>Open {card.label}</a>
          </article>
        ))}
      </section>

      <footer data-section="newsletter-footer" id={newsletter.id}>
        <h2>Stay Connected</h2>
        <form action={newsletter.action} method="post">
          <label>Email <input name="email" type="email" placeholder="your@email.com" /></label>
          <button type="submit">Subscribe</button>
        </form>
      </footer>
    </section>
  );
}
