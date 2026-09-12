import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import * as fixtures from "../src/data/launchFixtures.js";

const siteUrl = (process.env.VITE_PUBLIC_SITE_URL || "https://urbananarchy.co.za").replace(/\/$/, "");
const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(scriptDirectory, "../public/sitemap.xml");

const staticPaths = [
  "/", "/about", "/creative-team", "/contributors", "/visceral-mag", "/moodboard", "/featured", "/shop", "/contact"
];
const publishedArticlePaths = fixtures.articles
  .filter((article) => article.status === "published")
  .map((article) => `/visceral-mag/${encodeURIComponent(article.slug)}`);
const moodboardPaths = fixtures.moodboardItems.map((item) => `/moodboard/${encodeURIComponent(item.slug)}`);
const profilePaths = fixtures.profiles.map((profile) => `/people/${encodeURIComponent(profile.slug)}`);
const productPaths = fixtures.products.map((product) => `/shop/${encodeURIComponent(product.slug)}`);
const paths = [...new Set([...staticPaths, ...publishedArticlePaths, ...moodboardPaths, ...profilePaths, ...productPaths])];

const escapeXml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&apos;");

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...paths.map((path) => `  <url><loc>${escapeXml(`${siteUrl}${path}`)}</loc></url>`),
  "</urlset>",
  ""
].join("\n");

writeFileSync(outputPath, sitemap, "utf8");
console.log(`Generated sitemap with ${paths.length} URLs.`);
