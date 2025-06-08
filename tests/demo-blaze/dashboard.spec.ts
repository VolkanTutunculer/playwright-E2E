import { test, expect } from "@playwright/test";

test.describe("Demo Blaze Dashboard test", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Header Snapshot", async ({ page }) => {
    await expect(page.locator("#navbarExample")).toMatchAriaSnapshot(`
      - list:
        - listitem:
          - link "Home (current)":
            - /url: index.html
        - listitem:
          - link "Contact":
            - /url: "#"
        - listitem:
          - link "About us":
            - /url: "#"
        - listitem:
          - link "Cart":
            - /url: cart.html
        - listitem
        - listitem:
          - link "Log out":
            - /url: "#"
        - listitem:
          - link "Welcome test":
            - /url: "#"
        - listitem
      `);
  });

  test("Logo Snapshot", async ({ page }) => {
    await expect(page.locator("#nava")).toMatchAriaSnapshot(`
      - link "PRODUCT STORE":
        - /url: index.html
        - img
      `);
  });

  test("Category Menu Snapshot", async ({ page }) => {
    await expect(page.locator("#contcont")).toMatchAriaSnapshot(`
      - link "CATEGORIES":
        - /url: ""
      - link "Phones":
        - /url: "#"
      - link "Laptops":
        - /url: "#"
      - link "Monitors":
        - /url: "#"
      `);
  });

  test("Footer Snapshot", async ({ page }) => {
    await expect(page.locator("#footc")).toMatchAriaSnapshot(`
      - heading "About Us" [level=4]
      - paragraph: We believe performance needs to be validated at every stage of the software development cycle and our open source compatible, massively scalable platform makes that a reality.
      - heading "Get in Touch" [level=4]
      - paragraph: "/Address: \\\\d+ El Camino Real/"
      - paragraph: "/Phone: \\\\+\\\\d+ \\\\d+/"
      - paragraph: "Email: demo@blazemeter.com"
      - heading "PRODUCT STORE" [level=4]:
        - img
      `);
  });
});
