import { Link, useSearchParams } from "react-router-dom";
import * as launchFixtures from "../data/launchFixtures.js";
import { UrbanMoodboardGrid } from "../components/UrbanMoodboardGrid.jsx";
import { buildMoodboardRouteModel } from "./moodboardRouteModel.js";

function unique(items) { return [...new Set(items)].sort((left, right) => left.localeCompare(right)); }

export function MoodboardPage({ fixtures = launchFixtures }) {
  const model = buildMoodboardRouteModel(fixtures);
  const [searchParams] = useSearchParams();
  const issue = searchParams.get("issue") || "004";
  const category = searchParams.get("category") || "";
  const subject = searchParams.get("subject") || "";
  const tag = searchParams.get("tag") || "";
  const items = model.items.filter((item) => item.issue === issue && (!category || item.category === category) && (!subject || item.subject === subject) && (!tag || item.tags.includes(tag)));
  const categories = unique(model.items.map((item) => item.category));
  const subjects = unique(model.items.map((item) => item.subject));
  const tags = unique(model.items.flatMap((item) => item.tags)).slice(0, 12);
  const query = (key, value) => `/moodboard?issue=004${key ? `&${key}=${encodeURIComponent(value)}` : ""}`;

  return <section className="figma-public-page urban-moodboard-page" data-page="moodboard" data-generated={model.generatedFrom}>
    <header className="figma-page-intro urban-moodboard-intro"><p className="eyebrow">{model.hero.eyebrow}</p><h1>{model.hero.title}</h1><p>{model.hero.dek}</p></header>
    <section className="figma-content-section" data-section="moodboard-listing" aria-labelledby="moodboard-listing-heading">
      <div className="section-heading-row"><h2 id="moodboard-listing-heading">Archive specimens</h2><span>{items.length} verified artifacts</span></div>
      <nav className="urban-moodboard-filters" aria-label="Visual archive filters"><Link to={query()}>ALL</Link><span>ISSUE 004</span>{categories.map((value) => <Link key={value} to={query("category", value)}>{value}</Link>)}{subjects.map((value) => <Link key={value} to={query("subject", value)}>{value}</Link>)}{tags.map((value) => <Link key={value} to={query("tag", value)}>#{value}</Link>)}</nav>
      {items.length ? <UrbanMoodboardGrid items={items} /> : <div className="figma-empty-state"><p>No Issue 004 specimens match this filter.</p><Link to="/moodboard?issue=004">Reset archive filters</Link></div>}
    </section>
  </section>;
}
