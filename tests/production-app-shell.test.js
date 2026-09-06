const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");

const app = read("apps/web/src/App.jsx");
const publicLayout = read("apps/web/src/layouts/PublicLayout.jsx");
const checkout = read("apps/web/src/pages/CheckoutPage.jsx");
const server = read("apps/api/server.js");

assert.match(app, /<BrowserRouter>/, "AppShell should provide browser routing");
assert.match(app, /fetch\("\/api\/content"/, "AppShell should request live editorial content");
assert.match(app, /setFixtures\(launchFixtures\)/, "AppShell should retain a local content fallback");
assert.doesNotMatch(publicLayout, /urban-profile-link/, "Profile should not be exposed in the public navigation");
assert.match(checkout, /fetch\("\/api\/orders"/, "Checkout should submit an order");
assert.match(server, /url\.pathname === "\/api\/orders"/, "API should expose the order endpoint");

console.log("Production app shell contract passed.");