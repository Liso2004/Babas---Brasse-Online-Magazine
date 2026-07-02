function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const navSections = ["Theatre", "Books", "Essays", "Opinion", "Culture"];

function getCreativeTeamProfiles(fixtures) {
  return fixtures.profiles.filter((profile) => profile.type === "creative_team");
}

function renderLandingNav() {
  return `<nav data-section="landing-nav" data-nav-height="76" aria-label="Primary editorial navigation">
    <a class="brand-mark" href="/" aria-label="Babas and Brasse home">B&amp;B</a>
    <div class="editorial-links">
      ${navSections.map((section) => `<a data-nav-link="${section.toLowerCase()}" href="/search?category=${section.toLowerCase()}">${section}</a>`).join("\n      ")}
    </div>
    <label class="search-entry">Search <input name="q" type="search" placeholder="Search articles"></label>
    <a class="subscribe-cta" href="#team-footer">Subscribe</a>
  </nav>`;
}

function renderProfileCard(profile) {
  const hasSocialLinks = Array.isArray(profile.socialLinks) && profile.socialLinks.length > 0;

  return `<article class="profile-card" data-profile="${escapeHtml(profile.slug)}" data-profile-type="${escapeHtml(profile.type)}" ${hasSocialLinks ? "" : "data-state-note=\"social-links-empty\""}>
      <img src="/media/profile-placeholder.jpg" alt="Portrait placeholder for ${escapeHtml(profile.name)}">
      <div class="profile-copy">
        <p class="eyebrow">${escapeHtml(profile.role)}</p>
        <h3>${escapeHtml(profile.name)}</h3>
        <p>${escapeHtml(profile.shortBio)}</p>
        <nav aria-label="Social links for ${escapeHtml(profile.name)}">
          ${hasSocialLinks ? profile.socialLinks.map((link) => `<a href="${escapeHtml(link.url)}">${escapeHtml(link.label)}</a>`).join("\n          ") : `<span data-state-note="social-links-empty">Social links pending</span>`}
        </nav>
      </div>
    </article>`;
}

function renderTeamGrid(teamProfiles) {
  if (teamProfiles.length === 0) {
    return `<section data-section="team-grid" data-state="empty-team">
    <h2>No public creative team profiles are published yet</h2>
    <p>Keep the route available while editorial profiles are drafted in admin.</p>
    <a href="/contact">Contact the editors</a>
  </section>`;
  }

  return `<section data-section="team-grid" data-state="ready">
    <h2>Creative Team</h2>
    ${teamProfiles.map(renderProfileCard).join("\n    ")}
  </section>`;
}

function renderTeamStates() {
  return `<section data-section="team-states" data-state-note="team-loading" data-state-note="team-error">
    <h2>Profile states</h2>
    <article data-state="loading">Loading team profiles</article>
    <article data-state="empty">No public team profiles</article>
    <article data-state="error">Team profiles failed to load</article>
    <article data-state="social">Social links pending</article>
  </section>`;
}

function renderTeamFooter() {
  return `<footer data-section="team-footer" id="team-footer">
    <h2>Team path</h2>
    <p>Readers can continue from the team to contributor profiles or get in touch with the editors.</p>
    <nav aria-label="Creative Team footer links">
      <a href="/contributors">Contributors</a>
      <a href="/contact">Contact</a>
      <a href="/about">About</a>
    </nav>
  </footer>`;
}

function renderCreativeTeamPage(fixtures) {
  const teamProfiles = getCreativeTeamProfiles(fixtures);

  return `<section data-page="creative-team" data-route="/creative-team" data-generated="creative-team-renderer" data-wireframe-source="creative-team.html" data-responsive="desktop-3-up tablet-2-up mobile-1-up">
  ${renderLandingNav()}

  <header data-section="team-intro">
    <p class="eyebrow">Creative Team</p>
    <h1>The people shaping Babas &amp; Brasse.</h1>
    <p>Editorial roles stay visible so readers understand who owns product direction, development, and publication decisions.</p>
    <aside data-section="editorial-role-note">
      <h2>Editorial roles</h2>
      <p>Profile records need a public role, short bio, image alt text, and social-link labels before launch.</p>
    </aside>
  </header>

  ${renderTeamGrid(teamProfiles)}

  ${renderTeamStates()}

  ${renderTeamFooter()}
</section>`;
}

module.exports = {
  getCreativeTeamProfiles,
  renderCreativeTeamPage
};
