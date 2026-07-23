import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Mail, Music2, Send, ExternalLink } from "lucide-react";
import * as launchFixtures from "../data/launchFixtures.js";
import { FigmaArticleCard } from "../components/FigmaArticleCard.jsx";
import { buildProfileDetailRouteModel } from "./profileDetailRouteModel.js";

function ProfileLink({ link }) {
  const isExternal = /^(?:https?:|mailto:)/i.test(link.url);
  const label = String(link.label || "").toLowerCase();
  const Icon = label.includes("instagram") ? Instagram : label.includes("facebook") ? Facebook : label.includes("linkedin") ? Linkedin : label.includes("tiktok") ? Music2 : label.includes("email") ? Mail : ExternalLink;
  const content = <><Icon size={18} aria-hidden="true" /><span>{link.label}</span></>;
  return isExternal
    ? <a href={link.url} target="_blank" rel="noreferrer" aria-label={`${link.label} for this profile opens in a new tab`}>{content}</a>
    : <Link to={link.url}>{content}</Link>;
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

  const { profile, publishedWorks, mediaItems, submissions } = model;

  return (
    <article className="figma-public-page figma-profile-detail profile-editorial-detail" data-page="profile-detail" data-design-reference="profile-detail-v4" data-route={model.route.path} data-profile={profile.slug}>
      <nav className="figma-breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link><span aria-hidden="true">/</span>
        <Link to={model.backHref}>{profile.type === "creative_team" ? "Creative Team" : "Contributors"}</Link>
        <span aria-hidden="true">/</span><span>{profile.name}</span>
      </nav>

      <header className="profile-detail-hero profile-editorial-hero">
        <img src={profile.image.url} alt={profile.image.altText} />
        <div>
          <p className="eyebrow">{profile.role}</p>
          <h1>{profile.name}</h1>
          <p className="profile-detail-bio">{profile.fullBio}</p>
          <nav className="profile-detail-links profile-social-icons" aria-label={`Profile links for ${profile.name}`}>
            {profile.socialLinks.length > 0
              ? profile.socialLinks.map((link) => <ProfileLink key={link.url} link={link} />)
              : <Link to="/contact"><Mail size={18} aria-hidden="true" /><span>Contact via Babas & Brasse</span></Link>}
          </nav>
        </div>
      </header>

      <section className="figma-content-section profile-media-strip-section" aria-labelledby="profile-media-heading">
        <div className="section-heading-row">
          <h2 id="profile-media-heading">Media</h2>
        </div>
        <div className="profile-media-strip" tabIndex="0" aria-label={`Scrollable media connected to ${profile.name}`}>
          {mediaItems.map((item) => (
            <figure key={item.id}>
              <img src={item.url} alt={item.altText} />
              <figcaption>{item.caption || item.title}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="figma-content-section" aria-labelledby="profile-published-work">
        <div className="section-heading-row">
          <h2 id="profile-published-work">Articles</h2>
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

      <section className="figma-content-section" aria-labelledby="profile-submissions-heading">
        <div className="section-heading-row">
          <h2 id="profile-submissions-heading">Submissions and contributions</h2>
          <Link to="/contact">Submit work</Link>
        </div>
        {submissions.length > 0 ? (
          <div className="profile-submission-grid">
            {submissions.map((submission) => (
              <article key={submission.id} className="profile-submission-card">
                <p className="eyebrow">{submission.type}</p>
                <h3>{submission.title}</h3>
                <p>{submission.status}</p>
                <Link to={submission.href}><Send size={16} aria-hidden="true" /> Open</Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="figma-empty-state"><p>No submissions or internal contributions are attached yet.</p></div>
        )}
      </section>
    </article>
  );
}
