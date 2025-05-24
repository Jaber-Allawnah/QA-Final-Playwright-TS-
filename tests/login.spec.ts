import {test,expect} from "@playwright/test"
import * as dotenv from 'dotenv'

dotenv.config({path:'./config/.env'})

    //Grouping
test.describe("Login Page Test Cases",()=>{
    //Hooks
    test.beforeAll(()=>{
        console.log("Login Page Tests are About to Start");
    })

    test.afterAll(()=>{
        console.log("Login Page Tests are Done");
    })

    test.beforeEach(async ({page})=>{
        console.log("A Login Tets Cases is About to Run")
        await page.goto(process.env.Base_URL!);
        await expect(page).toHaveTitle('Swag Labs');
    })

    test.afterEach(async ()=>{
        console.log("A Login Test Case is Done");
    })


    const users=[
        {username:'standard_user',password:'secret_sauce'},
        {username:'visual_user',password:'secret_sauce'},
        {username:'problem_user',password:'secret_sauce'},
        {username:'error_user',password:'secret_sauce'},
        {username:'performance_glitch_user',password:'secret_sauce'},
    ]

    for(const {username,password} of users){
    test(`Login with Valid Username ${username} and Password ${password}`,async({page})=>{
        await page.locator('[data-test="username"]').fill(username);
        await page.locator('[data-test="password"]').fill(password);
        await page.waitForTimeout(500);
        await page.locator('[data-test="login-button"]').click();
        await page.waitForTimeout(500);
        await expect(page.url()).toBe(process.env.Inventory_URL!);
    })
    }



    test("Login with Invalid Username and a Valid Password", async({page})=>{
        await page.locator('[data-test="username"]').fill("Jaber");
        await page.waitForTimeout(500);
        await page.locator('[data-test="password"]').fill("secret_sauce");
        await page.waitForTimeout(500);
        await page.locator('[data-test="login-button"]').click();
        await expect(page.locator('[data-test="error"]')).toBeVisible();
        await expect(page.locator('[data-test="error"]')).toContainText("Username and password do not match any user in this service");

    }
    )

    const randomInputs = [
        {username:"121433",password:"123456"},
        {username:"$#$%@",password:"%#%#$"},
        {username:"جابر",password:"12432"},
        {username:"121433",password:"$!!$#"},
        {username:"$#$%@",password:"534535"},
        {username:"جابر",password:"$#%#$%"},
        {username:"121433",password:"ابراهيم"},
        {username:"$#$%@",password:"احمد"},
        {username:"جابر",password:"محمد"},
    ]
    for(const {username,password} of randomInputs){
        test(`Login with Special Characters ${username} and Password ${password}`,async({page})=>{
            await page.locator('[data-test="username"]').fill(username);
            await page.waitForTimeout(500);
            await page.locator('[data-test="password"]').fill(password);
            await page.waitForTimeout(500);
            await page.locator('[data-test="login-button"]').click();
            await expect(page.locator('[data-test="error"]')).toBeVisible();
            await expect(page.locator('[data-test="error"]')).toContainText("Username and password do not match any user in this service");
        })
    }


    
    test("Login with Valid Username and an Invalid Password",async({page})=>{
        await page.locator('[data-test="username"]').fill("standard_user");
        await page.waitForTimeout(500);
        await page.locator('[data-test="password"]').fill('12345');
        await page.waitForTimeout(500)
        await page.locator('[data-test="login-button"]').click();
        await expect(page.locator('[data-test="error"]')).toBeVisible();
        await expect(page.locator('[data-test="error"]')).toContainText("Username and password do not match any user in this service");
    }
    )

    test("Login with Invalid Username and Invalid Password",async ({page})=>{
        await page.locator('[data-test="username"]').fill("Ibrahim");
        await page.waitForTimeout
        await page.locator('[data-test="password"]').fill("12345");
        await page.waitForTimeout(500);
        await page.locator('[data-test="login-button"]').click();
        await expect(page.locator('[data-test="error"]')).toBeVisible();
        await expect(page.locator('[data-test="error"]')).toContainText("Username and password do not match any user in this service");

    })

    test("Login with Empty Username and Password",async ({page})=>{
        await page.locator('[data-test="username"]').fill("");
        await page.waitForTimeout(500);
        await page.locator('[data-test="password"]').fill("");
        await page.waitForTimeout(500);
        await page.locator('[data-test="login-button"]').click();
        await expect(page.locator('[data-test="error"]')).toBeVisible();
        await expect(page.locator('[data-test="error"]')).toContainText("Username is required");
    })

    test("Login with an Empty Username and a Valid Password",async ({page})=>{
        await page.locator('[data-test="username"]').fill("");
        await page.waitForTimeout(500);
        await page.locator('[data-test="password"]').fill("secret_sauce");
        await page.waitForTimeout(500);
        await page.locator('[data-test="login-button"]').click();
        await expect(page.locator('[data-test="error"]')).toBeVisible();
        await expect(page.locator('[data-test="error"]')).toContainText("Username is required");

    })

    test("Login with a Valid Username and an Empty Password",async ({page})=>{
        await page.locator('[data-test="username"]').fill("standard_user");
        await page.waitForTimeout(500);
        await page.locator('[data-test="password"]').fill("");
        await page.waitForTimeout(500);
        await page.locator('[data-test="login-button"]').click();
        await expect(page.locator('[data-test="error"]')).toBeVisible();
        await expect(page.locator('[data-test="error"]')).toContainText("Password is required"); 
    })

    test("Login with an Empty Username and an Invalid Password",async({page})=>{
        await page.locator('[data-test="username"]').fill("");
        await page.waitForTimeout(500);
        await page.locator('[data-test="password"]').fill("12345");
        await page.waitForTimeout(500);
        await page.locator('[data-test="login-button"]').click();
        await expect(page.locator('[data-test="error"]')).toBeVisible();
        await expect(page.locator('[data-test="error"]')).toContainText("Username is required");
    }
    )

    test("Login with an Invalid Username and an Empty Password",async({page})=>{
        await page.locator('[data-test="username"]').fill("Jaber");
        await page.waitForTimeout(500);
        await page.locator('[data-test="password"]').fill("");
        await page.waitForTimeout(500);
        await page.locator('[data-test="login-button"]').click();
        await expect(page.locator('[data-test="error"]')).toBeVisible();
        await expect(page.locator('[data-test="error"]')).toContainText("Password is required");
    }
    )


    //Bonus

    test("Login with locked_out Username", async({page})=>{
        await page.locator('[data-test="username"]').fill("locked_out_user");
        await page.waitForTimeout(500);
        await page.locator('[data-test="password"]').fill("secret_sauce");
        await page.locator('[data-test="login-button"]').click();
        await expect(page.locator('[data-test="error"]')).toBeVisible();
        await expect(page.locator('[data-test="error"]')).toContainText("this user has been locked out");
    })



})