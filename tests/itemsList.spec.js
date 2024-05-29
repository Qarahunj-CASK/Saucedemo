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
  const titlename = await itemsList.producttitleSelector.nth(itemnumber).innerText();
  await itemsList.clickonShoppingCart();
  await expect(page).toHaveURL('/cart.html');
  await expect(itemsList.producttitleSelector).toHaveText(titlename);
});
test('Verify that by clicking remove  cart button, it removes the item from shoping cart', async ({ page }) => {
  const itemsList = new ItemsList(page);
  const itemnumber = 2;
  await itemsList.addtocartButton(itemnumber);
  await expect(itemsList.shoppingcart).toHaveText('1');
  const titlename = await itemsList.producttitleSelector.nth(itemnumber).innerText();
  await itemsList.clickonShoppingCart();
  await expect(page).toHaveURL('/cart.html');
  await itemsList.addtocart.nth(0).click();
  await expect(itemsList.producttitleSelector).not.toBeVisible(titlename);
});

// Define a test case with the description 'Verify that pictures do not repeat'
test('Verify that pictures do not repeat', async ({ page }) => {
  // Create a new instance of the ItemsList page object
  const itemlist = new ItemsList(page);

  // Create a new Set to store the src attributes of the product images
  // Sets only store unique values, so this will help us check for duplicates
  const setofImages = new Set();

  // Define the expected number of unique product images
  const productsCount = 6;

  // Loop over the product images
  for (let i = 0; i < productsCount; i += 1) {
    // Get the src attribute of the i-th product image
    const src = await itemlist.productImage.nth(i).getAttribute('src');

    // Add the src attribute to the set of images
    setofImages.add(src);
  }

  // Check if the size of the set of images is equal to the expected number of products
  await expect(setofImages.size).toBe(productsCount);
});
