import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class FrontendTestingPage extends BasePage {
  readonly practiceCards: Locator;
  readonly frontendHeading: Locator;
  readonly testingHeading: Locator;
  readonly projectsHeading: Locator;
  readonly projectCards: Locator;
  
  constructor(page: Page) {
    super(page);

    // Practices section
    this.frontendHeading = this.page.getByRole('heading', { name: 'Frontend' });
    this.testingHeading = this.page.getByRole('heading', { name: 'Testing' });
    this.practiceCards = this.page.locator('[class^="Card_cards"]>a');
    
    // Projects section
    this.projectsHeading = this.page.getByRole('heading', { name: 'Projects' });
    this.projectCards = this.page.locator('[class^="CardGrids_projects"] a');
  }

  async clickOnPracticeCard(cardText: string) {
    await this.practiceCards.filter({ hasText: cardText }).click();
  }

  async clickOnProjectCard(cardText: string) {
    await this.projectCards.filter({ hasText: cardText }).click();
  }
}