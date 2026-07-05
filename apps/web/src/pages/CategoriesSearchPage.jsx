import fixturesModule from "../../../../src/content/fixtures.js";
import { buildCategoriesSearchRouteModel } from "./categoriesSearchRouteModel.js";

const launchFixtures = fixturesModule.default || fixturesModule;

export function CategoriesSearchPage({ fixtures = launchFixtures, query = "", category = "" }) {
  const model = buildCategoriesSearchRouteModel(fixtures, { query, category });
  const { hero, search, activeFilters, selectedCategory, sections } = model;

  return (
    <section data-page="categories-search" data-route={model.route.path} data-generated={model.generatedFrom} data-state-note={model.stateNote} data-prototype-file={model.route.prototypeFile}>
      <header data-section="search-intro">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1>{hero.title}</h1>
        <p>{hero.dek}</p>
      </header>

      <form data-section="search-form" action={search.action} method={search.method}>
        <label htmlFor={search.id}>{search.label}</label>
        <input id={search.id} name={search.name} type={search.type} placeholder={search.placeholder} defaultValue={activeFilters.query} />
        {activeFilters.category ? <input type="hidden" name="category" value={activeFilters.category} /> : null}
        <button type="submit">Search</button>
      </form>

      <section data-section="category-filters">
        <h2>Browse by category</h2>
        {sections.categoryFilters.map((item) => (
          <a key={item.slug} className="category-chip" data-category={item.slug} data-active={item.active ? "true" : "false"} href={item.href}>{item.label}</a>
        ))}
      </section>

      <section data-section="active-filters">
        <p data-active-query={activeFilters.query}>{activeFilters.query ? `Query: ${activeFilters.query}` : "Showing all published articles"}</p>
        {selectedCategory ? <p data-active-category={selectedCategory.slug}>Category: {selectedCategory.label}</p> : null}
      </section>

      <section data-section="search-results" data-state={sections.results.state}>
        <h2>{sections.results.heading}</h2>
        {sections.results.state === "no-results" ? (
          <>
            <p>{sections.results.body}</p>
            <a data-action="reset-search" href={sections.results.resetHref}>Reset search</a>
          </>
        ) : sections.results.items.map((article) => (
          <article key={article.id} className="search-result-card" data-article={article.slug} data-status={article.status} data-category={article.category.slug}>
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
