/* eslint-disable linebreak-style */
// eslint-disable-next-line import/no-extraneous-dependencies
const { expect } = require('@playwright/test');

exports.AllItems = class AllItems {
  constructor(page) {
    this.addToCart = page.locator('.btn.btn_primary.btn_small.btn_inventory');
    this.numberOfChosenObjects = page.locator('.shopping_cart_badge');
    this.removeButton = page.locator('.btn.btn_secondary.btn_small.btn_inventory');
    this.sortingButton = page.locator('.product_sort_container');
    this.productTitle = page.locator('.inventory_item_name');
    this.shoppingCartButton = page.locator('.shopping_cart_link');
  }

  async clickOnAddToCartButton(number) {
    await this.addToCart.nth(number).click();
  }

  async clickOnRemoveButton(number) {
    await this.removeButton.nth(number).click();
  }
  async clickOnShoppingCartButton(){
    await this.shoppingCartButton.click();
  }
};
