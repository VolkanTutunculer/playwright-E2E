import { test, expect } from '@playwright/test';

test.describe('Demo @Smoke', () => {

  test.beforeEach(async({ page }) => {
    await page.goto('https://playwright.dev/');
  });

  test('has titl', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
  });
  
  test('get started link', async ({ page }) => {
    // Click the get started link.
    await page.getByRole('link', { name: 'Get started' }).click();
  
    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  });  
});


const dataset: string[] = ['Playwright', 'TypeScript', 'JavaScript'];

dataset.forEach((data: string) => {
  test(`Validate Wiki search for ${data}`, async({ page }) => {

    await page.goto('https://www.wikipedia.org/');
  
    await page.locator('#searchInput').fill(data);
    await page.locator('.pure-button-primary-progressive').click();
  
    expect(page.url()).toContain(data);
    expect(await page.title()).toContain(data);
    expect(await page.locator('#firstHeading').innerText()).toBe(data);
  });
});

/*
Go to https://www.wikipedia.org/
Search for "Playwright"
Validate the url contains "Playwright"
Validate the title contains "Playwright"
Validate the main heading is "Playwright"
*/