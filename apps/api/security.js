const crypto = require("node:crypto");

function positiveInteger(value, fallback) {
  const parsed = Number.parseInt(String(value ?? ""), 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

class FixedWindowRateLimiter {
  constructor(options = {}) {
    this.limit = positiveInteger(options.limit, 10);
    this.windowMs = positiveInteger(options.windowMs, 15 * 60 * 1000);
    this.now = options.now || Date.now;
    this.entries = new Map();
  }

  consume(key) {
    const now = this.now();
    let entry = this.entries.get(key);
    if (!entry || entry.resetAt <= now) {
      entry = { count: 0, resetAt: now + this.windowMs };
    }

    entry.count += 1;
    this.entries.set(key, entry);
    const allowed = entry.count <= this.limit;
    const remaining = Math.max(0, this.limit - entry.count);
    const retryAfterSeconds = Math.max(1, Math.ceil((entry.resetAt - now) / 1000));

    if (this.entries.size > 10_000) this.prune(now);
    return { allowed, limit: this.limit, remaining, resetAt: entry.resetAt, retryAfterSeconds };
  }

  prune(now = this.now()) {
    for (const [key, entry] of this.entries) {
      if (entry.resetAt <= now) this.entries.delete(key);
    }
  }
}

function clientAddress(request, trustProxy = false) {
  if (trustProxy) {
    const forwarded = String(request.headers["x-forwarded-for"] || "").split(",")[0].trim();
    if (forwarded) return forwarded;
  }
  return request.socket?.remoteAddress || "unknown";
}

function clientKey(request, scope, trustProxy = false) {
  const digest = crypto.createHash("sha256").update(clientAddress(request, trustProxy)).digest("base64url").slice(0, 18);
  return `${scope}:${digest}`;
}

function applyRateLimitHeaders(response, result) {
  response.setHeader("RateLimit-Limit", String(result.limit));
  response.setHeader("RateLimit-Remaining", String(result.remaining));
  response.setHeader("RateLimit-Reset", String(Math.ceil(result.resetAt / 1000)));
  if (!result.allowed) response.setHeader("Retry-After", String(result.retryAfterSeconds));
}

function createSecurityLogger(options = {}) {
  const write = options.write || ((line) => process.stdout.write(line));
  const now = options.now || (() => new Date().toISOString());
  return (event) => {
    const record = {
      timestamp: now(),
      level: event.level || "info",
      event: event.event,
      requestId: event.requestId,
      method: event.method,
      path: event.path,
      status: event.status
    };
    write(`${JSON.stringify(Object.fromEntries(Object.entries(record).filter(([, value]) => value !== undefined)))}\n`);
  };
}

module.exports = {
  FixedWindowRateLimiter,
  applyRateLimitHeaders,
  clientKey,
  createSecurityLogger,
  positiveInteger
};
