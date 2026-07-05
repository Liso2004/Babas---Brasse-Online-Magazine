import { getRouteByPath } from "../routes.js";

function normalize(value) {
  return String(value || "").trim().toLowerCase();
}

function getCategory(categories, categoryId) {
  return categories.find((category) => category.id === categoryId || category.slug === categoryId) || {
    id: categoryId,
    label: categoryId,
    slug: categoryId,
    description: ""
  };
}

function getAuthor(profiles, profileId) {
  return profiles.find((profile) => profile.id === profileId) || {
    name: "Babas & Brasse",
    slug: "babas-brasse"
  };
}

function getPublishedArticles(fixtures) {
  return fixtures.articles.filter((article) => article.status === "published");
}

function articleSearchText(article, fixtures) {
  const category = getCategory(fixtures.categories, article.categoryId);
  const author = getAuthor(fixtures.profiles, article.authorProfileId);
  const body = Array.isArray(article.bodyBlocks) ? article.bodyBlocks.join(" ") : "";

  return normalize([
    article.title,
    article.dek,
    body,
    category.label,
    category.slug,
    author.name
  ].join(" "));
}

function articleResult(article, fixtures) {
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
      href: `/contributors/${author.slug}`
    }
  };
}

export function filterPublishedArticles(fixtures, options = {}) {
  const query = normalize(options.query);
  const categoryFilter = normalize(options.category);

  return getPublishedArticles(fixtures)
    .filter((article) => {
      const category = getCategory(fixtures.categories, article.categoryId);
      const matchesCategory = !categoryFilter || normalize(category.slug) === categoryFilter || normalize(category.id) === categoryFilter;
      const matchesQuery = !query || articleSearchText(article, fixtures).includes(query);

      return matchesCategory && matchesQuery;
    })
    .map((article) => articleResult(article, fixtures));
}

export function searchPublishedArticles(fixtures, query) {
  return filterPublishedArticles(fixtures, { query });
}

export function buildCategoriesSearchRouteModel(fixtures, options = {}) {
  const route = getRouteByPath("/search");
  const query = options.query || "";
  const category = options.category || "";
  const results = filterPublishedArticles(fixtures, { query, category });
  const selectedCategory = category ? getCategory(fixtures.categories, category) : null;

  return {
    pageId: "categories-search",
    generatedFrom: "categories-search-route-model",
    route: {
      id: route.id,
      label: route.label,
      path: route.path,
      prototypeFile: route.prototypeFile
    },
    stateNote: "search-loading",
    hero: {
      eyebrow: "Categories / Search",
      title: "Find essays, reviews, interviews, artwork, and culture notes.",
      dek: "Search the published Babas & Brasse archive or browse by launch category."
    },
    search: {
      id: "article-search",
      name: "q",
      type: "search",
      label: "Search articles",
      placeholder: "Search articles",
      action: "/search",
      method: "get"
    },
    activeFilters: {
      query,
      category
    },
    selectedCategory: selectedCategory ? {
      id: selectedCategory.id,
      label: selectedCategory.label,
      slug: selectedCategory.slug
    } : null,
    sections: {
      categoryFilters: [
        { id: "all", label: "All", slug: "all", href: "/search", active: !category },
        ...fixtures.categories.map((item) => ({
          id: item.id,
          label: item.label,
          slug: item.slug,
          href: `/search?category=${item.slug}`,
          active: normalize(item.slug) === normalize(category)
        }))
      ],
      results: results.length > 0 ? {
        state: "results",
        heading: "Search results",
        items: results
      } : {
        state: "no-results",
        heading: "No articles found",
        message: "No articles found",
        body: "Try another keyword or clear the selected category.",
        resetHref: "/search",
        items: []
      }
    }
  };
}
