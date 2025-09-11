import { test, expect, type Page } from '@playwright/test';

class SignInPage {
  readonly page: Page;
  readonly heading;
  readonly email;
  readonly password;
  readonly submitBtn;
  readonly forgotLink;
  readonly errorAlert;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: /sign in/i });
    this.email = page.getByLabel(/email/i);
    this.password = page.getByLabel(/password/i);
    this.submitBtn = page.getByRole('button', { name: /sign in/i });
    this.forgotLink = page.getByRole('link', { name: /forgot password|forgot/i });
    this.errorAlert = page.getByRole('alert');
  }

  async goto() {
    await this.page.goto('http://localhost:5173/sign-in');
    await expect(this.heading).toBeVisible();
  }

  async signIn(email: string, pwd: string) {
    await this.email.fill(email);
    await this.password.fill(pwd);
    await this.submitBtn.click();
  }
}

test.describe('Sign-In page tests (http://localhost:5173/sign-in)', () => {

  test.beforeAll(async () => {
    // suite-level setup (e.g. test user prepare via API) - placeholder
    console.log('Starting Sign-In test suite');
  });

  test.beforeEach(async ({ page }, testInfo) => {
    // start tracing for the Trace Viewer (captures screenshots & DOM snapshots)
    await page.context().tracing.start({ screenshots: true, snapshots: true, sources: true });
  });

  test.afterEach(async ({ page }, testInfo) => {
    const safeName = testInfo.title.replace(/[^\w\d]+/g, '_').slice(0, 200);
    // always capture a screenshot for debugging and attach trace
    await page.screenshot({ path: `test-results/screenshots/${safeName}.png`, fullPage: true });
    await page.context().tracing.stop({ path: `test-results/traces/${safeName}.zip` });

    // attach artifacts to the Playwright report
    await testInfo.attach('final-screenshot', {
      path: `test-results/screenshots/${safeName}.png`,
      contentType: 'image/png',
    });
    await testInfo.attach('trace', {
      path: `test-results/traces/${safeName}.zip`,
      contentType: 'application/zip',
    });
  });

  test('Valid credentials should sign in and redirect (smoke)', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'tag', description: 'smoke' });

    const signIn = new SignInPage(page);
    await signIn.goto();

    // short test data
    await signIn.signIn('testuser@example.com', 'Password1!');

    // assertion: confirm we left the sign-in page (basic redirect check)
    await expect(page).not.toHaveURL(/\/sign-in/);

    // assertion: confirm a likely post-login element (logout button) is visible
    const logoutBtn = page.getByRole('button', { name: /sign out|logout/i });
    await expect(logoutBtn).toBeVisible();
  });

  test('Invalid credentials should display an error (negative)', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'tag', description: 'negative' });

    const signIn = new SignInPage(page);
    await signIn.goto();

    await signIn.signIn('wrong@example.com', 'badpass');

    // expect an accessible error/alert to appear
    await expect(signIn.errorAlert).toBeVisible();
    await expect(signIn.errorAlert).toHaveText(/invalid|incorrect|unauthorized|failed/i);
  });

  test('Submitting empty fields shows validation (validation)', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'tag', description: 'validation' });

    const signIn = new SignInPage(page);
    await signIn.goto();

    // submit without filling fields
    await signIn.submitBtn.click();

    // assert inline/alert validation appears (generic match)
    await expect(signIn.errorAlert).toBeVisible();
    await expect(signIn.errorAlert).toHaveText(/required|please enter|cannot be empty/i);
  });

});
