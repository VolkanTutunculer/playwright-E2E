// import { test, expect } from '@playwright/test';
// import { BasePage } from '../pages/BasePage';
// import { MockInterviewsLoginPage } from '../pages/MockInterviewsLoginPage';

// test('Validate Mock Interviews Login Page', async({ page }) => {
//   await page.goto('/');

//   const basePage = new BasePage(page);
//   const mockInterviewsLoginPage = new MockInterviewsLoginPage(page);

//   await basePage.mockInterviewsLink.click();

//   await expect(mockInterviewsLoginPage.image).toBeVisible();
//   await expect(mockInterviewsLoginPage.form).toBeVisible();
// });

import { test, expect } from '../../fixtures/PageFixture';

test.describe('Mock Interviews Login Page', () => {

  test('Validate Mock Interviews Login Page', async({ mockInterviewsLoginPage }) => {
    await expect(mockInterviewsLoginPage.image).toBeVisible();
    await expect(mockInterviewsLoginPage.form).toBeVisible();
  });

  test('Validate Mock Interviews Login Page - Snapshot', async({ mockInterviewsLoginPage }) => {
    await expect(mockInterviewsLoginPage.mainContent).toMatchAriaSnapshot(`
      - img "student"
      - heading "Designed for TechGlobal Students" [level=2]
      - text: Enter your username
      - textbox
      - text: Enter your password
      - textbox
      - text: Select a core language
      - combobox:
        - option "-- Select --" [disabled] [selected]
        - option "JavaScript"
      - button "Login"
      `);
  });
})
