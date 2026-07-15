import * as launchFixtures from "../data/launchFixtures.js";
import { FigmaProfileCard } from "../components/FigmaProfileCard.jsx";
import { buildCreativeTeamRouteModel } from "./creativeTeamRouteModel.js";

export function CreativeTeamPage({ fixtures = launchFixtures }) {
  const model = buildCreativeTeamRouteModel(fixtures);
  const { hero, editorialRoleNote, sections, footer } = model;

  return (
    <section className="figma-public-page figma-team-page" data-page="creative-team" data-design-reference="creative-team-v4" data-route={model.route.path} data-generated={model.generatedFrom} data-prototype-file={model.route.prototypeFile}>
      <header data-section="team-intro" className="figma-page-intro">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1>{hero.title}</h1>
        <p>{hero.dek}</p>
        <aside data-section="editorial-role-note" className="figma-editorial-note">
          <h2>{editorialRoleNote.heading}</h2>
          <p>{editorialRoleNote.body}</p>
        </aside>
      </header>

      <section data-section="team-grid" className="figma-content-section" data-state={sections.teamGrid.state}>
        <div className="section-heading-row">
          <h2>{sections.teamGrid.heading}</h2>
          <a href="/contact">Contact the editors</a>
        </div>
        {sections.teamGrid.state === "empty-team" ? (
          <div className="figma-empty-state" data-state="empty-team">
            <p>{sections.teamGrid.body}</p>
            <a href={sections.teamGrid.contactHref}>Contact the editors</a>
          </div>
        ) : (
          <div className="figma-profile-grid">
            {sections.teamGrid.items.map((profile) => <FigmaProfileCard key={profile.id} profile={profile} />)}
          </div>
        )}
      </section>

      <footer data-section="team-footer" className="figma-content-section">
        <h2>{footer.heading}</h2>
        <p>{footer.body}</p>
        <nav aria-label="Creative Team footer links">
          {footer.links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
        </nav>
      </footer>
    </section>
  );
}