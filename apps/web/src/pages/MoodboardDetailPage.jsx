import { Link } from "react-router-dom";
import * as launchFixtures from "../data/launchFixtures.js";
import { UrbanMoodboardGrid } from "../components/UrbanMoodboardGrid.jsx";
import { buildMoodboardDetailRouteModel } from "./moodboardDetailRouteModel.js";

export function MoodboardDetailPage({ fixtures = launchFixtures, slug }) {
  const model = buildMoodboardDetailRouteModel(fixtures, slug);
  if (model.state === "not-found") return <section className="figma-public-page figma-article-detail" data-page="moodboard-detail" data-state="not-found"><h1>Specimen unavailable</h1><p>This archive record does not exist.</p><Link to="/moodboard">Back to visual archive</Link></section>;
  const { item } = model;
  return <article className="figma-article-detail urban-moodboard-detail" data-page="moodboard-detail" data-specimen={item.specimen}>
    <header className="figma-article-hero urban-moodboard-detail__hero">
      <nav className="figma-breadcrumb" aria-label="Breadcrumb"><Link to="/moodboard">Visual archive</Link><span aria-hidden="true">/</span><span>{item.title}</span></nav>
      <p className="eyebrow">Visual research / Specimen {item.specimen} / Issue {item.issue}</p><h1>{item.title}</h1><p className="urban-moodboard-detail__lead">{item.caption}</p>
      <figure className="urban-moodboard-detail__media"><img src={item.image.url} alt={item.image.altText} fetchPriority="high" /><figcaption>{item.credit} / {item.source}</figcaption></figure>
    </header>
    <section className="figma-content-section urban-moodboard-detail__context" data-section="archive-metadata"><div className="section-heading-row"><h2>Archive context</h2><span>{item.category}</span></div><dl className="urban-moodboard-metadata"><div><dt>SUBJECT</dt><dd>{item.subject}</dd></div><div><dt>TAGS</dt><dd>{item.tags.join(" / ")}</dd></div><div><dt>CREDIT</dt><dd>{item.credit}</dd></div><div><dt>SOURCE</dt><dd>{item.source}</dd></div></dl></section>
    {model.relatedItems.length ? <section className="figma-content-section" data-section="related-visual-research"><div className="section-heading-row"><h2>Related visual research</h2><Link to="/moodboard">Image wall</Link></div><UrbanMoodboardGrid items={model.relatedItems} variant="related" /></section> : null}
    {model.relatedArticles.length ? <section className="figma-content-section urban-related-links" data-section="related-stories"><div className="section-heading-row"><h2>Related stories</h2><Link to="/visceral-mag">All stories</Link></div>{model.relatedArticles.map((article) => <Link key={article.id} to={article.href}>{article.title}</Link>)}</section> : null}
    <nav className="urban-specimen-pagination" aria-label="Specimen navigation"><div>{model.previousItem ? <Link to={model.previousItem.href}>← Previous specimen / {model.previousItem.specimen}</Link> : <span>Start of Issue 004</span>}</div><div>{model.nextItem ? <Link to={model.nextItem.href}>Next specimen / {model.nextItem.specimen} →</Link> : <span>End of Issue 004</span>}</div></nav>
  </article>;
}
