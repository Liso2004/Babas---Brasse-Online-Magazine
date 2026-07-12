import { getRouteByPath } from "../routes.js";

export function getDashboardMetrics(fixtures) {
  return {
    publishedArticles: fixtures.articles.filter((article) => article.status === "published").length,
    drafts: fixtures.articles.filter((article) => article.status === "draft").length,
    pendingComments: fixtures.comments.filter((comment) => comment.status === "pending").length,
    pendingReviews: fixtures.reviews.filter((review) => review.status === "pending").length,
    newContactSubmissions: fixtures.contactSubmissions.filter((submission) => submission.status === "new").length
  };
}

export function getRecentActivity(fixtures) {
  const draftActivities = fixtures.articles
    .filter((article) => article.status === "draft")
    .map((article) => ({
      actor: "Editor",
      item: article.dek,
      status: "Draft",
      timestamp: "Unscheduled",
      nextAction: "Continue editing",
      href: "/admin/articles"
    }));

  const commentActivities = fixtures.comments
    .filter((comment) => comment.status === "pending")
    .map((comment) => ({
      actor: comment.name,
      item: comment.body,
      status: "Pending comment",
      timestamp: "Moderation queue",
      nextAction: "Review comment",
      href: "/admin/moderation"
    }));

  const contactActivities = fixtures.contactSubmissions
    .filter((submission) => submission.status === "new")
    .map((submission) => ({
      actor: submission.name,
      item: submission.subject,
      status: "New contact submission",
      timestamp: submission.email,
      nextAction: "Open inbox",
      href: "/admin/contact-submissions"
    }));

  return [...draftActivities, ...commentActivities, ...contactActivities];
}

function metricItems(metrics) {
  return [
    { key: "publishedArticles", label: "Published", value: metrics.publishedArticles },
    { key: "drafts", label: "Drafts", value: metrics.drafts },
    { key: "pendingComments", label: "Comments", value: metrics.pendingComments },
    { key: "pendingReviews", label: "Reviews", value: metrics.pendingReviews },
    { key: "newContactSubmissions", label: "Contact", value: metrics.newContactSubmissions }
  ];
}

export function buildAdminDashboardRouteModel(fixtures) {
  const route = getRouteByPath("/admin");
  const metrics = getDashboardMetrics(fixtures);

  return {
    pageId: "admin-dashboard",
    generatedFrom: "admin-dashboard-route-model",
    route: {
      id: route.id,
      label: route.label,
      path: route.path,
      prototypeFile: route.prototypeFile
    },
    auth: {
      required: route.authRequired === true,
      role: "admin",
      loginHref: "/admin/login"
    },
    hero: {
      eyebrow: "Admin Dashboard",
      title: "Editorial operations overview.",
      dek: "Authenticated editor access is required before publishing, moderation, media, or contact data is shown."
    },
    sections: {
      stats: {
        heading: "Publishing health",
        items: metricItems(metrics)
      },
      recentActivity: {
        heading: "Recent activity",
        columns: ["actor", "item", "status", "timestamp", "next-action"],
        items: getRecentActivity(fixtures)
      },
      quickActions: {
        heading: "Quick actions",
        items: [
          { href: "/admin/articles", label: "New article", body: "Create or continue editorial drafts." },
          { href: "/admin/moderation", label: "Moderate", body: "Review pending comments and reviews." },
          { href: "/admin/profiles-media", label: "Upload media", body: "Manage images, captions, credits, and alt text." },
          { href: "/admin/contact-submissions", label: "Inbox", body: "Review new reader and contributor messages." }
        ]
      },
      states: {
        notes: ["dashboard-loading", "dashboard-empty", "dashboard-error", "permission-denied"],
        items: ["loading", "empty", "error", "permission-denied"],
        permissionHref: "/admin/login",
        errorCopy: "Dashboard failed to load; retry the request."
      }
    }
  };
}
