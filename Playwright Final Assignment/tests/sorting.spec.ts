import {test,expect} from "@playwright/test"
import * as dotenv from 'dotenv'
dotenv.config({path:"./config/.env"})
import { LoginPage } from "../page/LoginPage"

test.describe("Sort Items",()=>{
test.beforeEach(async({page})=>{
        console.log("An add to Cart Test Case with Standard User is About to Start")
        await page.goto(process.env.Base_URL!);
        const loginpage=new LoginPage(page);
        await loginpage.Login("standard_user","secret_sauce");
    })

test('Check Sort Dropdown Is Visible', async ({ page }) => {
  await expect(page.locator('[data-test="product-sort-container"]')).toBeVisible();
});
test('Check Sort Dropdown is Clickable', async ({ page }) => {
  await page.waitForTimeout(500);
  await expect(page.locator('[data-test="product-sort-container"]')).toBeEnabled();
});
test('Check Sort Dropdown Default Selected Option is A to Z', async ({ page }) => {
  await expect(page.locator('[data-test="product-sort-container"]')).toContainText('Name (A to Z)');
});


test('Check Sorting A to Z with Specific Product Titles', async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]').selectOption('az');
    await page.waitForTimeout(500);
    const items = page.locator('.inventory_item_name');
    const firstItem = await items.first().innerText();
    const lastItem = await items.last().innerText(); 
    expect(firstItem).toBe('Sauce Labs Backpack');
    expect(lastItem).toBe('Test.allTheThings() T-Shirt (Red)');
});




test('Check Sorting Z to A with Specific Product Titles', async ({ page }) => {
  await page.locator('[data-test="product-sort-container"]').selectOption('za');
  await page.waitForTimeout(500);
  const items = page.locator('.inventory_item_name');
  const firstItem = await items.first().innerText();
  const lastItem = await items.last().innerText();
  expect(firstItem).toBe('Test.allTheThings() T-Shirt (Red)');
  expect(lastItem).toBe('Sauce Labs Backpack');
});


test('Check Sorting Price Low to High', async ({ page }) => {
  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
  await page.waitForTimeout(500);
  const items = page.locator('.inventory_item_price');
  const firstItem = await items.first().innerText();
  const lastItem = await items.last().innerText();
  expect(firstItem).toBe('$7.99');
  expect(lastItem).toBe('$49.99');
});


test('Check Sorting Price High to Low', async ({ page }) => {
  await page.locator('[data-test="product-sort-container"]').selectOption('hilo');
  await page.waitForTimeout(500);
  const items = page.locator('.inventory_item_price');
  const firstItem = await items.first().innerText();
  const lastItem = await items.last().innerText();
  expect(firstItem).toBe('$49.99');
  expect(lastItem).toBe('$7.99');
});
})

