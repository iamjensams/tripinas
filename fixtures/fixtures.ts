import { test as base, expect } from '@playwright/test';

/**
 * Extend Playwright's base test with reusable fixtures.
 * You can add things like:
 *  - loggedInPage (to reuse a login state)
 *  - API setup
 *  - test data
 */
export const test = base.extend({
  // Example: logged-in fixture
  loggedInPage: async ({ page }, use) => {
    // Go to sign-in page
    await page.goto('http://localhost:5173/sign-in');

    // Perform login
    await page.getByRole('textbox', { name: 'Email address or username' }).fill('regietest');
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('regietest');
    await page.getByRole('button', { name: 'Continue' }).click();

    // Use logged-in page in the test
    await use(page);
  },
});

export { expect };
