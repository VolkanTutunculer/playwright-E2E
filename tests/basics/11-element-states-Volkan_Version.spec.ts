import { test, expect } from "@playwright/test";

test("Playwright element states @Regression", async ({ page }) => {
  await page.goto("https://www.techglobal-training.com/frontend/html-elements");
  const registerButton = page.locator("#register_button");

  console.log(await registerButton.isVisible()); // True
  // console.log(await registerButton.isChecked()); //Error
  console.log(await registerButton.isDisabled()); // False
  console.log(await registerButton.isEnabled()); // True
  // console.log(await registerButton.isEditable()); //Error
  console.log(await registerButton.isHidden()); // False

  // console.log(registerButton.isVisible());
  // console.log(registerButton.isChecked());
  // console.log(registerButton.isDisabled());
  // console.log(registerButton.isEnabled());
  // console.log(registerButton.isEditable());
  // console.log(registerButton.isHidden());
});

test("Example @Regression", async ({ page }) => {
  await page.goto("https://www.bestbuy.ca/en-ca");

  await page.waitForSelector("#onetrust-banner-sdk");
  const isModalVisible = await page.locator("#onetrust-banner-sdk").isVisible();
  console.log(isModalVisible);

  if (isModalVisible) {
    await page.locator("#onetrust-close-btn-container").click();
  }
  //await page.pause();
});
