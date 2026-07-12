const fallbackSiteUrl = "https://babasandbrasse.co.za";
const viteSiteUrl = import.meta.env?.VITE_PUBLIC_SITE_URL;

export const publicSiteUrl = (viteSiteUrl || fallbackSiteUrl).replace(/\/$/, "");

const defaultDescription = "Babas & Brasse is a digital magazine for South African arts, literature, theatre, criticism, essays, interviews, and cultural conversation.";
const defaultOgImage = "/media/babas-brasse-logo.jpeg";

const routeDefaults = {
  home: {
    title: "Babas & Brasse | South African arts, literature, and theatre",
    description: defaultDescription,
    canonicalPath: "/",
    ogType: "website"
  },
  about: {
    title: "About | Babas & Brasse",
    description: "Learn about the Babas & Brasse editorial mission, cultural focus, and online magazine launch scope.",
    canonicalPath: "/about",
    ogType: "website"
  },
  "creative-team": {
    title: "Creative Team | Babas & Brasse",
    description: "Meet the people shaping the Babas & Brasse online magazine and launch editorial direction.",
    canonicalPath: "/creative-team",
    ogType: "website"
  },
  contributors: {
    title: "Contributors | Babas & Brasse",
    description: "Discover the writers, reviewers, essayists, and cultural voices contributing to Babas & Brasse.",
    canonicalPath: "/contributors",
    ogType: "website"
  },
  "visceral-mag": {
    title: "Visceral Mag | Babas & Brasse",
    description: "Read the latest Babas & Brasse cultural writing, including reviews, essays, interviews, and visual notes.",
    canonicalPath: "/visceral-mag",
    ogType: "website"
  },
  search: {
    title: "Search Reviews, Essays, Interviews | Babas & Brasse",
    description: "Search Babas & Brasse reviews, essays, interviews, theatre writing, book criticism, and cultural features.",
    canonicalPath: "/search",
    ogType: "website"
  },
  featured: {
    title: "Featured Media | Babas & Brasse",
    description: "Browse featured photography, artwork, visual notes, and article-linked media from Babas & Brasse.",
    canonicalPath: "/featured",
    ogType: "website"
  },
  contact: {
    title: "Contact | Babas & Brasse",
    description: "Contact Babas & Brasse about submissions, interviews, media, partnerships, and editorial inquiries.",
    canonicalPath: "/contact",
    ogType: "website"
  },
  "admin-dashboard": {
    title: "Admin Dashboard | Babas & Brasse",
    description: "Protected Babas & Brasse editorial operations dashboard for publishing, moderation, media, and inbox readiness.",
    canonicalPath: "/admin",
    ogType: "website",
    robots: "noindex,nofollow"
  }
};

function absoluteUrl(pathname = "/") {
  if (/^https?:\/\//i.test(pathname)) {
    return pathname;
  }

  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${publicSiteUrl}${normalized}`;
}

function getArticle(fixtures, slug) {
  return fixtures?.articles?.find((article) => article.slug === slug);
}

function buildArticleMetadata(route, options) {
  const article = getArticle(options.fixtures, options.slug);

  if (!article || article.status !== "published") {
    return normalizeMetadata({
      title: "Article unavailable | Babas & Brasse",
      description: "This Babas & Brasse article is unavailable, unpublished, or has moved.",
      canonicalPath: "/visceral-mag",
      ogType: "article",
      robots: "noindex,follow"
    });
  }

  const seo = article.seo || {};
  const canonicalPath = `/visceral-mag/${article.slug}`;
  return normalizeMetadata({
    title: seo.title || `${article.title} | Babas & Brasse`,
    description: seo.description || article.dek,
    canonicalPath,
    ogTitle: seo.ogTitle || article.title,
    ogDescription: seo.ogDescription || seo.description || article.dek,
    ogType: "article",
    ogImage: article.featuredImage?.url || defaultOgImage,
    publishedAt: article.publishedAt
  });
}

function normalizeMetadata(metadata) {
  const canonicalPath = metadata.canonicalPath || "/";
  const title = metadata.title || routeDefaults.home.title;
  const description = metadata.description || defaultDescription;
  const ogTitle = metadata.ogTitle || title;
  const ogDescription = metadata.ogDescription || description;
  const ogImage = metadata.ogImage || defaultOgImage;

  return {
    title,
    description,
    canonicalPath,
    canonicalUrl: absoluteUrl(canonicalPath),
    ogTitle,
    ogDescription,
    ogType: metadata.ogType || "website",
    ogUrl: absoluteUrl(canonicalPath),
    ogImage: absoluteUrl(ogImage),
    twitterCard: "summary_large_image",
    robots: metadata.robots || "index,follow",
    publishedAt: metadata.publishedAt || null
  };
}

export function buildRouteMetadata(route, options = {}) {
  if (route?.id === "article-detail") {
    return buildArticleMetadata(route, options);
  }

  const base = routeDefaults[route?.id] || {
    title: `${route?.label || "Page"} | Babas & Brasse`,
    description: defaultDescription,
    canonicalPath: route?.path && !route.path.includes(":") ? route.path : "/",
    ogType: "website"
  };

  return normalizeMetadata(base);
}