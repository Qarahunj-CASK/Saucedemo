/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */

exports.ItemsList = class ItemsList {
  constructor(page) {
    this.page = page;
    this.itemname1 = page.locator('.inventory_item_name');
    this.addtocart = page.locator('.btn.btn_primary.btn_small.btn_inventory');
    this.shoppingcart = page.locator('.shopping_cart_link');
    this.removecart = page.locator('#remove-sauce-labs-backpack');
  }

  async clickonTitle(number) {
    await this.itemname1.nth(number).click();
  }

  async clickonShoppingCart() {
    await this.shoppingcart.click();
  }

  async addtocartButton(number) {
    await this.addtocart.nth(number).click();
  }
};
