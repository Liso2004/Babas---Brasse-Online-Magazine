function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const navSections = ["Theatre", "Books", "Essays", "Opinion", "Culture"];

const aboutCopy = {
  mission: "Babas & Brasse creates a home for cultural writing, criticism, interviews, photography, and artwork with a voice rooted in lived experience.",
  vision: "The magazine exists to make theatre, books, essays, opinion, and culture feel close, discussable, and worth returning to.",
  organisation: "The launch MVP keeps the publication structure lean: a public magazine, contributor profiles, featured media, contact paths, and an editor-controlled admin area."
};

const pillarFallbacks = [
  { slug: "theatre", label: "Theatre", description: "Stage work, performance notes, and cultural scenes that deserve slower attention." },
  { slug: "books", label: "Books", description: "Reading culture, reviews, interviews, and writer-focused editorial work." },
  { slug: "culture", label: "Culture", description: "Essays, artwork, opinion, and media features from the Babas & Brasse world." }
];

function renderLandingNav() {
  return `<nav data-section="landing-nav" data-nav-height="76" aria-label="Primary editorial navigation">
    <a class="brand-mark" href="/" aria-label="Babas and Brasse home">B&amp;B</a>
    <div class="editorial-links">
      ${navSections.map((section) => `<a data-nav-link="${section.toLowerCase()}" href="/search?category=${section.toLowerCase()}">${section}</a>`).join("\n      ")}
    </div>
    <label class="search-entry">Search <input name="q" type="search" placeholder="Search articles"></label>
    <a class="subscribe-cta" href="#newsletter">Subscribe</a>
  </nav>`;
}

function renderOverview() {
  return `<section data-section="about-overview" data-state-note="about-empty-stub">
    <div class="about-copy-stack">
      <article data-about-block="mission">
        <p class="eyebrow">Mission</p>
        <h2>Mission</h2>
        <p>${escapeHtml(aboutCopy.mission)}</p>
      </article>
      <article data-about-block="vision">
        <p class="eyebrow">Vision</p>
        <h2>Vision</h2>
        <p>${escapeHtml(aboutCopy.vision)}</p>
      </article>
    </div>
    <figure data-about-block="organisation">
      <img src="/media/opening-banner-placeholder.jpg" alt="Babas and Brasse publication image placeholder">
      <figcaption><strong>Organisation</strong> ${escapeHtml(aboutCopy.organisation)}</figcaption>
    </figure>
  </section>`;
}

function renderPillars(fixtures) {
  const categoryPillars = fixtures.categories
    .filter((category) => ["essays", "interviews"].includes(category.slug))
    .map((category) => ({ slug: category.slug, label: category.label, description: category.description }));
  const pillars = [...pillarFallbacks, ...categoryPillars];

  return `<section data-section="editorial-pillars">
    <h2>Editorial pillars</h2>
    ${pillars.map((pillar) => `<article class="pillar-card" data-pillar="${escapeHtml(pillar.slug)}">
      <p class="eyebrow">${escapeHtml(pillar.label)}</p>
      <h3>${escapeHtml(pillar.label)}</h3>
      <p>${escapeHtml(pillar.description)}</p>
    </article>`).join("\n    ")}
  </section>`;
}

function renderRouteCards() {
  const routes = [
    { href: "/creative-team", label: "Creative Team", body: "Meet the people shaping the publication." },
    { href: "/contributors", label: "Contributors", body: "Browse writers and their published work." },
    { href: "/contact", label: "Contact", body: "Send editorial queries, corrections, submissions, and general notes." }
  ];

  return `<section data-section="about-route-cards">
    <h2>Continue through Babas &amp; Brasse</h2>
    ${routes.map((route) => `<article class="route-card" data-route-card="${escapeHtml(route.label.toLowerCase().replace(/\s+/g, "-"))}">
      <h3>${escapeHtml(route.label)}</h3>
      <p>${escapeHtml(route.body)}</p>
      <a href="${escapeHtml(route.href)}">Open ${escapeHtml(route.label)}</a>
    </article>`).join("\n    ")}
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
  </footer>`;
}

function renderAboutPage(fixtures) {
  return `<section data-page="about" data-route="/about" data-generated="about-renderer" data-wireframe-source="about.html" data-responsive="desktop-split tablet-stack mobile-mission-first">
  ${renderLandingNav()}

  <header data-section="about-intro">
    <p class="eyebrow">About Babas &amp; Brasse</p>
    <h1>Mission, vision, and the shape of the publication.</h1>
    <p>The MVP About page introduces the magazine without turning the screen into a marketing landing page.</p>
  </header>

  ${renderOverview()}

  ${renderPillars(fixtures)}

  ${renderRouteCards()}

  ${renderNewsletterFooter()}
</section>`;
}

module.exports = {
  renderAboutPage
};
