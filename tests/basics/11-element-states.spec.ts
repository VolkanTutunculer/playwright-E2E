import { test, expect } from '@playwright/test';

test('Playwright element states @Regression', async({ page }) => {
  await page.goto('https://www.techglobal-training.com/frontend/html-elements');
  const registerButton = page.locator('#register_button');

  console.log(await registerButton.isVisible()); // true
  //console.log(await registerButton.isChecked()); // Error
  console.log(await registerButton.isDisabled()); // false
  console.log(await registerButton.isEnabled()); // true
  // console.log(await registerButton.isEditable()); // Error
  console.log(await registerButton.isHidden()); // false

  await expect(registerButton).toBeVisible();
});

test('Example @Regression', async({ page }) => {
  await page.goto('https://bananarepublicfactory.gapfactory.com');

  await page.waitForSelector('#onetrust-group-container');
  const isModalVisible = await page.locator('#onetrust-group-container').isVisible();
  console.log(isModalVisible); // true

  if(isModalVisible) {
    await page.locator('#onetrust-close-btn-container>button').click();
  }
});