/* eslint-disable linebreak-style */
// eslint-disable no-await-in-loop //
/* eslint-disable linebreak-style */
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../page-objects/LoginPage');
const { CheckoutViewPage } = require('../page-objects/CheckoutViewPage');

const { USER_NAME } = process.env;
const { PASSWORD } = process.env;

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(USER_NAME, PASSWORD);
  await expect(page.getByText('Products')).toBeVisible();
});

test('Verify that shopping cart button returns "Your cart" page', async ({ page }) => {
  const checkoutViewPage = new CheckoutViewPage(page);
  await checkoutViewPage.performCheckoutView();
  await checkoutViewPage.shoppingCartButton.click();
  await expect(checkoutViewPage.pageTitle).toHaveText('Your Cart');
});

// eslint-disable-next-line max-len
test('Verify that item title, description and the price are the same as in product page', async ({ page }) => {
  const checkoutViewPage = new CheckoutViewPage(page);
  const productTitle = await checkoutViewPage.inventoryItemName.nth(0).textContent();
  const productDescription = await checkoutViewPage.inventoryItemDesc.nth(0).textContent();
  const productPrice = await checkoutViewPage.inventoryItemPrice.nth(0).textContent();
  await checkoutViewPage.addToCartButton.nth(0).click();
  await checkoutViewPage.shoppingCartButton.click();
  await checkoutViewPage.checkoutButton.click();
  await checkoutViewPage.fillCheckoutFormFields('asd', 'asd', 'asd');
  await checkoutViewPage.continueButton.click();
  await expect(checkoutViewPage.inventoryItemName).toHaveText(productTitle);
  await expect(checkoutViewPage.inventoryItemDesc).toHaveText(productDescription);
  await expect(checkoutViewPage.inventoryItemPrice).toHaveText(productPrice);
});

test('Verify by clicking item title button returns one item page', async ({ page }) => {
  const checkoutViewPage = new CheckoutViewPage(page);
  await checkoutViewPage.performCheckoutView();
  await checkoutViewPage.inventoryItemName.click();
  await expect(page.getByText('Back to products')).toBeVisible();
});

test('Verify That the Cancel Button Returns to the Product Page', async ({ page }) => {
  const checkoutViewPage = new CheckoutViewPage(page);
  await checkoutViewPage.performCheckoutView();
  await checkoutViewPage.cancelButton.click();
  await expect(checkoutViewPage.pageTitle).toHaveText('Products');
});

test('Verify that the Finish Button redirects to the Complete Page', async ({ page }) => {
  const checkoutViewPage = new CheckoutViewPage(page);
  await checkoutViewPage.performCheckoutView();
  await checkoutViewPage.finishButton.click();
  await expect(checkoutViewPage.pageTitle).toHaveText('Checkout: Complete!');
});

test('Verify that the "Payment Information" and "Shipping Information" titles are displaying the right information', async ({ page }) => {
  const checkoutViewPage = new CheckoutViewPage(page);
  await checkoutViewPage.performCheckoutView();
  await expect(checkoutViewPage.paymentInfoValue).toHaveText('SauceCard #31337');
  await expect(checkoutViewPage.shippingInfoValue).toHaveText('Free Pony Express Delivery!');
});

test('Verify That the "Item Total" is the sum of all chosen item prices', async ({ page }) => {
  const checkoutViewPage = new CheckoutViewPage(page);
  const loopCount = 3;
  for (let i = 0; i < loopCount; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await checkoutViewPage.addToCartButton.nth(i).click();
  }
  await checkoutViewPage.shoppingCartButton.click();
  await checkoutViewPage.checkoutButton.click();
  await checkoutViewPage.fillCheckoutFormFields('asd', 'asd', 'asd');
  await checkoutViewPage.continueButton.click();
  let sum = 0;
  for (let i = 0; i < loopCount; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const itemPrice = await checkoutViewPage.inventoryItemPrice.nth(i).textContent();
    const price = parseFloat(itemPrice.substring(1));
    sum += price;
  }
  await expect(checkoutViewPage.itemTotalText).toHaveText(`Item total: $${sum}`);
});

test('Verify That the "tax" is 8% of "Item Total"', async ({ page }) => {
  const checkoutViewPage = new CheckoutViewPage(page);
  await checkoutViewPage.performCheckoutView();
  const itemTotal = await checkoutViewPage.itemTotalText.textContent();
  const itemTotalValue = parseFloat(itemTotal.substring(13));
  const tax = (itemTotalValue * 0.08).toFixed(2);
  await expect(checkoutViewPage.taxText).toHaveText(`Tax: $${tax}`);
});

test('Verify that Total is the sum of Tax and Item Total', async ({ page }) => {
  const checkoutViewPage = new CheckoutViewPage(page);
  await checkoutViewPage.performCheckoutView();
  const itemTotalText = await checkoutViewPage.itemTotalText.textContent();
  const taxText = await checkoutViewPage.taxText.textContent();
  const itemTotal = parseFloat(itemTotalText.substring(13));
  const tax = parseFloat(taxText.substring(6));
  const total = itemTotal + tax;
  await expect(checkoutViewPage.totalText).toHaveText(`Total: $${total}`);
});
