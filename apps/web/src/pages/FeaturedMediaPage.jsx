import { Link } from "react-router-dom";
import * as launchFixtures from "../data/launchFixtures.js";
import Masonry from "../components/Masonry.jsx";
import { buildFeaturedMediaRouteModel } from "./featuredMediaRouteModel.js";

export function FeaturedMediaPage({ fixtures = launchFixtures }) {
  const model = buildFeaturedMediaRouteModel(fixtures);
  const { hero, sections } = model;

  return (
    <section className="figma-public-page figma-featured-page" data-page="featured-media" data-design-reference="featured-media-gallery-v4" data-route={model.route.path} data-generated={model.generatedFrom} data-prototype-file={model.route.prototypeFile}>
      <header data-section="media-intro" className="figma-page-intro">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1>{hero.title}</h1>
        <p>{hero.dek}</p>
      </header>

      <section data-section="media-gallery" className="figma-content-section featured-media-masonry-shell" data-state={sections.mediaGallery.state}>
        <div className="section-heading-row">
          <h2>{sections.mediaGallery.heading}</h2>
          <Link to="/contact">Submit media</Link>
        </div>
        {sections.mediaGallery.state === "no-media" ? (
          <div className="figma-empty-state" data-state="no-media">
            <p>{sections.mediaGallery.body}</p>
            <Link to={sections.mediaGallery.contactHref}>Contact the editors</Link>
          </div>
        ) : (
          <Masonry
            items={sections.mediaGallery.items}
            variant="overlay"
            blurToFocus={false}
            hoverScale={1.015}
          />
        )}
      </section>
    </section>
  );
}
