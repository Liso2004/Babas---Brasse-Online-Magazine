import { Link } from "react-router-dom";
import * as launchFixtures from "../data/launchFixtures.js";
import { buildMoodboardDetailRouteModel } from "./moodboardDetailRouteModel.js";

export function MoodboardDetailPage({ fixtures = launchFixtures, slug }) {
  const model = buildMoodboardDetailRouteModel(fixtures, slug);

  if (model.state === "not-found") {
    return <section className="figma-public-page" data-page="moodboard-detail" data-state="not-found"><h1>Specimen unavailable</h1><p>This archive record does not exist.</p><Link to="/moodboard">Back to visual archive</Link></section>;
  }

  const { item } = model;
  const hasRelatedMaterial = model.relatedItems.length || model.relatedArticles.length || model.relatedContributors.length;
  return (
    <article className="figma-public-page urban-moodboard-detail" data-page="moodboard-detail" data-specimen={item.specimen}>
      <header className="urban-moodboard-detail__hero">
        <nav className="figma-breadcrumb" aria-label="Breadcrumb"><Link to="/moodboard">Visual archive</Link><span aria-hidden="true">/</span><span>{item.title}</span></nav>
        <p className="eyebrow">Specimen {item.specimen} / {item.category} / Issue {item.issue}</p>
        <h1>{item.title}</h1>
        <img src={item.image.url} alt={item.image.altText} />
        <p>{item.tags.join(" / ")}</p>
      </header>
      {hasRelatedMaterial ? <section className="figma-content-section urban-related-material" data-section="related-archive-material"><div className="section-heading-row"><h2>Related archive material</h2><span>Same signal</span></div>
        {model.relatedItems.length ? <div className="urban-related-material__list">{model.relatedItems.map((related) => <Link key={related.id} to={related.href}><img src={related.image.url} alt={related.image.altText} /><span>SPECIMEN {related.specimen}</span><strong>{related.title}</strong></Link>)}</div> : null}
        {model.relatedArticles.length ? <div className="urban-related-links"><h3>Related dispatch</h3>{model.relatedArticles.map((article) => <Link key={article.id} to={article.href}>{article.title}</Link>)}</div> : null}
        {model.relatedContributors.length ? <div className="urban-related-links"><h3>Contributor signal</h3>{model.relatedContributors.map((profile) => <Link key={profile.id} to={profile.href}>{profile.name} / {profile.role}</Link>)}</div> : null}
      </section> : null}
    </article>
  );
}
