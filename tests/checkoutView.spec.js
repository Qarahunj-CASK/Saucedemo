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

test('Verify That the "tax" is 8% of "Item Total", async', async ({ page }) => {
  const total = page.locator('[data-test="subtotal-label"]').textContent() * 0.08;
  await page.goto('/inventory.html');
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.goto('/checkout-step-two.html');
  await expect(page.locator('[data-test="tax-label"]').textContent()).toBe(total);
});













// test('Verify That the "Item Total" is the sum of all chosen item prices', async ({ page }) => {
//   const value1 = page.getByText('$29.99').textContent();
//   const value2 = page.getByText('$9.99').textContent();
//   const total = value1 + value2;
//   await page.goto('/inventory.html');
//   await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
//   await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
//   await page.goto('/checkout-step-two.html');
//   await expect(page.locator('[data-test="summary-total"]').textContent()).toBe(total);
// });