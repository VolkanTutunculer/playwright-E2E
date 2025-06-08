import { test, expect } from '@playwright/test';

test.describe('@Smoke', () => {
  test.beforeEach(async({ page }) => {
    test.setTimeout(10000);
    await page.goto('https://www.techglobal-training.com/frontend/html-elements');
  });

  test.fixme('Explicit timeout for any action', async({ page }) => {
    await expect(page.locator('#dsjkhfskdh')).toBeVisible({ timeout: 10000 });
    await page.click('#skdjhfs', { timeout: 10000 });
  });

  test('CSS/Xpath selectors', async({ page }) => {
    // locator
    page.locator(''); // you can pass either CSS or Xpath
  });
});