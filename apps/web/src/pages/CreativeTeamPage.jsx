import fixturesModule from "../../../../src/content/fixtures.js";
import { buildCreativeTeamRouteModel } from "./creativeTeamRouteModel.js";

const launchFixtures = fixturesModule.default || fixturesModule;

export function CreativeTeamPage({ fixtures = launchFixtures }) {
  const model = buildCreativeTeamRouteModel(fixtures);
  const { hero, editorialRoleNote, sections, footer } = model;

  return (
    <section data-page="creative-team" data-route={model.route.path} data-generated={model.generatedFrom} data-prototype-file={model.route.prototypeFile}>
      <header data-section="team-intro">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1>{hero.title}</h1>
        <p>{hero.dek}</p>
        <aside data-section="editorial-role-note">
          <h2>{editorialRoleNote.heading}</h2>
          <p>{editorialRoleNote.body}</p>
        </aside>
      </header>

      <section data-section="team-grid" data-state={sections.teamGrid.state}>
        <h2>{sections.teamGrid.heading}</h2>
        {sections.teamGrid.state === "empty-team" ? (
          <div data-state="empty-team">
            <p>{sections.teamGrid.body}</p>
            <a href={sections.teamGrid.contactHref}>Contact the editors</a>
          </div>
        ) : sections.teamGrid.items.map((profile) => (
          <article key={profile.id} className="profile-card" data-profile={profile.slug} data-profile-type={profile.type} data-state-note={profile.stateNotes[0]}>
            <img src={profile.image.url} alt={profile.image.altText} />
            <div className="profile-copy">
              <p className="eyebrow">{profile.role}</p>
              <h3>{profile.name}</h3>
              <p>{profile.shortBio}</p>
              <nav aria-label={`Social links for ${profile.name}`}>
                {profile.socialLinks.length > 0 ? profile.socialLinks.map((link) => <a key={link.url} href={link.url}>{link.label}</a>) : <span data-state-note="social-links-empty">Social links pending</span>}
              </nav>
            </div>
          </article>
        ))}
      </section>

      <section data-section="team-states" data-state-note="team-loading" data-state-note-secondary="team-error">
        <h2>Profile states</h2>
        {sections.states.items.map((state) => <article key={state} data-state={state}>{state}</article>)}
      </section>

      <footer data-section="team-footer">
        <h2>{footer.heading}</h2>
        <p>{footer.body}</p>
        <nav aria-label="Creative Team footer links">
          {footer.links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
        </nav>
      </footer>
    </section>
  );
}
