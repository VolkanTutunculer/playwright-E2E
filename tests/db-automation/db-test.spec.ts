import { test, expect } from "@playwright/test";
import { executeQuery } from "../../utils/dbUtils";

test.describe("DB Query Verification", () => {
  test("Get all instructors", async ({}) => {
    const result = await executeQuery("SELECT * FROM instructors");
    console.log("Instructors:\n", result);

    expect(result.length).toBe(4);
  });

  test("Get all students", async ({}) => {
    const result = await executeQuery("SELECT * FROM students");
    console.table(result); // we can get as a table also

    expect(result.length).toBeGreaterThan(2);
  });

  test("E2E test with UI and DB interaction", async ({ page }) => {
    await page.goto("https://www.techglobal-training.com/backend");
    // Fill the form and submit

    await page.locator('input[name="FIRST_NAME"]').fill("Adam");
    await page.locator('input[name="LAST_NAME"]').fill("Smith");
    await page.locator('input[name="EMAIL"]').fill("adam123@outlook.com");
    await page.locator('input[name="DOB"]').fill("1950-10-10");
  });
});

