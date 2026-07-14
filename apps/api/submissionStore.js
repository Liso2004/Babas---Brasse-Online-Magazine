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

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function cleanText(value, field, maxLength) {
  const text = String(value || "").trim();
  if (!text) throw new ValidationError(`${field} is required.`);
  if (text.length > maxLength) throw new ValidationError(`${field} is too long.`);
  return text;
}

function cleanOptionalText(value, maxLength) {
  const text = String(value || "").trim();
  if (text.length > maxLength) throw new ValidationError("Field is too long.");
  return text;
}

function cleanEmail(value) {
  const email = String(value || "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    throw new ValidationError("A valid email address is required.");
  }
  return email;
}

function cleanSlug(value, field = "Slug") {
  const slug = cleanText(value, field, 180).toLowerCase();
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new ValidationError(`${field} must use lowercase letters, numbers, and hyphens.`);
  }
  return slug;
}

function collection(seed, key) {
  return Array.isArray(seed?.[key]) ? clone(seed[key]) : [];
}

function emptyData(seed = {}) {
  return {
    version: 2,
    newsletterSignups: collection(seed, "newsletterSignups"),
    contactSubmissions: collection(seed, "contactSubmissions"),
    comments: collection(seed, "comments"),
    categories: collection(seed, "categories"),
    articles: collection(seed, "articles"),
    profiles: collection(seed, "profiles"),
    mediaItems: collection(seed, "mediaItems"),
    reviews: collection(seed, "reviews")
  };
}

function normalizeStatus(value, allowed, fallback) {
  const status = String(value || fallback).trim().toLowerCase();
  if (!allowed.includes(status)) throw new ValidationError("Status is not allowed.");
  return status;
}

function cleanSocialLinks(value, fallback = []) {
  if (!Array.isArray(value)) return clone(fallback);
  return value.map((link) => {
    const label = cleanText(link?.label, "Social link label", 120);
    const url = cleanText(link?.url, "Social link URL", 1000);
    if (!/^(?:\/|https?:\/\/|mailto:)/i.test(url)) throw new ValidationError("Social link URL must be internal, HTTP, HTTPS, or email.");
    return { label, url };
  });
}

function normalizeListOptions(options = {}) {
  return typeof options === "string" ? { status: options } : (options || {});
}

function includesQuery(item, query, fields) {
  const normalized = String(query || "").trim().toLowerCase();
  return !normalized || fields.some((field) => String(item[field] || "").toLowerCase().includes(normalized));
}

class SubmissionStore {
  constructor(filePath, options = {}) {
    this.memory = options.memory === true;
    this.filePath = this.memory ? "" : path.resolve(filePath);
    if (this.memory) {
      this.data = emptyData(options.seed);
      return;
    }
    const existed = fs.existsSync(this.filePath);
    this.data = this.read(options.seed);
    if ((!existed && options.seed) || this.needsMigration) this.persist();
  }

  read(seed) {
    if (!fs.existsSync(this.filePath)) return emptyData(seed);
    const parsed = JSON.parse(fs.readFileSync(this.filePath, "utf8"));
    const needsMigration = Number(parsed.version || 1) < 2;
    this.needsMigration = needsMigration;
    const defaults = emptyData(needsMigration ? seed : {});
    return Object.fromEntries(Object.entries({ ...defaults, ...parsed }).map(([key, value]) => {
      if (Array.isArray(defaults[key])) return [key, Array.isArray(value) ? value : []];
      return [key, key === "version" ? 2 : value];
    }));
  }

  persist() {
    if (this.memory) return;
    const directory = path.dirname(this.filePath);
    fs.mkdirSync(directory, { recursive: true });
    const temporary = `${this.filePath}.${process.pid}.${Date.now()}.tmp`;
    fs.writeFileSync(temporary, JSON.stringify(this.data, null, 2) + "\n", { encoding: "utf8", mode: 0o600 });
    fs.renameSync(temporary, this.filePath);
  }

  createNewsletterSignup(payload) {
    const email = cleanEmail(payload?.email);
    const existing = this.data.newsletterSignups.find((item) => item.email === email);
    if (existing) return { ...existing, duplicate: true };
    const signup = { id: `newsletter-${crypto.randomUUID()}`, email, status: "pending-confirmation", createdAt: new Date().toISOString() };
    this.data.newsletterSignups.push(signup);
    this.persist();
    return { ...signup };
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
    return { ...submission };
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
    return { ...comment };
  }

  createReview(articleSlug, payload) {
    const rating = Number(payload?.rating);
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) throw new ValidationError("Rating must be between 1 and 5.");
    const review = {
      id: `review-${crypto.randomUUID()}`,
      articleId: cleanText(articleSlug, "Article", 180),
      name: cleanText(payload?.name, "Name", 120),
      rating,
      body: cleanText(payload?.body, "Review", 2000),
      status: "pending",
      createdAt: new Date().toISOString()
    };
    this.data.reviews.push(review);
    this.persist();
    return { ...review };
  }

  listContactSubmissions(options = {}) {
    const filters = normalizeListOptions(options);
    const status = String(filters.status || "").trim().toLowerCase();
    return this.data.contactSubmissions
      .filter((item) => (!status || item.status === status) && includesQuery(item, filters.query, ["name", "email", "subject", "message"]))
      .slice().sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || ""))).map(clone);
  }

  listComments(options = "") {
    const filters = normalizeListOptions(options);
    const status = String(filters.status || "").trim().toLowerCase();
    const article = String(filters.article || "").trim();
    return this.data.comments
      .filter((item) => (!status || item.status === status)
        && (!article || item.articleSlug === article)
        && includesQuery(item, filters.query, ["name", "body", "articleSlug"]))
      .slice().sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || ""))).map(clone);
  }

  listArticles(options = {}) {
    const items = options.publishedOnly ? this.data.articles.filter((item) => item.status === "published") : this.data.articles;
    return items.slice().sort((a, b) => String(b.publishedAt || b.updatedAt || "").localeCompare(String(a.publishedAt || a.updatedAt || ""))).map(clone);
  }

  listProfiles() {
    return this.data.profiles.slice().sort((a, b) => a.name.localeCompare(b.name)).map(clone);
  }

  listMediaItems() {
    return this.data.mediaItems.slice().sort((a, b) => a.title.localeCompare(b.title)).map(clone);
  }

  listReviews(options = "") {
    const filters = normalizeListOptions(options);
    const status = String(filters.status || "").trim().toLowerCase();
    const article = String(filters.article || "").trim();
    const rating = String(filters.rating || "").trim();
    return this.data.reviews
      .filter((item) => (!status || item.status === status)
        && (!article || item.articleId === article)
        && (!rating || String(item.rating) === rating)
        && includesQuery(item, filters.query, ["name", "body", "articleId"]))
      .slice().sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || ""))).map(clone);
  }

  editorialSnapshot(options = {}) {
    return {
      categories: clone(this.data.categories),
      articles: this.listArticles(options),
      profiles: this.listProfiles(),
      mediaItems: this.listMediaItems(),
      reviews: this.listReviews(options.reviewStatus || "")
    };
  }

  saveArticle(payload) {
    const existing = this.data.articles.find((item) => item.id === payload?.id || item.slug === payload?.slug);
    const id = cleanSlug(payload?.id || payload?.slug, "Article ID");
    const slug = cleanSlug(payload?.slug, "Slug");
    const status = normalizeStatus(payload?.status, ["draft", "published"], "draft");
    const media = this.data.mediaItems.find((item) => item.id === payload?.featuredImageId);
    const featuredImage = payload?.featuredImage || media || existing?.featuredImage || null;
    if (!featuredImage?.id) throw new ValidationError("Featured image is required.");
    const bodyBlocks = Array.isArray(payload?.bodyBlocks)
      ? payload.bodyBlocks.map((block) => cleanText(block, "Body", 20000))
      : cleanText(payload?.body, "Body", 100000).split(/\n\s*\n/).filter(Boolean);
    const incomingSeo = payload?.seo || {};
    const seo = {
      title: cleanText(incomingSeo.title || payload?.seoTitle, "SEO title", 180),
      description: cleanText(incomingSeo.description || payload?.seoDescription, "SEO description", 320),
      ogTitle: cleanOptionalText(incomingSeo.ogTitle || payload?.ogTitle, 180),
      ogDescription: cleanOptionalText(incomingSeo.ogDescription || payload?.ogDescription, 320)
    };
    const now = new Date().toISOString();
    const article = {
      id,
      title: cleanText(payload?.title, "Title", 240),
      slug,
      dek: cleanText(payload?.dek, "Dek", 600),
      status,
      categoryId: cleanText(payload?.categoryId, "Category", 120),
      authorProfileId: cleanText(payload?.authorProfileId, "Author", 180),
      publishedAt: status === "published" ? (payload?.publishedAt || existing?.publishedAt || now.slice(0, 10)) : null,
      featuredImage: { ...clone(featuredImage), altText: cleanText(payload?.altText || featuredImage.altText, "Image alt text", 500) },
      bodyBlocks,
      seo,
      createdAt: existing?.createdAt || now,
      updatedAt: now
    };
    const duplicateSlug = this.data.articles.find((item) => item.slug === slug && item.id !== id);
    if (duplicateSlug) throw new ValidationError("Slug is already in use.");
    const index = this.data.articles.findIndex((item) => item.id === id);
    if (index >= 0) this.data.articles[index] = article;
    else this.data.articles.push(article);
    this.persist();
    return clone(article);
  }

  saveProfile(payload) {
    const existing = this.data.profiles.find((item) => item.id === payload?.id || item.slug === payload?.slug);
    const id = cleanSlug(payload?.id || payload?.slug, "Profile ID");
    const profile = {
      id,
      type: normalizeStatus(payload?.type, ["contributor", "creative_team"], "contributor"),
      name: cleanText(payload?.name, "Name", 160),
      role: cleanText(payload?.role, "Role", 160),
      slug: cleanSlug(payload?.slug, "Slug"),
      shortBio: cleanText(payload?.shortBio, "Biography", 1200),
      fullBio: cleanOptionalText(payload?.fullBio || payload?.shortBio, 6000),
      socialLinks: cleanSocialLinks(payload?.socialLinks, existing?.socialLinks || []),
      updatedAt: new Date().toISOString()
    };
    const index = this.data.profiles.findIndex((item) => item.id === id);
    if (index >= 0) this.data.profiles[index] = profile;
    else this.data.profiles.push(profile);
    this.persist();
    return clone(profile);
  }

  saveMediaItem(payload) {
    const id = cleanSlug(payload?.id || payload?.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""), "Media ID");
    const item = {
      id,
      title: cleanText(payload?.title, "Title", 240),
      type: normalizeStatus(payload?.type, ["image", "video", "audio"], "image"),
      url: cleanText(payload?.url, "Media URL", 1000),
      altText: cleanText(payload?.altText, "Alt text", 500),
      caption: cleanText(payload?.caption, "Caption", 1000),
      credit: cleanText(payload?.credit, "Credit", 500),
      categoryId: cleanOptionalText(payload?.categoryId, 120),
      updatedAt: new Date().toISOString()
    };
    const index = this.data.mediaItems.findIndex((candidate) => candidate.id === id);
    if (index >= 0) this.data.mediaItems[index] = item;
    else this.data.mediaItems.push(item);
    this.persist();
    return clone(item);
  }

  deleteRecord(collectionName, id) {
    const index = this.data[collectionName].findIndex((candidate) => candidate.id === id);
    if (index < 0) return this.notFound();
    const [deleted] = this.data[collectionName].splice(index, 1);
    this.persist();
    return clone(deleted);
  }

  deleteArticle(id) {
    return this.deleteRecord("articles", id);
  }

  deleteProfile(id) {
    if (this.data.articles.some((article) => article.authorProfileId === id)) {
      throw new ValidationError("Profiles attached to an article or published work cannot be deleted.");
    }
    return this.deleteRecord("profiles", id);
  }

  deleteMediaItem(id) {
    if (this.data.articles.some((article) => article.featuredImage?.id === id)) {
      throw new ValidationError("Media attached to an article cannot be deleted.");
    }
    return this.deleteRecord("mediaItems", id);
  }

  deleteComment(id) {
    return this.deleteRecord("comments", id);
  }

  deleteReview(id) {
    return this.deleteRecord("reviews", id);
  }

  updateContactStatus(id, status) {
    return this.updateStatus("contactSubmissions", id, status, ["new", "read", "archived"]);
  }

  updateCommentStatus(id, status) {
    return this.updateStatus("comments", id, status, ["pending", "approved", "rejected"]);
  }

  updateReviewStatus(id, status) {
    return this.updateStatus("reviews", id, status, ["pending", "approved", "rejected"]);
  }

  updateArticleStatus(id, status) {
    const item = this.data.articles.find((candidate) => candidate.id === id);
    if (!item) return this.notFound();
    item.status = normalizeStatus(status, ["draft", "published"], "draft");
    item.publishedAt = item.status === "published" ? (item.publishedAt || new Date().toISOString().slice(0, 10)) : null;
    item.updatedAt = new Date().toISOString();
    this.persist();
    return clone(item);
  }

  updateStatus(collectionName, id, status, allowedStatuses) {
    const normalized = normalizeStatus(status, allowedStatuses, allowedStatuses[0]);
    const item = this.data[collectionName].find((candidate) => candidate.id === id);
    if (!item) return this.notFound();
    item.status = normalized;
    item.updatedAt = new Date().toISOString();
    this.persist();
    return clone(item);
  }

  notFound() {
    const error = new Error("Record not found.");
    error.statusCode = 404;
    throw error;
  }

  snapshot() {
    return clone(this.data);
  }
}

module.exports = {
  SubmissionStore,
  ValidationError,
  cleanEmail
};
