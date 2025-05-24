import {expect, Locator, Page} from "@playwright/test"
import * as dotenv from "dotenv"

dotenv.config({path:"./config/.env"})

export class LoginPage {
    usernameInput:Locator;
    passwordInput:Locator;
    loginButton:Locator;
    constructor(private page: Page){
        this.usernameInput=this.page.locator('[data-test="username"]');
        this.passwordInput=this.page.locator('[data-test="password"]');
        this.loginButton=this.page.locator('[data-test="login-button"]');
    }

    async Login(username:string,password:string){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await expect(this.page.url()).toBe(process.env.Inventory_URL);
    }


}