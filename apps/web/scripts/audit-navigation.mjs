import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const workspaceRoot = resolve(scriptDir, "../../..");
const baseUrl = (process.env.WEB_BASE_URL || "http://127.0.0.1:5173").replace(/\/$/, "");
const outputFile = resolve(workspaceRoot, "docs", "design-reference", "babas-brasse", "navigation-audit.json");
const viewports = [
  { id: "desktop", width: 1440, height: 900 },
  { id: "tablet", width: 768, height: 1024 },
  { id: "mobile", width: 390, height: 844 }
];

function findBrowser() {
  const candidates = [
    process.env.CHROME_BIN,
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    join(process.env.LOCALAPPDATA || "", "Google", "Chrome", "Application", "chrome.exe"),
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe"
  ].filter(Boolean);
  const browser = candidates.find((candidate) => existsSync(candidate));
  if (!browser) throw new Error("No Chromium browser found. Set CHROME_BIN and retry.");
  return browser;
}

const wait = (milliseconds) => new Promise((resolvePromise) => setTimeout(resolvePromise, milliseconds));

async function debuggerUrl(port) {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const targets = await fetch(`http://127.0.0.1:${port}/json/list`).then((response) => response.json());
      const page = targets.find((target) => target.type === "page");
      if (page?.webSocketDebuggerUrl) return page.webSocketDebuggerUrl;
    } catch {
      // Chromium is still starting.
    }
    await wait(150);
  }
  throw new Error("Chromium debugging target did not become ready.");
}

async function connect(webSocketUrl) {
  const socket = new WebSocket(webSocketUrl);
  const pending = new Map();
  let nextId = 1;
  await new Promise((resolvePromise, reject) => {
    socket.addEventListener("open", resolvePromise, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    const request = pending.get(message.id);
    if (!request) return;
    pending.delete(message.id);
    if (message.error) request.reject(new Error(message.error.message));
    else request.resolve(message.result);
  });
  return {
    send(method, params = {}) {
      const id = nextId;
      nextId += 1;
      return new Promise((resolveRequest, reject) => {
        pending.set(id, { resolve: resolveRequest, reject });
        socket.send(JSON.stringify({ id, method, params }));
      });
    },
    close() { socket.close(); }
  };
}

async function evaluate(send, expression) {
  const result = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text || "Browser evaluation failed.");
  return result.result.value;
}

async function waitForPage(send) {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    if (await evaluate(send, "document.readyState") === "complete") break;
    await wait(100);
  }
  await wait(700);
}

const snapshotExpression = `(() => {
  const header = document.querySelector(".final-design-header");
  const nav = document.querySelector("#public-navigation");
  const panel = document.querySelector("#editorial-navigation-panel");
  const visible = (element) => element && getComputedStyle(element).display !== "none" && element.getBoundingClientRect().width > 0;
  const rect = (element) => {
    const box = element?.getBoundingClientRect();
    return box ? { x: Math.round(box.x), y: Math.round(box.y), width: Math.round(box.width), height: Math.round(box.height), right: Math.round(box.right), bottom: Math.round(box.bottom) } : null;
  };
  const overlaps = (elements) => elements.some((first, index) => elements.slice(index + 1).some((second) => {
    const a = first.getBoundingClientRect();
    const b = second.getBoundingClientRect();
    return Math.min(a.right, b.right) - Math.max(a.left, b.left) > 1 && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 1;
  }));
  const topLevelElements = [...header.querySelectorAll(":scope > .header-topline > *")].filter(visible);
  const navigationElements = [...nav.children].filter((element) => element !== panel && visible(element));
  const headerLinks = [...header.querySelectorAll("a")];
  const hrefs = headerLinks.map((link) => link.getAttribute("href"));
  const navigationHrefs = [...header.querySelectorAll("nav a")].map((link) => link.getAttribute("href"));
  return {
    viewport: { width: innerWidth, height: innerHeight },
    documentWidth: document.documentElement.scrollWidth,
    horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
    topLevelOverlap: overlaps(topLevelElements),
    navigationItemOverlap: overlaps(navigationElements),
    header: rect(header),
    nav: rect(nav),
    panel: rect(panel),
    panelVisible: visible(panel),
    mobileMenuOpen: nav?.dataset.mobileOpen === "true",
    searchCount: header.querySelectorAll('[role="search"]').length,
    sectionLinkCount: panel?.querySelectorAll("nav a").length || 0,
    currentLinks: headerLinks.filter((link) => link.getAttribute("aria-current") === "page").map((link) => link.textContent.trim()),
    duplicateHrefs: [...new Set(navigationHrefs.filter((href, index) => href && navigationHrefs.indexOf(href) !== index))],
    publicAdminLinks: hrefs.filter((href) => href?.startsWith("/admin")),
    visibleTopLevel: topLevelElements.map((element) => ({ label: element.getAttribute("aria-label") || element.textContent.trim().slice(0, 40), rect: rect(element) }))
  };
})()`;

async function auditViewport(browser, viewport) {
  const port = 9800 + Math.floor(Math.random() * 150);
  const profileDir = join(tmpdir(), `babas-brasse-nav-audit-${Date.now()}-${viewport.id}`);
  const child = spawn(browser, ["--headless=new", "--disable-gpu", "--no-first-run", `--remote-debugging-port=${port}`, `--user-data-dir=${profileDir}`, "about:blank"], { stdio: "ignore", windowsHide: true });
  let client;
  try {
    client = await connect(await debuggerUrl(port));
    await client.send("Page.enable");
    await client.send("Runtime.enable");
    await client.send("Emulation.setDeviceMetricsOverride", { width: viewport.width, height: viewport.height, deviceScaleFactor: 1, mobile: viewport.id === "mobile" });
    await client.send("Page.navigate", { url: `${baseUrl}/` });
    await waitForPage(client.send);
    const initial = await evaluate(client.send, snapshotExpression);

    if (viewport.id !== "desktop") {
      await evaluate(client.send, `document.querySelector('[aria-controls="public-navigation"]')?.click()`);
      await wait(150);
    }
    await evaluate(client.send, `document.querySelector('[aria-controls="editorial-navigation-panel"]')?.click()`);
    await wait(150);
    const expanded = await evaluate(client.send, snapshotExpression);

    await evaluate(client.send, `document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }))`);
    await wait(150);
    const escaped = await evaluate(client.send, snapshotExpression);

    await client.send("Page.navigate", { url: `${baseUrl}/about` });
    await waitForPage(client.send);
    const activePage = await evaluate(client.send, snapshotExpression);

    await client.send("Page.navigate", { url: `${baseUrl}/admin` });
    await waitForPage(client.send);
    const adminEntry = await evaluate(client.send, `({
      pathname: location.pathname,
      loginVisible: Boolean(document.querySelector("[data-page=admin-login]")),
      dashboardVisible: Boolean(document.querySelector("[data-page=admin-dashboard]")),
      publicHeaderVisible: Boolean(document.querySelector(".final-design-header")),
      robots: document.querySelector("meta[name=robots]")?.content || ""
    })`);

    return { id: viewport.id, initial, expanded, escaped, activePage, adminEntry };
  } finally {
    client?.close();
    child.kill();
    await wait(100);
    try { rmSync(profileDir, { recursive: true, force: true }); } catch { /* best-effort Windows cleanup */ }
  }
}

function validate(results) {
  const issues = [];
  for (const result of results) {
    const states = [result.initial, result.expanded, result.escaped, result.activePage];
    if (states.some((state) => state.horizontalOverflow)) issues.push(`${result.id}: horizontal overflow`);
    if (states.some((state) => state.topLevelOverlap || state.navigationItemOverlap)) issues.push(`${result.id}: navigation elements overlap`);
    if (result.initial.searchCount !== 1) issues.push(`${result.id}: expected one search form`);
    if (result.initial.publicAdminLinks.length) issues.push(`${result.id}: public admin link exposed`);
    if (result.initial.duplicateHrefs.length) issues.push(`${result.id}: duplicate header hrefs`);
    if (!result.expanded.panelVisible || result.expanded.sectionLinkCount !== 6) issues.push(`${result.id}: editorial panel did not expose six links`);
    if (result.escaped.panelVisible || result.escaped.mobileMenuOpen) issues.push(`${result.id}: Escape did not close navigation`);
    if (!result.activePage.currentLinks.includes("About")) issues.push(`${result.id}: About active state missing`);
    if (result.adminEntry.pathname !== "/admin" || !result.adminEntry.loginVisible || result.adminEntry.dashboardVisible) issues.push(`${result.id}: direct admin login state failed`);
    if (result.adminEntry.publicHeaderVisible || result.adminEntry.robots !== "noindex,nofollow") issues.push(`${result.id}: admin privacy metadata failed`);
  }
  return issues;
}

async function main() {
  const browser = findBrowser();
  const results = [];
  for (const viewport of viewports) results.push(await auditViewport(browser, viewport));
  const issues = validate(results);
  mkdirSync(dirname(outputFile), { recursive: true });
  writeFileSync(outputFile, `${JSON.stringify({ generatedAt: new Date().toISOString(), baseUrl, issues, results }, null, 2)}\n`);
  if (issues.length) throw new Error(`Navigation audit failed:\n${issues.join("\n")}`);
  console.log(`Navigation audit passed at ${viewports.map((viewport) => viewport.id).join(", ")}.`);
  console.log(`WROTE ${outputFile}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
