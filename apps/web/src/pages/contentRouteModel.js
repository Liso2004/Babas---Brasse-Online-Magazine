import { getRouteByPath } from "../routes.js";

function publishedArticles(fixtures) {
  return (fixtures.articles || []).filter((article) => article.status === "published");
}

function getCategoryArticles(fixtures, category) {
  return publishedArticles(fixtures)
    .filter((article) => article.categoryId === category.id || article.categoryId === category.slug)
    .map((article) => ({
      id: article.id,
      title: article.title,
      slug: article.slug,
      href: `/visceral-mag/${article.slug}`
    }));
}

export function buildContentRouteModel(fixtures) {
  const route = getRouteByPath("/content");
  const categories = (fixtures.categories || []).map((category) => {
    const articles = getCategoryArticles(fixtures, category);
    return {
      id: category.id,
      label: category.label,
      slug: category.slug,
      description: category.description,
      href: `/search?category=${category.slug}`,
      count: articles.length,
      articles: articles.slice(0, 3)
    };
  });

  return {
    pageId: "content",
    generatedFrom: "content-route-model",
    route: {
      id: route.id,
      label: route.label,
      path: route.path,
      prototypeFile: route.prototypeFile
    },
    hero: {
      eyebrow: "Content",
      title: "Browse the magazine by section.",
      dek: "A simple way into essays, reviews, short stories, opinion pieces, interviews, artwork, and everything else Babas & Brasse publishes."
    },
    sections: {
      categories: categories.length > 0 ? {
        state: "ready",
        heading: "Magazine sections",
        items: categories
      } : {
        state: "empty",
        heading: "No sections are available yet",
        body: "Categories will appear here once editorial content is published.",
        items: []
      }
    }
  };
}
