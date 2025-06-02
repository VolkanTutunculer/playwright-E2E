import { test, expect } from '@playwright/test';

test.describe('Playwright Actions @Regression', () => {
  test.beforeEach( async({ page }) => {
    await page.goto('https://www.techglobal-training.com');
  });

  test('Hover', async({ page }) => {
    await page.locator('#dropdown-testing').hover();
    await page.waitForTimeout(3000);
    const frontenTestingOptionVisible = await page.locator('#frontend-option').isVisible();
    await expect(page.locator('#frontend-option')).toBeVisible();

    console.log(frontenTestingOptionVisible);
  });

  test('Scroll', async({ page }) => {
    await page.locator('footer').scrollIntoViewIfNeeded();

    console.log(await page.locator('footer').isVisible());
  });
});