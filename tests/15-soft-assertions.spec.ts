import { test, expect } from "@playwright/test";

test("Soft assertions", async ({ page }) => {
  await page.goto("https://www.techglobal-training.com/frontend/alerts");

  await expect.soft(
    page.getByRole("button", { name: "arning alert", exact: true })
  ).toBeVisible();
  await expect.soft(
    page.getByRole("button", { name: "Confirmation alert" })
  ).toBeVisible();
  await expect.soft(
    page.getByRole("button", { name: "Prompt alert" })
  ).toBeVisible();

  console.log('Hello')
});
