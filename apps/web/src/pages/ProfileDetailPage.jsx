import { Link } from "react-router-dom";
import * as launchFixtures from "../data/launchFixtures.js";
import { buildProfileDetailRouteModel } from "./profileDetailRouteModel.js";

function ProfileLink({ link }) {
  return /^https?:\/\//i.test(link.url)
    ? <a href={link.url} target="_blank" rel="noreferrer">{link.label}</a>
    : <Link to={link.url}>{link.label}</Link>;
}

export function ProfileDetailPage({ slug, fixtures = launchFixtures }) {
  const model = buildProfileDetailRouteModel(fixtures, slug);

  if (model.state === "not-found") {
    return (
      <section className="figma-public-page figma-profile-detail" data-page="profile-detail" data-state="not-found">
        <header className="figma-page-intro"><p className="eyebrow">Profile unavailable</p><h1>This profile could not be found.</h1><p>It may be unpublished or have moved.</p></header>
        <section className="figma-content-section"><Link to={model.backHref}>Return to the directory</Link></section>
      </section>
    );
  }

  const { profile, publishedWorks, visualResearch } = model;
  const directoryLabel = profile.type === "creative_team" ? "Creative team" : "Contributors";

  return (
    <article className="figma-public-page figma-profile-detail" data-page="profile-detail" data-design-reference="profile-detail-v5" data-generated={model.generatedFrom} data-slug={profile.slug}>
      <header className="profile-detail-hero" data-section="profile-hero">
        <img src={profile.image.url} alt={profile.image.altText} />
        <div>
          <nav className="figma-breadcrumb" aria-label="Breadcrumb"><Link to={model.backHref}>{directoryLabel}</Link><span aria-hidden="true">/</span><span>{profile.name}</span></nav>
          <p className="eyebrow">{profile.role}</p>
          <h1 id="profile-name">{profile.name}</h1>
          <p className="profile-detail-bio">{profile.fullBio}</p>
          <nav className="profile-detail-links" aria-label={`${profile.name} links`}>
            {profile.socialLinks.length ? profile.socialLinks.map((link) => <ProfileLink key={`${link.label}-${link.url}`} link={link} />) : <Link to="/contact">Contact via URBAN ANARCHY</Link>}
          </nav>
        </div>
      </header>

      <section className="figma-content-section profile-detail-work" data-section="profile-work" aria-labelledby="profile-work-heading">
        <div className="section-heading-row"><h2 id="profile-work-heading">Published work</h2><Link to="/visceral-mag">View Visceral Mag</Link></div>
        {publishedWorks.length ? (
          <div className="profile-detail-work__grid">
            {publishedWorks.map((article) => <article key={article.id} className="related-card"><p className="eyebrow">{article.category.label}</p><h3><Link to={article.href}>{article.title}</Link></h3><p>{article.dek}</p><Link to={article.href}>Read dispatch</Link></article>)}
          </div>
        ) : <p className="profile-detail-empty">No published work is attached to this profile yet.</p>}
      </section>

      {visualResearch?.length ? (
        <section className="figma-content-section urban-profile-visual-research" data-section="profile-visual-research" aria-labelledby="profile-visual-research-heading">
          <div className="section-heading-row"><h2 id="profile-visual-research-heading">Visual research</h2><Link to="/moodboard">Open archive</Link></div>
          <div className="urban-related-material__list">
            {visualResearch.slice(0, 4).map((item) => <Link key={item.id} to={item.href}><img src={item.image.url} alt={item.image.altText} /><span>Specimen {item.specimen}</span><strong>{item.title}</strong></Link>)}
          </div>
        </section>
      ) : null}

      <footer className="figma-content-section profile-detail-footer" data-section="profile-footer"><Link to={model.backHref}>Back to {directoryLabel.toLowerCase()}</Link></footer>
    </article>
  );
}
