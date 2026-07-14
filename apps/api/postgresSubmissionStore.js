const fs = require("node:fs");
const path = require("node:path");
const { Pool } = require("pg");
const { SubmissionStore } = require("./submissionStore.js");

const ROW_ID = "primary";
const READ_METHODS = [
  "listContactSubmissions",
  "listComments",
  "listArticles",
  "listProfiles",
  "listMediaItems",
  "listReviews",
  "editorialSnapshot",
  "snapshot"
];
const MUTATION_METHODS = [
  "createNewsletterSignup",
  "createContactSubmission",
  "createComment",
  "createReview",
  "saveArticle",
  "saveProfile",
  "saveMediaItem",
  "deleteArticle",
  "deleteProfile",
  "deleteMediaItem",
  "deleteComment",
  "deleteReview",
  "updateContactStatus",
  "updateCommentStatus",
  "updateReviewStatus",
  "updateArticleStatus"
];

function migrationSql() {
  return fs.readFileSync(path.join(__dirname, "migrations", "001_publication_state.sql"), "utf8");
}

function modelFrom(data) {
  return new SubmissionStore(null, { memory: true, seed: data || {} });
}

class PostgresSubmissionStore {
  constructor(options = {}) {
    this.pool = options.pool || new Pool({
      connectionString: options.connectionString,
      ssl: options.ssl === false ? false : { rejectUnauthorized: options.rejectUnauthorized !== false }
    });
    this.ownsPool = !options.pool;
    this.seed = options.seed || {};
    this.ready = this.initialize();
  }

  async initialize() {
    await this.pool.query(migrationSql());
    const initial = modelFrom(this.seed).snapshot();
    await this.pool.query(
      `INSERT INTO publication_state (id, data, schema_version)
       VALUES ($1, $2::jsonb, 2)
       ON CONFLICT (id) DO NOTHING`,
      [ROW_ID, JSON.stringify(initial)]
    );
  }

  async read(method, args) {
    await this.ready;
    const result = await this.pool.query("SELECT data FROM publication_state WHERE id = $1", [ROW_ID]);
    if (!result.rows[0]) throw new Error("Publication state is not initialized.");
    return modelFrom(result.rows[0].data)[method](...args);
  }

  async mutate(method, args) {
    await this.ready;
    const client = await this.pool.connect();
    try {
      await client.query("BEGIN");
      const result = await client.query("SELECT data FROM publication_state WHERE id = $1 FOR UPDATE", [ROW_ID]);
      if (!result.rows[0]) throw new Error("Publication state is not initialized.");
      const model = modelFrom(result.rows[0].data);
      const value = model[method](...args);
      await client.query(
        `UPDATE publication_state
         SET data = $1::jsonb, schema_version = 2, updated_at = now()
         WHERE id = $2`,
        [JSON.stringify(model.snapshot()), ROW_ID]
      );
      await client.query("COMMIT");
      return value;
    } catch (error) {
      try {
        await client.query("ROLLBACK");
      } catch {
        // Preserve the original transaction error.
      }
      throw error;
    } finally {
      client.release();
    }
  }

  async healthCheck() {
    await this.ready;
    await this.pool.query("SELECT 1");
    return { storage: "postgresql" };
  }

  async close() {
    if (this.ownsPool) await this.pool.end();
  }
}

for (const method of READ_METHODS) {
  PostgresSubmissionStore.prototype[method] = function (...args) {
    return this.read(method, args);
  };
}

for (const method of MUTATION_METHODS) {
  PostgresSubmissionStore.prototype[method] = function (...args) {
    return this.mutate(method, args);
  };
}

module.exports = { PostgresSubmissionStore, migrationSql };

