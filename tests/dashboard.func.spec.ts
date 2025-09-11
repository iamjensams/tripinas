import { test, expect } from '../fixtures/fixtures';
import { DashboardPage } from '../pages/dashboardPage';

test.describe('Dashboard Functional Tests', () => {
  test('should display dashboard heading', async ({ loggedInPage }) => {
    const page = loggedInPage;
    const dashboardPage = new DashboardPage(page);

    await dashboardPage.assertOnDashboard();
  });
});
