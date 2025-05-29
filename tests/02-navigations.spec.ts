import { test, expect } from "@playwright/test";

test.describe("Playwright Navigations", () => {
  test("Url and Title Validation", async ({ page }) => {
    await page.goto("https://www.google.com/");
    expect(page.url()).toBe("https://www.google.com/");
    expect(page.url()).toContain("google");
    expect(await page.title()).toBe("Google");

    await page.goto("https://www.apple.com/");
    expect(page.url()).toContain("apple");
    expect(await page.title()).toBe("Apple");
  });

  test("Browser Navigations", async ({ page }) => {
    await page.goto("https://www.google.com/");
    //await page.waitForTimeout(2000);

    await page.goto("https://www.apple.com/");
    //await page.waitForTimeout(2000);

    // Refresh

    await page.reload();
    //await page.waitForTimeout(2000);

    // Navigate Back
    await page.goBack();
    // await page.waitForTimeout(2000);

    // Navigate Forward
    await page.goForward();
    //await page.waitForTimeout(2000);
  });
});
