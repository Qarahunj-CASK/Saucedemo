/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
// const { expect } = require('@playwright/test');

exports.CheckoutViewPage = class CheckoutViewPage {
  constructor(page) {
    this.page = page;
    this.shoppingCartButton = page.locator('[data-test="shopping-cart-link"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.addToCartButton = page.locator('.btn.btn_primary.btn_small.btn_inventory');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.itemName = page.locator('.inventory_item_name');
    this.itemPrice = page.locator('.inventory_item_price');
    this.pageTitle = page.locator('[data-test="title"]');
    this.inventoryItemName = page.locator('[data-test="inventory-item-name"]');
    this.inventoryItemDesc = page.locator('[data-test="inventory-item-desc"]');
    this.inventoryItemPrice = page.locator('[data-test="inventory-item-price"]');
    this.paymentInfoValue = page.locator('[data-test="payment-info-value"]');
    this.shippingInfoValue = page.locator('[data-test="shipping-info-value"]');
    this.itemTotalText = page.locator('[data-test="subtotal-label"]');
    this.taxText = page.locator('[data-test="tax-label"]');
    this.totalText = page.locator('[data-test="total-label"]');
  }

  async fillCheckoutFormFields(firstName, lastName, postalCode) {
    await this.page.locator('[data-test="firstName"]').fill(firstName);
    await this.page.locator('[data-test="lastName"]').fill(lastName);
    await this.page.locator('[data-test="postalCode"]').fill(postalCode);
  }

  async performCheckoutView() {
    await this.page.locator('.btn.btn_primary.btn_small.btn_inventory').nth(0).click();
    await this.shoppingCartButton.click();
    await this.checkoutButton.click();
    await this.fillCheckoutFormFields('asd', 'asd', 'asd');
    await this.continueButton.click();
  }
};
