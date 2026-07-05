import fixturesModule from "../../../../src/content/fixtures.js";
import { buildHomeRouteModel } from "./homeRouteModel.js";

const launchFixtures = fixturesModule.default || fixturesModule;

export function HomePage({ fixtures = launchFixtures }) {
  const model = buildHomeRouteModel(fixtures);
  const { hero, sections, newsletter } = model;

  return (
    <section data-page="home" data-generated={model.generatedFrom} data-prototype-file={model.route.prototypeFile}>
      <header data-section="home-intro">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1>{hero.title}</h1>
        <p>{hero.dek}</p>
      </header>

      {sections.leadStory ? (
        <section data-section="lead-story">
          <p className="eyebrow">Lead theatre story</p>
          <h2>{sections.leadStory.title}</h2>
          <p>{sections.leadStory.dek}</p>
          <a href={sections.leadStory.href}>Read lead story</a>
        </section>
      ) : null}

      <section data-section="latest-articles">
        <h2>Latest Articles</h2>
        {sections.latestArticles.map((article) => (
          <article key={article.id} data-article={article.slug} data-status={article.status}>
            <p className="eyebrow">{article.categoryId}</p>
            <h3>{article.title}</h3>
            <p>{article.dek}</p>
            <a href={article.href}>Read article</a>
          </article>
        ))}
      </section>

      <section data-section="category-access">
        <h2>Browse Categories</h2>
        {sections.categoryAccess.map((category) => (
          <a key={category.id} className="category-chip" href={category.href}>{category.label}</a>
        ))}
      </section>

      <section data-section="media-preview">
        <h2>Featured / Media</h2>
        {sections.mediaPreview.map((item) => (
          <article key={item.id} data-media={item.id}>
            <img src={item.url} alt={item.altText} />
            <h3>{item.title}</h3>
            <p>{item.caption}</p>
          </article>
        ))}
      </section>

      <section data-section="people-preview">
        <h2>People</h2>
        {sections.peoplePreview.map((profile) => (
          <article key={profile.id} data-profile={profile.id} data-profile-type={profile.type}>
            <h3>{profile.name}</h3>
            <p>{profile.role}</p>
          </article>
        ))}
      </section>

      <footer data-section="newsletter-footer" id={newsletter.id}>
        <h2>Stay Connected</h2>
        <form action={newsletter.action} method="post">
          <label>Email <input name="email" type="email" /></label>
          <button type="submit">Subscribe</button>
        </form>
      </footer>
    </section>
  );
}
