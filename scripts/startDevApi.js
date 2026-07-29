process.env.NODE_ENV = "development";
process.env.BABAS_WEB_DIST_PATH = "";

const { createApiServer } = require("../apps/api/server.js");

const port = Number(process.env.PORT || 8787);
const host = process.env.HOST || "127.0.0.1";
const server = createApiServer();

server.storeReady.then(() => {
  server.listen(port, host, () => {
    process.stdout.write(`Babas & Brasse development API listening at http://${host}:${port}\n`);
  });
}).catch((error) => {
  process.stderr.write(`Babas & Brasse development API failed to start: ${error.message}\n`);
  process.exitCode = 1;
});
