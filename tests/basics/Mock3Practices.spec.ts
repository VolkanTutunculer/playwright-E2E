
import { test, expect } from "@playwright/test";



test.describe('Login Form', () => {
   test.beforeEach(async ({ page }) => {
      await page.goto('https://www.techglobal-training.com/frontend/login')
   });

   // Navigate to https://techglobal-training.com/frontend/login
   // Enter the username as “TechGlobal”
   // Enter the password as “Test1234”
   // Click on the “LOGIN” button

   test('ValidLogin', async ({ page }) => {
      await page.locator('#username').fill('TechGlobal');
      await page.locator('#password').fill('Test1234');
      await page.locator('#login_btn').click();

   });


   // Navigate to https://techglobal-training.com/frontend/login
   // Enter the username as "TechGlobal"
   // Enter the password as "1234"
   // Click on the "LOGIN" button
   // Validate if the failure message displayed as "Invalid Password entered!" above the form

   test('Validate Invalid Login', async ({ page }) => {

      await page.locator('#username').fill('TEch');
      await page.locator('#password').fill('Tech1234');
      await page.locator('#login_btn').click();

      await page.locator('#error_message').isVisible();
      await expect(page.locator('#error_message')).toHaveText('Invalid Username entered!');

   });


   // Navigate to https://techglobal-training.com/frontend/pagination
   // Validate the main heading is displayed as "Pagination"
   // Validate the subheading is displayed as "World City Populations 2022"
   // Validate the paragraph is displayed as "What are the most populated cities in the world? Here is a list of the top five most populated cities in the world:"

   test('Validate Headings', async ({ page }) => {
      await page.goto('https://www.techglobal-training.com/frontend/pagination')
      await expect(page.locator('h1[class = "is-size-3"]', { hasText: 'Pagination' })).toBeVisible();
      await expect(page.locator('#sub_heading', { hasText: 'World City Populations 2022' })).toBeVisible();

      await expect(page.locator('#content')).toHaveText('What are the most populated cities in the world? Here is a list of the top five most populated cities in the world:');
   })
})

