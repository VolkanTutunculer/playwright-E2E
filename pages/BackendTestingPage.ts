import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class BackendTestingPage extends BasePage {
  readonly fnameInput: Locator;
  readonly lnameInput: Locator;
  readonly emailInput: Locator;
  readonly DOBInput: Locator;
  readonly instructorDropdown: Locator;
  readonly addButton: Locator;
  readonly successMessage: Locator;
  readonly apiDocumentationLink: Locator;
  readonly deleteAllButton: Locator;

  constructor(page: Page) {
    super(page);
    this.fnameInput = this.page.locator('[name="FIRST_NAME"]');
    this.lnameInput = this.page.locator('[name="LAST_NAME"]');
    this.emailInput = this.page.locator('[name="EMAIL"]');
    this.DOBInput = this.page.locator('[name="DOB"]');
    this.instructorDropdown = this.page.locator('[name="INSTRUCTOR_ID"]');
    this.addButton = this.page.getByRole('button', { name: 'ADD' });
    this.successMessage = this.page.getByText('Successfully added');
    this.apiDocumentationLink = this.page.getByRole('link', { name: 'Check out API Documentation' });
    this.deleteAllButton = this.page.getByRole('button', { name: 'DELETE ALL' });
  }

  async fillFname(fname: string) {
    await this.fnameInput.fill(fname);
  }

  async fillLname(lname: string) {
    await this.lnameInput.fill(lname);
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async fillDOB(dob: string) {
    await this.DOBInput.fill(dob);
  }

  async selectInstructor(name: string) {
    await this.instructorDropdown.selectOption({ label: name });
  }

  async fillStudentFormAndSubmit(
    fname: string,
    lname: string,
    email: string,
    dob: string,
    instructorName: string
  ) {
    await this.fillFname(fname);
    await this.fillLname(lname);
    await this.fillEmail(email);
    await this.fillDOB(dob);
    await this.selectInstructor(instructorName);
    await this.addButton.click();
  }
}