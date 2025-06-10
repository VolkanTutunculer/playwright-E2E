import { test, expect } from "@playwright/test";

test.describe("Playwright 02 HomeWork", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(
            "https://www.techglobal-training.com/frontend/shopping-cart"
        );
    });

    test("Test Case 01 - Available Courses Section Validation", async ({ page }) => {
        await expect(page.locator("h1[class*='mt-']")).toHaveText("Available Courses");

        await expect(page.locator("div[class*='Project8_course']")).toHaveCount(3);

        const courses = await page.locator("div[class*='Project8_course']").all();
        for (const course of courses) {
            await expect(course.locator("p[class*='my-3']")).toHaveText("TechGlobal School");
        }

        const images = await page.locator("div>img[alt*='Course']").all();
        for (const image of images) {
            await expect(image).toBeVisible();
            await expect(image).toHaveAttribute("src");
        }

        const namesArr = [
            "SDET Course | Cypress Playwright",
            "Playwright Automation Testing",
            "Cypress Automation Course",
        ];

        const names = await page.locator("div>h3").all();
        for (const name of names) {
            expect(namesArr).toContain(await name.textContent());
        }

        const prices = await page.locator("p[data-testid*='full-price'] > strong").all();

        for (const price of prices) {
            const numPrice = (await price.textContent()) ?? "";
            const onlyPrice = numPrice.replace("$", "");
            expect(Number(onlyPrice)).toBeGreaterThan(0);
        }

        await expect(page.locator("#course-1 div>p>span")).toHaveAttribute("data-testid");
        await expect(page.locator("#course-2 div>p>span")).toHaveAttribute("data-testid");
        await expect(page.locator("#course-3 div>p>span")).toHaveCount(0);

        for (const course of courses) {
            const addToChartbutton = course.locator('button:has-text("Add to Cart")');
            await expect(addToChartbutton).toBeVisible();
            await expect(addToChartbutton).toBeEnabled();
            await expect(addToChartbutton).toHaveText("Add to Cart");
        }
    });

    test("Test Case 02 - Cart Section Validation", async ({ page }) => {
        await expect(page.locator("p[class=mb-2]")).toHaveText("Items Added to Cart");

        await expect(page.locator("#total-price")).toHaveText("Total: $0");

        await expect(page.locator("button[class*=is-flex]")).toHaveText("Place Order");
        await expect(page.locator("button[class*=is-flex]")).toBeDisabled();
    });

    test("Test Case 03 - Add a Course to the Cart and Validate", async ({ page }) => {
        await page.locator("button[class*=is-primary]").first().click();

        const courseName = await page.locator("div>h3").first().textContent();
        const image = page.locator("div>img[alt='Course 1']").first();
        const imageSrc = await image.getAttribute("src");
        const priceInfoTxt = await page.locator("p[data-testid*='full-price'] > strong").first().textContent();
        const priceInfoNUm = Number(priceInfoTxt?.replace("$", ""));

        const discountLocator = page.locator("span[data-testid='discount']").first();
        const discountPercText = (await discountLocator.count()) > 0 ? await discountLocator.first().textContent() : null;

        let discount = 0;
        if (discountPercText) {
            discount = Number(discountPercText.replace("%", "").replace("Discount", "").trim());
        }

        await expect(page.locator("div[class*='course-card'][class*='Project8_']")).toBeVisible();
        await expect(page.locator("p[class*='has-text-black']")).toHaveText(`${courseName}`);
        await expect(page.locator("div[class*='course-card'][class*='Project8_'] > img")).toHaveAttribute("src", `${imageSrc}`);

        const cardPriceTxt = await page.locator("span[data-testid='final-price']").textContent();
        const cardPrice = Number(cardPriceTxt?.replace("$", ""));

        const calculatedPriceWDiscount = priceInfoNUm * (1 - discount / 100);
        expect(calculatedPriceWDiscount).toBe(cardPrice);

        await page.locator("button", { hasText: "Place Order" }).click();

        await expect(page.locator("div[class*='success']")).toHaveText("Your order has been placed.");
        await expect(page.locator("#total-price")).toHaveText("Total: $0");
    });

    type CourseData = {
        courseName: string;
        imageSrc: string;
        priceNum: number;
        discount: number;
    };

    test("Test Case 04 - Add Two Courses to the Cart and Validate", async ({ page }) => {
        const coursesCount = 2;
        const courseData: CourseData[] = [];

        for (let i = 0; i < coursesCount; i++) {
            await page.locator("button[class*=is-primary]").nth(i).click();

            const courseName = await page.locator("div>h3").nth(i).textContent() ?? "";
            const image = page.locator("div>img").nth(i);
            const imageSrc = await image.getAttribute("src") ?? "";
            const priceInfoTxt = await page.locator("p[data-testid*='full-price'] > strong").nth(i).textContent();
            const priceNum = Number(priceInfoTxt?.replace("$", ""));

            const discountLocator = page.locator("span[data-testid='discount']").nth(i);
            const discountPercText = (await discountLocator.count()) > 0 ? await discountLocator.textContent() : null;
            let discount = 0;
            if (discountPercText) {
                discount = Number(discountPercText.replace("%", "").replace("Discount", "").trim()) || 0;
            }
            courseData.push({ courseName, imageSrc, priceNum, discount });
        }

        const courseCards = page.locator("div[class*='course-card'][class*='Project8_']");
        await expect(courseCards).toHaveCount(coursesCount);

        for (let i = 0; i < coursesCount; i++) {
            await expect(courseCards.nth(i)).toBeVisible();
            await expect(courseCards.nth(i).locator("p.has-text-black")).toHaveText(courseData[i].courseName);
            await expect(courseCards.nth(i).locator("img")).toHaveAttribute("src", courseData[i].imageSrc);
        }

        const cardPriceTxts = await page.locator("span[data-testid='final-price']").allTextContents();
        const cardPrices = cardPriceTxts.map((txt) => Number(txt.replace("$", "")));

        for (let i = 0; i < coursesCount; i++) {
            const calculatedPrice = courseData[i].priceNum * (1 - courseData[i].discount / 100);
            expect(calculatedPrice).toBe(cardPrices[i]);
        }

        const totalPriceTxt = await page.locator("#total-price").textContent();
        const totalPriceNum = Number(totalPriceTxt?.replace("Total: $", ""));
        const expectedTotal = courseData.reduce((sum, c) => sum + c.priceNum * (1 - c.discount / 100), 0);
        expect(totalPriceNum).toBe(expectedTotal);

        await page.locator("button", { hasText: "Place Order" }).click();

        await expect(page.locator("div[class*='success']")).toHaveText("Your order has been placed.");
        await expect(page.locator("#total-price")).toHaveText("Total: $0");
    });

    test("Test Case 05 - Add All Three Courses to the Cart and Validate", async ({ page }) => {
        const coursesCount = 3;
        const courseData: CourseData[] = [];

        for (let i = 0; i < coursesCount; i++) {
            await page.locator("button[class*=is-primary]").nth(i).click();

            const courseName = await page.locator("div>h3").nth(i).textContent() ?? "";
            const image = page.locator("div>img").nth(i);
            const imageSrc = await image.getAttribute("src") ?? "";
            const priceInfoTxt = await page.locator("p[data-testid*='full-price'] > strong").nth(i).textContent();
            const priceNum = Number(priceInfoTxt?.replace("$", ""));

            const discountLocator = page.locator("span[data-testid='discount']").nth(i);
            const discountPercText = (await discountLocator.count()) > 0 ? await discountLocator.textContent() : null;
            let discount = 0;
            if (discountPercText) {
                discount = Number(discountPercText.replace("%", "").replace("Discount", "").trim()) || 0;
            };

            courseData.push({ courseName, imageSrc, priceNum, discount });
        }

        const courseCards = page.locator("div[class*='course-card'][class*='Project8_']");
        await expect(courseCards).toHaveCount(coursesCount);

        for (let i = 0; i < coursesCount; i++) {
            await expect(courseCards.nth(i)).toBeVisible();
            await expect(courseCards.nth(i).locator("p.has-text-black")).toHaveText(courseData[i].courseName);
            await expect(courseCards.nth(i).locator("img")).toHaveAttribute("src", courseData[i].imageSrc);
        }

        const cardPriceTxts = await page.locator("span[data-testid='final-price']").allTextContents();
        const cardPrices = cardPriceTxts.map((txt) => Number(txt.replace("$", "")));

        for (let i = 0; i < coursesCount; i++) {
            const calculatedPrice = courseData[i].priceNum * (1 - courseData[i].discount / 100);
            expect(calculatedPrice).toBe(cardPrices[i]);
        }
        const totalPriceTxt = await page.locator("#total-price").textContent();
        const totalPriceNum = Number(totalPriceTxt?.replace("Total: $", ""));
        const expectedTotal = courseData.reduce((sum, c) => sum + c.priceNum * (1 - c.discount / 100), 0);
        expect(totalPriceNum).toBe(expectedTotal);

        await page.locator("button", { hasText: "Place Order" }).click();

        await expect(page.locator("div[class*='success']")).toHaveText("Your order has been placed.");
        await expect(page.locator("#total-price")).toHaveText("Total: $0");
    });
});
