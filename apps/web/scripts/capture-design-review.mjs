import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const workspaceRoot = resolve(scriptDir, "../../..");
const localBaseUrl = (process.env.WEB_BASE_URL || "http://127.0.0.1:5173").replace(/\/$/, "");

const viewports = [
  { id: "desktop", width: 1440, height: 900 },
  { id: "tablet", width: 768, height: 1024 },
  { id: "mobile", width: 390, height: 844 }
];

const localRoutes = [
  { id: "home", path: "/" },
  { id: "visceral-mag", path: "/visceral-mag" },
  { id: "featured", path: "/featured" },
  { id: "contact", path: "/contact" }
];

const output = {
  cec: resolve(workspaceRoot, "docs", "design-reference", "cec"),
  after: resolve(workspaceRoot, "docs", "design-reference", "babas-brasse", "after")
};

function browserCandidates() {
  return [
    process.env.CHROME_BIN,
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    join(process.env.LOCALAPPDATA || "", "Google", "Chrome", "Application", "chrome.exe"),
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe"
  ].filter(Boolean);
}

function findBrowser() {
  const browser = browserCandidates().find((candidate) => existsSync(candidate));
  if (!browser) throw new Error("No Chromium browser found. Set CHROME_BIN and retry.");
  return browser;
}

function wait(milliseconds) {
  return new Promise((resolvePromise) => setTimeout(resolvePromise, milliseconds));
}

async function connectToPage(port) {
  let lastError;
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/list`);
      const targets = await response.json();
      const page = targets.find((target) => target.type === "page");
      if (page?.webSocketDebuggerUrl) return page.webSocketDebuggerUrl;
    } catch (error) {
      lastError = error;
    }
    await wait(150);
  }
  throw lastError || new Error("Chromium debugging target did not become ready.");
}

async function createCdpClient(webSocketUrl) {
  const socket = new WebSocket(webSocketUrl);
  const pending = new Map();
  let nextId = 1;

  await new Promise((resolvePromise, reject) => {
    socket.addEventListener("open", resolvePromise, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });

  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (!message.id || !pending.has(message.id)) return;
    const { resolve: resolveRequest, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(message.error.message));
    else resolveRequest(message.result);
  });

  function send(method, params = {}) {
    const id = nextId;
    nextId += 1;
    return new Promise((resolveRequest, reject) => {
      pending.set(id, { resolve: resolveRequest, reject });
      socket.send(JSON.stringify({ id, method, params }));
    });
  }

  return { send, close: () => socket.close() };
}

async function waitForDocument(send) {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    const result = await send("Runtime.evaluate", { expression: "document.readyState", returnByValue: true });
    if (result.result.value === "complete") break;
    await wait(150);
  }
  await wait(1800);
}

async function forceHover(send, expression) {
  await send("DOM.enable");
  await send("CSS.enable");
  await send("DOM.getDocument", { depth: -1 });
  const evaluated = await send("Runtime.evaluate", { expression, returnByValue: false });
  const objectId = evaluated.result.objectId;
  if (!objectId) return false;
  const described = await send("DOM.describeNode", { objectId });
  let nodeId = described.node.nodeId;
  if (!nodeId && described.node.backendNodeId) {
    const pushed = await send("DOM.pushNodesByBackendIdsToFrontend", { backendNodeIds: [described.node.backendNodeId] });
    nodeId = pushed.nodeIds[0];
  }
  if (!nodeId) return false;
  await send("CSS.forcePseudoState", { nodeId, forcedPseudoClasses: ["hover", "focus"] });
  await wait(500);
  return true;
}

async function capture({ browser, url, viewport, file, interaction }) {
  const port = 9300 + Math.floor(Math.random() * 500);
  const profileDir = join(tmpdir(), `babas-brasse-design-review-${Date.now()}-${Math.random().toString(16).slice(2)}`);
  const child = spawn(browser, [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--no-first-run",
    "--no-default-browser-check",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profileDir}`,
    "about:blank"
  ], { stdio: "ignore", windowsHide: true });

  let client;
  try {
    const webSocketUrl = await connectToPage(port);
    client = await createCdpClient(webSocketUrl);
    await client.send("Page.enable");
    await client.send("Runtime.enable");
    await client.send("Emulation.setDeviceMetricsOverride", {
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: 1,
      mobile: viewport.id === "mobile"
    });
    await client.send("Page.navigate", { url });
    await waitForDocument(client.send);

    if (interaction?.type === "click") {
      await client.send("Runtime.evaluate", { expression: `document.querySelector(${JSON.stringify(interaction.selector)})?.click()` });
      await wait(500);
    }
    if (interaction?.type === "hover") {
      await forceHover(client.send, interaction.expression);
    }

    const screenshot = await client.send("Page.captureScreenshot", { format: "png", fromSurface: true, captureBeyondViewport: false });
    writeFileSync(file, Buffer.from(screenshot.data, "base64"));
    console.log(`CAPTURED ${file}`);
  } finally {
    client?.close();
    child.kill();
    await wait(100);
    try {
      rmSync(profileDir, { recursive: true, force: true });
    } catch {
      // Chromium can retain Windows profile handles briefly; cleanup is best-effort.
    }
  }
}

async function main() {
  const browser = findBrowser();
  mkdirSync(output.cec, { recursive: true });
  mkdirSync(output.after, { recursive: true });

  for (const viewport of viewports) {
    await capture({
      browser,
      url: "https://ceconline.co.za/",
      viewport,
      file: join(output.cec, `home-${viewport.id}.png`)
    });
  }

  await capture({
    browser,
    url: "https://ceconline.co.za/",
    viewport: viewports[0],
    file: join(output.cec, "navigation-expanded-desktop.png"),
    interaction: {
      type: "hover",
      expression: `[...document.querySelectorAll("a, button")].find((item) => item.textContent.trim().toUpperCase() === "MEDIA")`
    }
  });

  for (const route of localRoutes) {
    for (const viewport of viewports) {
      await capture({
        browser,
        url: `${localBaseUrl}${route.path}`,
        viewport,
        file: join(output.after, `${route.id}-${viewport.id}.png`)
      });
    }
  }

  await capture({
    browser,
    url: `${localBaseUrl}/`,
    viewport: viewports[0],
    file: join(output.after, "home-sections-desktop.png"),
    interaction: { type: "click", selector: "[aria-controls=editorial-navigation-panel]" }
  });

  await capture({
    browser,
    url: `${localBaseUrl}/`,
    viewport: viewports[2],
    file: join(output.after, "home-navigation-mobile.png"),
    interaction: { type: "click", selector: "[aria-controls=public-navigation]" }
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
