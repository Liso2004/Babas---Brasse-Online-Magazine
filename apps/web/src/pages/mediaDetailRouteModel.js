import { getRouteByPath } from "../routes.js";

export function buildMediaDetailRouteModel(fixtures, mediaId = "") {
  const route = getRouteByPath("/media/" + mediaId);
  const media = (fixtures.mediaItems || []).find((item) => item.id === mediaId && item.type === "image");
  const article = media ? (fixtures.articles || []).find((item) => item.status === "published" && item.featuredImage?.id === media.id) : null;

  if (!media) {
    return { pageId: "media-detail", generatedFrom: "media-detail-route-model", state: "not-found", mediaId, backHref: "/featured", route: { id: route.id, label: route.label, path: route.path, prototypeFile: route.prototypeFile }, media: null, seo: null };
  }

  const publishedAt = article?.publishedAt || "";
  const displayDate = publishedAt ? new Intl.DateTimeFormat("en-ZA", { day: "numeric", month: "long", year: "numeric" }).format(new Date(publishedAt)) : "";
  return {
    pageId: "media-detail", generatedFrom: "media-detail-route-model", state: "ready", mediaId: media.id, backHref: "/featured",
    route: { id: route.id, label: route.label, path: route.path, prototypeFile: route.prototypeFile },
    media: { id: media.id, title: media.title, description: media.caption, photographer: media.credit || "Babas & Brasse", publishedAt, displayDate, url: media.url, altText: media.altText, relatedArticleHref: article ? "/visceral-mag/" + article.slug : "" },
    seo: { title: media.title + " | Media | Babas & Brasse", description: media.caption || "Photography from Babas & Brasse.", ogTitle: media.title, ogDescription: media.caption || "Photography from Babas & Brasse.", ogImage: media.url }
  };
}
