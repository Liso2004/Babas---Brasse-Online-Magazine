const crypto = require("node:crypto");

const COOKIE_NAME = "bb_admin_session";
const SESSION_SECONDS = 8 * 60 * 60;

function safeEqual(left, right) {
  const a = Buffer.from(String(left || ""));
  const b = Buffer.from(String(right || ""));
  return a.length > 0 && a.length === b.length && crypto.timingSafeEqual(a, b);
}

function cookies(request) {
  return Object.fromEntries(String(request.headers.cookie || "").split(";").map(part => part.trim()).filter(Boolean).map(part => {
    const index = part.indexOf("=");
    return [decodeURIComponent(part.slice(0, index)), decodeURIComponent(part.slice(index + 1))];
  }));
}

class AdminAuth {
  constructor(options = {}) {
    this.email = String(options.email || "").trim().toLowerCase();
    this.password = String(options.password || "");
    this.bearerToken = String(options.bearerToken || "");
    this.sessions = new Map();
  }

  get configured() {
    return Boolean(this.bearerToken || (this.email && this.password));
  }

  login(email, password) {
    if (!this.email || !this.password) return null;
    if (!safeEqual(String(email || "").trim().toLowerCase(), this.email) || !safeEqual(password, this.password)) return null;
    const token = crypto.randomBytes(32).toString("base64url");
    this.sessions.set(token, Date.now() + SESSION_SECONDS * 1000);
    return { token, role: "admin" };
  }

  authenticateRequest(request) {
    const authorization = request.headers.authorization || "";
    if (this.bearerToken && authorization.startsWith("Bearer ") && safeEqual(authorization.slice(7), this.bearerToken)) {
      return { role: "admin", method: "bearer" };
    }
    const token = cookies(request)[COOKIE_NAME];
    const expiresAt = token ? this.sessions.get(token) : 0;
    if (!expiresAt || expiresAt <= Date.now()) {
      if (token) this.sessions.delete(token);
      return null;
    }
    return { role: "admin", method: "session", token };
  }

  logout(request) {
    const token = cookies(request)[COOKIE_NAME];
    if (token) this.sessions.delete(token);
  }

  sessionCookie(token, secure = false) {
    return `${COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${SESSION_SECONDS}${secure ? "; Secure" : ""}`;
  }

  clearCookie(secure = false) {
    return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${secure ? "; Secure" : ""}`;
  }
}

module.exports = { AdminAuth, safeEqual, COOKIE_NAME };
