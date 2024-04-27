/* eslint-disable linebreak-style */
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../page-objects/LoginPage');
const { SortingBarPage } = require('../page-objects/SortingBarPage');

const { USER_NAME } = process.env;
const { PASSWORD } = process.env;

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(USER_NAME, PASSWORD);
  await expect(page.getByText('Products')).toBeVisible();
});

test('Verify that sorting menu bar contains 4 sorting functions', async ({ page }) => {
  const sortingBarPage = new SortingBarPage(page);
  await expect(sortingBarPage.sortingOptions).toHaveCount(4);
  await expect(page.locator('.product_sort_container').locator('option')).toHaveCount(4);
});

test('Verify Sorting in A to Z Order is working as expected, async', async ({ page }) => {
  const sortingBarPage = new SortingBarPage(page);
  await sortingBarPage.sortingbutton.click();
  await sortingBarPage.sortingbutton.selectOption('Name (A to Z)');
  await expect(await sortingBarPage.itemName.first().innerText()).toBe('Sauce Labs Backpack');
});
/* await page.getByText('Name (A to Z)Name (A to Z)').click();
  await page.locator('[data-test="product-sort-container"]').selectOption('za'); */

test('Verify Sorting in Z to A Order is working as expected, async', async ({ page }) => {
  const sortingBarPage = new SortingBarPage(page);
  await sortingBarPage.sortingbutton.click();
  await sortingBarPage.sortingbutton.selectOption('Name (Z to A)');
  await expect(await sortingBarPage.itemName.first()).toHaveText('Test.allTheThings() T-Shirt (Red)');
});

test('Verify Sorting in Low to High Order is working as expected, async', async ({ page }) => {
  const sortingBarPage = new SortingBarPage(page);
  await sortingBarPage.sortingbutton.click();
  await sortingBarPage.sortingbutton.selectOption('Price (low to high)');
  await expect(await sortingBarPage.itemPrice.first()).toHaveText('$7.99');
});

test('Verify Sorting in Hight to Low Order is working as expected, async', async ({ page }) => {
  const sortingBarPage = new SortingBarPage(page);
  await sortingBarPage.sortingbutton.click();
  await sortingBarPage.sortingbutton.selectOption('Price (high to low)');
  await expect(await sortingBarPage.itemPrice.first()).toHaveText('$49.99');
});

test('Verify Sorting in Z to A Order is working as expected, async version 2/1', async ({ page }) => {
  const sortingBarPage = new SortingBarPage(page);
  await sortingBarPage.sortingbutton.click();
  await sortingBarPage.sortingbutton.selectOption('Name (A to Z)');
  const productNames = await page.$$eval('.inventory_item_name', (elements) => elements.map((el) => el.textContent));
  const firstItemName = productNames[0];
  await expect(firstItemName).toEqual('Sauce Labs Backpack');
});
