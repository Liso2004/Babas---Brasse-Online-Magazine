const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");

const app = read("apps/web/src/App.jsx");
const publicLayout = read("apps/web/src/layouts/PublicLayout.jsx");
const checkout = read("apps/web/src/pages/CheckoutPage.jsx");
const server = read("apps/api/server.js");
const moodboardItems = read("apps/web/src/data/moodboardItems.js");
const homeRouteModel = read("apps/web/src/pages/homeRouteModel.js");
const homePage = read("apps/web/src/pages/HomePage.jsx");
const moodboardPage = read("apps/web/src/pages/MoodboardPage.jsx");
const shopPage = read("apps/web/src/pages/ShopPage.jsx");
const productDetail = read("apps/web/src/pages/ProductDetailPage.jsx");
const profileDetail = read("apps/web/src/pages/ProfileDetailPage.jsx");
const routeMetadata = read("apps/web/src/seo/RouteMetadata.jsx");

assert.match(app, /<BrowserRouter>/, "AppShell should provide browser routing");
assert.match(app, /fetch\("\/api\/content"/, "AppShell should request live editorial content");
assert.match(app, /setFixtures\(launchFixtures\)/, "AppShell should retain a local content fallback");
assert.match(app, /mergePublicationContent/, "AppShell should validate merged live publication content");
assert.doesNotMatch(publicLayout, /urban-profile-link/, "Profile should not be exposed in the public navigation");
assert.match(checkout, /fetch\("\/api\/orders"/, "Checkout should submit an order");
assert.match(server, /url\.pathname === "\/api\/orders"/, "API should expose the order endpoint");


assert.match(moodboardItems, /issue: "004"/, "Moodboard records should remain Issue 004 archive items");
assert.match(moodboardItems, /ua-night-uniform/, "Full Frames visual research should have a canonical archive record");
assert.match(moodboardItems, /\/media\/moodboard\//, "Archive images should use canonical moodboard media paths");
assert.match(homeRouteModel, /filter\(\(item\) => item\.issue === "004"\)/, "Home Source Archive should derive from Issue 004 archive data");
assert.match(homeRouteModel, /\.slice\(0, 8\)/, "Home Source Archive should use an explicit eight-item preview");
assert.doesNotMatch(homeRouteModel, /seenSubjects/, "Home Source Archive must not discard records through subject deduplication");
assert.match(homePage, /UrbanMoodboardGrid/, "Home Source Archive should use the canonical archive grid");
assert.match(moodboardPage, /UrbanMoodboardGrid/, "Moodboard page should use the canonical archive grid");
assert.match(homePage, /\/moodboard/, "Home archive cards must navigate to specimen detail routes");
assert.match(shopPage, /fixtures\.products/, "Shop should consume the canonical product collection");
assert.match(productDetail, /fixtures\.products/, "Product detail must not use editorial articles as products");
assert.match(profileDetail, /profile-detail-v5/, "All profile routes should use the shared publication profile layout");
assert.doesNotMatch(profileDetail, /urban-profile-dossier/, "Profile routes should not render a second dossier application shell");
assert.match(routeMetadata, /application\/ld\+json/, "Routes should emit structured data for search discovery");
assert.match(routeMetadata, /"@type": "Product"/, "Product routes should emit Product structured data");
assert.match(read("apps/web/package.json"), /generate-sitemap/, "Build should regenerate the sitemap");
assert.match(read("apps/web/scripts/generate-sitemap.mjs"), /moodboardPaths/, "Sitemap should cover moodboard specimens");
console.log("Production app shell contract passed.");
