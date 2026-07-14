const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

const seed = {
  categories: [{ id: "essays", label: "Essays", slug: "essays" }],
  profiles: [{ id: "writer", type: "contributor", name: "Writer", role: "Author", slug: "writer", shortBio: "Writes essays." }],
  mediaItems: [{ id: "cover", title: "Cover", type: "image", url: "/media/cover.jpg", altText: "Cover", caption: "Cover image", credit: "Editorial" }],
  articles: [{ id: "first", title: "First", slug: "first", dek: "First essay", status: "published", categoryId: "essays", authorProfileId: "writer", publishedAt: "2026-07-01", featuredImage: { id: "cover", altText: "Cover" }, bodyBlocks: ["Body"], seo: { title: "First", description: "First essay" } }]
};

class FakePostgresPool {
  constructor() {
    this.data = null;
    this.queries = [];
  }

  async query(sql, params = []) {
    const normalized = String(sql).replace(/\s+/g, " ").trim();
    this.queries.push(normalized);
    if (/INSERT INTO publication_state/i.test(normalized) && this.data === null) this.data = JSON.parse(params.at(-1));
    if (/SELECT data FROM publication_state/i.test(normalized)) {
      return { rows: this.data === null ? [] : [{ data: structuredClone(this.data) }] };
    }
    if (/UPDATE publication_state/i.test(normalized)) this.data = JSON.parse(params[0]);
    return { rows: [] };
  }

  async connect() {
    return { query: this.query.bind(this), release() {} };
  }
}

test("production configuration requires PostgreSQL instead of a local JSON path", () => {
  const { validateProductionConfig } = require(path.join(root, "apps", "api", "productionConfig.js"));
  const credentials = {
    NODE_ENV: "production",
    BABAS_ADMIN_EMAIL: "admin@example.test",
    BABAS_ADMIN_PASSWORD_HASH: "scrypt$test-salt$test-hash"
  };
  assert.throws(() => validateProductionConfig(credentials), /DATABASE_URL/);
  const config = validateProductionConfig({ ...credentials, DATABASE_URL: "postgresql://app:secret@db.example.test/babas" });
  assert.equal(config.databaseUrl, "postgresql://app:secret@db.example.test/babas");
  assert.equal("dataPath" in config, false);
});

test("PostgreSQL publication store seeds, reads, and mutates one transactional state", async () => {
  const { PostgresSubmissionStore } = require(path.join(root, "apps", "api", "postgresSubmissionStore.js"));
  const pool = new FakePostgresPool();
  const store = new PostgresSubmissionStore({ pool, seed });
  await store.ready;
  assert.deepEqual((await store.listArticles({ publishedOnly: true })).map((item) => item.slug), ["first"]);
  await store.createContactSubmission({
    name: "Reader",
    email: "reader@example.test",
    subject: "Pitch",
    message: "A production editorial pitch."
  });
  assert.equal((await store.listContactSubmissions()).length, 1);
  assert.ok(pool.queries.some((query) => /^BEGIN$/i.test(query)));
  assert.ok(pool.queries.some((query) => /FOR UPDATE/i.test(query)));
  assert.ok(pool.queries.some((query) => /^COMMIT$/i.test(query)));
});

test("production store factory selects PostgreSQL while local development keeps JSON", () => {
  const source = read("apps/api/storeFactory.js");
  const env = read(".env.production.example");
  const migration = read("apps/api/migrations/001_publication_state.sql");
  const pkg = JSON.parse(read("package.json"));
  assert.match(source, /PostgresSubmissionStore/);
  assert.match(source, /environment\.NODE_ENV === "production"/);
  assert.match(env, /^DATABASE_URL=/m);
  assert.doesNotMatch(env, /^BABAS_API_DATA_PATH=/m);
  assert.match(migration, /CREATE TABLE IF NOT EXISTS publication_state/i);
  assert.equal(pkg.dependencies.pg.startsWith("^"), true);
  assert.match(pkg.scripts["db:migrate"], /migrate\.js/);
  assert.match(pkg.scripts["verify:production"], /production-managed-postgres\.test\.js/);
  assert.match(pkg.scripts["verify:production"], /production-startup-readiness\.test\.js/);
});

test("API awaits store reads and writes so both storage adapters preserve route contracts", () => {
  const server = read("apps/api/server.js");
  assert.match(server, /await store\.editorialSnapshot/);
  assert.match(server, /await store\.createContactSubmission/);
  assert.match(server, /await handleAdminRequest/);
  assert.match(server, /createPublicationStore/);
});
