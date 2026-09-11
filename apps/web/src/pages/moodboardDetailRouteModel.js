import { getRouteByPath } from "../routes.js";
import { getLinkedArticles, getLinkedContributors, getRelatedMoodboardItems } from "../utils/contentRelationships.js";

export function buildMoodboardDetailRouteModel(fixtures, slug) {
  const route = getRouteByPath("/moodboard/:slug");
  const items = Array.isArray(fixtures.moodboardItems) ? fixtures.moodboardItems : [];
  const item = items.find((candidate) => candidate.slug === slug);

  if (!item) {
    return { pageId: "moodboard-detail", generatedFrom: "moodboard-detail-route-model", state: "not-found", route, item: null, relatedItems: [], relatedArticles: [], relatedContributors: [] };
  }

  return {
    pageId: "moodboard-detail",
    generatedFrom: "moodboard-detail-route-model",
    state: "ready",
    route,
    item: { ...item, href: `/moodboard/${item.slug}` },
    relatedItems: getRelatedMoodboardItems(item, items).map((related) => ({ ...related, href: `/moodboard/${related.slug}` })),
    relatedArticles: getLinkedArticles(item, fixtures.articles).map((article) => ({ ...article, href: `/visceral-mag/${article.slug}` })),
    relatedContributors: getLinkedContributors(item, fixtures.profiles).map((profile) => ({ ...profile, href: `/people/${profile.slug}` }))
  };
}
