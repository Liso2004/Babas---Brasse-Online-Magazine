import * as launchFixtures from "../data/launchFixtures.js";
import { FigmaArticleCard } from "../components/FigmaArticleCard.jsx";
import { buildFeaturedMediaRouteModel } from "./featuredMediaRouteModel.js";

export function FeaturedMediaPage({ fixtures = launchFixtures }) {
  const model = buildFeaturedMediaRouteModel(fixtures);
  const { hero, sections } = model;

  return (
    <section className="figma-public-page figma-featured-page" data-page="featured-media" data-route={model.route.path} data-generated={model.generatedFrom} data-prototype-file={model.route.prototypeFile}>
      <header data-section="media-intro" className="figma-page-intro">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1>{hero.title}</h1>
        <p>{hero.dek}</p>
      </header>

      <section data-section="media-gallery" className="figma-content-section" data-state={sections.mediaGallery.state}>
        <div className="section-heading-row">
          <h2>{sections.mediaGallery.heading}</h2>
          <a href="/contact">Submit media</a>
        </div>
        {sections.mediaGallery.state === "no-media" ? (
          <div className="figma-empty-state" data-state="no-media">
            <p>{sections.mediaGallery.body}</p>
            <a href={sections.mediaGallery.contactHref}>Contact the editors</a>
          </div>
        ) : (
          <div className="figma-media-gallery">
            {sections.mediaGallery.items.map((item) => (
              <article key={item.id} className="media-card" data-media={item.id} data-media-type={item.type} data-credit={item.credit}>
                <img src={item.url} alt={item.altText} />
                <p className="eyebrow">{item.type}</p>
                <h3>{item.title}</h3>
                <p>{item.caption}</p>
                <p className="media-credit">Credit: {item.credit}</p>
              </article>
            ))}
          </div>
        )}
      </section>

      <section data-section="article-media-links" className="figma-content-section">
        <div className="section-heading-row">
          <h2>{sections.articleMediaLinks.heading}</h2>
          <a href="/visceral-mag">Read stories</a>
        </div>
        <div data-section="figma-article-media-links" className="figma-published-story-feed">
          {sections.articleMediaLinks.items.map((article) => (
            <FigmaArticleCard key={article.id} article={article} compact showCredit />
          ))}
        </div>
      </section>
    </section>
  );
}