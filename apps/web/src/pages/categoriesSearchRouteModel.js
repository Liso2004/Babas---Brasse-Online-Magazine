import { getRouteByPath } from "../routes.js";

function normalize(value) {
  return String(value || "").trim().toLowerCase();
}

function queryTerms(value) {
  return normalize(value).split(/\s+/).filter(Boolean);
}

function matchesQuery(searchableText, query) {
  const terms = queryTerms(query);
  return terms.length === 0 || terms.every((term) => searchableText.includes(term));
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
    name: "URBAN ANARCHY",
    slug: "babas-brasse"
  };
}

function getPublishedArticles(fixtures) {
  return (fixtures.articles || []).filter((article) => article.status === "published");
}

function articleSearchText(article, fixtures) {
  const category = getCategory(fixtures.categories || [], article.categoryId);
  const author = getAuthor(fixtures.profiles || [], article.authorProfileId);
  const body = Array.isArray(article.bodyBlocks) ? article.bodyBlocks.join(" ") : "";
  return normalize([article.title, article.dek, body, category.label, category.slug, author.name, article.issue, ...(article.tags || [])].join(" "));
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
  const category = getCategory(fixtures.categories || [], article.categoryId);
  const author = getAuthor(fixtures.profiles || [], article.authorProfileId);
  return {
    id: article.id, title: article.title, slug: article.slug, dek: article.dek, status: article.status,
    href: `/visceral-mag/${article.slug}`, publishedAt: article.publishedAt, featuredImage: article.featuredImage,
    category: { id: article.categoryId, label: category.label, slug: category.slug, href: `/search?category=${category.slug}` },
    author: { id: article.authorProfileId, name: author.name, slug: author.slug, href: `/people/${author.slug}` }
  };
}

export function filterPublishedArticles(fixtures, options = {}) {
  const query = normalize(options.query);
  const categoryFilter = normalize(options.category);
  const topicFilter = normalize(options.topic);
  return getPublishedArticles(fixtures)
    .filter((article) => {
      const category = getCategory(fixtures.categories || [], article.categoryId);
      const matchesCategory = !categoryFilter || normalize(category.slug) === categoryFilter || normalize(category.id) === categoryFilter;
      return matchesCategory && matchesQuery(articleSearchText(article, fixtures), query) && matchesTopic(article, fixtures, topicFilter);
    })
    .map((article) => articleResult(article, fixtures));
}

export function searchPublishedArticles(fixtures, query) {
  return filterPublishedArticles(fixtures, { query });
}

function searchVisualResearch(fixtures, query, issue) {
  return (fixtures.moodboardItems || [])
    .filter((item) => (!issue || item.issue === issue) && matchesQuery(normalize([
      item.title, item.subject, item.category, item.issue, ...(item.tags || []), item.caption, item.credit, item.source
    ].join(" ")), query))
    .map((item) => ({ ...item, href: `/moodboard/${item.slug}` }));
}

function searchContributors(fixtures, query) {
  return (fixtures.profiles || [])
    .filter((profile) => matchesQuery(normalize([profile.name, profile.role, profile.shortBio, profile.fullBio, ...(profile.tags || [])].join(" ")), query))
    .map((profile) => ({ id: profile.id, name: profile.name, role: profile.role, href: `/people/${profile.slug}` }));
}

function searchMedia(fixtures, query) {
  const archiveById = new Map((fixtures.moodboardItems || []).map((item) => [item.id, item]));
  return (fixtures.mediaItems || [])
    .filter((media) => matchesQuery(normalize([media.title, media.caption, media.credit, media.altText, media.type].join(" ")), query))
    .map((media) => {
      const archiveItem = archiveById.get(media.archiveItemId);
      return {
        id: media.id,
        title: media.title,
        caption: media.caption,
        href: archiveItem ? `/moodboard/${archiveItem.slug}` : "/featured",
        destination: archiveItem ? "Visual research specimen" : "Full Frames"
      };
    });
}

export function buildCategoriesSearchRouteModel(fixtures, options = {}) {
  const route = getRouteByPath("/search");
  const query = options.query || "";
  const category = options.category || "";
  const topic = options.topic || "";
  const issue = options.issue || "";
  const articles = filterPublishedArticles(fixtures, { query, category, topic });
  const visualResearch = searchVisualResearch(fixtures, query, issue);
  const contributors = searchContributors(fixtures, query);
  const media = searchMedia(fixtures, query);
  const selectedCategory = category ? getCategory(fixtures.categories || [], category) : null;
  const hasQuery = Boolean(normalize(query));
  const totalResults = articles.length + (hasQuery ? visualResearch.length + contributors.length + media.length : 0);

  return {
    pageId: "categories-search", generatedFrom: "categories-search-route-model",
    route: { id: route.id, label: route.label, path: route.path, prototypeFile: route.prototypeFile },
    stateNote: "search-loading",
    hero: { eyebrow: "Categories / Search", title: "Find essays, visual research, and the people behind them.", dek: "Search the URBAN ANARCHY archive by story, subject, tag, contributor, category, or Issue 004 specimen." },
    search: { id: "publication-search", name: "q", type: "search", label: "Search the publication", placeholder: "Search stories, images, people, tags", action: "/search", method: "get" },
    activeFilters: { query, category, topic, issue },
    selectedCategory: selectedCategory ? { id: selectedCategory.id, label: selectedCategory.label, slug: selectedCategory.slug } : null,
    totalResults,
    sections: {
      results: articles.length > 0 ? { state: "results", heading: "Stories", items: articles } : { state: "no-results", heading: "Stories", message: "No stories found", body: "Try another keyword or clear the selected section.", resetHref: "/search", items: [] },
      visualResearch: hasQuery ? { heading: "Visual research", items: visualResearch } : { heading: "Visual research", items: [] },
      contributors: hasQuery ? { heading: "Contributors", items: contributors } : { heading: "Contributors", items: [] },
      media: hasQuery ? { heading: "Media", items: media } : { heading: "Media", items: [] }
    }
  };
}
