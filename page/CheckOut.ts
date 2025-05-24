import { expect, Page } from '@playwright/test';
import { LoginPage } from './LoginPage';

export class CheckoutPage {

    loginPage: LoginPage;

    constructor(private page: Page) {

    this.loginPage = new LoginPage(page);
  }

  async doCheckout(username: string, password: string) {
    await this.loginPage.Login(username, password);
    await this.page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await this.page.locator('[data-test="shopping-cart-link"]').click();
    await expect(this.page.url()).toBe(process.env.Cart_URL!);
  }
}