import { ArrowRight } from "lucide-react";
import * as launchFixtures from "../data/launchFixtures.js";
import { buildContributorsRouteModel } from "./contributorsRouteModel.js";

export function ContributorsPage({ fixtures = launchFixtures }) {
  const model = buildContributorsRouteModel(fixtures);
  const { hero, sections } = model;

  return (
    <section className="figma-public-page figma-contributors-page" data-page="contributors" data-design-reference="contributors-directory-v4" data-route={model.route.path} data-generated={model.generatedFrom} data-prototype-file={model.route.prototypeFile}>
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
          <div className="stitch-contributor-directory contributor-profile-grid" aria-label="Contributor profiles">
            {sections.contributorsGrid.items.map((profile, index) => {
              const latestWork = profile.publishedWorks?.[0];
              const profileHref = profile.href || "/people/" + profile.slug;
              return (
                <article key={profile.id} className="contributor-profile-card" data-profile={profile.slug}>
                  <a className="contributor-profile-card__image" href={profileHref} aria-label={`Open ${profile.name}'s profile`}>
                    <img src={profile.image.url} alt={profile.image.altText} />
                    <span>{String(index + 1).padStart(3, "0")}</span>
                  </a>
                  <div className="contributor-profile-card__body">
                    <p className="eyebrow">{profile.role}</p>
                    <h3><a href={profileHref}>{profile.name}</a></h3>
                    <p>{profile.shortBio}</p>
                    <a className="contributor-profile-card__work" href={latestWork?.href || profileHref}>
                      {latestWork?.title || "Open profile"}<ArrowRight size={18} aria-hidden="true" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </section>
  );
}
