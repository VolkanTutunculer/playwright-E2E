import { Page, Locator, expect } from "@playwright/test";

export class CoursesPage {
    readonly page: Page;
    readonly courseListe: Locator;
    readonly addToCartButtons: Locator;
    readonly totalPrice: Locator;
    readonly placeOrderButton: Locator;
    readonly successMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.courseListe = page.locator("div[class*='Project8_course']");
        this.addToCartButtons = page.locator("button[class*=is-primary]");
        this.totalPrice = page.locator("#total-price");
        this.placeOrderButton = page.locator("button", { hasText: "Place Order" });
        this.successMessage = page.locator("div[class*='success']");
    }

    async goto() {
        await this.page.goto("https://www.techglobal-training.com/frontend/shopping-cart");
    }

    async validateAvailableCoursesSection() {
        await expect(this.page.locator("h1[class*='mt-']")).toHaveText("Available Courses");
        await expect(this.courseListe).toHaveCount(3);

        const courses = await this.courseListe.all();
        for (const course of courses) {
            await expect(course.locator("p[class*='my-3']")).toHaveText("TechGlobal School");
        }

        const images = await this.page.locator("div>img[alt*='Course']").all();
        for (const image of images) {
            await expect(image).toBeVisible();
            await expect(image).toHaveAttribute("src");
        }

        const expectedNames = [
            "SDET Course | Cypress Playwright",
            "Playwright Automation Testing",
            "Cypress Automation Course",
        ];
        const names = await this.page.locator("div>h3").all();
        for (const name of names) {
            expect(expectedNames).toContain(await name.textContent());
        }

        const prices = await this.page.locator("p[data-testid*='full-price'] > strong").all();
        for (const price of prices) {
            const text = (await price.textContent()) ?? "";
            expect(Number(text.replace("$", ""))).toBeGreaterThan(0);
        }

        await expect(this.page.locator("#course-1 div>p>span")).toHaveAttribute("data-testid");
        await expect(this.page.locator("#course-2 div>p>span")).toHaveAttribute("data-testid");
        await expect(this.page.locator("#course-3 div>p>span")).toHaveCount(0);

        for (const course of courses) {
            const addBtn = course.locator('button:has-text("Add to Cart")');
            await expect(addBtn).toBeVisible();
            await expect(addBtn).toBeEnabled();
            await expect(addBtn).toHaveText("Add to Cart");
        }
    }

    async validateCartSectionEmpty() {
        await expect(this.page.locator("p[class=mb-2]"))
            .toHaveText("Items Added to Cart");
        await expect(this.totalPrice).toHaveText("Total: $0");
        await expect(this.placeOrderButton).toBeDisabled();
    }

    async addCourseToCart(index: number) {
        await this.addToCartButtons.nth(index).click();
    }

    async getCourseData(index: number) {
        const courseName: string = await this.page.locator("div>h3").nth(index).textContent() ?? "";
        const image = this.page.locator("div>img").nth(index);
        const imageSrc: string = await image.getAttribute("src") ?? "";
        const priceText = await this.page.locator("p[data-testid*='full-price'] > strong").nth(index).textContent();
        const price: number = Number(priceText?.replace("$", "")) || 0;

        const discountLocator = this.page.locator("span[data-testid='discount']").nth(index);
        const discountText = (await discountLocator.count()) > 0 ? await discountLocator.textContent() : null;

        let discount: number = 0;
        if (discountText) {
            const cleaned = discountText.replace("%", "").replace("Discount", "").trim();
            discount = Number(cleaned);
            if (isNaN(discount)) discount = 0;
        }

        return { courseName, imageSrc, price, discount };
    }

    async validateCartCourses(expectedCourses: any[]) {
        const cards = this.page.locator("div[class*='course-card'][class*='Project8_']");
        await expect(cards).toHaveCount(expectedCourses.length);

        for (let i = 0; i < expectedCourses.length; i++) {
            await expect(cards.nth(i)).toBeVisible();
            await expect(cards.nth(i).locator("p.has-text-black")).toHaveText(expectedCourses[i].courseName);
            await expect(cards.nth(i).locator("img")).toHaveAttribute("src", expectedCourses[i].imageSrc);
        }

        const priceTexts = await this.page.locator("span[data-testid='final-price']").allTextContents();
        const finalPrices = priceTexts.map(t => Number(t.replace("$", "")));

        for (let i = 0; i < finalPrices.length; i++) {
            const expected = expectedCourses[i].price * (1 - expectedCourses[i].discount / 100);
            expect(finalPrices[i]).toBe(expected);
        }

        const totalText = await this.totalPrice.textContent();
        const total = Number(totalText?.replace("Total: $", ""));
        const expectedTotal = expectedCourses.reduce((acc, cur) => acc + cur.price * (1 - cur.discount / 100), 0);
        expect(total).toBe(expectedTotal);
    }

    async placeOrderAndValidate() {
        await this.placeOrderButton.click();
        await expect(this.successMessage).toHaveText("Your order has been placed.");
        await expect(this.totalPrice).toHaveText("Total: $0");
    }
}

