import { test, expect } from '@playwright/test';

test.describe('Sign-up Tests', () => {
  
  test('should display sign-up form correctly', async ({ page }) => {
    await page.goto('http://localhost:5173/sign-up');

    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - heading "Create your account" [level=1]
      - paragraph: Welcome! Please fill in the details to get started.
      - text: First name Optional
      - textbox "First name"
      - text: Last name Optional
      - textbox "Last name"
      - text: Username
      - textbox "Username"
      - text: Email address
      - textbox "Email address"
      - text: Password
      - textbox "Password"
      - button "Continue"
    `);
  });

  test('should show error for duplicate email', async ({ page }) => {
    await page.goto('http://localhost:5173/sign-up');
    await page.getByRole('textbox', { name: 'First name' }).fill('Jens');
    await page.getByRole('textbox', { name: 'Last name' }).fill('Samonte');
    await page.getByRole('textbox', { name: 'Username' }).fill('jensamtest');
    await page.getByRole('textbox', { name: 'Email address' }).fill('hpsam2009@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('jensamtest123');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.locator('#error-emailAddress')).toContainText(
      'That email address is taken'
    );
  });

  test('should successfully register with a fresh email', async ({ page }) => {
    await page.goto('http://localhost:5173/sign-up');
    await page.getByRole('textbox', { name: 'First name' }).fill('Jens');
    await page.getByRole('textbox', { name: 'Last name' }).fill('Samonte');
    await page.getByRole('textbox', { name: 'Username' }).fill('jensamtest2');
    await page.getByRole('textbox', { name: 'Email address' }).fill(`test${Date.now()}@mail.com`);
    await page.getByRole('textbox', { name: 'Password' }).fill('jensamtest123');
    await page.getByRole('button', { name: 'Continue' }).click();

    // Example: check redirect (depends on your app’s flow)
    await expect(page).toHaveURL(/.*dashboard/);
  });
});
