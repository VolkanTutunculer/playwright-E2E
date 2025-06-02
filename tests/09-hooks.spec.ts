import { test } from '@playwright/test';

test.describe('Playwright Hooks @Regression', () => {
  test.beforeAll(async () => {
    console.log('This runs only once before all tests!');
  });

  test.afterAll(async () => {
    console.log('This runs only once after all tests!');
  });

  test.beforeEach(async ({ page }) => {
    console.log('This runs once before each test!');
  });

  test.afterEach(async ({ page }) => {
    console.log('This runs once after each test!');
  });

  test('Test 1', async({ page }) => {
    console.log('Test 1 is running!');
  });

  test('Test 2', async({ page }) => {
    console.log('Test 2 is running!');
  });

  test('Test 3', async({ page }) => {
    console.log('Test 3 is running!');
  });
});