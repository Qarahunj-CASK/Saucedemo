/* eslint-disable linebreak-style */
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../page-objects/LoginPage');
const { LeftMenubar } = require('../page-objects/LeftMenuBarPOM');

const { USER_NAME } = process.env;
const { PASSWORD } = process.env;

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.fillUsernameField(USER_NAME);
  await loginPage.fillPasswordField(PASSWORD);
  await loginPage.clickLoginButton();
  await expect(page).toHaveURL('/inventory.html');
});

test('Verify that all menu items are existing', async ({ page }) => {
  const leftMenu = new LeftMenubar(page);
  await page.locator('#react-burger-menu-btn').click();
  await expect(leftMenu.menuBar).toBeVisible();
  expect(leftMenu.allItems).toBeVisible();
  expect(leftMenu.about).toBeVisible();
  expect(leftMenu.logout).toBeVisible();
  expect(leftMenu.resetAppState).toBeVisible();
});

test('Verify that with x button is possible to close the menu bar', async ({ page }) => {
  const leftMenu = new LeftMenubar(page);
  await page.locator('#react-burger-menu-btn').click();
  await expect(leftMenu.menuBar).toBeVisible();
  leftMenu.clickOnXButton();
  await expect(leftMenu.menuBar).not.toBeVisible();
});

test('Validate Menu Item Color Change to Green on Hover', async ({ page }) => {
  const leftMenu = new LeftMenubar(page);
  await page.locator('#react-burger-menu-btn').click();
  await expect(leftMenu.menuBar).toBeVisible();
  await expect(leftMenu.allItems).toHaveCSS('color', 'rgb(24, 88, 58)');
  await leftMenu.allItems.hover();
  await expect(leftMenu.allItems).toHaveCSS('color', 'rgb(61, 220, 145)');

  await expect(leftMenu.about).toHaveCSS('color', 'rgb(24, 88, 58)');
  await leftMenu.about.hover();
  await expect(leftMenu.about).toHaveCSS('color', 'rgb(61, 220, 145)');

  await expect(leftMenu.logout).toHaveCSS('color', 'rgb(24, 88, 58)');
  await leftMenu.logout.hover();
  await expect(leftMenu.logout).toHaveCSS('color', 'rgb(61, 220, 145)');

  await expect(leftMenu.resetAppState).toHaveCSS('color', 'rgb(24, 88, 58)');
  await leftMenu.resetAppState.hover();
  await expect(leftMenu.resetAppState).toHaveCSS('color', 'rgb(61, 220, 145)');
});

test('Verify that "Logout" button returns to Login page', async ({ page }) => {
  const leftMenu = new LeftMenubar(page);
  await page.locator('#react-burger-menu-btn').click();
  await expect(leftMenu.menuBar).toBeVisible();
  await leftMenu.clickOnLogoutButton();
  await leftMenu.checkURL('/');
});

test('Confirm that selecting "Reset App State" cancels all chosen items on the products page', async ({ page }) => {
  const leftMenu = new LeftMenubar(page);
  await page.locator('.btn.btn_primary.btn_small.btn_inventory').nth(0).click();
  await page.locator('.btn.btn_primary.btn_small.btn_inventory').nth(0).click();
  await page.locator('.btn.btn_primary.btn_small.btn_inventory').nth(0).click();
  await page.locator('#react-burger-menu-btn').click();
  await expect(leftMenu.menuBar).toBeVisible();

  await leftMenu.clickOnResetButton();
  await leftMenu.clickOnXButton();

  const numberOfElement = await page.locator('.btn.btn_secondary.btn_small.btn_inventory').count();
  await expect(numberOfElement).toEqual(0);
});

test('Confirm that selecting "Reset App State" cancels all chosen items on the your cart page', async ({ page }) => {
  const leftMenu = new LeftMenubar(page);
  await page.locator('.btn.btn_primary.btn_small.btn_inventory').nth(0).click();
  await page.locator('.btn.btn_primary.btn_small.btn_inventory').nth(0).click();
  await page.locator('.btn.btn_primary.btn_small.btn_inventory').nth(0).click();
  await page.locator('#react-burger-menu-btn').click();
  await expect(leftMenu.menuBar).toBeVisible();

  await leftMenu.clickOnResetButton();
  await leftMenu.clickOnXButton();

  await page.locator('#shopping_cart_container').click();
  await leftMenu.checkURL('/cart.html');

  await expect(page.locator('.cart_item')).not.toBeVisible();
});

test('Verify that "About" button navigates to https://saucelabs.com webpage', async ({ page }) => {
  const leftMenu = new LeftMenubar(page);
  await page.locator('#react-burger-menu-btn').click();
  await expect(leftMenu.menuBar).toBeVisible();
  await leftMenu.clickOnAboutButton();
  await leftMenu.checkURL('https://saucelabs.com/');
});

test('Verify that all items button redirects to products page', async ({ page }) => {
  const leftMenu = new LeftMenubar(page);
  await page.locator('#shopping_cart_container').click();
  await leftMenu.checkURL('/cart.html');
  await page.locator('#react-burger-menu-btn').click();
  await leftMenu.clickOnAllItemsButton();
  leftMenu.checkURL('/inventory.html');
});
