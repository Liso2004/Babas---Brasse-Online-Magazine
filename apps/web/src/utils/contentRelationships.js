const GENERIC_TOKENS = new Set(["and", "the", "study", "image", "visual", "urban", "design", "outfit", "architecture", "i", "ii", "iii"]);

export function meaningfulTokens(value = "") {
  return String(value).toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, " ").trim().split(/\s+/).filter((token) => token.length > 2 && !GENERIC_TOKENS.has(token));
}

function overlap(left = [], right = []) { const rightSet = new Set(right); return left.filter((item) => rightSet.has(item)); }
function uniqueById(items) { return [...new Map(items.map((item) => [item.id, item])).values()]; }

export function getRelatedMoodboardItems(item, items = [], limit = 4) {
  const itemTitleTokens = meaningfulTokens(item.title);
  const itemTags = Array.isArray(item.tags) ? item.tags : [];
  const explicitIds = new Set(item.relatedMoodboardIds || []);
  return items.filter((candidate) => candidate.id !== item.id).map((candidate) => {
    const sharedTitle = overlap(itemTitleTokens, meaningfulTokens(candidate.title));
    const sharedTags = overlap(itemTags, candidate.tags || []);
    const score = (explicitIds.has(candidate.id) ? 20 : 0) + (candidate.subject === item.subject ? 12 : 0) + sharedTitle.length * 4 + sharedTags.length * 2 + (candidate.category === item.category ? 1 : 0) + (candidate.issue === item.issue ? 1 : 0);
    return { candidate, score, sharedTitle, sharedTags };
  }).filter(({ score, sharedTitle, sharedTags, candidate }) => candidate.subject === item.subject || sharedTitle.length > 0 || sharedTags.length >= 2 || score >= 5).sort((left, right) => right.score - left.score || left.candidate.specimen.localeCompare(right.candidate.specimen)).slice(0, limit).map(({ candidate }) => candidate);
}

export function getLinkedArticles(item, articles = []) { const ids = new Set(item.relatedArticleIds || []); return articles.filter((article) => article.status === "published" && ids.has(article.id)); }
export function getLinkedContributors(item, profiles = []) { const ids = new Set(item.relatedContributorIds || []); return profiles.filter((profile) => ids.has(profile.id)); }

export function getArchiveForArticle(article, items = [], limit = 4) {
  const explicitIds = new Set(article.moodboardItemIds || []);
  const explicit = items.filter((item) => explicitIds.has(item.id));
  const reverse = items.filter((item) => (item.relatedArticleIds || []).includes(article.id));
  return uniqueById([...explicit, ...reverse]).slice(0, limit);
}

export function rankRelatedArticles(article, articles = [], limit = 3) {
  const explicitIds = new Set(article.relatedArticleIds || []);
  const tags = article.tags || [];
  return articles.filter((candidate) => candidate.status === "published" && candidate.id !== article.id).map((candidate) => ({
    candidate,
    score: (explicitIds.has(candidate.id) ? 20 : 0) + (candidate.authorProfileId === article.authorProfileId ? 5 : 0) + overlap(tags, candidate.tags || []).length * 3 + (candidate.categoryId === article.categoryId ? 2 : 0) + (candidate.issue === article.issue ? 1 : 0)
  })).filter(({ score }) => score > 0).sort((left, right) => right.score - left.score || String(right.candidate.publishedAt || "").localeCompare(String(left.candidate.publishedAt || ""))).slice(0, limit).map(({ candidate }) => candidate);
}
