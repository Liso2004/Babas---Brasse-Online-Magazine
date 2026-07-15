import { Link } from "react-router-dom";
import * as launchFixtures from "../data/launchFixtures.js";
import { FigmaArticleCard } from "../components/FigmaArticleCard.jsx";
import { buildProfileDetailRouteModel } from "./profileDetailRouteModel.js";

function ProfileLink({ link }) {
  const isExternal = /^https?:\/\//i.test(link.url);
  return isExternal
    ? <a href={link.url} target="_blank" rel="noreferrer">{link.label}</a>
    : <Link to={link.url}>{link.label}</Link>;
}

export function ProfileDetailPage({ slug, fixtures = launchFixtures }) {
  const model = buildProfileDetailRouteModel(fixtures, slug);

  if (model.state === "not-found") {
    return (
      <section className="figma-public-page figma-profile-detail" data-page="profile-detail" data-state="not-found">
        <p className="eyebrow">Profile unavailable</p>
        <h1>This profile could not be found.</h1>
        <p>It may be unpublished or have moved.</p>
        <Link to={model.backHref}>Browse contributors</Link>
      </section>
    );
  }

  const { profile, publishedWorks } = model;

  return (
    <article className="figma-public-page figma-profile-detail" data-page="profile-detail" data-design-reference="profile-detail-v4" data-route={model.route.path} data-profile={profile.slug}>
      <nav className="figma-breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link><span aria-hidden="true">/</span>
        <Link to={model.backHref}>{profile.type === "creative_team" ? "Creative Team" : "Contributors"}</Link>
        <span aria-hidden="true">/</span><span>{profile.name}</span>
      </nav>

      <header className="profile-detail-hero">
        <img src={profile.image.url} alt={profile.image.altText} />
        <div>
          <p className="eyebrow">{profile.role}</p>
          <h1>{profile.name}</h1>
          <p className="profile-detail-bio">{profile.fullBio}</p>
          <nav className="profile-detail-links" aria-label={`Profile links for ${profile.name}`}>
            {profile.socialLinks.length > 0
              ? profile.socialLinks.map((link) => <ProfileLink key={link.url} link={link} />)
              : <Link to="/contact">Contact via Babas & Brasse</Link>}
          </nav>
        </div>
      </header>

      <section className="figma-content-section" aria-labelledby="profile-published-work">
        <div className="section-heading-row">
          <h2 id="profile-published-work">Published work</h2>
          <Link to="/visceral-mag">Read Visceral Mag</Link>
        </div>
        {publishedWorks.length > 0 ? (
          <div className="figma-published-story-feed">
            {publishedWorks.map((article) => <FigmaArticleCard key={article.id} article={article} compact />)}
          </div>
        ) : (
          <div className="figma-empty-state">
            <p>No published stories are attached to this profile yet.</p>
          </div>
        )}
      </section>
    </article>
  );
}
