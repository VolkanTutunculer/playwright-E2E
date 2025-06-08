import { test, expect } from '@playwright/test';

test.describe('Playwright Navigations @Regression', () => {
  test('Url and title validation', async({ page }) => {
    await page.goto('https://www.google.com/');

    expect(page.url()).toBe('https://www.google.com/');
    expect(page.url()).toContain('google');
    expect(await page.title()).toBe('Google');

    await page.goto('https://www.apple.com/');
    expect(page.url()).toContain('apple');
    expect(await page.title()).toBe('Apple');
  });

  test('Browser Navigations', async({ page }) => {
    await page.goto('https://www.google.com/');
    await page.goto('https://www.apple.com/');

    // Refresh
    await page.reload();

    // Navigate back
    await page.goBack();

    // Navigate forward
    await page.goForward();
  });
});