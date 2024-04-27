/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */

const { expect } = require('@playwright/test');

exports.SortingBarPage = class SortingBarPage {
  constructor(page) {
    this.page = page;
    this.sortingbutton = page.locator('.product_sort_container');
    this.sortingOptions = page.locator('select[class ="product_sort_container"] > option');
    this.sortingOptionAZ = page.locator('.product_sort_container').selectOption('az');
    this.sortingOptionZA = page.locator('.product_sort_container').selectOption('za');
    this.sortingOptionLH = page.locator('.product_sort_container').getByText('Price (low to high)');
    this.sortingOptionHL = page.locator('.product_sort_container').getByText('Price (high to low)');
    this.itemName = page.locator('.inventory_item_name');
    this.itemPrice = page.locator('.inventory_item_price');
  }

  async selectSortingOption(option) {
    await this.sortingbutton.selectOption({ label: option });
  }
};
/* await page.getByText('Name (A to Z)Name (A to Z)').click();
await page.locator('[data-test="product-sort-container"]').selectOption('za'); */
