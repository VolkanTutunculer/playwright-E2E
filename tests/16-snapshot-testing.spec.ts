import { test, expect } from '@playwright/test';

test('Snapshot Test 1', async ({ page }) => {
  await page.goto('https://www.techglobal-training.com/frontend/alerts');
  await expect(page.locator('#root')).toMatchAriaSnapshot(`
    - list:
      - listitem:
        - button "Warning alert"
      - listitem:
        - button "Confirmation alert"
      - listitem:
        - button "Prompt alert"
    `);
});

test('Snapshot Test 2', async ({ page }) => {
  await page.goto('https://www.techglobal-training.com/');
  await expect(page.locator('[class^="Footer_socials"]')).toMatchAriaSnapshot(`
    - link:
      - /url: https://www.linkedin.com/in/techglobalschool
    - link:
      - /url: https://www.facebook.com/techglobalschool
    - link:
      - /url: https://www.instagram.com/techglobal.school
    - link:
      - /url: https://x.com/techglobalschl
    - link:
      - /url: https://www.youtube.com/@techglobalschool
    `);
});

test('Snapshot Test 3', async({ page }) => {
  await page.goto('https://www.techglobal-training.com/');
  await expect(page.locator('[class^="HeroBanner_container"]')).toMatchAriaSnapshot(`
    - heading "Welcome to TechGlobal" [level=1]
    - heading "School Training" [level=1]
    - paragraph: This website is created by TechGlobal School Alumni who completed the 6 months of the Software Engineer Program with the guidance of founders and instructors.
    - link "See Our Programs":
      - /url: https://www.techglobalschool.com/courses/
    - paragraph: Be Part of TechGlobal Today
    `);
});

test('Snapshot Test 4', async ({ page }) => {
  await page.goto('https://www.techglobal-training.com/');
  await expect(page.locator('#root')).toMatchAriaSnapshot(`
    - img "who we are"
    - heading "Who we are" [level=2]
    - paragraph: We are a group of experienced Software Engineers committed to maintaining a high standard of education through real-life projects and technologies.
    - img "mission"
    - heading "Our mission" [level=2]
    - paragraph: Our company's mission is to provide you with real-world industry-level experience and Software Engineering training to guide you in a way that makes you a competitive candidate to tackle in the IT world.
    - img "goal"
    - heading "Main goal" [level=2]
    - paragraph: The main goal of this website is to help TechGlobal School students practice their skills and prepare for real jobs. You'll find various testing practices, coding exercises, and essential information for every programmer.
    `);
});