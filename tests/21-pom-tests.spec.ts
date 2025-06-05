import { test, expect } from "@playwright/test";
import { FrontendTestingPage } from "../pages/FrontendTestingPage";

const frontendPracticePageTexts: string[] = [
  "HTML Elements",
  "Dynamic Elements",
  "Waits",
  "Dropdowns",
  "Alerts",
  "IFrames",
  "Multiple Windows",
  "Tables",
  "File Download & Upload",
  "Actions",
];

test.describe("POM Testing", () => {
  frontendPracticePageTexts.forEach((frontendPracticePageText) => {
    test(`Validate Frontend Testing "${frontendPracticePageText}" Page loading`, async ({
      page,
    }) => {
      await page.goto("https://www.techglobal-training.com/");

      const frontendTestingPage = new FrontendTestingPage(page);

      await frontendTestingPage.selectFrontendOption();

      await frontendTestingPage.clickOnPracticeCard(frontendPracticePageText);
      await frontendTestingPage.wait(0.5);

      expect(page.url()).toContain(frontendPracticePageText.replaceAll(' ', '-').toLowerCase());
    });
  });
});
