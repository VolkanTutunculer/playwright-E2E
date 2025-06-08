import {test, expect} from '@playwright/test';

test('toPass method', async({ page }) => {
  await page.goto('https://www.techglobal-training.com/frontend/waits');

  await page.locator('#red').click();
  await expect(page.locator('.has-background-danger')).toBeVisible({ timeout: 15000 }); // Fails because the box is displayed after 15 seconds

  await expect(async () => {
    await expect(page.locator('.has-background-danger')).toBeVisible();
  }).toPass({ timeout: 15000 });
})