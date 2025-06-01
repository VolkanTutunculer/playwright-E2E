import { test, expect } from "@playwright/test";

test.describe("Playwright Actions", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.techglobal-training.com/frontend/actions");
  });
  test.only("", async ({ page }) => {
    await page.getByRole('button', {name:'Click on me', exact: true}).click();

    await page.waitForTimeout(5000);
  });
});
