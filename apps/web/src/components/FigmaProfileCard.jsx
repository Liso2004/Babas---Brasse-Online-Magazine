export function FigmaProfileCard({ profile, showPublishedWorks = false }) {
  if (!profile) {
    return null;
  }

  const links = Array.isArray(profile.socialLinks) ? profile.socialLinks : [];
  const works = Array.isArray(profile.publishedWorks) ? profile.publishedWorks : [];
  const profileHref = profile.href || `/people/${profile.slug}`;

  return (
    <article id={profile.slug} className="profile-card figma-profile-card" data-profile={profile.slug} data-profile-type={profile.type}>
      <a className="figma-profile-card__media" href={profileHref} aria-label={`Open ${profile.name}`}>
        <img src={profile.image.url} alt={profile.image.altText} />
      </a>
      <div className="profile-copy figma-profile-card__body">
        <p className="eyebrow">{profile.role}</p>
        <h3>{profile.name}</h3>
        <p>{profile.shortBio}</p>
        {showPublishedWorks ? <p>{works.length} published work{works.length === 1 ? "" : "s"}</p> : null}
        {showPublishedWorks ? (
          <nav className="figma-profile-card__links" aria-label={`Published works by ${profile.name}`}>
            {works.map((article) => <a key={article.id} href={article.href}>{article.title}</a>)}
          </nav>
        ) : null}
        <nav className="figma-profile-card__links" aria-label={`Profile links for ${profile.name}`}>
          {links.length > 0
            ? links.map((link) => <a key={link.url} href={link.url}>{link.label}</a>)
            : <a href="/contact">Contact via Babas & Brasse</a>}
        </nav>
      </div>
    </article>
  );
}
