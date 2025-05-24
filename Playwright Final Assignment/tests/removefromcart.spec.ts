import {test,expect} from "@playwright/test"
import * as dotenv from "dotenv"
import { LoginPage } from "../page/LoginPage";
import { CheckoutPage } from "../page/CheckOut";

dotenv.config({path:"./config/enc"});

test.describe("Remove From Cart Test Cases",()=>{
    
    test.beforeAll( ()=>{
        console.log("Remove from Cart Test Cases are About to Start");
    })
    
    test.afterAll(()=>{
        console.log("Remove from Cart Test Cases are Done");

    })

    test.afterEach(()=>{
        console.log("A Remove from Cart Test Case is About to End");

    })
        
    test.describe("Remove From Cart with standard_user",()=>{

        test.beforeEach(async({page})=>{
        console.log("A Remove from Cart Test Case is About to Start");
        await page.goto(process.env.Base_URL!);

        })
        
        test("Remove One Item in Cart", async ({page})=>{
        const checkout=new CheckoutPage(page);
        await checkout.doCheckout("standard_user","secret_sauce")
        await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
        await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeHidden();

        })
        test("Test Removing Multiple Items from Cart",async({page})=>{
        const loginpage=new LoginPage(page);
        loginpage.Login("standard_user","secret_sauce");
        const Locators=[
        {item:"sauce-labs-bolt-t-shirt"},
        {item:"sauce-labs-fleece-jacket"},
        {item:"sauce-labs-onesie"}
        ]
        const Items=[
        {name:"Sauce Labs Bolt T-Shirt",price:"$15.99",number:"1"},
        {name:"Sauce Labs Fleece Jacket",price:"$49.99",number:"5"},
        {name:"Sauce Labs Onesie",price:"$7.99",number:"2"}
        ]

        for(const {item} of Locators){
        await page.locator(`[data-test="add-to-cart-${item}"]`).click();
        }

        await page.locator('[data-test="shopping-cart-link"]').click();

        for (const {name,number} of Items){
        await expect(page.locator(`[data-test="item-${number}-title-link"]`)).toHaveText(name);
        }

        for(const {item} of Locators){
        await page.locator(`[data-test="remove-${item}"]`).click();
        await page.waitForTimeout(500);
        }
        })

        test("Test Removing an Item from Inventory Page",async({page})=>{
        const loginpage=new LoginPage(page);
        await loginpage.Login("standard_user","secret_sauce");
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.waitForTimeout(500);
        await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toHaveText("Remove");
        await page.waitForTimeout(500);
        await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
        await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toHaveText("Add to cart");
    })
        test("Check if Button Become Add to cart After You Remove Item",async({page})=>{
        const loginpage=new LoginPage(page);
        await loginpage.Login("standard_user","secret_sauce");
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
        await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toHaveText("Add to cart");
        })

        test("Check Removing Item from the Item Page",async({page})=>{
        const loginpage=new LoginPage(page);
        await loginpage.Login("standard_user","secret_sauce");
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.waitForTimeout(500);
        await page.locator('[data-test="item-4-title-link"]').click();
        await expect(page.url()).toBe("https://www.saucedemo.com/inventory-item.html?id=4");
        await page.waitForTimeout(500);
        await expect(page.locator('[data-test="remove"]')).toHaveText("Remove");
        await page.locator('[data-test="remove"]').click();
        await page.waitForTimeout(500);
        await expect(page.locator('[data-test="add-to-cart"]')).toHaveText("Add to cart");
        })

        test("Remove Item from Item page but from Cart",async({page})=>{
        const loginpage=new LoginPage(page);
        await loginpage.Login("standard_user","secret_sauce");
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.waitForTimeout(500);
        await page.locator('[data-test="shopping-cart-link"]').click();
        await page.waitForTimeout(500);
        await page.locator('[data-test="item-4-title-link"]').click();
        await page.waitForTimeout(500);
        await expect(page.locator('[data-test="remove"]')).toHaveText("Remove");
        await page.waitForTimeout(500);
        await page.locator('[data-test="remove"]').click();
        await expect(page.locator('[data-test="add-to-cart"]')).toHaveText("Add to cart");
        })

        test("Remove Item from Item page but from Checkout Page",async({page})=>{
        const checkout=new CheckoutPage(page);
        await checkout.doCheckout("standard_user","secret_sauce");
        await page.locator('[data-test="checkout"]').click();
        await page.waitForTimeout(500);
        await page.locator('[data-test="firstName"]').fill("Jaber");
        await page.locator('[data-test="lastName"]').fill("Allawnah");
        await page.locator('[data-test="postalCode"]').fill("9700");
        await page.waitForTimeout(500);
        await page.locator('[data-test="continue"]').click();
        await page.waitForTimeout(500);
        await page.locator('[data-test="item-0-title-link"]').click();
        await page.waitForTimeout(500);
        await expect(page.locator('[data-test="remove"]')).toHaveText("Remove");
        await page.waitForTimeout(500);
        await page.locator('[data-test="remove"]').click();
        await expect(page.locator('[data-test="add-to-cart"]')).toHaveText("Add to cart");
        });



    test.describe("Remove From Cart with problem_user",()=>{
        test.beforeEach(async({page})=>{
        console.log("A Remove from Cart Test Case is About to Start");
        await page.goto(process.env.Base_URL!);
        })

        test.fail("Remove Item from Inventory",async({page})=>{
            const loginpage=new LoginPage(page);
            await loginpage.Login("problem_user","secret_sauce");
            await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
            await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toHaveText("Remove");
            await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
            await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toHaveText("Add to cart");
        }
        )

        test("Remove Item from Cart",async({page})=>{
            const checkout=new CheckoutPage(page);
            await checkout.doCheckout("problem_user","secret_sauce");
            await page.waitForTimeout(500);
            await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
            await expect(page.locator('[data-test="inventory-item"]')).toBeHidden();
        
        })
    })

        //Bonus
        test.describe("Remove From Cart with error_user",()=>{
        test.beforeEach(async({page})=>{
        console.log("A Remove from Cart Test Case is About to Start");
        await page.goto(process.env.Base_URL!);
        })

        test.fail("Remove Item from Inventory",async({page})=>{
            const loginpage=new LoginPage(page);
            await loginpage.Login("error_user","secret_sauce");
            await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
            await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toHaveText("Remove");
            await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
            await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toHaveText("Add to cart");
        }
        )

        test("Remove Item from Cart",async({page})=>{
            const checkout=new CheckoutPage(page);
            await checkout.doCheckout("error_user","secret_sauce");
            await page.waitForTimeout(500);
            await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
            await expect(page.locator('[data-test="inventory-item"]')).toBeHidden();
        
        })
    })



})
})