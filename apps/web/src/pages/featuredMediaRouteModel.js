import { getRouteByPath } from "../routes.js";

export function getFeaturedMediaItems(fixtures) {
  const heights = [860, 620, 760, 560, 720];
  const articles = Array.isArray(fixtures.articles) ? fixtures.articles : [];
  return Array.isArray(fixtures.mediaItems) ? fixtures.mediaItems.filter((item) => item.type === "image").map((item, index) => {
    const article = articles.find((candidate) => candidate.status === "published" && candidate.featuredImage?.id === item.id);
    return {
      id: item.id,
      title: item.title,
      type: item.type,
      url: item.url,
      altText: item.altText,
      caption: item.caption,
      credit: item.credit,
      category: "Photography",
      thumbnail: item.url,
      alt: item.altText,
      description: item.caption,
      publishedAt: article?.publishedAt || "",
      href: `/media/${encodeURIComponent(item.id)}`,
      height: heights[index % heights.length]
    };
  }) : [];
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
      eyebrow: "Media",
      title: "Photography from Babas & Brasse.",
      dek: "Browse photographs with captions, credits, and publication details."
    },
    sections: {
      mediaGallery: mediaItems.length > 0 ? {
        state: "ready",
        heading: "Media",
        items: mediaItems
      } : {
        state: "no-media",
        heading: "No featured media is published yet",
        body: "Check back for photography and visual editorial features.",
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
