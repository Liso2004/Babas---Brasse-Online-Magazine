function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const navSections = ["Theatre", "Books", "Essays", "Opinion", "Culture"];

function getContactSubjectOptions() {
  return [
    { value: "general", label: "General contact" },
    { value: "submission", label: "Contributor submission" },
    { value: "correction", label: "Correction" },
    { value: "business", label: "Business inquiry" }
  ];
}

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

function renderIntro() {
  return `<section data-section="contact-intro">
    <div class="contact-copy">
      <p class="eyebrow">Contact</p>
      <h1>Reach Babas &amp; Brasse.</h1>
      <p>Use this route for editorial queries, contributor submissions, corrections, business notes, and general contact.</p>
    </div>
    <aside data-section="contact-info">
      <h2>Social / info</h2>
      <p>For launch, all public contact requests flow into the admin Contact Submissions queue.</p>
      <p>Expected response paths include editorial review, correction triage, and contributor follow-up.</p>
    </aside>
  </section>`;
}

function renderContactForm() {
  const subjects = getContactSubjectOptions();

  return `<form data-section="contact-form" data-admin-target="contact-submissions" action="/contact" method="post">
    <label for="contact-name">Name</label>
    <input id="contact-name" name="name" type="text" autocomplete="name" required>

    <label for="contact-email">Email</label>
    <input id="contact-email" name="email" type="email" autocomplete="email" required>

    <label for="contact-subject">Subject</label>
    <select id="contact-subject" name="subject" required>
      ${subjects.map((subject) => `<option value="${escapeHtml(subject.value)}">${escapeHtml(subject.label)}</option>`).join("\n      ")}
    </select>

    <label for="contact-message">Message</label>
    <textarea id="contact-message" name="message" rows="8" required></textarea>

    <label data-field="spam-protection" for="contact-website">Spam protection placeholder</label>
    <input id="contact-website" name="website" type="text" tabindex="-1" autocomplete="off">

    <button type="submit">Submit contact request</button>
  </form>`;
}

function renderContactStates() {
  return `<section data-section="contact-states" data-state-note="contact-validation" data-state-note="contact-success" data-state-note="contact-submit-error" data-state-note="contact-rate-limit" data-state-note="contact-pending">
    <h2>Contact form states</h2>
    <article data-state="validation">Inline validation shows field errors and focuses the first invalid field.</article>
    <article data-state="success">Success confirmation moves focus to the confirmation message.</article>
    <article data-state="error">Submit error should preserve message text and let the reader retry.</article>
    <article data-state="rate-limit">Rate-limit or spam-block feedback avoids duplicate submissions.</article>
    <article data-state="pending">Prevent duplicate submit while pending.</article>
  </section>`;
}

function renderContactFooter() {
  return `<footer data-section="contact-footer">
    <section data-section="newsletter-footer" id="newsletter">
      <h2>Newsletter</h2>
      <p>Stay connected after contact completion.</p>
      <form data-state-note="newsletter-invalid" data-state-note="newsletter-success" action="/subscribe" method="post">
        <label>Email <input name="email" type="email" placeholder="your@email.com"></label>
        <button type="submit">Subscribe</button>
      </form>
    </section>
    <nav aria-label="Contact footer routes">
      <a href="/about">About</a>
      <a href="/contributors">Contributors</a>
      <a href="/visceral-mag">Articles</a>
    </nav>
  </footer>`;
}

function renderContactPage(fixtures) {
  void fixtures;

  return `<section data-page="contact" data-route="/contact" data-generated="contact-renderer" data-wireframe-source="contact.html" data-responsive="desktop-two-column mobile-one-column">
  ${renderLandingNav()}

  ${renderIntro()}

  ${renderContactForm()}

  ${renderContactStates()}

  ${renderContactFooter()}
</section>`;
}

module.exports = {
  getContactSubjectOptions,
  renderContactPage
};
