import { Link } from "react-router-dom";
export function FigmaProfileCard({ profile, showPublishedWorks = false }) {
  if (!profile) {
    return null;
  }

  const links = Array.isArray(profile.socialLinks) ? profile.socialLinks : [];
  const works = Array.isArray(profile.publishedWorks) ? profile.publishedWorks : [];
  const profileHref = profile.href || `/people/${profile.slug}`;

  return (
    <article id={profile.slug} className="profile-card figma-profile-card" data-profile={profile.slug} data-profile-type={profile.type}>
      <Link className="figma-profile-card__media" to={profileHref} aria-label={`Open ${profile.name} profile`}>
        <img src={profile.image.url} alt={profile.image.altText} />
      </Link>
      <div className="profile-copy figma-profile-card__body">
        <p className="eyebrow">{profile.role}</p>
        <h3><Link to={profileHref}>{profile.name}</Link></h3>
        <p>{profile.shortBio}</p>
        {showPublishedWorks ? <p>{works.length} published work{works.length === 1 ? "" : "s"}</p> : null}
        {showPublishedWorks ? (
          <nav className="figma-profile-card__links" aria-label={`Published works by ${profile.name}`}>
            {works.map((article) => <Link key={article.id} to={article.href}>{article.title}</Link>)}
          </nav>
        ) : null}
        <nav className="figma-profile-card__links" aria-label={`Profile links for ${profile.name}`}>
          {links.length > 0
            ? links.map((link) => /^https?:|mailto:/i.test(link.url) ? <a key={link.url} href={link.url}>{link.label}</a> : <Link key={link.url} to={link.url}>{link.label}</Link>)
            : <Link to="/contact">Contact via Babas & Brasse</Link>}
        </nav>
      </div>
    </article>
  );
}
