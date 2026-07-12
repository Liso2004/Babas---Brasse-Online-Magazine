import { getRouteByPath } from "../routes.js";

function findById(items, id) {
  return items.find((item) => item.id === id) || null;
}

function isSeoReady(article) {
  return Boolean(article.seo && article.seo.title && article.seo.description && article.featuredImage && article.featuredImage.altText);
}

export function getArticleRows(fixtures) {
  return fixtures.articles.map((article) => {
    const category = findById(fixtures.categories, article.categoryId);
    const author = findById(fixtures.profiles, article.authorProfileId);
    const publishAction = article.status === "published" ? "unpublish" : "publish";

    return {
      id: article.id,
      title: article.title,
      slug: article.slug,
      status: article.status,
      category: category ? category.label : "Uncategorised",
      categoryId: article.categoryId,
      author: author ? author.name : "Unknown author",
      authorProfileId: article.authorProfileId,
      date: article.publishedAt || "Draft",
      seoReady: isSeoReady(article),
      editHref: `/admin/articles/${article.slug}/edit`,
      previewHref: `/visceral-mag/${article.slug}`,
      publishAction,
      actions: [
        { type: "edit", label: "Edit", href: `/admin/articles/${article.slug}/edit` },
        { type: "preview", label: "Preview", href: `/visceral-mag/${article.slug}` },
        { type: publishAction, label: publishAction === "publish" ? "Publish" : "Unpublish" }
      ]
    };
  });
}

export function getArticleManagementStats(fixtures) {
  const rows = getArticleRows(fixtures);

  return {
    totalArticles: rows.length,
    publishedArticles: rows.filter((row) => row.status === "published").length,
    draftArticles: rows.filter((row) => row.status === "draft").length,
    seoReadyArticles: rows.filter((row) => row.seoReady).length
  };
}

function metricItems(stats) {
  return [
    { key: "totalArticles", label: "Total", value: stats.totalArticles },
    { key: "publishedArticles", label: "Published", value: stats.publishedArticles },
    { key: "draftArticles", label: "Drafts", value: stats.draftArticles },
    { key: "seoReadyArticles", label: "SEO ready", value: stats.seoReadyArticles }
  ];
}

function toolbarFilters(fixtures) {
  return [
    {
      name: "status",
      label: "Status",
      options: [
        { value: "all", label: "All statuses" },
        { value: "draft", label: "Draft" },
        { value: "published", label: "Published" }
      ]
    },
    {
      name: "category",
      label: "Category",
      options: [{ value: "all", label: "All categories" }, ...fixtures.categories.map((category) => ({ value: category.slug, label: category.label }))]
    },
    {
      name: "seo-readiness",
      label: "SEO readiness",
      options: [
        { value: "all", label: "All SEO states" },
        { value: "ready", label: "Ready" },
        { value: "needs-work", label: "Needs work" }
      ]
    }
  ];
}

function editorFields(fixtures) {
  return [
    { id: "article-title", name: "title", type: "text", label: "Title", required: true },
    { id: "article-slug", name: "slug", type: "text", label: "Slug", required: true },
    { id: "article-dek", name: "dek", type: "textarea", label: "Dek", required: true },
    { id: "article-category", name: "categoryId", type: "select", label: "Category", required: true, options: fixtures.categories.map((category) => ({ value: category.id, label: category.label })) },
    { id: "article-author", name: "authorProfileId", type: "select", label: "Author", required: true, options: fixtures.profiles.map((profile) => ({ value: profile.id, label: profile.name })) },
    { id: "article-featured-image", name: "featuredImageId", type: "select", label: "Featured image", required: true, options: fixtures.mediaItems.map((media) => ({ value: media.id, label: media.title })) },
    { id: "article-alt-text", name: "altText", type: "text", label: "Image alt text", required: true },
    { id: "article-body", name: "body", type: "textarea", label: "Body editor", required: true },
    { id: "article-seo-title", name: "seoTitle", type: "text", label: "SEO title", required: true },
    { id: "article-seo-description", name: "seoDescription", type: "textarea", label: "SEO description", required: true },
    { id: "article-og-title", name: "ogTitle", type: "text", label: "OG title", required: false },
    { id: "article-og-description", name: "ogDescription", type: "textarea", label: "OG description", required: false }
  ];
}

export function buildArticleManagementRouteModel(fixtures) {
  const route = getRouteByPath("/admin/articles");
  const stats = getArticleManagementStats(fixtures);

  return {
    pageId: "article-management",
    generatedFrom: "article-management-route-model",
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
      eyebrow: "Article Management",
      title: "Editorial publishing workflow.",
      dek: "Admin-only access to search, draft, validate, preview, publish, and unpublish articles."
    },
    sections: {
      toolbar: {
        heading: "Article controls",
        search: { name: "article-search", type: "search", label: "Search articles", placeholder: "Search by title, slug, author" },
        filters: toolbarFilters(fixtures),
        createHref: "/admin/articles/new",
        metrics: metricItems(stats)
      },
      articleTable: {
        heading: "Editorial table",
        columns: ["title", "status", "category", "author", "date", "seo-readiness", "row-actions"],
        items: getArticleRows(fixtures)
      },
      editor: {
        heading: "Create / edit article",
        action: "/admin/articles/save",
        method: "post",
        fields: editorFields(fixtures),
        actions: [
          { action: "autosave", label: "Autosave draft", type: "button" },
          { action: "draft", label: "Save draft", type: "submit" },
          { action: "publish", label: "Publish", type: "submit" }
        ]
      },
      states: {
        notes: ["article-draft", "article-publish", "article-autosave", "article-validation", "article-failure"],
        items: ["draft", "publish", "autosave", "validation", "failure"],
        validationCopy: "Validation summary links the administrator to missing required fields.",
        failureCopy: "Failure state keeps content in the editor and offers retry."
      }
    }
  };
}
