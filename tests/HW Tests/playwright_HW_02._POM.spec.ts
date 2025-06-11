import { test } from "@playwright/test";
import { CoursesPage } from "../../pages/Project02";

test.describe("Playwright 02 HomeWork", () => {
    test.beforeEach(async ({ page }) => {
        await new CoursesPage(page).goto();
    });


    test.describe("Playwright 02 Homework - POM Version", () => {
        test("Test Case 01 - Available Courses Section Validation", async ({ page }) => {
            const cart = new CoursesPage(page);

            await cart.validateAvailableCoursesSection();
        });

        test("Test Case 02 - Cart Section Validation", async ({ page }) => {
            const cart = new CoursesPage(page);

            await cart.validateCartSectionEmpty();
        });

        test("Test Case 03 - Add One Course", async ({ page }) => {
            const cart = new CoursesPage(page);


            await cart.addCourseToCart(0);
            const course = await cart.getCourseData(0);
            await cart.validateAddedCourses([course]);
            await cart.placeOrder();
        });

        test("Test Case 04 - Add Two Courses", async ({ page }) => {
            const cart = new CoursesPage(page);


            const data: { courseName: string; imageSrc: string; price: number; discount: number; }[] = [];

            for (let i = 0; i < 2; i++) {
                await cart.addCourseToCart(i);
                data.push(await cart.getCourseData(i));
            }

            await cart.validateAddedCourses(data);
            await cart.placeOrder();
        });

        test("Test Case 05 - Add All Courses", async ({ page }) => {
            const cart = new CoursesPage(page);


            const data: { courseName: string; imageSrc: string; price: number; discount: number; }[] = [];

            for (let i = 0; i < 3; i++) {
                await cart.addCourseToCart(i);
                data.push(await cart.getCourseData(i));
            }

            await cart.validateAddedCourses(data);
            await cart.placeOrder();
        });
    });
});