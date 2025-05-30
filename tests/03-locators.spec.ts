import { test, expect } from "@playwright/test";

test.describe("", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(
      "https://www.techglobal-training.com/frontend/html-elements"
    );
  });
  test.only("", async ({ page }) => {

    await expect(page.locator("#dsf")).toBeVisible({timeout:10000});
  });
});
