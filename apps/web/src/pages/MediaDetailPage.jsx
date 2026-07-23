import { Link } from "react-router-dom";
import * as launchFixtures from "../data/launchFixtures.js";
import { buildMediaDetailRouteModel } from "./mediaDetailRouteModel.js";

export function MediaDetailPage({ fixtures = launchFixtures, mediaId = "" }) {
  const model = buildMediaDetailRouteModel(fixtures, mediaId);

  if (model.state === "not-found") {
    return (
      <section className="figma-public-page media-detail-page" data-page="media-detail" data-state="not-found" data-generated={model.generatedFrom}>
        <header className="figma-page-intro" data-section="media-detail-unavailable">
          <p className="eyebrow">Media</p>
          <h1>Media unavailable</h1>
          <p>This photograph is unavailable or has moved.</p>
          <Link to={model.backHref}>Back to Media</Link>
        </header>
      </section>
    );
  }

  const { media } = model;

  return (
    <article className="figma-public-page media-detail-page" data-page="media-detail" data-design-reference="media-detail-editorial" data-generated={model.generatedFrom} data-media-id={media.id} data-prototype-file={model.route.prototypeFile}>
      <header className="media-detail-hero" data-section="media-detail-hero">
        <nav className="figma-breadcrumb" aria-label="Breadcrumb"><Link to="/featured">Media</Link><span aria-hidden="true">/</span><span>{media.title}</span></nav>
        <p className="eyebrow">Photography</p>
        <h1>{media.title}</h1>
        {media.description ? <p>{media.description}</p> : null}
      </header>

      <figure className="media-detail-figure" data-section="media-detail-image">
        <img src={media.url} alt={media.altText} width="1600" height="1100" />
        <figcaption>{media.description}</figcaption>
      </figure>

      <section className="media-detail-meta" data-section="media-detail-meta" aria-label="Media details">
        <dl>
          <div><dt>Photographer</dt><dd>{media.photographer}</dd></div>
          {media.publishedAt ? <div><dt>Publication date</dt><dd><time dateTime={media.publishedAt}>{media.displayDate}</time></dd></div> : null}
          {media.relatedArticleHref ? <div><dt>Published with</dt><dd><Link to={media.relatedArticleHref}>Read the article</Link></dd></div> : null}
        </dl>
      </section>

      <section data-section="seo-metadata" hidden>
        <p data-seo="title">{model.seo.title}</p>
        <p data-seo="description">{model.seo.description}</p>
        <p data-seo="og-title">{model.seo.ogTitle}</p>
        <p data-seo="og-description">{model.seo.ogDescription}</p>
      </section>
    </article>
  );
}
