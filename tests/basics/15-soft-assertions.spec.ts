import { test, expect } from '@playwright/test';

test('Soft assertions @Regression', async({ page }) => {
  await page.goto('https://www.techglobal-training.com/frontend/alerts');

  await expect.soft(page.getByRole('button', { name: 'Warning alert', exact: true })).toBeVisible(); // failing this on purpose and checking if the rest executes
  await expect.soft(page.getByRole('button', { name: 'Confirmation alert' })).toBeVisible();
  await expect.soft(page.getByRole('button', { name: 'Prompt alert' })).toBeVisible();

  console.log('Hello');
})