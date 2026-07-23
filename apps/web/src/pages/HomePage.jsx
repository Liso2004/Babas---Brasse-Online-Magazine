import { Link } from "react-router-dom";
import * as launchFixtures from "../data/launchFixtures.js";
import { FigmaArticleCard } from "../components/FigmaArticleCard.jsx";
import { HomeCarousel } from "../components/HomeCarousel.jsx";
import Masonry from "../components/Masonry.jsx";
import { ArrowRight } from "lucide-react";
import { buildHomeRouteModel } from "./homeRouteModel.js";

export function HomePage({ fixtures = launchFixtures }) {
  const model = buildHomeRouteModel(fixtures);
  const { sections } = model;
  const recent = sections.recentArticles.length ? sections.recentArticles : sections.latestArticles;

  return (
    <section className="figma-final-home" data-design-reference="home-brutalist-broadsheet" data-page="home" data-design-source={model.designSource} data-generated={model.generatedFrom} data-prototype-file={model.route.prototypeFile}>
      <HomeCarousel slides={sections.carouselSlides} />
      {sections.leadStory ? (
        <section data-section="figma-featured-article" className="figma-home__feature-shell">
          <FigmaArticleCard article={sections.featuredArticle} featured />
        </section>
      ) : null}

      <section data-section="figma-recent-articles" className="figma-home__recent-shell">
        <div className="section-heading-row">
          <h2>Latest Articles</h2>
          <Link to="/visceral-mag">View all <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
        <div className="figma-card-grid">
          {recent.map((article) => <FigmaArticleCard key={article.id} article={article} />)}
        </div>
      </section>

      <section data-section="home-featured-media" className="home-featured-media">
        <div className="section-heading-row">
          <h2>Media</h2>
          <Link to="/featured">View all <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
        <Masonry items={sections.featuredMedia} blurToFocus={false} />
      </section>

      <section data-section="figma-more-articles" className="figma-more-list">
        <div className="section-heading-row">
          <h2>{sections.moreFromMagazine.heading}</h2>
          <Link to="/search">Browse archive <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
        <div className="figma-more-list__items">
          {sections.moreFromMagazine.items.map((article) => (
            <FigmaArticleCard key={article.id} article={article} compact />
          ))}
        </div>
      </section>
    </section>
  );
}
