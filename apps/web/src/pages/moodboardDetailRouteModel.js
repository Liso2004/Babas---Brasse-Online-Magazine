import { getRouteByPath } from "../routes.js";
import { getLinkedArticles, getLinkedContributors, getRelatedMoodboardItems } from "../utils/contentRelationships.js";

function linkedItem(item) { return item ? { ...item, href: `/moodboard/${item.slug}` } : null; }

export function buildMoodboardDetailRouteModel(fixtures, slug) {
  const route = getRouteByPath("/moodboard/:slug");
  const items = Array.isArray(fixtures.moodboardItems) ? fixtures.moodboardItems : [];
  const item = items.find((candidate) => candidate.slug === slug);
  if (!item) return { pageId: "moodboard-detail", generatedFrom: "moodboard-detail-route-model", state: "not-found", route, item: null, relatedItems: [], relatedArticles: [], relatedContributors: [], previousItem: null, nextItem: null };

  const orderedItems = [...items].sort((left, right) => left.specimen.localeCompare(right.specimen));
  const index = orderedItems.findIndex((candidate) => candidate.id === item.id);
  return {
    pageId: "moodboard-detail", generatedFrom: "moodboard-detail-route-model", state: "ready", route,
    item: linkedItem(item),
    relatedItems: getRelatedMoodboardItems(item, orderedItems).map(linkedItem),
    relatedArticles: getLinkedArticles(item, fixtures.articles).map((article) => ({ ...article, href: `/visceral-mag/${article.slug}` })),
    relatedContributors: getLinkedContributors(item, fixtures.profiles).map((profile) => ({ ...profile, href: `/people/${profile.slug}` })),
    previousItem: linkedItem(index > 0 ? orderedItems[index - 1] : null),
    nextItem: linkedItem(index < orderedItems.length - 1 ? orderedItems[index + 1] : null)
  };
}
