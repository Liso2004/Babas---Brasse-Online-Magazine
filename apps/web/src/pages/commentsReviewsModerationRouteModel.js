import { getRouteByPath } from "../routes.js";

function findById(items, id) {
  return items.find((item) => item.id === id) || null;
}

function getArticleContext(fixtures, articleId) {
  const article = findById(fixtures.articles, articleId);
  return article ? { title: article.title, href: `/visceral-mag/${article.slug}` } : { title: "Unknown article", href: "/admin/articles" };
}

export function getModerationItems(fixtures) {
  const comments = fixtures.comments.map((comment) => {
    const article = getArticleContext(fixtures, comment.articleId);
    return { id: comment.id, type: "comment", author: comment.name, body: comment.body, status: comment.status, articleTitle: article.title, articleHref: article.href, date: "Moderation queue", rating: null };
  });
  const reviews = fixtures.reviews.map((review) => {
    const article = getArticleContext(fixtures, review.articleId);
    return { id: review.id, type: "review", author: review.name, body: review.body, status: review.status, articleTitle: article.title, articleHref: article.href, date: "Moderation queue", rating: review.rating };
  });
  return [...comments, ...reviews];
}

export function getModerationStats(fixtures) {
  const items = getModerationItems(fixtures);
  return {
    totalItems: items.length,
    pendingItems: items.filter((item) => item.status === "pending").length,
    approvedItems: items.filter((item) => item.status === "approved").length,
    rejectedItems: items.filter((item) => item.status === "rejected").length,
    comments: items.filter((item) => item.type === "comment").length,
    reviews: items.filter((item) => item.type === "review").length
  };
}

function metricItems(stats) {
  return [
    { key: "totalItems", label: "Total", value: stats.totalItems },
    { key: "pendingItems", label: "Pending", value: stats.pendingItems },
    { key: "approvedItems", label: "Approved", value: stats.approvedItems },
    { key: "rejectedItems", label: "Rejected", value: stats.rejectedItems },
    { key: "comments", label: "Comments", value: stats.comments },
    { key: "reviews", label: "Reviews", value: stats.reviews }
  ];
}

function queueFilters(fixtures) {
  return [
    { name: "status", label: "Status", options: ["all", "pending", "approved", "rejected"] },
    { name: "type", label: "Type", options: ["all", "comment", "review"] },
    { name: "article", label: "Article", options: ["all", ...fixtures.articles.map((article) => article.slug)] },
    { name: "date", label: "Date", type: "date" }
  ];
}

export function buildCommentsReviewsModerationRouteModel(fixtures) {
  const route = getRouteByPath("/admin/moderation");
  const items = getModerationItems(fixtures);
  const stats = getModerationStats(fixtures);
  const selectedItem = items.find((item) => item.status === "pending") || items[0];

  return {
    pageId: "comments-reviews-moderation",
    generatedFrom: "comments-reviews-moderation-route-model",
    route: { id: route.id, label: route.label, path: route.path, prototypeFile: route.prototypeFile },
    auth: { required: route.authRequired === true, role: "admin", loginHref: "/admin/login" },
    nav: { pendingCount: stats.pendingItems },
    hero: {
      eyebrow: "Comments / Reviews Moderation",
      title: "Queue-driven public conversation review.",
      dek: "Admin-only access to search, filter, approve, and reject public comments."
    },
    sections: {
      stats: { heading: "Moderation health", items: metricItems(stats) },
      queues: { heading: "Moderation queues", search: { name: "moderation-search", type: "search", placeholder: "Search by author, article, or text" }, filters: queueFilters(fixtures) },
      workspace: { heading: "Queue workspace", columns: ["type", "author", "article", "status", "body", "row-actions"], items, selectedItem },
      actions: { heading: "Moderation actions", items: [
        { action: "approve", label: "Approve", confirmationRequired: false },
        { action: "reject", label: "Reject", confirmationRequired: false },
        { action: "delete", label: "Delete", confirmationRequired: true }
      ] },
      states: {
        notes: ["moderation-pending", "approved-only-public", "moderation-undo", "moderation-error", "permission-denied"],
        items: ["pending", "approved-only-public", "undo", "error", "permission-denied"],
        permissionHref: "/admin/login",
        publicRuleCopy: "Approved-only public rendering keeps pending and rejected comments/reviews off article pages."
      }
    }
  };
}
