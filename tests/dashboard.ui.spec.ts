import { test, expect } from '@playwright/test';
import { SignInPage } from '../pages/signInPage';
import { DashboardPage } from '../pages/dashboardPage';

test.describe('Dashboard UI Snapshot Tests', () => {
  test('should match ARIA structure of dashboard after login', async ({ page }) => {
    const signIn = new SignInPage(page);
    await signIn.goto();
    await signIn.login('regietest', 'regietest');

    const dashboard = new DashboardPage(page);
    await dashboard.assertOnDashboard();

    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - banner:
        - heading "Dashboard Home" [level=1]
        - button "Open user button":
          - img "Juan Dela Cruz's logo"
      - heading "Profile" [level=3]
      - strong: "Name:"
      - text: Juan Dela Cruz
      - strong: "Username:"
      - text: regietest
      - strong: "Email:"
      - text: regietest@email.com
      - heading "Welcome to your admin dashboard!" [level=2]
      - paragraph: Here you can manage users, view analytics, and configure settings.
    `);

    await dashboard.logout();
  });
});
