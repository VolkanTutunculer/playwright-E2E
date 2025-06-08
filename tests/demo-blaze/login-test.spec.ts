import { test, expect } from '@playwright/test';

test('Login', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('#loginusername').fill('test');
  await page.locator('#loginpassword').fill('test');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();

  //await page.waitForTimeout(3000);

  await page.context().storageState({ path: './tests/auth/demo-blaze.json' });

});