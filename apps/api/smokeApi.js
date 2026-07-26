const { createApiServer } = require("./server.js");
const { SubmissionStore } = require("./submissionStore.js");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function request(baseUrl, pathname, options = {}) {
  const response = await fetch(`${baseUrl}${pathname}`, options);
  const payload = await response.json();
  return { response, payload };
}

async function smokeApi() {
  const store = new SubmissionStore(null, {
    memory: true,
    seed: {
      categories: [{ id: "essays", slug: "essays", label: "Essays" }],
      articles: [{ id: "article-1", slug: "handoff-check", title: "Handoff Check", status: "published" }]
    }
  });
  const server = createApiServer({
    store,
    environment: { NODE_ENV: "test" },
    adminEmail: "editor@example.com",
    adminPassword: "handoff-password"
  });

  await server.storeReady;
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });

  const address = server.address();
  const baseUrl = `http://127.0.0.1:${address.port}`;

  try {
    const health = await request(baseUrl, "/api/health");
    assert(health.response.status === 200 && health.payload.status === "ok", "Health check failed.");

    const content = await request(baseUrl, "/api/content");
    assert(content.response.status === 200, "Content endpoint failed.");
    assert(content.payload.articles?.some((article) => article.slug === "handoff-check"), "Published content is missing.");

    const invalidContact = await request(baseUrl, "/api/contact-submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Reader", email: "invalid", subject: "Hello", message: "Test" })
    });
    assert(invalidContact.response.status === 422, "Invalid contact submission was not rejected.");

    const contact = await request(baseUrl, "/api/contact-submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Reader",
        email: "reader@example.com",
        subject: "Editorial enquiry",
        message: "Checking the handoff workflow."
      })
    });
    assert(contact.response.status === 201 && contact.payload.status === "new", "Contact submission failed.");

    const login = await request(baseUrl, "/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "editor@example.com", password: "handoff-password" })
    });
    const cookie = login.response.headers.get("set-cookie");
    assert(login.response.status === 200 && cookie, "Admin login failed.");

    const inbox = await request(baseUrl, "/api/admin/contact-submissions", {
      headers: { Cookie: cookie }
    });
    assert(inbox.response.status === 200, "Admin contact inbox failed.");
    assert(inbox.payload.items?.some((item) => item.id === contact.payload.id), "Stored contact submission is missing from admin inbox.");

    process.stdout.write("API handoff smoke passed.\n");
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

if (require.main === module) {
  smokeApi().catch((error) => {
    process.stderr.write(`API handoff smoke failed: ${error.message}\n`);
    process.exitCode = 1;
  });
}

module.exports = { smokeApi };
