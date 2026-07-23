import { Link } from "react-router-dom";
import * as launchFixtures from "../data/launchFixtures.js";
import { buildAboutRouteModel } from "./aboutRouteModel.js";

export function AboutPage({ fixtures = launchFixtures }) {
  const model = buildAboutRouteModel(fixtures);
  const { hero, sections } = model;

  return (
    <section className="figma-public-page figma-about-page about-editorial-page" data-design-reference="about-brutalist-manifest" data-page="about" data-generated={model.generatedFrom} data-prototype-file={model.route.prototypeFile}>
      <header data-section="about-intro" className="figma-page-intro about-editorial-hero">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1>{hero.title}</h1>
        <p>{hero.dek}</p>
      </header>

      <section data-section="about-who-we-are" className="about-editorial-section">
        <div className="about-editorial-copy">
          <h2>Who are we?</h2>
          {sections.overview.whoWeAre.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <p className="about-editorial-standfirst">{sections.overview.collective}</p>
        </div>
      </section>

      <section data-section="about-name" className="about-editorial-section about-editorial-section--split">
        <figure>
          <img src={sections.overview.image.url} alt={sections.overview.image.altText} />
        </figure>
        <div className="about-editorial-copy">
          <h2>What&apos;s in the name?</h2>
          {sections.overview.name.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>

      <section data-section="about-creative-team" className="about-editorial-section">
        <div className="section-heading-row">
          <h2>Meet the creative team</h2>
          <Link to="/creative-team">View all</Link>
        </div>
        <div className="about-team-grid">
          {sections.creativeTeam.map((member) => (
            <Link key={member.id} to={member.href} className="about-team-card" aria-label={`Open ${member.name} profile`}>
              <span className="about-team-card__media">
                <img src={member.image.url} alt={member.image.altText} />
              </span>
              <span className="about-team-card__body">
                <span className="eyebrow">{member.role}</span>
                <strong>{member.name}</strong>
                <span>{member.shortBio}</span>
              </span>
            </Link>
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
              <Link to={card.href}>Open {card.label}</Link>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
