import { Link, useLocation, useNavigate } from "react-router-dom";
import * as launchFixtures from "../data/launchFixtures.js";
import { FigmaArticleCard } from "../components/FigmaArticleCard.jsx";
import { buildCategoriesSearchRouteModel } from "./categoriesSearchRouteModel.js";

const sectionCopy = {
  theatre: { eyebrow: "Theatre Reviews", title: "Theatre, performance, and the work behind the stage.", dek: "Reviews and conversations tracing South African performance from rehearsal room to opening night." },
  books: { eyebrow: "Book Reviews", title: "Books, language, and South African literary life.", dek: "Close readings of fiction, criticism, translation, and the ideas moving through our bookshelves." },
  opinion: { eyebrow: "Opinion", title: "Arguments for a more attentive cultural life.", dek: "Columns and commentary on language, access, institutions, and the stories shaping public culture." },
  essays: { eyebrow: "Essays", title: "Personal writing with a wider cultural view.", dek: "Essays on identity, memory, place, language, and the everyday rituals that hold communities together." }
};

export function CategoriesSearchPage({ fixtures = launchFixtures, query, category, topic }) {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const activeQuery = query ?? params.get("q") ?? "";
  const activeCategory = category ?? params.get("category") ?? "";
  const activeTopic = topic ?? params.get("topic") ?? "";
  const model = buildCategoriesSearchRouteModel(fixtures, {
    query: activeQuery,
    category: activeCategory,
    topic: activeTopic
  });
  const { hero, search, activeFilters, selectedCategory, sections } = model;
  const showSearchTools = !activeCategory && !activeTopic;
  const section = sectionCopy[activeTopic] || sectionCopy[activeCategory] || hero;

  function submitSearch(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const next = new URLSearchParams();
    const value = form.get("q")?.toString().trim();
    if (value) next.set("q", value);
    navigate(`/search${next.size ? `?${next.toString()}` : ""}`);
  }

  return (
    <section className="figma-public-page figma-search-page" data-page="categories-search" data-route={model.route.path} data-generated={model.generatedFrom} data-state-note={model.stateNote} data-prototype-file={model.route.prototypeFile}>
      <header data-section="search-intro" className="figma-page-intro">
        <p className="eyebrow">{section.eyebrow}</p>
        <h1>{section.title}</h1>
        <p>{section.dek}</p>
      </header>

      {showSearchTools ? (
        <form data-section="search-form" className="figma-search-tools" role="search" onSubmit={submitSearch}>
          <label htmlFor={search.id}>{search.label}</label>
          <input id={search.id} name={search.name} type={search.type} placeholder={search.placeholder} defaultValue={activeFilters.query} />
          <button type="submit">Search</button>
        </form>
      ) : null}

      <section data-section="active-filters" className="figma-active-filters">
        <p data-active-query={activeFilters.query}>{activeFilters.query ? `Query: ${activeFilters.query}` : "Showing published articles"}</p>
        {selectedCategory ? <p data-active-category={selectedCategory.slug}>Category: {selectedCategory.label}</p> : null}
        {activeFilters.topic ? <p data-active-topic={activeFilters.topic}>Topic: {activeFilters.topic}</p> : null}
      </section>

      <section data-section="search-results" className="figma-content-section" data-state={sections.results.state}>
        <div className="section-heading-row">
          <h2>{sections.results.heading}</h2>
          {sections.results.state === "results" ? <Link to="/visceral-mag">View all articles</Link> : null}
        </div>
        {sections.results.state === "no-results" ? (
          <div className="figma-empty-state">
            <p>{sections.results.body}</p>
            <Link data-action="reset-search" to={sections.results.resetHref}>Reset search</Link>
          </div>
        ) : (
          <div data-section="figma-search-results" className="figma-card-grid">
            {sections.results.items.map((article) => (
              <FigmaArticleCard key={article.id} article={article} compact />
            ))}
          </div>
        )}
      </section>
    </section>
  );
}
