import { Link } from "react-router-dom";
import * as launchFixtures from "../data/launchFixtures.js";
import { NewsletterSignup } from "../components/NewsletterSignup.jsx";
import { UrbanMoodboardGrid } from "../components/UrbanMoodboardGrid.jsx";
import { buildHomeRouteModel } from "./homeRouteModel.js";

const productSpecs = [["MAT", "400GSM HEAVYWEIGHT"], ["FIT", "OVERSIZED / BOXY"], ["DROP", "01 / NO RESTOCK"], ["STATUS", "SYSTEM MALFUNCTION"]];

export function HomePage({ fixtures = launchFixtures }) {
  const model = buildHomeRouteModel(fixtures);
  const { sections, newsletter } = model;
  const stories = [sections.featuredArticle, ...sections.recentArticles, ...sections.latestArticles]
    .filter(Boolean)
    .filter((article, index, list) => list.findIndex((item) => item.id === article.id) === index)
    .slice(0, 8);

  return (
    <section className="urban-shop-page" data-page="home" data-design-reference="urban-anarchy-shop-zine" data-generated={model.generatedFrom}>
      <div className="urban-marquee" aria-label="Drop status"><div>DROP 01 // NO RESTOCKS // SYSTEM MALFUNCTION // HEAVYWEIGHT CUTS // DROP 01 // NO RESTOCKS // SYSTEM MALFUNCTION //</div></div>
      <header className="urban-shop-hero" data-section="shop-intro"><p className="urban-kicker">URBAN ANARCHY / SECTOR 021</p><h1>DROP 01:<br />THE AWAKENING</h1><p>RAW MATERIALS. UNREFINED CUTS. BUILT FOR THE CONCRETE GRID. NOTHING IS PERMANENT.</p></header>
      <section className="urban-product-grid" aria-label="Featured stories">
        {stories.map((product, index) => <article className={`urban-product urban-product--${index + 1}`} key={product.id}>
          <Link to={product.href} className="urban-product__image" aria-label={`Read ${product.title}`}><img src={product.featuredImage?.url} alt={product.featuredImage?.altText || product.title} /></Link>
          {index === 0 ? <span className="urban-sticker urban-sticker--red">SOLD OUT</span> : null}{index === 1 ? <span className="urban-sticker urban-sticker--white">LTD ED</span> : null}{index === 3 ? <span className="urban-sticker urban-sticker--red urban-sticker--center">SYSTEM<br />ERROR</span> : null}
          <div className="urban-product__copy"><p className="urban-product__code">FEATURED STORY // {product.categoryId?.toUpperCase() || "ARCHIVE"}</p><h2>{product.title}</h2><p>{product.dek}</p><div className="urban-product__specs"><span>TYPE: EDITORIAL DISPATCH</span><span>ISSUE: 004</span><span>STATUS: {index === 0 ? "FEATURED" : "PUBLISHED"}</span></div><Link to={product.href} className="urban-product__action">READ DISPATCH</Link></div>
        </article>)}
      </section>
      {sections.visualResearch?.length ? <section className="urban-home-archive" data-section="home-visual-research" aria-labelledby="home-visual-research-heading">
        <div className="urban-home-archive__heading"><div><p className="urban-kicker">VISUAL RESEARCH // ISSUE 004</p><h2 id="home-visual-research-heading">SOURCE ARCHIVE</h2></div><Link to="/moodboard">OPEN ALL SPECIMENS</Link></div>
        <p className="urban-home-archive__intro">A direct preview of the Issue 004 archive. Every record opens its normal specimen dossier.</p>
        <UrbanMoodboardGrid items={sections.visualResearch} preview />
      </section> : null}
      <section className="urban-terminal" data-section="technical-specification"><div className="urban-terminal__title">DATA_LOG // DROP_01</div><div className="urban-terminal__grid">{productSpecs.map(([label, value]) => <p key={label}><span>{label}:</span><strong>{value}</strong></p>)}</div></section>
      <section className="urban-manifesto" data-section="newsletter" id={newsletter.id}><p className="urban-kicker">TRANSMISSION // UNFILTERED</p><h2>INITIATE<br />CONNECTION</h2><p className="urban-pullquote">"THE CITY DOES NOT ASK FOR PERMISSION. NEITHER DO WE."</p><p>RECEIVE CAPSULE INTEL, ARCHIVE ACCESS, AND DROP SIGNALS BEFORE THE PUBLIC OVERLOAD.</p><NewsletterSignup idPrefix="urban-anarchy-newsletter" /></section>
    </section>
  );
}
