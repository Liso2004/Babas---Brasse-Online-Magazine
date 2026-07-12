import * as launchFixtures from "../data/launchFixtures.js";
import { FigmaProfileCard } from "../components/FigmaProfileCard.jsx";
import { buildContributorsRouteModel } from "./contributorsRouteModel.js";

export function ContributorsPage({ fixtures = launchFixtures }) {
  const model = buildContributorsRouteModel(fixtures);
  const { hero, sections } = model;

  return (
    <section className="figma-public-page figma-contributors-page" data-page="contributors" data-route={model.route.path} data-generated={model.generatedFrom} data-prototype-file={model.route.prototypeFile}>
      <header data-section="contributors-intro" className="figma-page-intro">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1>{hero.title}</h1>
        <p>{hero.dek}</p>
      </header>

      <section data-section="contributors-grid" className="figma-content-section" data-state={sections.contributorsGrid.state}>
        <div className="section-heading-row">
          <h2>{sections.contributorsGrid.heading}</h2>
          <a href="/contact">Submit writing</a>
        </div>
        {sections.contributorsGrid.state === "no-results" ? (
          <div className="figma-empty-state" data-state="no-results">
            <p>{sections.contributorsGrid.body}</p>
            <a data-action="reset-filter" href={sections.contributorsGrid.resetHref}>View contributors</a>
          </div>
        ) : (
          <div className="figma-profile-grid">
            {sections.contributorsGrid.items.map((profile) => <FigmaProfileCard key={profile.id} profile={profile} showPublishedWorks />)}
          </div>
        )}
      </section>

      <section data-section="published-works" className="figma-content-section">
        <div className="section-heading-row">
          <h2>{sections.publishedWorks.heading}</h2>
          <a href="/visceral-mag">Read articles</a>
        </div>
        <div className="figma-more-list__items">
          {sections.publishedWorks.items.map((article) => (
            <article key={article.id} className="published-work-row figma-more-list__item" data-article={article.slug} data-status={article.status} data-category={article.category.slug}>
              <a href={article.href}>{article.title}</a>
              <span>{article.category.label}</span>
              <span>{article.author.name}</span>
              <span>{article.publishedAt || "Upcoming"}</span>
            </article>
          ))}
        </div>
      </section>

    </section>
  );
}