import { getRouteByPath } from "../routes.js";

const recoveryRoutes = [
  { href: "/", label: "Home", body: "Return to the magazine front page." },
  { href: "/visceral-mag", label: "Articles", body: "Browse the latest Visceral Mag articles." },
  { href: "/search", label: "Search", body: "Search articles, categories, and contributors." },
  { href: "/contact", label: "Contact", body: "Tell us if a link keeps failing." }
];

export function getErrorSupportRoutes() {
  return [
    { id: "not-found", label: "404 Not Found", path: "/404", file: "src/pages/not-found.html" },
    { id: "server-error", label: "500 Server Error", path: "/500", file: "src/pages/server-error.html" },
    { id: "offline-maintenance", label: "Offline / Maintenance", path: "/offline", file: "src/pages/offline-maintenance.html" }
  ];
}

function buildErrorRouteModel(config) {
  const route = getRouteByPath(config.routePath);
  return {
    pageId: config.pageId,
    generatedFrom: "error-support-route-model",
    route: { id: route.id, label: route.label, path: route.path, prototypeFile: route.prototypeFile },
    code: config.code,
    responsive: "desktop-centered mobile-stacked",
    message: {
      id: config.messageId,
      eyebrow: config.code,
      title: config.title,
      copy: config.copy
    },
    primaryAction: config.primaryAction,
    recoveryRoutes,
    sections: {
      recovery: { id: "recovery-routes" },
      states: { id: config.statesId, notes: config.stateNotes, items: config.stateItems },
      footer: { id: "support-footer", body: "Minimal footer for error recovery. Babas & Brasse keeps this page quiet so readers can find a helpful path." }
    }
  };
}

export function buildNotFoundRouteModel() {
  return buildErrorRouteModel({
    pageId: "not-found",
    routePath: "/404",
    code: "404",
    title: "Page not found",
    messageId: "not-found-message",
    copy: "This page may be from broken links, removed articles, or mistyped URLs. No blame, just a better route back into Babas & Brasse.",
    primaryAction: { id: "reset-to-search", label: "Search the magazine", href: "/search" },
    statesId: "not-found-states",
    stateNotes: ["missing-public-page", "removed-article", "invalid-slug", "reset-to-search"],
    stateItems: [
      { id: "missing-public-page", body: "Missing public page keeps shared recovery routes visible." },
      { id: "removed-article", body: "Removed articles point readers back to article search." },
      { id: "invalid-slug", body: "Invalid slug state avoids exposing internal lookup details." },
      { id: "reset-to-search", body: "Reset-to-search sends readers to the browse/search route." }
    ]
  });
}

export function buildServerErrorRouteModel() {
  return buildErrorRouteModel({
    pageId: "server-error",
    routePath: "/500",
    code: "500",
    title: "Server problem",
    messageId: "server-error-message",
    copy: "A failed request or temporary application fault stopped this page from loading. Try again, or use a safe fallback navigation path.",
    primaryAction: { id: "retry", label: "Retry", href: "/500" },
    statesId: "server-error-states",
    stateNotes: ["failed-request", "retry", "contact-support", "safe-fallback-navigation"],
    stateItems: [
      { id: "failed-request", body: "Failed request keeps the reader on a plain-language recovery page." },
      { id: "retry", body: "Retry lets the reader attempt the request again." },
      { id: "contact-support", body: "Contact support route is available if the problem keeps happening." },
      { id: "safe-fallback-navigation", body: "Safe fallback navigation avoids trapping the reader on the error page." }
    ]
  });
}

export function buildOfflineRouteModel() {
  return buildErrorRouteModel({
    pageId: "offline-maintenance",
    routePath: "/offline",
    code: "Offline",
    title: "Maintenance mode",
    messageId: "offline-message",
    copy: "The site may be in a maintenance window, your device may have no network, or cached content may be the safest temporary path.",
    primaryAction: { id: "refresh", label: "Refresh", href: "/offline" },
    statesId: "offline-states",
    stateNotes: ["no-network", "maintenance-window", "refresh", "cached-content", "contact-fallback"],
    stateItems: [
      { id: "no-network", body: "No network state explains that the connection may be unavailable." },
      { id: "maintenance-window", body: "Maintenance window state sets a calm expectation for readers." },
      { id: "refresh", body: "Refresh action lets the reader check whether service has returned." },
      { id: "cached-content", body: "Cached content can be shown when a service worker exists later." },
      { id: "contact-fallback", body: "Contact fallback remains available for repeated access problems." }
    ]
  });
}
