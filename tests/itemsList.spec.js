/* eslint-disable linebreak-style */
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../page-objects/LoginPage');
const { ItemsList } = require('../page-objects/ItemsList');

const { USER_NAME } = process.env;
const { PASSWORD } = process.env;

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(USER_NAME, PASSWORD);
  await expect(page.url()).toContain('inventory.html');
});

test('Verify that clicking on the item title opens the item in a different page URL.', async ({ page }) => {
  const itemsList = new ItemsList(page);
  await itemsList.itemname1.click();
  await expect(page.url()).toContain('inventory-item');
});

test('Verify that by clicking add to cart it adds an item to shoping cart', async ({ page }) => {
  const itemsList = new ItemsList(page);
  await itemsList.addtocart.click();
  await expect(itemsList.shoppingcart).toHaveText('1');
  await itemsList.shoppingcart.click();
  await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
});
test('Verify that by clicking remove  cart button it removes the item from shoping cart', async ({ page }) => {
  const itemsList = new ItemsList(page);
  await itemsList.addtocart.click();
  await expect(itemsList.shoppingcart).toHaveText('1');
  await itemsList.removecart.click();
  await expect(itemsList.shoppingcart).toHaveText('');
});
test('Verify src attribute changes for each image', async ({ page }) => {
  const firstSrc = await page.$eval('img', (img) => img.src);
  const secondSrc = await page.$$eval('img', (images) => images[1].src);
  expect(firstSrc).not.toBe(secondSrc);
});

test('Verify src attribute changes for each image version 2', async ({ page }) => {
  const firstSrc = await page.$eval('img', (img) => img.src);
  const allImages = await page.$$('img');
  for (let i = 1; i < allImages.length; i++) {
    const src = await allImages[i].evaluate((img) => img.src);
    expect(src).not.toBe(firstSrc);
  }
});