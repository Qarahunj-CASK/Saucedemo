/* eslint-disable linebreak-style */
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../page-objects/LoginPage');
const { CheckoutYourInfo } = require('../page-objects/CheckoutYourInformationPage');

const symbols = "`~!@#$%^&*()-_=+[{]}\\|;:',<`.>/?";
const { USER_NAME } = process.env;
const { PASSWORD } = process.env;

test('Verify that it is possible to navigate to the "Checkout: Overview" page when all fields are filled with proper data.', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const checkoutYourInfo = new CheckoutYourInfo(page);
  await loginPage.loginToThePage(USER_NAME, PASSWORD, '/inventory.html');
  await page.locator('.btn.btn_primary.btn_small.btn_inventory').nth(0).click();
  await page.locator('#shopping_cart_container').click();
  await page.locator('#checkout').click();
  await checkoutYourInfo.fillAllFieldsAndClick('name', 'lastname', 'zipCode');
});
test('Verify That the Cancel Button Returns to the "Your Cart" Page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const checkoutYourInfo = new CheckoutYourInfo(page);
  await loginPage.loginToThePage(USER_NAME, PASSWORD, '/inventory.html');
  await page.locator('.btn.btn_primary.btn_small.btn_inventory').nth(0).click();
  await page.locator('#shopping_cart_container').click();
  await page.locator('#checkout').click();
  await checkoutYourInfo.clickOnCencelButton();
  await loginPage.checkURL('/cart.html');
});
test('Verify That the "Continue" Button Is Inactive When the requiered fields are not filled', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const checkoutYourInfo = new CheckoutYourInfo(page);
  await loginPage.loginToThePage(USER_NAME, PASSWORD, '/inventory.html');
  await page.locator('.btn.btn_primary.btn_small.btn_inventory').nth(0).click();
  await page.locator('#shopping_cart_container').click();
  await page.locator('#checkout').click();
  await expect(checkoutYourInfo.continueButton).toBeDisabled();
});
test('Verify That the Shopping Cart Button Returns to the "Your Cart" Page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.loginToThePage(USER_NAME, PASSWORD, '/inventory.html');
  await page.locator('.btn.btn_primary.btn_small.btn_inventory').nth(0).click();
  await page.locator('#shopping_cart_container').click();
  await page.locator('#checkout').click();
  await page.locator('#shopping_cart_container').click();
  await loginPage.checkURL('/cart.html');
});
test('Verify that it is possible to input only letters in the "First Name" text box.', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const checkoutYourInfo = new CheckoutYourInfo(page);
  await loginPage.loginToThePage(USER_NAME, PASSWORD, '/inventory.html');
  await page.locator('.btn.btn_primary.btn_small.btn_inventory').nth(0).click();
  await page.locator('#shopping_cart_container').click();
  await page.locator('#checkout').click();
  await loginPage.checkURL('/checkout-step-one.html');
  await expect(checkoutYourInfo.firstName).toBeEmpty();

  await checkoutYourInfo.firstName.pressSequentially(symbols);
  await expect(checkoutYourInfo.firstName).toBeEmpty();
});
test('Verify that it is possible to input only letters in the "Last Name" text box.', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const checkoutYourInfo = new CheckoutYourInfo(page);
  await loginPage.loginToThePage(USER_NAME, PASSWORD, '/inventory.html');
  await page.locator('.btn.btn_primary.btn_small.btn_inventory').nth(0).click();
  await page.locator('#shopping_cart_container').click();
  await page.locator('#checkout').click();
  await loginPage.checkURL('/checkout-step-one.html');
  await expect(checkoutYourInfo.lastName).toBeEmpty();

  await checkoutYourInfo.lastName.pressSequentially(symbols);
  await expect(checkoutYourInfo.lastName).toBeEmpty();
});
test('Verify that it is possible to input only letters in the "Postal Code" text box.', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const checkoutYourInfo = new CheckoutYourInfo(page);
  await loginPage.loginToThePage(USER_NAME, PASSWORD, '/inventory.html');
  await page.locator('.btn.btn_primary.btn_small.btn_inventory').nth(0).click();
  await page.locator('#shopping_cart_container').click();
  await page.locator('#checkout').click();
  await loginPage.checkURL('/checkout-step-one.html');
  await expect(checkoutYourInfo.zipCodeField).toBeEmpty();

  await checkoutYourInfo.zipCodeField.pressSequentially(symbols);
  await expect(checkoutYourInfo.zipCodeField).toBeEmpty();
});
test('Ensure an error message appears when "First Name" is empty, indicating it is required', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const checkoutYourInfo = new CheckoutYourInfo(page);
  await loginPage.loginToThePage(USER_NAME, PASSWORD, '/inventory.html');
  await page.locator('.btn.btn_primary.btn_small.btn_inventory').nth(0).click();
  await page.locator('#shopping_cart_container').click();
  await page.locator('#checkout').click();
  await loginPage.checkURL('/checkout-step-one.html');
  await expect(checkoutYourInfo.firstName).toBeEmpty();
  await checkoutYourInfo.fillLastName('Lastname');
  await checkoutYourInfo.fillZipCode('ZipCode123');
  await checkoutYourInfo.clickOnContionueButon();
  await checkoutYourInfo.errorTextCheck('Error: First Name is required');
});
test('Ensure an error message appears when "Last Nmae" is empty, indicating it is required', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const checkoutYourInfo = new CheckoutYourInfo(page);
  await loginPage.loginToThePage(USER_NAME, PASSWORD, '/inventory.html');
  await page.locator('.btn.btn_primary.btn_small.btn_inventory').nth(0).click();
  await page.locator('#shopping_cart_container').click();
  await page.locator('#checkout').click();
  await loginPage.checkURL('/checkout-step-one.html');
  await expect(checkoutYourInfo.lastName).toBeEmpty();
  await checkoutYourInfo.fillFirstName('FirstName');
  await checkoutYourInfo.fillZipCode('ZipCode123');
  await checkoutYourInfo.clickOnContionueButon();
  await checkoutYourInfo.errorTextCheck('Error: Last Name is required');
});
test('Ensure an error message appears when "Postal Code" is empty, indicating it is required', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const checkoutYourInfo = new CheckoutYourInfo(page);
  await loginPage.loginToThePage(USER_NAME, PASSWORD, '/inventory.html');
  await page.locator('.btn.btn_primary.btn_small.btn_inventory').nth(0).click();
  await page.locator('#shopping_cart_container').click();
  await page.locator('#checkout').click();
  await loginPage.checkURL('/checkout-step-one.html');
  await expect(checkoutYourInfo.zipCodeField).toBeEmpty();
  await checkoutYourInfo.fillFirstName('FirstName');
  await checkoutYourInfo.fillLastName('LastName');
  await checkoutYourInfo.clickOnContionueButon();
  await checkoutYourInfo.errorTextCheck('Error: Postal Code is required');
});
test('Verify that clicking the "Cancel" button prevents data from being saved', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const checkoutYourInfo = new CheckoutYourInfo(page);
  await loginPage.loginToThePage(USER_NAME, PASSWORD, '/inventory.html');
  await page.locator('.btn.btn_primary.btn_small.btn_inventory').nth(0).click();
  await page.locator('#shopping_cart_container').click();
  await page.locator('#checkout').click();
  await loginPage.checkURL('/checkout-step-one.html');
  await checkoutYourInfo.fillFirstName('FirstName');
  await checkoutYourInfo.fillLastName('LastName');
  await checkoutYourInfo.fillZipCode('zipCode');
  await checkoutYourInfo.clickOnCencelButton();
  await loginPage.checkURL('/cart.html');
  await page.locator('#checkout').click();
  await loginPage.checkURL('/checkout-step-one.html');
  await expect(checkoutYourInfo.firstName).toBeEmpty();
  await expect(checkoutYourInfo.lastName).toBeEmpty();
  await expect(checkoutYourInfo.zipCodeField).toBeEmpty();
});
test('Verify that clicking the "Shopping Cart" button prevents data from being saved.', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const checkoutYourInfo = new CheckoutYourInfo(page);
  await loginPage.loginToThePage(USER_NAME, PASSWORD, '/inventory.html');
  await page.locator('.btn.btn_primary.btn_small.btn_inventory').nth(0).click();
  await page.locator('#shopping_cart_container').click();
  await page.locator('#checkout').click();
  await loginPage.checkURL('/checkout-step-one.html');
  await checkoutYourInfo.fillFirstName('FirstName');
  await checkoutYourInfo.fillLastName('LastName');
  await checkoutYourInfo.fillZipCode('zipCode');
  await page.locator('#shopping_cart_container').click();
  await loginPage.checkURL('/cart.html');
  await page.locator('#checkout').click();
  await loginPage.checkURL('/checkout-step-one.html');
  await expect(checkoutYourInfo.firstName).toBeEmpty();
  await expect(checkoutYourInfo.lastName).toBeEmpty();
  await expect(checkoutYourInfo.zipCodeField).toBeEmpty();
});
