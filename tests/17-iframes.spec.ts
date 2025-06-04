import { test, expect } from '@playwright/test';

test('IFrame Handling @Regression', async({ page }) => {
  await page.goto('https://www.techglobal-training.com/frontend/iframes');
  const iFrameForm = page.frameLocator('#form_frame');

  const [fname, lname] = ['John', 'Doe'];

  await iFrameForm.locator('#first_name').fill(fname);
  await iFrameForm.locator('#last_name').fill(lname);
  await iFrameForm.locator('#submit').click();

  await expect(page.locator('#result')).toHaveText(`You entered: ${fname} ${lname}`);
});