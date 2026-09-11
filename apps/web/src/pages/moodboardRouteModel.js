import { getRouteByPath } from "../routes.js";

function itemSummary(item) {
  return {
    ...item,
    href: `/moodboard/${item.slug}`
  };
}

export function buildMoodboardRouteModel(fixtures) {
  const route = getRouteByPath("/moodboard");
  const items = Array.isArray(fixtures.moodboardItems) ? fixtures.moodboardItems.map(itemSummary) : [];

  return {
    pageId: "moodboard",
    generatedFrom: "moodboard-route-model",
    route,
    hero: {
      eyebrow: "Archive dossier // issue 004",
      title: "Visual research archive.",
      dek: "Independent visual specimens indexed by subject, material, and signal."
    },
    items
  };
}
