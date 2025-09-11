import { Page } from '@playwright/test';

export class AccountPage {
  constructor(private page: Page) {}

  async openAccountDetails() {
    await this.page.getByRole('button', { name: 'Open user button' }).click();
    await this.page.getByRole('menuitem', { name: 'Manage account' }).click();
  }
}
