const defaultEndpoints = {
  newsletter: "/api/newsletter-signups",
  contact: "/api/contact-submissions"
};

export function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

export function validateEmail(value) {
  const email = normalizeEmail(value);
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function resolvePublicFormEndpoint(kind, payload = {}) {
  if (kind === "comment" || kind === "review") {
    const articleKey = payload.articleSlug || payload.articleId;
    if (!articleKey) {
      throw new Error("An article is required for comment or review submission.");
    }
    const collection = kind === "review" ? "reviews" : "comments";
    return `/api/articles/${encodeURIComponent(articleKey)}/${collection}`;
  }

  const endpoint = defaultEndpoints[kind];
  if (!endpoint) {
    throw new Error(`Unsupported public form: ${kind}`);
  }
  return endpoint;
}

export async function submitPublicForm(kind, payload, options = {}) {
  const fetchImpl = options.fetchImpl || globalThis.fetch;
  if (typeof fetchImpl !== "function") {
    throw new Error("Submission service is unavailable.");
  }

  const endpoint = options.endpoint || resolvePublicFormEndpoint(kind, payload);
  const response = await fetchImpl(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const contentType = response.headers?.get?.("content-type") || "";
  if (!response.ok) {
    throw new Error(`Submission failed with status ${response.status}.`);
  }

  if (response.status === 204) {
    return { status: "accepted" };
  }

  if (!contentType.toLowerCase().includes("application/json")) {
    throw new Error("Submission service is unavailable.");
  }

  return response.json();
}
