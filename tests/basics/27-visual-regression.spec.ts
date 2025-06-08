import { test, expect } from '@playwright/test';

test('Test Visual Regression', async({ page }) => {
  await page.goto('https://www.techglobal-training.com/');

  await expect(page).toHaveScreenshot({
    fullPage: true
  });
});

test('Test Visual Regression 2', async({ page }) => {
  await page.goto('https://www.techglobal-training.com/frontend');

  await expect(page).toHaveScreenshot({
    fullPage: true
  });
});

test('Test Visual Regression 3', async({ page }) => {
  await page.goto('https://www.techglobal-training.com/backend');

  await page.waitForTimeout(3000);

  await expect(page).toHaveScreenshot({
    fullPage: true
  });
});