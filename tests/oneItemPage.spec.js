/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */
/* eslint-disable padded-blocks */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../page-objects/LoginPage');
const { OneItemPage } = require('../page-objects/OneItemPage');
const { AllItemsPage } = require('../page-objects/AllItemsPage');
const { YourCartPage } = require('../page-objects/YourCartpage');

const { USER_NAME } = process.env;
const { PASSWORD } = process.env;

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(USER_NAME, PASSWORD);
  await expect(page.getByText('Products')).toBeVisible();
});

test('Verify That the Back to Products Button Returns to the Products Page', async ({ page }) => {
    const allItemsPage = new AllItemsPage(page);
    const oneItemPage = new OneItemPage(page);
    const itemNumber = 0;
    await allItemsPage.clickItem(itemNumber); // nth(0) selects the first item
    await expect(oneItemPage.backToProducts).toBeVisible();
    await oneItemPage.clickBacktoProducts();
    await expect(page.getByText('Products')).toBeVisible();

});
test('Verify that item title, description and the price are the same as in products page', async ({ page }) => {
    const oneItemPage = new OneItemPage(page);
    const allItemsPage = new AllItemsPage(page);
    const itemNumber = 0;
    const itemNametext = await allItemsPage.getItemNameText(itemNumber);
    const itemDesctext = await allItemsPage.getItemDescText(itemNumber);
    const itemPriceText = await allItemsPage.getItemPriceText(itemNumber);
    await allItemsPage.clickItem(itemNumber);
    const itemTitleText = await oneItemPage.getItemNameText(itemNumber);
    const itemDescriptiontText = await oneItemPage.getItemDescText(itemNumber);
    const itemPricetextFromOneItemPage = await oneItemPage.getItemPriceText(itemNumber);
    expect(itemNametext).toEqual(itemTitleText);
    expect(itemDesctext).toEqual(itemDescriptiontText);
    expect(itemPriceText).toEqual(itemPricetextFromOneItemPage);

});

test('Verify that by clicking add to cart it adds an item to shoping cart', async ({ page }) => {
    const allItemsPage = new AllItemsPage(page);
    const oneItemPage = new OneItemPage(page);
    const yourCartPage = new YourCartPage(page);
    const itemNum = 1;
    await allItemsPage.addItemToCart(itemNum);
    const itemNumber = 0;
    await allItemsPage.clickItem(itemNumber);
    await expect(oneItemPage.backToProducts).toBeVisible();
    await oneItemPage.addItemToCartOne();
    await expect(oneItemPage.removeButton).toBeVisible();
    await expect(oneItemPage.shoppingCardBadge).toBeVisible();
    const addedItemName = await oneItemPage.getItemNameText(itemNumber);
    await oneItemPage.clickOnShoppingCard();
    const itemNames = await yourCartPage.getItemNamesInCart();
    await expect(itemNames).toContain(addedItemName);
});

test('Verify that by clicking remove cart button it removes the item from shoping cart', async ({ page }) => {
    const allItemsPage = new AllItemsPage(page);
    const oneItemPage = new OneItemPage(page);
    const yourCartPage = new YourCartPage(page);
    const itemNum = 1;
    await allItemsPage.addItemToCart(itemNum);
    const itemNumber = 0;
    await allItemsPage.clickItem(itemNumber);
    await expect(oneItemPage.backToProducts).toBeVisible();
    await oneItemPage.addItemToCartOne();
    await expect(oneItemPage.removeButton).toBeVisible();
    await oneItemPage.removeItem();
    await expect(oneItemPage.addToCardButton).toBeVisible();
    const removedItemName = await oneItemPage.getItemNameText(itemNumber);
    await oneItemPage.clickOnShoppingCard();
    const itemNames = yourCartPage.getItemNamesInCart();
    await expect(itemNames).not.toContain(removedItemName);

});
test('Verify That the Shopping Cart Button redirects to the Your Cart Page', async ({ page }) => {
    const allItemsPage = new AllItemsPage(page);
    const oneItemPage = new OneItemPage(page);
    const itemNumber = 0;
    await allItemsPage.clickItem(itemNumber);
    await expect(oneItemPage.backToProducts).toBeVisible();
    await oneItemPage.clickOnShoppingCard();
    await expect(page).toHaveURL('/cart.html');

});
test('Verify That the Image Picture is the Same as on the Product Page', async ({ page }) => {
    const allItemsPage = new AllItemsPage(page);
    const oneItemPage = new OneItemPage(page);
    const itemNumber = 2;
    const srcSmallimage = await allItemsPage.getSmallImageSource(itemNumber);
    await allItemsPage.clickItem(itemNumber);
    const srcBigImage = await oneItemPage.getBigImageSource();
    expect(srcSmallimage).toEqual(srcBigImage);

});
test('Verify that the shopping cart icon at the top-right corner reflects the correct number of items added, when shopping cart is empty', async ({ page }) => {
    const allItemsPage = new AllItemsPage(page);
    const oneItemPage = new OneItemPage(page);
    const itemNumber = 2;
    await allItemsPage.clickItem(itemNumber);
    await oneItemPage.addItemToCartOne();
    await expect(oneItemPage.shoppingCardBadge).toBeVisible();
        const countNumber = await oneItemPage.getCountOfItemsinCartBadge();
        await expect(countNumber).toEqual(1);

});
test('Verify that the shopping cart icon at the top-right corner reflects the correct number of items removed, when there is one item in shopping cart', async ({ page }) => {
    const allItemsPage = new AllItemsPage(page);
    const oneItemPage = new OneItemPage(page);
    const itemNumber = 2;
    await allItemsPage.clickItem(itemNumber);
    await oneItemPage.addItemToCartOne();
    await expect(oneItemPage.shoppingCardBadge).toBeVisible();
    await oneItemPage.removeItem();
    await expect((oneItemPage.shoppingCardBadge)).toBeHidden();

});
test('Verify that the shopping cart icon at the top-right corner reflects the correct number of items added, when shopping cart is not empty', async ({ page }) => {
    const allItemsPage = new AllItemsPage(page);
    const oneItemPage = new OneItemPage(page);
    const itemNum = 1;
    await allItemsPage.addItemToCart(itemNum);
    const itemNumber = 2;
    await allItemsPage.clickItem(itemNumber);
    const countNumber = await oneItemPage.getCountOfItemsinCartBadge();
    await oneItemPage.addItemToCartOne();
    const newCountNumber = await oneItemPage.getCountOfItemsinCartBadge();
    await expect(newCountNumber).toEqual(countNumber + 1);

});
test('Verify that the shopping cart icon at the top-right corner reflects the correct number of items added, when there is more than one item in shopping cart', async ({ page }) => {
    const allItemsPage = new AllItemsPage(page);
    const oneItemPage = new OneItemPage(page);
    const itemNum = 1;
    await allItemsPage.addItemToCart(itemNum);
    const itemNumber = 2;
    await allItemsPage.clickItem(itemNumber);
    const countNumber = await oneItemPage.getCountOfItemsinCartBadge();
    await oneItemPage.addItemToCartOne();
    await oneItemPage.removeItem();
    const newCountNumber = await oneItemPage.getCountOfItemsinCartBadge();
    await expect(newCountNumber).toEqual(countNumber);

});
