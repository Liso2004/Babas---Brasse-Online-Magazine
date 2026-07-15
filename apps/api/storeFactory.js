const path = require("node:path");
const { SubmissionStore } = require("./submissionStore.js");
const { PostgresSubmissionStore } = require("./postgresSubmissionStore.js");

function createPublicationStore(options = {}) {
  const environment = options.environment || process.env;
  const seed = options.seed || {};
  if (environment.NODE_ENV === "production") {
    return new PostgresSubmissionStore({
      connectionString: environment.DATABASE_URL,
      seed,
      ssl: environment.BABAS_DATABASE_SSL !== "0",
      rejectUnauthorized: environment.BABAS_DATABASE_SSL_REJECT_UNAUTHORIZED !== "0",
      pool: options.pool
    });
  }

  const dataPath = options.dataPath || environment.BABAS_API_DATA_PATH || path.join(__dirname, "data", "submissions.json");
  return new SubmissionStore(dataPath, { seed });
}

module.exports = { createPublicationStore };

