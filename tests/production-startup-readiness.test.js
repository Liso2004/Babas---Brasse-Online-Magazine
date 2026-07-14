const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

test("production process waits for managed storage before opening the listener", () => {
  const server = fs.readFileSync(path.join(root, "apps", "api", "server.js"), "utf8");
  assert.match(server, /server\.storeReady\.then\(\(\) => \{/);
  assert.match(server, /failed to start/);
  assert.match(server, /process\.exitCode = 1/);
});
