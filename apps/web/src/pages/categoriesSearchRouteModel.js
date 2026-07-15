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

const topicTerms = {
  theatre: ["theatre", "stage", "rehearsal", "performance", "stagecraft"],
  books: ["book", "novel", "reading", "literary", "reader"],
  opinion: ["opinion", "argument", "multilingualism", "matters"]
};

function matchesTopic(article, fixtures, topic) {
  const normalizedTopic = normalize(topic);
  if (!normalizedTopic) return true;
  const searchableText = articleSearchText(article, fixtures);
  const terms = topicTerms[normalizedTopic] || [normalizedTopic];
  return terms.some((term) => searchableText.includes(term));
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
      href: `/people/${author.slug}`
    }
  };
}

export function filterPublishedArticles(fixtures, options = {}) {
  const query = normalize(options.query);
  const categoryFilter = normalize(options.category);
  const topicFilter = normalize(options.topic);

  return getPublishedArticles(fixtures)
    .filter((article) => {
      const category = getCategory(fixtures.categories, article.categoryId);
      const matchesCategory = !categoryFilter || normalize(category.slug) === categoryFilter || normalize(category.id) === categoryFilter;
      const matchesQuery = !query || articleSearchText(article, fixtures).includes(query);
      const matchesTopicFilter = matchesTopic(article, fixtures, topicFilter);

      return matchesCategory && matchesQuery && matchesTopicFilter;
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
  const topic = options.topic || "";
  const results = filterPublishedArticles(fixtures, { query, category, topic });
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
      dek: "Search the published Babas & Brasse archive by keyword or use the magazine sections above."
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
      category,
      topic
    },
    selectedCategory: selectedCategory ? {
      id: selectedCategory.id,
      label: selectedCategory.label,
      slug: selectedCategory.slug
    } : null,
    sections: {
      results: results.length > 0 ? {
        state: "results",
        heading: "Search results",
        items: results
      } : {
        state: "no-results",
        heading: "No articles found",
        message: "No articles found",
        body: "Try another keyword or clear the selected section.",
        resetHref: "/search",
        items: []
      }
    }
  };
}
