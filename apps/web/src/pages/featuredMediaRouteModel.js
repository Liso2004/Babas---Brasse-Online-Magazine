import { getRouteByPath } from "../routes.js";

export function getFeaturedMediaItems(fixtures) {
  return Array.isArray(fixtures.mediaItems) ? fixtures.mediaItems.map((item) => ({
    id: item.id,
    title: item.title,
    type: item.type,
    url: item.url,
    altText: item.altText,
    caption: item.caption,
    credit: item.credit
  })) : [];
}

function articleCategory(fixtures, article) { const c = fixtures.categories.find((item) => item.id === article.categoryId); return c ? { ...c, href: `/search?category=${c.slug}` } : null; }

function articleAuthor(fixtures, article) { const a = fixtures.profiles.find((item) => item.id === article.authorProfileId); return a ? { ...a, href: `/people/${a.slug}` } : null; }

export function getPublishedMediaArticles(fixtures) {
  return fixtures.articles
    .filter((article) => article.status === "published" && article.featuredImage)
    .map((article) => ({
      id: article.id,
      title: article.title,
      slug: article.slug,
      dek: article.dek,
      status: article.status,
      publishedAt: article.publishedAt,
      category: articleCategory(fixtures, article),
      author: articleAuthor(fixtures, article),
      href: `/visceral-mag/${article.slug}`,
      featuredImage: {
        id: article.featuredImage.id,
        title: article.featuredImage.title,
        type: article.featuredImage.type,
        url: article.featuredImage.url,
        altText: article.featuredImage.altText,
        caption: article.featuredImage.caption,
        credit: article.featuredImage.credit
      }
    }));
}

export function buildFeaturedMediaRouteModel(fixtures) {
  const route = getRouteByPath("/featured");
  const mediaItems = getFeaturedMediaItems(fixtures);
  const publishedArticles = getPublishedMediaArticles(fixtures);

  return {
    pageId: "featured-media",
    generatedFrom: "featured-media-route-model",
    route: {
      id: route.id,
      label: route.label,
      path: route.path,
      prototypeFile: route.prototypeFile
    },
    hero: {
      eyebrow: "Featured / Media",
      title: "Photography, artwork, and visual notes from Babas & Brasse.",
      dek: "Browse launch media assets with captions, credits, and accessible alt text."
    },
    sections: {
      mediaGallery: mediaItems.length > 0 ? {
        state: "ready",
        heading: "Featured media gallery",
        items: mediaItems
      } : {
        state: "no-media",
        heading: "No featured media is published yet",
        body: "Check back for photography, artwork, and visual editorial features.",
        contactHref: "/contact",
        items: []
      },
      articleMediaLinks: {
        heading: "Media in published stories",
        items: publishedArticles
      }
    }
  };
}
