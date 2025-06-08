import { test, expect } from "@playwright/test";

test.describe("Playwright Multiple Elements @Regression", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.techglobal-training.com");
  });

  /*
  Go to "https://www.techglobal-training.com"
  Validate the header has 3 menu items
    Testing
    Exercises
    Mock Interviews
  */

  test("Validate Headers", async ({ page }) => {
    const headerElements = page.locator('[class^="Header_menus"]>div');

    expect(await headerElements.count()).toBe(3);

    const expectedHeaderItemTexts = ["Testing", "Exercises", "Mock Interviews"];

    for (let i = 0; i < (await headerElements.count()); i++) {
      expect(await headerElements.nth(i).innerText()).toBe(
        expectedHeaderItemTexts[i]
      );
    }

    // console.log(await headerElements.first().innerText());
    // console.log(await headerElements.nth(1).innerText());
    // console.log(await headerElements.last().innerText());
  });

  /*
  Go to "https://www.techglobal-training.com"
  Validate the footer has 5 social media items
    Each has an href containing "techglobal"
    Each has target attribute equals "_blank"
  */
  test("Validate Footer Social Icons", async ({ page }) => {
      const socialLinkElements = page.locator('[class^="Footer_socials"]>a');
      const count = await socialLinkElements.count();

      expect(count).toBe(5);

      for(let i = 0; i < count; i++) {
        expect(await socialLinkElements.nth(i).getAttribute('href')).toContain('techglobal');
        expect(await socialLinkElements.nth(i).getAttribute('target')).toBe('_blank');
      }
  });
});
