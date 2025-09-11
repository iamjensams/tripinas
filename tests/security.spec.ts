import { test, expect } from '@playwright/test';
import { SignInPage } from '../pages/signInPage';

test.describe('Security Tests', () => {

  test('should not allow dashboard access without login', async ({ page }) => {
    await page.goto('http://localhost:5173/dashboard');

    // Instead of redirect, app shows a signed-out message on the dashboard
    await expect(page.getByText('You are signed out.')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Sign in' })).toBeVisible();
  });

  test('should prevent login with SQL injection', async ({ page }) => {
  const signIn = new SignInPage(page);
  await signIn.goto();
  await signIn.login(`' OR 1=1 --`, 'fakepass');

  // Check the signed-out state
  await expect(page.getByText('You are signed out.')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Sign in' })).toBeVisible();
});


});
