import {test,expect} from "@playwright/test"
import { Console, time } from "console"
import * as dotenv from 'dotenv'
import { CheckoutPage } from "../page/CheckOut"
dotenv.config({path:"./config/.env"})

test.describe("Checkout Feature",()=>{
    test.beforeAll(()=>{
        console.log("Checkout Test Cases are About to Start");
    })

    test.afterAll(()=>{
        console.log("Checkout Test Cases are Done");
    })

    test.afterEach(()=>{
        console.log("A Checkout Test Case is About to End")

    })
    test.describe('Checkout Step One Tests', () => {

  test.beforeEach(async ({ page }) => {
    console.log("A Checkout Step One Test Case is About to Run");
    await page.goto(process.env.Base_URL!);
    const login1 = new CheckoutPage(page);
    await login1.doCheckout("standard_user", "secret_sauce");
    await page.locator('[data-test="checkout"]').click();
    expect(page.url()).toBe(process.env.Checkout_One_URL!);
  });

  test('Check Checkout Page Title', async ({ page }) => {
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Your Information');
  });

  const inputs = [
    { firstName: "Ali", lastName: "Alshahrani", postalCode: "123456" },
    { firstName: "علي", lastName: "Alshahrani", postalCode: "123456" },
    { firstName: "##&^#}?>", lastName: "Alshahrani", postalCode: "123456" },
    { firstName: "123214", lastName: "Alshahrani", postalCode: "123456" },
    { firstName: "Ali", lastName: "الشهراني", postalCode: "123456" },
    { firstName: "Ali", lastName: "##&^#}?", postalCode: "123456" },
    { firstName: "Ali", lastName: "64363353", postalCode: "123456" },
    { firstName: "Ali", lastName: "Alshahrani", postalCode: "jaber" },
    { firstName: "Ali", lastName: "Alshahrani", postalCode: "جابر" },
    { firstName: "Ali", lastName: "Alshahrani", postalCode: "##&^#}?" },
  ];

  for (const { firstName, lastName, postalCode } of inputs) {
    test(`Valid: ${firstName} ${lastName} ${postalCode}`, async ({ page }) => {
      await page.locator('[data-test="firstName"]').fill(firstName);
      await page.waitForTimeout(500);
      await page.locator('[data-test="lastName"]').fill(lastName);
      await page.waitForTimeout(500);
      await page.locator('[data-test="postalCode"]').fill(postalCode);
      await page.waitForTimeout(500);
      await page.locator('[data-test="continue"]').click();
      await expect(page.url()).toBe(process.env.Checkout_Two_URL!);
      await expect(page.locator('[data-test="shopping-cart-link"]')).toHaveText("1");
    });
  }

  test('Invalid: empty first name', async ({ page }) => {
    await page.locator('[data-test="firstName"]').fill("");
    await page.waitForTimeout(500);
    await page.locator('[data-test="lastName"]').fill("Alshahrani");
    await page.waitForTimeout(500);
    await page.locator('[data-test="postalCode"]').fill("123456");
    await page.waitForTimeout(500);
    await page.locator('[data-test="continue"]').click();
    await expect(page.url()).toBe(process.env.Checkout_One_URL!);
    await expect(page.locator('[data-test="error"]')).toContainText("Error: First Name is required");
  });

  test('Invalid: empty last name', async ({ page }) => {
    await page.locator('[data-test="firstName"]').fill("Ali");
    await page.waitForTimeout(500);
    await page.locator('[data-test="lastName"]').fill("");
    await page.waitForTimeout(500);
    await page.locator('[data-test="postalCode"]').fill("123456");
    await page.waitForTimeout(500);
    await page.locator('[data-test="continue"]').click();
    await expect(page.url()).toBe(process.env.Checkout_One_URL!);
    await expect(page.locator('[data-test="error"]')).toContainText("Error: Last Name is required");
  });

  test('Invalid: empty postal code', async ({ page }) => {
    await page.locator('[data-test="firstName"]').fill("Ali");
    await page.waitForTimeout(500);
    await page.locator('[data-test="lastName"]').fill("Alshahrani");
    await page.waitForTimeout(500);
    await page.locator('[data-test="postalCode"]').fill("");
    await page.waitForTimeout(500);
    await page.locator('[data-test="continue"]').click();
    await expect(page.url()).toBe(process.env.Checkout_One_URL!);
    await expect(page.locator('[data-test="error"]')).toContainText("Error: Postal Code is required");
  });

  test('Invalid: empty first and last name', async ({ page }) => {
    await page.locator('[data-test="firstName"]').fill("");
    await page.waitForTimeout(500);
    await page.locator('[data-test="lastName"]').fill("");
    await page.waitForTimeout(500);
    await page.locator('[data-test="postalCode"]').fill("123456");
    await page.waitForTimeout(500);
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText("Error: First Name is required");
  });

  test('Invalid: empty first name and postal code', async ({ page }) => {
    await page.locator('[data-test="firstName"]').fill("");
    await page.waitForTimeout(500);
    await page.locator('[data-test="lastName"]').fill("Alshahrani");
    await page.waitForTimeout(500);
    await page.locator('[data-test="postalCode"]').fill("");
    await page.waitForTimeout(500);
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText("Error: First Name is required");
  });

  test('Invalid: empty last name and postal code', async ({ page }) => {
    await page.locator('[data-test="firstName"]').fill("Ali");
    await page.waitForTimeout(500);
    await page.locator('[data-test="lastName"]').fill("");
    await page.waitForTimeout(500);
    await page.locator('[data-test="postalCode"]').fill("");
    await page.waitForTimeout(500);
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText("Error: Last Name is required");
  });

  test('Invalid: all fields empty', async ({ page }) => {
    await page.locator('[data-test="firstName"]').fill("");
    await page.waitForTimeout(500);
    await page.locator('[data-test="lastName"]').fill("");
    await page.waitForTimeout(500);
    await page.locator('[data-test="postalCode"]').fill("");
    await page.waitForTimeout(500);
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText("Error: First Name is required");
  });

  test('Canceling checkout redirects to cart', async ({ page }) => {
    await page.waitForTimeout(500);
    await page.locator('[data-test="cancel"]').click();
    await expect(page.url()).toBe(process.env.Cart_URL!);
  });

  test('Completing checkout redirects to step two', async ({ page }) => {
    await page.locator('[data-test="firstName"]').fill("Ali");
    await page.waitForTimeout(500);
    await page.locator('[data-test="lastName"]').fill("Alshahrani");
    await page.waitForTimeout(500);
    await page.locator('[data-test="postalCode"]').fill("123456");
    await page.waitForTimeout(500);
    await page.locator('[data-test="continue"]').click();
    await expect(page.url()).toBe(process.env.Checkout_Two_URL!);
  });
});


test.describe('Checkout Step Two Tests', () => {
    test.beforeEach(async ({ page }) => {
    console.log("A Checkout Step Two Test Case is About to Run");
    await page.goto(process.env.Base_URL!);
    const login1 = new CheckoutPage(page);
    await login1.doCheckout("standard_user", "secret_sauce");
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill("Ali");
    await page.locator('[data-test="lastName"]').fill("Alshahrani");
    await page.locator('[data-test="postalCode"]').fill("123456");
    await page.locator('[data-test="continue"]').click();
    expect(page.url()).toBe(process.env.Checkout_Two_URL!);
  });

  test('Check Checkout Step Two Page Title', async ({ page }) => {
      await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Overview');
      await expect(page.locator('[data-test="shopping-cart-link"]')).toHaveText("1");
    
  });
  test('Check Cancel button should direct us to inventory page', async ({ page }) => {
    await expect(page.locator('[data-test="cancel"]')).toBeVisible();
    await page.waitForTimeout(500);
    await page.locator('[data-test="cancel"]').click();
    await page.waitForTimeout(500);
    await expect(page).toHaveURL(process.env.Inventory_URL!);
    await expect(page.locator('[data-test="shopping-cart-link"]')).toHaveText("1");
  });
  test('Check Finish button should redirect to checkout complete page', async ({ page }) => {
  await expect(page.locator('[data-test="finish"]')).toBeVisible();
  await page.waitForTimeout(500);
  await page.locator('[data-test="finish"]').click();
  await page.waitForTimeout(500);
  await expect(page).toHaveURL(process.env.Checkout_Complete!);
});
test('Clicking on "Sauce Labs Bike Light" should redirect to item details page', async ({ page }) => {

  await expect(page.locator('[data-test="item-0-title-link"]')).toBeVisible();
  await page.waitForTimeout(500);
  await page.locator('[data-test="item-0-title-link"]').click();
  await page.waitForTimeout(500);
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=0');
  await expect(page.locator('[data-test="shopping-cart-link"]')).toHaveText("1");
  
});
test('Check if the Item Is Sauce Labs Bike Light', async ({ page }) => {
  await expect(page.locator('[data-test="item-0-title-link"]')).toHaveText('Sauce Labs Bike Light');
  await expect(page.locator('[data-test="shopping-cart-link"]')).toHaveText("1");
});
test('Check if Description of Sauce Labs Bike Light Is match To expected text', async ({ page }) => {
  await expect(page.locator('[data-test="inventory-item-desc"]')).toHaveText(
    "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included."
  );
  await expect(page.locator('[data-test="shopping-cart-link"]')).toHaveText("1");
});
test('Check If The Price Of Sauce Labs Bike Light Is $9.99', async ({ page }) => {
  await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText('$9.99');
  await expect(page.locator('[data-test="shopping-cart-link"]')).toHaveText("1");
});

test('Check if Total Price IS "Total: $10.79"', async ({ page }) => {
  await expect(page.locator('[data-test="total-label"]')).toHaveText('Total: $10.79');
  await expect(page.locator('[data-test="shopping-cart-link"]')).toHaveText("1");
});


  });

test.describe('Checkout Complete Tests', () => {
    test.beforeEach(async ({ page }) => {
    console.log("A Checkout Step Two Test Case is About to Run");
    await page.goto(process.env.Base_URL!);
    const login1 = new CheckoutPage(page);
    await login1.doCheckout("standard_user", "secret_sauce");
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill("Ali");
    await page.locator('[data-test="lastName"]').fill("Alshahrani");
    await page.locator('[data-test="postalCode"]').fill("123456");
    await page.locator('[data-test="continue"]').click();
    await page.locator('[data-test="finish"]').click();
    await expect(page.url()).toBe(process.env.Checkout_Complete!);

  });
test('Check Checkout Step Two Page Title', async ({ page }) => {
      await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Complete!');});
  
test('Check If The Open Menu button Is visible', async ({ page }) => {
  await expect(page.getByRole('button', { name: 'Open Menu' })).toBeVisible();
});

test('Check Shopping Cart Link is Visible', async ({ page }) => {
  await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();
});
test('Check Image is Visible', async ({ page }) => {
  await expect(page.locator('[data-test="pony-express"]')).toBeVisible();
});
test('Check Complete Header Text', async ({ page }) => {
  await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
});

test('Check Complete Text Message', async ({ page }) => {
  await expect(page.locator('[data-test="complete-text"]')).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
});

test('Check Back Home Button Text', async ({ page }) => {
  await expect(page.locator('[data-test="back-to-products"]')).toHaveText('Back Home');
});
test('Check Back Home Button Redirects to Inventory Page', async ({ page }) => {
  await page.locator('[data-test="back-to-products"]').click();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

  });
})

