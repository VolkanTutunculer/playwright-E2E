import { test, expect } from '@playwright/test';

test('Just a test', async({ page }) => {
  await page.goto('/');
})