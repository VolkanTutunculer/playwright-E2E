import { test, expect } from "@playwright/test";
import { executeQuery } from "../../utils/dbUtils";
import { faker } from "@faker-js/faker";
import { BackendTestingPage } from "../../pages/BackendTestingPage";

test.describe("DB Query Verification", () => {
  test("Get all instructors", async () => {
    const result = await executeQuery("SELECT * FROM instructors");
    console.table(result);

    expect(result.length).toBe(4);
  });

  test("Get all students", async () => {
    const result = await executeQuery("SELECT * FROM students");
    console.table(result);
    expect(result.length).toBeGreaterThanOrEqual(2);
  });
});


test.describe('UI - DB E2E Tests', () => {
  let backendTestingPage: BackendTestingPage;

  test.beforeEach(async({ page }) => {
    backendTestingPage = new BackendTestingPage(page);
    await page.goto("https://www.techglobal-training.com/backend");
  });

  test("E2E test with UI and DB interaction", async ({ page }) => {
    const userToAdd = {
      fname: faker.person.firstName(),
      lname: faker.person.lastName(),
      email: faker.internet.email(),
      dob: faker.date.birthdate().toISOString().split("T")[0],
      instructorName: "Leyla Haddad",
    };

    backendTestingPage.fillStudentFormAndSubmit(
      userToAdd.fname,
      userToAdd.lname,
      userToAdd.email,
      userToAdd.dob,
      userToAdd.instructorName
    );

    await expect(backendTestingPage.successMessage).toBeVisible();

    await page.waitForTimeout(3000);

    const result = await executeQuery(
      `SELECT * FROM students WHERE email = '${userToAdd.email}'`
    );
    expect(result.length).toBe(1);
  });

  test('Delete all students on UI and validate in DB', async({ page }) => {
    await backendTestingPage.deleteAllButton.click();
    const result = await executeQuery(
      `SELECT * FROM students`
    );
    expect(result.length).toBe(2);
  });
})