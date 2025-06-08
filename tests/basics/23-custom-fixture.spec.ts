import { test, expect } from '../../fixtures/PageFixture';

test('Validate Home Page main heading', async({ basePage }) => {
  expect(await basePage.mainHeading.innerText()).toBe('Welcome to TechGlobal')
  await basePage.wait(2);
})

test.describe('Frontend Testing Page verification', () =>{
  test('Validate Headings', async({ frontendTestingPage }) => {
    await expect(frontendTestingPage.frontendHeading).toBeVisible();
    await expect(frontendTestingPage.testingHeading).toBeVisible();
  });

  test('Validate there are 10 practice cards', async({ frontendTestingPage }) => {
    await frontendTestingPage.waitForHeading();
    expect(await frontendTestingPage.practiceCards.count()).toBe(10);
  });

  test('Validate there are 10 projects with "Projects" heading', async({ frontendTestingPage }) => {
    await expect(frontendTestingPage.projectsHeading).toBeVisible();
    expect(await frontendTestingPage.projectCards.count()).toBe(10);
  });
});