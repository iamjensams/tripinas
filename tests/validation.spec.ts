import { test, expect } from '@playwright/test';
import { SignInPage } from '../pages/signInPage';

test.describe('Validation Tests', () => {

  test('should show error for empty username', async ({ page }) => {
    const signIn = new SignInPage(page);
    await signIn.goto();
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByText(/required/i)).toBeVisible();
  });

  test('should show error for empty password', async ({ page }) => {
    const signIn = new SignInPage(page);
    await signIn.goto();
    await signIn.login('regietest', '');
    await expect(page.getByText(/required/i)).toBeVisible();
  });

});
