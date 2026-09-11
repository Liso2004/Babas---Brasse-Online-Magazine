import { getRouteByPath } from "../routes.js";

function archiveFieldNote(item) {
  const [primaryTag, secondaryTag] = item.tags || [];
  return `${item.title} records a ${primaryTag || item.category} signal${secondaryTag ? ` through ${secondaryTag}` : ""}, filed as a visual reference for Issue ${item.issue}.`;
}

export function getFeaturedMediaItems(fixtures) {
  const heights = [860, 620, 760, 560, 720];
  const articles = Array.isArray(fixtures.articles) ? fixtures.articles : [];
  return Array.isArray(fixtures.mediaItems) ? fixtures.mediaItems.map((item, index) => {
    const article = articles.find((candidate) => candidate.status === "published" && candidate.featuredImage?.id === item.id);
    return {
      id: item.id,
      title: item.title,
      type: item.type,
      url: item.url,
      altText: item.altText,
      caption: item.caption,
      credit: item.credit,
      category: item.type === "video" ? "Video" : "Visual story",
      thumbnail: item.url,
      alt: item.altText,
      description: item.caption,
      publishedAt: article?.publishedAt || "",
      href: article ? "/visceral-mag/" + article.slug : item.url,
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
  const archiveSpecimens = (fixtures.moodboardItems || []).map((item) => ({
    ...item,
    href: `/moodboard/${item.slug}`,
    fieldNote: archiveFieldNote(item)
  }));

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
      title: "Raw image. Real impact.",
      dek: "A living wall of fashion, art, objects, and city texture from URBAN ANARCHY."
    },
    sections: {
      mediaGallery: mediaItems.length > 0 ? {
        state: "ready",
        heading: "The image wall",
        items: mediaItems
      } : {
        state: "no-media",
        heading: "No featured media is published yet",
        body: "Check back for photography, artwork, and visual editorial features.",
        contactHref: "/contact",
        items: []
      },
      archiveSpecimens: {
        state: archiveSpecimens.length > 0 ? "ready" : "empty",
        heading: "Visual research / full frames",
        body: "Every Issue 004 specimen, presented uncropped with its field note.",
        items: archiveSpecimens
      },
      articleMediaLinks: {
        heading: "Media in published stories",
        items: publishedArticles
      }
    }
  };
}
