const crypto = require("node:crypto");
const http = require("node:http");
const path = require("node:path");
const { SubmissionStore, ValidationError } = require("./submissionStore.js");
const { AdminAuth } = require("./adminAuth.js");

const MAX_BODY_BYTES = 64 * 1024;

function sendJson(response, statusCode, payload) {
  const body = JSON.stringify(payload);
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff"
  });
  response.end(body);
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

async function handleAdminRequest(request, response, url, store, adminAuth) {
  requireAdmin(request, adminAuth);

  if (request.method === "GET" && url.pathname === "/api/admin/contact-submissions") {
    sendJson(response, 200, { items: store.listContactSubmissions() });
    return true;
  }

  if (request.method === "GET" && url.pathname === "/api/admin/comments") {
    sendJson(response, 200, { items: store.listComments(url.searchParams.get("status") || "") });
    return true;
  }

  const contactMatch = url.pathname.match(/^\/api\/admin\/contact-submissions\/([^/]+)$/);
  if (request.method === "PATCH" && contactMatch) {
    const payload = await readJson(request);
    sendJson(response, 200, store.updateContactStatus(decodeURIComponent(contactMatch[1]), payload.status));
    return true;
  }

  const commentMatch = url.pathname.match(/^\/api\/admin\/comments\/([^/]+)$/);
  if (request.method === "PATCH" && commentMatch) {
    const payload = await readJson(request);
    sendJson(response, 200, store.updateCommentStatus(decodeURIComponent(commentMatch[1]), payload.status));
    return true;
  }

  sendJson(response, 404, { error: "Not found." });
  return true;
}

function createApiServer(options = {}) {
  const dataPath = options.dataPath || process.env.BABAS_API_DATA_PATH || path.join(__dirname, "data", "submissions.json");
  const store = options.store || new SubmissionStore(dataPath);
  const adminToken = options.adminToken ?? process.env.BABAS_ADMIN_TOKEN ?? "";
  const adminAuth = options.adminAuth || new AdminAuth({
    email: options.adminEmail ?? process.env.BABAS_ADMIN_EMAIL ?? "",
    password: options.adminPassword ?? process.env.BABAS_ADMIN_PASSWORD ?? "",
    bearerToken: adminToken
  });

  return http.createServer(async (request, response) => {
    const url = new URL(request.url, "http://127.0.0.1");
    try {
      if (request.method === "GET" && url.pathname === "/api/health") {
        sendJson(response, 200, { status: "ok" });
        return;
      }

      if (request.method === "POST" && url.pathname === "/api/admin/login") {
        if (!adminAuth.email || !adminAuth.password) {
          const error = new Error("Admin login is not configured.");
          error.statusCode = 503;
          throw error;
        }
        const payload = await readJson(request);
        const session = adminAuth.login(payload.email, payload.password);
        if (!session) {
          const error = new Error("Email or password is incorrect.");
          error.statusCode = 401;
          throw error;
        }
        response.setHeader("Set-Cookie", adminAuth.sessionCookie(session.token, process.env.NODE_ENV === "production"));
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
        response.setHeader("Set-Cookie", adminAuth.clearCookie(process.env.NODE_ENV === "production"));
        sendJson(response, 200, { status: "signed-out" });
        return;
      }

      if (url.pathname.startsWith("/api/admin/")) {
        await handleAdminRequest(request, response, url, store, adminAuth);
        return;
      }

      if (request.method !== "POST") {
        sendJson(response, 404, { error: "Not found." });
        return;
      }

      const payload = await readJson(request);

      if (url.pathname === "/api/newsletter-signups") {
        const signup = store.createNewsletterSignup(payload);
        sendJson(response, signup.duplicate ? 200 : 201, {
          id: signup.id,
          email: signup.email,
          status: signup.status
        });
        return;
      }

      if (url.pathname === "/api/contact-submissions") {
        const submission = store.createContactSubmission(payload);
        sendJson(response, 201, {
          id: submission.id,
          status: submission.status
        });
        return;
      }

      const commentMatch = url.pathname.match(/^\/api\/articles\/([^/]+)\/comments$/);
      if (commentMatch) {
        const comment = store.createComment(decodeURIComponent(commentMatch[1]), payload);
        sendJson(response, 201, {
          id: comment.id,
          articleSlug: comment.articleSlug,
          status: comment.status
        });
        return;
      }

      sendJson(response, 404, { error: "Not found." });
    } catch (error) {
      const statusCode = error instanceof ValidationError ? 422 : error.statusCode || 500;
      sendJson(response, statusCode, {
        error: statusCode === 500 ? "Internal server error." : error.message
      });
    }
  });
}

if (require.main === module) {
  const port = Number(process.env.PORT || 8787);
  const server = createApiServer();
  server.listen(port, "127.0.0.1", () => {
    process.stdout.write(`Babas & Brasse API listening at http://127.0.0.1:${port}\n`);
  });
}

module.exports = {
  createApiServer,
  readJson,
  requireAdmin,
  tokensMatch
};
