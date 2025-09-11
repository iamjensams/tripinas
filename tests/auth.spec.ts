import { test, expect } from '@playwright/test';
import { SignInPage } from '../pages/signInPage';

test.describe('Authentication Tests', () => {

  test('should sign in with valid credentials', async ({ page }) => {
    const signIn = new SignInPage(page);
    await signIn.goto();
    await signIn.login('regietest', 'regietest');
    await expect(page).toHaveURL(/dashboard/);
  });

  test('should reject invalid password', async ({ page }) => {
    const signIn = new SignInPage(page);
    await signIn.goto();
    await signIn.login('regietest', 'wrongpass');
    await expect(page.getByText(/Password is incorrect. Try again, or use another method/i)).toBeVisible();
  });

});
