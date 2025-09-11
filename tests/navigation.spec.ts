import { test, expect } from '@playwright/test';
import { SignInPage } from '../pages/signInPage';
import { DashboardPage } from '../pages/dashboardPage';

test.describe('Navigation Tests', () => {

  test.beforeEach(async ({ page }) => {
    const signIn = new SignInPage(page);
    await signIn.goto();
    await signIn.login('regietest', 'regietest');
    await expect(page).toHaveURL(/dashboard/);
  });

  test('should navigate to dashboard', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.assertOnDashboard();
  });

  test('should allow logout and redirect to sign-in', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.logout();
    await expect(page).toHaveURL(/sign-in/);
  });

});
