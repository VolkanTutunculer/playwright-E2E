import { test as base } from '@playwright/test';

type MyFixture = {
  hello: string
}

// We're re-identifiying Playwright test with an additional hello fixture
export const test = base.extend<MyFixture>({
  hello: async({}, use) => {
    const greeting = 'Hello from fixture';
    await use(greeting);
  }
})