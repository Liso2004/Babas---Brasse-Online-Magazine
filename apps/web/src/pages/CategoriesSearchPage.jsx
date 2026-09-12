import { Link, useLocation } from "react-router-dom";
import * as launchFixtures from "../data/launchFixtures.js";
import { FigmaArticleCard } from "../components/FigmaArticleCard.jsx";
import { UrbanMoodboardGrid } from "../components/UrbanMoodboardGrid.jsx";
import { buildCategoriesSearchRouteModel } from "./categoriesSearchRouteModel.js";

const sectionCopy = {
  theatre: { eyebrow: "Theatre Reviews", title: "Theatre, performance, and the work behind the stage.", dek: "Reviews and conversations tracing South African performance from rehearsal room to opening night." },
  books: { eyebrow: "Book Reviews", title: "Books, language, and South African literary life.", dek: "Close readings of fiction, criticism, translation, and the ideas moving through our bookshelves." },
  opinion: { eyebrow: "Opinion", title: "Arguments for a more attentive cultural life.", dek: "Columns and commentary on language, access, institutions, and the stories shaping public culture." },
  essays: { eyebrow: "Essays", title: "Personal writing with a wider cultural view.", dek: "Essays on identity, memory, place, language, and the everyday rituals that hold communities together." }
};

export function CategoriesSearchPage({ fixtures = launchFixtures, query, category, topic, status = "ready" }) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const activeQuery = query ?? params.get("q") ?? "";
  const activeCategory = category ?? params.get("category") ?? "";
  const activeTopic = topic ?? params.get("topic") ?? "";
  const model = buildCategoriesSearchRouteModel(fixtures, { query: activeQuery, category: activeCategory, topic: activeTopic, issue: params.get("issue") ?? "" });
  const { hero, activeFilters, selectedCategory, sections } = model;
  const section = sectionCopy[activeTopic] || sectionCopy[activeCategory] || { ...hero, title: "Search Archive" };
  const hasQuery = Boolean(activeFilters.query.trim());

  return (
    <section className="figma-public-page figma-search-page" data-page="categories-search" data-design-reference="search-archive-v4" data-route={model.route.path} data-generated={model.generatedFrom} data-state-note={model.stateNote} data-prototype-file={model.route.prototypeFile}>
      <header data-section="search-intro" className="figma-page-intro"><p className="eyebrow">{section.eyebrow}</p><h1>{section.title}</h1><p>{section.dek}</p></header>
      <section data-section="active-filters" className="figma-active-filters"><p data-active-query={activeFilters.query}>{hasQuery ? `Query: “${activeFilters.query}”` : "Showing published stories"}</p>{selectedCategory ? <p data-active-category={selectedCategory.slug}>Category: {selectedCategory.label}</p> : null}{activeFilters.topic ? <p data-active-topic={activeFilters.topic}>Topic: {activeFilters.topic}</p> : null}</section>
      <section data-section="search-results" className="figma-content-section" data-state={sections.results.state}>
        <div className="section-heading-row"><div><p className="eyebrow">{hasQuery ? "Publication results" : "Published archive"}</p><h2>{sections.results.heading}</h2></div><span className="search-result-count" aria-live="polite">{model.totalResults} {model.totalResults === 1 ? "result" : "results"}</span>{sections.results.state === "results" ? <Link to="/visceral-mag">View all stories</Link> : null}</div>
        {status === "loading" ? <div className="figma-search-state" role="status" aria-live="polite"><span className="figma-search-state__mark" aria-hidden="true" /><p>Searching the publication archive...</p></div> : status === "error" ? <div className="figma-search-state figma-search-state--error" role="alert"><h3>Search is temporarily unavailable</h3><p>Try submitting your search again. Your query has been preserved.</p></div> : sections.results.state === "no-results" && !hasQuery ? <div className="figma-empty-state"><p>{sections.results.body}</p><Link data-action="reset-search" to={sections.results.resetHref}>Reset search</Link></div> : sections.results.items.length ? <div data-section="figma-search-results" className="figma-card-grid stitch-search-results">{sections.results.items.map((article, index) => <div key={article.id} className="stitch-search-result" data-result-index={index + 1}><FigmaArticleCard article={article} compact /></div>)}</div> : <p>No matching stories.</p>}
      </section>
      {hasQuery && sections.visualResearch.items.length ? <section className="figma-content-section" data-section="search-visual-research"><div className="section-heading-row"><h2>{sections.visualResearch.heading}</h2><Link to="/moodboard">Open image wall</Link></div><UrbanMoodboardGrid items={sections.visualResearch.items.slice(0, 8)} variant="related" /></section> : null}
      {hasQuery && (sections.contributors.items.length || sections.media.items.length) ? <section className="figma-content-section urban-search-directory" data-section="search-people-media"><div className="section-heading-row"><h2>People and media</h2></div>{sections.contributors.items.length ? <div><p className="eyebrow">Contributors</p>{sections.contributors.items.map((person) => <Link key={person.id} to={person.href}>{person.name} / {person.role}</Link>)}</div> : null}{sections.media.items.length ? <div><p className="eyebrow">Media</p>{sections.media.items.map((media) => <Link key={media.id} to={media.href}>{media.title} / {media.destination}</Link>)}</div> : null}</section> : null}
    </section>
  );
}
