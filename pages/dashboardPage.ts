import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly profileSection: Locator;
  readonly openUserButton: Locator;
  readonly signOutMenuItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Dashboard Home' });
    this.profileSection = page.getByRole('heading', { name: 'Profile' });
    this.openUserButton = page.getByRole('button', { name: 'Open user button' });
    this.signOutMenuItem = page.getByRole('menuitem', { name: 'Sign out' });
  }

  async goto() {
    await this.page.goto('http://localhost:5173/dashboard');
  }

  async assertOnDashboard() {
    await expect(this.heading).toBeVisible();
  }

  async viewProfile() {
    return this.profileSection;
  }

  async logout() {
    await this.openUserButton.click();
    await this.signOutMenuItem.click();
  }
}
