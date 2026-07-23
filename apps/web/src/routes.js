export const publicRoutes = [
  { id: "home", label: "Home", path: "/", area: "public", prototypeFile: "src/pages/home.html" },
  { id: "about", label: "About", path: "/about", area: "public", prototypeFile: "src/pages/about.html" },
  { id: "creative-team", label: "Creative Team", path: "/creative-team", area: "public", prototypeFile: "src/pages/creative-team.html" },
  { id: "contributors", label: "Contributors", path: "/contributors", area: "public", prototypeFile: "src/pages/contributors.html" },
  { id: "profile-detail", label: "Profile", path: "/people/:slug", area: "public", navVisible: false, prototypeFile: "src/pages/profile-detail.html" },
  { id: "visceral-mag", label: "Visceral Mag", path: "/visceral-mag", area: "public", prototypeFile: "src/pages/visceral-mag.html" },
  { id: "article-detail", label: "Article Detail", path: "/visceral-mag/:slug", area: "public", navVisible: false, prototypeFile: "src/pages/article-detail.html" },
  { id: "search", label: "Search", path: "/search", area: "public", prototypeFile: "src/pages/categories-search.html" },
  { id: "featured", label: "Media", path: "/featured", area: "public", prototypeFile: "src/pages/featured-media.html" },
  { id: "media-detail", label: "Media Detail", path: "/media/:mediaId", area: "public", navVisible: false, prototypeFile: "src/pages/media-detail.html" },
  { id: "contact", label: "Contact", path: "/contact", area: "public", prototypeFile: "src/pages/contact.html" }
];

export const publicNavigationRoutes = publicRoutes.filter((route) => route.navVisible !== false && !route.path.includes(":"));

export const adminRoutes = [
  { id: "admin-dashboard", label: "Dashboard", path: "/admin", area: "admin", authRequired: true, prototypeFile: "src/pages/admin/dashboard.html" },
  { id: "article-management", label: "Articles", path: "/admin/articles", area: "admin", authRequired: true, prototypeFile: "src/pages/admin/article-management.html" },
  { id: "profile-media-management", label: "Profiles / Media", path: "/admin/profiles-media", area: "admin", authRequired: true, prototypeFile: "src/pages/admin/profile-media-management.html" },
  { id: "moderation", label: "Moderation", path: "/admin/moderation", area: "admin", authRequired: true, prototypeFile: "src/pages/admin/comments-reviews-moderation.html" },
  { id: "contact-submissions", label: "Contact Submissions", path: "/admin/contact-submissions", area: "admin", authRequired: true, prototypeFile: "src/pages/admin/contact-submissions.html" }
];

export const supportRoutes = [
  { id: "admin-login", label: "Admin Login", path: "/admin/login", area: "support", prototypeFile: "src/pages/admin/login.html" },
  { id: "password-reset", label: "Password Reset", path: "/admin/password-reset", area: "support", prototypeFile: "src/pages/admin/password-reset.html" },
  { id: "not-found", label: "Not Found", path: "/404", area: "support", prototypeFile: "src/pages/not-found.html" },
  { id: "server-error", label: "Server Error", path: "/500", area: "support", prototypeFile: "src/pages/server-error.html" },
  { id: "offline", label: "Offline", path: "/offline", area: "support", prototypeFile: "src/pages/offline-maintenance.html" },
  { id: "media-upload", label: "Media Upload", path: "/admin/media/upload", area: "support", authRequired: true, prototypeFile: "src/pages/admin/media-upload-modal.html" },
  { id: "article-editor-workflow", label: "Article Editor Workflow", path: "/admin/articles/editor-workflow", area: "support", authRequired: true, prototypeFile: "src/pages/admin/article-editor-workflow.html" },
];

export const routes = [...publicRoutes, ...adminRoutes, ...supportRoutes];

function matchDynamicRoute(route, pathname) {
  if (!route.path.includes(":")) {
    return null;
  }

  const routeParts = route.path.split("/").filter(Boolean);
  const pathParts = pathname.split("/").filter(Boolean);

  if (routeParts.length !== pathParts.length) {
    return null;
  }

  const params = {};

  for (let index = 0; index < routeParts.length; index += 1) {
    const routePart = routeParts[index];
    const pathPart = pathParts[index];

    if (routePart.startsWith(":")) {
      params[routePart.slice(1)] = decodeURIComponent(pathPart);
      continue;
    }

    if (routePart !== pathPart) {
      return null;
    }
  }

  return { ...route, params };
}

export function getRouteByPath(pathname) {
  const exactMatch = routes.find((route) => route.path === pathname);

  if (exactMatch) {
    return { ...exactMatch, params: {} };
  }

  const dynamicMatch = routes.map((route) => matchDynamicRoute(route, pathname)).find(Boolean);

  if (dynamicMatch) {
    return dynamicMatch;
  }

  return { ...routes.find((route) => route.path === "/404"), params: {} };
}

