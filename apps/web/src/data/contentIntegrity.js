function duplicateValues(values) { const seen = new Set(); return values.filter((value) => (seen.has(value) ? true : (seen.add(value), false))); }

export function validatePublicationContent(fixtures) {
  const items = fixtures.moodboardItems || [];
  const articles = fixtures.articles || [];
  const profiles = fixtures.profiles || [];
  const products = fixtures.products || [];
  const itemIds = new Set(items.map((item) => item.id));
  const articleIds = new Set(articles.map((article) => article.id));
  const profileIds = new Set(profiles.map((profile) => profile.id));
  const issues = [];

  for (const slug of duplicateValues(items.map((item) => item.slug))) issues.push(`Duplicate moodboard slug: ${slug}`);
  for (const specimen of duplicateValues(items.map((item) => item.specimen))) issues.push(`Duplicate moodboard specimen: ${specimen}`);
  for (const slug of duplicateValues(articles.map((article) => article.slug))) issues.push(`Duplicate article slug: ${slug}`);
  for (const slug of duplicateValues(products.map((product) => product.slug))) issues.push(`Duplicate product slug: ${slug}`);

  for (const item of items) {
    if (!item.id || !item.slug || !item.title || !item.issue || !item.image?.url || !item.image?.altText) issues.push(`Incomplete moodboard record: ${item.id || item.slug || "unknown"}`);
    for (const id of item.relatedMoodboardIds || []) if (!itemIds.has(id)) issues.push(`Unknown moodboard relationship: ${item.id} -> ${id}`);
    for (const id of item.relatedArticleIds || []) if (!articleIds.has(id)) issues.push(`Unknown article relationship: ${item.id} -> ${id}`);
    for (const id of item.relatedContributorIds || []) if (!profileIds.has(id)) issues.push(`Unknown contributor relationship: ${item.id} -> ${id}`);
  }
  for (const article of articles) {
    if (!article.id || !article.slug || !article.title || !article.issue || !article.featuredImage?.url || !article.featuredImage?.altText) issues.push(`Incomplete article record: ${article.id || article.slug || "unknown"}`);
    if (!profileIds.has(article.authorProfileId)) issues.push(`Unknown article author: ${article.id} -> ${article.authorProfileId}`);
    for (const id of article.moodboardItemIds || []) if (!itemIds.has(id)) issues.push(`Unknown article visual research: ${article.id} -> ${id}`);
    for (const id of article.relatedArticleIds || []) if (!articleIds.has(id) || id === article.id) issues.push(`Unknown article relationship: ${article.id} -> ${id}`);
  }
  for (const product of products) {
    if (!product.id || !product.slug || !product.title || !Number.isFinite(product.price) || !product.material || !product.image?.url || !product.image?.altText) issues.push(`Incomplete product record: ${product.id || product.slug || "unknown"}`);
    for (const id of product.relatedArticleIds || []) if (!articleIds.has(id)) issues.push(`Unknown product article relationship: ${product.id} -> ${id}`);
  }
  return { valid: issues.length === 0, issues };
}

export function mergePublicationContent(baseline, payload) {
  const candidate = { ...baseline, ...(payload && typeof payload === "object" ? payload : {}) };
  const report = validatePublicationContent(candidate);
  return { fixtures: report.valid ? candidate : baseline, report };
}
