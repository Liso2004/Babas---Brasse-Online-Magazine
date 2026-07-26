import { Link } from "react-router-dom";
import * as launchFixtures from "../data/launchFixtures.js";
import { buildContentRouteModel } from "./contentRouteModel.js";

export function ContentPage({ fixtures = launchFixtures }) {
  const model = buildContentRouteModel(fixtures);
  const { hero, sections } = model;

  return (
    <section className="figma-public-page figma-content-page" data-page="content" data-design-reference="content-directory-v1" data-route={model.route.path} data-generated={model.generatedFrom} data-prototype-file={model.route.prototypeFile}>
      <header data-section="content-intro" className="figma-page-intro">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1>{hero.title}</h1>
        <p>{hero.dek}</p>
      </header>

      <section data-section="content-categories" className="figma-content-section" data-state={sections.categories.state}>
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">Ease of use</p>
            <h2>{sections.categories.heading}</h2>
          </div>
          <Link to="/visceral-mag">View full archive</Link>
        </div>

        {sections.categories.items.length > 0 ? (
          <div className="figma-card-grid content-category-grid">
            {sections.categories.items.map((category) => (
              <article key={category.id} className="content-category-card" data-category={category.slug}>
                <p className="eyebrow">{category.count} {category.count === 1 ? "piece" : "pieces"}</p>
                <h3><Link to={category.href}>{category.label}</Link></h3>
                <p>{category.description}</p>
                {category.articles.length > 0 ? (
                  <ul aria-label={`Recent ${category.label} content`}>
                    {category.articles.map((article) => <li key={article.id}><Link to={article.href}>{article.title}</Link></li>)}
                  </ul>
                ) : <p>No published pieces in this section yet.</p>}
                <Link className="content-category-card__cta" to={category.href}>Browse {category.label}</Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="figma-empty-state"><p>{sections.categories.body}</p></div>
        )}
      </section>
    </section>
  );
}
