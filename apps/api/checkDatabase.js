const fs = require("node:fs");
const path = require("node:path");
const { loadEnvFile } = require("./env.js");
const { createPublicationStore } = require("./storeFactory.js");

async function checkDatabase(environment = process.env) {
  loadEnvFile(undefined, environment);
  if (!environment.DATABASE_URL) throw new Error("DATABASE_URL is required.");
  const seedPath = path.join(__dirname, "data", "editorial-seed.json");
  const seed = fs.existsSync(seedPath) ? JSON.parse(fs.readFileSync(seedPath, "utf8")) : {};
  const store = createPublicationStore({
    environment: { ...environment, NODE_ENV: "production" },
    seed
  });
  try {
    await store.ready;
    const health = await store.healthCheck();
    process.stdout.write(`Database ready: ${health.storage}\n`);
  } finally {
    await store.close();
  }
}

if (require.main === module) {
  checkDatabase().catch((error) => {
    process.stderr.write(`Database check failed: ${error.message}\n`);
    process.exitCode = 1;
  });
}

module.exports = { checkDatabase };

