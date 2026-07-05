import fixturesModule from "../../../../src/content/fixtures.js";
import { buildContributorsRouteModel } from "./contributorsRouteModel.js";

const launchFixtures = fixturesModule.default || fixturesModule;

export function ContributorsPage({ fixtures = launchFixtures }) {
  const model = buildContributorsRouteModel(fixtures);
  const { hero, tools, sections } = model;

  return (
    <section data-page="contributors" data-route={model.route.path} data-generated={model.generatedFrom} data-prototype-file={model.route.prototypeFile}>
      <header data-section="contributors-intro">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1>{hero.title}</h1>
        <p>{hero.dek}</p>
      </header>

      <section data-section="contributors-tools">
        <label htmlFor={tools.search.id}>{tools.search.label}</label>
        <input id={tools.search.id} name={tools.search.name} type={tools.search.type} placeholder={tools.search.placeholder} />
        <div className="chip-row" aria-label="Contributor category filters">
          {tools.filters.map((filter) => <button key={filter.slug} type="button" data-filter-category={filter.slug} aria-pressed={filter.pressed ? "true" : "false"}>{filter.label}</button>)}
        </div>
      </section>

      <section data-section="contributors-grid" data-state={sections.contributorsGrid.state}>
        <h2>{sections.contributorsGrid.heading}</h2>
        {sections.contributorsGrid.state === "no-results" ? (
          <div data-state="no-results">
            <p>{sections.contributorsGrid.body}</p>
            <a data-action="reset-filter" href={sections.contributorsGrid.resetHref}>Reset filters</a>
          </div>
        ) : sections.contributorsGrid.items.map((profile) => (
          <article key={profile.id} className="profile-card" data-profile={profile.slug} data-profile-type={profile.type}>
            <img src={profile.image.url} alt={profile.image.altText} />
            <div className="profile-copy">
              <p className="eyebrow">{profile.role}</p>
              <h3>{profile.name}</h3>
              <p>{profile.shortBio}</p>
              <p>{profile.publishedWorks.length} published work{profile.publishedWorks.length === 1 ? "" : "s"}</p>
              <nav aria-label={`Published works by ${profile.name}`}>
                {profile.publishedWorks.length > 0 ? profile.publishedWorks.map((article) => <a key={article.id} href={article.href}>{article.title}</a>) : <span data-state="no-published-works">No published works yet</span>}
              </nav>
            </div>
          </article>
        ))}
      </section>

      <section data-section="published-works">
        <h2>{sections.publishedWorks.heading}</h2>
        {sections.publishedWorks.items.map((article) => (
          <article key={article.id} className="published-work-row" data-article={article.slug} data-status={article.status} data-category={article.category.slug}>
            <a href={article.href}>{article.title}</a>
            <span>{article.category.label}</span>
            <span>{article.author.name}</span>
            <span>{article.publishedAt || "Unscheduled"}</span>
          </article>
        ))}
      </section>

      <section data-section="contributors-states" data-state-note="contributors-loading" data-state-note-secondary="contributors-error">
        <h2>Contributor states</h2>
        {sections.states.items.map((state) => <article key={state} data-state={state}>{state}</article>)}
      </section>
    </section>
  );
}
