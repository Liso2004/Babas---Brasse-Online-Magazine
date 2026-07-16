const fs = require("node:fs");
const path = require("node:path");

function parseEnvLine(line) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) return null;
  const separator = trimmed.indexOf("=");
  if (separator === -1) return null;
  const name = trimmed.slice(0, separator).trim();
  let value = trimmed.slice(separator + 1).trim();
  if (!name) return null;
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    value = value.slice(1, -1);
  }
  return [name, value];
}

function loadEnvFile(filePath = path.resolve(__dirname, "..", "..", ".env"), environment = process.env) {
  if (!fs.existsSync(filePath)) return false;
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const entry = parseEnvLine(line);
    if (!entry) continue;
    const [name, value] = entry;
    if (environment[name] === undefined) environment[name] = value;
  }
  return true;
}

module.exports = { loadEnvFile };
