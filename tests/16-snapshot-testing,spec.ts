import { test, expect } from "@playwright/test";

test.only("test", async ({ page }) => {
  await page.goto("https://www.techglobal-training.com/frontend/alerts");
  await expect(page.locator("#root")).toMatchAriaSnapshot(`
    - list:
      - listitem:
        - button "Warning alert"
      - listitem:
        - button "Confirmation alert"
      - listitem:
        - button "Prompt alert"
    `);
});
