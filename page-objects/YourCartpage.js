/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable padded-blocks */
/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
const { expect } = require('@playwright/test');

exports.YourCartPage = class YourCartPagePage {
  constructor(page) {
    this.page = page;
    this.itemsinCartNames = page.locator('[data-test="inventory-item-name"]');
  }

  async getItemCountInCart() {
    return this.itemsinCartNames.count();
  }

  async getItemNamesInCart() {
    const itemCount = await this.getItemCountInCart();
    const itemNames = [];
    for (let i = 0; i < itemCount; i++) {
      const itemName = await this.itemsinCartNames.nth(i).textContent();
      itemNames.push(itemName.trim()); // Trim to remove any surrounding whitespace
    }
    return itemNames;
  }

};
