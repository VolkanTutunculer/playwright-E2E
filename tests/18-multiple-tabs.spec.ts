import { test, expect } from '@playwright/test';

test.describe('Multiple Tabs Handling @Regression', () => {
  test.beforeEach(async({ page }) => {
    await page.goto('https://www.techglobal-training.com/frontend/multiple-windows');
  });

  test('Example 1 - Triggering a second tab from a link', async({ page }) => {
    const [newPage] = await Promise.all([
      page.waitForEvent('popup'),
      page.getByRole('link', { name: 'Apple' }).click()
    ]);

    console.log(await page.title()); // TechGlobal Training | Home
    console.log(page.url()); // https://www.techglobal-training.com/frontend/multiple-windows

    await newPage.waitForLoadState('load');
    console.log(await newPage.title()); // 
    console.log(newPage.url()); // https://www.apple.com/
  });

  test('Example 2 - Test 2 different apps', async({ page }) => {
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - list:
        - listitem:
          - link "Apple":
            - /url: https://www.apple.com
        - listitem:
          - link "Microsoft":
            - /url: https://www.microsoft.com
        - listitem:
          - link "Tesla":
            - /url: https://www.tesla.com
      `);

    const page2 = await page.context().newPage();

    await page2.goto('https://www.carvana.com/');
    await expect(page2.getByTitle('Carvana')).toBeVisible();

    const page3 = await page.context().newPage();
    await page3.goto('https://www.npmjs.com/');
    await expect(page3.locator('[aria-label="Npm"]')).toBeVisible();
    await page2.bringToFront();

    await page.bringToFront();
    await page3.close();
    await page2.close();
  });
})