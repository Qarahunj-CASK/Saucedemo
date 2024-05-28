/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('@playwright/test');

exports.CheckoutViewPage = class CheckoutViewPage {
  constructor(page) {
    this.page = page;
    this.shoppingCartButton = page.locator('[data-test="shopping-cart-link"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.itemName = page.locator('.inventory_item_name');
    this.itemPrice = page.locator('.inventory_item_price');
  }
};
