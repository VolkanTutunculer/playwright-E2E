import { Locator, Page } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  readonly testingDropdown: Locator;
  readonly testingDropdownFrontendOption: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.testingDropdown = this.page.locator('#dropdown-testing');
    this.testingDropdownFrontendOption = this.page.locator('#frontend-option');
  }

  async selectFrontendOption() {
    await this.testingDropdown.hover();
    await this.testingDropdownFrontendOption.click();
  }

  // Reusable commands
  async wait(seconds: number) {
    await this.page.waitForTimeout(seconds * 1000);
  }
}