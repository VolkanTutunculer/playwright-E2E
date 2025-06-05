import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class FrontendTestingPage extends BasePage {
  readonly practiceCards: Locator;
  
  constructor(page: Page) {
    super(page);
    this.practiceCards = this.page.locator('[class^="Card_cards"]>a');
  }

  async clickOnPracticeCard(cardText: string) {
    await this.practiceCards.filter({ hasText: cardText }).click();
  }
}