/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */

const { expect } = require('@playwright/test');

exports.AllItemsPage = class AllItemsPage {
  constructor(page) {
    this.page = page;
    this.itemName = page.locator('[data-test="inventory-item-name"]');
    this.itemDesc = page.locator('[data-test="inventory-item-desc"]');
    this.itemPrice = page.locator('[data-test="inventory-item-price"]');
    this.itemImage = page.locator('[data-test="item-4-img-link"]');
    this.itemImageSmall = page.locator('img.inventory_item_img');
    this.addToCardButton = page.locator('.btn.btn_primary.btn_small.btn_inventory');
  }

  async clickItem(itemNumber) {
    await this.itemName.nth(itemNumber).click();
  }

  async getItemNameText(itemNumber) {
    return this.itemName.nth(itemNumber).textContent();
  }

  async getItemDescText(itemNumber) {
    return this.itemDesc.nth(itemNumber).textContent();
  }

  async getItemPriceText(itemNumber) {
    return this.itemPrice.nth(itemNumber).textContent();
  }

  async addItemToCart(itemNum) {
    await this.addToCardButton.nth(itemNum).click();
  }

  async getSmallImageSource(itemNumber) {
    return this.itemImageSmall.nth(itemNumber).getAttribute('src');
  }
};