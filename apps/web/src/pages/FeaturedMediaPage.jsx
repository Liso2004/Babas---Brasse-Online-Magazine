import fixturesModule from "../../../../src/content/fixtures.js";
import { buildFeaturedMediaRouteModel } from "./featuredMediaRouteModel.js";

const launchFixtures = fixturesModule.default || fixturesModule;

export function FeaturedMediaPage({ fixtures = launchFixtures }) {
  const model = buildFeaturedMediaRouteModel(fixtures);
  const { hero, sections } = model;

  return (
    <section data-page="featured-media" data-route={model.route.path} data-generated={model.generatedFrom} data-prototype-file={model.route.prototypeFile}>
      <header data-section="media-intro">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1>{hero.title}</h1>
        <p>{hero.dek}</p>
      </header>

      <section data-section="media-gallery" data-state={sections.mediaGallery.state}>
        <h2>{sections.mediaGallery.heading}</h2>
        {sections.mediaGallery.state === "no-media" ? (
          <div data-state="no-media">
            <p>{sections.mediaGallery.body}</p>
            <a href={sections.mediaGallery.contactHref}>Contact the editors</a>
          </div>
        ) : sections.mediaGallery.items.map((item) => (
          <article key={item.id} className="media-card" data-media={item.id} data-media-type={item.type} data-credit={item.credit}>
            <img src={item.url} alt={item.altText} />
            <p className="eyebrow">{item.type}</p>
            <h3>{item.title}</h3>
            <p>{item.caption}</p>
            <p className="media-credit">Credit: {item.credit}</p>
          </article>
        ))}
      </section>

      <section data-section="article-media-links">
        <h2>{sections.articleMediaLinks.heading}</h2>
        {sections.articleMediaLinks.items.map((article) => (
          <article key={article.id} className="article-media-link" data-article={article.slug} data-status={article.status} data-media={article.featuredImage.id}>
            <img src={article.featuredImage.url} alt={article.featuredImage.altText} />
            <h3><a href={article.href}>{article.title}</a></h3>
            <p>{article.dek}</p>
            <p className="media-credit">Image credit: {article.featuredImage.credit}</p>
          </article>
        ))}
      </section>
    </section>
  );
}


