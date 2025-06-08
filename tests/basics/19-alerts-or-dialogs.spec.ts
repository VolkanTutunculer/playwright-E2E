import { test, expect } from '@playwright/test';

test.describe('Handling Alerts', () => {
  test.beforeEach(async({ page }) => {
    await page.goto('https://www.techglobal-training.com/frontend/alerts');
  });

  test('page.on() method', async({ page }) => {
    page.on('dialog', async(dialog) => {
      console.log(dialog.message());
      expect(dialog.message()).toBeTruthy();
      await dialog.accept();
    });

    const alertButtons = page.locator('[id$="alert"]');

    for(let i = 0; i < await alertButtons.count(); i++) {
      await alertButtons.nth(i).click();
    }
  });

  test('page.once() method with accept', async({ page }) => {
    // Accepting Warning Alert
    page.once('dialog', async(dialog) => {
      expect(dialog.message()).toBe('You are on TechGlobal Training application.');
      await dialog.accept();
    });

    await page.locator('#warning_alert').click();
    await expect(page.locator('#action')).toHaveText('You accepted warning by clicking OK.');

    // Accepting Confirmation Alert
    page.once('dialog', async(dialog) => {
      expect(dialog.message()).toBe('Would you like to stay on TechGlobal Training application?');
      await dialog.accept();
    });

    await page.locator('#confirmation_alert').click();
    await expect(page.locator('#action')).toHaveText('You confirmed the alert by clicking OK.');

    // Accepting Prompt Alert without entering any text
    page.once('dialog', async(dialog) => {
      expect(dialog.message()).toBe('What would you like to say to TechGlobal?');
      await dialog.accept();
    });

    await page.locator('#prompt_alert').click();
    await expect(page.locator('#action')).toHaveText('You entered "" in the alert and clicked OK.');

    // Accepting Prompt Alert without entering any text
    const text = 'Playwright is fun!';

    page.once('dialog', async(dialog) => {
      expect(dialog.message()).toBe('What would you like to say to TechGlobal?');
      await dialog.accept(text);
    });

    await page.locator('#prompt_alert').click();
    await expect(page.locator('#action')).toHaveText(`You entered "${text}" in the alert and clicked OK.`);
  });

  test('page.on() method with dismiss', async({ page }) => {
    page.once('dialog', async(dialog) => {
      await dialog.dismiss();
    });

    await page.locator('#confirmation_alert').click();
    await expect(page.locator('#action')).toHaveText('You rejected the alert by clicking Cancel.');
  });
});