import { getRouteByPath } from "../routes.js";

function getCategory(categories, categoryId) {
  return categories.find((category) => category.id === categoryId) || {
    label: categoryId,
    slug: categoryId
  };
}

function getAuthor(profiles, profileId) {
  return profiles.find((profile) => profile.id === profileId) || {
    name: "Babas & Brasse",
    slug: "babas-brasse"
  };
}

function articleSummary(article, fixtures) {
  const category = getCategory(fixtures.categories, article.categoryId);
  const author = getAuthor(fixtures.profiles, article.authorProfileId);

  return {
    id: article.id,
    title: article.title,
    slug: article.slug,
    dek: article.dek,
    status: article.status,
    href: `/visceral-mag/${article.slug}`,
    publishedAt: article.publishedAt,
    featuredImage: article.featuredImage,
    category: {
      id: article.categoryId,
      label: category.label,
      slug: category.slug,
      href: `/search?category=${category.slug}`
    },
    author: {
      id: article.authorProfileId,
      name: author.name,
      slug: author.slug,
      href: `/contributors#${author.slug}`
    }
  };
}

export function buildVisceralMagRouteModel(fixtures) {
  const route = getRouteByPath("/visceral-mag");
  const publishedArticles = fixtures.articles
    .filter((article) => article.status === "published")
    .map((article) => articleSummary(article, fixtures));

  return {
    pageId: "visceral-mag",
    generatedFrom: "visceral-mag-route-model",
    route: {
      id: route.id,
      label: route.label,
      path: route.path,
      prototypeFile: route.prototypeFile
    },
    hero: {
      eyebrow: "Visceral Mag / Articles",
      title: "Latest cultural writing from Babas & Brasse.",
      dek: "Browse essays, reviews, interviews, photography, artwork, and launch editorial features."
    },
    search: {
      id: "article-search",
      name: "q",
      type: "search",
      label: "Search articles",
      placeholder: "Search articles"
    },
    sections: {
      articleListing: publishedArticles
    }
  };
}
