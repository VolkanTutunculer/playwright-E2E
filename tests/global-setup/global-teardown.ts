import { chromium } from '@playwright/test';

// This will run once after execution
async function globalTeardown() {
  // Set browser-context-page
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.waitForTimeout(3000);

  console.log('This is GLOBAL TEARDOWN Running!');

  // Delete all the cookies
}

export default globalTeardown;