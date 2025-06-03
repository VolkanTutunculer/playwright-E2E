import { test, expect } from "@playwright/test";

test("Evaluate Command", async ({ page }) => {
  await page.goto("https://www.google.com/");

  // Playwright
  expect(await page.title()).toBe("Google");
  expect(page.url()).toContain("google");

  const titleAndUrl = await page.evaluate(() => {
    return [document.title, document.URL];
  });

  expect(titleAndUrl[0]).toBe("Google");
  expect(titleAndUrl[1]).toContain("google");
});
