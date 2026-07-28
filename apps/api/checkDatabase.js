const { Pool } = require("pg");
const { loadEnvFile } = require("./env.js");

async function checkDatabase(environment = process.env) {
  loadEnvFile(undefined, environment);
  if (!environment.DATABASE_URL) throw new Error("DATABASE_URL is required.");
  const pool = new Pool({
    connectionString: environment.DATABASE_URL,
    ssl: environment.BABAS_DATABASE_SSL === "0"
      ? false
      : { rejectUnauthorized: environment.BABAS_DATABASE_SSL_REJECT_UNAUTHORIZED !== "0" }
  });
  try {
    await pool.query("SELECT 1 AS ready");
    process.stdout.write("Database connection ready: postgresql\n");
  } finally {
    await pool.end();
  }
}

if (require.main === module) {
  checkDatabase().catch((error) => {
    process.stderr.write(`Database check failed: ${error.message}\n`);
    process.exitCode = 1;
  });
}

module.exports = { checkDatabase };

