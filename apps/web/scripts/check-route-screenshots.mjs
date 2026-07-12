import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";

const screenshotDir = resolve("browser-qa", "figma-viewport-matrix");
const pngSignature = "89504e470d0a1a0a";
const minimumBytes = 30000;

const expectedScreenshots = [
  ["home-desktop.png", 1440, 1200],
  ["home-mobile.png", 390, 1200],
  ["visceral-mag-desktop.png", 1440, 1200],
  ["visceral-mag-mobile.png", 390, 1200],
  ["article-detail-desktop.png", 1440, 1200],
  ["article-detail-mobile.png", 390, 1200],
  ["search-desktop.png", 1440, 1200],
  ["search-mobile.png", 390, 1200],
  ["featured-desktop.png", 1440, 1200],
  ["featured-mobile.png", 390, 1200],
  ["contact-desktop.png", 1440, 1200],
  ["contact-mobile.png", 390, 1200],
  ["admin-dashboard-desktop.png", 1440, 1200],
  ["admin-dashboard-mobile.png", 390, 1200]
];

function readPngInfo(filePath) {
  const buffer = readFileSync(filePath);
  return {
    signature: buffer.subarray(0, 8).toString("hex"),
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
    size: buffer.length
  };
}

const failures = [];

for (const [fileName, expectedWidth, expectedHeight] of expectedScreenshots) {
  const filePath = resolve(screenshotDir, fileName);

  if (!existsSync(filePath)) {
    failures.push(`${fileName}: missing`);
    continue;
  }

  const info = readPngInfo(filePath);
  const stat = statSync(filePath);

  if (info.signature !== pngSignature) {
    failures.push(`${fileName}: invalid PNG signature ${info.signature}`);
  }

  if (info.width !== expectedWidth || info.height !== expectedHeight) {
    failures.push(`${fileName}: expected ${expectedWidth}x${expectedHeight}, got ${info.width}x${info.height}`);
  }

  if (info.size < minimumBytes || stat.size < minimumBytes) {
    failures.push(`${fileName}: too small (${info.size} bytes)`);
  }

  if (!failures.some((failure) => failure.startsWith(`${fileName}:`))) {
    console.log(`PASS ${fileName} ${info.width}x${info.height} ${info.size} bytes`);
  }
}

if (failures.length > 0) {
  for (const failure of failures) {
    console.error(`FAIL ${failure}`);
  }
  console.error(`Screenshot integrity failed for ${failures.length} issue(s).`);
  process.exitCode = 1;
} else {
  console.log(`Screenshot integrity passed for ${expectedScreenshots.length} PNG capture(s) in ${screenshotDir}.`);
}