import {test,expect} from "@playwright/test"
import * as dotenv from "dotenv"
import { LoginPage } from "../page/LoginPage"
import { CheckoutPage } from "../page/CheckOut"

dotenv.config({path:"./config/.env"})

test.describe("Add to Cart Test Cases",()=>{
        test.beforeAll(()=>{
        console.log("Add to Cart Test Cases are About to Start");
    })

    test.afterAll(()=>{
        console.log("Add to Cart Test Cases are Done");
    })

    test.afterEach(()=>{
        console.log("An add to Cart Test Case is About to End")

    })
test.describe("Add to Cart Test Cases with Standard User",()=>{
    test.beforeEach(async({page})=>{
        console.log("An add to Cart Test Case with Standard User is About to Start")
        await page.goto(process.env.Base_URL!);
        const loginpage=new LoginPage(page);
        await loginpage.Login("standard_user","secret_sauce");
    })

    test("Check Cart Page Title ",async({page})=>{
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart');
    })
    
    test.describe("One Item Test Cases", ()=>{
    test("Check if Item Button has Add to Cart",async({page})=>{
        await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toHaveText("Add to cart")
        await page.waitForTimeout(500);
    })


    test("Add One Item in Cart", async ({page})=>{
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.waitForTimeout(500);
        await page.locator('[data-test="shopping-cart-link"]').click();
        await expect(page.url()).toBe(process.env.Cart_URL!);
        await expect(page.locator('[data-test="item-4-title-link"]')).toHaveText("Sauce Labs Backpack");
        await page.waitForTimeout(500);
    })

    test("Add One Item from Item Page",async({page})=>{
        await page.locator('[data-test="item-4-title-link"]').click();
        await expect(page.url()).toBe("https://www.saucedemo.com/inventory-item.html?id=4");
        await page.waitForTimeout(500);
        await expect(page.locator('[data-test="add-to-cart"]')).toHaveText("Add to cart");
        await page.locator('[data-test="add-to-cart"]').click();
        await page.waitForTimeout(500);
        await expect(page.locator('[data-test="remove"]')).toHaveText("Remove");

    })

    test("Check if Cart Icon has the Right Number",async({page})=>{
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="shopping-cart-link"]')).toHaveText("1");

    })


    test("Check if Button Become Remove After You Add Item",async({page})=>{
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toHaveText("Remove");

    })
    

    test("Check if Item is Still Present Even After Logout", async({page})=>{
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('[data-test="shopping-cart-link"]').click();
        await expect(page.url()).toBe(process.env.Cart_URL);
        await expect(page.locator('[data-test="item-4-title-link"]')).toHaveText("Sauce Labs Backpack");
        await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText("$29.99");
        await expect(page.locator('[data-test="item-quantity"]')).toHaveText("1");
        await page.getByRole('button', { name: 'Open Menu' }).click();
        await page.waitForTimeout(500);
        await page.locator('[data-test="logout-sidebar-link"]').click();
        await page.waitForTimeout(500);
        const loginpage= new LoginPage(page);
        loginpage.Login("standard_user","secret_sauce");
        await page.waitForTimeout(500);
        await page.locator('[data-test="shopping-cart-link"]').click();
        await expect(page.url()).toBe(process.env.Cart_URL);
        await expect(page.locator('[data-test="item-4-title-link"]')).toHaveText("Sauce Labs Backpack");
        await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText("$29.99");
        await expect(page.locator('[data-test="item-quantity"]')).toHaveText("1");
    })
    
    test("Check the Countinue Shopping Button",async({page})=>{
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('[data-test="shopping-cart-link"]').click();
        await expect(page.url()).toBe(process.env.Cart_URL!);
        await expect(page.locator('[data-test="continue-shopping"]')).toContainText("Continue Shopping");
        await page.waitForTimeout(500);
        await page.locator('[data-test="continue-shopping"]').click();
        await expect(page.url()).toBe("https://www.saucedemo.com/inventory.html");
    })

    })

    test.describe("Multiple Items Test Cases",()=>{
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
    test("Test Adding Multiple Items to Cart", async({page})=>{


        for(const {item} of Locators){
        await page.locator(`[data-test="add-to-cart-${item}"]`).click();
        await page.waitForTimeout(500);
        }

        await page.locator('[data-test="shopping-cart-link"]').click();

        for (const {name,price,number} of Items){
        await expect(page.locator(`[data-test="item-${number}-title-link"]`)).toHaveText(name);
        }

    })

    test("Check if Cart Icon has the Right Number",async({page})=>{
        for(const {item} of Locators){
        await page.locator(`[data-test="add-to-cart-${item}"]`).click();
        }

        await expect(page.locator('[data-test="shopping-cart-link"]')).toHaveText("3");
    })

    })
    })
    
    //Bonus Test cases 
    test.describe("Test Cart with problem_user", ()=>{
        test.beforeEach(async({page})=>{
            console.log("An add to Cart Test Case with Problem User is About to Start")
            await page.goto(process.env.Base_URL!);
            const loginProblem= new LoginPage(page);
            await loginProblem.Login("problem_user","secret_sauce");
        })

        test.fail("Test Add Item from Invenrtory", async({page})=>{
            await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
            await expect(page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]')).toHaveText("Remove");
        })

        test.fail("Test Add Item from Cart",async({page})=>{
            await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
            await page.locator('[data-test="shopping-cart-link"]').click();
            await expect(page.locator('[data-test="inventory-item"]')).toBeVisible();
     
        })
        
    })

        test.describe("Test Cart with error_user", ()=>{
        test.beforeEach(async({page})=>{
            console.log("An add to Cart Test Case with Problem User is About to Start")
            await page.goto(process.env.Base_URL!);
            const loginError= new LoginPage(page);
            await loginError.Login("problem_user","secret_sauce");
        })

        test.fail("Test Add Item from Invenrtory", async({page})=>{
            await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
            await expect(page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]')).toHaveText("Remove");
        })

        test.fail("Test Add Item from Cart",async({page})=>{
            await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
            await page.locator('[data-test="shopping-cart-link"]').click();
            await expect(page.locator('[data-test="inventory-item"]')).toBeVisible();
     
        })
        
    })

    test.describe("Test Cart with visual_user",()=>{
        test.beforeEach(async({page})=>{
            console.log("An add to Cart Test Case with Visual User is About to Start")
            await page.goto(process.env.Base_URL!);
            const loginvisual= new LoginPage(page);
            await loginvisual.Login("visual_user","secret_sauce");
        })

        test.fail("Add to Cart with visual_user",async({page})=>{
            await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
            await page.locator('[data-test="shopping-cart-link"]').click();
            await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText("$99.0")
            //Note that each time you refresh the page in the inventory, you will get a new price
        })
    })

    test.describe("Add to Cart with performance_glitch_user",()=>{
        test.beforeEach(async({page})=>{
            console.log("An add to Cart Test Case with Visual User is About to Start")
            await page.goto(process.env.Base_URL!);
            const loginvisual= new LoginPage(page);
            await loginvisual.Login("performance_glitch_user","secret_sauce");
        })
        test("Add item with performance_glitch_user",async({page})=>{
            
        })       
    })



})

