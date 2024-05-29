/* eslint-disable linebreak-style */
/* eslint-disable no-return-await */
/* eslint-disable no-extra-semi */
/* eslint-disable semi */
/* eslint-disable indent */
/* eslint-disable padded-blocks */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('@playwright/test');
const { AllItemsPage } = require('./AllItemsPage')



exports.OneItemPage = class OneItemPage extends AllItemsPage {
  constructor(page) {
    super(page)
    this.page = page;
    this.backToProducts = page.locator('[data-test="back-to-products"]');
    this.addToCardButtonOne = page.locator('[data-test="add-to-cart"]');
    this.removeButton = page.locator('[data-test="remove"]');
    this.shoppingCardBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.shoppingCartButton = page.locator('[data-test="shopping-cart-link"]');
    this.itemImageBig = page.locator('img.inventory_details_img')
  };

  async clickBacktoProducts() {
    await this.backToProducts.click();
  }

  async addItemToCartOne() {
    await this.addToCardButtonOne.click();
  }

  async clickOnShoppingCard() {
    await this.shoppingCartButton.click();
  }

  async removeItem() {
    await this.removeButton.click();
  }

  async getBigImageSource() {
    return this.itemImageBig.getAttribute('src');
  }

  async getCountOfItemsinCartBadge() {
    const textContent = await this.shoppingCardBadge.textContent()
    return parseInt(textContent, 10);
  }


}


