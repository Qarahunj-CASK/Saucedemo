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
});

test('Verify Sorting in A to Z Order is working as expected', async ({ page }) => {
  const sortingBarPage = new SortingBarPage(page);
  await sortingBarPage.sortingbutton.click();
  await sortingBarPage.sortingbutton.selectOption('Name (A to Z)');
  const itemName = await sortingBarPage.itemName.allTextContents();
  for (let i = 0; i < itemName.length - 1; i += 1) {
    expect(itemName[i].localeCompare(itemName[i + 1])).toBeLessThanOrEqual(0);
  }
});

test('Verify Sorting in Z to A Order is working as expected', async ({ page }) => {
  const sortingBarPage = new SortingBarPage(page);
  await sortingBarPage.sortingbutton.click();
  await sortingBarPage.sortingbutton.selectOption('Name (Z to A)');
  const itemName = await sortingBarPage.itemName.allTextContents();
  for (let i = 0; i < itemName.length - 1; i += 1) {
    expect(itemName[i].localeCompare(itemName[i + 1])).toBeGreaterThanOrEqual(0);
  }
});

test('Verify Sorting in Low to High Order is working as expected', async ({ page }) => {
  const sortingBarPage = new SortingBarPage(page);
  await sortingBarPage.sortingbutton.click();
  await sortingBarPage.sortingbutton.selectOption('Price (low to high)');
  const itemPrices = await sortingBarPage.itemPrice.allTextContents();
  const prices = itemPrices.map((price) => parseFloat(price.substring(1)));
  for (let i = 0; i < prices.length - 1; i += 1) {
    expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
  }
});

test('Verify Sorting in Hight to Low Order is working as expected', async ({ page }) => {
  const sortingBarPage = new SortingBarPage(page);
  await sortingBarPage.sortingbutton.click();
  await sortingBarPage.sortingbutton.selectOption('Price (high to low)');
  const itemPrices = await sortingBarPage.itemPrice.allTextContents();
  const prices = itemPrices.map((price) => parseFloat(price.substring(1)));
  for (let i = 0; i < prices.length - 1; i += 1) {
    expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1]);
  }
});
