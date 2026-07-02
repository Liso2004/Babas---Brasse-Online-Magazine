const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { allRoutes } = require("../src/routes.js");

const root = path.resolve(__dirname, "..");
const port = Number(process.env.PORT || 4173);

const supportRoutes = [
  { id: "admin-login", label: "Admin Login", path: "/admin/login", area: "support", file: "src/pages/admin/login.html" },
  { id: "password-reset", label: "Password Reset", path: "/admin/password-reset", area: "support", file: "src/pages/admin/password-reset.html" },
  { id: "not-found", label: "404 Not Found", path: "/404", area: "support", file: "src/pages/not-found.html" },
  { id: "server-error", label: "500 Server Error", path: "/500", area: "support", file: "src/pages/server-error.html" },
  { id: "offline-maintenance", label: "Offline / Maintenance", path: "/offline", area: "support", file: "src/pages/offline-maintenance.html" },
  { id: "media-upload-modal", label: "Media Upload Modal", path: "/admin/media/upload", area: "support", file: "src/pages/admin/media-upload-modal.html" },
  { id: "article-editor-workflow", label: "Article Editor Workflow", path: "/admin/articles/editor-workflow", area: "support", file: "src/pages/admin/article-editor-workflow.html" },
  { id: "mobile-wireframes", label: "Mobile Wireframe Comps", path: "/mobile-wireframes", area: "support", file: "src/pages/mobile-wireframes.html" }
];

const routes = [...allRoutes, ...supportRoutes];
const routeByPath = new Map(routes.map((route) => [route.path, route]));

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function readPage(route) {
  return fs.readFileSync(path.join(root, route.file), "utf8").replace(/^\uFEFF/, "");
}

function groupRoutes(area) {
  return routes.filter((route) => route.area === area);
}

function navLink(route) {
  return `<a href="${escapeHtml(route.path)}">${escapeHtml(route.label)}</a>`;
}

function renderRouteIndex() {
  const publicLinks = groupRoutes("public").map(navLink).join("");
  const adminLinks = groupRoutes("admin").map(navLink).join("");
  const supportLinks = groupRoutes("support").map(navLink).join("");

  return `<main class="preview-index">
    <section class="hero-panel">
      <p class="eyebrow">Babas &amp; Brasse MVP Preview</p>
      <h1>Wireframe-backed prototype routes</h1>
      <p>This local preview serves the generated MVP artifacts. It is still a prototype contract, not the final production React app.</p>
    </section>
    <section class="route-groups">
      <article><h2>Public</h2><div class="route-list">${publicLinks}</div></article>
      <article><h2>Admin</h2><div class="route-list">${adminLinks}</div></article>
      <article><h2>Support</h2><div class="route-list">${supportLinks}</div></article>
    </section>
  </main>`;
}

function renderShell(title, body) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)} | Babas &amp; Brasse MVP</title>
  <style>
    :root { color-scheme: light; --ink: #181716; --muted: #6b625c; --line: #d8d2ca; --paper: #faf7f2; --panel: #fffefb; --accent: #a43f2f; --deep: #243837; }
    * { box-sizing: border-box; }
    body { margin: 0; font-family: Arial, Helvetica, sans-serif; color: var(--ink); background: var(--paper); line-height: 1.5; }
    a { color: var(--deep); font-weight: 700; }
    .preview-bar { position: sticky; top: 0; z-index: 10; display: flex; gap: 12px; align-items: center; justify-content: space-between; padding: 10px 18px; border-bottom: 1px solid var(--line); background: rgba(255, 254, 251, .96); }
    .preview-bar strong { letter-spacing: .04em; text-transform: uppercase; font-size: 13px; }
    .preview-bar nav { display: flex; gap: 10px; flex-wrap: wrap; }
    .preview-bar a { font-size: 13px; text-decoration: none; }
    main, body > section { width: min(1180px, calc(100% - 32px)); margin: 24px auto 60px; }
    section, article, nav, header, footer, form { border-radius: 8px; }
    body > section section, main section, body > section article, main article, body > section form { border: 1px solid var(--line); background: var(--panel); padding: 18px; margin: 14px 0; }
    nav[data-section], header[data-section], footer[data-section] { border: 1px solid var(--line); background: var(--panel); padding: 16px; margin: 14px 0; }
    nav[data-section] { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }
    nav[data-section] .admin-links, nav[data-section] .editorial-links { display: flex; flex-wrap: wrap; gap: 10px; }
    h1 { font-size: clamp(28px, 4vw, 52px); line-height: 1.05; margin: 8px 0 12px; }
    h2 { font-size: 24px; margin: 0 0 10px; }
    h3 { margin-bottom: 6px; }
    .eyebrow { color: var(--accent); font-weight: 800; text-transform: uppercase; font-size: 12px; letter-spacing: .08em; }
    input, textarea, select, button { width: 100%; max-width: 520px; min-height: 44px; margin: 6px 0 12px; padding: 10px 12px; border: 1px solid var(--line); border-radius: 6px; font: inherit; }
    button, .button, .subscribe-cta { width: auto; display: inline-flex; align-items: center; min-height: 44px; padding: 10px 14px; background: var(--deep); color: white; border: 0; border-radius: 6px; text-decoration: none; }
    table, [role="table"] { width: 100%; overflow: auto; }
    [role="row"] { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 8px; border-bottom: 1px solid var(--line); padding: 10px 0; }
    .route-groups { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px; border: 0; background: transparent; padding: 0; }
    .route-list { display: grid; gap: 8px; }
    .hero-panel { background: var(--deep); color: white; }
    .hero-panel .eyebrow { color: #f4c3a6; }
    @media (max-width: 640px) { .preview-bar { align-items: flex-start; flex-direction: column; } main, body > section { width: min(100% - 20px, 1180px); margin-top: 12px; } }
  </style>
</head>
<body>
  <div class="preview-bar">
    <strong>B&amp;B MVP Preview</strong>
    <nav aria-label="Preview navigation"><a href="/">Home</a><a href="/visceral-mag">Articles</a><a href="/search">Search</a><a href="/admin">Admin</a><a href="/__routes">All routes</a></nav>
  </div>
  ${body}
</body>
</html>`;
}

function send(res, status, content, type = "text/html; charset=utf-8") {
  res.writeHead(status, { "Content-Type": type, "Cache-Control": "no-store" });
  res.end(content);
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const pathname = url.pathname === "/index.html" ? "/" : url.pathname.replace(/\/$/, "") || "/";

  if (pathname === "/__routes") {
    send(res, 200, renderShell("All routes", renderRouteIndex()));
    return;
  }

  const route = routeByPath.get(pathname) || routeByPath.get("/404");
  const status = route.path === "/404" && pathname !== "/404" ? 404 : 200;

  try {
    send(res, status, renderShell(route.label, readPage(route)));
  } catch (error) {
    send(res, 500, renderShell("Preview Error", `<main><h1>Preview error</h1><pre>${escapeHtml(error.stack || error.message)}</pre></main>`));
  }
});

server.listen(port, () => {
  console.log(`Babas & Brasse MVP preview running at http://localhost:${port}`);
  console.log(`Route index: http://localhost:${port}/__routes`);
});
