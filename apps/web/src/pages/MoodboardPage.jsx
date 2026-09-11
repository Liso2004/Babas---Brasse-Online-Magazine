import { Link } from "react-router-dom";
import * as launchFixtures from "../data/launchFixtures.js";
import { buildMoodboardRouteModel } from "./moodboardRouteModel.js";

export function MoodboardPage({ fixtures = launchFixtures }) {
  const model = buildMoodboardRouteModel(fixtures);

  return (
    <section className="figma-public-page urban-moodboard-page" data-page="moodboard" data-generated={model.generatedFrom}>
      <header className="figma-page-intro urban-moodboard-intro">
        <p className="eyebrow">{model.hero.eyebrow}</p>
        <h1>{model.hero.title}</h1>
        <p>{model.hero.dek}</p>
      </header>
      <section className="figma-content-section" data-section="moodboard-listing" aria-labelledby="moodboard-listing-heading">
        <div className="section-heading-row"><h2 id="moodboard-listing-heading">Archive specimens</h2><span>{model.items.length} verified artifacts</span></div>
        <div className="urban-moodboard-grid">
          {model.items.map((item) => (
            <article key={item.id} className="urban-moodboard-card" data-specimen={item.specimen}>
              <Link to={item.href} className="urban-moodboard-card__image"><img src={item.image.url} alt={item.image.altText} /><span>SPECIMEN {item.specimen}</span></Link>
              <div><p className="eyebrow">{item.category} / Issue {item.issue}</p><h3><Link to={item.href}>{item.title}</Link></h3><p>{item.tags.join(" / ")}</p></div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
