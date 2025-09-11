import { Page } from '@playwright/test';

export class SignInPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('http://localhost:5173/sign-in');
  }

  async login(username: string, password: string) {
    await this.page.getByRole('textbox', { name: 'Email address or username' }).fill(username);
    await this.page.getByRole('button', { name: 'Continue' }).click();
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
    await this.page.getByRole('button', { name: 'Continue' }).click();
  }
}
