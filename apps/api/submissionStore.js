const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 422;
  }
}

function cleanText(value, field, maxLength) {
  const text = String(value || "").trim();
  if (!text) {
    throw new ValidationError(`${field} is required.`);
  }
  if (text.length > maxLength) {
    throw new ValidationError(`${field} is too long.`);
  }
  return text;
}

function cleanEmail(value) {
  const email = String(value || "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    throw new ValidationError("A valid email address is required.");
  }
  return email;
}

function emptyData() {
  return {
    version: 1,
    newsletterSignups: [],
    contactSubmissions: [],
    comments: []
  };
}

class SubmissionStore {
  constructor(filePath) {
    this.filePath = path.resolve(filePath);
    this.data = this.read();
  }

  read() {
    if (!fs.existsSync(this.filePath)) {
      return emptyData();
    }

    const parsed = JSON.parse(fs.readFileSync(this.filePath, "utf8"));
    return {
      ...emptyData(),
      ...parsed,
      newsletterSignups: Array.isArray(parsed.newsletterSignups) ? parsed.newsletterSignups : [],
      contactSubmissions: Array.isArray(parsed.contactSubmissions) ? parsed.contactSubmissions : [],
      comments: Array.isArray(parsed.comments) ? parsed.comments : []
    };
  }

  persist() {
    const directory = path.dirname(this.filePath);
    fs.mkdirSync(directory, { recursive: true });
    const temporary = `${this.filePath}.${process.pid}.${Date.now()}.tmp`;
    fs.writeFileSync(temporary, JSON.stringify(this.data, null, 2) + "\n", { encoding: "utf8", mode: 0o600 });
    fs.renameSync(temporary, this.filePath);
  }

  createNewsletterSignup(payload) {
    const email = cleanEmail(payload?.email);
    const existing = this.data.newsletterSignups.find((item) => item.email === email);
    if (existing) {
      return { ...existing, duplicate: true };
    }

    const signup = {
      id: `newsletter-${crypto.randomUUID()}`,
      email,
      status: "pending-confirmation",
      createdAt: new Date().toISOString()
    };
    this.data.newsletterSignups.push(signup);
    this.persist();
    return signup;
  }

  createContactSubmission(payload) {
    const submission = {
      id: `contact-${crypto.randomUUID()}`,
      name: cleanText(payload?.name, "Name", 120),
      email: cleanEmail(payload?.email),
      subject: cleanText(payload?.subject, "Subject", 160),
      message: cleanText(payload?.message, "Message", 5000),
      status: "new",
      createdAt: new Date().toISOString()
    };
    this.data.contactSubmissions.push(submission);
    this.persist();
    return submission;
  }

  createComment(articleSlug, payload) {
    const comment = {
      id: `comment-${crypto.randomUUID()}`,
      articleSlug: cleanText(articleSlug, "Article", 180),
      name: cleanText(payload?.name, "Name", 120),
      body: cleanText(payload?.body, "Comment", 2000),
      status: "pending",
      createdAt: new Date().toISOString()
    };
    this.data.comments.push(comment);
    this.persist();
    return comment;
  }

  listContactSubmissions() {
    return this.data.contactSubmissions
      .slice()
      .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
      .map((item) => ({ ...item }));
  }

  listComments(status = "") {
    const normalizedStatus = String(status || "").trim().toLowerCase();
    return this.data.comments
      .filter((item) => !normalizedStatus || item.status === normalizedStatus)
      .slice()
      .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
      .map((item) => ({ ...item }));
  }

  updateContactStatus(id, status) {
    return this.updateStatus("contactSubmissions", id, status, ["new", "read", "archived"]);
  }

  updateCommentStatus(id, status) {
    return this.updateStatus("comments", id, status, ["pending", "approved", "rejected"]);
  }

  updateStatus(collection, id, status, allowedStatuses) {
    const normalizedStatus = String(status || "").trim().toLowerCase();
    if (!allowedStatuses.includes(normalizedStatus)) {
      throw new ValidationError("Status is not allowed.");
    }

    const item = this.data[collection].find((candidate) => candidate.id === id);
    if (!item) {
      const error = new Error("Record not found.");
      error.statusCode = 404;
      throw error;
    }

    item.status = normalizedStatus;
    item.updatedAt = new Date().toISOString();
    this.persist();
    return { ...item };
  }

  snapshot() {
    return JSON.parse(JSON.stringify(this.data));
  }
}

module.exports = {
  SubmissionStore,
  ValidationError,
  cleanEmail
};
