function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const odSections = ["Theatre", "Books", "Essays", "Opinion", "Culture"];
const odTeaserCategories = ["books", "essays", "opinion"];

function renderArticleCard(article) {
  return `
    <article class="article-card" data-article="${escapeHtml(article.slug)}" data-status="${escapeHtml(article.status)}">
      <p class="eyebrow">${escapeHtml(article.categoryId)}</p>
      <h3>${escapeHtml(article.title)}</h3>
      <p>${escapeHtml(article.dek)}</p>
    </article>`;
}

function renderLandingNav() {
  return `<nav data-section="landing-nav" data-nav-height="76" aria-label="Primary editorial navigation">
    <a class="brand-mark" href="/" aria-label="Babas and Brasse home">B&amp;B</a>
    <div class="editorial-links">
      ${odSections.map((section) => `<a data-nav-link="${section.toLowerCase()}" href="/search?category=${section.toLowerCase()}">${section}</a>`).join("\n      ")}
    </div>
    <label class="search-entry">Search <input name="q" type="search" placeholder="Search articles"></label>
    <a class="subscribe-cta" href="#newsletter">Subscribe</a>
  </nav>`;
}

function renderSectionRail() {
  return `<section data-section="section-rail" data-overflow="section-rail-horizontal" aria-label="Editorial sections">
    ${odSections.map((section) => `<a data-section-chip="${section.toLowerCase()}" href="/search?category=${section.toLowerCase()}">${section}</a>`).join("\n    ")}
  </section>`;
}

function renderRecentTeasers(publishedArticles) {
  const fallbackArticles = publishedArticles.length ? publishedArticles : [];

  return `<section data-section="recent-article-teasers" data-responsive="desktop-3-up tablet-2-up mobile-1-up">
    <h2>Recent Articles</h2>
    ${odTeaserCategories.map((category, index) => {
      const article = fallbackArticles[index % fallbackArticles.length] || {
        slug: `${category}-placeholder`,
        title: `${category} teaser`,
        dek: "Article teaser placeholder.",
        publishedAt: "May 22 2026"
      };
      return `<article class="article-teaser" data-teaser-category="${category}" data-article="${escapeHtml(article.slug)}">
      <span class="article-kicker">${category[0].toUpperCase()}${category.slice(1)}</span>
      <span class="article-thumb" aria-hidden="true"></span>
      <h3>${escapeHtml(article.title)}</h3>
      <p>${escapeHtml(article.dek)}</p>
      <p class="article-meta">Mariska | ${escapeHtml(article.publishedAt || "May 22 2026")} | 8-min read</p>
    </article>`;
    }).join("\n    ")}
  </section>`;
}

function renderNewsletterFooter() {
  return `<footer data-section="newsletter-footer" id="newsletter">
    <section class="newsletter-block">
      <h2>Stay Connected</h2>
      <p>Receive new essays, reviews, interviews, and cultural notes from Babas &amp; Brasse.</p>
      <form data-state-note="newsletter-invalid" data-state-note="newsletter-success" action="/subscribe" method="post">
        <label>Email <input name="email" type="email" placeholder="your@email.com"></label>
        <button type="submit">Subscribe</button>
      </form>
    </section>
    <nav aria-label="Footer links">
      <a href="/visceral-mag">Sections</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
      <a href="/submit-writing" data-state-note="submit-error">Submit writing</a>
    </nav>
    <p class="publication-blurb">Babas &amp; Brasse is an editorial home for theatre, books, essays, opinion, and culture.</p>
    <p class="legal-row">Babas &amp; Brasse Online Magazine. MVP launch target July 31, 2026.</p>
  </footer>`;
}

function renderHomePage(fixtures) {
  const publishedArticles = fixtures.articles.filter((article) => article.status === "published");
  const leadStory = publishedArticles.find((article) => article.slug === "send-a-text-before-you-knock") || publishedArticles[0];
  const latestArticles = publishedArticles.slice(0, 3);
  const categories = fixtures.categories.slice(0, 6);
  const mediaItems = fixtures.mediaItems.slice(0, 3);
  const people = fixtures.profiles.slice(0, 4);

  return `<section data-page="home" data-generated="home-renderer" data-od-contract="landing-home" data-responsive="desktop-3-up tablet-2-up mobile-1-up" data-state-note="search-loading" data-state-note="search-no-results">
  ${renderLandingNav()}

  <header data-section="home-intro">
    <p class="eyebrow">Babas &amp; Brasse Online Magazine</p>
    <h1>Culture, essays, reviews, interviews, photography, and artwork.</h1>
    <p>Launch-ready discovery hub for the July 31, 2026 MVP.</p>
  </header>

  <section data-section="lead-story" data-hero-topic="theatre">
    <p class="eyebrow">Lead theatre story</p>
    <h2>${escapeHtml(leadStory.title)}</h2>
    <p>${escapeHtml(leadStory.dek)}</p>
    <p class="article-meta">Mariska | May 22 2026 | 8-min read</p>
    <img src="${escapeHtml(leadStory.featuredImage.url)}" alt="${escapeHtml(leadStory.featuredImage.altText)}" data-image-ratio="16:10">
    <div class="cta-row"><a href="/visceral-mag/${escapeHtml(leadStory.slug)}">Read lead story</a><a href="/visceral-mag">Browse articles</a></div>
  </section>

  ${renderSectionRail()}

  <section data-section="latest-articles">
    <h2>Latest Articles</h2>
    ${latestArticles.map(renderArticleCard).join("\n")}
  </section>

  ${renderRecentTeasers(latestArticles)}

  <section data-section="category-access">
    <h2>Browse Categories</h2>
    ${categories.map((category) => `<a class="category-chip" href="/search?category=${escapeHtml(category.slug)}">${escapeHtml(category.label)}</a>`).join("\n    ")}
  </section>

  <section data-section="media-preview">
    <h2>Featured / Media</h2>
    ${mediaItems.map((item) => `<article class="media-card" data-media="${escapeHtml(item.id)}"><img src="${escapeHtml(item.url)}" alt="${escapeHtml(item.altText)}"><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.caption)}</p></article>`).join("\n    ")}
  </section>

  <section data-section="people-preview">
    <h2>People</h2>
    ${people.map((profile) => `<article class="profile-card" data-profile="${escapeHtml(profile.id)}" data-profile-type="${escapeHtml(profile.type)}"><h3>${escapeHtml(profile.name)}</h3><p>${escapeHtml(profile.role)}</p></article>`).join("\n    ")}
  </section>

  ${renderNewsletterFooter()}
</section>`;
}

module.exports = {
  renderHomePage
};


