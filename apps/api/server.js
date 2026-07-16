const crypto = require("node:crypto");
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { loadEnvFile } = require("./env.js");
const { ValidationError } = require("./submissionStore.js");
const { createPublicationStore } = require("./storeFactory.js");
const { AdminAuth } = require("./adminAuth.js");
const { validateProductionConfig } = require("./productionConfig.js");
const {
  FixedWindowRateLimiter,
  applyRateLimitHeaders,
  clientKey,
  createSecurityLogger,
  positiveInteger
} = require("./security.js");

const MAX_BODY_BYTES = 64 * 1024;
const DEFAULT_RATE_WINDOW_MS = 15 * 60 * 1000;
loadEnvFile();
const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2"
};

function loadEditorialSeed() {
  const seedPath = path.join(__dirname, "data", "editorial-seed.json");
  return fs.existsSync(seedPath) ? JSON.parse(fs.readFileSync(seedPath, "utf8")) : {};
}

function sendJson(response, statusCode, payload) {
  const body = JSON.stringify(payload);
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
    "Content-Security-Policy": "default-src 'none'; frame-ancestors 'none'; base-uri 'none'",
    "Referrer-Policy": "no-referrer",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
    "X-Frame-Options": "DENY"
  });
  response.end(body);
}

function staticSecurityHeaders() {
  return {
    "Content-Security-Policy": "default-src 'self'; img-src 'self' data:; font-src 'self' data:; style-src 'self'; script-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY"
  };
}

function sendFile(request, response, filePath) {
  const body = fs.readFileSync(filePath);
  const extension = path.extname(filePath).toLowerCase();
  const isIndex = path.basename(filePath).toLowerCase() === "index.html";
  const isHashedAsset = filePath.includes(`${path.sep}assets${path.sep}`) && /-[A-Za-z0-9_-]{6,}\./.test(path.basename(filePath));
  response.writeHead(200, {
    ...staticSecurityHeaders(),
    "Content-Type": MIME_TYPES[extension] || "application/octet-stream",
    "Content-Length": body.length,
    "Cache-Control": isIndex ? "no-cache" : isHashedAsset ? "public, max-age=31536000, immutable" : "public, max-age=3600"
  });
  response.end(request.method === "HEAD" ? undefined : body);
}

function serveWebRequest(request, response, url, webRoot) {
  if (!webRoot || !["GET", "HEAD"].includes(request.method) || url.pathname.startsWith("/api/")) return false;
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(url.pathname);
  } catch {
    sendJson(response, 400, { error: "Invalid URL path." });
    return true;
  }
  const resolvedRoot = path.resolve(webRoot);
  const relativePath = decodedPath.replace(/^\/+/, "");
  const candidate = path.resolve(resolvedRoot, relativePath);
  if (candidate !== resolvedRoot && !candidate.startsWith(`${resolvedRoot}${path.sep}`)) {
    sendJson(response, 404, { error: "Not found." });
    return true;
  }
  if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
    sendFile(request, response, candidate);
    return true;
  }
  if (path.extname(relativePath) || relativePath.startsWith("assets/")) {
    sendJson(response, 404, { error: "Not found." });
    return true;
  }
  const indexPath = path.join(resolvedRoot, "index.html");
  if (!fs.existsSync(indexPath)) return false;
  sendFile(request, response, indexPath);
  return true;
}

function isPublicSubmissionPath(pathname) {
  return pathname === "/api/newsletter-signups"
    || pathname === "/api/contact-submissions"
    || /^\/api\/articles\/[^/]+\/(comments|reviews)$/.test(pathname);
}

function readJson(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    let size = 0;

    request.on("data", (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        const error = new Error("Request body is too large.");
        error.statusCode = 413;
        reject(error);
        request.destroy();
        return;
      }
      body += chunk;
    });

    request.on("end", () => {
      if (!body) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch {
        const error = new Error("Request body must be valid JSON.");
        error.statusCode = 400;
        reject(error);
      }
    });
    request.on("error", reject);
  });
}

function tokensMatch(provided, expected) {
  const providedBuffer = Buffer.from(String(provided || ""));
  const expectedBuffer = Buffer.from(String(expected || ""));
  if (providedBuffer.length !== expectedBuffer.length || expectedBuffer.length === 0) {
    return false;
  }
  return crypto.timingSafeEqual(providedBuffer, expectedBuffer);
}

function requireAdmin(request, adminAuth) {
  if (!adminAuth.configured) {
    const error = new Error("Admin API is not configured.");
    error.statusCode = 503;
    throw error;
  }
  const identity = adminAuth.authenticateRequest(request);
  if (!identity || identity.role !== "admin") {
    const error = new Error("Authentication required.");
    error.statusCode = 401;
    throw error;
  }
  return identity;
}

function adminListOptions(url) {
  return {
    query: url.searchParams.get("q") || "",
    status: url.searchParams.get("status") || "",
    article: url.searchParams.get("article") || "",
    rating: url.searchParams.get("rating") || ""
  };
}

async function handleAdminRequest(request, response, url, store, adminAuth) {
  requireAdmin(request, adminAuth);

  if (request.method === "GET" && url.pathname === "/api/admin/editorial") {
    sendJson(response, 200, await store.editorialSnapshot());
    return true;
  }

  if (request.method === "GET" && url.pathname === "/api/admin/contact-submissions") {
    sendJson(response, 200, { items: await store.listContactSubmissions(adminListOptions(url)) });
    return true;
  }

  if (request.method === "GET" && url.pathname === "/api/admin/comments") {
    sendJson(response, 200, { items: await store.listComments(adminListOptions(url)) });
    return true;
  }

  if (request.method === "GET" && url.pathname === "/api/admin/reviews") {
    sendJson(response, 200, { items: await store.listReviews(adminListOptions(url)) });
    return true;
  }

  if (request.method === "POST" && url.pathname === "/api/admin/articles") {
    const payload = await readJson(request);
    sendJson(response, 201, await store.saveArticle(payload));
    return true;
  }

  if (request.method === "POST" && url.pathname === "/api/admin/profiles") {
    const payload = await readJson(request);
    sendJson(response, 201, await store.saveProfile(payload));
    return true;
  }

  if (request.method === "POST" && url.pathname === "/api/admin/media") {
    const payload = await readJson(request);
    sendJson(response, 201, await store.saveMediaItem(payload));
    return true;
  }

  const articleMatch = url.pathname.match(/^\/api\/admin\/articles\/([^/]+)$/);
  if (request.method === "PATCH" && articleMatch) {
    const payload = await readJson(request);
    sendJson(response, 200, await store.updateArticleStatus(decodeURIComponent(articleMatch[1]), payload.status));
    return true;
  }
  if (request.method === "DELETE" && articleMatch) {
    sendJson(response, 200, await store.deleteArticle(decodeURIComponent(articleMatch[1])));
    return true;
  }

  const profileMatch = url.pathname.match(/^\/api\/admin\/profiles\/([^/]+)$/);
  if ((request.method === "PUT" || request.method === "PATCH") && profileMatch) {
    const payload = await readJson(request);
    sendJson(response, 200, await store.saveProfile({ ...payload, id: decodeURIComponent(profileMatch[1]) }));
    return true;
  }
  if (request.method === "DELETE" && profileMatch) {
    sendJson(response, 200, await store.deleteProfile(decodeURIComponent(profileMatch[1])));
    return true;
  }

  const mediaMatch = url.pathname.match(/^\/api\/admin\/media\/([^/]+)$/);
  if ((request.method === "PUT" || request.method === "PATCH") && mediaMatch) {
    const payload = await readJson(request);
    sendJson(response, 200, await store.saveMediaItem({ ...payload, id: decodeURIComponent(mediaMatch[1]) }));
    return true;
  }
  if (request.method === "DELETE" && mediaMatch) {
    sendJson(response, 200, await store.deleteMediaItem(decodeURIComponent(mediaMatch[1])));
    return true;
  }

  const contactMatch = url.pathname.match(/^\/api\/admin\/contact-submissions\/([^/]+)$/);
  if (request.method === "PATCH" && contactMatch) {
    const payload = await readJson(request);
    sendJson(response, 200, await store.updateContactStatus(decodeURIComponent(contactMatch[1]), payload.status));
    return true;
  }

  const commentMatch = url.pathname.match(/^\/api\/admin\/comments\/([^/]+)$/);
  if (request.method === "PATCH" && commentMatch) {
    const payload = await readJson(request);
    sendJson(response, 200, await store.updateCommentStatus(decodeURIComponent(commentMatch[1]), payload.status));
    return true;
  }
  if (request.method === "DELETE" && commentMatch) {
    sendJson(response, 200, await store.deleteComment(decodeURIComponent(commentMatch[1])));
    return true;
  }

  const reviewMatch = url.pathname.match(/^\/api\/admin\/reviews\/([^/]+)$/);
  if (request.method === "PATCH" && reviewMatch) {
    const payload = await readJson(request);
    sendJson(response, 200, await store.updateReviewStatus(decodeURIComponent(reviewMatch[1]), payload.status));
    return true;
  }
  if (request.method === "DELETE" && reviewMatch) {
    sendJson(response, 200, await store.deleteReview(decodeURIComponent(reviewMatch[1])));
    return true;
  }

  sendJson(response, 404, { error: "Not found." });
  return true;
}

function createApiServer(options = {}) {
  const environment = options.environment || process.env;
  const productionConfig = validateProductionConfig(environment);
  const store = options.store || createPublicationStore({
    environment,
    dataPath: options.dataPath,
    pool: options.pool,
    seed: options.seed || loadEditorialSeed()
  });
  const adminToken = options.adminToken ?? environment.BABAS_ADMIN_TOKEN ?? "";
  const adminAuth = options.adminAuth || new AdminAuth({
    email: options.adminEmail ?? environment.BABAS_ADMIN_EMAIL ?? "",
    password: options.adminPassword ?? environment.BABAS_ADMIN_PASSWORD ?? "",
    passwordHash: options.adminPasswordHash ?? environment.BABAS_ADMIN_PASSWORD_HASH ?? "",
    bearerToken: adminToken
  });
  const webRoot = options.webRoot || environment.BABAS_WEB_DIST_PATH || (productionConfig.production ? path.join(__dirname, "..", "web", "dist") : "");
  if (productionConfig.production && !fs.existsSync(path.join(webRoot, "index.html"))) {
    throw new Error("Production web build is missing. Run npm.cmd --prefix apps/web run build or set BABAS_WEB_DIST_PATH.");
  }

  const defaultWindowMs = positiveInteger(environment.BABAS_RATE_WINDOW_MS, DEFAULT_RATE_WINDOW_MS);
  const loginRateLimit = options.loginRateLimit || {};
  const publicRateLimit = options.publicRateLimit || {};
  const loginLimiter = options.loginLimiter || new FixedWindowRateLimiter({
    limit: loginRateLimit.limit ?? positiveInteger(environment.BABAS_LOGIN_RATE_LIMIT, 5),
    windowMs: loginRateLimit.windowMs ?? defaultWindowMs,
    now: options.now
  });
  const publicLimiter = options.publicLimiter || new FixedWindowRateLimiter({
    limit: publicRateLimit.limit ?? positiveInteger(environment.BABAS_PUBLIC_RATE_LIMIT, 20),
    windowMs: publicRateLimit.windowMs ?? defaultWindowMs,
    now: options.now
  });
  const trustProxy = options.trustProxy ?? environment.BABAS_TRUST_PROXY === "1";
  const securityLogger = options.securityLogger || (productionConfig.production ? createSecurityLogger() : () => {});

  const server = http.createServer(async (request, response) => {
    const url = new URL(request.url, "http://127.0.0.1");
    const requestId = crypto.randomUUID();
    response.setHeader("X-Request-Id", requestId);
    const logSecurity = (event, status, level) => securityLogger({
      event,
      status,
      level,
      requestId,
      method: request.method,
      path: url.pathname
    });

    try {
      if (request.method === "GET" && url.pathname === "/api/health") {
        await store.ready;
        const storage = typeof store.healthCheck === "function" ? await store.healthCheck() : { storage: "json" };
        sendJson(response, 200, { status: "ok", ...storage });
        return;
      }

      if (request.method === "GET" && url.pathname === "/api/content") {
        const snapshot = await store.editorialSnapshot({ publishedOnly: true, reviewStatus: "approved" });
        const comments = await store.listComments("approved");
        sendJson(response, 200, {
          ...snapshot,
          comments: comments.map((comment) => ({ ...comment, articleId: comment.articleSlug }))
        });
        return;
      }

      if (request.method === "POST" && url.pathname === "/api/admin/login") {
        const rateResult = loginLimiter.consume(clientKey(request, "admin-login", trustProxy));
        applyRateLimitHeaders(response, rateResult);
        if (!rateResult.allowed) {
          logSecurity("admin.login.rate_limited", 429, "warn");
          sendJson(response, 429, { error: "Too many login attempts. Try again later." });
          return;
        }
        if (!adminAuth.email || (!adminAuth.password && !adminAuth.passwordHash)) {
          const error = new Error("Admin login is not configured.");
          error.statusCode = 503;
          throw error;
        }
        const payload = await readJson(request);
        const session = adminAuth.login(payload.email, payload.password);
        if (!session) {
          logSecurity("admin.login.failed", 401, "warn");
          const error = new Error("Email or password is incorrect.");
          error.statusCode = 401;
          throw error;
        }
        response.setHeader("Set-Cookie", adminAuth.sessionCookie(session.token, environment.NODE_ENV === "production"));
        logSecurity("admin.login.succeeded", 200);
        sendJson(response, 200, { role: "admin" });
        return;
      }

      if (request.method === "GET" && url.pathname === "/api/admin/session") {
        const identity = requireAdmin(request, adminAuth);
        sendJson(response, 200, { role: identity.role });
        return;
      }

      if (request.method === "POST" && url.pathname === "/api/admin/logout") {
        adminAuth.logout(request);
        response.setHeader("Set-Cookie", adminAuth.clearCookie(environment.NODE_ENV === "production"));
        sendJson(response, 200, { status: "signed-out" });
        return;
      }

      if (url.pathname.startsWith("/api/admin/")) {
        await handleAdminRequest(request, response, url, store, adminAuth);
        return;
      }

      if (serveWebRequest(request, response, url, webRoot)) return;

      if (request.method !== "POST") {
        sendJson(response, 404, { error: "Not found." });
        return;
      }

      if (isPublicSubmissionPath(url.pathname)) {
        const rateResult = publicLimiter.consume(clientKey(request, "public-submission", trustProxy));
        applyRateLimitHeaders(response, rateResult);
        if (!rateResult.allowed) {
          logSecurity("public_submission.rate_limited", 429, "warn");
          sendJson(response, 429, { error: "Too many submissions. Try again later." });
          return;
        }
      }

      const payload = await readJson(request);

      if (url.pathname === "/api/newsletter-signups") {
        const signup = await store.createNewsletterSignup(payload);
        logSecurity("public_submission.accepted", signup.duplicate ? 200 : 201);
        sendJson(response, signup.duplicate ? 200 : 201, {
          id: signup.id,
          email: signup.email,
          status: signup.status
        });
        return;
      }

      if (url.pathname === "/api/contact-submissions") {
        const submission = await store.createContactSubmission(payload);
        logSecurity("public_submission.accepted", 201);
        sendJson(response, 201, {
          id: submission.id,
          status: submission.status
        });
        return;
      }

      const commentMatch = url.pathname.match(/^\/api\/articles\/([^/]+)\/comments$/);
      if (commentMatch) {
        const comment = await store.createComment(decodeURIComponent(commentMatch[1]), payload);
        logSecurity("public_submission.accepted", 201);
        sendJson(response, 201, {
          id: comment.id,
          articleSlug: comment.articleSlug,
          status: comment.status
        });
        return;
      }

      const reviewSubmissionMatch = url.pathname.match(/^\/api\/articles\/([^/]+)\/reviews$/);
      if (reviewSubmissionMatch) {
        const review = await store.createReview(decodeURIComponent(reviewSubmissionMatch[1]), payload);
        logSecurity("public_submission.accepted", 201);
        sendJson(response, 201, { id: review.id, articleId: review.articleId, status: review.status });
        return;
      }

      sendJson(response, 404, { error: "Not found." });
    } catch (error) {
      const statusCode = error instanceof ValidationError ? 422 : error.statusCode || 500;
      if (statusCode >= 500) logSecurity("api.error", statusCode, "error");
      else if (statusCode === 401 && url.pathname.startsWith("/api/admin/") && url.pathname !== "/api/admin/login") {
        logSecurity("admin.auth.denied", statusCode, "warn");
      }
      sendJson(response, statusCode, {
        error: statusCode === 500 ? "Internal server error." : error.message
      });
    }
  });
  server.storeReady = Promise.resolve(store.ready);
  return server;
}

if (require.main === module) {
  const port = Number(process.env.PORT || 8787);
  const host = process.env.HOST || "127.0.0.1";
  const server = createApiServer();
  server.storeReady.then(() => {
    server.listen(port, host, () => {
      process.stdout.write(`Babas & Brasse API listening at http://${host}:${port}\n`);
    });
  }).catch((error) => {
    process.stderr.write(`Babas & Brasse failed to start: ${error.message}\n`);
    process.exitCode = 1;
  });
}

module.exports = {
  createApiServer,
  readJson,
  requireAdmin,
  tokensMatch
};


