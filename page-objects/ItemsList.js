/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */

const { expect } = require('@playwright/test');


exports.ItemsList = class ItemsList {
  constructor(page) {
    this.page = page;
    this.itemname1 = page.locator('.inventory_item_name').nth(0);
    this.addtocart = page.locator('#add-to-cart-sauce-labs-backpack').nth(0);
    this.shoppingcart = page.locator('.shopping_cart_link');
    this.removecart = page.locator('#remove-sauce-labs-backpack').nth(0);
  }
};
