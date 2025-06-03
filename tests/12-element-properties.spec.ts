import { test, expect } from "@playwright/test";

test("Element properties @Regression", async ({ page }) => {
  await page.goto("https://www.techglobal-training.com/frontend/html-elements");

  const paragraphsSection = page.locator('[data-identifier="Paragraphs"]');

  console.log(await paragraphsSection.allInnerTexts());
  console.log(await paragraphsSection.innerText());

  console.log(await paragraphsSection.innerHTML());

  console.log(await paragraphsSection.allTextContents());
  console.log(await paragraphsSection.textContent());

  const inputBox = page.locator("#text_input1");
  expect(await inputBox.getAttribute("value")).toBeFalsy();

  await inputBox.fill("Batch-11");


  //expect(await inputBox.getAttribute("value")).toBe("Batch-11");
  expect(await inputBox.inputValue()).toBe("Batch-11");
});
