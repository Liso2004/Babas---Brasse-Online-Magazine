const fs = require("node:fs");
const path = require("node:path");
const { loadEnvFile } = require("./env.js");
const { PostgresSubmissionStore } = require("./postgresSubmissionStore.js");

loadEnvFile();

async function migrate(environment = process.env) {
  if (!environment.DATABASE_URL) throw new Error("DATABASE_URL is required.");
  const seedPath = path.join(__dirname, "data", "editorial-seed.json");
  const seed = fs.existsSync(seedPath) ? JSON.parse(fs.readFileSync(seedPath, "utf8")) : {};
  const store = new PostgresSubmissionStore({
    connectionString: environment.DATABASE_URL,
    seed,
    ssl: environment.BABAS_DATABASE_SSL !== "0",
    rejectUnauthorized: environment.BABAS_DATABASE_SSL_REJECT_UNAUTHORIZED !== "0"
  });
  try {
    await store.ready;
    process.stdout.write("PostgreSQL publication schema is ready.\n");
  } finally {
    await store.close();
  }
}

if (require.main === module) {
  migrate().catch((error) => {
    process.stderr.write(`Database migration failed: ${error.message}\n`);
    process.exitCode = 1;
  });
}

module.exports = { migrate };

