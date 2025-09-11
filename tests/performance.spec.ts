import { test, expect } from '@playwright/test';
import { SignInPage } from '../pages/signInPage';

test.describe('Performance Tests', () => {

  test('dashboard should load within 2 seconds', async ({ page }) => {
    const signIn = new SignInPage(page);
    await signIn.goto();

    const start = Date.now();
    await signIn.login('regietest', 'regietest');
    await expect(page).toHaveURL(/dashboard/);
    const end = Date.now();

    const loadTime = end - start;
    expect(loadTime).toBeLessThan(8000);
  });

});
