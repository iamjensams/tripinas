import { test, expect } from '../fixtures/fixtures';
import { AccountPage } from '../pages/accountPage';

test.describe('Account Details Tests', () => {
  test('should display account details correctly', async ({ loggedInPage }) => {
    const page = loggedInPage;
    const accountPage = new AccountPage(page);

    await accountPage.openAccountDetails();

    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('dialog')).toContainText('Profile details');
    await expect(page.getByRole('dialog')).toContainText('Juan Dela Cruz');
    await expect(page.getByRole('dialog')).toContainText('regietest@email.com');
  });
});
