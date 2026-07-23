import { getRouteByPath } from "../routes.js";

const publicComps = [
  { id: "home", label: "Home", route: "/", stackOrder: "hero-rail-teasers-media", note: "Hero image, section rail, recent teasers, and media stack in one column." },
  { id: "article", label: "Article", route: "/visceral-mag/send-a-text-before-you-knock", stackOrder: "metadata-title-body-related-comments", note: "Metadata, title, body, related links, comments, and reviews stay readable." },
  { id: "search", label: "Search", route: "/search", stackOrder: "search-field-filter-chips-results", note: "Search input, category chips, reset, and results avoid horizontal overflow." },
  { id: "contact", label: "Contact", route: "/contact", stackOrder: "intro-form-validation-footer", note: "Intro, form controls, validation states, and footer stack with clear spacing." }
];

const adminComps = [
  { id: "dashboard", label: "Dashboard", route: "/admin", rule: "stacked-panels", note: "Metrics, activity, and quick actions become stacked panels." },
  { id: "editor", label: "Editor", route: "/admin/articles/editor-workflow", rule: "actions-near-record", note: "Editor actions stay close to the active article or workflow section." },
  { id: "moderate", label: "Moderate", route: "/admin/moderation", rule: "simplified-tables", note: "Moderation queues collapse into card rows with local approve/reject actions." },
  { id: "inbox", label: "Inbox", route: "/admin/contact-submissions", rule: "actions-near-record", note: "Submission detail and status actions remain reachable under each record." }
];

const breakpoints = [
  { width: 360, label: "Small phone", layoutRule: "one-column-public" },
  { width: 390, label: "Standard phone", layoutRule: "one-column-public" },
  { width: 430, label: "Large phone", layoutRule: "one-column-public" },
  { width: 768, label: "Tablet", layoutRule: "admin-card-rows" }
];

const a11yChecks = [
  { id: "touch-targets", label: "Touch targets", detail: "Interactive controls keep at least 44px target sizing." },
  { id: "no-overlap", label: "No overlap", detail: "Text, chips, buttons, and form labels do not collide." },
  { id: "visible-focus", label: "Visible focus", detail: "Keyboard focus remains visible for menu, search, chips, and forms." },
  { id: "readable-type", label: "Readable type", detail: "Mobile text uses readable scale without viewport-width font hacks." },
  { id: "stable-controls", label: "Stable controls", detail: "Buttons, rows, filters, and cards keep stable dimensions across states." }
];

export function buildMobileWireframeCompsRouteModel() {
  const route = getRouteByPath("/mobile-wireframes");
  return {
    pageId: "mobile-wireframe-comps",
    generatedFrom: "mobile-wireframe-comps-route-model",
    route: { id: route.id, label: route.label, path: route.path, prototypeFile: route.prototypeFile },
    responsive: "mobile-first-support-handoff",
    nav: { behavior: "compressed-mark-menu-search", brandHref: "/", brandLabel: "Babas and Brasse home", menuAction: "open-mobile-menu" },
    intro: { eyebrow: "Mobile Wireframe Comps", title: "Responsive handoff for public and admin screens.", body: "Mobile-only implementation contract for compressed navigation, stacked reader screens, admin card rows, breakpoints, and accessibility checks." },
    publicComps,
    adminComps,
    breakpoints,
    a11y: { minTouchTarget: 44, checks: a11yChecks }
  };
}
