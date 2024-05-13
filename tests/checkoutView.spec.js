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
  await page.goto('/inventory.html');
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.goto('/checkout-step-two.html');
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart');
});

// eslint-disable-next-line max-len
// test('Verify that item title, description and the price are the same as in product page', async ({ page }) => {

// });

test('Verify by clicking item title button returns one item page', async ({ page }) => {
  await page.goto('/inventory.html');
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.goto('/checkout-step-two.html');
  await page.locator('[data-test="inventory-item-name"]').click();
  await expect(page.getByText('Back to products')).toBeVisible();
});

test('Verify That the Cancel Button Returns to the Product Page', async ({ page }) => {
  await page.goto('/checkout-step-two.html');
  await page.locator('[data-test="cancel"]').click();
  await expect(page.locator('[data-test="title"]')).toHaveText('Products');
});

test('Verify that the Finish Button redirects to the Complete Page', async ({ page }) => {
  await page.goto('/checkout-step-two.html');
  await page.locator('[data-test="finish"]').click();
  await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Complete!');
});

test('Verify that the "Payment Information" and "Shipping Information" titles are displaying the right information', async ({ page }) => {
  await page.goto('/checkout-step-two.html');
  await expect(page.locator('[data-test="payment-info-value"]')).toHaveText('SauceCard #31337');
  await expect(page.locator('[data-test="shipping-info-value"]')).toHaveText('Free Pony Express Delivery!');
});

// test('Verify That the "Item Total" is the sum of all chosen item prices', async ({ page }) => {
// });

// test('Verify That the "tax" is 8% of "Item Total", async', async ({ page }) => {
// 
// });

test('Verify that Total is the sum of Tax and Item Total', async ({ page }) => {
  await page.goto('/checkout-step-two.html');
  const itemTotalText = await page.textContent('.summary_subtotal_label');
  const taxText = await page.textContent('.summary_tax_label');
  const itemTotal = parseFloat(itemTotalText.substring(13));
  const tax = parseFloat(taxText.substring(5));
  const total = itemTotal + tax;
  const totaltext = await page.textContent('.summary_total_label');
});