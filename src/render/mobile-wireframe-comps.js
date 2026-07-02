function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getMobileWireframeRoute() {
  return {
    id: "mobile-wireframe-comps",
    path: "/mobile-wireframes",
    file: "src/pages/mobile-wireframes.html",
    wireframe: "mobile-wireframes.html"
  };
}

function getMobilePublicComps() {
  return [
    {
      id: "home",
      label: "Home",
      route: "/",
      stackOrder: "hero-rail-teasers-newsletter",
      note: "Hero image, section rail, recent teasers, and newsletter stack in one column."
    },
    {
      id: "article",
      label: "Article",
      route: "/visceral-mag/send-a-text-before-you-knock",
      stackOrder: "metadata-title-body-related-comments",
      note: "Metadata, title, body, related links, comments, and reviews stay readable."
    },
    {
      id: "search",
      label: "Search",
      route: "/search",
      stackOrder: "search-field-filter-chips-results",
      note: "Search input, category chips, reset, and results avoid horizontal overflow."
    },
    {
      id: "contact",
      label: "Contact",
      route: "/contact",
      stackOrder: "intro-form-validation-footer",
      note: "Intro, form controls, validation states, and footer stack with clear spacing."
    }
  ];
}

function getMobileAdminComps() {
  return [
    {
      id: "dashboard",
      label: "Dashboard",
      route: "/admin",
      rule: "stacked-panels",
      note: "Metrics, activity, and quick actions become stacked panels."
    },
    {
      id: "editor",
      label: "Editor",
      route: "/admin/articles/editor-workflow",
      rule: "actions-near-record",
      note: "Editor actions stay close to the active article or workflow section."
    },
    {
      id: "moderate",
      label: "Moderate",
      route: "/admin/moderation",
      rule: "simplified-tables",
      note: "Moderation queues collapse into card rows with local approve/reject actions."
    },
    {
      id: "inbox",
      label: "Inbox",
      route: "/admin/contact-submissions",
      rule: "actions-near-record",
      note: "Submission detail and status actions remain reachable under each record."
    }
  ];
}

function getMobileBreakpoints() {
  return [
    { width: 360, label: "Small phone", layoutRule: "one-column-public" },
    { width: 390, label: "Standard phone", layoutRule: "one-column-public" },
    { width: 430, label: "Large phone", layoutRule: "one-column-public" },
    { width: 768, label: "Tablet", layoutRule: "admin-card-rows" }
  ];
}

function getMobileA11yChecks() {
  return [
    { id: "touch-targets", label: "Touch targets", detail: "Interactive controls keep at least 44px target sizing." },
    { id: "no-overlap", label: "No overlap", detail: "Text, chips, buttons, and form labels do not collide." },
    { id: "visible-focus", label: "Visible focus", detail: "Keyboard focus remains visible for menu, search, chips, and forms." },
    { id: "readable-type", label: "Readable type", detail: "Mobile text uses readable scale without viewport-width font hacks." },
    { id: "stable-controls", label: "Stable controls", detail: "Buttons, rows, filters, and cards keep stable dimensions across states." }
  ];
}

function renderMobileNav() {
  return `<header data-section="mobile-nav" data-nav-behavior="compressed-mark-menu-search">
    <a class="brand-mark" href="/" aria-label="Babas and Brasse home">B&amp;B</a>
    <button type="button" data-action="open-mobile-menu" aria-expanded="false">Menu</button>
    <label>Search <input name="mobile-search" type="search" placeholder="Search"></label>
    <p>Compressed B&amp;B mark, mobile menu, and search behavior are preserved from the Open Design comp.</p>
  </header>`;
}

function renderPublicComps() {
  return `<section data-section="mobile-public-comps" aria-label="Public mobile wireframe comps">
    <h2>Public mobile comps</h2>
    ${getMobilePublicComps().map((comp) => `<article data-mobile-comp="${escapeHtml(comp.id)}" data-route="${escapeHtml(comp.route)}" data-stack-order="${escapeHtml(comp.stackOrder)}">
      <h3>${escapeHtml(comp.label)}</h3>
      <p>${escapeHtml(comp.note)}</p>
    </article>`).join("\n    ")}
  </section>`;
}

function renderAdminComps() {
  const rules = [...new Set(getMobileAdminComps().map((comp) => comp.rule))];

  return `<section data-section="mobile-admin-comps" aria-label="Admin mobile wireframe comps">
    <h2>Admin mobile comps</h2>
    ${rules.map((rule) => `<span data-mobile-admin-rule="${escapeHtml(rule)}">${escapeHtml(rule)}</span>`).join("\n    ")}
    ${getMobileAdminComps().map((comp) => `<article data-mobile-comp="${escapeHtml(comp.id)}" data-route="${escapeHtml(comp.route)}" data-mobile-admin-rule-ref="${escapeHtml(comp.rule)}">
      <h3>${escapeHtml(comp.label)}</h3>
      <p>${escapeHtml(comp.note)}</p>
    </article>`).join("\n    ")}
  </section>`;
}

function renderBreakpoints() {
  return `<section data-section="mobile-breakpoints" aria-label="Mobile breakpoint handoff">
    <h2>Breakpoints</h2>
    ${getMobileBreakpoints().map((breakpoint) => `<article data-breakpoint="${escapeHtml(breakpoint.width)}" data-layout-rule="${escapeHtml(breakpoint.layoutRule)}">
      <strong>${escapeHtml(breakpoint.width)}px</strong>
      <p>${escapeHtml(breakpoint.label)}</p>
    </article>`).join("\n    ")}
  </section>`;
}

function renderA11yChecks() {
  return `<section data-section="mobile-a11y" data-min-touch-target="44" aria-label="Mobile accessibility handoff">
    <h2>Accessibility handoff</h2>
    ${getMobileA11yChecks().map((check) => `<article data-a11y-check="${escapeHtml(check.id)}">
      <h3>${escapeHtml(check.label)}</h3>
      <p>${escapeHtml(check.detail)}</p>
    </article>`).join("\n    ")}
  </section>`;
}

function renderMobileWireframeCompsPage() {
  return `<section data-page="mobile-wireframe-comps" data-route="/mobile-wireframes" data-area="support" data-generated="mobile-wireframe-comps-renderer" data-wireframe-source="mobile-wireframes.html" data-responsive="mobile-first-support-handoff">
  ${renderMobileNav()}

  <header data-section="mobile-wireframe-intro">
    <p class="eyebrow">Mobile Wireframe Comps</p>
    <h1>Responsive handoff for public and admin screens.</h1>
    <p>Mobile-only implementation contract for compressed navigation, stacked reader screens, admin card rows, breakpoints, and accessibility checks.</p>
  </header>

  ${renderPublicComps()}

  ${renderAdminComps()}

  ${renderBreakpoints()}

  ${renderA11yChecks()}
</section>`;
}

module.exports = {
  getMobileWireframeRoute,
  getMobilePublicComps,
  getMobileAdminComps,
  getMobileBreakpoints,
  getMobileA11yChecks,
  renderMobileWireframeCompsPage
};
