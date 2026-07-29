const fs = require("node:fs");
const path = require("node:path");
const { loadEnvFile } = require("../apps/api/env.js");

const root = path.resolve(__dirname, "..");
const environment = { ...process.env };
loadEnvFile(path.join(root, ".env"), environment);

const issues = [];
const notes = [];
const nodeMajor = Number(process.versions.node.split(".")[0]);

if (nodeMajor < 20 || nodeMajor >= 25) {
  issues.push(`Node ${process.versions.node} is outside the supported range (20.19 through 24.x).`);
}

if (!fs.existsSync(path.join(root, "node_modules"))) {
  issues.push("Root dependencies are missing. Run: npm install");
}

if (!fs.existsSync(path.join(root, "apps", "web", "node_modules"))) {
  issues.push("Frontend dependencies are missing. Run: npm --prefix apps/web install");
}

if (environment.NODE_ENV === "production") {
  notes.push("NODE_ENV is production. The dev:api script now overrides this safely for local development.");
}

if (environment.BABAS_WEB_DIST_PATH) {
  const configuredPath = path.resolve(environment.BABAS_WEB_DIST_PATH);
  if (!fs.existsSync(path.join(configuredPath, "index.html"))) {
    notes.push("BABAS_WEB_DIST_PATH does not contain index.html. Remove it locally or rebuild that target.");
  }
}

if (!fs.existsSync(path.join(root, ".env"))) {
  notes.push("No .env file exists. Public development works without it; copy .env.development.example to .env for local admin login.");
}

process.stdout.write("Babas & Brasse local setup check\n");
for (const note of notes) process.stdout.write(`NOTE: ${note}\n`);
for (const issue of issues) process.stdout.write(`ERROR: ${issue}\n`);

if (issues.length) process.exitCode = 1;
else process.stdout.write("OK: This clone is ready for local development.\n");
