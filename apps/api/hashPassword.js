const { loadEnvFile } = require("./env.js");
const { createPasswordHash } = require("./adminAuth.js");

loadEnvFile();

const password = process.env.BABAS_ADMIN_PASSWORD_INPUT || "";
if (!password) {
  process.stderr.write("Set BABAS_ADMIN_PASSWORD_INPUT before generating a hash.\n");
  process.exitCode = 1;
} else {
  process.stdout.write(`${createPasswordHash(password)}\n`);
}

