import { test, expect } from "@playwright/test";
import { on } from "events";

test.describe("Playwright01", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.techglobal-training.com/frontend/todo-list");
  });

  test("Test Case 01 - Todo-App Modal Verification", async ({ page }) => {
    await expect(page.locator("p.panel-heading.has-text-white")).toBeVisible();
    await expect(page.locator("p.panel-heading.has-text-white")).toHaveText(
      "My Tasks"
    );

    await expect(page.locator("#input-add")).toBeEnabled();

    await expect(page.locator("#add-btn")).toBeEnabled();
    await expect(page.locator("#search")).toBeEnabled();

    await expect(page.locator("div[class*='todo-item']")).toHaveText(
      "No tasks found!"
    );
  });

  test("Test Case 02 - Single Task Addition and Removal", async ({ page }) => {
    expect(page.locator("#input-add").fill("first task"));
    expect(page.locator("#add-btn").click());
    await expect(
      page.locator("div[class*='mr-auto']", { hasText: "first task" })
    ).toHaveText("first task");
    await page.locator("svg[class*='circle-check']").click();

    await expect(page.locator("div span[style*='text-decoration']")).toHaveText(
      "first task"
    );

    expect(page.locator("#input-add").fill("second task"));
    expect(page.locator("#add-btn").click());
    await expect(
      page.locator("div[class*='mr-auto']", { hasText: "second task" })
    ).toHaveText("second task");
    await page.locator("svg[class*='trash-can']").nth(1).click();

    await page.locator("#clear").click();
    await expect(page.locator("div[class*='todo-item']")).toHaveText(
      "No tasks found!"
    );
  });

  //   test("Test Case 03 - Multiple Task Operations", async ({ page }) => {
  //     await page.locator("#input-add").fill("first task");
  //     await page.locator("#add-btn").click();

  //     await page.locator("#input-add").fill("second task");
  //     await page.locator("#add-btn").click();

  //     await page.locator("#input-add").fill("third task");
  //     await page.locator("#add-btn").click();

  //     await page.locator("#input-add").fill("fourth task");
  //     await page.locator("#add-btn").click();

  //     await page.locator("#input-add").fill("fifth task");
  //     await page.locator("#add-btn").click();

  //     await expect(
  //       page.locator("div[class*='mr-auto']", { hasText: "first task" })
  //     ).toHaveText("first task");
  //     await expect(
  //       page.locator("div[class*='mr-auto']", { hasText: "second task" })
  //     ).toHaveText("second task");
  //     await expect(
  //       page.locator("div[class*='mr-auto']", { hasText: "third task" })
  //     ).toHaveText("third task");
  //     await expect(
  //       page.locator("div[class*='mr-auto']", { hasText: "fourth task" })
  //     ).toHaveText("fourth task");
  //     await expect(
  //       page.locator("div[class*='mr-auto']", { hasText: "fifth task" })
  //     ).toHaveText("fifth task");

  //     await page.locator("svg[class*='circle-check']").nth(0).click();
  //     await page.locator("svg[class*='circle-check']").nth(1).click();
  //     await page.locator("svg[class*='circle-check']").nth(2).click();
  //     await page.locator("svg[class*='circle-check']").nth(3).click();
  //     await page.locator("svg[class*='circle-check']").nth(4).click();

  //     await page.locator("#clear").click();
  //     await expect(page.locator("div[class*='todo-item']")).toHaveText(
  //       "No tasks found!"
  //     );
  //   });

  test("Test Case 03 - Multiple Task Operations", async ({ page }) => {
    const taskNameListe = [
      "first task",
      "second task",
      "third task",
      "fourth task",
      "fifth task",
    ];

    for (const task of taskNameListe) {
      await page.locator("#input-add").fill(task);
      await page.locator("#add-btn").click();
    }

    for (const task of taskNameListe) {
      await expect(
        page.locator("div[class*='mr-auto']", { hasText: task })
      ).toHaveText(task);
    }

    for (let i = 0; i < taskNameListe.length; i++) {
      await page.locator("svg[class*='circle-check']").nth(i).click();
    }

    await page.locator("#clear").click();

    await expect(page.locator("div[class*='todo-item']")).toHaveText(
      "No tasks found!"
    );
  });

  test("Test Case 04 - Search and Filter Functionality in todo App", async ({
    page,
  }) => {
    const taskNameListe = [
      "first task",
      "second task",
      "third task",
      "fourth task",
      "fifth task",
    ];

    for (const task of taskNameListe) {
      await page.locator("#input-add").fill(task);
      await page.locator("#add-btn").click();
    }

    for (const task of taskNameListe) {
      await expect(
        page.locator("div[class*='mr-auto']", { hasText: task })
      ).toHaveText(task);
      await expect(page.locator("div[class*='todo-item']")).toHaveCount(
        taskNameListe.length
      );
    }

    for (const task of taskNameListe) {
      await page.locator("#search").fill(task);
      await expect(page.locator("div[class*='todo-item']")).toHaveCount(1);
      await expect(page.locator("div[class*='todo-item']")).toHaveText(task);
    }
  });

  test("Test Case 05 - Task Validation and Error Handling", async ({
    page,
  }) => {
    const longText = "chekoslavakyalastiramadiklarimizdanmisiniz?";
    const oneText = "this is only one task";

    await page.locator("#input-add").fill("");
    await page.locator("#add-btn").click();
    await expect(page.locator("div[class*='todo-item']")).toHaveText(
      "No tasks found!"
    );

    await page.locator("#input-add").fill(longText);
    await page.locator("#add-btn").click();
    await expect(page.locator("div[class*='is-danger']")).toHaveText(
      "Error: Todo cannot be more than 30 characters!"
    );

    await page.locator("#input-add").fill(oneText);
    await page.locator("#add-btn").click();
    await expect(page.locator("div[class*='todo-item']")).toHaveCount(1);

    await page.locator("#input-add").fill(oneText);
    await page.locator("#add-btn").click();
    await expect(page.locator("div[class*='is-danger']")).toHaveText(
      `Error: You already have ${oneText} in your todo list.`
    );
  });
});
