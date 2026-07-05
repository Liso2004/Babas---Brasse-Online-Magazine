import fixturesModule from "../../../../src/content/fixtures.js";
import { buildVisceralMagRouteModel } from "./visceralMagRouteModel.js";

const launchFixtures = fixturesModule.default || fixturesModule;

export function VisceralMagPage({ fixtures = launchFixtures }) {
  const model = buildVisceralMagRouteModel(fixtures);
  const { hero, search, sections } = model;

  return (
    <section data-page="visceral-mag" data-generated={model.generatedFrom} data-prototype-file={model.route.prototypeFile}>
      <header data-section="archive-intro">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1>{hero.title}</h1>
        <p>{hero.dek}</p>
      </header>

      <section data-section="search-entry">
        <label htmlFor={search.id}>{search.label}</label>
        <input id={search.id} name={search.name} type={search.type} placeholder={search.placeholder} />
      </section>

      <section data-section="category-filters">
        <h2>Browse by category</h2>
        {sections.categoryFilters.map((category) => (
          <a key={category.id} className="category-chip" data-category={category.slug} href={category.href}>{category.label}</a>
        ))}
      </section>

      <section data-section="article-listing">
        <h2>Published Articles</h2>
        {sections.articleListing.map((article) => (
          <article key={article.id} className="article-card" data-article={article.slug} data-status={article.status} data-category={article.category.slug}>
            <img src={article.featuredImage.url} alt={article.featuredImage.altText} />
            <p className="eyebrow">{article.category.label}</p>
            <h3><a href={article.href}>{article.title}</a></h3>
            <p>{article.dek}</p>
            <p className="article-meta">By <a href={article.author.href}>{article.author.name}</a>{article.publishedAt ? ` | ${article.publishedAt}` : ""}</p>
          </article>
        ))}
      </section>
    </section>
  );
}
