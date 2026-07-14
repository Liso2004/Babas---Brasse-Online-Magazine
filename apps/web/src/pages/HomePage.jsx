import { Link } from "react-router-dom";
import * as launchFixtures from "../data/launchFixtures.js";
import { NewsletterSignup } from "../components/NewsletterSignup.jsx";
import { FigmaArticleCard } from "../components/FigmaArticleCard.jsx";
import { ArrowRight } from "lucide-react";
import { buildHomeRouteModel } from "./homeRouteModel.js";

export function HomePage({ fixtures = launchFixtures }) {
  const model = buildHomeRouteModel(fixtures);
  const { sections, newsletter } = model;
  const recent = sections.recentArticles.length ? sections.recentArticles : sections.latestArticles;

  return (
    <section className="figma-final-home" data-design-reference="home-brutalist-broadsheet" data-page="home" data-design-source={model.designSource} data-generated={model.generatedFrom} data-prototype-file={model.route.prototypeFile}>
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

      <section data-section="figma-newsletter" id={newsletter.id} className="figma-newsletter-panel">
        <h2>Stay Connected</h2>
        <p>Get the latest articles, reviews, and cultural commentary delivered to your inbox.</p>
        <NewsletterSignup idPrefix="home-newsletter" />
      </section>
    </section>
  );
}
