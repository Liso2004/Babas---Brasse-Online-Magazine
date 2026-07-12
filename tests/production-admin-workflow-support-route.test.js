const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const root = path.resolve(__dirname, "..");
function filePath(relativePath) { return path.join(root, relativePath); }
function read(relativePath) { return fs.readFileSync(filePath(relativePath), "utf8").replace(/^\uFEFF/, ""); }
function exists(relativePath) { return fs.existsSync(filePath(relativePath)); }
async function loadAdminWorkflowModel() {
  const modulePath = filePath("apps/web/src/pages/adminWorkflowSupportRouteModel.js");
  assert.ok(fs.existsSync(modulePath), "apps/web/src/pages/adminWorkflowSupportRouteModel.js should exist");
  return import(pathToFileURL(modulePath).href);
}

test("production admin workflow support model preserves media upload and editor workflow routes", async () => {
  const { getAdminWorkflowSupportRoutes, buildMediaUploadRouteModel, buildArticleEditorWorkflowRouteModel } = await loadAdminWorkflowModel();
  const routes = getAdminWorkflowSupportRoutes();
  const mediaUpload = buildMediaUploadRouteModel();
  const editorWorkflow = buildArticleEditorWorkflowRouteModel();

  assert.deepEqual(routes.map((route) => route.path), ["/admin/media/upload", "/admin/articles/editor-workflow"]);
  assert.equal(mediaUpload.pageId, "media-upload-modal");
  assert.equal(mediaUpload.generatedFrom, "admin-workflow-support-route-model");
  assert.equal(mediaUpload.route.prototypeFile, "src/pages/admin/media-upload-modal.html");
  assert.equal(editorWorkflow.pageId, "article-editor-workflow");
  assert.equal(editorWorkflow.generatedFrom, "admin-workflow-support-route-model");
  assert.equal(editorWorkflow.route.prototypeFile, "src/pages/admin/article-editor-workflow.html");
});

test("production Media Upload model includes modal accessibility metadata and required fields", async () => {
  const { buildMediaUploadRouteModel } = await loadAdminWorkflowModel();
  const model = buildMediaUploadRouteModel();

  assert.equal(model.modal.role, "dialog");
  assert.equal(model.modal.ariaModal, true);
  assert.equal(model.modal.focusTrap, true);
  assert.equal(model.modal.keyboardClose, "Escape");
  assert.equal(model.modal.focusReturn, "media-upload-launcher");
  assert.deepEqual(model.fields.map((field) => field.id), [
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
  assert.deepEqual(model.sections.states.notes, ["media-uploading", "media-missing-alt-text", "media-invalid-file", "media-upload-failure", "media-upload-success"]);
  assert.deepEqual(model.actions.map((action) => action.id), ["save-draft-metadata", "insert-media", "cancel-upload"]);
});

test("production Article Editor Workflow model includes steps checklist SEO and publish states", async () => {
  const { buildArticleEditorWorkflowRouteModel } = await loadAdminWorkflowModel();
  const model = buildArticleEditorWorkflowRouteModel();

  assert.deepEqual(model.steps.map((step) => step.id), ["draft", "media", "seo", "review", "publish"]);
  assert.ok(model.checklist.some((item) => item.id === "title-slug-body"));
  assert.ok(model.checklist.some((item) => item.id === "media-alt-credit"));
  assert.ok(model.checklist.some((item) => item.id === "seo-preview"));
  assert.deepEqual(model.workspace.fields.map((field) => field.id), ["workflow-title", "workflow-slug", "workflow-body", "workflow-category", "workflow-author", "workflow-featured-media"]);
  assert.deepEqual(model.seo.fields.map((field) => field.id), ["workflow-seo-title", "workflow-seo-description", "workflow-canonical-url", "workflow-og-image"]);
  assert.deepEqual(model.sections.publishStates.notes, ["editor-autosave", "editor-validation", "editor-preview", "editor-schedule-publish", "editor-rollback"]);
  assert.deepEqual(model.actions.map((action) => action.id), ["autosave", "preview", "schedule-publish", "rollback"]);
});

test("React-ready admin workflow support pages are scaffolded from the route models", () => {
  assert.ok(exists("apps/web/src/pages/MediaUploadModalPage.jsx"), "MediaUploadModalPage.jsx should exist");
  assert.ok(exists("apps/web/src/pages/ArticleEditorWorkflowPage.jsx"), "ArticleEditorWorkflowPage.jsx should exist");
  const mediaUploadComponent = read("apps/web/src/pages/MediaUploadModalPage.jsx");
  const editorWorkflowComponent = read("apps/web/src/pages/ArticleEditorWorkflowPage.jsx");
  const app = read("apps/web/src/App.jsx");

  assert.match(mediaUploadComponent, /export function MediaUploadModalPage/);
  assert.match(mediaUploadComponent, /buildMediaUploadRouteModel/);
  assert.match(mediaUploadComponent, /data-page="media-upload-modal"/);
  assert.match(mediaUploadComponent, /data-section="media-upload-modal"/);
  assert.match(mediaUploadComponent, /data-section="media-upload-fields"/);
  assert.match(mediaUploadComponent, /data-section="media-upload-states"/);
  assert.match(editorWorkflowComponent, /export function ArticleEditorWorkflowPage/);
  assert.match(editorWorkflowComponent, /buildArticleEditorWorkflowRouteModel/);
  assert.match(editorWorkflowComponent, /data-page="article-editor-workflow"/);
  assert.match(editorWorkflowComponent, /data-section="editor-steps"/);
  assert.match(editorWorkflowComponent, /data-section="editor-seo-review"/);
  assert.match(editorWorkflowComponent, /data-section="editor-publish-states"/);
  assert.match(app, /MediaUploadModalPage/);
  assert.match(app, /route\.id === "media-upload"/);
  assert.match(app, /ArticleEditorWorkflowPage/);
  assert.match(app, /route\.id === "article-editor-workflow"/);
});

test("Admin workflow support route migration handoff is documented and wired into scripts", () => {
  const rootPkg = JSON.parse(read("package.json"));
  const runTests = read("tests/run-tests.js");
  const readme = read("apps/web/README.md");
  const planStatus = read("docs/PLAN_STATUS.md");

  assert.ok(rootPkg.scripts["test:production-admin-workflow-support"]);
  assert.match(runTests, /production-admin-workflow-support-route\.test\.js/);
  assert.match(readme, /Admin Workflow Support route migration/i);
  assert.match(planStatus, /Admin Workflow Support route migration/i);
});
