import { test, expect } from '@playwright/test';

test('Element Properties @Regression', async({ page }) => {
  await page.goto('https://www.techglobal-training.com/frontend/html-elements');

  const paragraphsSection = page.locator('[data-identifier="Paragraphs"]');

  console.log(await paragraphsSection.allInnerTexts());
  console.log(await paragraphsSection.innerText());

  console.log(await paragraphsSection.innerHTML());

  console.log(await paragraphsSection.allTextContents());
  console.log(await paragraphsSection.textContent());
});

test('Example for input boxes @Regression', async({ page }) => {
  await page.goto('https://www.techglobal-training.com/frontend/actions');
  const inputBox = page.locator('#input_box');
  expect(await inputBox.getAttribute('value')).toBeFalsy();

  await inputBox.fill('Batch-11');

  expect(await inputBox.getAttribute('value')).toBe('Batch-11');
  expect(await inputBox.inputValue()).toBe('Batch-11');
})