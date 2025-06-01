import { test, expect } from '@playwright/test';

test.describe('Playwright Actions', () => {
  test.beforeEach( async({ page }) => {
    await page.goto('https://www.techglobal-training.com/frontend/actions');
  });

  test('Drag & Drop', async({ page }) => {
    await page.dragAndDrop('#drag_element', '#drop_element');

    //await page.locator('#drag_element').dragTo(page.locator('#drop_element'));
    await page.waitForTimeout(2000);

    expect(await page.locator('#drag_and_drop_result').innerText()).toBe('An element dropped here!')
  });
});