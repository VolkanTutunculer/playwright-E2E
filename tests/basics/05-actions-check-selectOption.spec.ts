import { test, expect } from '@playwright/test';

test.describe('Playwright Actions @Regression', () => {
  test.beforeEach( async({ page }) => {
    await page.goto('https://www.techglobal-training.com/frontend/html-elements');
  });

  test('Check - uncheck checkboxes', async({ page }) => {
    await page.locator('#apple_check').check();
    await expect(page.locator('#apple_check')).toBeChecked();
    await page.locator('#apple_check').uncheck();
    await expect(page.locator('#apple_check')).not.toBeChecked();

    await page.locator('#checkbox_3').check();
    await expect(page.locator('#checkbox_3')).toBeChecked();
    await page.locator('#checkbox_3').uncheck();
    await expect(page.locator('#checkbox_3')).not.toBeChecked();
  });

  test('Check radio-buttons', async({ page }) => {
    await page.locator('#java_radio').check();
    await expect(page.locator('#java_radio')).toBeChecked();

    await page.locator('#radio_1_option_3').check();
    await expect(page.locator('#radio_1_option_3')).toBeChecked();
    await expect(page.locator('#java_radio')).not.toBeChecked();
  });

  test('Select Dropdown Option', async({ page }) => {
      await page.locator('#company_dropdown1').selectOption({ value: 'Tesla' });
      await page.locator('#company_dropdown2').selectOption({ index: 1 }); // index-zero based
  });
});