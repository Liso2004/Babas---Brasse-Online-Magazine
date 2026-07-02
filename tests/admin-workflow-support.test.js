const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

function filePath(relativePath) {
  return path.join(root, relativePath);
}

function read(relativePath) {
  return fs.readFileSync(filePath(relativePath), "utf8").replace(/^\uFEFF/, "");
}

function load(relativePath) {
  delete require.cache[require.resolve(filePath(relativePath))];
  return require(filePath(relativePath));
}

test("Phase 5 admin workflow support plan documents media upload and editor subflows", () => {
  const plan = read("docs/PHASE5_ADMIN_WORKFLOW_SUPPORT_PLAN.md");

  assert.match(plan, /Admin Workflow Support/i);
  assert.match(plan, /Media Upload Modal/i);
  assert.match(plan, /Article Editor Workflow/i);
  assert.match(plan, /focus trap/i);
  assert.match(plan, /Escape/i);
  assert.match(plan, /return focus/i);
  assert.match(plan, /alt text/i);
  assert.match(plan, /rights note/i);
  assert.match(plan, /Draft, Media, SEO, Review, Publish/i);
  assert.match(plan, /autosave/i);
  assert.match(plan, /rollback/i);
});

test("admin workflow support renderer exports both subflow pages and route metadata", () => {
  const {
    getAdminWorkflowSupportRoutes,
    getMediaUploadMetadataFields,
    getEditorWorkflowSteps,
    getEditorReadinessChecklist,
    renderMediaUploadModalPage,
    renderArticleEditorWorkflowPage
  } = load("src/render/admin-workflow-support.js");
  const fixtures = load("src/content/fixtures.js");
  const routes = getAdminWorkflowSupportRoutes();
  const mediaHtml = renderMediaUploadModalPage(fixtures);
  const editorHtml = renderArticleEditorWorkflowPage(fixtures);

  assert.deepEqual(routes.map((route) => route.path), ["/admin/media/upload", "/admin/articles/editor-workflow"]);
  assert.equal(typeof getMediaUploadMetadataFields, "function");
  assert.equal(typeof getEditorWorkflowSteps, "function");
  assert.equal(typeof getEditorReadinessChecklist, "function");
  assert.match(mediaHtml, /data-page="media-upload-modal"/);
  assert.match(mediaHtml, /data-route="\/admin\/media\/upload"/);
  assert.match(mediaHtml, /data-area="admin"/);
  assert.match(mediaHtml, /data-generated="admin-workflow-support-renderer"/);
  assert.match(mediaHtml, /data-wireframe-source="media-upload-modal.html"/);
  assert.match(mediaHtml, /data-auth-required="editor"/);
  assert.match(editorHtml, /data-page="article-editor-workflow"/);
  assert.match(editorHtml, /data-route="\/admin\/articles\/editor-workflow"/);
  assert.match(editorHtml, /data-area="admin"/);
  assert.match(editorHtml, /data-generated="admin-workflow-support-renderer"/);
  assert.match(editorHtml, /data-wireframe-source="article-editor-workflow.html"/);
  assert.match(editorHtml, /data-auth-required="editor"/);
});

test("Media Upload Modal preserves upload anatomy metadata and accessibility rules", () => {
  const { getMediaUploadMetadataFields, renderMediaUploadModalPage } = load("src/render/admin-workflow-support.js");
  const fixtures = load("src/content/fixtures.js");
  const fields = getMediaUploadMetadataFields();
  const html = renderMediaUploadModalPage(fixtures);

  assert.deepEqual(fields.map((field) => field.id), [
    "upload-file",
    "upload-title",
    "upload-alt-text",
    "upload-caption",
    "upload-credit",
    "upload-category",
    "upload-usage",
    "upload-publish-readiness",
    "upload-article-link",
    "upload-rights-note"
  ]);

  assert.match(html, /role="dialog"/);
  assert.match(html, /aria-modal="true"/);
  assert.match(html, /data-modal-focus-trap="true"/);
  assert.match(html, /data-keyboard-close="Escape"/);
  assert.match(html, /data-focus-return="media-upload-launcher"/);
  assert.match(html, /data-section="media-dropzone"/);
  assert.match(html, /data-section="media-preview"/);
  assert.match(html, /for="upload-file"/);
  assert.match(html, /type="file"/);
  assert.match(html, /for="upload-title"/);
  assert.match(html, /for="upload-alt-text"/);
  assert.match(html, /for="upload-caption"/);
  assert.match(html, /for="upload-credit"/);
  assert.match(html, /for="upload-category"/);
  assert.match(html, /for="upload-usage"/);
  assert.match(html, /for="upload-publish-readiness"/);
  assert.match(html, /for="upload-article-link"/);
  assert.match(html, /for="upload-rights-note"/);
});

test("Media Upload Modal exposes upload states and modal actions", () => {
  const { renderMediaUploadModalPage } = load("src/render/admin-workflow-support.js");
  const fixtures = load("src/content/fixtures.js");
  const html = renderMediaUploadModalPage(fixtures);

  assert.match(html, /data-section="media-upload-states"/);
  assert.match(html, /data-state-note="media-uploading"/);
  assert.match(html, /data-state-note="media-missing-alt-text"/);
  assert.match(html, /data-state-note="media-invalid-file"/);
  assert.match(html, /data-state-note="media-upload-failure"/);
  assert.match(html, /data-state-note="media-upload-success"/);
  assert.match(html, /data-action="save-draft-metadata"/);
  assert.match(html, /data-action="insert-media"/);
  assert.match(html, /data-action="cancel-upload"/);
});

test("Article Editor Workflow renders substeps workspace SEO review and readiness checklist", () => {
  const { getEditorWorkflowSteps, getEditorReadinessChecklist, renderArticleEditorWorkflowPage } = load("src/render/admin-workflow-support.js");
  const fixtures = load("src/content/fixtures.js");
  const steps = getEditorWorkflowSteps();
  const checklist = getEditorReadinessChecklist();
  const html = renderArticleEditorWorkflowPage(fixtures);

  assert.deepEqual(steps.map((step) => step.id), ["draft", "media", "seo", "review", "publish"]);
  assert.ok(checklist.some((item) => item.id === "title-slug-body"));
  assert.ok(checklist.some((item) => item.id === "media-alt-credit"));
  assert.ok(checklist.some((item) => item.id === "seo-preview"));

  assert.match(html, /data-section="editor-steps"/);
  assert.match(html, /data-step="draft"/);
  assert.match(html, /data-step="media"/);
  assert.match(html, /data-step="seo"/);
  assert.match(html, /data-step="review"/);
  assert.match(html, /data-step="publish"/);
  assert.match(html, /data-section="editor-workspace"/);
  assert.match(html, /for="workflow-title"/);
  assert.match(html, /for="workflow-slug"/);
  assert.match(html, /for="workflow-body"/);
  assert.match(html, /for="workflow-category"/);
  assert.match(html, /for="workflow-author"/);
  assert.match(html, /for="workflow-featured-media"/);
  assert.match(html, /data-section="editor-readiness-checklist"/);
});

test("Article Editor Workflow includes SEO review publish states and rollback path", () => {
  const { renderArticleEditorWorkflowPage } = load("src/render/admin-workflow-support.js");
  const fixtures = load("src/content/fixtures.js");
  const html = renderArticleEditorWorkflowPage(fixtures);

  assert.match(html, /data-section="editor-seo-review"/);
  assert.match(html, /for="workflow-seo-title"/);
  assert.match(html, /for="workflow-seo-description"/);
  assert.match(html, /for="workflow-canonical-url"/);
  assert.match(html, /for="workflow-og-image"/);
  assert.match(html, /data-section="editor-publish-states"/);
  assert.match(html, /data-state-note="editor-autosave"/);
  assert.match(html, /data-state-note="editor-validation"/);
  assert.match(html, /data-state-note="editor-preview"/);
  assert.match(html, /data-state-note="editor-schedule-publish"/);
  assert.match(html, /data-state-note="editor-rollback"/);
  assert.match(html, /data-action="autosave"/);
  assert.match(html, /data-action="preview"/);
  assert.match(html, /data-action="schedule-publish"/);
  assert.match(html, /data-action="rollback"/);
});

test("admin workflow support page artifacts are generated from the renderer contract", () => {
  const mediaHtml = read("src/pages/admin/media-upload-modal.html");
  const editorHtml = read("src/pages/admin/article-editor-workflow.html");

  assert.match(mediaHtml, /data-page="media-upload-modal"/);
  assert.match(mediaHtml, /data-route="\/admin\/media\/upload"/);
  assert.match(mediaHtml, /data-generated="admin-workflow-support-renderer"/);
  assert.match(mediaHtml, /data-section="media-dropzone"/);
  assert.match(mediaHtml, /data-section="media-upload-states"/);
  assert.match(editorHtml, /data-page="article-editor-workflow"/);
  assert.match(editorHtml, /data-route="\/admin\/articles\/editor-workflow"/);
  assert.match(editorHtml, /data-generated="admin-workflow-support-renderer"/);
  assert.match(editorHtml, /data-section="editor-steps"/);
  assert.match(editorHtml, /data-section="editor-publish-states"/);
});
