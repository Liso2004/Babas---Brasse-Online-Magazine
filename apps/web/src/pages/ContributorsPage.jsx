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
          <div className="stitch-contributor-directory" role="table" aria-label="Contributor directory">
            <div className="stitch-directory-header" role="row">
              <span role="columnheader">ID</span>
              <span role="columnheader">Name</span>
              <span role="columnheader">Role</span>
              <span role="columnheader">Latest work</span>
            </div>
            {sections.contributorsGrid.items.map((profile, index) => {
              const latestWork = profile.publishedWorks?.[0];
              const profileHref = profile.href || "/people/" + profile.slug;
              return (
                <article key={profile.id} className="stitch-directory-row" role="row" data-profile={profile.slug}>
                  <span className="stitch-directory-id" role="cell">{String(index + 1).padStart(3, "0")}</span>
                  <h3 role="cell"><a href={profileHref}>{profile.name}</a></h3>
                  <p role="cell">{profile.role}</p>
                  <p className="stitch-directory-latest" role="cell">
                    {latestWork ? <a href={latestWork.href}>{latestWork.title}</a> : <span>No published work yet</span>}
                    <ArrowRight size={20} aria-hidden="true" />
                  </p>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </section>
  );
}
