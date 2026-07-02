function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const recoveryRoutes = [
  { href: "/", label: "Home", body: "Return to the magazine front page." },
  { href: "/visceral-mag", label: "Articles", body: "Browse the latest Visceral Mag articles." },
  { href: "/search", label: "Search", body: "Search articles, categories, and contributors." },
  { href: "/contact", label: "Contact", body: "Tell us if a link keeps failing." }
];

const errorRoutes = [
  { id: "not-found", label: "404 Not Found", path: "/404", file: "src/pages/not-found.html" },
  { id: "server-error", label: "500 Server Error", path: "/500", file: "src/pages/server-error.html" },
  { id: "offline-maintenance", label: "Offline / Maintenance", path: "/offline", file: "src/pages/offline-maintenance.html" }
];

function getErrorSupportRoutes() {
  return errorRoutes;
}

function renderPublicNav() {
  return `<nav data-section="support-public-nav" aria-label="Public recovery navigation">
    <a class="brand-mark" href="/">B&amp;B</a>
    <a href="/">Home</a>
    <a href="/visceral-mag">Articles</a>
    <a href="/search">Search</a>
    <a href="/contact">Contact</a>
  </nav>`;
}

function renderRecoveryRoutes() {
  return `<section data-section="recovery-routes">
    <h2>Helpful paths</h2>
    ${recoveryRoutes.map((route) => `<a class="route-card" href="${escapeHtml(route.href)}">
      <strong>${escapeHtml(route.label)}</strong>
      <span>${escapeHtml(route.body)}</span>
    </a>`).join("\n    ")}
  </section>`;
}

function renderSupportFooter() {
  return `<footer data-section="support-footer">
    <p>Minimal footer for error recovery. Babas &amp; Brasse keeps this page quiet so readers can find a helpful path.</p>
  </footer>`;
}

function renderStateStrip(section, states) {
  return `<section data-section="${escapeHtml(section)}" ${states.map((state) => `data-state-note="${escapeHtml(state.key)}"`).join(" ")}>
    <h2>State coverage</h2>
    ${states.map((state) => `<article data-state="${escapeHtml(state.key)}">${escapeHtml(state.body)}</article>`).join("\n    ")}
  </section>`;
}

function renderErrorPage(config) {
  return `<section data-page="${escapeHtml(config.page)}" data-route="${escapeHtml(config.route)}" data-area="support" data-generated="error-support-renderer" data-wireframe-source="${escapeHtml(config.wireframe)}" data-support-route="error" data-responsive="desktop-centered mobile-stacked">
  ${renderPublicNav()}

  <section data-section="${escapeHtml(config.messageSection)}">
    <p class="eyebrow">${escapeHtml(config.code)}</p>
    <h1>${escapeHtml(config.title)}</h1>
    <p>${escapeHtml(config.copy)}</p>
    <button type="button" data-action="${escapeHtml(config.primaryAction)}">${escapeHtml(config.primaryLabel)}</button>
  </section>

  ${renderRecoveryRoutes()}

  ${renderStateStrip(config.statesSection, config.states)}

  ${renderSupportFooter()}
</section>`;
}

function renderNotFoundPage() {
  return renderErrorPage({
    page: "not-found",
    route: "/404",
    wireframe: "not-found.html",
    code: "404",
    title: "Page not found",
    messageSection: "not-found-message",
    copy: "This page may be from broken links, removed articles, or mistyped URLs. No blame, just a better route back into Babas & Brasse.",
    primaryAction: "reset-to-search",
    primaryLabel: "Search the magazine",
    statesSection: "not-found-states",
    states: [
      { key: "missing-public-page", body: "Missing public page keeps shared recovery routes visible." },
      { key: "removed-article", body: "Removed articles point readers back to article search." },
      { key: "invalid-slug", body: "Invalid slug state avoids exposing internal lookup details." },
      { key: "reset-to-search", body: "Reset-to-search sends readers to the browse/search route." }
    ]
  });
}

function renderServerErrorPage() {
  return renderErrorPage({
    page: "server-error",
    route: "/500",
    wireframe: "server-error.html",
    code: "500",
    title: "Server problem",
    messageSection: "server-error-message",
    copy: "A failed request or temporary application fault stopped this page from loading. Try again, or use a safe fallback navigation path.",
    primaryAction: "retry",
    primaryLabel: "Retry",
    statesSection: "server-error-states",
    states: [
      { key: "failed-request", body: "Failed request keeps the reader on a plain-language recovery page." },
      { key: "retry", body: "Retry lets the reader attempt the request again." },
      { key: "contact-support", body: "Contact support route is available if the problem keeps happening." },
      { key: "safe-fallback-navigation", body: "Safe fallback navigation avoids trapping the reader on the error page." }
    ]
  });
}

function renderOfflineMaintenancePage() {
  return renderErrorPage({
    page: "offline-maintenance",
    route: "/offline",
    wireframe: "offline-maintenance.html",
    code: "Offline",
    title: "Maintenance mode",
    messageSection: "offline-message",
    copy: "The site may be in a maintenance window, your device may have no network, or cached content may be the safest temporary path.",
    primaryAction: "refresh",
    primaryLabel: "Refresh",
    statesSection: "offline-states",
    states: [
      { key: "no-network", body: "No network state explains that the connection may be unavailable." },
      { key: "maintenance-window", body: "Maintenance window state sets a calm expectation for readers." },
      { key: "refresh", body: "Refresh action lets the reader check whether service has returned." },
      { key: "cached-content", body: "Cached content can be shown when a service worker exists later." },
      { key: "contact-fallback", body: "Contact fallback remains available for repeated access problems." }
    ]
  });
}

module.exports = {
  getErrorSupportRoutes,
  renderNotFoundPage,
  renderServerErrorPage,
  renderOfflineMaintenancePage
};
