/**
 * Screenshots: render the built HTML in Playwright Chromium and capture
 * each output for a visual check. Run after `npm run build`.
 *
 *   npm run screenshots
 *
 * Writes docs/screenshots/*.png. The share card needs no screenshot — its
 * PNG is rendered by the build itself (out/share-card.png).
 */
import { chromium } from "playwright";
import { access, mkdir } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url);
const SHOTS = new URL("../docs/screenshots/", import.meta.url);

/** Full Chromium from Playwright's cache, used when the headless shell isn't installed. */
const CACHED_CHROMIUM = join(homedir(), ".cache/ms-playwright/chromium-1255/chrome-linux64/chrome");

async function launchBrowser() {
  try {
    return await chromium.launch();
  } catch {
    await access(CACHED_CHROMIUM);
    console.log(`Headless shell missing; launching cached Chromium at ${CACHED_CHROMIUM}`);
    return await chromium.launch({ executablePath: CACHED_CHROMIUM });
  }
}

const SHOTS_LIST = [
  { file: "out/email.html", name: "email-desktop.png", width: 700 },
  { file: "out/email.html", name: "email-mobile.png", width: 375 },
  { file: "out/page.html", name: "page-desktop.png", width: 1200 },
  { file: "out/page.html", name: "page-mobile.png", width: 375 },
  { file: "out/ticket.html", name: "ticket.png", width: 820 },
  { file: "out/clients/outlook.html", name: "email-outlook.png", width: 700 },
] as const;

async function main() {
  await mkdir(SHOTS, { recursive: true });
  const browser = await launchBrowser();
  for (const shot of SHOTS_LIST) {
    const page = await browser.newPage({ viewport: { width: shot.width, height: 900 } });
    const url = new URL(shot.file, ROOT).href;
    try {
      await page.goto(url, { waitUntil: "networkidle" });
    } catch {
      // Client previews are self-contained; networkidle can time out on
      // the font link in the others. Fall back to a plain load.
      await page.goto(url, { waitUntil: "load" });
    }
    await page.waitForTimeout(600);
    await page.screenshot({ path: new URL(shot.name, SHOTS).pathname, fullPage: true });
    console.log(`Wrote docs/screenshots/${shot.name}`);
    await page.close();
  }
  await browser.close();
  console.log("Done. Inspect the PNGs in docs/screenshots/ and out/share-card.png.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
