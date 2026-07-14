import { existsSync, mkdirSync, rmSync } from "node:fs";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";

const baseUrl = (process.env.WEB_BASE_URL || "http://127.0.0.1:5173").replace(/\/$/, "");
const outputDir = resolve("browser-qa", "figma-viewport-matrix");

const routes = [
  { id: "home", path: "/" },
  { id: "visceral-mag", path: "/visceral-mag" },
  { id: "article-detail", path: "/visceral-mag/send-a-text-before-you-knock" },
  { id: "profile-detail", path: "/people/visceral-contributor" },
  { id: "search", path: "/search" },
  { id: "featured", path: "/featured" },
  { id: "contact", path: "/contact" },
  { id: "admin-dashboard", path: "/admin" }
];

const viewports = [
  { id: "desktop", width: 1440, height: 1200 },
  { id: "mobile", width: 390, height: 1200 }
];

function browserCandidates() {
  return [
    process.env.CHROME_BIN,
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    join(process.env.LOCALAPPDATA || "", "Google", "Chrome", "Application", "chrome.exe"),
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
  ].filter(Boolean);
}

function findBrowser() {
  const found = browserCandidates().find((candidate) => existsSync(candidate));
  if (!found) {
    throw new Error("No Chrome or Edge executable found. Set CHROME_BIN to a Chromium-compatible browser.");
  }
  return found;
}

function capture(browser, route, viewport) {
  const url = `${baseUrl}${route.path}`;
  const file = join(outputDir, `${route.id}-${viewport.id}.png`);
  const profileDir = join(tmpdir(), `babas-brasse-screenshot-${route.id}-${viewport.id}-${Date.now()}`);
  const args = [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--no-first-run",
    "--no-default-browser-check",
    `--user-data-dir=${profileDir}`,
    `--window-size=${viewport.width},${viewport.height}`,
    "--virtual-time-budget=2500",
    `--screenshot=${file}`,
    url
  ];

  const result = spawnSync(browser, args, { encoding: "utf8" });

  try {
    rmSync(profileDir, { recursive: true, force: true });
  } catch {
    // Temporary browser profile cleanup is best-effort only.
  }

  if (result.status !== 0) {
    const detail = [result.stderr, result.stdout].filter(Boolean).join("\n").trim();
    throw new Error(`Screenshot failed for ${route.id} ${viewport.id}: ${detail || `exit ${result.status}`}`);
  }

  console.log(`CAPTURED ${route.id} ${viewport.id} ${file}`);
}

mkdirSync(outputDir, { recursive: true });
const browser = findBrowser();
console.log(`Using browser: ${browser}`);
console.log(`Capturing ${routes.length * viewports.length} screenshots from ${baseUrl}`);

for (const route of routes) {
  for (const viewport of viewports) {
    capture(browser, route, viewport);
  }
}