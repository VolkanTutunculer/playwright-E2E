import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class MockInterviewsLoginPage extends BasePage {
  readonly image: Locator;
  readonly form: Locator;
  readonly mainContent: Locator;

  constructor(page: Page) {
    super(page);
    this.image = this.page.locator('[class^="Login_imageBox"]');
    this.form = this.page.locator('[class^="Login_loginForm"]');
    this.mainContent = this.page.locator('[class^="SubPageLayout_content"]');
  }
}