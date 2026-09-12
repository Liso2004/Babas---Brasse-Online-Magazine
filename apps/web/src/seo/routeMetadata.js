const fallbackSiteUrl = "https://urbananarchy.co.za";
const viteSiteUrl = import.meta.env?.VITE_PUBLIC_SITE_URL;

export const publicSiteUrl = (viteSiteUrl || fallbackSiteUrl).replace(/\/$/, "");

const defaultDescription = "URBAN ANARCHY is an editorial and visual-research publication for fashion, street culture, design, creative practice, and city image-making.";
const defaultOgImage = "/media/carousel/babas-brasse-city-collage.webp";

const routeDefaults = {
  home: {
    title: "URBAN ANARCHY | South African arts, literature, and theatre",
    description: defaultDescription,
    canonicalPath: "/",
    ogType: "website"
  },
  about: {
    title: "About | URBAN ANARCHY",
    description: "Learn about the URBAN ANARCHY editorial mission, cultural focus, and online magazine launch scope.",
    canonicalPath: "/about",
    ogType: "website"
  },
  "creative-team": {
    title: "Creative Team | URBAN ANARCHY",
    description: "Meet the people shaping the URBAN ANARCHY online magazine and launch editorial direction.",
    canonicalPath: "/creative-team",
    ogType: "website"
  },
  contributors: {
    title: "Contributors | URBAN ANARCHY",
    description: "Discover the writers, reviewers, essayists, and cultural voices contributing to URBAN ANARCHY.",
    canonicalPath: "/contributors",
    ogType: "website"
  },
  "visceral-mag": {
    title: "Visceral Mag | URBAN ANARCHY",
    description: "Read the latest URBAN ANARCHY cultural writing, including reviews, essays, interviews, and visual notes.",
    canonicalPath: "/visceral-mag",
    ogType: "website"
  },
  moodboard: {
    title: "Visual Research / Issue 004 | URBAN ANARCHY",
    description: "Explore Issue 004 visual research, source material, and archive specimens from URBAN ANARCHY.",
    canonicalPath: "/moodboard",
    ogType: "website"
  },
  shop: {
    title: "Drop 01 Shop | URBAN ANARCHY",
    description: "Browse the Drop 01 object archive from URBAN ANARCHY.",
    canonicalPath: "/shop",
    ogType: "website"
  },
  search: {
    title: "Search Reviews, Essays, Interviews | URBAN ANARCHY",
    description: "Search URBAN ANARCHY reviews, essays, interviews, theatre writing, book criticism, and cultural features.",
    canonicalPath: "/search",
    ogType: "website"
  },
  featured: {
    title: "Featured Media | URBAN ANARCHY",
    description: "Browse featured photography, artwork, visual notes, and article-linked media from URBAN ANARCHY.",
    canonicalPath: "/featured",
    ogType: "website"
  },
  contact: {
    title: "Contact | URBAN ANARCHY",
    description: "Contact URBAN ANARCHY about submissions, interviews, media, partnerships, and editorial inquiries.",
    canonicalPath: "/contact",
    ogType: "website"
  },
  "admin-dashboard": {
    title: "Admin Dashboard | URBAN ANARCHY",
    description: "Protected URBAN ANARCHY editorial operations dashboard for publishing, moderation, media, and inbox readiness.",
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
      title: "Article unavailable | URBAN ANARCHY",
      description: "This URBAN ANARCHY article is unavailable, unpublished, or has moved.",
      canonicalPath: "/visceral-mag",
      ogType: "article",
      robots: "noindex,follow"
    });
  }

  const seo = article.seo || {};
  const canonicalPath = `/visceral-mag/${article.slug}`;
  return normalizeMetadata({
    title: seo.title || `${article.title} | URBAN ANARCHY`,
    description: seo.description || article.dek,
    canonicalPath,
    ogTitle: seo.ogTitle || article.title,
    ogDescription: seo.ogDescription || seo.description || article.dek,
    ogType: "article",
    ogImage: article.featuredImage?.url || defaultOgImage,
    publishedAt: article.publishedAt
  });
}

function buildMoodboardMetadata(options) {
  const item = options.fixtures?.moodboardItems?.find((candidate) => candidate.slug === options.slug);

  if (!item) {
    return normalizeMetadata({
      title: "Visual research unavailable | URBAN ANARCHY",
      description: "This URBAN ANARCHY visual research specimen is unavailable or has moved.",
      canonicalPath: "/moodboard",
      ogType: "article",
      robots: "noindex,follow"
    });
  }

  return normalizeMetadata({
    title: `${item.title} | Visual Research | URBAN ANARCHY`,
    description: item.caption || `${item.title} is an Issue ${item.issue} visual research specimen from URBAN ANARCHY.`,
    canonicalPath: `/moodboard/${item.slug}`,
    ogTitle: `${item.title} | Issue ${item.issue}`,
    ogDescription: item.caption || `${item.category} visual research from the URBAN ANARCHY archive.`,
    ogType: "article",
    ogImage: item.image?.url || defaultOgImage
  });
}
function buildProductMetadata(options) {
  const product = options.fixtures?.products?.find((candidate) => candidate.slug === options.slug);
  if (!product) return normalizeMetadata({ title: "Object unavailable | URBAN ANARCHY", description: "This URBAN ANARCHY Drop 01 object is unavailable or has moved.", canonicalPath: "/shop", robots: "noindex,follow" });
  return normalizeMetadata({
    title: `${product.title} | Drop 01 | URBAN ANARCHY`,
    description: product.dek,
    canonicalPath: `/shop/${product.slug}`,
    ogTitle: `${product.title} | Drop 01`,
    ogDescription: product.dek,
    ogType: "product",
    ogImage: product.image?.url || defaultOgImage
  });
}
function buildProfileMetadata(options) {
  const profile = options.fixtures?.profiles?.find((item) => item.slug === options.slug || item.id === options.slug);

  if (!profile) {
    return normalizeMetadata({
      title: "Profile unavailable | URBAN ANARCHY",
      description: "This URBAN ANARCHY profile is unavailable or has moved.",
      canonicalPath: "/contributors",
      robots: "noindex,follow"
    });
  }

  return normalizeMetadata({
    title: profile.name + " | URBAN ANARCHY",
    description: profile.fullBio || profile.shortBio || defaultDescription,
    canonicalPath: "/people/" + profile.slug,
    ogTitle: profile.name,
    ogDescription: profile.fullBio || profile.shortBio || defaultDescription,
    ogType: "profile",
    ogImage: profile.image?.url || defaultOgImage
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
  const isPrivateAdminRoute = route?.area === "admin" || route?.authRequired === true || route?.id === "admin-login" || route?.id === "password-reset";

  if (isPrivateAdminRoute) {
    return normalizeMetadata({
      title: `${route?.label || "Admin"} | URBAN ANARCHY`,
      description: "Private URBAN ANARCHY administration area.",
      canonicalPath: "/admin",
      ogType: "website",
      robots: "noindex,nofollow"
    });
  }
  if (route?.id === "article-detail") {
    return buildArticleMetadata(route, options);
  }

  if (route?.id === "profile-detail") {
    return buildProfileMetadata(options);
  }

  if (route?.id === "moodboard-detail") {
    return buildMoodboardMetadata(options);
  }

  if (route?.id === "product-detail") {
    return buildProductMetadata(options);
  }

  const base = routeDefaults[route?.id] || {
    title: `${route?.label || "Page"} | URBAN ANARCHY`,
    description: defaultDescription,
    canonicalPath: route?.path && !route.path.includes(":") ? route.path : "/",
    ogType: "website"
  };

  return normalizeMetadata(base);
}
