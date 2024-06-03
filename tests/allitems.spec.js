/* eslint-disable linebreak-style */
const { test, expect } = require('@playwright/test');
const { title } = require('process');
const exp = require('constants');
const { LoginPage } = require('../page-objects/LoginPage');
const { AllItems } = require('../page-objects/AllItems');

const { USER_NAME } = process.env;
const { PASSWORD } = process.env;

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.fillUsernameField(USER_NAME);
  await loginPage.fillPasswordField(PASSWORD);
  await loginPage.clickLoginButton();
});

test('Verify that clicking "Add to cart" adds items to your cart', async ({ page }) => {
  const allItems = new AllItems(page);
  allItems.clickOnAddToCartButton(0);
  await expect(allItems.numberOfChosenObjects).toHaveText('1');
});

test('Verify that clicking "Remove" removes items from your cart', async ({ page }) => {
  const allItems = new AllItems(page);
  allItems.clickOnAddToCartButton(0);
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  allItems.clickOnRemoveButton(0);
  await expect(allItems.numberOfChosenObjects).not.toBeVisible();
});

test('Verify that items title colors changes to green when hovering the mouse cursor over them', async ({ page }) => {
  const allItems = new AllItems(page);
  await allItems.productTitle.nth(0).hover();
  await expect(allItems.productTitle.nth(0)).toHaveCSS('color', 'rgb(61, 220, 145)');
});

test('Verify that clicking on an item from the "All Items" page redirects to the individual item page', async ({ page }) => {
  const allItems = new AllItems(page);
  const titleValue = await allItems.productTitle.nth(0).innerText();
  await allItems.productTitle.nth(0).click();
  await expect(page).not.toHaveURL('/inventory.html');
  await expect(page.locator('.inventory_details_name.large_size')).toHaveText(titleValue);
});

test('Verify that the selected items appear in the cart page', async ({ page }) => {
  const allItems = new AllItems(page);
  const titleValue = await allItems.productTitle.nth(0).innerText();
  await allItems.clickOnAddToCartButton(0);
  await allItems.clickOnShoppingCartButton();
  await expect(page).toHaveURL('/cart.html');
  await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText(titleValue);
});

test('Verify that removing an item from list it removes from shopping cart too', async ({ page }) => {
  const allItems = new AllItems(page);
  const titleValue = await allItems.productTitle.nth(0).innerText();
  await allItems.clickOnAddToCartButton(0);
  await allItems.clickOnShoppingCartButton();
  await expect(page).toHaveURL('/cart.html');
  await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText(titleValue);
  await page.locator('.btn.btn_secondary.btn_small.cart_button').click();
  await expect(page.locator('[data-test="inventory-item-name"]')).not.toBeVisible();
});
