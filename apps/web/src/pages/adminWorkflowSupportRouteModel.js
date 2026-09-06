import { getRouteByPath } from "../routes.js";

export function getAdminWorkflowSupportRoutes() {
  return [
    { id: "media-upload-modal", path: "/admin/media/upload", file: "src/pages/admin/media-upload-modal.html", wireframe: "media-upload-modal.html" },
    { id: "article-editor-workflow", path: "/admin/articles/editor-workflow", file: "src/pages/admin/article-editor-workflow.html", wireframe: "article-editor-workflow.html" }
  ];
}

const mediaUploadFields = [
  { id: "upload-file", name: "file", label: "File", type: "file", required: true },
  { id: "upload-title", name: "title", label: "Title", type: "text", required: true },
  { id: "upload-alt-text", name: "altText", label: "Alt text", type: "text", required: true },
  { id: "upload-caption", name: "caption", label: "Caption", type: "textarea", required: true },
  { id: "upload-credit", name: "credit", label: "Credit", type: "text", required: true },
  { id: "upload-category", name: "categoryId", label: "Category", type: "select", required: true },
  { id: "upload-usage", name: "usage", label: "Usage", type: "select", required: true },
  { id: "upload-publish-readiness", name: "publishReadiness", label: "Publish readiness", type: "select", required: true },
  { id: "upload-article-link", name: "articleId", label: "Article link", type: "select", required: false },
  { id: "upload-rights-note", name: "rightsNote", label: "Rights note", type: "textarea", required: true }
];

const editorSteps = [
  { id: "draft", label: "Draft", description: "Title, slug, dek, and body are started." },
  { id: "media", label: "Media", description: "Featured media, alt text, credit, and caption are attached." },
  { id: "seo", label: "SEO", description: "Search and sharing metadata are reviewed." },
  { id: "review", label: "Review", description: "Editor checks content, preview, and readiness blockers." },
  { id: "publish", label: "Publish", description: "Schedule, publish, or roll back safely." }
];

const readinessChecklist = [
  { id: "title-slug-body", label: "Title, slug, dek, and body complete" },
  { id: "category-author", label: "Category and author selected" },
  { id: "media-alt-credit", label: "Featured media has alt text, caption, and credit" },
  { id: "seo-preview", label: "SEO preview and social image reviewed" },
  { id: "publish-safety", label: "Preview, schedule, publish, and rollback path confirmed" }
];

export function buildMediaUploadRouteModel() {
  const route = getRouteByPath("/admin/media/upload");
  return {
    pageId: "media-upload-modal",
    generatedFrom: "admin-workflow-support-route-model",
    route: { id: route.id, label: route.label, path: route.path, prototypeFile: route.prototypeFile },
    authRequired: "editor",
    responsive: "modal-desktop mobile-fullscreen",
    modal: { id: "media-upload-modal", role: "dialog", ariaModal: true, labelledBy: "media-upload-title", focusTrap: true, keyboardClose: "Escape", focusReturn: "media-upload-launcher" },
    intro: { eyebrow: "Media Upload Modal", title: "Upload media with publish-ready metadata.", body: "Admin subflow launched from Profile / Media Management or the article editor." },
    form: { id: "media-upload-modal", action: "/admin/media/upload", method: "post", enctype: "multipart/form-data" },
    dropzone: { id: "media-upload", helpId: "upload-file-help", helpText: "Drop an image, photo, or artwork file here, or use the keyboard file input below." },
    preview: { src: "/media/editorial/editorial-stagecraft.jpg", alt: "Editorial stagecraft preview", caption: "Preview updates after file selection." },
    fields: mediaUploadFields,
    sections: {
      fields: { id: "media-upload-fields" },
      states: { id: "media-upload-states", notes: ["media-uploading", "media-missing-alt-text", "media-invalid-file", "media-upload-failure", "media-upload-success"] }
    },
    actions: [
      { id: "save-draft-metadata", label: "Save draft metadata", type: "button" },
      { id: "insert-media", label: "Insert media", type: "submit" },
      { id: "cancel-upload", label: "Cancel", type: "button" }
    ]
  };
}

export function buildArticleEditorWorkflowRouteModel() {
  const route = getRouteByPath("/admin/articles/editor-workflow");
  return {
    pageId: "article-editor-workflow",
    generatedFrom: "admin-workflow-support-route-model",
    route: { id: route.id, label: route.label, path: route.path, prototypeFile: route.prototypeFile },
    authRequired: "editor",
    responsive: "desktop-editor mobile-stacked-workflow",
    intro: { eyebrow: "Article Editor Workflow", title: "Draft, enrich, review, and publish with visible blockers.", body: "Expanded admin subflow for article editing, media attachment, SEO review, preview, scheduling, publishing, and rollback." },
    steps: editorSteps,
    form: { id: "article-editor-workflow", action: "/admin/articles/save", method: "post" },
    workspace: { id: "editor-workspace", fields: [
      { id: "workflow-title", name: "title", label: "Title", type: "text", required: true },
      { id: "workflow-slug", name: "slug", label: "Slug", type: "text", required: true },
      { id: "workflow-body", name: "body", label: "Body editor", type: "textarea", required: true },
      { id: "workflow-category", name: "categoryId", label: "Category", type: "select", required: true },
      { id: "workflow-author", name: "authorProfileId", label: "Author", type: "select", required: true },
      { id: "workflow-featured-media", name: "featuredMediaId", label: "Featured media", type: "select", required: true }
    ] },
    checklist: readinessChecklist,
    seo: { id: "editor-seo-review", fields: [
      { id: "workflow-seo-title", name: "seoTitle", label: "SEO title", type: "text", required: true },
      { id: "workflow-seo-description", name: "seoDescription", label: "SEO description", type: "textarea", required: true },
      { id: "workflow-canonical-url", name: "canonicalUrl", label: "Canonical URL", type: "url", required: false },
      { id: "workflow-og-image", name: "ogImageId", label: "OG image", type: "select", required: true }
    ] },
    sections: {
      publishStates: { id: "editor-publish-states", notes: ["editor-autosave", "editor-validation", "editor-preview", "editor-schedule-publish", "editor-rollback"] }
    },
    actions: [
      { id: "autosave", label: "Autosave", type: "button" },
      { id: "preview", label: "Preview", type: "button" },
      { id: "schedule-publish", label: "Schedule / publish", type: "submit" },
      { id: "rollback", label: "Rollback", type: "button" }
    ]
  };
}
