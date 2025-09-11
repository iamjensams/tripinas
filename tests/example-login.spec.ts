import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/sign-in');
  await expect(page.locator('#root')).toMatchAriaSnapshot(`
    - heading "Sign in to Tripinas" [level=1]
    - paragraph: Welcome back! Please sign in to continue
    - text: Email address or username
    - textbox "Email address or username"
    - text: Password
    - textbox "Password"
    - button "Show password":
      - img
    - button "Continue":
      - img
    - text: Don’t have an account?
    - link "Sign up":
      - /url: http://localhost:5173/sign-up
    - paragraph: Secured by
    - link "Clerk logo":
      - /url: https://go.clerk.com/components
      - img
    - paragraph: Development mode
    `);
  await page.getByRole('textbox', { name: 'Email address or username' }).click();
  await page.getByRole('textbox', { name: 'Email address or username' }).fill('regietest');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('regietest');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('button', { name: 'Open user button' }).click();
  await page.getByRole('menuitem', { name: 'Sign out' }).click();
});