/* eslint-disable linebreak-style */
/* eslint-disable no-await-in-loop */
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../page-objects/LoginPage');
const { ItemsList } = require('../page-objects/ItemList');

const { USER_NAME } = process.env;
const { PASSWORD } = process.env;

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(USER_NAME, PASSWORD);
  await expect(page.url()).toContain('inventory.html');
});

test('Verify that clicking on the item title opens the item in a different page URL.', async ({ page }) => {
  const itemsList = new ItemsList(page);
  const initialURL = await page.url();
  await itemsList.clickonTitle(0); // This is clicking on the first item title
  await expect(page.url()).not.toBe(initialURL);
});

test('Verify that by clicking add to cart it adds an item to shoping cart', async ({ page }) => {
  const itemsList = new ItemsList(page);
  const itemnumber = 2;
  await itemsList.addtocartButton(itemnumber);
  await expect(itemsList.shoppingcart).toHaveText('1');
  const titilename = await itemsList.producttitleSelector.nth(itemnumber).innerText();
  await itemsList.clickonShoppingCart();
  await expect(page).toHaveURL('/cart.html');
  await expect(itemsList.producttitleSelector).toHaveText(titilename);
});
test('Verify that by clicking remove  cart button, it removes the item from shoping cart', async ({ page }) => {
  const itemsList = new ItemsList(page);
  const itemnumber = 2;
  await itemsList.addtocartButton(itemnumber);
  await expect(itemsList.shoppingcart).toHaveText('1');
  const titilename = await itemsList.producttitleSelector.nth(itemnumber).innerText();
  await itemsList.clickonShoppingCart();
  await expect(page).toHaveURL('/cart.html');
  await itemsList.addtocart.nth(0).click();
  await expect(itemsList.producttitleSelector).not.toBeVisible(titilename);
});
test('Verify that photos are not repetitave', async ({ page }) => {
  const firstSrc = await page.$eval('img', (img) => img.src);
  const secondSrc = await page.$$eval('img', (images) => images[1].src);
  expect(firstSrc).not.toBe(secondSrc);
});

test('Verify src attribute changes for each image version 2', async ({ page }) => {
  const firstSrc = await page.$eval('img', (img) => img.src);
  const allImages = await page.$$('img');
  for (let i = 1; i < allImages.length; i += 1) {
    const src = await allImages[i].evaluate((img) => img.src);
    expect(src).not.toBe(firstSrc);
  }
});

test('Verify that pictures do not repeat', async ({ page }) => {
  const itemlist = new ItemsList(page);
  const setofImages = new Set();
  const productsCount = 6;
  for (let i = 0; i < productsCount; i += 1) {
    const src = await itemlist.productImage.nth(i).getAttribute('src');
    setofImages.add(src);
  }
  await expect(setofImages.size).toBe(productsCount);
});
