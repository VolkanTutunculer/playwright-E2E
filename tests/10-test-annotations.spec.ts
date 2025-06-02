import { test, expect } from '@playwright/test';

test('Slow annotation @Regression', async({ page }) => {
  //test.setTimeout(90000);
  test.slow();
  await page.goto('https://www.techglobal-training.com/backend');
  await page.getByRole('link', { name: 'Instructors' }).click();

  expect((await page.locator('[class^="Accordion_title"]').all())).toHaveLength(4);
});

// test('Fail annotation', async({ page }) => {
//   test.fail();
// });

test('Step annotation @Regression', async({ page }, testInfo) => {
  await test.step('Given user is on TechGlobal Training App', async() => {
    await page.goto('https://www.techglobal-training.com/backend');
  });

  await test.step('When user clicks on "Instructors" link', async() => {
    await page.getByRole('link', { name: 'Instructors' }).click();
  });
  
  await test.step('Then user should see there are 4 accordions for instructors', async() => {
    expect((await page.locator('[class^="Accordion_title"]').all())).toHaveLength(4);
  });
});

test('TS123: Test info pbject @SomeTag @Regression', async({ page }, testInfo) => {
  console.log(testInfo.title); // TS123: Test info pbject @SomeTag @Smoke
  console.log(testInfo.tags); // [ '@SomeTag', '@Regression' ]
  console.log(testInfo.duration); // 0
});